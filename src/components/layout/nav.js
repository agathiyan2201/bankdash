export const navItems = [
  { to: '/', label: 'Dashboard', icon: 'home' },
  { to: '/transactions', label: 'Transactions', icon: 'transfer' },
  { to: '/accounts', label: 'Accounts', icon: 'user' },
  { to: '/investments', label: 'Investments', icon: 'chart' },
  { to: '/credit-cards', label: 'Credit Cards', icon: 'card' },
  { to: '/loans', label: 'Loans', icon: 'loan' },
  { to: '/services', label: 'Services', icon: 'service' },
  { to: '/privileges', label: 'My Privileges', icon: 'privilege' },
  { to: '/settings', label: 'Setting', icon: 'settings' },
];

export const titleFor = (pathname) =>
  pathname === '/' ? 'Overview' : navItems.find((n) => n.to === pathname)?.label ?? 'Overview';
