"use client";

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Html } from '@react-three/drei';
import { MeshDistortMaterial } from '@react-three/drei';

/**
 * Synergetic Solutions - Сплетение 4D-потоков
 * 6 направлений работы представлены как пересекающиеся энергетические слои
 */

interface ServiceSphereProps {
  position: [number, number, number];
  color: string;
  label: string;
  title: string;
  description: string;
  size?: number;
  onHover?: (hovered: boolean) => void;
}

function ServiceSphere({ 
  position, 
  color, 
  label, 
  title,
  description,
  size = 1,
  onHover 
}: ServiceSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Плавное пульсирование, усиленное при наведении
      const pulse = hovered ? 0.2 : 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * pulse;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group 
        position={position}
        onPointerEnter={() => {
          setHovered(true);
          onHover?.(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover?.(false);
        }}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.3}
            transparent
            opacity={hovered ? 0.8 : 0.6}
            wireframe
          />
        </mesh>
        {/* Внутреннее ядро */}
        <mesh>
          <sphereGeometry args={[size * 0.6, 16, 16]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.8}
            distort={hovered ? 0.4 : 0.2}
            speed={2}
            transparent
            opacity={hovered ? 1 : 0.9}
          />
        </mesh>
        
        {/* Label при наведении */}
        {hovered && (
          <Html distanceFactor={10} position={[0, size + 0.5, 0]} center>
            <div className="bg-[#050505]/90 border border-[#00F0FF]/50 px-3 py-2 rounded backdrop-blur-sm">
              <div className="font-mono text-xs text-[#00F0FF] whitespace-nowrap">
                {label}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

export default function SynergeticSolutions() {
  const groupRef = useRef<THREE.Group>(null);

  // 6 направлений работы согласно ТЗ
  const services = useMemo(() => [
    { 
      pos: [-3, 1, 0] as [number, number, number], 
      color: '#00F0FF', 
      label: 'BUSINESS',
      title: 'STRATEGIC GENESIS & VENTURE LOGIC',
      description: 'Проектирование фундаментов бизнеса. Мы переводим хаос идей в строгую документарную форму: от создания Vision & Mission до детальных White Papers и инвестиционных меморандумов.'
    },
    { 
      pos: [3, 1, 0] as [number, number, number], 
      color: '#7000FF', 
      label: 'IT',
      title: 'DIGITAL CORE & ECOSYSTEM DEVELOPMENT',
      description: 'Создание технологического ДНК продукта. Разработка концепций и реализация сложных IT-экосистем: масштабируемые платформы, AI-интеграции и блокчейн-решения.'
    },
    { 
      pos: [0, -2, 2] as [number, number, number], 
      color: '#00F0FF', 
      label: 'BRANDING',
      title: 'COGNITIVE BRANDING & VISUAL SYSTEMS',
      description: 'Синтез восприятия и эстетики. Мы создаем бренды как живые организмы с уникальным кодом айдентики. Глубокий дизайн-анализ и маркетинговые стратегии.'
    },
    { 
      pos: [-2, -1, -2] as [number, number, number], 
      color: '#7000FF', 
      label: 'SPATIAL',
      title: 'PARAMETRIC FASHION & ARCHITECTURE',
      description: 'Стирание границ между телом и пространством. Мы объединяем методы параметрического проектирования зданий с авангардным дизайном одежды.'
    },
    { 
      pos: [2, -1, -2] as [number, number, number], 
      color: '#00F0FF', 
      label: 'CINEMA',
      title: 'TEMPORAL NARRATIVE & VISUAL FX',
      description: 'Трансляция смыслов через визуальный опыт. Продакшн будущего: от концептуального сторителлинга до сложного CGI и видео-арта.'
    },
    { 
      pos: [0, 2, 0] as [number, number, number], 
      color: '#7000FF', 
      label: 'R&D',
      title: 'APPLIED PHYSICS & ENGINEERING RESEARCH',
      description: 'Лаборатория фундаментальных инноваций. Глубокие исследования на стыке инженерии и прикладной науки. Разработка патентоспособных технологий.'
    },
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
          title={service.title}
          description={service.description}
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
              opacity={0.2}
            />
          </line>
        );
      })}
    </group>
  );
}
