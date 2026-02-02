"use client";

import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
  budget?: {
    allocated: number;
    spent?: number;
    breakdown?: Array<{ category: string; amount: number; description?: string }>;
  };
}

interface TimelineProps {
  items: TimelineItem[];
  totalBudget?: number;
  totalInvested?: number;
  showBudget?: boolean;
}

export default function Timeline({ items, totalBudget, totalInvested, showBudget = true }: TimelineProps) {
  return (
    <div className="relative">
      {/* Общая финансовая информация */}
      {showBudget && totalBudget && (
        <div className="mb-8 p-6 border border-[#E0E0E0]/20 bg-[#050505]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">Total Budget</div>
              <div className="text-2xl font-mono font-light text-[#E0E0E0]">
                ${(totalBudget / 1000).toFixed(0)}K
              </div>
            </div>
            {totalInvested !== undefined && (
              <div>
                <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">Invested</div>
                <div className="text-2xl font-mono font-light text-[#E0E0E0]">
                  ${(totalInvested / 1000).toFixed(0)}K
                </div>
                <div className="text-xs font-mono text-[#E0E0E0]/60 mt-1">
                  {((totalInvested / totalBudget) * 100).toFixed(0)}% of total
                </div>
              </div>
            )}
            {totalInvested !== undefined && (
              <div>
                <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">Remaining</div>
                <div className="text-2xl font-mono font-light text-[#E0E0E0]">
                  ${((totalBudget - totalInvested) / 1000).toFixed(0)}K
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute left-4 top-0 bottom-0 w-px bg-[#E0E0E0]/20" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const status = item.status || (index === 0 ? 'current' : index < items.length / 2 ? 'completed' : 'upcoming');
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          const spentPercent = item.budget?.spent && item.budget?.allocated
            ? (item.budget.spent / item.budget.allocated) * 100
            : 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-1">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isCompleted
                    ? 'bg-[#E0E0E0] border-[#E0E0E0]'
                    : isCurrent
                      ? 'bg-[#050505] border-[#E0E0E0]'
                      : 'bg-[#050505] border-[#E0E0E0]/30'
                  }`}>
                  {isCompleted && (
                    <div className="w-3 h-3 bg-[#050505] rounded-full" />
                  )}
                  {isCurrent && (
                    <div className="w-3 h-3 bg-[#E0E0E0] rounded-full animate-pulse" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider">
                    {item.period}
                  </div>
                  <h3 className={`font-mono text-lg font-light ${isCurrent ? 'text-[#E0E0E0]' : isCompleted ? 'text-[#E0E0E0]/80' : 'text-[#E0E0E0]/60'
                    }`}>
                    {item.title}
                  </h3>
                  <p className={`font-mono text-sm leading-relaxed ${isCurrent ? 'text-[#E0E0E0]/90' : 'text-[#E0E0E0]/60'
                    }`}>
                    {item.description}
                  </p>
                </div>

                {/* Финансовая информация для этапа */}
                {showBudget && item.budget && (
                  <div className="mt-4 p-4 border border-[#E0E0E0]/10 bg-[#050505]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign size={16} className="text-[#E0E0E0]/60" />
                      <span className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider">Budget Allocation</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-[#E0E0E0]/80">Allocated</span>
                        <span className="font-mono text-sm text-[#E0E0E0]">
                          {item.budget.allocated >= 1000000
                            ? `$${(item.budget.allocated / 1000000).toFixed(2)}M`
                            : `$${(item.budget.allocated / 1000).toFixed(0)}K`}
                        </span>
                      </div>

                      {item.budget.spent !== undefined && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-[#E0E0E0]/80">Spent</span>
                            <span className="font-mono text-sm text-[#E0E0E0]">
                              {item.budget.spent >= 1000000
                                ? `$${(item.budget.spent / 1000000).toFixed(2)}M`
                                : `$${(item.budget.spent / 1000).toFixed(0)}K`}
                            </span>
                          </div>
                          <div className="h-2 bg-[#050505] border border-[#E0E0E0]/20 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(spentPercent, 100)}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                              className="h-full bg-[#E0E0E0]"
                            />
                          </div>
                        </>
                      )}

                      {item.budget.breakdown && item.budget.breakdown.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#E0E0E0]/10 space-y-2">
                          <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">Breakdown</div>
                          {item.budget.breakdown.map((breakdown, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="font-mono text-xs text-[#E0E0E0]/80">{breakdown.category}</div>
                                {breakdown.description && (
                                  <div className="font-mono text-[10px] text-[#E0E0E0]/50 mt-0.5">{breakdown.description}</div>
                                )}
                              </div>
                              <span className="font-mono text-xs text-[#E0E0E0]">
                                {breakdown.amount >= 1000000
                                  ? `$${(breakdown.amount / 1000000).toFixed(2)}M`
                                  : `$${(breakdown.amount / 1000).toFixed(0)}K`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

