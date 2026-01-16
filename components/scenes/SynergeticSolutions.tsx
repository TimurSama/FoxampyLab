"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text3D } from '@react-three/drei';

/**
 * Synergetic Solutions - Сплетение 4D-потоков
 * Сферы (IT, Architecture, Fashion) представлены как пересекающиеся энергетические слои
 */

interface ServiceSphereProps {
  position: [number, number, number];
  color: string;
  label: string;
  size?: number;
}

function ServiceSphere({ position, color, label, size = 1 }: ServiceSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Плавное пульсирование
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
        {/* Внутреннее ядро */}
        <mesh>
          <sphereGeometry args={[size * 0.6, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function SynergeticSolutions() {
  const groupRef = useRef<THREE.Group>(null);

  // Определяем позиции для 6 направлений
  const services = useMemo(() => [
    { pos: [-3, 1, 0] as [number, number, number], color: '#00F0FF', label: 'IT' },
    { pos: [3, 1, 0] as [number, number, number], color: '#7000FF', label: 'Architecture' },
    { pos: [0, -2, 2] as [number, number, number], color: '#00F0FF', label: 'Fashion' },
    { pos: [-2, -1, -2] as [number, number, number], color: '#7000FF', label: 'Business' },
    { pos: [2, -1, -2] as [number, number, number], color: '#00F0FF', label: 'Design' },
    { pos: [0, 2, 0] as [number, number, number], color: '#7000FF', label: 'R&D' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      // Медленное вращение всей композиции
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {services.map((service, i) => (
        <ServiceSphere
          key={i}
          position={service.pos}
          color={service.color}
          label={service.label}
          size={1.2}
        />
      ))}

      {/* Соединительные линии между сферами */}
      {services.map((service, i) => {
        const nextService = services[(i + 1) % services.length];
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...service.pos,
                  ...nextService.pos,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.3}
            />
          </line>
        );
      })}
    </group>
  );
}

