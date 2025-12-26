"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DataLayer({ y, opacity, color, size }: { y: number, opacity: number, color: string, size: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const gridSize = size;
    const spacing = 0.15;
    
    for (let x = -gridSize / 2; x <= gridSize / 2; x += spacing) {
      for (let z = -gridSize / 2; z <= gridSize / 2; z += spacing) {
        // Create terrain-like displacement
        const noise = Math.sin(x * 3) * Math.cos(z * 3) * 0.2 + 
                     Math.sin(x * 7 + z * 5) * 0.1;
        
        positions.push(x, y + noise, z);
      }
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [y, size]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const wave = Math.sin(x * 2 + time * 0.5) * Math.cos(z * 2 + time * 0.3) * 0.05;
        positions.setY(i, y + wave + Math.sin(x * 3) * Math.cos(z * 3) * 0.2);
      }
      
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        color={color} 
        size={0.02} 
        transparent 
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

function BoundingBox() {
  const boxRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(2.5, 1.5, 2.5);
    const edges = new THREE.EdgesGeometry(geo);
    return edges;
  }, []);

  return (
    <lineSegments ref={boxRef} geometry={geometry} position={[0, 0, 0]}>
      <lineBasicMaterial color="#4a4a4a" transparent opacity={0.5} />
    </lineSegments>
  );
}

function DataPillars() {
  const pillars = useMemo(() => {
    const result: { position: [number, number, number], height: number }[] = [];
    
    // Create random pillars representing data points
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      const height = 0.3 + Math.random() * 0.8;
      result.push({ position: [x, -0.5 + height / 2, z], height });
    }
    
    return result;
  }, []);

  return (
    <group>
      {pillars.map((pillar, i) => (
        <mesh key={i} position={pillar.position}>
          <boxGeometry args={[0.05, pillar.height, 0.05]} />
          <meshBasicMaterial color="#c8ff00" transparent opacity={0.6} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      <group ref={groupRef} rotation={[0.3, 0.5, 0]}>
        {/* Multiple data layers at different heights */}
        <DataLayer y={-0.5} opacity={0.8} color="#00ffff" size={2} />
        <DataLayer y={0} opacity={0.6} color="#c8ff00" size={1.8} />
        <DataLayer y={0.5} opacity={0.4} color="#ff6600" size={1.5} />
        
        {/* Bounding box */}
        <BoundingBox />
        
        {/* Data pillars */}
        <DataPillars />
        
        {/* Corner markers */}
        {[
          [-1.25, -0.75, -1.25],
          [1.25, -0.75, -1.25],
          [-1.25, -0.75, 1.25],
          [1.25, -0.75, 1.25],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function MethodologyLayers() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [2, 2, 2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      
      {/* Layer labels */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00ffff]" />
          <span className="font-mono text-[8px] text-stone-slate">DATA LAYER 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c8ff00]" />
          <span className="font-mono text-[8px] text-stone-slate">ANALYSIS LAYER</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#ff6600]" />
          <span className="font-mono text-[8px] text-stone-slate">INSIGHTS LAYER</span>
        </div>
      </div>
    </div>
  );
}

