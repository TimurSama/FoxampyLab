"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

/**
 * Venture Terminal - Проект-хаб с эффектом Glassmorphism
 * Сетка из 'живых' карточек с эффектом Glassmorphism
 * Каждая карточка — это микро-превью 4D-объекта проекта
 */
export default function VentureTerminal() {
  const groupRef = useRef<THREE.Group>(null);

  // Создаем сетку карточек проектов
  const cards = useMemo(() => {
    const grid: Array<{ position: [number, number, number]; color: string }> = [];
    const colors = ['#00F0FF', '#7000FF'];
    
    for (let x = -2; x <= 2; x++) {
      for (let y = -1; y <= 1; y++) {
        const color = colors[(x + y) % 2];
        grid.push({
          position: [x * 2, y * 2, (x + y) * 0.5],
          color,
        });
      }
    }
    return grid;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <Float
          key={i}
          speed={1 + i * 0.1}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <mesh position={card.position}>
            <boxGeometry args={[1.5, 1, 0.1]} />
            <MeshDistortMaterial
              color={card.color}
              emissive={card.color}
              emissiveIntensity={0.2}
              distort={0.1}
              speed={1}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Внутренний контент карточки */}
          <mesh position={[card.position[0], card.position[1], card.position[2] + 0.05]}>
            <planeGeometry args={[1.3, 0.8]} />
            <meshStandardMaterial
              color={card.color}
              emissive={card.color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

