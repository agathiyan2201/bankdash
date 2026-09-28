import { initials } from '../../utils';

// Shows a photo when `src` is given, otherwise coloured initials.
export default function Avatar({ name, src, color = '#E7EDFF', size = 'h-12 w-12 text-sm' }) {
  if (src) {
    return <img src={src} alt={name} className={`shrink-0 rounded-full object-cover ${size}`} />;
  }
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-brand-navy ${size}`}
      style={{ backgroundColor: color }}
    >
      {initials(name)}
    </span>
  );
}
