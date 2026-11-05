// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  const { BUSINESS, MIN_LEAD_DAYS } = Iris;
  const { PRODUCTS, CATEGORIES, categoryLabel } = Iris;
  const { addItem, setQty, removeItem, priceLines, total, countItems, rupiah, parseQty, isValidQty, MAX_QTY, validateDate, minDateString } = Iris;
  const { loadState, saveState } = Iris;
  const { validateForm, buildMessage, buildWhatsAppUrl } = Iris;

  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const minDate = () => minDateString(MIN_LEAD_DAYS);
  const state = { ...loadState(PRODUCTS, minDate()), category: 'all' };
  let reviewedMessage = null;
  let toastTimer;

  function announce(msg) {
    clearTimeout(toastTimer);
    const t = $('status-message'); t.textContent = msg; t.classList.add('visible');
    toastTimer = setTimeout(() => t.classList.remove('visible'), 4000);
  }
  function persist() { $('storage-warning').hidden = saveState(state); }
  function invalidate() { reviewedMessage = null; $('review-panel').hidden = true; }

  // ---- Katalog ----
  function filtered() {
    const q = $('search').value.trim().toLowerCase();
    return PRODUCTS.filter((p) => (state.category === 'all' || p.category === state.category) && p.name.toLowerCase().includes(q));
  }
  function renderFilters() {
    const box = $('category-filters'); box.replaceChildren();
    CATEGORIES.forEach((c) => {
      const b = el('button', 'filter-button', c.label);
      b.type = 'button'; b.setAttribute('aria-pressed', String(state.category === c.id));
      b.addEventListener('click', () => { state.category = c.id; renderFilters(); renderCatalog(); });
      box.append(b);
    });
  }
  function productImage(p, cls) {
    const img = el('img', cls); img.src = p.image; img.alt = p.imageAlt; img.width = 480; img.height = 480; img.loading = 'lazy';
    img.addEventListener('error', () => { img.src = 'assets/images/fallback.svg'; }, { once: true });
    return img;
  }
  function renderCatalog() {
    const list = filtered(); const frag = document.createDocumentFragment();
    list.forEach((p) => {
      const card = el('article', 'product-card');
      const visual = el('div', 'product-image'); visual.append(productImage(p), el('span', 'product-tag', categoryLabel(p.category)));
      const body = el('div', 'product-body');
      body.append(el('h3', '', p.name), el('p', 'product-description', p.description));
      const bottom = el('div', 'product-bottom'); const price = el('div', 'product-price');
      price.append(el('strong', '', rupiah(p.price)), el('small', '', p.unit ? `/ ${p.unit}` : '/ porsi'));
      const add = el('button', 'add-button', '+ Tambah'); add.type = 'button';
      add.setAttribute('aria-label', `Tambah ${p.name} ke keranjang`);
      add.addEventListener('click', () => {
        state.items = addItem(state.items, p.id); invalidate(); persist(); renderCart();
        announce(`${p.name} ditambahkan. Keranjang berisi ${countItems(state.items)} item.`);
      });
      bottom.append(price, add); body.append(bottom); card.append(visual, body); frag.append(card);
    });
    $('product-grid').replaceChildren(frag);
    $('result-count').textContent = `${list.length} dari ${PRODUCTS.length} menu`;
    $('no-results').hidden = list.length !== 0;
  }

  // ---- Keranjang ----
  function renderCart() {
    const lines = priceLines(state.items, PRODUCTS); const box = $('cart-items'); box.replaceChildren();
    $('cart-empty').hidden = lines.length > 0;
    lines.forEach((l) => {
      const id = l.product.id, name = l.product.name;
      const item = el('div', 'cart-item'); const head = el('div', 'cart-item-head');
      const thumb = productImage(l.product, 'cart-thumb'); thumb.alt = '';
      const info = el('div'); info.append(el('h3', '', name), el('p', 'item-rate', `${rupiah(l.product.price)}${l.product.unit ? ` / ${l.product.unit}` : ''}`));
      head.append(thumb, info);
      const ctr = el('div', 'cart-item-controls'); const q = el('div', 'quantity-control');
      const input = el('input'); input.type = 'number'; input.min = '1'; input.max = String(MAX_QTY); input.step = '1'; input.value = String(l.quantity);
      input.setAttribute('aria-label', `Jumlah ${name}`); input.dataset.qty = id;
      const change = (n) => {
        if (!isValidQty(n)) { input.value = String(l.quantity); showFormError(`Jumlah ${name} harus bilangan bulat 1–${MAX_QTY}.`); return; }
        showFormError(''); state.items = setQty(state.items, id, n); invalidate(); persist(); renderCart();
        announce(`Jumlah ${name} menjadi ${n}.`);
        const again = document.querySelector(`[data-qty="${id}"]`); if (again) again.focus();
      };
      input.addEventListener('change', () => change(parseQty(input.value)));
      const minus = el('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', `Kurangi ${name}`);
      const plus = el('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', `Tambah ${name}`);
      minus.addEventListener('click', () => change(l.quantity - 1)); plus.addEventListener('click', () => change(l.quantity + 1));
      q.append(minus, input, plus);
      const del = el('button', 'remove-button', 'Hapus'); del.type = 'button'; del.setAttribute('aria-label', `Hapus ${name}`);
      del.addEventListener('click', () => { state.items = removeItem(state.items, id); invalidate(); persist(); renderCart(); announce(`${name} dihapus.`); });
      ctr.append(q, del);
      item.append(head, ctr, el('p', 'line-subtotal', `Subtotal ${rupiah(l.subtotal)}`)); box.append(item);
    });
    $('item-count').textContent = `${countItems(state.items)} item`;
    $('order-total').textContent = lines.length ? rupiah(total(lines)) : '—';
    $('estimate-help').textContent = lines.length ? 'Belum termasuk ongkos kirim. Total adalah estimasi harga produk.' : 'Tambahkan menu untuk melihat estimasi.';
    $('cart-count').textContent = String(countItems(state.items));
  }

  // ---- Formulir ----
  const IDS = { date: 'order-date', name: 'customer-name', phone: 'customer-phone', address: 'customer-address', notes: 'customer-notes' };
  function showError(f, msg) {
    const inp = $(IDS[f]), p = $(`${IDS[f]}-error`);
    p.textContent = msg ? `⚠ ${msg}` : '';
    if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid');
  }
  function showFormError(msg) { $('form-error').textContent = msg ? `⚠ ${msg}` : ''; }
  function syncFulfillment() {
    $('address-field').hidden = state.fulfillment !== 'delivery';
    document.querySelector(`input[name="fulfillment"][value="${state.fulfillment}"]`).checked = true;
  }
  const values = () => ({ name: $('customer-name').value, phone: $('customer-phone').value, address: $('customer-address').value, notes: $('customer-notes').value, fulfillment: state.fulfillment, orderDate: state.orderDate });
  const dd = (dl, k, v) => { dl.append(el('dt', '', k), el('dd', '', v)); };

  function review(e) {
    e.preventDefault();
    const lines = priceLines(state.items, PRODUCTS), v = values();
    const dateErr = validateDate(state.orderDate, MIN_LEAD_DAYS), errs = validateForm(v);
    Object.keys(IDS).forEach((f) => showError(f, '')); showFormError('');
    let first = null;
    if (!lines.length) { showFormError('Keranjangmu masih kosong. Pilih menu favoritmu untuk memulai.'); first = $('product-grid'); }
    if (dateErr) { showError('date', dateErr); first = first || $('order-date'); }
    ['name', 'phone', 'address', 'notes'].forEach((f) => { if (errs[f]) { showError(f, errs[f]); first = first || $(IDS[f]); } });
    if (first) { if (first.id === 'product-grid') first.tabIndex = -1; first.focus(); return; }
    reviewedMessage = buildMessage({ ...v, lines, totalPrice: total(lines) });
    const c = $('review-contact'); c.replaceChildren();
    dd(c, 'Nama', v.name.trim()); dd(c, 'WhatsApp', v.phone.trim());
    dd(c, 'Metode', v.fulfillment === 'delivery' ? 'Antar' : 'Ambil di toko'); dd(c, 'Tanggal', v.orderDate);
    if (v.fulfillment === 'delivery') dd(c, 'Alamat', v.address.trim());
    if (v.notes.trim()) dd(c, 'Catatan', v.notes.trim());
    const ul = $('review-lines'); ul.replaceChildren();
    lines.forEach((l) => ul.append(el('li', '', `${l.product.name}${l.product.unit ? ` (${l.product.unit})` : ''} — ${l.quantity} × ${rupiah(l.product.price)} = ${rupiah(l.subtotal)}`)));
    $('review-total').textContent = `Total estimasi: ${rupiah(total(lines))} (belum termasuk ongkos kirim)`;
    $('whatsapp-button').disabled = false;
    $('review-panel').hidden = false; $('review-heading').focus();
  }
  function openWhatsApp() {
    if (!reviewedMessage) return; // ringkasan harus diperiksa ulang bila state berubah
    window.open(buildWhatsAppUrl(BUSINESS.whatsapp, reviewedMessage), '_blank', 'noopener,noreferrer');
  }

  function init() {
    $('year').textContent = String(new Date().getFullYear());
    const d = $('order-date'); d.min = minDate(); d.value = state.orderDate;
    $('date-help').textContent = MIN_LEAD_DAYS === 1 ? 'Pemesanan paling cepat untuk besok.' : `Pemesanan paling cepat ${MIN_LEAD_DAYS} hari dari hari ini.`;
    $('unavailable-note').hidden = false;
    const contact = [BUSINESS.address, BUSINESS.openingHours].filter(Boolean).join(' · ');
    if (contact) $('business-contact').textContent = contact;
    if (BUSINESS.address) $('footer-address').textContent = BUSINESS.address;
    $('search').addEventListener('input', () => renderCatalog());
    $('reset-filters').addEventListener('click', () => { $('search').value = ''; state.category = 'all'; renderFilters(); renderCatalog(); $('search').focus(); });
    document.querySelectorAll('input[name="fulfillment"]').forEach((r) => r.addEventListener('change', () => { state.fulfillment = r.value; syncFulfillment(); invalidate(); persist(); }));
    d.addEventListener('change', () => { state.orderDate = d.value; showError('date', ''); invalidate(); persist(); });
    ['name', 'phone', 'address', 'notes'].forEach((f) => $(IDS[f]).addEventListener('input', () => { showError(f, ''); invalidate(); }));
    $('order-form').addEventListener('submit', review);
    $('edit-request').addEventListener('click', () => { invalidate(); $('customer-name').focus(); });
    $('whatsapp-button').addEventListener('click', openWhatsApp);
    renderFilters(); renderCatalog(); renderCart(); syncFulfillment();
  }
  init();
})();
