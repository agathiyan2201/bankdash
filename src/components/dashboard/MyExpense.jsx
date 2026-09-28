import { useState } from 'react';
import { motion } from 'framer-motion';
import { money } from '../../utils';

// Single-series bars; the selected month is highlighted and labelled (click/tap to change).
export default function MyExpense({ data }) {
  const [active, setActive] = useState(data.reduce((m, d, i) => (d.value > data[m].value ? i : m), 0));
  const max = Math.max(...data.map((d) => d.value)) * 1.15;

  return (
    <div className="panel flex h-full flex-col">
      <div className="flex flex-1 items-end gap-3 md:gap-4" style={{ minHeight: 150 }}>
        {data.map((d, i) => (
          <button
            key={d.month}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`${d.month}: ${money(d.value)}`}
            className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            {active === i && (
              <motion.span layoutId="expense-label" className="text-xs font-medium text-brand-ink">
                {money(d.value)}
              </motion.span>
            )}
            <motion.span
              className={`w-full rounded-[10px] ${active === i ? 'bg-[#16DBCC]' : 'bg-[#EDF0F7] group-hover:bg-[#DDE3EF]'}`}
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-3 md:gap-4">
        {data.map((d) => (
          <span key={d.month} className="flex-1 text-center text-xs text-brand-muted">{d.month}</span>
        ))}
      </div>
    </div>
  );
}
