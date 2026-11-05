// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  const BUSINESS = Object.freeze({
    name: 'Iris Bakery',
    // Isi nomor usaha asli: kode negara + digit saja, tanpa "+", spasi, atau awalan 0 (contoh: 62 diikuti nomor).
    // Selama kosong, tombol WhatsApp nonaktif.
    whatsapp: '', // Nomor toko belum diberikan; gunakan WhatsApp Web dengan pemilih kontak.
    address: 'Jl. Asem Dua No.22, RT.11/RW.5, Cipete Selatan, Kecamatan Cilandak, Kota Jakarta Selatan, DKI Jakarta 12410',
    openingHours: ''  // belum disediakan pemilik usaha
  });
  const MIN_LEAD_DAYS = 1; // masa tunggu minimum (H+1)
  const STORAGE_KEY = 'iris-bakery:cart:v1';
  Object.assign(Iris, { BUSINESS, MIN_LEAD_DAYS, STORAGE_KEY });
})();
