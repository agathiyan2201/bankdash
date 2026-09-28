import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { navItems } from './nav';

function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-8 py-7">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy text-white">
        <Icon name="card" className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="text-2xl font-extrabold text-brand-navy">BankDash.</span>
    </div>
  );
}

function NavList({ onNavigate }) {
  return (
    <nav aria-label="Main">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `relative flex items-center gap-6 px-10 py-3.5 text-[17px] font-medium transition-colors ${
                  isActive ? 'text-brand-blue' : 'text-brand-soft hover:text-brand-navy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-0 top-0 h-full w-1.5 rounded-r-lg bg-brand-blue"
                    />
                  )}
                  <Icon name={item.icon} className="h-6 w-6" />
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-0 z-30 hidden h-viewport w-[250px] shrink-0 overflow-y-auto border-r border-brand-border bg-white lg:block">
        <Logo />
        <NavList />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-brand-navy/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[260px] overflow-y-auto bg-white shadow-xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between pr-4">
                <Logo />
                <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 text-brand-muted hover:bg-brand-bg">
                  <Icon name="close" />
                </button>
              </div>
              <NavList onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
