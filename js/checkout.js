// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  const { rupiah } = Iris;

  const normalizePhone = (raw) => {
    let d = String(raw || '').replace(/[\s\-()]/g, '').replace(/^\+/, '');
    if (!/^\d+$/.test(d)) return '';
    if (d.startsWith('0')) d = '62' + d.slice(1); // 08xx -> 628xx
    return d.length >= 8 && d.length <= 15 ? d : '';
  };

  // Mengembalikan { field: pesan } untuk tiap kesalahan, berurutan sesuai tampilan form.
  function validateForm({ name, phone, fulfillment, address, notes }) {
    const e = {};
    const n = (name || '').trim();
    if (n.length < 2 || n.length > 80) e.name = 'Nama wajib diisi 2–80 karakter.';
    if (!normalizePhone(phone)) e.phone = 'Masukkan nomor WhatsApp 8–15 digit, misalnya 08123456789.';
    if (fulfillment === 'delivery') {
      const a = (address || '').trim();
      if (a.length < 10 || a.length > 200) e.address = 'Alamat pengantaran wajib diisi minimal 10 karakter (maksimal 200).';
    }
    if ((notes || '').trim().length > 200) e.notes = 'Catatan maksimal 200 karakter.';
    return e;
  }

  const fmtLong = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
  };

  function buildMessage({ lines, totalPrice, name, phone, fulfillment, address, orderDate, notes }) {
    const out = ['Halo Iris Bakery, saya ingin mengajukan pesanan:', '',
      `Nama: ${name.trim()}`, `WhatsApp: ${normalizePhone(phone)}`,
      `Metode: ${fulfillment === 'delivery' ? 'Antar' : 'Ambil di toko'}`];
    if (fulfillment === 'delivery') out.push(`Alamat: ${address.trim()}`);
    out.push(`Tanggal: ${fmtLong(orderDate)}`, '', 'Pesanan:');
    lines.forEach((l, i) => {
      const unit = l.product.unit ? ` (${l.product.unit})` : '';
      out.push(`${i + 1}. ${l.product.name}${unit} — ${l.quantity} × ${rupiah(l.product.price)} = ${rupiah(l.subtotal)}`);
    });
    out.push('', `Total estimasi produk: ${rupiah(totalPrice)} (belum termasuk ongkir)`);
    if ((notes || '').trim()) out.push(`Catatan: ${notes.trim()}`);
    out.push('', 'Mohon konfirmasi ketersediaan stok, ongkos kirim/biaya tambahan, dan pembayaran. Terima kasih!');
    return out.join('\n');
  }
  const buildWhatsAppUrl = (number, message) => {
    const text = encodeURIComponent(message);
    return validBusinessNumber(number) ? `https://web.whatsapp.com/send?phone=${number}&text=${text}` : `https://web.whatsapp.com/send?text=${text}`;
  };
  const validBusinessNumber = (n) => /^[1-9]\d{7,14}$/.test(String(n || ''));
  Object.assign(Iris, { normalizePhone, validateForm, buildMessage, buildWhatsAppUrl, validBusinessNumber });
})();
