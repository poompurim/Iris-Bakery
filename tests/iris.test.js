import test from 'node:test';
import assert from 'node:assert/strict';
// Skrip klasik dimuat berurutan; semuanya mendaftar ke globalThis.Iris.
for (const f of ['config', 'data', 'cart', 'storage', 'checkout']) await import(`../js/${f}.js`);
const I = globalThis.Iris;
const NOW = new Date(2026, 10, 1);
const store = {};
globalThis.localStorage = { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } };

test('20 produk unik: 12 dessert-bakery dan 8 drinks, harga integer positif', () => {
  assert.equal(I.PRODUCTS.length, 20);
  assert.equal(new Set(I.PRODUCTS.map((p) => p.id)).size, 20);
  assert.equal(I.PRODUCTS.filter((p) => p.category === 'dessert-bakery').length, 12);
  assert.equal(I.PRODUCTS.filter((p) => p.category === 'drinks').length, 8);
  for (const p of I.PRODUCTS) { assert.ok(Number.isInteger(p.price) && p.price > 0); assert.ok(p.name && p.description && p.imageAlt); assert.equal(p.image, `assets/images/${p.id}.webp`); }
});
test('produk sama digabung, jumlah tidak valid ditolak, total dari katalog', () => {
  let items = I.addItem(I.addItem([], 'og-salt-bread'), 'og-salt-bread');
  assert.deepEqual(items, [{ productId: 'og-salt-bread', quantity: 2 }]);
  items = I.addItem(items, 'mocha-latte');
  assert.equal(I.total(I.priceLines(items, I.PRODUCTS)), 2 * 25000 + 35000);
  assert.deepEqual([0, -1, 1.5, 100, NaN].map(I.isValidQty), [false, false, false, false, false]);
  assert.ok(Number.isNaN(I.parseQty('1.5')));
  assert.equal(I.setQty(items, 'mocha-latte', 100), items);
  assert.equal(I.rupiah(56000), 'Rp56.000');
  assert.equal(I.priceLines([{ productId: 'hilang', quantity: 1 }], I.PRODUCTS).length, 0);
});
test('validasi tanggal: lampau, hari ini, tidak nyata ditolak; lintas bulan/tahun dan kabisat diterima', () => {
  const v = (d, now = NOW) => I.validateDate(d, 1, now);
  assert.ok(v('2026-10-31')); assert.ok(v('2026-11-01')); assert.ok(v('2027-02-31')); assert.ok(v('')); assert.ok(v('2026-1-5'));
  assert.equal(v('2026-11-02'), '');
  assert.equal(v('2027-01-01', new Date(2026, 11, 31)), '');
  assert.ok(v('2027-01-01', new Date(2027, 0, 1)));
  assert.equal(v('2028-02-29', new Date(2028, 1, 28)), '');
  assert.equal(v('2028-03-01', new Date(2028, 1, 29)), '');
  assert.ok(v('2027-02-29', NOW));
  assert.equal(I.minDateString(1, new Date(2028, 1, 28)), '2028-02-29');
});
test('validasi form dan nomor WhatsApp', () => {
  assert.equal(I.normalizePhone('+62 812-3456-789'), '628123456789');
  assert.equal(I.normalizePhone('(0812) 3456 789'), '628123456789');
  assert.equal(I.normalizePhone('12'), ''); assert.equal(I.normalizePhone('abc'), '');
  const e = I.validateForm({ name: ' A ', phone: 'x', fulfillment: 'delivery', address: 'pendek', notes: 'x'.repeat(201) });
  assert.deepEqual(Object.keys(e), ['name', 'phone', 'address', 'notes']);
  assert.deepEqual(I.validateForm({ name: 'Ani', phone: '08123456789', fulfillment: 'pickup', address: '', notes: '' }), {});
  assert.equal(I.validBusinessNumber(''), false); assert.equal(I.validBusinessNumber('08123'), false); assert.equal(I.validBusinessNumber('628123456789'), true);
  assert.equal(I.BUSINESS.whatsapp, '');
});
test('pesan WhatsApp ter-encode dan tidak mengandung markup mentah', () => {
  const lines = I.priceLines([{ productId: 'honey-croffle', quantity: 1 }], I.PRODUCTS);
  const msg = I.buildMessage({ lines, totalPrice: I.total(lines), name: 'A <b> & "C"', phone: '08123456789', fulfillment: 'delivery', address: 'Jl. Mawar No. 1\nJakarta', orderDate: '2026-11-10', notes: 'tanpa & kacang' });
  assert.match(msg, /Honey Croffle \(3 pcs\)/); assert.match(msg, /Rp25\.000/); assert.match(msg, /belum termasuk ongkir/);
  const url = I.buildWhatsAppUrl('628123456789', msg);
  assert.ok(url.startsWith('https://web.whatsapp.com/send?phone=628123456789&text=')); assert.ok(!/[<>"& \n]/.test(url.split('?text=')[1]));
  assert.equal(decodeURIComponent(url.split('&text=')[1]), msg);
  const genericUrl = I.buildWhatsAppUrl('', msg);
  assert.ok(genericUrl.startsWith('https://web.whatsapp.com/send?text='));
  assert.equal(decodeURIComponent(genericUrl.split('?text=')[1]), msg);
});
test('storage: JSON rusak, versi asing, ID hilang, jumlah invalid, tanggal kedaluwarsa, akses ditolak', () => {
  const min = '2026-11-02'; const key = I.STORAGE_KEY;
  assert.deepEqual(I.loadState(I.PRODUCTS, min).items, []);
  store[key] = '{rusak'; assert.deepEqual(I.loadState(I.PRODUCTS, min).items, []);
  store[key] = JSON.stringify({ schemaVersion: 9, items: [{ productId: 'og-cookie', quantity: 1 }] }); assert.deepEqual(I.loadState(I.PRODUCTS, min).items, []);
  store[key] = JSON.stringify({ schemaVersion: 1, fulfillment: 'delivery', orderDate: '2026-11-01', items: [{ productId: 'og-cookie', quantity: 2 }, { productId: 'og-cookie', quantity: 3 }, { productId: 'hilang', quantity: 1 }, { productId: 'tiramisu', quantity: 0 }, { productId: 'mocha-latte', quantity: 1.5 }] });
  assert.deepEqual(I.loadState(I.PRODUCTS, min), { items: [{ productId: 'og-cookie', quantity: 2 }], fulfillment: 'delivery', orderDate: '' });
  assert.equal(I.saveState({ items: [], fulfillment: 'pickup', orderDate: '' }), true);
  assert.ok(!('name' in JSON.parse(store[key])));
  const orig = globalThis.localStorage;
  globalThis.localStorage = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
  assert.deepEqual(I.loadState(I.PRODUCTS, min).items, []); assert.equal(I.saveState({ items: [], fulfillment: 'pickup', orderDate: '' }), false);
  globalThis.localStorage = orig;
});
