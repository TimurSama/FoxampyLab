"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'ascii';
  content: string;
}

const ASCII_LOGO = `
  ███████╗██████╗  █████╗  ██████╗████████╗ █████╗ ██╗     ██╗██╗  ██╗
  ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║     ██║╚██╗██╔╝
  █████╗  ██████╔╝███████║██║        ██║   ███████║██║     ██║ ╚███╔╝ 
  ██╔══╝  ██╔══██╗██╔══██║██║        ██║   ██╔══██║██║     ██║ ██╔██╗ 
  ██║     ██║  ██║██║  ██║╚██████╗   ██║   ██║  ██║███████╗██║██╔╝ ██╗
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝
                        .LAB // Digital Laboratory
`;

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

const commands: Record<string, (args: string[]) => string[]> = {
  help: () => [
    '',
    'Available commands:',
    '  help      - Show this help message',
    '  about     - About Fractalix.lab',
    '  services  - List our services',
    '  projects  - View projects',
    '  contact   - Contact information',
    '  clear     - Clear terminal',
    '  matrix    - Enter the matrix',
    '  hack      - Try to hack the system',
    '  secret    - ???',
    '  sudo rm -rf / - DO NOT RUN',
    '',
  ],
  about: () => [
    '',
    '◈ FRACTALIX.LAB',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    'We are a digital laboratory specializing in:',
    '  • Complex ecosystem development',
    '  • Web3 & blockchain solutions',
    '  • UI/UX design & branding',
    '  • Marketing & growth strategies',
    '',
    'Founded: 2024',
    'Location: Global (Remote-first)',
    'Status: OPERATIONAL',
    '',
  ],
  services: () => [
    '',
    'SERVICES:',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '  [01] ECOSYSTEMS    - Full-cycle project development',
    '  [02] WEB/APP       - Websites, SPA, mobile apps',
    '  [03] BLOCKCHAIN    - Smart contracts, dApps, Web3',
    '  [04] DESIGN        - UI/UX, branding, identity',
    '  [05] MARKETING     - SMM, content, growth',
    '  [06] DOCUMENTS     - Whitepaper, business plan, pitch',
    '  [07] VIDEO         - Production, motion design',
    '',
  ],
  projects: () => [
    '',
    'PROJECTS:',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '  drwxr-xr-x  DEFI_PROTOCOL     2024.12  [LIVE]',
    '  drwxr-xr-x  NFT_MARKETPLACE   2024.11  [LIVE]',
    '  drwxr-xr-x  METAVERSE_HUB     2024.10  [BETA]',
    '  drwxr-xr-x  AI_ASSISTANT      2024.09  [DEV]',
    '  drwxr-xr-x  TRADING_BOT       2024.08  [LIVE]',
    '',
    'Use "cat <project>" for details',
    '',
  ],
  contact: () => [
    '',
    'CONTACT:',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '  Email:    hello@fractalix.lab',
    '  Telegram: @fractalix_lab',
    '  Twitter:  @fractalix_lab',
    '',
    'Response time: < 24 hours',
    '',
  ],
  secret: () => [
    '',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
    '▓                                                              ▓',
    '▓   You found a secret! 🎉                                     ▓',
    '▓                                                              ▓',
    '▓   Achievement unlocked: CURIOUS                              ▓',
    '▓                                                              ▓',
    '▓   "The curious mind finds pathways where others see walls"   ▓',
    '▓                                                              ▓',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
    '',
  ],
  hack: () => [
    '',
    '[INITIATING HACK SEQUENCE...]',
    '',
    '> Scanning network...',
    '> Found 147 nodes',
    '> Attempting breach...',
    '> ACCESS_DENIED',
    '> Retrying with exploit #42...',
    '> ACCESS_DENIED',
    '> Firewall detected',
    '',
    '⚠ NICE TRY! Our systems are secure.',
    '',
    'Achievement unlocked: HACKER',
    '',
  ],
  'sudo': (args) => {
    if (args.join(' ') === 'rm -rf /') {
      return [
        '',
        '⚠️  WARNING ⚠️',
        '',
        'This command would destroy everything.',
        'Fortunately, this is just a simulation.',
        '',
        'Please don\'t try this on a real system! 😅',
        '',
        'Achievement unlocked: DANGER_ZONE',
        '',
      ];
    }
    return ['sudo: command requires arguments'];
  },
  whoami: () => ['visitor@fractalix.lab'],
  pwd: () => ['/home/visitor/fractalix'],
  ls: () => [
    'projects/  services/  about.md  contact.md  secrets/',
  ],
  date: () => [new Date().toISOString()],
  uptime: () => ['System online for 365 days, 24 hours, 0 minutes'],
  neofetch: () => [
    '',
    '        ◈◈◈◈◈◈         visitor@fractalix.lab',
    '       ◈◈◈◈◈◈◈◈        ──────────────────────',
    '      ◈◈◈    ◈◈◈       OS: FractalixOS v3.0',
    '     ◈◈◈      ◈◈◈      Kernel: quantum-5.0',
    '    ◈◈◈        ◈◈◈     Uptime: 365 days',
    '   ◈◈◈   ◈◈◈   ◈◈◈     Shell: fsh 2.0',
    '  ◈◈◈   ◈◈◈◈◈   ◈◈◈    Resolution: ∞ x ∞',
    ' ◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈   Terminal: fracterm',
    '                        CPU: Neural Core @ ∞GHz',
    '                        Memory: Unlimited',
    '',
  ],
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onAchievement?: (achievement: string) => void;
}

