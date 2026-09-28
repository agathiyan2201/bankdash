import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getCardStats, getCards } from '../services/api';
import Section from '../components/ui/Section';
import CreditCard from '../components/ui/CreditCard';
import Icon from '../components/ui/Icon';
import CardExpenseStats from '../components/dashboard/CardExpenseStats';
import { ErrorState, Skeleton } from '../components/ui/States';

const load = () => Promise.all([getCards(), getCardStats()]).then(([cards, stats]) => ({ cards, stats }));
const empty = { type: 'Classic', holder: '', number: '', expiry: '2025-01-25' };
const listColors = [
  { bg: '#E7EDFF', fg: '#396AFF' },
  { bg: '#FFE0EB', fg: '#FF82AC' },
  { bg: '#FFF5D9', fg: '#FFBB38' },
];
const settings = [
  { title: 'Block Card', sub: 'Instantly block your card', icon: 'block', bg: '#FFF5D9', fg: '#FFBB38' },
  { title: 'Change Pin Code', sub: 'Choose another pin code', icon: 'lock', bg: '#E7EDFF', fg: '#396AFF' },
  { title: 'Add to Google Pay', sub: 'Withdraw without any card', icon: 'card', bg: '#FFE0EB', fg: '#FF82AC' },
  { title: 'Add to Apple Pay', sub: 'Withdraw without any card', icon: 'card', bg: '#DCFAF8', fg: '#16DBCC' },
  { title: 'Add to Apple Store', sub: 'Withdraw without any card', icon: 'bag', bg: '#DCFAF8', fg: '#16DBCC' },
];
const displayOrder = { sky: 0, primary: 1, light: 2 };

export default function CreditCards() {
  const { data, setData, loading, error, reload } = useFetch(load);
  const [form, setForm] = useState(empty);
  const [formError, setFormError] = useState('');
  const [added, setAdded] = useState(false);
  const [openCard, setOpenCard] = useState(null);
  const [notice, setNotice] = useState('');

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    setForm({ ...form, [name]: value });
    setFormError('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.holder.trim()) return setFormError('Enter the name on the card.');
    if (form.number.replace(/\s/g, '').length !== 16) return setFormError('Card number must be 16 digits.');
    if (!form.expiry) return setFormError('Choose an expiration date.');
    const digits = form.number.replace(/\s/g, '');
    const [yy, mm] = [form.expiry.slice(2, 4), form.expiry.slice(5, 7)];
    const card = {
      id: Date.now(), balance: 0, holder: form.holder, valid: `${mm}/${yy}`,
      number: `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`,
      variant: ['sky', 'primary', 'light'][data.cards.length % 3],
      bank: 'New Card', type: form.type, nameOnCard: form.holder, last4: digits.slice(-4),
    };
    setData({ ...data, cards: [...data.cards, card] });
    setForm(empty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const flash = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 2200); };

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-96" />;

  const cards = [...data.cards].sort((a, b) => (displayOrder[a.variant] ?? 9) - (displayOrder[b.variant] ?? 9) || a.id - b.id);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
      <Section title="My Cards" className="lg:col-span-12">
        <motion.div layout className="no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">
          <AnimatePresence>
            {cards.map((c) => (
              <motion.div key={c.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <CreditCard card={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section title="Card Expense Statistics" className="lg:col-span-4">
        <CardExpenseStats data={data.stats} />
      </Section>

      <Section title="Card List" className="lg:col-span-8">
        <ul className="space-y-4">
          {data.cards.map((c, i) => {
            const col = listColors[i % listColors.length];
            const isOpen = openCard === c.id;
            return (
              <li key={c.id} className="panel !py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto]">
                  <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[20px]" style={{ backgroundColor: col.bg, color: col.fg }}>
                    <Icon name="card" className="h-6 w-6" />
                  </span>
                  <div><p className="font-medium text-brand-ink">Card Type</p><p className="text-sm text-brand-muted">{c.type}</p></div>
                  <div className="hidden md:block"><p className="font-medium text-brand-ink">Bank</p><p className="text-sm text-brand-muted">{c.bank}</p></div>
                  <div className="hidden md:block"><p className="font-medium text-brand-ink">Card Number</p><p className="text-sm text-brand-muted">**** **** {c.last4}</p></div>
                  <div className="hidden md:block"><p className="font-medium text-brand-ink">Namain Card</p><p className="text-sm text-brand-muted">{c.nameOnCard}</p></div>
                  <button onClick={() => setOpenCard(isOpen ? null : c.id)} aria-expanded={isOpen} className="text-sm font-medium text-brand-blue hover:underline">
                    {isOpen ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dl initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-2 gap-3 overflow-hidden text-sm md:grid-cols-4">
                      {[['Bank', c.bank], ['Card Number', `**** **** ${c.last4}`], ['Card Holder', c.holder], ['Valid Thru', c.valid]].map(([k, v]) => (
                        <div key={k} className="mt-4 border-t border-brand-border pt-3">
                          <dt className="text-brand-muted">{k}</dt><dd className="font-medium text-brand-ink">{v}</dd>
                        </div>
                      ))}
                    </motion.dl>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Add New Card" className="lg:col-span-8">
        <form onSubmit={submit} className="panel space-y-5" noValidate>
          <p className="max-w-2xl text-sm leading-relaxed text-brand-muted md:text-base">
            Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder,
            with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-brand-ink md:text-base">
              Card Type
              <select name="type" value={form.type} onChange={onChange} className="input mt-2">
                <option>Classic</option><option>Primary</option><option>Secondary</option>
              </select>
            </label>
            <label className="block text-sm text-brand-ink md:text-base">
              Name On Card
              <input name="holder" value={form.holder} onChange={onChange} placeholder="My Cards" className="input mt-2" />
            </label>
            <label className="block text-sm text-brand-ink md:text-base">
              Card Number
              <input name="number" inputMode="numeric" value={form.number} onChange={onChange} placeholder="**** **** **** ****" className="input mt-2" />
            </label>
            <label className="block text-sm text-brand-ink md:text-base">
              Expiration Date
              <input type="date" name="expiry" value={form.expiry} onChange={onChange} className="input mt-2" />
            </label>
          </div>
          {formError && <p className="text-sm text-brand-red">{formError}</p>}
          <AnimatePresence>
            {added && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-brand-green">
                <Icon name="check" className="h-4 w-4" /> Card added.
              </motion.p>
            )}
          </AnimatePresence>
          <button type="submit" className="btn-primary w-full md:w-auto">Add Card</button>
        </form>
      </Section>

      <Section title="Card Setting" className="lg:col-span-4">
        <ul className="panel flex h-full flex-col justify-between gap-4">
          {settings.map((s) => (
            <li key={s.title}>
              <button onClick={() => flash(`${s.title} — coming soon.`)} className="flex w-full items-center gap-4 rounded-2xl text-left">
                <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[20px]" style={{ backgroundColor: s.bg, color: s.fg }}>
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-medium text-brand-ink">{s.title}</span>
                  <span className="block text-sm text-brand-muted">{s.sub}</span>
                </span>
              </button>
            </li>
          ))}
          <AnimatePresence>
            {notice && (
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-brand-muted">{notice}</motion.li>
            )}
          </AnimatePresence>
        </ul>
      </Section>
    </div>
  );
}
