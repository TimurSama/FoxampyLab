"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

/**
 * The Artifacts - Виртуальная галерея
 * Визуалы плавают в пространстве, при скролле меняют форму (Morphing)
 * Монохромный стиль: черный, серый, белый, стекло, камень, матовый, глянцевый
 */
export default function TheArtifacts() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgressRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = Math.min(scrollTop / docHeight, 1);
      setScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Создаем артефакты разных типов - монохромные
  const artifacts = useMemo(() => [
    { 
      type: 'it', 
      position: [-2, 0, 0] as [number, number, number],
      baseGeometry: 'box' as const,
      morphGeometry: 'sphere' as const,
    },
    { 
      type: 'fashion', 
      position: [2, 0, 0] as [number, number, number],
      baseGeometry: 'torus' as const,
      morphGeometry: 'octahedron' as const,
    },
    { 
      type: 'architecture', 
      position: [0, -1.5, -1] as [number, number, number],
      baseGeometry: 'octahedron' as const,
      morphGeometry: 'icosahedron' as const,
    },
    { 
      type: 'design', 
      position: [0, 1.5, -1] as [number, number, number],
      baseGeometry: 'icosahedron' as const,
      morphGeometry: 'torus' as const,
    },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollFactor = scrollProgressRef.current;
      
      // Морфирование формы при скролле
      groupRef.current.children.forEach((child, i) => {
        const floatGroup = child as THREE.Group;
        const mesh = floatGroup.children[0] as THREE.Mesh;
        
        if (mesh && mesh.geometry) {
          // Изменение масштаба на основе скролла
          const baseScale = 1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.15;
          const scrollScale = 1 + scrollFactor * 0.5;
          mesh.scale.setScalar(baseScale * scrollScale);
          
          // Вращение при скролле
          mesh.rotation.x += (scrollFactor * 0.1 - mesh.rotation.x) * 0.1;
          mesh.rotation.y += (scrollFactor * 0.2 - mesh.rotation.y) * 0.1;
          mesh.rotation.z += (scrollFactor * 0.15 - mesh.rotation.z) * 0.1;
        }
      });
    }
  });

  // Функция для создания геометрии с морфингом
  const createMorphGeometry = (
    baseType: 'box' | 'torus' | 'octahedron' | 'icosahedron' | 'sphere',
    morphType: 'box' | 'torus' | 'octahedron' | 'icosahedron' | 'sphere',
    morphFactor: number
  ) => {
    // Пока используем базовую геометрию, морфинг через шейдеры будет сложнее
    // Для простоты используем интерполяцию между геометриями через scale
    return baseType;
  };

  return (
    <group ref={groupRef}>
      {artifacts.map((artifact, i) => {
        const morphFactor = scrollProgressRef.current;
        const geometryType = morphFactor < 0.5 
          ? artifact.baseGeometry 
          : artifact.morphGeometry;
        
        return (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={0.5 + morphFactor * 0.3}
            floatIntensity={0.8 + morphFactor * 0.2}
          >
            <group position={artifact.position}>
              {/* Основная форма - меняется в зависимости от типа и скролла */}
              {geometryType === 'box' && (
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial
                    color="#e0e0e0"
                    roughness={0.3}
                    metalness={0.7}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              )}
              {geometryType === 'torus' && (
                <mesh>
                  <torusGeometry args={[0.6, 0.3, 16, 32]} />
                  <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.9}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              )}
              {geometryType === 'octahedron' && (
                <mesh>
                  <octahedronGeometry args={[0.8, 0]} />
                  <meshStandardMaterial
                    color="#a0a0a0"
                    roughness={0.5}
                    metalness={0.5}
                    transparent
                    opacity={0.75}
                  />
                </mesh>
              )}
              {geometryType === 'icosahedron' && (
                <mesh>
                  <icosahedronGeometry args={[0.7, 0]} />
                  <meshStandardMaterial
                    color="#c0c0c0"
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              )}
              {geometryType === 'sphere' && (
                <mesh>
                  <sphereGeometry args={[0.7, 32, 32]} />
                  <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.05}
                    metalness={1.0}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              )}

              {/* Ореол вокруг артефакта - монохромный */}
              <mesh>
                <ringGeometry args={[1.2, 1.5, 32]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.1 + morphFactor * 0.1}
                  roughness={0.1}
                  metalness={0.9}
                  transparent
                  opacity={0.2 + morphFactor * 0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

