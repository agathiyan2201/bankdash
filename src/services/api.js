import axios from 'axios';

/*
 * Data layer.
 * - No VITE_API_URL set  → data comes from the JSON files in src/mocks (bundled into the app,
 *   so it works on any host, sub-folder or preview without extra files).
 * - VITE_API_URL set     → real HTTP requests through Axios: GET {VITE_API_URL}/cards, /transactions, …
 */
const API_URL = import.meta.env.VITE_API_URL;
const mocks = import.meta.glob('../mocks/*.json', { eager: true, import: 'default' });

const api = axios.create({ baseURL: API_URL || '/', timeout: 10000 });

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response
      ? `Request failed with status ${err.response.status}`
      : 'Could not reach the server. Check your connection.';
    return Promise.reject(new Error(message));
  }
);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(name) {
  if (!API_URL) {
    const data = mocks[`../mocks/${name}.json`];
    if (!data) throw new Error(`No mock data found for "${name}". Add src/mocks/${name}.json.`);
    await delay(200); // lets the loading skeleton show, like a real request
    return JSON.parse(JSON.stringify(data));
  }
  const res = await api.get(`/${name}`);
  if (typeof res.data === 'string') {
    throw new Error(`"/${name}" returned a web page instead of JSON. Check VITE_API_URL.`);
  }
  return res.data;
}

export const getUser = () => get('user');
export const getCards = () => get('cards');
export const getTransactions = () => get('transactions');
export const getDashboard = () => get('dashboard');
export const getContacts = () => get('contacts');
export const getExpense = () => get('expense');
export const getAccounts = () => get('accounts');
export const getInvestments = () => get('investments');
export const getLoans = () => get('loans');
export const getServices = () => get('services');
export const getCardStats = () => get('card-stats');

// Mock writes — swap for api.post(...) when a backend exists.
export const sendMoney = ({ contactId, amount }) =>
  delay(700).then(() => ({ ok: true, contactId, amount }));
export const updateUser = (data) => delay(600).then(() => data);

export default api;
