import { useState } from 'react';
import { motion } from 'framer-motion';

const C = 110, BASE = 78, HOLE = 34;
const pt = (a, r) => `${C + r * Math.cos(a)},${C + r * Math.sin(a)}`;

function ring(start, end, r) {
  return `M${pt(start, HOLE)} L${pt(start, r)} A${r},${r} 0 0 1 ${pt(end, r)} L${pt(end, HOLE)} A${HOLE},${HOLE} 0 0 0 ${pt(start, HOLE)} Z`;
}

// Quartered donut whose segments have different outer radii (as in the design).
export default function CardExpenseStats({ data }) {
  const [active, setActive] = useState(null);
  const step = (Math.PI * 2) / data.length;
  const order = [3, 0, 1, 2]; // draw DBL top-left, ABM top-right, BRC bottom-right, MCP bottom-left

  return (
    <div className="panel flex h-full flex-col items-center justify-between gap-5">
      <svg viewBox="0 0 220 220" className="h-auto w-full max-w-[220px]" role="img" aria-label="Card expense statistics">
        {order.map((di, q) => {
          const d = data[di];
          const start = -Math.PI + q * step;
          return (
            <motion.path
              key={d.label}
              d={ring(start, start + step, BASE * d.radius)}
              fill={d.color}
              animate={{ scale: active === di ? 1.06 : 1 }}
              style={{ transformOrigin: `${C}px ${C}px` }}
              onMouseEnter={() => setActive(di)}
              onMouseLeave={() => setActive(null)}
            />
          );
        })}
      </svg>
      <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-3 text-sm text-brand-muted">
        {data.map((d, i) => (
          <li key={d.label} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} className="flex items-center gap-2">
            <i className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className={active === i ? 'text-brand-navy' : ''}>{d.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
