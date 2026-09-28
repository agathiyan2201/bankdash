import Icon from './Icon';

// Round coloured icon + small label + bold value (used on Accounts, Investments, Loans).
export default function StatTile({ icon, label, value, bg, fg, valueClass = '' }) {
  return (
    <div className="panel flex items-center gap-4 !py-5">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-[70px] md:w-[70px]"
        style={{ backgroundColor: bg, color: fg }}
      >
        <Icon name={icon} className="h-5 w-5 md:h-7 md:w-7" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-brand-muted md:text-base">{label}</p>
        <p className={`truncate text-base font-semibold text-brand-ink md:text-xl ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
