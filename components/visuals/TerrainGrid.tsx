"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface TerrainMeshProps {
  mousePos: { x: number; y: number };
  time: number;
}

function TerrainMesh({ mousePos, time }: TerrainMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  
  const segments = 50;
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const positions = geometryRef.current.attributes.position;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Base wave
        let z = Math.sin(x * 0.5 + time * 0.5) * 0.3;
        z += Math.cos(y * 0.5 + time * 0.3) * 0.3;
        
        // Mouse ripple
        const dx = x - mousePos.x * 5;
        const dy = y - mousePos.y * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        z += Math.sin(dist - time * 2) * Math.exp(-dist * 0.2) * 0.5;
        
        positions.setZ(i, z);
      }
      
      positions.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[0, -0.5, 0]}>
      <planeGeometry ref={geometryRef} args={[10, 10, segments, segments]} />
      <meshBasicMaterial 
        color="#e8e8e8"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function GridLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const result = [];
    const count = 20;
    const size = 10;
    const step = size / count;
    
    // Horizontal lines
    for (let i = 0; i <= count; i++) {
      const y = -size / 2 + i * step;
      result.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-size / 2, y, 0, size / 2, y, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3a3a40" transparent opacity={0.1} />
        </line>
      );
    }
    
    // Vertical lines
    for (let i = 0; i <= count; i++) {
      const x = -size / 2 + i * step;
      result.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([x, -size / 2, 0, x, size / 2, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3a3a40" transparent opacity={0.1} />
        </line>
      );
    }
    
    return result;
  }, []);

  return (
    <group ref={linesRef} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[0, -1.5, -1]}>
      {lines}
    </group>
  );
}

function DataPoints({ mousePos }: { mousePos: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = Math.random() * 2;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[0, -0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#f0f0f5"
        size={0.05}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

interface TerrainGridProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

export default function TerrainGrid({ className = '', mousePos = { x: 0, y: 0 } }: TerrainGridProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <GridLines />
        <TerrainMesh mousePos={mousePos} time={0} />
        <DataPoints mousePos={mousePos} />
      </Canvas>

      {/* Overlay labels */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-stone-graphite">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-engrave-line/30" />
          <span>TERRAIN_MAP</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 font-mono text-[9px] text-stone-graphite text-right">
        <div>RES: 50x50</div>
        <div>SCALE: 1:1000</div>
      </div>

      {/* Frame */}
      <div className="absolute inset-4 border border-stone-anthracite/20 pointer-events-none" />
    </div>
  );
}

