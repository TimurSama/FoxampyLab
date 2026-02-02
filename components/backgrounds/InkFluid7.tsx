"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Эффект кристаллизующейся чернилы
float inkCrystals(vec2 uv, float time, vec2 mouse) {
    vec2 mouseNorm = mouse / uResolution;
    
    // Кристаллические структуры
    float crystal1 = snoise(uv * 4.0 - time * 0.02);
    float crystal2 = snoise(uv * 6.0 + time * 0.015 + vec2(2.0, 1.0));
    float crystal3 = snoise(uv * 8.0 - time * 0.01 + vec2(1.0, 3.0));
    
    // Создаем резкие края для кристаллов
    crystal1 = pow(abs(crystal1), 2.0) * sign(crystal1);
    crystal2 = pow(abs(crystal2), 1.5) * sign(crystal2);
    crystal3 = pow(abs(crystal3), 3.0) * sign(crystal3);
    
    // Основная жидкость под кристаллами
    float base = snoise(uv * 0.8 + time * 0.05) * 0.3;
    
    // Рост кристаллов вокруг мыши
    float mouseDist = distance(uv, mouseNorm);
    float crystalGrowth = (1.0 - smoothstep(0.0, 0.5, mouseDist)) * sin(time * 2.0) * 0.5 + 0.5;
    
    // Комбинируем эффекты
    float crystals = (crystal1 * 0.4 + crystal2 * 0.35 + crystal3 * 0.25);
    crystals = crystals * crystalGrowth * 0.6 + base;
    
    return crystals * 0.5 + 0.5;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;
    vec2 mouse = uMouse / uResolution;
    
    float ink = inkCrystals(uv, t, mouse);
    
    // Палитра кристаллической чернилы
    vec3 liquidBase = vec3(0.015, 0.015, 0.02);
    vec3 crystalDark = vec3(0.04, 0.04, 0.05);
    vec3 crystalLight = vec3(0.09, 0.09, 0.11);
    vec3 crystalBright = vec3(0.16, 0.16, 0.19);
    
    vec3 color = liquidBase;
    
    // Резкие переходы для кристаллов
    color = mix(color, crystalDark, smoothstep(0.2, 0.4, ink));
    color = mix(color, crystalLight, smoothstep(0.4, 0.65, ink));
    color = mix(color, crystalBright, smoothstep(0.65, 0.85, ink));
    
    // Добавляем преломление света
    float refraction = sin(ink * 20.0 + t * 3.0) * 0.5 + 0.5;
    color *= (0.8 + refraction * 0.2);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function InkFluid7() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
    
    if (state.pointer) {
      uniforms.uMouse.value.set(
        (state.pointer.x + 1) * 0.5 * size.width,
        (1 - state.pointer.y) * 0.5 * size.height
      );
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, -0.5]}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}