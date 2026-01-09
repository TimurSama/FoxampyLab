"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const color = '#e8e8e8'; // engrave-line

interface NeuralNodeCircleProps {
  scrollDelta?: { x: number; y: number };
}

export default function NeuralNodeCircle({ scrollDelta = { x: 0, y: 0 } }: NeuralNodeCircleProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const accumulatedRotation = useRef({ x: 0, z: 0 });
  
  useFrame((state) => {
    // Накопление вращения от скролла
    accumulatedRotation.current.x += scrollDelta.y * 0.18;
    accumulatedRotation.current.z += scrollDelta.x * 0.18;
    accumulatedRotation.current.x *= 0.95;
    accumulatedRotation.current.z *= 0.95;
    
    if (torusRef.current) {
      // Вращение основного кольца + скролл
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3 + accumulatedRotation.current.x;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2 + accumulatedRotation.current.z;
      
      // Пульсация
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      torusRef.current.scale.set(pulse, pulse, pulse);
    }
    
    if (innerRingRef.current) {
      // Вращение внутреннего кольца в противоположную сторону + скролл
      innerRingRef.current.rotation.x = -state.clock.elapsedTime * 0.4 - accumulatedRotation.current.x * 0.7;
      innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.3 - accumulatedRotation.current.z * 0.7;
      
      // Пульсация с задержкой
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5 + Math.PI * 0.5) * 0.08;
      innerRingRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  
  return (
    <group>
      {/* Основное кольцо (тор) */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Внутреннее кольцо для глубины */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.25, 0.03, 16, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Центральная точка/узел */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

