"use client";

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, PerspectiveCamera } from '@react-three/drei';

/**
 * MultidisciplinaryNetwork - Нейропаутина пересечений форм и объемов
 * Показывает пересечения разных направлений: IT, Architecture, Fashion, Cinema, R&D
 * 4D интерактивная анимация без цветов (монохром)
 */

const directions = [
  { id: 'it', label: 'IT', pos: [2, 1, 0] },
  { id: 'arch', label: 'ARCH', pos: [-1.5, 1.5, 1] },
  { id: 'fashion', label: 'FASHION', pos: [-2, -1, 0.5] },
  { id: 'cinema', label: 'CINEMA', pos: [1.5, -1.5, -1] },
  { id: 'rd', label: 'R&D', pos: [0, 0, 2] },
  { id: 'business', label: 'BIZ', pos: [0, 2, -1] },
];

function NetworkNode({ 
  position, 
  label, 
  isHovered, 
  onHover 
}: { 
  position: [number, number, number];
  label: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [localHover, setLocalHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered || localHover
        ? 1.08 + Math.sin(state.clock.elapsedTime * 4) * 0.04
        : 1;
      meshRef.current.scale.setScalar(scale);
      
      // Пульсация для дочерних элементов
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = (isHovered || localHover ? 0.95 : 0.55) * pulse;
        }
      });
    }
  });

  return (
    <group
      position={position}
      ref={meshRef}
      onPointerEnter={() => {
        setLocalHover(true);
        onHover(true);
      }}
      onPointerLeave={() => {
        setLocalHover(false);
        onHover(false);
      }}
    >
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial
          color="#E0E0E0"
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Встроенная подпись (появляется на hover) */}
      {(isHovered || localHover) && (
        <Html
          transform
          distanceFactor={10}
          position={[0.22, 0.18, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              border: '1px solid rgba(224,224,224,0.25)',
              background: 'rgba(5,5,5,0.55)',
              backdropFilter: 'blur(10px)',
              color: 'rgba(224,224,224,0.92)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace',
              fontSize: 10,
              letterSpacing: '0.32em',
              padding: '8px 10px',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLine({ 
  start, 
  end, 
  intensity 
}: { 
  start: [number, number, number];
  end: [number, number, number];
  intensity: number;
}) {
  const lineRef = useRef<THREE.Line | null>(null);
  
  const bend = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.35,
    y: (Math.random() - 0.5) * 0.35,
    z: (Math.random() - 0.5) * 0.35,
    w: (Math.random() - 0.5) * 1.5, // "четвертое измерение" как фазовый параметр
  }), []);

  const pointsRef = useRef<Float32Array | null>(null);
  const count = 24;

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = intensity * (0.22 + Math.sin(state.clock.elapsedTime * 1.7 + bend.w) * 0.22);

      // Легкая "4D" деформация: контрольная точка дрейфует по фазе
      const geom = lineRef.current.geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute('position') as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const t = state.clock.elapsedTime;

      const sx = start[0], sy = start[1], sz = start[2];
      const ex = end[0], ey = end[1], ez = end[2];

      const mx = (sx + ex) / 2 + bend.x + Math.sin(t * 0.9 + bend.w) * 0.12;
      const my = (sy + ey) / 2 + bend.y + Math.cos(t * 0.8 + bend.w) * 0.12;
      const mz = (sz + ez) / 2 + bend.z + Math.sin(t * 0.7 + bend.w) * 0.12;

      // Кривая Catmull-Rom с динамической средней точкой
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sx, sy, sz),
        new THREE.Vector3(mx, my, mz),
        new THREE.Vector3(ex, ey, ez),
      ]);
      const pts = curve.getPoints(count - 1);
      for (let i = 0; i < pts.length; i++) {
        const idx = i * 3;
        arr[idx] = pts[i].x;
        arr[idx + 1] = pts[i].y;
        arr[idx + 2] = pts[i].z;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={pointsRef.current ?? new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#E0E0E0" 
        transparent 
        opacity={intensity * 0.3}
        linewidth={1}
      />
    </line>
  );
}

