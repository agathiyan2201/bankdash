import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getCards, getExpense, getTransactions } from '../services/api';
import MyExpense from '../components/dashboard/MyExpense';
import Section from '../components/ui/Section';
import CreditCard from '../components/ui/CreditCard';
import Icon from '../components/ui/Icon';
import TxIcon from '../components/ui/TxIcon';
import { ErrorState, Skeleton } from '../components/ui/States';
import { dateTime, money } from '../utils';

const load = () =>
  Promise.all([getTransactions(), getCards(), getExpense()]).then(([tx, cards, expense]) => ({ tx, cards, expense }));
const tabs = [
  { id: 'all', label: 'All Transactions' },
  { id: 'income', label: 'Income' },
  { id: 'expense', label: 'Expense' },
];
const PAGE = 5;

export default function Transactions() {
  const { data, loading, error, reload } = useFetch(load);
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const list = data?.tx ?? [];
    if (tab === 'income') return list.filter((t) => t.amount > 0);
    if (tab === 'expense') return list.filter((t) => t.amount < 0);
    return list;
  }, [data, tab]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const visible = rows.slice((page - 1) * PAGE, page * PAGE);

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
        <Section title="My Cards" action="+ Add Card" to="/credit-cards" className="lg:col-span-8">
          <div className="no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:px-0">
            {data.cards.slice(0, 2).map((c) => <CreditCard key={c.id} card={c} />)}
          </div>
        </Section>
        <Section title="My Expense" className="lg:col-span-4">
          <MyExpense data={data.expense} />
        </Section>
      </div>

      <Section title="Recent Transactions">
        <div role="tablist" className="mb-5 flex gap-6 border-b border-brand-border md:gap-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => { setTab(t.id); setPage(1); }}
              className={`relative pb-2.5 text-sm font-medium md:text-base ${tab === t.id ? 'text-brand-blue' : 'text-brand-muted hover:text-brand-navy'}`}
            >
              {t.label}
              {tab === t.id && <motion.span layoutId="tx-tab" className="absolute inset-x-0 -bottom-px h-[3px] rounded-t bg-brand-blue" />}
            </button>
          ))}
        </div>

        <div className="panel">
          {/* Desktop table */}
          <table className="hidden w-full text-left text-[15px] md:table">
            <thead className="text-brand-muted">
              <tr className="border-b border-[#E6EFF5]">
                {['Description', 'Transaction ID', 'Type', 'Card', 'Date', 'Amount', 'Receipt'].map((h) => (
                  <th key={h} className="pb-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => (
                <tr key={t.id} className="border-b border-[#F2F4F7] last:border-0">
                  <td className="py-3.5">
                    <span className="flex items-center gap-3 text-brand-ink">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-muted text-brand-muted`}>
                        <Icon name={t.amount < 0 ? 'arrowUp' : 'arrowDown'} className="h-4 w-4" />
                      </span>
                      {t.description}
                    </span>
                  </td>
                  <td className="text-brand-ink">{t.id}</td>
                  <td className="text-brand-ink">{t.type}</td>
                  <td className="text-brand-ink">{t.card}</td>
                  <td className="text-brand-ink">{dateTime(t.date)}</td>
                  <td className={t.amount < 0 ? 'text-brand-red' : 'text-brand-green'}>{money(t.amount, { sign: true })}</td>
                  <td>
                    <button className="rounded-full border border-brand-navy px-4 py-1.5 text-sm text-brand-navy transition hover:border-brand-blue hover:text-brand-blue">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile list */}
          <ul className="space-y-4 md:hidden">
            {visible.map((t) => (
              <li key={t.id} className="flex items-center gap-3">
                <TxIcon category={t.category} size="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-brand-muted">{dateTime(t.date)}</p>
                </div>
                <span className={`text-sm font-medium ${t.amount < 0 ? 'text-brand-red' : 'text-brand-green'}`}>{money(t.amount, { sign: true })}</span>
              </li>
            ))}
          </ul>

          {rows.length === 0 && <p className="py-8 text-center text-sm text-brand-muted">No transactions in this view yet.</p>}
        </div>

        <nav aria-label="Pagination" className="mt-5 flex items-center justify-end gap-2 text-sm">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="flex items-center gap-1 px-2 text-brand-blue disabled:text-brand-muted">
            <Icon name="chevronLeft" className="h-4 w-4" /> Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-current={page === n ? 'page' : undefined}
              className={`h-9 w-9 rounded-[10px] ${page === n ? 'bg-brand-blue text-white' : 'text-brand-blue hover:bg-white'}`}
            >
              {n}
            </button>
          ))}
          <button disabled={page === pages} onClick={() => setPage(page + 1)} className="flex items-center gap-1 px-2 text-brand-blue disabled:text-brand-muted">
            Next <Icon name="chevronRight" className="h-4 w-4" />
          </button>
        </nav>
      </Section>
    </div>
  );
}
