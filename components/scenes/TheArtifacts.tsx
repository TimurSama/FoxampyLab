"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

/**
 * The Artifacts - Виртуальная галерея
 * Визуалы плавают в пространстве, при скролле меняют форму (Morphing)
 */
export default function TheArtifacts() {
  const groupRef = useRef<THREE.Group>(null);

  // Создаем артефакты разных типов
  const artifacts = useMemo(() => [
    { type: 'it', position: [-2, 0, 0] as [number, number, number], color: '#00F0FF' },
    { type: 'fashion', position: [2, 0, 0] as [number, number, number], color: '#7000FF' },
    { type: 'architecture', position: [0, -1.5, -1] as [number, number, number], color: '#00F0FF' },
    { type: 'design', position: [0, 1.5, -1] as [number, number, number], color: '#7000FF' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      // Плавное морфирование через изменение масштаба
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {artifacts.map((artifact, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.8}
        >
          <group position={artifact.position}>
            {/* Основная форма - меняется в зависимости от типа */}
            {artifact.type === 'it' && (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <MeshDistortMaterial
                  color={artifact.color}
                  emissive={artifact.color}
                  emissiveIntensity={0.4}
                  distort={0.3}
                  speed={2}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            )}
            {artifact.type === 'fashion' && (
              <mesh>
                <torusGeometry args={[0.6, 0.3, 16, 32]} />
                <MeshDistortMaterial
                  color={artifact.color}
                  emissive={artifact.color}
                  emissiveIntensity={0.4}
                  distort={0.4}
                  speed={1.5}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            )}
            {artifact.type === 'architecture' && (
              <mesh>
                <octahedronGeometry args={[0.8, 0]} />
                <MeshDistortMaterial
                  color={artifact.color}
                  emissive={artifact.color}
                  emissiveIntensity={0.4}
                  distort={0.25}
                  speed={2.5}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            )}
            {artifact.type === 'design' && (
              <mesh>
                <icosahedronGeometry args={[0.7, 0]} />
                <MeshDistortMaterial
                  color={artifact.color}
                  emissive={artifact.color}
                  emissiveIntensity={0.4}
                  distort={0.35}
                  speed={1.8}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            )}

            {/* Ореол вокруг артефакта */}
            <mesh>
              <ringGeometry args={[1.2, 1.5, 32]} />
              <meshStandardMaterial
                color={artifact.color}
                emissive={artifact.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

