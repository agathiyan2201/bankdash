import { useState } from 'react';
import { motion } from 'framer-motion';

/*
 * Exploded pie matching the Figma "Expense Statistics" card:
 * slices run clockwise from the upper-left (Entertainment → Bill Expense → Others → Investment),
 * each pushed out from the centre by its own offset and separated by white gaps.
 */
const C = 160, R = 130, START = (-155 * Math.PI) / 180, GAP = 5;

const polar = (a, r) => [C + r * Math.cos(a), C + r * Math.sin(a)];

function slicePath(start, end, r) {
  const [x1, y1] = polar(start, r);
  const [x2, y2] = polar(end, r);
  const large = end - start > Math.PI ? 1 : 0;
  return `M${C},${C} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
}

export default function ExpenseStatistics({ data }) {
  const [active, setActive] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0);

  let angle = START;
  const slices = data.map((d) => {
    const start = angle;
    const end = angle + (d.value / total) * Math.PI * 2;
    angle = end;
    return { ...d, start, end, mid: (start + end) / 2, r: R * (d.radius ?? 1), offset: d.offset ?? 8 };
  });

  return (
    <div className="panel flex h-full items-center justify-center">
      <svg viewBox="0 0 320 320" className="h-auto w-full max-w-[330px] overflow-visible" role="img" aria-label="Expense statistics">
        {slices.map((s, i) => {
          const push = s.offset + (active === i ? 8 : 0);
          const dx = Math.cos(s.mid) * push;
          const dy = Math.sin(s.mid) * push;
          const [lx, ly] = polar(s.mid, s.r * 0.6);
          return (
            <motion.g
              key={s.label}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: dx, y: dy, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: active === null ? i * 0.06 : 0 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
            >
              <path d={slicePath(s.start, s.end, s.r)} fill={s.color} stroke="#fff" strokeWidth={GAP} strokeLinejoin="round" />
              <text x={lx} y={ly - 2} textAnchor="middle" className="fill-white text-[16px] font-bold">{s.value}%</text>
              <text x={lx} y={ly + 14} textAnchor="middle" className="fill-white text-[11px] font-bold">{s.label}</text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
