import { useId, useState } from 'react';
import { motion } from 'framer-motion';

function smoothPath(points) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i], p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/** data: [{ label, value }] */
export default function LineChart({
  data, max, ticks, color = '#1814F3', smooth = true, area = false, dots = false,
  dashedGrid = true, verticalGrid = false, height = 240, format = (v) => v, tickFormat = format,
}) {
  const [hover, setHover] = useState(null);
  const gid = useId().replace(/:/g, '');
  const W = 640, H = height, PAD_L = 58, PAD_B = 30, PAD_T = 12, PAD_R = 12;
  const plotW = W - PAD_L - PAD_R, plotH = H - PAD_B - PAD_T;
  const x = (i) => PAD_L + (plotW / (data.length - 1)) * i;
  const y = (v) => PAD_T + plotH - (v / max) * plotH;
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = smooth ? smoothPath(pts) : pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  const slot = plotW / (data.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(t)} y2={y(t)} stroke="#DFE5EE" strokeDasharray={dashedGrid ? '4 4' : undefined} />
          <text x={PAD_L - 12} y={y(t) + 4} textAnchor="end" className="fill-brand-muted text-[12px]">{tickFormat(t)}</text>
        </g>
      ))}
      {verticalGrid && data.map((d, i) => (
        <line key={i} x1={x(i)} x2={x(i)} y1={PAD_T} y2={y(0)} stroke="#DFE5EE" strokeDasharray="4 4" />
      ))}
      {area && <path d={`${line} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={`url(#${gid})`} />}
      <motion.path
        d={line} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      {data.map((d, i) => (
        <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <rect x={x(i) - slot / 2} y={PAD_T} width={slot} height={plotH} fill="transparent" />
          {d.label && <text x={x(i)} y={H - 8} textAnchor="middle" className="fill-brand-muted text-[12px]">{d.label}</text>}
          {(dots || hover === i) && (
            <circle cx={x(i)} cy={y(d.value)} r={hover === i ? 6 : 5} fill="#fff" stroke={color} strokeWidth="3" />
          )}
          {hover === i && (
            <>
              <rect x={x(i) - 38} y={y(d.value) - 40} width="76" height="24" rx="8" fill="#343C6A" />
              <text x={x(i)} y={y(d.value) - 23} textAnchor="middle" className="fill-white text-[12px] font-semibold">{format(d.value)}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
