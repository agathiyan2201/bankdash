import { motion } from 'framer-motion';
import { money } from '../../utils';
import chipWhite from '../../assets/chip-white.svg';
import chipBlack from '../../assets/chip-black.svg';

const variants = {
  primary: {
    wrap: 'bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white',
    label: 'text-white/70',
    footer: 'bg-gradient-to-b from-white/15 to-white/0',
    chip: chipWhite,
  },
  sky: {
    wrap: 'bg-gradient-to-br from-[#2D60FF] to-[#539BFF] text-white',
    label: 'text-white/70',
    footer: 'bg-gradient-to-b from-white/15 to-white/0',
    chip: chipWhite,
  },
  light: {
    wrap: 'bg-white text-brand-navy border border-brand-border',
    label: 'text-brand-muted',
    footer: 'border-t border-brand-border',
    chip: chipBlack,
  },
};

// Chip artwork lives in src/assets as SVG images: white on the blue cards, black on the white card.
function Chip({ src }) {
  return <img src={src} alt="" className="h-8 w-8 select-none md:h-[35px] md:w-[35px]" draggable="false" />;
}

export default function CreditCard({ card, className = '' }) {
  const v = variants[card.variant] || variants.primary;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative flex aspect-[350/235] w-full min-w-[265px] flex-col justify-between overflow-hidden rounded-[25px] ${v.wrap} ${className}`}
      aria-label={`Card ending ${card.number.slice(-4)}`}
    >
      <div className="flex items-start justify-between px-6 pt-5">
        <div>
          <p className={`text-xs ${v.label}`}>Balance</p>
          <p className="text-lg font-semibold md:text-xl">{money(card.balance)}</p>
        </div>
        <Chip src={v.chip} />
      </div>

      <div className="flex gap-12 px-6">
        <div>
          <p className={`text-[11px] uppercase ${v.label}`}>Card holder</p>
          <p className="text-sm font-semibold md:text-[15px]">{card.holder}</p>
        </div>
        <div>
          <p className={`text-[11px] uppercase ${v.label}`}>Valid thru</p>
          <p className="text-sm font-semibold md:text-[15px]">{card.valid}</p>
        </div>
      </div>

      <div className={`flex items-center justify-between px-6 py-4 ${v.footer}`}>
        <p className="text-base font-semibold tracking-wider md:text-xl">{card.number}</p>
        <span className="flex" aria-hidden="true">
          <span className="h-7 w-7 rounded-full bg-current opacity-40" />
          <span className="-ml-3 h-7 w-7 rounded-full bg-current opacity-40" />
        </span>
      </div>
    </motion.article>
  );
}
