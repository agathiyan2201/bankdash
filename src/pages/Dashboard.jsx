import useFetch from '../hooks/useFetch';
import { getCards, getContacts, getDashboard, getTransactions } from '../services/api';
import Section from '../components/ui/Section';
import CreditCard from '../components/ui/CreditCard';
import { ErrorState, Skeleton } from '../components/ui/States';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';
import ExpenseStatistics from '../components/dashboard/ExpenseStatistics';
import QuickTransfer from '../components/dashboard/QuickTransfer';
import BalanceHistory from '../components/dashboard/BalanceHistory';

const loadAll = () =>
  Promise.all([getDashboard(), getCards(), getTransactions(), getContacts()]).then(
    ([dash, cards, tx, contacts]) => ({ dash, cards, tx, contacts })
  );

export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(loadAll);

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading || !data) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  const { dash, cards, tx, contacts } = data;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
      <Section title="My Cards" action="See All" to="/credit-cards" className="lg:col-span-8">
        <div className="no-scrollbar -mx-6 flex snap-x gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
          {cards.slice(0, 2).map((c) => (
            <CreditCard key={c.id} card={c} className="snap-start" />
          ))}
        </div>
      </Section>

      <Section title="Recent Transaction" className="lg:col-span-4">
        <RecentTransactions items={tx.slice(5, 8)} />
      </Section>

      <Section title="Weekly Activity" className="lg:col-span-8">
        <WeeklyActivity data={dash.weekly} />
      </Section>

      <Section title="Expense Statistics" className="lg:col-span-4">
        <ExpenseStatistics data={dash.expenses} />
      </Section>

      <Section title="Quick Transfer" className="lg:col-span-5">
        <QuickTransfer contacts={contacts} />
      </Section>

      <Section title="Balance History" className="lg:col-span-7">
        <BalanceHistory data={dash.balance} />
      </Section>
    </div>
  );
}
