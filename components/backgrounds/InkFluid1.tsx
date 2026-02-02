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

// Классический noise для чернильных эффектов
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

// Улучшенный FBM для густой чернильной жидкости
float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < octaves; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Функция для создания густой чернильной жидкости
float inkFluid(vec2 uv, float time, vec2 mouse) {
    // Нормализуем координаты мыши
    vec2 mouseNorm = mouse / uResolution;
    
    // Основное течение жидкости - медленное и вязкое
    vec2 flow1 = vec2(
        fbm(uv * 0.3 + time * 0.05, 4),
        fbm(uv * 0.3 + time * 0.04, 4)
    );
    
    // Вторичное течение для сложности
    vec2 flow2 = vec2(
        fbm(uv * 0.5 + time * 0.03, 5),
        fbm(uv * 0.5 + time * 0.035, 5)
    );
    
    // Интерактивное влияние мыши - более сильное и локальное
    float mouseDist = distance(uv, mouseNorm);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.3, mouseDist);
    vec2 mouseDisturbance = (mouseNorm - uv) * mouseInfluence * 0.8;
    
    // Густые чернильные волны - медленные и тяжелые
    float wave1 = fbm(uv * 0.8 + flow1 * 1.5 + mouseDisturbance + time * 0.02, 6);
    float wave2 = fbm(uv * 1.2 - flow1 * 1.2 + mouseDisturbance * 0.7 + time * 0.025, 5);
    float wave3 = fbm(uv * 1.8 + flow2 * 1.8 + mouseDisturbance * 0.5 + time * 0.03, 4);
    float wave4 = fbm(uv * 2.5 - flow2 * 1.5 + time * 0.035, 3);
    
    // Комбинирование с учетом вязкости
    float combined = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.2 + wave4 * 0.1);
    
    // Нормализация
    combined = combined * 0.5 + 0.5;
    
    // Эффект поверхностного натяжения и слияния капель
    float tension = fbm(uv * 3.0 + time * 0.01, 3) * 0.15;
    combined += tension * mouseInfluence;
    
    return combined;
}

void main() {
    vec2 uv = vUv;
    
    // Очень медленное время для густой жидкости
    float t = uTime * 0.1;
    
    // Нормализованные координаты мыши
    vec2 mouse = uMouse / uResolution;
    
    // Создаем густую чернильную жидкость
    float fluid = inkFluid(uv, t, mouse);
    
    // Чистая чернильная палитра - преимущественно черная с серыми оттенками
    vec3 deepInk = vec3(0.015, 0.015, 0.018); // Густая чернила
    vec3 heavyInk = vec3(0.04, 0.04, 0.045); // Темные переливы
    vec3 midInk = vec3(0.08, 0.08, 0.09); // Средние тона
    vec3 lightInk = vec3(0.15, 0.15, 0.17); // Светлые волны
    vec3 paper = vec3(0.85, 0.85, 0.87); // Бумажные блики
    
    // Смешивание для создания густой чернильной текстуры
    vec3 color = deepInk;
    
    // Плавные переходы для вязкой жидкости
    color = mix(color, heavyInk, smoothstep(0.2, 0.4, fluid));
    color = mix(color, midInk, smoothstep(0.4, 0.6, fluid));
    color = mix(color, lightInk, smoothstep(0.6, 0.8, fluid));
    
    // Мягкие блики как мокрая бумага
    float reflection = pow(max(0.0, fluid - 0.75), 1.5) * 1.5;
    color = mix(color, paper, reflection * 0.3);
    
    // Эффект глубины и объемности
    float dist = length(uv - mouse);
    color *= (1.0 - dist * 0.05);
    
    // Финальный цвет - густая чернильная жидкость
    gl_FragColor = vec4(color, 1.0);
}
`;

interface InkFluidProps {
  className?: string;
}

export default function InkFluid1({ className }: InkFluidProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  // Глобальный обработчик движения мыши
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
    
    // Получаем глобальные координаты мыши
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
      position={[0, 0, -0.5]} // Ближе к камере
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