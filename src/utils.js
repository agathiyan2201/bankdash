export const money = (n, { sign = false } = {}) => {
  const abs = Math.abs(n).toLocaleString('en-US');
  if (!sign) return `$${abs}`;
  return `${n < 0 ? '-' : '+'}$${abs}`;
};

export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export const dateTime = (iso) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

export const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
