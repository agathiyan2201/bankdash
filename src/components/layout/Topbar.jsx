import { Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';
import { titleFor } from './nav';
import { useUser } from '../../context/UserContext';

function Search({ className = '' }) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">Search</span>
      <Icon name="search" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
      <input
        type="search"
        placeholder="Search for something"
        className="w-full rounded-full bg-brand-bg py-3 pl-12 pr-5 text-sm text-brand-navy placeholder:text-[#8BA3CB] focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
    </label>
  );
}

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  const { avatar, name } = useUser();
  return (
    <header className="sticky top-0 z-20 border-b border-brand-border bg-white">
      <div className="flex items-center gap-4 px-6 py-4 md:px-10 md:py-5">
        <button onClick={onMenu} aria-label="Open menu" className="-ml-2 rounded-full p-2 text-brand-navy hover:bg-brand-bg lg:hidden">
          <Icon name="menu" />
        </button>

        <h1 className="flex-1 text-center text-xl font-semibold text-brand-navy md:text-[28px] lg:text-left">
          {titleFor(pathname)}
        </h1>

        <Search className="hidden w-64 md:block" />

        <Link
          to="/settings"
          aria-label="Settings"
          className="hidden h-12 w-12 items-center justify-center rounded-full bg-brand-bg text-brand-muted hover:text-brand-blue md:flex"
        >
          <Icon name="settings" className="h-5 w-5" />
        </Link>
        <button
          aria-label="Notifications"
          className="relative hidden h-12 w-12 items-center justify-center rounded-full bg-brand-bg text-brand-red md:flex"
        >
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-red" />
        </button>
        <Link to="/settings" aria-label="Profile">
          <Avatar name={name} src={avatar} size="h-9 w-9 text-xs md:h-[60px] md:w-[60px] md:text-base" />
        </Link>
      </div>
      <div className="px-6 pb-4 md:hidden">
        <Search />
      </div>
    </header>
  );
}
