"use client";

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Percent, MessageCircle, Sparkles, Zap, Crown, Star, Gem } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefit: string;
  code: string;
  discovered: boolean;
  discoveredAt?: Date;
  triggerHint: string;
}

const defaultRewards: Reward[] = [
  {
    id: 'FIRST_CLICK',
    name: 'Первое прикосновение',
    description: 'Нажал на центральную сферу',
    icon: <Sparkles size={20} />,
    benefit: '10% скидка на первый проект',
    code: 'FIRST10',
    discovered: false,
    triggerHint: 'Сфера в центре экрана'
  },
  {
    id: 'GLOBE_EXPLORER',
    name: 'Исследователь',
    description: 'Повращал глобус на 360°',
    icon: <Star size={20} />,
    benefit: 'Бесплатная консультация 30 мин',
    code: 'CONSULT30',
    discovered: false,
    triggerHint: 'Глобус в секции присутствия'
  },
  {
    id: 'MENU_MASTER',
    name: 'Навигатор',
    description: 'Открыл все пункты меню',
    icon: <Zap size={20} />,
    benefit: 'Приоритетная очередь проекта',
    code: 'PRIORITY',
    discovered: false,
    triggerHint: 'Веерное меню снизу'
  },
  {
    id: 'NIGHT_VISITOR',
    name: 'Ночной гость',
    description: 'Посетил сайт после полуночи',
    icon: <Crown size={20} />,
    benefit: '15% скидка на любой проект',
    code: 'NIGHT15',
    discovered: false,
    triggerHint: 'Посети нас после 00:00'
  },
  {
    id: 'TERRAIN_ARTIST',
    name: 'Художник данных',
    description: 'Создал волну на террейне',
    icon: <Gem size={20} />,
    benefit: 'Бесплатный аудит проекта',
    code: 'AUDIT',
    discovered: false,
    triggerHint: 'Интерактивная сетка данных'
  },
  {
    id: 'LONG_READER',
    name: 'Внимательный',
    description: 'Провёл на сайте более 3 минут',
    icon: <Gift size={20} />,
    benefit: 'Расширенное коммерческое предложение',
    code: 'EXTENDED',
    discovered: false,
    triggerHint: 'Изучай сайт внимательно'
  },
  {
    id: 'SCROLL_MASTER',
    name: 'Путешественник',
    description: 'Прокрутил до конца страницы',
    icon: <Percent size={20} />,
    benefit: '5% скидка + бонусная правка',
    code: 'SCROLL5',
    discovered: false,
    triggerHint: 'Прокрути до самого низа'
  },
  {
    id: 'CONTACT_READY',
    name: 'Готов к диалогу',
    description: 'Навёл на все CTA кнопки',
    icon: <MessageCircle size={20} />,
    benefit: 'Экспресс-ответ в течение 1 часа',
    code: 'EXPRESS',
    discovered: false,
    triggerHint: 'Исследуй все кнопки действия'
  },
];

interface RewardContextType {
  rewards: Reward[];
  discoverReward: (id: string) => void;
  showRewardsPanel: boolean;
  setShowRewardsPanel: (show: boolean) => void;
  totalDiscovered: number;
  collectedRewards: Reward[];
}

const RewardContext = createContext<RewardContextType | null>(null);

export function useRewards() {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error('useRewards must be used within RewardProvider');
  }
  return context;
}

