"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Формулы для отображения
const formulas = [
  { text: 'V = 4/3 πr³', label: 'sphere volume' },
  { text: 'E = mc²', label: 'energy-mass' },
  { text: '∇ × E = -∂B/∂t', label: 'maxwell equation' },
  { text: 'Σ = ∫∫ dA', label: 'surface integral' },
  { text: 'F = G(m₁m₂)/r²', label: 'gravitation' },
  { text: 'eiπ + 1 = 0', label: 'euler identity' },
];

interface SphereSceneProps {
  mousePos: { x: number; y: number };
  isHovered: boolean;
  onDoubleClick: () => void;
}

function IcosahedronWireframe({ mousePos }: { mousePos: { x: number; y: number } }) {
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
        color="#e8e8e8" 
        wireframe 
        transparent 
        opacity={0.15}
      />
    </mesh>
  );
}

function OuterPolyhedron({ mousePos }: { mousePos: { x: number; y: number } }) {
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
        color="#606068" 
        wireframe 
        transparent 
        opacity={0.08}
      />
    </mesh>
  );
}

function ParticleCloud({ mousePos, isExploded }: { mousePos: { x: number; y: number }, isExploded: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  
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

  useEffect(() => {
    if (isExploded && !velocitiesRef.current) {
      velocitiesRef.current = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        velocitiesRef.current[i] = (Math.random() - 0.5) * 0.3;
      }
    }
  }, [isExploded, count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      if (isExploded && velocitiesRef.current) {
        // Explode animation
        for (let i = 0; i < count * 3; i++) {
          posArray[i] += velocitiesRef.current[i] * 0.1;
          velocitiesRef.current[i] *= 0.98; // Damping
        }
      } else {
        // Return to original with mouse influence
        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          const dx = mousePos.x * 0.5;
          const dy = mousePos.y * 0.5;
          
          posArray[idx] += (originalPositions[idx] + dx - posArray[idx]) * 0.05;
          posArray[idx + 1] += (originalPositions[idx + 1] + dy - posArray[idx + 1]) * 0.05;
          posArray[idx + 2] += (originalPositions[idx + 2] - posArray[idx + 2]) * 0.05;
        }
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
        color="#f0f0f5" 
        size={0.03} 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalRings({ mousePos }: { mousePos: { x: number; y: number } }) {
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
        <OrbitalRing key={i} {...ring} index={i} />
      ))}
    </group>
  );
}

function OrbitalRing({ radius, rotation, speed, index }: { radius: number; rotation: number[]; speed: number; index: number }) {
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
        color="#909098" 
        transparent 
        opacity={0.3 - index * 0.08}
      />
    </mesh>
  );
}

function InnerGlow() {
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
        color="#1a1a1c" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

function SphereScene({ mousePos, isHovered, onDoubleClick }: SphereSceneProps) {
  const [isExploded, setIsExploded] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    const handleDblClick = () => {
      setIsExploded(true);
      setTimeout(() => setIsExploded(false), 2000);
      onDoubleClick();
    };
    
    gl.domElement.addEventListener('dblclick', handleDblClick);
    return () => gl.domElement.removeEventListener('dblclick', handleDblClick);
  }, [gl, onDoubleClick]);

  return (
    <group>
      <InnerGlow />
      <ParticleCloud mousePos={mousePos} isExploded={isExploded} />
      <IcosahedronWireframe mousePos={mousePos} />
      <OuterPolyhedron mousePos={mousePos} />
      <OrbitalRings mousePos={mousePos} />
    </group>
  );
}

interface InteractiveSphereProps {
  mousePos: { x: number; y: number };
}

export default function InteractiveSphere({ mousePos }: InteractiveSphereProps) {
  const [formulaIndex, setFormulaIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormulaIndex((prev) => (prev + 1) % formulas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDoubleClick = () => {
    setFormulaIndex((prev) => (prev + 1) % formulas.length);
  };

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
          isHovered={isHovered}
          onDoubleClick={handleDoubleClick}
        />
      </Canvas>

      {/* Formula display */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={formulaIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="font-mono"
          >
            <div className="text-lg md:text-xl text-engrave-line tracking-wider">
              {formulas[formulaIndex].text}
            </div>
            <div className="text-[9px] text-stone-graphite tracking-[0.3em] mt-1 uppercase">
              {formulas[formulaIndex].label}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interaction hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 
                       font-mono text-[9px] text-stone-graphite tracking-widest
                       px-3 py-1 border border-stone-anthracite/30 bg-ink-deep/50"
          >
            DOUBLE-CLICK TO INTERACT
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-stone-graphite/30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-stone-graphite/30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-stone-graphite/30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-stone-graphite/30" />
    </div>
  );
}

