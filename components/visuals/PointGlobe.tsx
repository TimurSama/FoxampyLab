"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Simplified world map coordinates (major landmasses)
const worldCoordinates = [
  // North America
  ...generateRegion(-170, -50, 25, 70, 0.8),
  // South America
  ...generateRegion(-80, -35, -55, 10, 0.7),
  // Europe
  ...generateRegion(-10, 40, 35, 70, 0.9),
  // Africa
  ...generateRegion(-20, 50, -35, 35, 0.7),
  // Asia
  ...generateRegion(60, 150, 10, 70, 0.6),
  // Australia
  ...generateRegion(110, 155, -40, -10, 0.8),
];

function generateRegion(lonMin: number, lonMax: number, latMin: number, latMax: number, density: number) {
  const points: [number, number][] = [];
  const step = 3 / density;
  
  for (let lon = lonMin; lon <= lonMax; lon += step) {
    for (let lat = latMin; lat <= latMax; lat += step) {
      if (Math.random() < density) {
        points.push([lon, lat]);
      }
    }
  }
  return points;
}

function latLonToXYZ(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
}

interface GlobeProps {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  dragRotation: { x: number; y: number };
}

function Globe({ mousePos, isDragging, dragRotation }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, count } = useMemo(() => {
    const radius = 2;
    const positions: number[] = [];
    const colors: number[] = [];
    
    // Add world map points
    worldCoordinates.forEach(([lon, lat]) => {
      const [x, y, z] = latLonToXYZ(lat, lon, radius);
      positions.push(x, y, z);
      colors.push(0.9, 0.9, 0.95); // White-ish
    });
    
    // Add ocean grid points (sparse)
    for (let i = 0; i < 500; i++) {
      const lat = Math.random() * 180 - 90;
      const lon = Math.random() * 360 - 180;
      const [x, y, z] = latLonToXYZ(lat, lon, radius);
      positions.push(x, y, z);
      colors.push(0.3, 0.3, 0.35); // Dim gray
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      count: positions.length / 3
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      if (isDragging) {
        groupRef.current.rotation.x = dragRotation.x;
        groupRef.current.rotation.y = dragRotation.y;
      } else {
        // Auto rotation + mouse influence
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mousePos.x * 0.3;
        groupRef.current.rotation.x = mousePos.y * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.04}
          vertexColors
          transparent 
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.003, 8, 64]} />
        <meshBasicMaterial color="#3a3a40" transparent opacity={0.3} />
      </mesh>
      
      {/* Prime meridian */}
      <mesh>
        <torusGeometry args={[2, 0.003, 8, 64]} />
        <meshBasicMaterial color="#3a3a40" transparent opacity={0.2} />
      </mesh>
      
      {/* Axis */}
      <mesh>
        <cylinderGeometry args={[0.005, 0.005, 5, 8]} />
        <meshBasicMaterial color="#606068" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

interface PointGlobeProps {
  className?: string;
}

export default function PointGlobe({ className = '' }: PointGlobeProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      if (isDragging) {
        setDragRotation({
          x: (e.clientY - dragStart.y) * 0.01,
          y: (e.clientX - dragStart.x) * 0.01
        });
      } else {
        setMousePos({ x, y });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Globe 
          mousePos={mousePos}
          isDragging={isDragging}
          dragRotation={dragRotation}
        />
      </Canvas>

      {/* Labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] text-stone-graphite tracking-[0.3em]"
        >
          GLOBAL PRESENCE
        </motion.div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-stone-graphite/30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-stone-graphite/30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-stone-graphite/30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-stone-graphite/30" />
    </div>
  );
}

