import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Grouped bar chart in pure SVG.
 * series: [{ name, color, values: number[] }]
 */
export default function BarChart({
  labels, series, max, ticks, barWidth = 15, gap = 8, rounded = 'full',
  showYAxis = true, height = 260, format = (v) => v,
}) {
  const [hover, setHover] = useState(null);
  const W = 700, H = height, PAD_L = showYAxis ? 44 : 4, PAD_B = 30, PAD_T = 10;
  const plotW = W - PAD_L, plotH = H - PAD_B - PAD_T;
  const group = plotW / labels.length;
  const y = (v) => PAD_T + plotH - (v / max) * plotH;
  const groupWidth = series.length * barWidth + (series.length - 1) * gap;
  const rx = rounded === 'full' ? barWidth / 2 : 10;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={series.map((s) => s.name).join(' and ')}>
        {showYAxis && ticks.map((t) => (
          <g key={t}>
            <line x1={PAD_L} x2={W} y1={y(t)} y2={y(t)} stroke="#F3F3F5" />
            <text x={PAD_L - 12} y={y(t) + 4} textAnchor="end" className="fill-brand-muted text-[13px]">{t}</text>
          </g>
        ))}
        {labels.map((label, i) => {
          const cx = PAD_L + group * i + group / 2;
          const start = cx - groupWidth / 2;
          return (
            <g key={label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={cx - group / 2} y={PAD_T} width={group} height={plotH} fill={hover === i ? '#F5F7FA' : 'transparent'} rx="10" />
              {series.map((s, si) => {
                const v = s.values[i];
                return (
                  <motion.rect
                    key={s.name}
                    x={start + si * (barWidth + gap)}
                    width={barWidth}
                    rx={rx}
                    fill={s.color}
                    initial={{ y: y(0), height: 0 }}
                    animate={{ y: y(v), height: y(0) - y(v) }}
                    transition={{ duration: 0.6, delay: i * 0.04 + si * 0.04 }}
                  />
                );
              })}
              <text x={cx} y={H - 8} textAnchor="middle" className="fill-brand-muted text-[13px]">{label}</text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-brand-navy px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: `${((PAD_L + group * hover + group / 2) / W) * 100}%` }}
        >
          <p className="font-semibold">{labels[hover]}</p>
          {series.map((s) => <p key={s.name}>{s.name}: {format(s.values[hover])}</p>)}
        </div>
      )}
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div className="flex flex-wrap justify-end gap-6 text-sm text-brand-muted">
      {items.map((it) => (
        <span key={it.name} className="flex items-center gap-2">
          <i className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: it.color }} />
          {it.name}
        </span>
      ))}
    </div>
  );
}
