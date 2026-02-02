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

// Эффект завихрений чернилы
float inkSwirl(vec2 uv, float time, vec2 mouse) {
    vec2 mouseNorm = mouse / uResolution;
    
    // Создаем завихрения вокруг мыши
    vec2 center = mouseNorm;
    vec2 pos = uv - center;
    float angle = atan(pos.y, pos.x);
    float radius = length(pos);
    
    // Крутящий момент
    float swirl = sin(angle * 3.0 + time * 2.0 - radius * 10.0) * exp(-radius * 3.0);
    
    // Дополнительные вихри
    for(float i = 1.0; i < 4.0; i++) {
        vec2 swirlCenter = mouseNorm + vec2(sin(time + i), cos(time + i * 1.5)) * 0.2;
        vec2 swirlPos = uv - swirlCenter;
        float swirlAngle = atan(swirlPos.y, swirlPos.x);
        float swirlRadius = length(swirlPos);
        swirl += sin(swirlAngle * 4.0 + time * 3.0 - swirlRadius * 8.0) * exp(-swirlRadius * 4.0) * 0.5;
    }
    
    // Базовые движения чернилы
    float base = snoise(uv * 1.5 + time * 0.1) * 0.3;
    float detail = snoise(uv * 4.0 - time * 0.05) * 0.2;
    
    return swirl + base + detail + 0.5;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.18;
    vec2 mouse = uMouse / uResolution;
    
    float ink = inkSwirl(uv, t, mouse);
    ink = ink * 0.5 + 0.5;
    
    // Темная мистическая палитра
    vec3 voidInk = vec3(0.01, 0.01, 0.015);
    vec3 swirlInk = vec3(0.05, 0.04, 0.08);
    vec3 energyInk = vec3(0.09, 0.08, 0.12);
    vec3 vortex = vec3(0.15, 0.14, 0.18);
    
    vec3 color = voidInk;
    color = mix(color, swirlInk, smoothstep(0.3, 0.5, ink));
    color = mix(color, energyInk, smoothstep(0.5, 0.7, ink));
    color = mix(color, vortex, smoothstep(0.7, 0.9, ink));
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function InkFluid4() {
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