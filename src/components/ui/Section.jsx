import { Link } from 'react-router-dom';

export default function Section({ title, action, to, children, className = '' }) {
  return (
    <section className={`flex min-w-0 flex-col ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-title">{title}</h2>
        {action && to && (
          <Link to={to} className="text-sm font-semibold text-brand-navy hover:text-brand-blue md:text-base">
            {action}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
