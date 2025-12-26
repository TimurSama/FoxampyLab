"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: 'tech' | 'creative' | 'business' | 'science';
  connections: string[];
}

const nodes: Node[] = [
  // Core - center
  { id: 'core', label: 'FRACTALIX', x: 50, y: 50, category: 'tech', connections: ['web', 'blockchain', 'design', 'marketing', 'research', 'video'] },
  
  // Tech cluster
  { id: 'web', label: 'WEB/APP', x: 25, y: 25, category: 'tech', connections: ['core', 'blockchain', 'design'] },
  { id: 'blockchain', label: 'BLOCKCHAIN', x: 75, y: 25, category: 'tech', connections: ['core', 'web', 'research'] },
  
  // Creative cluster
  { id: 'design', label: 'DESIGN', x: 15, y: 50, category: 'creative', connections: ['core', 'web', 'video', 'marketing'] },
  { id: 'video', label: 'VIDEO', x: 25, y: 75, category: 'creative', connections: ['core', 'design', 'marketing'] },
  
  // Business cluster
  { id: 'marketing', label: 'MARKETING', x: 75, y: 75, category: 'business', connections: ['core', 'design', 'video', 'research'] },
  
  // Science cluster
  { id: 'research', label: 'R&D', x: 85, y: 50, category: 'science', connections: ['core', 'blockchain', 'marketing'] },
];

const categoryColors = {
  tech: { primary: '#60a5fa', secondary: 'rgba(96, 165, 250, 0.2)' },
  creative: { primary: '#c084fc', secondary: 'rgba(192, 132, 252, 0.2)' },
  business: { primary: '#4ade80', secondary: 'rgba(74, 222, 128, 0.2)' },
  science: { primary: '#fbbf24', secondary: 'rgba(251, 191, 36, 0.2)' },
};

const synergyExamples = [
  {
    from: 'DESIGN',
    to: 'BLOCKCHAIN',
    result: 'Интуитивные криптокошельки',
    innovation: 'UX паттерны для Web3'
  },
  {
    from: 'MARKETING',
    to: 'R&D',
    result: 'Data-driven кампании',
    innovation: 'Предиктивная аналитика'
  },
  {
    from: 'VIDEO',
    to: 'BLOCKCHAIN',
    result: 'NFT видео-арт',
    innovation: 'Токенизация контента'
  },
  {
    from: 'WEB/APP',
    to: 'R&D',
    result: 'AI-интеграции',
    innovation: 'Адаптивные интерфейсы'
  },
  {
    from: 'DESIGN',
    to: 'MARKETING',
    result: 'Вирусный брендинг',
    innovation: 'Эмоциональный дизайн'
  },
];

export default function SynergyNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeSynergy, setActiveSynergy] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [particles, setParticles] = useState<{ id: number; x1: number; y1: number; x2: number; y2: number; progress: number }[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Rotate synergy examples
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSynergy(prev => (prev + 1) % synergyExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate particles along connections
  useEffect(() => {
    const createParticle = () => {
      const connectionPairs = nodes.flatMap(node => 
        node.connections.map(conn => ({ from: node, to: nodes.find(n => n.id === conn)! }))
      ).filter(p => p.to);

      const randomPair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
      if (!randomPair) return;

      const newParticle = {
        id: Date.now(),
        x1: randomPair.from.x,
        y1: randomPair.from.y,
        x2: randomPair.to.x,
        y2: randomPair.to.y,
        progress: 0
      };

      setParticles(prev => [...prev.slice(-10), newParticle]);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  // Update particle progress
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 0.02 }))
          .filter(p => p.progress < 1)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const getNodePosition = (node: Node) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height
  });

  const connections = useMemo(() => {
    const result: { from: Node; to: Node; key: string }[] = [];
    const added = new Set<string>();
    
    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const connNode = nodes.find(n => n.id === connId);
        if (connNode) {
          const key = [node.id, connId].sort().join('-');
          if (!added.has(key)) {
            added.add(key);
            result.push({ from: node, to: connNode, key });
          }
        }
      });
    });
    
    return result;
  }, []);

  return (
    <div className="relative w-full">
      {/* SVG Network visualization */}
      <div className="relative h-[300px] md:h-[400px]">
        <svg 
          ref={svgRef} 
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {/* Connections */}
          {connections.map(({ from, to, key }) => {
            const fromPos = getNodePosition(from);
            const toPos = getNodePosition(to);
            const isActive = activeNode === from.id || activeNode === to.id;
            
            return (
              <line
                key={key}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={isActive ? '#e8e8e8' : '#3a3a40'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeOpacity={isActive ? 0.8 : 0.3}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Animated particles */}
          {particles.map(particle => {
            const x = particle.x1 + (particle.x2 - particle.x1) * particle.progress;
            const y = particle.y1 + (particle.y2 - particle.y1) * particle.progress;
            const screenX = (x / 100) * dimensions.width;
            const screenY = (y / 100) * dimensions.height;
            
            return (
              <circle
                key={particle.id}
                cx={screenX}
                cy={screenY}
                r={2}
                fill="#e8e8e8"
                opacity={1 - particle.progress}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const pos = getNodePosition(node);
            const colors = categoryColors[node.category];
            const isCore = node.id === 'core';
            const isActive = activeNode === node.id;
            
            return (
              <g 
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Glow */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isCore ? 35 : 25}
                  fill={colors.secondary}
                  opacity={isActive ? 0.8 : 0.3}
                  className="transition-opacity duration-300"
                />
                
                {/* Node circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isCore ? 30 : 20}
                  fill="#0a0a0a"
                  stroke={isActive ? colors.primary : '#3a3a40'}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
                
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? colors.primary : '#909098'}
                  fontSize={isCore ? 8 : 6}
                  fontFamily="monospace"
                  className="transition-colors duration-300 pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Synergy examples carousel */}
      <div className="mt-6 relative overflow-hidden">
        <div className="text-center mb-4">
          <div className="font-mono text-[10px] text-stone-graphite tracking-[0.3em]">
            СИНЕРГИЯ В ДЕЙСТВИИ
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSynergy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-ink-chrome/50 border border-stone-anthracite/30 p-4"
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="font-mono text-xs text-engrave-line">
                {synergyExamples[activeSynergy].from}
              </span>
              <span className="text-stone-graphite">+</span>
              <span className="font-mono text-xs text-engrave-line">
                {synergyExamples[activeSynergy].to}
              </span>
              <span className="text-stone-graphite">=</span>
            </div>
            <div className="text-center">
              <div className="font-mono text-sm text-engrave-fresco mb-1">
                {synergyExamples[activeSynergy].result}
              </div>
              <div className="font-mono text-[10px] text-green-400">
                → {synergyExamples[activeSynergy].innovation}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {synergyExamples.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSynergy(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === activeSynergy ? 'bg-engrave-line w-4' : 'bg-stone-graphite'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

