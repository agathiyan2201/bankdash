# BankDash — React + Tailwind

Responsive banking dashboard based on the BankDash UI kit.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack
React 18 · Tailwind CSS 3 · React Router DOM 6 · Axios · Framer Motion (Vite)

## Structure
```
src/mocks/            mock JSON (bundled; used when VITE_API_URL is empty)
src/
  services/api.js      Axios instance + endpoint functions
  hooks/useFetch.js    loading / error / reload state
  components/
    layout/            Layout, Sidebar (desktop + mobile drawer), Topbar, nav config
    ui/                CreditCard, Section, Icon, Avatar, TxIcon, Skeleton/ErrorState
    dashboard/         RecentTransactions, WeeklyActivity, ExpenseStatistics,
                       QuickTransfer, BalanceHistory (all pure SVG charts)
  pages/               Dashboard, Transactions, Accounts, CreditCards, Settings, Placeholder
```

## Connecting a real backend
Copy `.env.example` to `.env` and set `VITE_API_URL=https://your-api.com` (restart `npm run dev` after changing it).
Endpoints then resolve to `/user`, `/cards`, `/transactions`, `/dashboard`, `/contacts`.
`sendMoney` and `updateUser` in `services/api.js` are mocks — replace with `api.post(...)`.

## Colours (tailwind.config.js → brand.*)
blue #1814F3 · navy #343C6A · muted #718EBF · bg #F5F7FA · border #DFEAF2 · green #16DBAA · red #FE5C73

## Images
Put images in `src/assets/` and import them — Vite fingerprints and copies them into `dist`, so they work on Netlify:
```jsx
import logo from './assets/logo.png';
<img src={logo} alt="BankDash" />
```
- Card chip: `src/assets/chip-white.svg` (blue cards) and `chip-black.svg` (white card).
- Photos: `src/assets/avatars/` — `profile.jpg` (navbar + Setting default), `livia-bator.jpg`, `randy-press.jpg`, `workman.jpg` (Quick Transfer). Replace a file with the same name to change it; add new ones in `src/assets/avatars/index.js`.
- Users can upload their own photo in Setting → Edit Profile (pencil button). It is saved in the browser.

## Desktop scaling
From 1024px to 1439px the app renders at the 1440px design width and scales down (`src/scale.js`), so both sizes look identical. Below 1024px the tablet/mobile layout is used.

## Deploy to Netlify
`netlify.toml` already sets the build command, publish folder and SPA redirect.
- Git: push to GitHub → app.netlify.com → Add new site → Import from Git → select repo → Deploy.
- Manual: `npm run build`, then drag the `dist` folder onto app.netlify.com/drop.
