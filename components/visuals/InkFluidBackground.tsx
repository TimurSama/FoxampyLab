"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Анимированная чернильная жидкость для фона
 * Монохромный стиль: черный, серый, белый с эффектом перетекания жирных волн
 */

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

// Simplex 2D noise
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

// Fractional Brownian Motion для жирных волн
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

// Функция для создания жирных волн густой чернильной жидкости
float fluidWave(vec2 uv, float time) {
    // Более выраженное перетекание с разными скоростями для видимых волн
    vec2 flow1 = vec2(
        fbm(uv * 0.5 + vec2(time * 0.4, time * 0.5)),
        fbm(uv * 0.5 + vec2(time * 0.45, time * 0.55))
    );
    
    vec2 flow2 = vec2(
        fbm(uv * 0.7 + vec2(time * 0.35, time * 0.4)),
        fbm(uv * 0.7 + vec2(time * 0.38, time * 0.45))
    );
    
    // Густые жирные волны с большей амплитудой и контрастом
    float wave1 = fbm(uv * 1.0 + flow1 * 3.5 + vec2(time * 0.6, time * 0.7));
    float wave2 = fbm(uv * 1.5 - flow1 * 3.0 + vec2(time * 0.7, time * 0.8));
    float wave3 = fbm(uv * 2.0 + flow2 * 4.5 + vec2(time * 0.8, time * 0.9));
    float wave4 = fbm(uv * 3.0 - flow2 * 4.0 + vec2(time * 0.9, time * 1.0));
    
    // Комбинирование волн для создания густого жирного эффекта
    float combined = (wave1 * 0.35 + wave2 * 0.3 + wave3 * 0.2 + wave4 * 0.15);
    
    // Нормализация в диапазон 0-1
    combined = combined * 0.5 + 0.5;
    
    // Возвращаем значение для дальнейшей обработки
    return combined;
}

void main() {
    vec2 uv = vUv;
    
    // Увеличенная скорость для более заметной анимации волн
    float t = uTime * 0.5;
    
    // Создание густых жирных волн чернильной жидкости
    float fluid = fluidWave(uv, t);
    
    // Монохромная палитра: ПРЕИМУЩЕСТВЕННО ЧЕРНЫЙ, немного серого, белые блики
    // Базовый черный (густая чернильная основа) - основной цвет
    vec3 baseColor = vec3(0.0, 0.0, 0.0);
    
    // Очень темно-серый для глубоких волн (почти черный)
    vec3 darkGray = vec3(0.08, 0.08, 0.08);
    
    // Темно-серый для перетеканий (только для контраста волн)
    vec3 midGray = vec3(0.18, 0.18, 0.18);
    
    // Средний серый для гребней волн
    vec3 lightGray = vec3(0.35, 0.35, 0.35);
    
    // Белый для блестящих отражений на поверхности (только блики)
    vec3 white = vec3(0.9, 0.9, 0.9);
    
    // Смешивание цветов: ПРЕИМУЩЕСТВЕННО ЧЕРНЫЙ с видимыми волнами
    // Используем smoothstep для плавных переходов
    vec3 color = baseColor;
    
    // Нижние 60% - полностью черный
    // Средние 20% (0.6-0.8) - переход от черного к темно-серому
    // Верхние 20% (0.8-1.0) - видимые волны с серыми оттенками
    color = mix(baseColor, darkGray, smoothstep(0.6, 0.75, fluid));
    color = mix(color, midGray, smoothstep(0.75, 0.85, fluid));
    color = mix(color, lightGray, smoothstep(0.85, 0.95, fluid));
    
    // Добавление блестящих отражений (белые блики на поверхности жидкости) - только на пиках
    float reflection = pow(max(0.0, fluid - 0.9), 2.0) * 2.0;
    color = mix(color, white, reflection * 0.25);
    
    // Дополнительный эффект перетекания для густой жидкости
    vec2 flowDir = vec2(
        fbm(uv * 0.7 + vec2(t * 0.5, t * 0.6)),
        fbm(uv * 0.7 + vec2(t * 0.55, t * 0.5))
    );
    
    // Добавление глубины через мягкий vignette
    float dist = length(uv - 0.5);
    color *= (1.0 - dist * 0.1);
    
    // Финальный цвет - преимущественно черный с видимыми анимированными волнами
    gl_FragColor = vec4(color, 1.0);
}
`;

export default function InkFluidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Используем useMemo для uniforms чтобы они правильно обновлялись
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    // Обновляем uniform времени для анимации
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[100, 100, 1]}>
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

