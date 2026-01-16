"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

/**
 * Distributed Intelligence - Абстрактная нейросеть
 * Ноды загораются при движении курсора, охватывают темный глобус
 */
export default function DistributedIntelligence() {
  const groupRef = useRef<THREE.Group>(null);

  // Создаем сеть узлов (нейросеть)
  const nodes = useMemo(() => {
    const nodeArray: Array<{
      position: [number, number, number];
      color: string;
      size: number;
    }> = [];
    
    // Создаем узлы на поверхности сферы
    const radius = 2.5;
    for (let i = 0; i < 24; i++) {
      const theta = (i / 24) * Math.PI * 2;
      const phi = Math.acos((i / 24) * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      nodeArray.push({
        position: [x, y, z],
        color: i % 3 === 0 ? '#00F0FF' : '#7000FF',
        size: 0.15 + (i % 3) * 0.05,
      });
    }
    
    return nodeArray;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Медленное вращение всей сети
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Центральный глобус (темный) */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#050505"
          emissive="#000000"
          emissiveIntensity={0}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Узлы нейросети */}
      {nodes.map((node, i) => (
        <Float
          key={i}
          speed={0.5 + i * 0.05}
          rotationIntensity={0.3}
          floatIntensity={0.3}
        >
          <group position={node.position}>
            <mesh>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Свечение вокруг узла */}
            <mesh>
              <sphereGeometry args={[node.size * 1.5, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Соединительные линии между близкими узлами */}
      {nodes.map((node, i) => {
        const connections: number[] = [];
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.position[0] - otherNode.position[0], 2) +
              Math.pow(node.position[1] - otherNode.position[1], 2) +
              Math.pow(node.position[2] - otherNode.position[2], 2)
            );
            if (distance < 1.5) {
              connections.push(j);
            }
          }
        });
        
        return connections.map((connIdx) => {
          const otherNode = nodes[connIdx];
          return (
            <line key={`line-${i}-${connIdx}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...node.position,
                    ...otherNode.position,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#00F0FF"
                transparent
                opacity={0.2}
              />
            </line>
          );
        });
      })}
    </group>
  );
}

