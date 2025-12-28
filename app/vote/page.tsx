"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Check, ChevronLeft, Eye, X } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';
import { useLocale } from '@/contexts/LocaleContext';

interface DesignVariant {
  id: string;
  name: string;
  description: string;
  preview: string; // Would be image URL in production
  features: string[];
  path: string;
  color: string;
}

export default function VotePage() {
  const { t } = useLocale();
  const [selectedVariants, setSelectedVariants] = useState<Set<string>>(new Set());
  const [hasVoted, setHasVoted] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<DesignVariant | null>(null);

  const designVariants: DesignVariant[] = [
    {
      id: 'design-a',
      name: t('vote.variants.a.name'),
      description: t('vote.variants.a.description'),
      preview: '/variants/a',
      features: String(t('vote.variants.a.features')).split(','),
      path: '/variants/a',
      color: '#e8e8e8'
    },
    {
      id: 'design-b',
      name: t('vote.variants.b.name'),
      description: t('vote.variants.b.description'),
      preview: '/variants/b',
      features: String(t('vote.variants.b.features')).split(','),
      path: '/variants/b',
      color: '#00ffff'
    },
    {
      id: 'design-c',
      name: t('vote.variants.c.name'),
      description: t('vote.variants.c.description'),
      preview: '/variants/c',
      features: String(t('vote.variants.c.features')).split(','),
      path: '/variants/c',
      color: '#808080'
    },
    {
      id: 'design-d',
      name: t('vote.variants.d.name'),
      description: t('vote.variants.d.description'),
      preview: '/variants/d',
      features: String(t('vote.variants.d.features')).split(','),
      path: '/variants/d',
      color: '#c0c0c0'
    },
    {
      id: 'design-e',
      name: t('vote.variants.e.name'),
      description: t('vote.variants.e.description'),
      preview: '/variants/e',
      features: String(t('vote.variants.e.features')).split(','),
      path: '/variants/e',
      color: '#00ff00'
    },
    {
      id: 'design-f',
      name: t('vote.variants.f.name'),
      description: t('vote.variants.f.description'),
      preview: '/variants/f',
      features: String(t('vote.variants.f.features')).split(','),
      path: '/variants/f',
      color: '#ffffff'
    },
  ];

  useEffect(() => {
    const voted = localStorage.getItem('fractalix-voted');
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const toggleVariant = (id: string) => {
    const newSet = new Set(selectedVariants);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedVariants(newSet);
  };

  const handleVote = () => {
    if (selectedVariants.size === 0) return;
    
    // In production would send to API
    console.log('Voted for:', Array.from(selectedVariants));
    localStorage.setItem('fractalix-voted', 'true');
    localStorage.setItem('fractalix-votes', JSON.stringify(Array.from(selectedVariants)));
    setHasVoted(true);
  };

  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-stone-slate 
                                   hover:text-engrave-line transition-colors mb-8">
            <ChevronLeft size={12} />
            {t('common.back')}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
              ─── {t('vote.title')} ───
            </div>
            <h1 className="text-4xl md:text-5xl font-mono text-engrave-fresco tracking-tight mb-4">
              {t('vote.subtitle')}
            </h1>
            <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto">
              {t('vote.description')}
            </p>
          </motion.div>

          {hasVoted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 border border-engrave-line flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-engrave-line" />
              </div>
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                {t('vote.thankYou')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-8">
                {t('vote.thankYouDesc')}
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-stone-anthracite/50 font-mono text-sm text-engrave-line
                           hover:border-engrave-line/30 transition-colors"
                >
                  {t('vote.backToHome')}
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Design Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {designVariants.map((variant, i) => (
                  <motion.div
                    key={variant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative group border transition-all cursor-pointer ${
                      selectedVariants.has(variant.id)
                        ? 'border-engrave-line bg-engrave-line/5'
                        : 'border-stone-anthracite/30 hover:border-engrave-line/30'
                    }`}
                    onClick={() => toggleVariant(variant.id)}
                  >
                    {/* Preview Area */}
                    <div className="aspect-video bg-ink-chrome/50 relative overflow-hidden">
                      {/* Placeholder pattern */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-24 h-24 border-2 opacity-20"
                          style={{ borderColor: variant.color }}
                        >
                          <div 
                            className="w-full h-full border-2 m-2"
                            style={{ borderColor: variant.color }}
                          />
                        </div>
                      </div>
                      
                      {/* Preview button */}
                      {variant.path && (
                        <Link href={variant.path} onClick={(e) => e.stopPropagation()}>
                          <button
                            className="absolute top-2 right-2 p-2 bg-ink-deep/80 border border-stone-anthracite/50
                                     opacity-0 group-hover:opacity-100 transition-opacity hover:border-engrave-line/30"
                          >
                            <Eye size={14} className="text-engrave-line" />
                          </button>
                        </Link>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-mono text-sm text-engrave-fresco">
                          {variant.name}
                        </h3>
                        {/* Checkbox */}
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                          selectedVariants.has(variant.id)
                            ? 'border-engrave-line bg-engrave-line'
                            : 'border-stone-anthracite/50'
                        }`}>
                          {selectedVariants.has(variant.id) && (
                            <Check size={12} className="text-ink-deep" />
                          )}
                        </div>
                      </div>
                      
                      <p className="font-mono text-[10px] text-stone-slate mb-3">
                        {variant.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                      {variant.features.map((feature, j) => (
                        <span 
                          key={j}
                          className="font-mono text-[8px] px-2 py-1 border border-stone-anthracite/30 text-stone-slate"
                        >
                          {feature.trim()}
                        </span>
                      ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Vote Button */}
              <div className="text-center">
                <motion.button
                  onClick={handleVote}
                  disabled={selectedVariants.size === 0}
                  whileHover={{ scale: selectedVariants.size > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: selectedVariants.size > 0 ? 0.98 : 1 }}
                  className={`px-12 py-5 font-mono text-sm tracking-widest flex items-center gap-3 mx-auto
                            transition-all ${
                    selectedVariants.size > 0
                      ? 'bg-engrave-fresco text-ink-deep'
                      : 'bg-stone-anthracite/50 text-stone-slate cursor-not-allowed'
                  }`}
                >
                  <Vote size={18} />
                  {t('vote.voteButton')} ({selectedVariants.size})
                </motion.button>
                
                <p className="font-mono text-[10px] text-stone-slate mt-4">
                  {t('vote.selected')}: {selectedVariants.size} {t('vote.of')} {designVariants.length}
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewVariant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink-deep/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreviewVariant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ink-chrome border border-stone-anthracite/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-4 border-b border-stone-anthracite/30 flex items-center justify-between">
                <h3 className="font-mono text-sm text-engrave-fresco">{previewVariant.name}</h3>
                <button onClick={() => setPreviewVariant(null)} className="text-stone-slate hover:text-engrave-line">
                  <X size={18} />
                </button>
              </div>
              
              <div className="aspect-video bg-ink-deep flex items-center justify-center">
                <p className="font-mono text-sm text-stone-slate">
                  {t('vote.previewUnavailable')}
                </p>
              </div>
              
              <div className="p-4 border-t border-stone-anthracite/30">
                <p className="font-mono text-[10px] text-stone-slate">
                  {previewVariant.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FanMenu />
    </div>
  );
}

