"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOptimal3DQuality } from '@/lib/device';

interface FlowParticle {
  progress: number;
  speed: number;
  curve: THREE.CubicBezierCurve3;
  trailLength: number;
}

const color = '#e8e8e8'; // engrave-line

// Функция для генерации кривой Безье с вариациями
function generateFlowCurve(index: number, total: number): THREE.CubicBezierCurve3 {
  // Базовые точки входа и выхода
  const entryX = 2.5 + (Math.random() - 0.5) * 0.5;
  const entryY = -2.5 + (Math.random() - 0.5) * 0.5;
  const entryZ = 1.5 + (Math.random() - 0.5) * 0.5;
  
  const exitX = 2.5 + (Math.random() - 0.5) * 0.5;
  const exitY = 2.5 + (Math.random() - 0.5) * 0.5;
  const exitZ = 1.5 + (Math.random() - 0.5) * 0.5;
  
  // Точка входа (снизу справа)
  const startPoint = new THREE.Vector3(entryX, entryY, entryZ);
  
  // Центральная точка (около центра шара, но не точно в центре для естественности)
  const centerOffset = (index / total - 0.5) * 0.3; // небольшое смещение по X
  const centerPoint = new THREE.Vector3(
    centerOffset, 
    0, 
    Math.sin(index * 0.5) * 0.3
  );
  
  // Контрольные точки для создания плавной кривой
  const control1 = new THREE.Vector3(
    entryX * 0.5 + centerPoint.x * 0.3,
    entryY * 0.3,
    entryZ * 0.7
  );
  
  const control2 = new THREE.Vector3(
    exitX * 0.5 + centerPoint.x * 0.3,
    exitY * 0.3,
    exitZ * 0.7
  );
  
  // Точка выхода (сверху справа)
  const endPoint = new THREE.Vector3(exitX, exitY, exitZ);
  
  return new THREE.CubicBezierCurve3(
    startPoint,
    control1,
    control2,
    endPoint
  );
}

export default function NeuralFlowStream() {
  const quality = getOptimal3DQuality();
  const pointsRef = useRef<THREE.Points>(null);
  
  // Количество потоков в зависимости от качества
  const streamCount = useMemo(() => {
    if (quality === 'low') return 10;
    if (quality === 'medium') return 18;
    return 28;
  }, [quality]);
  
  // Количество частиц в трейле для каждого потока
  const trailParticlesPerStream = quality === 'low' ? 4 : quality === 'medium' ? 6 : 8;
  const totalParticles = streamCount * trailParticlesPerStream;
  
  // Генерация частиц и траекторий
  const { particles, curves } = useMemo(() => {
    const curves: THREE.CubicBezierCurve3[] = [];
    const particles: FlowParticle[] = [];
    
    for (let i = 0; i < streamCount; i++) {
      const curve = generateFlowCurve(i, streamCount);
      curves.push(curve);
      
      // Создаем несколько частиц для эффекта трейла
      for (let j = 0; j < trailParticlesPerStream; j++) {
        particles.push({
          progress: (j / trailParticlesPerStream) * 0.7 + (i / streamCount) * 0.2, // распределяем частицы
          speed: 0.35 + (Math.random() - 0.5) * 0.15, // вариация скорости
          curve: curve,
          trailLength: trailParticlesPerStream
        });
      }
    }
    
    return { particles, curves };
  }, [streamCount, trailParticlesPerStream]);
  
  // Позиции частиц
  const positions = useMemo(() => {
    return new Float32Array(totalParticles * 3);
  }, [totalParticles]);
  
  const initializedRef = useRef(false);
  
  // Обновление позиций частиц
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array as Float32Array;
    
    // Инициализация позиций при первом кадре
    if (!initializedRef.current) {
      particles.forEach((particle, i) => {
        const point = particle.curve.getPoint(particle.progress);
        posArray[i * 3] = point.x;
        posArray[i * 3 + 1] = point.y;
        posArray[i * 3 + 2] = point.z;
      });
      initializedRef.current = true;
      positionsAttr.needsUpdate = true;
    }
    
    particles.forEach((particle, i) => {
      // Обновляем прогресс
      particle.progress += delta * particle.speed;
      
      // Если частица прошла всю траекторию, перезапускаем её
      if (particle.progress >= 1.0) {
        particle.progress = 0;
      }
      
      // Вычисляем позицию на кривой Безье
      const point = particle.curve.getPoint(particle.progress);
      
      const idx = i * 3;
      posArray[idx] = point.x;
      posArray[idx + 1] = point.y;
      posArray[idx + 2] = point.z;
    });
    
    positionsAttr.needsUpdate = true;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={totalParticles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={quality === 'low' ? 0.08 : quality === 'medium' ? 0.1 : 0.12}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

