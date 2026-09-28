import TxIcon from '../ui/TxIcon';
import { money, shortDate } from '../../utils';

export default function RecentTransactions({ items }) {
  return (
    <ul className="panel flex h-full flex-col justify-between gap-3">
      {items.map((t) => (
        <li key={t.id} className="flex items-center gap-4">
          <TxIcon category={t.category} size="h-12 w-12 md:h-[55px] md:w-[55px]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-brand-ink md:text-base">{t.description}</p>
            <p className="text-xs text-brand-muted md:text-[15px]">{shortDate(t.date)}</p>
          </div>
          <span className={`text-sm font-medium md:text-base ${t.amount < 0 ? 'text-brand-red' : 'text-brand-green'}`}>
            {money(t.amount, { sign: true })}
          </span>
        </li>
      ))}
    </ul>
  );
}
