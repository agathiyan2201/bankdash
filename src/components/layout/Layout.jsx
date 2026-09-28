import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ErrorBoundary from './ErrorBoundary';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top and close the mobile menu whenever the page changes.
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-viewport bg-brand-bg">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-[1440px] px-6 py-6 md:px-10 md:py-8">
          {/* Entrance-only transition: the new page mounts immediately, so navigation never waits on an exit animation. */}
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ErrorBoundary key={pathname}>
              <Outlet />
            </ErrorBoundary>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
