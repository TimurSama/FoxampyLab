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
      // Плавное вращение
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      
      // Пульсация для привлечения внимания
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  switch (type) {
    case 'platform':
      return (
        <group ref={groupRef}>
          {/* Многоуровневая структура - 12 уровней архитектуры */}
          {Array.from({ length: 12 }).map((_, i) => (
            <Box
              key={i}
              args={[2.2 - i * 0.15, 0.15, 2.2 - i * 0.15]}
              position={[0, i * 0.25 - 1.5, 0]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4 - i * 0.03}
                wireframe={i % 3 === 0}
                transparent
                opacity={0.7 - i * 0.05}
                roughness={0.3}
                metalness={0.7}
              />
            </Box>
          ))}
          {/* Соединительные линии между уровнями */}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    0, i * 0.25 - 1.5, 0,
                    0, (i + 1) * 0.25 - 1.5, 0,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={0.2} />
            </line>
          ))}
        </group>
      );

    case 'objects':
      return (
        <group ref={groupRef}>
          {/* Сеть связанных объектов - физические и цифровые */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 1.8;
            const height = Math.sin(angle * 3) * 0.6;
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
                    emissiveIntensity={0.9}
                    roughness={0.2}
                    metalness={0.8}
                  />
                </Sphere>
                {/* Соединительные линии к центру */}
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
          {/* Центральный узел - токенизация */}
          <Sphere args={[0.5, 32, 32]}>
            <MeshDistortMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              distort={0.4}
              speed={2.5}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </group>
      );

    case 'subjects':
      return (
        <group ref={groupRef}>
          {/* Иерархическая структура - 5 типов субъектов */}
          {/* Центральный узел - платформа */}
          <Sphere args={[0.6, 32, 32]} position={[0, 1.2, 0]}>
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
          {/* 5 групп субъектов */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            const radius = 1.5;
            return (
              <group key={i}>
                <Sphere
                  args={[0.25, 16, 16]}
                  position={[
                    Math.cos(angle) * radius,
                    0.2,
                    Math.sin(angle) * radius,
                  ]}
                >
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.9}
                    roughness={0.3}
                    metalness={0.7}
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
                        0.2,
                        Math.sin(angle) * radius,
                        0, 1.2, 0,
                      ])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial color={color} transparent opacity={0.25} />
                </line>
              </group>
            );
          })}
        </group>
      );

    case 'products':
      return (
        <group ref={groupRef}>
          {/* 6 продуктов как вращающиеся кольца */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Torus
              key={i}
              args={[0.8 + i * 0.3, 0.08, 16, 32]}
              rotation={[Math.PI / 2, i * Math.PI / 6, i * Math.PI / 3]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6 - i * 0.08}
                wireframe={i % 2 === 0}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.8 - i * 0.1}
              />
            </Torus>
          ))}
          {/* Центральный продукт */}
          <Sphere args={[0.35, 32, 32]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.9}
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
          {/* Сетевая инфраструктура - блокчейн, облако, БД, безопасность */}
          {/* Базовый слой */}
          <Box args={[2.2, 0.2, 2.2]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.25}
              wireframe
              roughness={0.4}
              metalness={0.6}
            />
          </Box>
          {/* Узлы инфраструктуры */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 0.9;
            const positions: [number, number, number] = [
              Math.cos(angle) * radius,
              0.3,
              Math.sin(angle) * radius,
            ];
            return (
              <group key={i}>
                <Box args={[0.25, 0.5, 0.25]} position={positions}>
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.7}
                    roughness={0.2}
                    metalness={0.8}
                  />
                </Box>
                {/* Соединительные линии */}
                <line>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      count={2}
                      array={new Float32Array([
                        ...positions,
                        0, 0.3, 0,
                      ])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial color={color} transparent opacity={0.2} />
                </line>
              </group>
            );
          })}
          {/* Центральный узел */}
          <Sphere args={[0.2, 16, 16]} position={[0, 0.3, 0]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </group>
      );

    default:
      return null;
  }
}

