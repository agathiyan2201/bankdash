import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
import { sendMoney } from '../../services/api';
import { photoFor } from '../../assets/avatars';

export default function QuickTransfer({ contacts }) {
  const [selected, setSelected] = useState(contacts[0]?.id);
  const [amount, setAmount] = useState('525.50');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const scroller = useRef(null);

  const person = contacts.find((c) => c.id === selected);
  const valid = Number(amount) > 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) return setStatus('error');
    setStatus('sending');
    await sendMoney({ contactId: selected, amount: Number(amount) });
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <div className="panel flex h-full flex-col justify-between gap-6">
      <div className="flex items-center gap-3">
        <ul ref={scroller} className="no-scrollbar flex flex-1 gap-5 overflow-x-auto scroll-smooth">
          {contacts.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setSelected(c.id)}
                aria-pressed={selected === c.id}
                className="flex w-[80px] flex-col items-center gap-2 rounded-2xl py-1 text-center"
              >
                <motion.span animate={{ scale: selected === c.id ? 1.08 : 1 }}>
                  <Avatar name={c.name} src={photoFor(c.photo)} color={c.color} size="h-[60px] w-[60px] text-base" />
                </motion.span>
                <span className={`text-sm ${selected === c.id ? 'font-bold text-brand-ink' : 'text-brand-ink'}`}>{c.name}</span>
                <span className={`text-xs ${selected === c.id ? 'font-bold text-brand-muted' : 'text-brand-muted'}`}>{c.role}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scroller.current?.scrollBy({ left: 100 })}
          aria-label="More contacts"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-muted shadow-card hover:text-brand-blue"
        >
          <Icon name="chevronRight" className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={submit} className="flex items-center gap-4">
        <label htmlFor="qt-amount" className="shrink-0 text-sm text-brand-muted">Write Amount</label>
        <div className="flex flex-1 overflow-hidden rounded-full bg-brand-bg">
          <input
            id="qt-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); setStatus('idle'); }}
            className="w-full min-w-0 bg-transparent px-5 text-sm text-brand-muted focus:outline-none"
          />
          <button type="submit" disabled={status === 'sending'} className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/20 disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send'}
            <Icon name="send" className="h-4 w-4" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {status === 'sent' && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm font-medium text-brand-green">
            Sent ${Number(amount).toLocaleString()} to {person?.name}.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-brand-red">
            Enter an amount greater than 0.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
