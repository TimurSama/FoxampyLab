"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
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

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

float fluidWave(vec2 uv, float time) {
    vec2 flow1 = vec2(
        fbm(uv * 0.3 + vec2(time * 0.15, time * 0.2)),
        fbm(uv * 0.3 + vec2(time * 0.18, time * 0.22))
    );
    
    float wave1 = fbm(uv * 0.8 + flow1 * 2.0 + vec2(time * 0.2, time * 0.25));
    float wave2 = fbm(uv * 1.2 - flow1 * 1.5 + vec2(time * 0.25, time * 0.3));
    
    float combined = (wave1 * 0.6 + wave2 * 0.4);
    // Нормализуем в диапазон 0-1
    combined = combined * 0.5 + 0.5;
    // Возвращаем значение напрямую для видимости волн
    return combined;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.2;
    float fluid = fluidWave(uv, t);
    
    vec3 baseColor = vec3(0.0, 0.0, 0.0);
    vec3 darkGray = vec3(0.08, 0.08, 0.08);
    vec3 midGray = vec3(0.18, 0.18, 0.18);
    vec3 lightGray = vec3(0.35, 0.35, 0.35);
    vec3 white = vec3(0.9, 0.9, 0.9);
    
    // Плавное смешивание цветов - волны видны на черном фоне
    color = mix(baseColor, darkGray, smoothstep(0.4, 0.6, fluid));
    color = mix(color, midGray, smoothstep(0.6, 0.75, fluid));
    color = mix(color, lightGray, smoothstep(0.75, 0.9, fluid));
    
    // Блики на пиках волн
    float reflection = pow(max(0.0, fluid - 0.85), 1.5) * 2.5;
    color = mix(color, white, reflection * 0.3);
    
    float dist = length(uv - 0.5);
    color *= (1.0 - dist * 0.1);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function InkFluidVariant1() {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, 0]} scale={[100, 100, 1]}>
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

