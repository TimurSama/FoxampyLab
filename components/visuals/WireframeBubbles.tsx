"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Bubble({ position, radius, delay }: { position: [number, number, number], radius: number, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (!meshRef.current) return;
    
    const elapsed = (Date.now() - startTime.current) / 1000;
    const offsetTime = elapsed - delay;
    
    if (offsetTime > 0) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(offsetTime * 0.5) * 0.1;
      meshRef.current.rotation.x = offsetTime * 0.1;
      meshRef.current.rotation.y = offsetTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial 
        color="#e8e8e8" 
        wireframe 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
}

function BubbleCluster() {
  const groupRef = useRef<THREE.Group>(null);
  
  const bubbles = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], radius: 0.8, delay: 0 },
    { position: [0.9, 0.5, 0.3] as [number, number, number], radius: 0.6, delay: 0.2 },
    { position: [-0.7, 0.6, 0.2] as [number, number, number], radius: 0.55, delay: 0.4 },
    { position: [0.5, -0.6, 0.4] as [number, number, number], radius: 0.5, delay: 0.6 },
    { position: [-0.5, -0.5, 0.5] as [number, number, number], radius: 0.45, delay: 0.8 },
    { position: [0.3, 0.9, -0.3] as [number, number, number], radius: 0.4, delay: 1.0 },
    { position: [-0.4, 0.3, -0.6] as [number, number, number], radius: 0.35, delay: 1.2 },
    { position: [0.7, -0.2, -0.4] as [number, number, number], radius: 0.38, delay: 1.4 },
    { position: [-0.8, -0.3, -0.2] as [number, number, number], radius: 0.42, delay: 1.6 },
    { position: [0, 0.7, 0.6] as [number, number, number], radius: 0.33, delay: 1.8 },
    { position: [0.6, 0.3, 0.7] as [number, number, number], radius: 0.28, delay: 2.0 },
    { position: [-0.3, -0.8, 0.3] as [number, number, number], radius: 0.3, delay: 2.2 },
  ], []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((bubble, i) => (
        <Bubble key={i} {...bubble} />
      ))}
      
      {/* Connecting lines between nearby bubbles */}
      <ConnectionLines bubbles={bubbles} />
    </group>
  );
}

function ConnectionLines({ bubbles }: { bubbles: { position: [number, number, number] }[] }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const positions: number[] = [];
    
    // Connect nearby bubbles
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        const p1 = bubbles[i].position;
        const p2 = bubbles[j].position;
        
        const distance = Math.sqrt(
          Math.pow(p1[0] - p2[0], 2) +
          Math.pow(p1[1] - p2[1], 2) +
          Math.pow(p1[2] - p2[2], 2)
        );
        
        if (distance < 1.2) {
          positions.push(p1[0], p1[1], p1[2]);
          positions.push(p2[0], p2[1], p2[2]);
        }
      }
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [bubbles]);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#6b6b6b" transparent opacity={0.3} />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <BubbleCluster />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function WireframeBubbles() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      
      {/* Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
          <div className="font-mono text-[8px] text-engrave-dim">DESIGN</div>
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2">
          <div className="font-mono text-[8px] text-engrave-dim">CODE</div>
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <div className="font-mono text-[8px] text-engrave-dim">RESEARCH</div>
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <div className="font-mono text-[8px] text-engrave-dim">MARKETING</div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="font-mono text-[10px] text-engrave-line">SYNERGY</div>
        </div>
      </div>
    </div>
  );
}

