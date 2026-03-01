"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simplified continent data with heights
// Format: [lat, lon, height] - height 0 = sea level, 1 = mountains
const earthPoints: [number, number, number][] = [];

// Generate Earth geography points
function generateEarthPoints() {
  const points: [number, number, number][] = [];
  
  // Simplified continent outlines with elevation
  // North America
  for (let lat = 25; lat < 70; lat += 3) {
    for (let lon = -170; lon < -60; lon += 4) {
      // Basic continent mask
      const inContinent = 
        // USA/Canada
        (lat > 25 && lat < 70 && lon > -130 && lon < -60 && Math.random() > 0.3) ||
        // Alaska
        (lat > 55 && lat < 72 && lon > -170 && lon < -130 && Math.random() > 0.4);
      
      if (inContinent) {
        // Add elevation - Rockies
        let height = 0.3;
        if (lon > -120 && lon < -100 && lat > 30 && lat < 60) height = 0.6 + Math.random() * 0.3;
        // Appalachians
        if (lon > -85 && lon < -75 && lat > 30 && lat < 45) height = 0.4;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // South America
  for (let lat = -60; lat < 15; lat += 3) {
    for (let lon = -80; lon < -35; lon += 4) {
      const inContinent = 
        (lat > -60 && lat < 15 && lon > -80 && lon < -35 && Math.random() > 0.3);
      
      if (inContinent) {
        // Andes
        let height = 0.3;
        if (lon > -75 && lon < -65) height = 0.7 + Math.random() * 0.3;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // Europe
  for (let lat = 35; lat < 72; lat += 3) {
    for (let lon = -10; lon < 60; lon += 4) {
      const inContinent = Math.random() > 0.4;
      
      if (inContinent) {
        // Alps
        let height = 0.25;
        if (lat > 44 && lat < 48 && lon > 5 && lon < 15) height = 0.6;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // Africa
  for (let lat = -35; lat < 38; lat += 3) {
    for (let lon = -20; lon < 55; lon += 4) {
      const inContinent = Math.random() > 0.35;
      
      if (inContinent) {
        // Kilimanjaro / Ethiopian highlands
        let height = 0.25;
        if (lat > -5 && lat < 10 && lon > 30 && lon < 45) height = 0.5 + Math.random() * 0.3;
        // Atlas
        if (lat > 30 && lat < 38 && lon > -10 && lon < 5) height = 0.4;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // Asia
  for (let lat = 5; lat < 75; lat += 3) {
    for (let lon = 60; lon < 180; lon += 4) {
      const inContinent = Math.random() > 0.35;
      
      if (inContinent) {
        // Himalayas
        let height = 0.3;
        if (lat > 25 && lat < 40 && lon > 70 && lon < 100) height = 0.8 + Math.random() * 0.2;
        // Ural
        if (lat > 45 && lat < 70 && lon > 55 && lon < 65) height = 0.4;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // Australia
  for (let lat = -45; lat < -10; lat += 3) {
    for (let lon = 110; lon < 155; lon += 4) {
      const inContinent = Math.random() > 0.4;
      
      if (inContinent) {
        let height = 0.2;
        // Great Dividing Range
        if (lon > 145 && lon < 155 && lat > -40 && lat < -20) height = 0.35;
        
        points.push([lat, lon, height]);
      }
    }
  }
  
  // Antarctica
  for (let lat = -90; lat < -65; lat += 4) {
    for (let lon = -180; lon < 180; lon += 8) {
      if (Math.random() > 0.3) {
        points.push([lat, lon, 0.3 + Math.random() * 0.2]);
      }
    }
  }
  
  return points;
}

function Globe({ className }: { className?: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Generate points
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    
    const points = generateEarthPoints();
    const radius = 1;
    
    points.forEach(([lat, lon, height]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      // Apply height to radius
      const r = radius + height * 0.15;
      
      const x = -r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      
      positions.push(x, y, z);
      
      // Color based on height
      const brightness = 0.4 + height * 0.6;
      colors.push(brightness, brightness, brightness);
    });
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geo;
  }, []);

  // Outer wireframe sphere
  const wireframeGeometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.3, 2);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && !isDragging) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
    
    // Subtle point animation
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.7 + Math.sin(clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth points */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial 
          size={0.02}
          transparent
          opacity={0.8}
          vertexColors
          sizeAttenuation
        />
      </points>
      
      {/* Outer wireframe */}
      <mesh ref={outerRef} geometry={wireframeGeometry}>
        <meshBasicMaterial 
          color="#4a4a52" 
          wireframe 
          transparent 
          opacity={0.15}
        />
      </mesh>
      
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.5} />
      </mesh>
      
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.38, 64]} />
        <meshBasicMaterial color="#e8e8e8" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Second orbital ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[1.4, 1.42, 64]} />
        <meshBasicMaterial color="#e8e8e8" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Globe />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function PointGlobe({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full relative ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
