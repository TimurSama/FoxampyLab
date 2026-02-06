"use client";

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
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

// Улучшенный Simplex noise для более органических движений
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

// Улучшенный FBM с более сложными октавами
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

// Функция для создания вязких, тягучих волн как нефть/ртуть
float viscousFluid(vec2 uv, float time, vec2 mouse) {
    // Основное течение жидкости
    vec2 flow1 = vec2(
        fbm(uv * 0.3 + vec2(time * 0.15, time * 0.2), 4),
        fbm(uv * 0.3 + vec2(time * 0.18, time * 0.22), 4)
    );
    
    // Вторичное течение для сложности
    vec2 flow2 = vec2(
        fbm(uv * 0.5 + vec2(time * 0.12, time * 0.17), 5),
        fbm(uv * 0.5 + vec2(time * 0.14, time * 0.19), 5)
    );
    
    // Интерактивное влияние мыши
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.4, distance(uv, mouse));
    vec2 mouseDisturbance = (mouse - uv) * mouseInfluence * 0.3;
    
    // Основные волны с разной вязкостью
    float wave1 = fbm(uv * 0.8 + flow1 * 2.5 + mouseDisturbance + vec2(time * 0.13, time * 0.17), 6);
    float wave2 = fbm(uv * 1.3 - flow1 * 2.0 + mouseDisturbance * 0.8 + vec2(time * 0.19, time * 0.23), 5);
    float wave3 = fbm(uv * 1.8 + flow2 * 3.2 + mouseDisturbance * 0.6 + vec2(time * 0.21, time * 0.16), 4);
    float wave4 = fbm(uv * 2.8 - flow2 * 2.8 + mouseDisturbance * 0.4 + vec2(time * 0.25, time * 0.29), 3);
    
    // Комбинирование с учетом вязкости (чем ниже частота, тем больше влияние)
    float combined = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.2 + wave4 * 0.1);
    
    // Нормализация
    combined = combined * 0.5 + 0.5;
    
    // Добавляем поверхностное натяжение (эффект слияния капель)
    float tension = fbm(uv * 4.0 + time * 0.1, 3) * 0.1;
    combined += tension * mouseInfluence;
    
    return combined;
}

// Металлические блики как у ртути
vec3 metallicSheen(vec2 uv, float fluid, float time) {
    // Направление бликов зависит от движения жидкости
    vec2 flow = vec2(
        fbm(uv * 2.0 + time * 0.2, 3),
        fbm(uv * 2.0 + time * 0.15, 3)
    );
    
    // Создание резких металлических бликов
    float specular = pow(max(0.0, dot(normalize(flow), vec2(0.7071))), 32.0);
    specular *= smoothstep(0.7, 1.0, fluid);
    
    // Радужные эффекты как у нефти/ртути
    float iridescence = sin(fluid * 20.0 + time * 2.0) * 0.5 + 0.5;
    
    vec3 sheen = vec3(0.9, 0.9, 0.95); // Холодный металлический блеск
    sheen = mix(sheen, vec3(0.8, 0.85, 1.0), iridescence * 0.3); // Легкий синий оттенок
    
    return sheen * specular * 0.8;
}

void main() {
    vec2 uv = vUv;
    float t = uTime * 0.3; // Замедленная скорость для вязкости
    
    // Нормализованные координаты мыши
    vec2 mouse = uMouse / uResolution;
    
    // Создаем вязкую жидкость
    float fluid = viscousFluid(uv, t, mouse);
    
    // Цветовая палитра в стиле сайта: преимущественно черный с акцентами
    // Густая нефтяная/ртутная основа
    vec3 deepOil = vec3(0.02, 0.02, 0.025); // Почти черный с легким синим оттенком
    vec3 heavyOil = vec3(0.05, 0.05, 0.06); // Темный нефтяной
    vec3 midOil = vec3(0.12, 0.12, 0.15); // Средний тон
    vec3 lightOil = vec3(0.25, 0.25, 0.30); // Светлые переливы
    vec3 mercury = vec3(0.85, 0.87, 0.92); // Ртутные блики
    
    // Смешивание с учетом вязких переходов
    vec3 color = deepOil;
    
    // Более резкие переходы для вязкой жидкости
    color = mix(color, heavyOil, smoothstep(0.3, 0.5, fluid));
    color = mix(color, midOil, smoothstep(0.5, 0.7, fluid));
    color = mix(color, lightOil, smoothstep(0.7, 0.85, fluid));
    
    // Металлические блики на поверхности
    vec3 sheen = metallicSheen(uv, fluid, t);
    color = mix(color, mercury, sheen);
    
    // Эффект глубины и объемности
    float depth = 1.0 - length(uv - 0.5) * 0.15;
    color *= depth;
    
    // Дополнительный эффект мерцания как у нефти
    float shimmer = sin(t * 3.0 + uv.x * 10.0 + uv.y * 8.0) * 0.5 + 0.5;
    shimmer *= smoothstep(0.8, 1.0, fluid) * 0.1;
    color += vec3(shimmer * 0.1);
    
    // Финальный цвет - густая вязкая жидкость с металлическими переливами
    gl_FragColor = vec4(color, 1.0);
}
`;

interface InteractiveOilBackgroundProps {
  className?: string;
}

export default function InteractiveOilBackground({ className }: InteractiveOilBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  // Обработка движения мыши
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    // Используем нормализованные координаты из события
    const x = ((event.point.x + viewport.width / 2) / viewport.width) * size.width;
    const y = ((event.point.y + viewport.height / 2) / viewport.height) * size.height;
    
    setMousePos({ x, y });
    if (uniforms.uMouse) {
      uniforms.uMouse.value.set(x, y);
    }
  };

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, 0]} 
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
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
