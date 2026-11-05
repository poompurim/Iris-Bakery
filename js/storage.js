// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  const { STORAGE_KEY } = Iris;
  const { isValidQty, parseDate } = Iris;

  const EMPTY = { items: [], fulfillment: 'pickup', orderDate: '' };

  // Mengembalikan state valid; tidak pernah melempar error.
  function loadState(products, minDate) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...EMPTY };
      const data = JSON.parse(raw);
      if (!data || data.schemaVersion !== 1 || !Array.isArray(data.items)) return { ...EMPTY };
      const ids = new Set(products.map((p) => p.id));
      const seen = new Set();
      const items = [];
      for (const i of data.items) {
        if (!i || !ids.has(i.productId) || seen.has(i.productId) || !isValidQty(i.quantity)) continue;
        seen.add(i.productId);
        items.push({ productId: i.productId, quantity: i.quantity });
      }
      const fulfillment = data.fulfillment === 'delivery' ? 'delivery' : 'pickup';
      let orderDate = typeof data.orderDate === 'string' && parseDate(data.orderDate) ? data.orderDate : '';
      if (orderDate && orderDate < minDate) orderDate = ''; // kedaluwarsa: minta pilih ulang
      return { items, fulfillment, orderDate };
    } catch {
      return { ...EMPTY };
    }
  }
  // Hanya ID, jumlah, metode, tanggal, versi. Data pribadi tidak pernah disimpan.
  function saveState(s) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 1, items: s.items, fulfillment: s.fulfillment, orderDate: s.orderDate }));
      return true;
    } catch {
      return false;
    }
  }
  Object.assign(Iris, { loadState, saveState });
})();
