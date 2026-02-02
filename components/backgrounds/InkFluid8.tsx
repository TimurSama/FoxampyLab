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

// Эффект глубокого океана чернилы
float inkOcean(vec2 uv, float time, vec2 mouse) {
    vec2 mouseNorm = mouse / uResolution;
    
    // Глубокие волны
    float deep1 = snoise(uv * 0.3 + time * 0.03);
    float deep2 = snoise(uv * 0.4 + time * 0.025 + vec2(3.0, 2.0));
    float deep3 = snoise(uv * 0.5 + time * 0.02 + vec2(1.5, 3.5));
    
    // Поверхностные волны
    float surface1 = snoise(uv * 1.2 - time * 0.08);
    float surface2 = snoise(uv * 1.8 + time * 0.06 + vec2(2.0, 1.0));
    float surface3 = snoise(uv * 2.5 - time * 0.04 + vec2(4.0, 3.0));
    
    // Мелкие ряби
    float ripple1 = snoise(uv * 5.0 + time * 0.15);
    float ripple2 = snoise(uv * 7.0 - time * 0.12 + vec2(1.0, 2.0));
    
    // Влияние мыши - создает возмущения на поверхности
    float mouseDist = distance(uv, mouseNorm);
    float mouseEffect = (1.0 - smoothstep(0.0, 0.6, mouseDist));
    float mouseRipple = sin(distance(uv, mouseNorm) * 30.0 - time * 5.0) * mouseEffect;
    
    // Комбинируем все слои
    float deep = (deep1 * 0.5 + deep2 * 0.3 + deep3 * 0.2) * 0.4;
    float surface = (surface1 * 0.4 + surface2 * 0.35 + surface3 * 0.25) * 0.4;
    float ripples = (ripple1 * 0.6 + ripple2 * 0.4) * 0.2;
    
    float combined = deep + surface + ripples + mouseRipple * 0.1;
    
    return combined * 0.5 + 0.5;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.04;
    vec2 mouse = uMouse / uResolution;
    
    float ink = inkOcean(uv, t, mouse);
    
    // Очень темная палитра глубокого океана
    vec3 abyss = vec3(0.005, 0.005, 0.008);
    vec3 deepOcean = vec3(0.018, 0.018, 0.025);
    vec3 midOcean = vec3(0.035, 0.035, 0.045);
    vec3 surfaceOcean = vec3(0.065, 0.065, 0.08);
    vec3 foam = vec3(0.12, 0.12, 0.15);
    
    vec3 color = abyss;
    color = mix(color, deepOcean, smoothstep(0.15, 0.3, ink));
    color = mix(color, midOcean, smoothstep(0.3, 0.5, ink));
    color = mix(color, surfaceOcean, smoothstep(0.5, 0.7, ink));
    color = mix(color, foam, smoothstep(0.7, 0.85, ink));
    
    // Эффект глубины
    float depth = length(uv - vec2(0.5, 0.5));
    color *= (1.0 - depth * 0.1);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function InkFluid8() {
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
      />
    </mesh>
  );
}