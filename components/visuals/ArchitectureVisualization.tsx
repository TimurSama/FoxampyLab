"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';

interface ArchitectureVisualizationProps {
  type: 'platform' | 'objects' | 'subjects' | 'products' | 'projects' | 'infrastructure';
  color: string;
}

export default function ArchitectureVisualization({ type, color }: ArchitectureVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  switch (type) {
    case 'platform':
      return (
        <group ref={groupRef}>
          {/* Многоуровневая структура */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              args={[2 - i * 0.3, 0.2, 2 - i * 0.3]}
              position={[0, i * 0.4 - 1, 0]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3 - i * 0.05}
                wireframe={i % 2 === 0}
                transparent
                opacity={0.6 - i * 0.1}
              />
            </Box>
          ))}
        </group>
      );

    case 'objects':
      return (
        <group ref={groupRef}>
          {/* Сеть связанных объектов */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.5;
            return (
              <Sphere
                key={i}
                args={[0.2, 16, 16]}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle * 2) * 0.5,
                  Math.sin(angle) * radius,
                ]}
              >
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.8}
                />
              </Sphere>
            );
          })}
          {/* Центральный узел */}
          <Sphere args={[0.4, 32, 32]}>
            <MeshDistortMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              distort={0.3}
              speed={2}
            />
          </Sphere>
        </group>
      );

    case 'subjects':
      return (
        <group ref={groupRef}>
          {/* Иерархическая структура */}
          <Sphere args={[0.5, 32, 32]} position={[0, 1, 0]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </Sphere>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <Sphere
                key={i}
                args={[0.3, 16, 16]}
                position={[
                  Math.cos(angle) * 1.2,
                  0,
                  Math.sin(angle) * 1.2,
                ]}
              >
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            );
          })}
        </group>
      );

    case 'products':
      return (
        <group ref={groupRef}>
          {/* Вращающиеся кольца продуктов */}
          {Array.from({ length: 3 }).map((_, i) => (
            <Torus
              key={i}
              args={[1 + i * 0.5, 0.1, 16, 32]}
              rotation={[Math.PI / 2, 0, i * Math.PI / 3]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5 - i * 0.1}
                wireframe={i === 0}
              />
            </Torus>
          ))}
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
            />
          </Sphere>
        </group>
      );

    case 'projects':
      return (
        <group ref={groupRef}>
          {/* Проекты как точки на карте */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.2;
            const height = Math.sin(angle * 2) * 0.5;
            return (
              <group key={i}>
                <Sphere
                  args={[0.15, 16, 16]}
                  position={[
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius,
                  ]}
                >
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                  />
                </Sphere>
                {/* Соединительные линии */}
                <line>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      count={2}
                      array={new Float32Array([
                        Math.cos(angle) * radius,
                        height,
                        Math.sin(angle) * radius,
                        0, 0, 0,
                      ])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial color={color} transparent opacity={0.3} />
                </line>
              </group>
            );
          })}
        </group>
      );

    case 'infrastructure':
      return (
        <group ref={groupRef}>
          {/* Сетевая инфраструктура */}
          <Box args={[2, 0.3, 2]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.2}
              wireframe
            />
          </Box>
          {Array.from({ length: 4 }).map((_, i) => {
            const positions = [
              [-0.8, 0.3, -0.8],
              [0.8, 0.3, -0.8],
              [-0.8, 0.3, 0.8],
              [0.8, 0.3, 0.8],
            ];
            return (
              <Box key={i} args={[0.3, 0.6, 0.3]} position={positions[i]}>
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.6}
                />
              </Box>
            );
          })}
        </group>
      );

    default:
      return null;
  }
}

