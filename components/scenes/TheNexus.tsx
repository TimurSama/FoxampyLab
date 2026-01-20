"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The Nexus - Центральный 4D-аттрактор
 * Монохромный стиль: черный, серый, белый, стекло, камень, матовый, глянцевый
 */
export default function TheNexus() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      
      // Медленное вращение основной структуры
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.2) * 0.15;
      groupRef.current.rotation.y = timeRef.current * 0.15;
      groupRef.current.rotation.z = Math.cos(timeRef.current * 0.25) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Основная структура - матовый камень */}
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Внутренние слои - стекло */}
      {Array.from({ length: 2 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
        >
          <icosahedronGeometry args={[1.2 - i * 0.3, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.2 - i * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Глянцевые акценты */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              Math.sin(angle * 2) * 0.3,
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#e0e0e0"
              emissive="#ffffff"
              emissiveIntensity={0.3}
              roughness={0.05}
              metalness={1.0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

