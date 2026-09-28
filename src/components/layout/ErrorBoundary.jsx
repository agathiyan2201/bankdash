import { Component } from 'react';

// Shows the error on screen instead of a blank page if a page crashes while rendering.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Page crashed:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="panel space-y-3">
        <h2 className="text-lg font-semibold text-brand-navy">This page couldn't load</h2>
        <p className="font-mono text-sm text-brand-red">{String(this.state.error.message || this.state.error)}</p>
        <button onClick={() => this.setState({ error: null })} className="btn-primary">Try again</button>
      </div>
    );
  }
}
