"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface SphereProps {
  mousePos: { x: number; y: number };
}

function Sphere({ mousePos }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create icosahedron geometry for wireframe
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 2);
  }, []);

  // Create points on sphere surface
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const count = 200;
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const x = 2.2 * Math.cos(theta) * Math.sin(phi);
      const y = 2.2 * Math.sin(theta) * Math.sin(phi);
      const z = 2.2 * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05 + mousePos.y * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08 + mousePos.x * 0.3;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03 + mousePos.y * 0.3;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mousePos.x * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Wireframe sphere */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial 
          color="#3a3a40" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Points */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial 
          color="#e8e8e8" 
          size={0.02} 
          transparent 
          opacity={0.4}
          sizeAttenuation
        />
      </points>
      
      {/* Inner glow sphere */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#121215" 
          transparent 
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function WireframeSphere({ mousePos }: SphereProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Sphere mousePos={mousePos} />
      </Canvas>
    </div>
  );
}