export function RewardProvider({ children }: { children: React.ReactNode }) {
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards);
  const [notification, setNotification] = useState<Reward | null>(null);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);
  const [timeOnSite, setTimeOnSite] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fractalix-rewards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRewards(prev => prev.map(r => ({
          ...r,
          discovered: parsed[r.id]?.discovered || false,
          discoveredAt: parsed[r.id]?.discoveredAt ? new Date(parsed[r.id].discoveredAt) : undefined
        })));
      } catch (e) {
        console.error('Failed to parse rewards', e);
      }
    }

    // Check time-based rewards
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      setTimeout(() => discoverReward('NIGHT_VISITOR'), 2000);
    }
  }, []);

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnSite(prev => {
        const newTime = prev + 1;
        if (newTime >= 180 && !rewards.find(r => r.id === 'LONG_READER')?.discovered) {
          discoverReward('LONG_READER');
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [rewards]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        discoverReward('SCROLL_MASTER');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save to localStorage
  useEffect(() => {
    const toSave = rewards.reduce((acc, r) => ({
      ...acc,
      [r.id]: { discovered: r.discovered, discoveredAt: r.discoveredAt?.toISOString() }
    }), {});
    localStorage.setItem('fractalix-rewards', JSON.stringify(toSave));
  }, [rewards]);

  const discoverReward = useCallback((id: string) => {
    setRewards(prev => {
      const reward = prev.find(r => r.id === id);
      if (!reward || reward.discovered) return prev;

      const updated = { ...reward, discovered: true, discoveredAt: new Date() };
      setNotification(updated);
      // Don't auto-hide - user must dismiss or it goes to collection
      setTimeout(() => setNotification(null), 8000);

      return prev.map(r => r.id === id ? updated : r);
    });
  }, []);

  const totalDiscovered = rewards.filter(r => r.discovered).length;
  const collectedRewards = rewards.filter(r => r.discovered);

  return (
    <RewardContext.Provider value={{ 
      rewards, 
      discoverReward,
      showRewardsPanel,
      setShowRewardsPanel,
      totalDiscovered,
      collectedRewards
    }}>
      {children}
      
      {/* MONOCHROME Reward notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[200]"
          >
            <div className="bg-ink-chrome/95 backdrop-blur-xl border border-engrave-line/30 px-6 py-5 max-w-sm">
              <div className="flex items-start gap-4">
                <div className="text-engrave-line mt-1">
                  {notification.icon}
                </div>
                <div>
                  <div className="font-mono text-[10px] text-engrave-line tracking-widest mb-1">
                    ◈ НАГРАДА НАЙДЕНА
                  </div>
                  <div className="font-mono text-sm text-engrave-fresco mb-1">
                    {notification.name}
                  </div>
                  <div className="font-mono text-[10px] text-stone-slate mb-3">
                    {notification.description}
                  </div>
                  <div className="bg-ink-deep/50 border border-stone-anthracite/30 px-3 py-2">
                    <div className="font-mono text-[9px] text-stone-slate mb-1">
                      ВАША НАГРАДА:
                    </div>
                    <div className="font-mono text-xs text-engrave-fresco">
                      {notification.benefit}
                    </div>
                    <div className="font-mono text-[10px] text-stone-slate mt-2">
                      Код: <span className="text-engrave-line select-all">{notification.code}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="absolute top-2 right-2 text-stone-slate hover:text-engrave-line text-xs"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MONOCHROME Rewards panel */}
      <AnimatePresence>
        {showRewardsPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-ink-deep/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowRewardsPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-ink-chrome/95 border border-stone-anthracite/50 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4 border-b border-stone-anthracite/30">
                <div className="flex items-center gap-3">
                  <Gift size={20} className="text-engrave-line" />
                  <div>
                    <h2 className="font-mono text-lg text-engrave-fresco tracking-wider">
                      СКРЫТЫЕ НАГРАДЫ
                    </h2>
                    <p className="font-mono text-[10px] text-stone-slate mt-1">
                      {totalDiscovered} / {rewards.length} найдено
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {rewards.map(reward => (
                  <div 
                    key={reward.id}
                    className={`p-4 border transition-colors ${
                      reward.discovered 
                        ? 'border-engrave-line/30 bg-engrave-line/5' 
                        : 'border-stone-anthracite/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={reward.discovered ? 'text-engrave-line' : 'text-stone-anthracite'}>
                        {reward.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-mono text-sm text-engrave-fresco">
                            {reward.name}
                          </div>
                          {reward.discovered && (
                            <span className="font-mono text-[8px] text-engrave-line">✓ НАЙДЕНО</span>
                          )}
                        </div>
                        
                        {reward.discovered ? (
                          <>
                            <div className="font-mono text-[10px] text-stone-slate mt-1">
                              {reward.description}
                            </div>
                            <div className="mt-2 bg-ink-deep/50 border border-stone-anthracite/30 px-2 py-1.5">
                              <div className="font-mono text-[10px] text-engrave-fresco">
                                {reward.benefit}
                              </div>
                              <div className="font-mono text-[9px] text-stone-slate mt-1">
                                Код: <span className="text-engrave-line select-all">{reward.code}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="font-mono text-[10px] text-stone-slate mt-1">
                            ◈ Подсказка: {reward.triggerHint}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-stone-anthracite/30 bg-ink-deep/50">
                <div className="font-mono text-[9px] text-stone-slate text-center">
                  Используйте коды при оформлении заказа
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </RewardContext.Provider>
  );
}
