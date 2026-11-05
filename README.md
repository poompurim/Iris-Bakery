# Iris Bakery

Website katalog dan pengajuan pesanan Iris Bakery menggunakan HTML, CSS, dan JavaScript murni, tanpa proses build atau dependensi runtime.

## Menjalankan

Cukup buka `index.html` (klik dua kali). Aplikasi memakai skrip klasik sehingga juga berjalan lewat `file://`. Untuk menyerupai hosting:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Buka http://localhost:5500.

## Isi proyek

- 20 produk (12 Dessert & Bakery, 8 Drinks) dengan foto dari pemilik usaha dalam format WebP lokal.
- Pencarian dan filter kategori yang dapat digabungkan.
- Keranjang tersimpan di browser, jumlah 1–99, pilihan ambil/antar, tanggal, dan estimasi total.
- Formulir kontak, pemeriksaan ringkasan, dan pembentukan draf WhatsApp.
- Cara pesan, FAQ, tampilan responsif, dan dukungan keyboard.

Harga dari pemilik usaha (Honey Croffle: Rp25.000 untuk 3 pcs, perlu dikonfirmasi). Deskripsi masih contoh. Stok dikonfirmasi manual. Tidak ada akun, backend, database, pembayaran, atau reservasi otomatis.

## Konfigurasi usaha

Edit `js/config.js` untuk nomor WhatsApp internasional (digit saja) dan jam buka. Alamat toko Jl. Asem Dua No.22, RT.11/RW.5, Cipete Selatan, Kecamatan Cilandak, Kota Jakarta Selatan, DKI Jakarta 12410 sudah dicantumkan. Jika nomor WhatsApp toko belum diisi, tombol tetap membuka WhatsApp Web dengan draf pesan dan pengguna dapat memilih kontak Iris Bakery. Perbarui katalog di `js/data.js` (jaga ID produk tetap stabil, foto bernama `assets/images/<id>.webp`).

Nama, nomor, alamat, dan catatan pemesan tidak disimpan di localStorage. Membuka WhatsApp memasukkan data tersebut ke URL layanan; pengguna masih harus mengirim pesan sendiri.

## Pemeriksaan dan paket

```bash
npm test
python3 scripts/package_site.py
```

Node.js hanya untuk pengujian otomatis. Paket publik berada di `artifacts/iris-bakery.zip`; dokumen, tes, dan konfigurasi pengembangan tidak ikut. Hasil verifikasi dan batasannya ada di `verification.md`.

SOP lengkap: [instruction.md](instruction.md). Kebutuhan: [prd.md](prd.md), teknologi: [tech_stack.md](tech_stack.md), arsitektur: [arsitektur.md](arsitektur.md), desain: [ui.ux.md](ui.ux.md).
