/**
 * Система определения производительности устройства и адаптации анимаций
 */

export type PerformanceLevel = 'high' | 'medium' | 'low' | 'very-low';

export interface PerformanceMetrics {
  level: PerformanceLevel;
  score: number;
  reasons: string[];
  recommendations: {
    disableAnimations: boolean;
    reduceQuality: boolean;
    disableWebGL: boolean;
    disableBackgroundEffects: boolean;
    reduceFPS: number;
  };
}

// Бенчмарк производительности
const benchmarkPerformance = (): Promise<number> => {
  return new Promise((resolve) => {
    const start = performance.now();
    let iterations = 0;
    const maxTime = 100; // 100ms на бенчмарк
    
    const runBenchmark = () => {
      // Простой математический тест
      for (let i = 0; i < 1000; i++) {
        Math.sqrt(i * Math.random());
      }
      iterations++;
      
      const elapsed = performance.now() - start;
      if (elapsed < maxTime) {
        requestAnimationFrame(runBenchmark);
      } else {
        // Чем больше итераций за время, тем лучше производительность
        const score = (iterations / maxTime) * 100;
        resolve(score);
      }
    };
    
    requestAnimationFrame(runBenchmark);
  });
};

// Проверка FPS
const checkFPS = (): Promise<number> => {
  return new Promise((resolve) => {
    let frames = 0;
    let lastTime = performance.now();
    
    const countFPS = (currentTime: number) => {
      frames++;
      if (currentTime - lastTime >= 1000) {
        resolve(frames);
        return;
      }
      requestAnimationFrame(countFPS);
    };
    
    requestAnimationFrame(countFPS);
  });
};

// Основная функция определения производительности
export const detectPerformance = async (): Promise<PerformanceMetrics> => {
  if (typeof window === 'undefined') {
    return {
      level: 'high',
      score: 100,
      reasons: [],
      recommendations: {
        disableAnimations: false,
        reduceQuality: false,
        disableWebGL: false,
        disableBackgroundEffects: false,
        reduceFPS: 60,
      },
    };
  }

  const reasons: string[] = [];
  let score = 100;

  // 1. Проверка мобильного устройства
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  if (isMobile) {
    score -= 20;
    reasons.push('Mobile device detected');
  }

  // 2. Проверка количества ядер CPU
  const cores = navigator.hardwareConcurrency || 2;
  if (cores < 4) {
    score -= 25;
    reasons.push(`Low CPU cores: ${cores}`);
  } else if (cores < 8) {
    score -= 10;
    reasons.push(`Medium CPU cores: ${cores}`);
  }

  // 3. Проверка памяти устройства
  const memory = (navigator as any).deviceMemory || 4;
  if (memory < 4) {
    score -= 30;
    reasons.push(`Low device memory: ${memory}GB`);
  } else if (memory < 8) {
    score -= 15;
    reasons.push(`Medium device memory: ${memory}GB`);
  }

  // 4. Проверка соединения
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      score -= 20;
      reasons.push(`Slow connection: ${effectiveType}`);
    } else if (effectiveType === '3g') {
      score -= 10;
      reasons.push(`Medium connection: ${effectiveType}`);
    }
  }

  // 5. Проверка батареи (если доступно)
  const battery = (navigator as any).getBattery ? await (navigator as any).getBattery().catch(() => null) : null;
  if (battery && battery.level < 0.2) {
    score -= 15;
    reasons.push('Low battery level');
  }

  // 6. Проверка prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    score -= 10;
    reasons.push('User prefers reduced motion');
  }

  // 7. Бенчмарк производительности
  try {
    const benchmarkScore = await benchmarkPerformance();
    if (benchmarkScore < 50) {
      score -= 20;
      reasons.push('Low benchmark performance');
    } else if (benchmarkScore < 100) {
      score -= 10;
      reasons.push('Medium benchmark performance');
    }
  } catch (e) {
    // Игнорируем ошибки бенчмарка
  }

  // 8. Проверка FPS
  try {
    const fps = await checkFPS();
    if (fps < 30) {
      score -= 25;
      reasons.push(`Low FPS: ${fps}`);
    } else if (fps < 50) {
      score -= 15;
      reasons.push(`Medium FPS: ${fps}`);
    }
  } catch (e) {
    // Игнорируем ошибки FPS
  }

  // Определяем уровень производительности
  let level: PerformanceLevel;
  if (score >= 80) {
    level = 'high';
  } else if (score >= 60) {
    level = 'medium';
  } else if (score >= 40) {
    level = 'low';
  } else {
    level = 'very-low';
  }

  // Рекомендации на основе уровня
  const recommendations = {
    disableAnimations: level === 'very-low' || prefersReducedMotion,
    reduceQuality: level === 'low' || level === 'very-low',
    disableWebGL: level === 'low' || level === 'very-low' || isMobile,
    disableBackgroundEffects: level === 'very-low',
    reduceFPS: level === 'high' ? 60 : level === 'medium' ? 30 : level === 'low' ? 20 : 15,
  };

  return {
    level,
    score: Math.max(0, Math.min(100, score)),
    reasons,
    recommendations,
  };
};

// Кэширование результата
let cachedPerformance: PerformanceMetrics | null = null;

export const getCachedPerformance = (): PerformanceMetrics | null => {
  return cachedPerformance;
};

export const setCachedPerformance = (metrics: PerformanceMetrics): void => {
  cachedPerformance = metrics;
  // Сохраняем в localStorage для последующих загрузок
  try {
    localStorage.setItem('performance_metrics', JSON.stringify(metrics));
  } catch (e) {
    // Игнорируем ошибки localStorage
  }
};

export const loadCachedPerformance = (): PerformanceMetrics | null => {
  if (cachedPerformance) return cachedPerformance;
  
  try {
    const stored = localStorage.getItem('performance_metrics');
    if (stored) {
      cachedPerformance = JSON.parse(stored);
      return cachedPerformance;
    }
  } catch (e) {
    // Игнорируем ошибки
  }
  
  return null;
};
