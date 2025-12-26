"use client";

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Eye, Terminal, Moon, Sun, Skull, Compass } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'EXPLORER',
    name: 'Explorer',
    description: 'Посетил все секции сайта',
    icon: <Compass size={20} />,
    unlocked: false,
  },
  {
    id: 'CURIOUS',
    name: 'Curious',
    description: 'Нашёл секретную команду',
    icon: <Eye size={20} />,
    unlocked: false,
  },
  {
    id: 'HACKER',
    name: 'Hacker',
    description: 'Попытался взломать систему',
    icon: <Terminal size={20} />,
    unlocked: false,
  },
  {
    id: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Посетил сайт после полуночи',
    icon: <Moon size={20} />,
    unlocked: false,
  },
  {
    id: 'EARLY_BIRD',
    name: 'Early Bird',
    description: 'Посетил сайт до 6 утра',
    icon: <Sun size={20} />,
    unlocked: false,
  },
  {
    id: 'DANGER_ZONE',
    name: 'Danger Zone',
    description: 'Попробовал опасную команду',
    icon: <Skull size={20} />,
    unlocked: false,
  },
  {
    id: 'MATRIX_MASTER',
    name: 'Matrix Master',
    description: 'Вошёл в матрицу',
    icon: <Star size={20} />,
    unlocked: false,
  },
  {
    id: 'KONAMI_MASTER',
    name: 'Konami Master',
    description: 'Ввёл код Konami',
    icon: <Trophy size={20} />,
    unlocked: false,
  },
];

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  showAchievementsPanel: boolean;
  setShowAchievementsPanel: (show: boolean) => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider');
  }
  return context;
}

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [notification, setNotification] = useState<Achievement | null>(null);
  const [showAchievementsPanel, setShowAchievementsPanel] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fractalix-achievements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAchievements(prev => prev.map(a => ({
          ...a,
          unlocked: parsed[a.id]?.unlocked || false,
          unlockedAt: parsed[a.id]?.unlockedAt ? new Date(parsed[a.id].unlockedAt) : undefined
        })));
      } catch (e) {
        console.error('Failed to parse achievements', e);
      }
    }

    // Check time-based achievements
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      unlockAchievement('NIGHT_OWL');
    }
    if (hour >= 4 && hour < 6) {
      unlockAchievement('EARLY_BIRD');
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const toSave = achievements.reduce((acc, a) => ({
      ...acc,
      [a.id]: { unlocked: a.unlocked, unlockedAt: a.unlockedAt?.toISOString() }
    }), {});
    localStorage.setItem('fractalix-achievements', JSON.stringify(toSave));
  }, [achievements]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (!achievement || achievement.unlocked) return prev;

      // Show notification
      const updated = { ...achievement, unlocked: true, unlockedAt: new Date() };
      setNotification(updated);
      setTimeout(() => setNotification(null), 4000);

      return prev.map(a => a.id === id ? updated : a);
    });
  }, []);

  return (
    <AchievementContext.Provider value={{ 
      achievements, 
      unlockAchievement,
      showAchievementsPanel,
      setShowAchievementsPanel
    }}>
      {children}
      
      {/* Achievement notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[200] pointer-events-none"
          >
            <div className="bg-ink-chrome/95 backdrop-blur-xl border border-engrave-line/30 px-6 py-4 flex items-center gap-4">
              <div className="text-engrave-line">
                {notification.icon}
              </div>
              <div>
                <div className="font-mono text-[10px] text-stone-graphite tracking-widest mb-1">
                  ACHIEVEMENT UNLOCKED
                </div>
                <div className="font-mono text-sm text-engrave-fresco">
                  {notification.name}
                </div>
                <div className="font-mono text-[10px] text-stone-graphite">
                  {notification.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements panel */}
      <AnimatePresence>
        {showAchievementsPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-ink-deep/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowAchievementsPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-ink-chrome/95 border border-stone-anthracite/50 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4 border-b border-stone-anthracite/30">
                <h2 className="font-mono text-lg text-engrave-fresco tracking-wider">
                  ACHIEVEMENTS
                </h2>
                <p className="font-mono text-[10px] text-stone-graphite mt-1">
                  {achievements.filter(a => a.unlocked).length} / {achievements.length} unlocked
                </p>
              </div>
              
              <div className="p-4 space-y-3">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center gap-4 p-3 border transition-colors ${
                      achievement.unlocked 
                        ? 'border-engrave-line/30 bg-engrave-line/5' 
                        : 'border-stone-anthracite/30 opacity-50'
                    }`}
                  >
                    <div className={achievement.unlocked ? 'text-engrave-line' : 'text-stone-graphite'}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-engrave-fresco">
                        {achievement.name}
                      </div>
                      <div className="font-mono text-[10px] text-stone-graphite">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="font-mono text-[8px] text-engrave-dim">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

