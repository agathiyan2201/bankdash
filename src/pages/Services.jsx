import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getServices } from '../services/api';
import Section from '../components/ui/Section';
import Icon from '../components/ui/Icon';
import { ErrorState, Skeleton } from '../components/ui/States';

const details = [
  ['Lorem Ipsum', 'Many publishing'],
  ['Lorem Ipsum', 'Many publishing'],
  ['Lorem Ipsum', 'Many publishing'],
];

export default function Services() {
  const { data, loading, error, reload } = useFetch(getServices);
  const [open, setOpen] = useState(null);

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-7">
      <div className="no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-3 md:px-0">
        {data.highlights.map((h) => (
          <div key={h.title} className="panel flex min-w-[240px] items-center gap-4">
            <span className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: h.bg, color: h.fg }}>
              <Icon name={h.icon} className="h-7 w-7" strokeWidth={2} />
            </span>
            <div>
              <p className="text-lg font-semibold text-brand-ink">{h.title}</p>
              <p className="text-sm text-brand-muted">{h.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Section title="Bank Services List">
        <ul className="space-y-4">
          {data.list.map((s) => {
            const isOpen = open === s.id;
            return (
              <li key={s.id} className="panel !py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[auto_1.4fr_1fr_1fr_1fr_auto]">
                  <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[20px]" style={{ backgroundColor: s.bg, color: s.fg }}>
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-medium text-brand-ink">{s.title}</p>
                    <p className="text-sm text-brand-muted">It is a long established</p>
                  </div>
                  {details.map(([a, b], i) => (
                    <div key={i} className="hidden lg:block">
                      <p className="font-medium text-brand-ink">{a}</p>
                      <p className="text-sm text-brand-muted">{b}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition md:px-7 ${
                      isOpen ? 'border-brand-blue text-brand-blue' : 'border-brand-muted text-brand-muted hover:border-brand-blue hover:text-brand-blue'
                    }`}
                  >
                    {isOpen ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 border-t border-brand-border pt-4 text-sm leading-relaxed text-brand-muted">
                        {s.title} — eligibility, fees and terms will appear here once connected to the services API.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
