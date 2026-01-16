"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

/**
 * The Nexus - Центральный 4D-аттрактор
 * Дифференцирующийся фрактал, который раскрывается при наведении
 */
export default function TheNexus() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Создаем геометрию фрактального аттрактора
  const fractalGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      
      // Вращение основной структуры
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.2;
      groupRef.current.rotation.y = timeRef.current * 0.2;
      groupRef.current.rotation.z = Math.cos(timeRef.current * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Основной фрактальный аттрактор */}
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Внутренние слои фрактала */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Sphere
          key={i}
          args={[1.2 - i * 0.3, 32, 32]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#7000FF"
            emissive="#7000FF"
            emissiveIntensity={0.2 - i * 0.05}
            wireframe={i % 2 === 0}
            transparent
            opacity={0.3 - i * 0.1}
          />
        </Sphere>
      ))}

      {/* Энергетические связи */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              Math.sin(angle * 2) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