export default function TerminalComponent({ isOpen, onClose, onAchievement }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'ascii', content: ASCII_LOGO },
    { type: 'output', content: 'Welcome to Fractalix Terminal v3.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();
    const [cmd, ...args] = trimmed.split(' ');
    
    setLines(prev => [...prev, { type: 'input', content: `> ${input}` }]);
    
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    
    if (cmd === 'matrix') {
      setIsMatrixMode(true);
      onAchievement?.('MATRIX_MASTER');
      setTimeout(() => setIsMatrixMode(false), 5000);
      return;
    }
    
    if (cmd === 'sudo' && args.length > 0) {
      const output = commands.sudo(args);
      setLines(prev => [...prev, ...output.map(o => ({ type: 'output' as const, content: o }))]);
      if (args.join(' ') === 'rm -rf /') {
        onAchievement?.('DANGER_ZONE');
      }
      return;
    }
    
    if (commands[cmd]) {
      const output = commands[cmd](args);
      setLines(prev => [...prev, ...output.map(o => ({ 
        type: cmd === 'secret' || cmd === 'hack' ? 'success' as const : 'output' as const, 
        content: o 
      }))]);
      
      if (cmd === 'secret') onAchievement?.('CURIOUS');
      if (cmd === 'hack') onAchievement?.('HACKER');
    } else if (cmd) {
      setLines(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${cmd}. Type "help" for available commands.` 
      }]);
    }
  }, [onAchievement]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput) {
      processCommand(currentInput);
      setCommandHistory(prev => [...prev, currentInput]);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-4 md:inset-8 lg:inset-16 z-[100] flex flex-col"
        >
          {/* Terminal window */}
          <div className="flex-1 bg-ink-deep/95 backdrop-blur-xl border border-stone-anthracite/50 flex flex-col overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-stone-anthracite/30 bg-ink-chrome/50">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-stone-graphite" />
                <span className="font-mono text-xs text-stone-graphite">fractalix-terminal</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-stone-anthracite/30 transition-colors"
              >
                <X size={14} className="text-stone-graphite" />
              </button>
            </div>
            
            {/* Terminal content */}
            <div 
              ref={containerRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Matrix effect overlay */}
              {isMatrixMode && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100 }}
                      animate={{ y: '100vh' }}
                      transition={{ 
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      className="absolute text-green-500/70 font-mono text-xs"
                      style={{ left: `${i * 2}%` }}
                    >
                      {Array.from({ length: 20 }).map((_, j) => (
                        <div key={j}>{MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}</div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              )}

              {lines.map((line, i) => (
                <div 
                  key={i} 
                  className={`whitespace-pre-wrap ${
                    line.type === 'input' ? 'text-engrave-line' :
                    line.type === 'error' ? 'text-red-400/80' :
                    line.type === 'success' ? 'text-green-400/80' :
                    line.type === 'ascii' ? 'text-engrave-dim text-[10px] leading-tight' :
                    'text-stone-graphite'
                  }`}
                >
                  {line.content}
                </div>
              ))}
              
              {/* Input line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-engrave-line">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-engrave-fresco caret-engrave-line"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="animate-pulse text-engrave-line">▌</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

