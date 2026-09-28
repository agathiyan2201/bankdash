import { Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import CreditCards from './pages/CreditCards';
import Settings from './pages/Settings';
import Placeholder from './pages/Placeholder';
import Investments from './pages/Investments';
import Loans from './pages/Loans';
import Services from './pages/Services';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="investments" element={<Investments />} />
          <Route path="credit-cards" element={<CreditCards />} />
          <Route path="loans" element={<Loans />} />
          <Route path="services" element={<Services />} />
          <Route path="privileges" element={<Placeholder title="My Privileges" />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
