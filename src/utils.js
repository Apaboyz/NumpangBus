export const ROWS = 8;
export const LETTERS = ['A', 'B', 'C', 'D']; // A B | lorong | C D

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

export const todayStr = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export const formatTanggal = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const hashStr = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const allSeats = () => {
  const list = [];
  for (let r = 1; r <= ROWS; r++) LETTERS.forEach((l) => list.push(`${r}${l}`));
  return list;
};

export const sortSeats = (seats) =>
  [...seats].sort((a, b) => parseInt(a) - parseInt(b) || a.slice(-1).localeCompare(b.slice(-1)));

// Kursi terisi "acak" tetapi konsisten untuk jadwal yang sama
export const seededTaken = (scheduleKey) =>
  allSeats().filter((s) => hashStr(`${scheduleKey}|${s}`) % 100 < 28);

const STORE_KEY = 'tiket-bus:terisi';

export const loadBooked = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
};

export const saveBooked = (data) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    /* abaikan jika penyimpanan tidak tersedia */
  }
};

export const makeCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `BUS-${out}`;
};
