import { Link } from 'react-router-dom';

export default function Placeholder({ title }) {
  return (
    <div className="panel flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-xl font-semibold text-brand-navy">{title}</h2>
      <p className="max-w-sm text-sm text-brand-muted">
        This page isn't built yet. Add its sections in <code>src/pages</code> using the shared components.
      </p>
      <Link to="/" className="btn-primary mt-2">Back to dashboard</Link>
    </div>
  );
}
