import useFetch from '../hooks/useFetch';
import { getAccounts, getCards, getDashboard } from '../services/api';
import Section from '../components/ui/Section';
import CreditCard from '../components/ui/CreditCard';
import Icon from '../components/ui/Icon';
import StatTile from '../components/ui/StatTile';
import TxIcon from '../components/ui/TxIcon';
import BarChart, { Legend } from '../components/charts/BarChart';
import { ErrorState, Skeleton } from '../components/ui/States';
import { money, shortDate } from '../utils';

const load = () =>
  Promise.all([getDashboard(), getCards(), getAccounts()]).then(([dash, cards, acc]) => ({ dash, cards, acc }));

const tiles = [
  { key: 'balance', label: 'My Balance', icon: 'coin', bg: '#FFF5D9', fg: '#FFBB38' },
  { key: 'income', label: 'Income', icon: 'arrowDown', bg: '#E7EDFF', fg: '#396AFF' },
  { key: 'expense', label: 'Expense', icon: 'arrowUp', bg: '#FFE0EB', fg: '#FF82AC' },
  { key: 'saving', label: 'Total Saving', icon: 'piggy', bg: '#DCFAF8', fg: '#16DBCC' },
];

export default function Accounts() {
  const { data, loading, error, reload } = useFetch(load);
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  const { dash, cards, acc } = data;
  const ov = acc.overview;
  const series = [
    { name: 'Debit', color: '#1A16F3', values: ov.debit },
    { name: 'Credit', color: '#FCAA0B', values: ov.credit },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-12 lg:grid-cols-4">
        {tiles.map((t) => <StatTile key={t.key} {...t} value={money(dash.summary[t.key])} />)}
      </div>

      <Section title="Last Transaction" className="lg:col-span-8">
        <ul className="panel space-y-4">
          {acc.last.map((t) => (
            <li key={t.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[auto_2fr_1fr_1fr_1fr_auto]">
              <TxIcon category={t.category} size="h-12 w-12 md:h-[55px] md:w-[55px]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium md:text-base">{t.description}</p>
                <p className="text-xs text-brand-muted md:text-[15px]">{shortDate(t.date)}</p>
              </div>
              <span className="hidden text-[15px] text-brand-muted md:block">{t.type}</span>
              <span className="hidden text-[15px] text-brand-muted md:block">{t.card}</span>
              <span className="hidden text-[15px] text-brand-muted md:block">{t.status}</span>
              <span className={`text-right text-sm font-medium md:text-base ${t.amount < 0 ? 'text-brand-red' : 'text-brand-green'}`}>
                {money(t.amount, { sign: true })}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="My Card" action="See All" to="/credit-cards" className="lg:col-span-4">
        <CreditCard card={cards.find((c) => c.variant === 'sky') || cards[0]} />
      </Section>

      <Section title="Debit & Credit Overview" className="lg:col-span-8">
        <div className="panel space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-brand-muted md:text-base">
              <span className="font-semibold text-brand-ink">{money(ov.debited)}</span> Debited &{' '}
              <span className="font-semibold text-brand-ink">{money(ov.credited)}</span> Credited in this Week
            </p>
            <Legend items={series} />
          </div>
          <BarChart labels={ov.days} series={series} max={3400} ticks={[]} showYAxis={false} barWidth={30} gap={10} rounded="top" format={money} />
        </div>
      </Section>

      <Section title="Invoices Sent" className="lg:col-span-4">
        <ul className="panel flex h-full flex-col justify-between gap-5">
          {acc.invoices.map((inv) => (
            <li key={inv.id} className="flex items-center gap-4">
              <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[20px]" style={{ backgroundColor: inv.bg, color: inv.fg }}>
                <Icon name={inv.icon} className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <p className="font-medium text-brand-ink">{inv.name}</p>
                <p className="text-sm text-brand-muted">{inv.ago}</p>
              </div>
              <span className="font-medium text-brand-muted">{money(inv.amount)}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
