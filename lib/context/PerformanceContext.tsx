"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  detectPerformance,
  setCachedPerformance,
  loadCachedPerformance,
  PerformanceMetrics,
  PerformanceLevel,
} from '@/lib/performance/performanceDetector';

interface PerformanceContextType {
  metrics: PerformanceMetrics | null;
  isLoading: boolean;
  level: PerformanceLevel;
  shouldDisableAnimations: boolean;
  shouldReduceQuality: boolean;
  shouldDisableWebGL: boolean;
  shouldDisableBackgroundEffects: boolean;
  targetFPS: number;
}

const PerformanceContext = createContext<PerformanceContextType>({
  metrics: null,
  isLoading: true,
  level: 'high',
  shouldDisableAnimations: false,
  shouldReduceQuality: false,
  shouldDisableWebGL: false,
  shouldDisableBackgroundEffects: false,
  targetFPS: 60,
});

export const usePerformance = () => useContext(PerformanceContext);

interface PerformanceProviderProps {
  children: ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initPerformance = async () => {
      // Сначала пытаемся загрузить из кэша
      const cached = loadCachedPerformance();
      if (cached) {
        setMetrics(cached);
        setIsLoading(false);
      }

      // Затем выполняем полную проверку
      try {
        const detected = await detectPerformance();
        setMetrics(detected);
        setCachedPerformance(detected);
      } catch (error) {
        console.error('Performance detection failed:', error);
        // Fallback на средний уровень
        const fallback: PerformanceMetrics = {
          level: 'medium',
          score: 60,
          reasons: ['Detection failed'],
          recommendations: {
            disableAnimations: false,
            reduceQuality: true,
            disableWebGL: false,
            disableBackgroundEffects: false,
            reduceFPS: 30,
          },
        };
        setMetrics(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    initPerformance();
  }, []);

  const value: PerformanceContextType = {
    metrics,
    isLoading,
    level: metrics?.level || 'high',
    shouldDisableAnimations: metrics?.recommendations.disableAnimations || false,
    shouldReduceQuality: metrics?.recommendations.reduceQuality || false,
    shouldDisableWebGL: metrics?.recommendations.disableWebGL || false,
    shouldDisableBackgroundEffects: metrics?.recommendations.disableBackgroundEffects || false,
    targetFPS: metrics?.recommendations.reduceFPS || 60,
  };

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}
