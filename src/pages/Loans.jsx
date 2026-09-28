import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getLoans } from '../services/api';
import Section from '../components/ui/Section';
import StatTile from '../components/ui/StatTile';
import { ErrorState, Skeleton } from '../components/ui/States';
import { money } from '../utils';

export default function Loans() {
  const { data, loading, error, reload } = useFetch(getLoans);
  const [repaid, setRepaid] = useState([]);
  const [confirm, setConfirm] = useState(null);

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  const rows = data.active;
  const total = (key) => rows.reduce((s, r) => s + r[key], 0);

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {data.summary.map((s) => <StatTile key={s.label} {...s} />)}
      </div>

      <Section title="Active Loans Overview">
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[15px]">
            <thead className="text-brand-muted">
              <tr className="border-b border-[#E6EFF5]">
                {['SL No', 'Loan Money', 'Left to repay', 'Duration', 'Interest rate', 'Installment', 'Repay'].map((h) => (
                  <th key={h} className="pb-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const done = repaid.includes(r.id);
                return (
                  <tr key={r.id} className="border-b border-[#F2F4F7]">
                    <td className="py-3.5">{String(i + 1).padStart(2, '0')}.</td>
                    <td>{money(r.money)}</td>
                    <td>{done ? money(0) : money(r.left)}</td>
                    <td>{r.duration}</td>
                    <td>{r.rate}%</td>
                    <td>{money(r.installment)} / month</td>
                    <td>
                      <button
                        disabled={done}
                        onClick={() => setConfirm(r)}
                        className={`rounded-full border px-6 py-1.5 text-sm transition ${
                          done ? 'border-brand-green text-brand-green' : 'border-brand-ink text-brand-ink hover:border-brand-blue hover:text-brand-blue'
                        }`}
                      >
                        {done ? 'Repaid' : 'Repay'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr className="font-medium text-brand-red">
                <td className="pt-4">Total</td>
                <td className="pt-4">{money(total('money'))}</td>
                <td className="pt-4">{money(rows.filter((r) => !repaid.includes(r.id)).reduce((s, r) => s + r.left, 0))}</td>
                <td /><td />
                <td className="pt-4">{money(total('installment'))} / month</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <AnimatePresence>
        {confirm && (
          <motion.div
            className="fixed left-0 top-0 z-50 flex h-viewport w-viewport items-center justify-center bg-brand-navy/40 p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setConfirm(null)}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-labelledby="repay-title"
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="panel w-full max-w-sm space-y-4"
            >
              <h3 id="repay-title" className="text-lg font-semibold text-brand-navy">Repay this loan?</h3>
              <p className="text-sm text-brand-muted">
                {money(confirm.left)} will be paid from your main balance and the loan will be closed.
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirm(null)} className="rounded-[15px] px-5 py-3 text-sm text-brand-muted hover:text-brand-navy">Cancel</button>
                <button onClick={() => { setRepaid([...repaid, confirm.id]); setConfirm(null); }} className="btn-primary">Repay loan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
