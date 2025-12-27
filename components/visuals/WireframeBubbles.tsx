"use client";

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

const bubbles = [
  {
    id: 'design',
    name: 'DESIGN',
    description: 'UI/UX дизайн, брендинг, визуальная коммуникация. Создаём интерфейсы, которые не только красивы, но и функциональны.',
    connections: ['CODE', 'MARKETING'],
    position: [0, 0, 0] as [number, number, number],
    radius: 0.8,
    color: '#e8e8e8', // engrave-line
  },
  {
    id: 'code',
    name: 'CODE',
    description: 'Frontend, Backend, Blockchain разработка. Пишем чистый, масштабируемый код на современных технологиях.',
    connections: ['DESIGN', 'RESEARCH'],
    position: [0.9, 0.5, 0.3] as [number, number, number],
    radius: 0.6,
    color: '#c8c8d0', // engrave-mid
  },
  {
    id: 'research',
    name: 'RESEARCH',
    description: 'Научные исследования, эксперименты, публикации. Изучаем новые технологии и методологии.',
    connections: ['CODE', 'MARKETING'],
    position: [-0.7, 0.6, 0.2] as [number, number, number],
    radius: 0.55,
    color: '#9a9aa8', // stone-slate
  },
  {
    id: 'marketing',
    name: 'MARKETING',
    description: 'Продвижение, контент, community. Рассказываем истории о продуктах и создаём сообщества.',
    connections: ['DESIGN', 'RESEARCH'],
    position: [0.5, -0.6, 0.4] as [number, number, number],
    radius: 0.5,
    color: '#8888a0', // engrave-dim
  },
  {
    id: 'blockchain',
    name: 'BLOCKCHAIN',
    description: 'Смарт-контракты, DeFi, Web3. Создаём децентрализованные решения будущего.',
    connections: ['CODE', 'RESEARCH'],
    position: [-0.5, -0.5, 0.5] as [number, number, number],
    radius: 0.45,
    color: '#6b6b6b', // dim
  },
  {
    id: 'ai',
    name: 'AI/ML',
    description: 'Искусственный интеллект, машинное обучение. Интегрируем AI в продукты для создания умных решений.',
    connections: ['CODE', 'RESEARCH', 'DESIGN'],
    position: [0.3, 0.9, -0.3] as [number, number, number],
    radius: 0.4,
    color: '#4a4a52', // stone-graphite
  },
];

function Bubble({ 
  position, 
  radius, 
  color, 
  isActive, 
  isConnected 
}: { 
  position: [number, number, number]; 
  radius: number; 
  color: string;
  isActive: boolean;
  isConnected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={isActive ? 0.8 : isConnected ? 0.4 : 0.2}
      />
    </mesh>
  );
}

type BubbleType = typeof bubbles[0];

function ConnectionLines({ 
  bubbles, 
  activeBubble 
}: { 
  bubbles: BubbleType[]; 
  activeBubble: string | null;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const active = bubbles.find(b => b.id === activeBubble);
    
    if (!active) return new THREE.BufferGeometry();
    
    // Draw lines to connected bubbles
    active.connections.forEach(connName => {
      const connected = bubbles.find(b => b.name === connName);
      if (connected) {
        positions.push(...active.position);
        positions.push(...connected.position);
      }
    });
    
    const geo = new THREE.BufferGeometry();
    if (positions.length > 0) {
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    }
    return geo;
  }, [bubbles, activeBubble]);

  if (geometry.attributes.position?.count === 0) {
    return null;
  }

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#e8e8e8" transparent opacity={0.4} />
    </lineSegments>
  );
}

function Scene({ activeBubble }: { activeBubble: string | null }) {
  const activeBubbleData = bubbles.find(b => b.id === activeBubble);
  const connectedIds = activeBubbleData?.connections.map(c => 
    bubbles.find(b => b.name === c)?.id
  ).filter(Boolean) || [];

  return (
    <>
      <ambientLight intensity={0.5} />
      
      <group>
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            position={bubble.position}
            radius={bubble.radius}
            color={bubble.color}
            isActive={activeBubble === bubble.id}
            isConnected={connectedIds.includes(bubble.id)}
          />
        ))}
        
        <ConnectionLines bubbles={bubbles} activeBubble={activeBubble} />
      </group>
    </>
  );
}

export default function WireframeBubbles() {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBubble = () => {
    const next = (currentIndex + 1) % bubbles.length;
    setCurrentIndex(next);
    setActiveBubble(bubbles[next].id);
  };

  const prevBubble = () => {
    const prev = currentIndex === 0 ? bubbles.length - 1 : currentIndex - 1;
    setCurrentIndex(prev);
    setActiveBubble(bubbles[prev].id);
  };

  const currentBubble = bubbles[currentIndex];

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene activeBubble={activeBubble} />
      </Canvas>
      
      {/* Navigation */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-10">
        <button
          onClick={prevBubble}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronLeft size={16} className="text-engrave-line" />
        </button>
        
        <div className="flex gap-1">
          {bubbles.map((bubble, i) => (
            <button
              key={bubble.id}
              onClick={() => {
                setCurrentIndex(i);
                setActiveBubble(bubble.id);
              }}
              className={`w-2 h-2 border transition-all ${
                activeBubble === bubble.id
                  ? 'bg-engrave-line border-engrave-line'
                  : 'bg-stone-anthracite border-stone-anthracite/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextBubble}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronRight size={16} className="text-engrave-line" />
        </button>
      </div>

      {/* Bubble Info Panel */}
      <AnimatePresence>
        {activeBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-auto md:w-80 
                     bg-ink-chrome/95 border border-stone-anthracite/50 p-3 md:p-4 backdrop-blur-xl z-10"
          >
            <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-2">
              {currentIndex + 1} / {bubbles.length}
            </div>
            <h3 className="font-mono text-sm text-engrave-fresco mb-2">
              {currentBubble.name}
            </h3>
            <p className="font-mono text-[10px] text-stone-slate leading-relaxed mb-3">
              {currentBubble.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-[8px] text-stone-slate">СВЯЗАНО С:</span>
              {currentBubble.connections.map((conn, i) => (
                <span 
                  key={i}
                  className="font-mono text-[8px] px-2 py-1 border border-stone-anthracite/30 text-engrave-dim"
                >
                  {conn}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint when no bubble selected */}
      {!activeBubble && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-center bg-ink-chrome/80 border border-stone-anthracite/30 p-4 z-10"
        >
          <div className="font-mono text-[10px] text-stone-slate tracking-widest">
            ИСПОЛЬЗУЙТЕ КНОПКИ ДЛЯ ИЗУЧЕНИЯ НАПРАВЛЕНИЙ
          </div>
        </motion.div>
      )}
    </div>
  );
}
