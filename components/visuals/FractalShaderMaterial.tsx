"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Вершинный шейдер
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Фрагментный шейдер
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Фрактальный паттерн
    float pattern = sin(uv.x * 10.0 + uTime) * sin(uv.y * 10.0 + uTime * 0.5);
    pattern = abs(pattern);
    
    // Эмиссия с пульсацией
    vec3 emissive = uColor * (0.3 + pattern * uIntensity);
    
    gl_FragColor = vec4(emissive, 0.8);
  }
`;

// Создаем кастомный материал
const FractalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#00F0FF'),
    uIntensity: 0.5,
  },
  vertexShader,
  fragmentShader
);

extend({ FractalMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fractalMaterial: any;
    }
  }
}

interface FractalShaderMaterialProps {
  color?: string;
  intensity?: number;
}

export default function FractalShaderMaterial({ color = '#00F0FF', intensity = 0.5 }: FractalShaderMaterialProps) {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uColor = new THREE.Color(color);
      materialRef.current.uIntensity = intensity;
    }
  });

  return <fractalMaterial ref={materialRef} />;
}

