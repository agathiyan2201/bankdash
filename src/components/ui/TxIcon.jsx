import Icon from './Icon';

const styles = {
  card: { bg: 'bg-[#FFF5D9]', fg: 'text-[#FFBB38]', icon: 'card' },
  paypal: { bg: 'bg-[#E7EDFF]', fg: 'text-[#396AFF]', icon: 'paypal' },
  deposit: { bg: 'bg-[#DCFAF8]', fg: 'text-[#16DBCC]', icon: 'arrowDown' },
  transfer: { bg: 'bg-[#FFE0EB]', fg: 'text-[#FF82AC]', icon: 'transfer' },
  service: { bg: 'bg-[#E7EDFF]', fg: 'text-[#396AFF]', icon: 'service' },
};

export default function TxIcon({ category, size = 'h-12 w-12' }) {
  const s = styles[category] || styles.card;
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full ${size} ${s.bg} ${s.fg}`}>
      <Icon name={s.icon} className="h-5 w-5" />
    </span>
  );
}
