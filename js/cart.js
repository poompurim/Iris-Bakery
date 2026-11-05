// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  // Fungsi murni: keranjang, harga, tanggal.
  const MAX_QTY = 99;
  const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n).replace(/\s/g, '');

  const isValidQty = (q) => Number.isInteger(q) && q >= 1 && q <= MAX_QTY;
  // Mengubah teks input menjadi integer; desimal/kosong/NaN -> NaN (ditolak).
  const parseQty = (s) => (/^\d+$/.test(String(s).trim()) ? Number(s) : NaN);

  function addItem(items, id) {
    const found = items.find((i) => i.productId === id);
    if (!found) return [...items, { productId: id, quantity: 1 }];
    if (found.quantity >= MAX_QTY) return items;
    return items.map((i) => (i.productId === id ? { ...i, quantity: i.quantity + 1 } : i));
  }
  const setQty = (items, id, q) => (isValidQty(q) ? items.map((i) => (i.productId === id ? { ...i, quantity: q } : i)) : items);
  const removeItem = (items, id) => items.filter((i) => i.productId !== id);

  // Harga selalu dari katalog, tidak dari DOM atau storage. ID hilang diabaikan.
  function priceLines(items, products) {
    const lines = [];
    for (const i of items) {
      const prod = products.find((x) => x.id === i.productId);
      if (prod) lines.push({ product: prod, quantity: i.quantity, subtotal: prod.price * i.quantity });
    }
    return lines;
  }
  const total = (lines) => lines.reduce((s, l) => s + l.subtotal, 0);
  const countItems = (items) => items.reduce((s, i) => s + i.quantity, 0);

  // ---- Tanggal ----
  function parseDate(str) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str || '');
    if (!m) return null;
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const t = new Date(Date.UTC(y, mo - 1, d));
    // Validasi ulang komponen agar 31 Februari ditolak.
    if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return null;
    return { y, m: mo, d };
  }
  const pad = (n) => String(n).padStart(2, '0');
  const fmtDate = ({ y, m, d }) => `${y}-${pad(m)}-${pad(d)}`;
  // Hari ini menurut kalender lokal perangkat (tanpa toISOString).
  const localToday = (now = new Date()) => ({ y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() });
  function addDays({ y, m, d }, n) {
    const t = new Date(Date.UTC(y, m - 1, d + n));
    return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
  }
  const minDateString = (lead, now = new Date()) => fmtDate(addDays(localToday(now), lead));
  function validateDate(str, lead, now = new Date()) {
    const p = parseDate(str);
    if (!p) return 'Pilih tanggal yang valid.';
    // Format YYYY-MM-DD terurut leksikografis sama dengan urutan kalender.
    if (fmtDate(p) < minDateString(lead, now)) return lead === 1 ? 'Pilih tanggal paling cepat besok.' : `Pilih tanggal paling cepat ${lead} hari dari hari ini.`;
    return '';
  }
  Object.assign(Iris, { MAX_QTY, rupiah, isValidQty, parseQty, addItem, setQty, removeItem, priceLines, total, countItems, parseDate, fmtDate, localToday, addDays, minDateString, validateDate });
})();
