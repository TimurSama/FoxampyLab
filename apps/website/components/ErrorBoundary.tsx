"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Отправка ошибки в сервис мониторинга
    if (typeof window !== 'undefined') {
      // Try to use Sentry if available
      if ((window as any).Sentry) {
        (window as any).Sentry.captureException(error, { contexts: { react: errorInfo } });
      } else {
        // Fallback: log to console and potentially send to analytics
        console.error('ErrorBoundary caught an error:', error, errorInfo);
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-ink-deep flex items-center justify-center p-4">
          <div className="max-w-2xl w-full border border-stone-anthracite/30 bg-ink-chrome/20 p-8">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle size={32} className="text-stone-slate" />
              <h1 className="font-mono text-2xl text-engrave-fresco">
                ОШИБКА ПРИЛОЖЕНИЯ
              </h1>
            </div>

            <p className="font-mono text-sm text-stone-slate mb-6 leading-relaxed">
              Произошла непредвиденная ошибка. Мы уже работаем над её устранением.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-ink-deep border border-stone-anthracite/50">
                <p className="font-mono text-xs text-stone-slate mb-2">
                  Детали ошибки (только в режиме разработки):
                </p>
                <pre className="font-mono text-[10px] text-engrave-dim overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-engrave-fresco text-ink-deep 
                         font-mono text-sm tracking-widest hover:opacity-90 transition-opacity"
              >
                <RefreshCw size={16} />
                ПЕРЕЗАГРУЗИТЬ
              </button>
              
              <Link href="/">
                <button
                  className="flex items-center gap-2 px-6 py-3 border border-stone-anthracite/50 
                           text-engrave-fresco font-mono text-sm tracking-widest
                           hover:border-engrave-line/30 transition-colors"
                >
                  <Home size={16} />
                  НА ГЛАВНУЮ
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

