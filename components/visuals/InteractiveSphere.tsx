"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sphereInfo = [
  {
    id: 1,
    title: 'ТЕХНОЛОГИИ',
    description: 'Мы используем современный стек: React, Next.js, Three.js, Solidity, Python. Постоянно изучаем новые инструменты.',
    formula: 'V = 4/3 πr³',
    formulaLabel: 'sphere volume',
    color: '#e8e8e8', // engrave-line
    opacity: 0.9
  },
  {
    id: 2,
    title: 'ИННОВАЦИИ',
    description: 'Экспериментируем с AI, Blockchain, Spatial Computing. Создаём решения, которых ещё не существует.',
    formula: 'E = mc²',
    formulaLabel: 'energy-mass',
    color: '#c8c8d0', // engrave-mid
    opacity: 0.7
  },
  {
    id: 3,
    title: 'МЕТОДОЛОГИЯ',
    description: 'Глубокий анализ, итеративная разработка, data-driven решения. Каждый проект начинается с исследования.',
    formula: '∇ × E = -∂B/∂t',
    formulaLabel: 'maxwell equation',
    color: '#9a9aa8', // stone-slate
    opacity: 0.6
  },
  {
    id: 4,
    title: 'СИНЕРГИЯ',
    description: 'Междисциплинарный подход объединяет дизайн, код, исследования и маркетинг в единое целое.',
    formula: 'Σ = ∫∫ dA',
    formulaLabel: 'surface integral',
    color: '#8888a0', // engrave-dim
    opacity: 0.5
  },
];

interface SphereSceneProps {
  mousePos: { x: number; y: number };
  activeInfo: typeof sphereInfo[0];
}

function IcosahedronWireframe({ mousePos, activeInfo }: { mousePos: { x: number; y: number }, activeInfo: typeof sphereInfo[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + mousePos.y * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mousePos.x * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial 
        color={activeInfo.color} 
        wireframe 
        transparent 
        opacity={activeInfo.opacity * 0.2}
      />
    </mesh>
  );
}

function OuterPolyhedron({ mousePos, activeInfo }: { mousePos: { x: number; y: number }, activeInfo: typeof sphereInfo[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.05 + mousePos.y * 0.3;
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.08 + mousePos.x * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[2.8, 0]} />
      <meshBasicMaterial 
        color={activeInfo.color} 
        wireframe 
        transparent 
        opacity={activeInfo.opacity * 0.1}
      />
    </mesh>
  );
}

function ParticleCloud({ mousePos, activeInfo }: { mousePos: { x: number; y: number }, activeInfo: typeof sphereInfo[0] }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, originalPositions, count } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const radius = 1.8 + Math.random() * 0.4;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return { positions, originalPositions, count };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const dx = mousePos.x * 0.5;
        const dy = mousePos.y * 0.5;
        
        posArray[idx] += (originalPositions[idx] + dx - posArray[idx]) * 0.05;
        posArray[idx + 1] += (originalPositions[idx + 1] + dy - posArray[idx + 1]) * 0.05;
        posArray[idx + 2] += (originalPositions[idx + 2] - posArray[idx + 2]) * 0.05;
      }
      
      positionsAttr.needsUpdate = true;
      
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color={activeInfo.color} 
        size={0.03} 
        transparent 
        opacity={activeInfo.opacity * 0.7}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalRings({ mousePos, activeInfo }: { mousePos: { x: number; y: number }, activeInfo: typeof sphereInfo[0] }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = mousePos.y * 0.2;
      group.current.rotation.z = mousePos.x * 0.2;
    }
  });

  const rings = useMemo(() => [
    { radius: 2.5, rotation: [0, 0, 0], speed: 0.5 },
    { radius: 2.7, rotation: [Math.PI / 4, 0, 0], speed: -0.3 },
    { radius: 2.9, rotation: [0, Math.PI / 4, Math.PI / 6], speed: 0.2 },
  ], []);

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <OrbitalRing key={i} {...ring} index={i} activeInfo={activeInfo} />
      ))}
    </group>
  );
}

function OrbitalRing({ 
  radius, 
  rotation, 
  speed, 
  index, 
  activeInfo 
}: { 
  radius: number; 
  rotation: number[]; 
  speed: number; 
  index: number;
  activeInfo: typeof sphereInfo[0];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={rotation as [number, number, number]}>
      <torusGeometry args={[radius, 0.005, 8, 64]} />
      <meshBasicMaterial 
        color={activeInfo.color} 
        transparent 
        opacity={activeInfo.opacity * (0.3 - index * 0.08)}
      />
    </mesh>
  );
}

function InnerGlow({ activeInfo }: { activeInfo: typeof sphereInfo[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial 
        color="#0a0a0a" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

function SphereScene({ mousePos, activeInfo }: SphereSceneProps) {
  return (
    <group>
      <InnerGlow activeInfo={activeInfo} />
      <ParticleCloud mousePos={mousePos} activeInfo={activeInfo} />
      <IcosahedronWireframe mousePos={mousePos} activeInfo={activeInfo} />
      <OuterPolyhedron mousePos={mousePos} activeInfo={activeInfo} />
      <OrbitalRings mousePos={mousePos} activeInfo={activeInfo} />
    </group>
  );
}

interface InteractiveSphereProps {
  mousePos: { x: number; y: number };
}

export default function InteractiveSphere({ mousePos }: InteractiveSphereProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeInfo = sphereInfo[currentIndex];

  const nextInfo = () => {
    setCurrentIndex((prev) => (prev + 1) % sphereInfo.length);
  };

  const prevInfo = () => {
    setCurrentIndex((prev) => (prev === 0 ? sphereInfo.length - 1 : prev - 1));
  };

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % sphereInfo.length);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <SphereScene 
          mousePos={mousePos} 
          activeInfo={activeInfo}
        />
      </Canvas>

      {/* Navigation */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-10">
        <button
          onClick={prevInfo}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronLeft size={16} className="text-engrave-line" />
        </button>
        
        <div className="flex gap-1">
          {sphereInfo.map((info, i) => (
            <button
              key={info.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 border transition-all ${
                currentIndex === i
                  ? 'bg-engrave-line border-engrave-line'
                  : 'bg-stone-anthracite border-stone-anthracite/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextInfo}
          className="p-2 border border-stone-anthracite/50 bg-ink-chrome/80 
                   hover:border-engrave-line/30 transition-colors"
        >
          <ChevronRight size={16} className="text-engrave-line" />
        </button>
      </div>

      {/* Info Panel */}
      <motion.div
        key={activeInfo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-auto md:w-80 
                 bg-ink-chrome/95 border border-stone-anthracite/50 p-3 md:p-4 backdrop-blur-xl z-10"
      >
        <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-2">
          {currentIndex + 1} / {sphereInfo.length}
        </div>
        <h3 className="font-mono text-sm text-engrave-fresco mb-2">
          {activeInfo.title}
        </h3>
        <p className="font-mono text-[10px] text-stone-slate leading-relaxed mb-3">
          {activeInfo.description}
        </p>
        <div className="pt-3 border-t border-stone-anthracite/30">
          <div className="font-mono text-lg text-engrave-line tracking-wider mb-1">
            {activeInfo.formula}
          </div>
          <div className="font-mono text-[9px] text-stone-slate tracking-[0.3em] uppercase">
            {activeInfo.formulaLabel}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
