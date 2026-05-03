'use client';
import { Component, ReactNode, ErrorInfo } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('CivicIQ ErrorBoundary:', error, info.componentStack);
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
          <p className="text-2xl mb-2">⚠️</p>
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-500 mb-4">{this.state.error?.message ?? 'Unexpected error'}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
