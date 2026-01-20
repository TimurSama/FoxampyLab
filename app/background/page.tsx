"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';
import InkFluidVariant1 from '@/components/backgrounds/InkFluidVariant1';
import InkFluidVariant2 from '@/components/backgrounds/InkFluidVariant2';
import InkFluidVariant3 from '@/components/backgrounds/InkFluidVariant3';
import InkFluidVariant4 from '@/components/backgrounds/InkFluidVariant4';
import InkFluidVariant5 from '@/components/backgrounds/InkFluidVariant5';
import InkFluidVariant6 from '@/components/backgrounds/InkFluidVariant6';
import InkFluidVariant7 from '@/components/backgrounds/InkFluidVariant7';
import InkFluidVariant8 from '@/components/backgrounds/InkFluidVariant8';

export default function BackgroundPage() {
  const { t } = useI18n();
  const [activeVariant, setActiveVariant] = useState(1);
  
  const variants = [
    { id: 1, name: t('background.variant1.name'), component: InkFluidVariant1, description: t('background.variant1.description') },
    { id: 2, name: t('background.variant2.name'), component: InkFluidVariant2, description: t('background.variant2.description') },
    { id: 3, name: t('background.variant3.name'), component: InkFluidVariant3, description: t('background.variant3.description') },
    { id: 4, name: t('background.variant4.name'), component: InkFluidVariant4, description: t('background.variant4.description') },
    { id: 5, name: t('background.variant5.name'), component: InkFluidVariant5, description: t('background.variant5.description') },
    { id: 6, name: t('background.variant6.name'), component: InkFluidVariant6, description: t('background.variant6.description') },
    { id: 7, name: t('background.variant7.name'), component: InkFluidVariant7, description: t('background.variant7.description') },
    { id: 8, name: t('background.variant8.name'), component: InkFluidVariant8, description: t('background.variant8.description') },
  ];
  
  const ActiveComponent = variants.find(v => v.id === activeVariant)?.component || InkFluidVariant1;

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0]">
      <Header />
      
      <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4">
              {t('background.title')}
            </h1>
            <p className="font-mono text-sm md:text-base text-[#E0E0E0]/60">
              {t('background.description')}
            </p>
          </div>

          {/* Вкладки */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 md:gap-4 min-w-max pb-2">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant.id)}
                  className={`px-4 md:px-6 py-3 border font-mono text-xs md:text-sm transition-all whitespace-nowrap
                    ${
                      activeVariant === variant.id
                        ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                        : 'border-[#E0E0E0]/20 bg-[#050505]/50 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40 hover:text-[#E0E0E0]'
                    }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Описание активного варианта */}
          <div className="mb-6 text-center">
            <p className="font-mono text-sm text-[#E0E0E0]/80">
              {variants.find(v => v.id === activeVariant)?.description}
            </p>
          </div>

          {/* Canvas с фоном */}
          <div className="relative w-full h-[600px] md:h-[700px] border border-[#E0E0E0]/20 bg-[#050505]">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 50 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
              }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#050505']} />
              <PerspectiveCamera makeDefault position={[0, 0, 10]} />
              <ambientLight intensity={0.5} />
              <Suspense fallback={null}>
                <ActiveComponent />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </main>
    </div>
  );
}

