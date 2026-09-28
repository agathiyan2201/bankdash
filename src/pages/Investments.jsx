import useFetch from '../hooks/useFetch';
import { getInvestments } from '../services/api';
import Section from '../components/ui/Section';
import StatTile from '../components/ui/StatTile';
import LineChart from '../components/charts/LineChart';
import { ErrorState, Skeleton } from '../components/ui/States';
import { money } from '../utils';

const k = (v) => `$${v.toLocaleString('en-US')}`;
const pct = (v) => `${v > 0 ? '+' : ''}${v}%`;

export default function Investments() {
  const { data, loading, error, reload } = useFetch(getInvestments);
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  const ticks = [0, 10000, 20000, 30000, 40000];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
      <div className="grid gap-4 md:grid-cols-3 md:gap-6 lg:col-span-12">
        <StatTile icon="coin" label="Total Invested Amount" value={money(data.summary.invested)} bg="#DCFAF8" fg="#16DBCC" />
        <StatTile icon="pie" label="Number of Investments" value={data.summary.count.toLocaleString()} bg="#FFE0EB" fg="#FF82AC" />
        <StatTile icon="refresh" label="Rate of Return" value={pct(data.summary.returnRate) + ''} bg="#E7EDFF" fg="#396AFF" />
      </div>

      <Section title="Yearly Total Investment" className="lg:col-span-6">
        <div className="panel">
          <LineChart data={data.yearly} max={40000} ticks={ticks} color="#FCAA0B" smooth={false} dots format={k} />
        </div>
      </Section>

      <Section title="Monthly Revenue" className="lg:col-span-6">
        <div className="panel">
          <LineChart data={data.monthly} max={40000} ticks={ticks} color="#16DBCC" format={k} />
        </div>
      </Section>

      <Section title="My Investment" className="lg:col-span-7">
        <ul className="space-y-4">
          {data.mine.map((inv) => (
            <li key={inv.id} className="panel grid grid-cols-[auto_1fr_auto] items-center gap-4 !py-4 md:grid-cols-[auto_2fr_1fr_1fr]">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] text-xl font-bold" style={{ backgroundColor: inv.bg, color: inv.fg }}>
                {inv.name[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-brand-ink">{inv.name}</p>
                <p className="truncate text-sm text-brand-muted">{inv.category}</p>
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-brand-ink">{money(inv.value)}</p>
                <p className="text-sm text-brand-muted">Investment Value</p>
              </div>
              <div className="text-right md:text-left">
                <p className={`font-medium ${inv.return < 0 ? 'text-brand-red' : 'text-brand-green'}`}>{pct(inv.return)}</p>
                <p className="text-sm text-brand-muted">Return Value</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Trending Stock" className="lg:col-span-5">
        <div className="panel overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="text-brand-muted">
              <tr className="border-b border-[#E6EFF5]">
                {['SL No', 'Name', 'Price', 'Return'].map((h) => <th key={h} className="pb-3 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.trending.map((s, i) => (
                <tr key={s.name}>
                  <td className="py-3 text-brand-ink">{String(i + 1).padStart(2, '0')}.</td>
                  <td className="py-3 text-brand-ink">{s.name}</td>
                  <td className="py-3 text-brand-ink">{money(s.price)}</td>
                  <td className={`py-3 ${s.return < 0 ? 'text-brand-red' : 'text-brand-green'}`}>{pct(s.return)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