function NetworkCore() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const timeRef = useRef(0);

  // Создаем связи между направлениями
  const connections = useMemo(() => {
    const conns: Array<{ start: number; end: number; intensity: number }> = [];
    // IT связан со всеми
    conns.push({ start: 0, end: 1, intensity: 0.8 }); // IT -> ARCH
    conns.push({ start: 0, end: 2, intensity: 0.6 }); // IT -> FASHION
    conns.push({ start: 0, end: 3, intensity: 0.7 }); // IT -> CINEMA
    conns.push({ start: 0, end: 4, intensity: 0.9 }); // IT -> R&D
    conns.push({ start: 0, end: 5, intensity: 0.8 }); // IT -> BIZ
    
    // ARCH связан с FASHION и CINEMA
    conns.push({ start: 1, end: 2, intensity: 0.7 }); // ARCH -> FASHION
    conns.push({ start: 1, end: 3, intensity: 0.6 }); // ARCH -> CINEMA
    
    // FASHION связан с CINEMA
    conns.push({ start: 2, end: 3, intensity: 0.8 }); // FASHION -> CINEMA
    
    // R&D связан с ARCH и BIZ
    conns.push({ start: 4, end: 1, intensity: 0.7 }); // R&D -> ARCH
    conns.push({ start: 4, end: 5, intensity: 0.8 }); // R&D -> BIZ
    
    // BIZ связан с CINEMA
    conns.push({ start: 5, end: 3, intensity: 0.6 }); // BIZ -> CINEMA
    
    return conns;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;

      const t = timeRef.current;

      // "Интерпретированное" 4D-движение: прецессия + дыхание + мягкая неустойчивость
      const precession = 0.12;
      const wobble = 0.18;
      groupRef.current.rotation.y = t * precession + Math.sin(t * 0.33) * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.41) * wobble + Math.sin(t * 0.09) * 0.06;
      groupRef.current.rotation.z = Math.cos(t * 0.27) * 0.12;

      // Масштаб "дышит" (меньше и тоньше)
      const breathe = 0.78 + Math.sin(t * 0.6) * 0.02;
      groupRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Встроенный текст как часть визуала (теги внутри сети) */}
      <Html transform distanceFactor={12} position={[0, 0.9, 0]} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            border: '1px solid rgba(224,224,224,0.22)',
            background: 'rgba(5,5,5,0.35)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(224,224,224,0.9)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace',
            fontSize: 10,
            letterSpacing: '0.32em',
            padding: '10px 12px',
            width: 320,
            lineHeight: 1.4,
            textTransform: 'uppercase',
          }}
        >
          MULTIDISCIPLINARY SYNTHESIS<br />
          <span style={{ opacity: 0.8, letterSpacing: '0.18em', textTransform: 'none' }}>
            Пересечения форм, кода и исследований. Проекты рождаются в зоне перекрытия дисциплин.
          </span>
        </div>
      </Html>

      {/* Связи между узлами */}
      {connections.map((conn, idx) => (
        <ConnectionLine
          key={idx}
          start={directions[conn.start].pos as [number, number, number]}
          end={directions[conn.end].pos as [number, number, number]}
          intensity={conn.intensity}
        />
      ))}
      
      {/* Узлы направлений */}
      {directions.map((dir) => (
        <NetworkNode
          key={dir.id}
          position={dir.pos as [number, number, number]}
          label={dir.label}
          isHovered={hoveredNode === dir.id}
          onHover={(hovered) => setHoveredNode(hovered ? dir.id : null)}
        />
      ))}
      
      {/* Центральный узел синтеза */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshBasicMaterial 
          color="#E0E0E0" 
          transparent 
          opacity={0.25}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function MultidisciplinaryNetwork() {
  return (
    <div className="w-full h-[520px] md:h-[640px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0.2, 0.1, 8]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[10, 10, 10]} intensity={0.18} />
        <pointLight position={[-10, -10, -10]} intensity={0.12} />

        <CameraDrift />
        <NetworkCore />
      </Canvas>
    </div>
  );
}

function CameraDrift() {
  const rigRef = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;

    // Орбита + прецессия + лёгкий ролл (ощущение 4D)
    const r = 7.6 + Math.sin(t * 0.23) * 0.2;
    const theta = t * 0.12 + Math.sin(t * 0.31) * 0.12;
    const phi = 0.18 + Math.sin(t * 0.27) * 0.06;

    const x = r * Math.cos(theta) * Math.cos(phi);
    const y = r * Math.sin(phi);
    const z = r * Math.sin(theta) * Math.cos(phi);

    camera.position.lerp(new THREE.Vector3(x, y, z), 0.035);

    const lookX = Math.sin(t * 0.19) * 0.1;
    const lookY = Math.cos(t * 0.17) * 0.06;
    camera.lookAt(lookX, lookY, 0);

    camera.rotation.z = Math.sin(t * 0.21) * 0.035;
  });

  return <group ref={rigRef} />;
}

