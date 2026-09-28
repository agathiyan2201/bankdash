// Lightweight inline icon set (stroke icons, 24x24) so no extra icon library is needed.
const paths = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z',
  transfer: 'M7 7h13l-4-4M17 17H4l4 4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  card: 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm0 3h20M6 15h4',
  loan: 'M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  service: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z',
  privilege: 'M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-2.2-1.3L14.3 3h-4l-.4 2.4a7.4 7.4 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 2.2 1.3l.4 2.4h4l.4-2.4a7.4 7.4 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3Z',
  search: 'm21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Zm-4.3 13a2 2 0 0 1-3.4 0',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M18 6 6 18M6 6l12 12',
  send: 'm22 2-7 20-4-9-9-4 20-7Zm0 0L11 13',
  chevronRight: 'm9 18 6-6-6-6',
  chevronLeft: 'm15 18-6-6 6-6',
  arrowUp: 'M12 19V5m-7 7 7-7 7 7',
  arrowDown: 'M12 5v14m7-7-7 7-7-7',
  wallet: 'M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4h-4Z',
  piggy: 'M5 11a7 7 0 0 1 12-4h2v3l2 1v4h-2a7 7 0 0 1-3 3v2h-3v-1h-2v1H8v-2.5A7 7 0 0 1 5 11Zm0 0H3',
  paypal: 'M7 21 9 7h6a4 4 0 0 1 0 8h-4l-1 6H7Z',
  pencil: 'M4 20h4L19 9l-4-4L4 16v4Z',
  check: 'M20 6 9 17l-5-5',
  bag: 'M6 7h12l1 13H5L6 7Zm3 0a3 3 0 0 1 6 0',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4',
  lock: 'M6 11h12v10H6V11Zm2 0V8a4 4 0 0 1 8 0v3',
  briefcase: 'M3 8h18v12H3V8Zm5 0V5h8v3M3 13h18',
  trending: 'm3 17 6-6 4 4 8-8m0 0h-5m5 0v5',
  refresh: 'M20 11a8 8 0 0 0-14.9-3M4 4v4h4m-4 5a8 8 0 0 0 14.9 3M20 20v-4h-4',
  pie: 'M12 3v9h9A9 9 0 1 1 12 3Zm3-0.5A9 9 0 0 1 21.5 9H15V2.5Z',
  coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9m3-10v2m0 8v2',
  game: 'M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4Zm2 2v3m-1.5-1.5h3M16 12h.01M18 14h.01',
  block: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM5.6 5.6l12.8 12.8',
  plus: 'M12 5v14M5 12h14',
  calendar: 'M4 6h16v15H4V6Zm0 5h16M8 3v4m8-4v4',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 21h16',
};

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
