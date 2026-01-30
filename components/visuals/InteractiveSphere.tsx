"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { getOptimal3DQuality, isMobile } from '@/lib/device';
import NeuralNodeCircle from './NeuralNodeCircle';


const color = '#e8e8e8'; // engrave-line

function IcosahedronWireframe({ 
  mousePos, 
  scrollDelta 
}: { 
  mousePos: { x: number; y: number };
  scrollDelta: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const accumulatedRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (meshRef.current) {
      // Накопление вращения от скролла (с затуханием)
      accumulatedRotation.current.y += scrollDelta.x * 0.2;
      accumulatedRotation.current.x += scrollDelta.y * 0.2;
      
      // Затухание накопленного вращения
      accumulatedRotation.current.x *= 0.95;
      accumulatedRotation.current.y *= 0.95;
      
      // Базовая анимация + мышь (усилена в 2.5 раза) + скролл
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + mousePos.y * 1.25 + accumulatedRotation.current.x;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mousePos.x * 1.25 + accumulatedRotation.current.y;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.2}
      />
    </mesh>
  );
}

function OuterPolyhedron({ 
  mousePos, 
  scrollDelta 
}: { 
  mousePos: { x: number; y: number };
  scrollDelta: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const accumulatedRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (meshRef.current) {
      // Накопление вращения от скролла (противоположное направление для внешнего полиэдра)
      accumulatedRotation.current.y -= scrollDelta.x * 0.15;
      accumulatedRotation.current.x -= scrollDelta.y * 0.15;
      
      // Затухание
      accumulatedRotation.current.x *= 0.95;
      accumulatedRotation.current.y *= 0.95;
      
      // Базовая анимация + мышь (усилена в 2 раза) + скролл
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.05 + mousePos.y * 0.9 + accumulatedRotation.current.x;
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.08 + mousePos.x * 0.9 + accumulatedRotation.current.y;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[2.8, 0]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

function ParticleCloud({ 
  mousePos, 
  scrollDelta 
}: { 
  mousePos: { x: number; y: number };
  scrollDelta: { x: number; y: number };
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const quality = getOptimal3DQuality();
  
  const { positions, originalPositions, count } = useMemo(() => {
    // Reduce particle count based on device performance
    const count = quality === 'low' ? 150 : quality === 'medium' ? 300 : 500;
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

  const accumulatedRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      // Накопление вращения от скролла
      accumulatedRotation.current.y += scrollDelta.x * 0.12;
      accumulatedRotation.current.x += scrollDelta.y * 0.12;
      accumulatedRotation.current.x *= 0.96;
      accumulatedRotation.current.y *= 0.96;
      
      // Усиленное влияние мыши (в 2 раза)
      const dx = mousePos.x * 1.0;
      const dy = mousePos.y * 1.0;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        
        posArray[idx] += (originalPositions[idx] + dx - posArray[idx]) * 0.08;
        posArray[idx + 1] += (originalPositions[idx + 1] + dy - posArray[idx + 1]) * 0.08;
        posArray[idx + 2] += (originalPositions[idx + 2] - posArray[idx + 2]) * 0.08;
      }
      
      positionsAttr.needsUpdate = true;
      
      // Базовая анимация + скролл
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02 + accumulatedRotation.current.x;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03 + accumulatedRotation.current.y;
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
        color={color} 
        size={quality === 'low' ? 0.04 : 0.03} 
        transparent 
        opacity={0.7}
        sizeAttenuation
      />
    </points>
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
        color="#0a0a0a" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}


function SphereScene({ 
  mousePos, 
  scrollDelta 
}: { 
  mousePos: { x: number; y: number };
  scrollDelta: { x: number; y: number };
}) {
  return (
    <group>
      <InnerGlow />
      <NeuralNodeCircle scrollDelta={scrollDelta} />
      <ParticleCloud mousePos={mousePos} scrollDelta={scrollDelta} />
      <IcosahedronWireframe mousePos={mousePos} scrollDelta={scrollDelta} />
      <OuterPolyhedron mousePos={mousePos} scrollDelta={scrollDelta} />
    </group>
  );
}

interface InteractiveSphereProps {
  mousePos: { x: number; y: number };
  scrollDelta?: { x: number; y: number };
}

export default function InteractiveSphere({ 
  mousePos, 
  scrollDelta = { x: 0, y: 0 } 
}: InteractiveSphereProps) {
  const quality = getOptimal3DQuality();
  const mobile = isMobile();
  
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: mobile ? 50 : 45 }}
        gl={{ 
          antialias: quality !== 'low', 
          alpha: true,
          powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={quality === 'low' ? [1, 1.5] : [1, 2]}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SphereScene mousePos={mousePos} scrollDelta={scrollDelta} />
        </Suspense>
      </Canvas>
    </div>
  );
}
