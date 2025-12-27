"use client";

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

const layers = [
  {
    id: 1,
    name: 'ИССЛЕДОВАНИЕ РЫНКА',
    description: 'Глубокий анализ конкурентов, трендов и возможностей. Изучаем не только прямых конкурентов, но и смежные отрасли.',
    details: [
      'Анализ 50+ конкурентов',
      'Изучение трендов индустрии',
      'Выявление рыночных возможностей',
      'SWOT-анализ'
    ],
    y: -0.5,
    opacity: 0.9,
    color: '#e8e8e8', // engrave-line
    size: 2
  },
  {
    id: 2,
    name: 'ПОЛЬЗОВАТЕЛЬСКИЕ ИССЛЕДОВАНИЯ',
    description: 'Jobs to be done, интервью с пользователями, тестирование гипотез. Понимаем не только что делают, но и почему.',
    details: [
      'Интервью с 20+ пользователями',
      'Jobs to be done анализ',
      'User journey mapping',
      'A/B тестирование'
    ],
    y: 0,
    opacity: 0.7,
    color: '#c8c8d0', // engrave-mid
    size: 1.8
  },
  {
    id: 3,
    name: 'ТЕХНИЧЕСКОЕ ПРОЕКТИРОВАНИЕ',
    description: 'Архитектура решения, выбор стека, интеграции. Проектируем масштабируемые и надёжные системы.',
    details: [
      'Архитектура системы',
      'Выбор технологического стека',
      'Планирование интеграций',
      'Оценка производительности'
    ],
    y: 0.5,
    opacity: 0.5,
    color: '#9a9aa8', // stone-slate
    size: 1.5
  },
  {
    id: 4,
    name: 'ПРОТОТИПИРОВАНИЕ',
    description: 'MVP, итерации, валидация гипотез. Быстро проверяем идеи и улучшаем на основе обратной связи.',
    details: [
      'Создание MVP за 4-8 недель',
      'Итеративная разработка',
      'Валидация гипотез',
      'Сбор метрик'
    ],
    y: 1,
    opacity: 0.3,
    color: '#6b6b6b', // dim
    size: 1.2
  },
];

function DataLayer({ 
  y, 
  opacity, 
  color, 
  size, 
  isActive 
}: { 
  y: number; 
  opacity: number; 
  color: string; 
  size: number;
  isActive: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const gridSize = size;
    const spacing = 0.15;
    
    for (let x = -gridSize / 2; x <= gridSize / 2; x += spacing) {
      for (let z = -gridSize / 2; z <= gridSize / 2; z += spacing) {
        const noise = Math.sin(x * 3) * Math.cos(z * 3) * 0.2 + 
                     Math.sin(x * 7 + z * 5) * 0.1;
        
        positions.push(x, y + noise, z);
      }
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [y, size]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const wave = isActive 
          ? Math.sin(x * 2 + time * 0.5) * Math.cos(z * 2 + time * 0.3) * 0.1
          : Math.sin(x * 2 + time * 0.5) * Math.cos(z * 2 + time * 0.3) * 0.05;
        positions.setY(i, y + wave + Math.sin(x * 3) * Math.cos(z * 3) * 0.2);
      }
      
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        color={color} 
        size={isActive ? 0.025 : 0.02} 
        transparent 
        opacity={isActive ? opacity * 1.2 : opacity * 0.6}
        sizeAttenuation
      />
    </points>
  );
}

function BoundingBox({ activeLayer }: { activeLayer: number }) {
  const boxRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(2.5, 1.5, 2.5);
    const edges = new THREE.EdgesGeometry(geo);
    return edges;
  }, []);

  return (
    <lineSegments ref={boxRef} geometry={geometry} position={[0, 0, 0]}>
      <lineBasicMaterial 
        color={activeLayer > 0 ? '#e8e8e8' : '#4a4a4a'} 
        transparent 
        opacity={activeLayer > 0 ? 0.6 : 0.3} 
      />
    </lineSegments>
  );
}

function DataPillars({ activeLayer }: { activeLayer: number }) {
  const pillars = useMemo(() => {
    const result: { position: [number, number, number], height: number }[] = [];
    
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      const height = 0.3 + Math.random() * 0.8;
      result.push({ position: [x, -0.5 + height / 2, z], height });
    }
    
    return result;
  }, []);

  return (
    <group>
      {pillars.map((pillar, i) => (
        <mesh key={i} position={pillar.position}>
          <boxGeometry args={[0.05, pillar.height, 0.05]} />
          <meshBasicMaterial 
            color={activeLayer > 0 ? '#e8e8e8' : '#6b6b6b'} 
            transparent 
            opacity={activeLayer > 0 ? 0.7 : 0.3} 
            wireframe 
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ activeLayer }: { activeLayer: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      
      <group rotation={[0.3, 0.5, 0]}>
        {layers.map((layer) => (
          <DataLayer 
            key={layer.id}
            y={layer.y} 
            opacity={layer.opacity} 
            color={layer.color} 
            size={layer.size}
            isActive={activeLayer === layer.id}
          />
        ))}
        
        <BoundingBox activeLayer={activeLayer} />
        <DataPillars activeLayer={activeLayer} />
        
        {/* Corner markers */}
        {[
          [-1.25, -0.75, -1.25],
          [1.25, -0.75, -1.25],
          [-1.25, -0.75, 1.25],
          [1.25, -0.75, 1.25],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#e8e8e8" />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function MethodologyLayers() {
  const [activeLayer, setActiveLayer] = useState(0);

  const nextLayer = () => {
    setActiveLayer((prev) => (prev + 1) % (layers.length + 1));
  };

  const prevLayer = () => {
    setActiveLayer((prev) => prev === 0 ? layers.length : prev - 1);
  };

  const currentLayer = activeLayer > 0 ? layers[activeLayer - 1] : null;

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [2, 2, 2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene activeLayer={activeLayer} />
      </Canvas>
      
      {/* Navigation */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-10">
        <button
          onClick={prevLayer}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronDown size={16} className="text-engrave-line" />
        </button>
        
        <div className="flex gap-1">
          {layers.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(i + 1)}
              className={`w-2 h-2 border transition-all ${
                activeLayer === layer.id
                  ? 'bg-engrave-line border-engrave-line'
                  : 'bg-stone-anthracite border-stone-anthracite/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextLayer}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronUp size={16} className="text-engrave-line" />
        </button>
      </div>

      {/* Layer Info Panel */}
      <AnimatePresence>
        {currentLayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-auto md:w-80 
                     bg-ink-chrome/95 border border-stone-anthracite/50 p-3 md:p-4 backdrop-blur-xl z-10"
          >
            <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-2">
              LAYER {currentLayer.id} / {layers.length}
            </div>
            <h3 className="font-mono text-sm text-engrave-fresco mb-2">
              {currentLayer.name}
            </h3>
            <p className="font-mono text-[10px] text-stone-slate leading-relaxed mb-3">
              {currentLayer.description}
            </p>
            <div className="space-y-1">
              {currentLayer.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[8px] text-engrave-dim mt-1">◈</span>
                  <span className="font-mono text-[9px] text-stone-slate">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint when no layer selected */}
      {activeLayer === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-center bg-ink-chrome/80 border border-stone-anthracite/30 p-4 z-10"
        >
          <div className="font-mono text-[10px] text-stone-slate tracking-widest">
            ИСПОЛЬЗУЙТЕ КНОПКИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СЛОЁВ
          </div>
        </motion.div>
      )}
    </div>
  );
}
