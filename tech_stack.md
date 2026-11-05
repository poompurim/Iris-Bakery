# Teknologi — Iris Bakery

## 1. Prinsip pemilihan
MVP adalah website statis dengan HTML, CSS, dan JavaScript murni. Prioritasnya mudah dipelajari, dapat dijalankan tanpa proses build, ringan di ponsel, dan murah dioperasikan. Dokumen ini menetapkan pilihan arsitektur; layanan hosting belum dipublikasikan.

## 2. Stack yang dipilih
| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Struktur halaman | HTML5 semantik | Mendukung struktur konten dan aksesibilitas tanpa framework |
| Tampilan | CSS3, custom properties, Flexbox, Grid, media query | Cukup untuk tampilan responsif dan token warna tanpa dependensi UI |
| Animasi | CSS transition/animation sederhana | Efek halus tanpa pustaka; dapat dimatikan lewat `prefers-reduced-motion` |
| Logika browser | JavaScript skrip klasik per berkas (namespace `Iris`) | Memisahkan katalog, keranjang, dan formulir tanpa bundler; tetap berjalan saat dibuka lewat `file://` |
| Framework | Tidak digunakan | Mengurangi kompleksitas untuk cakupan MVP |
| Katalog | Array objek pada `js/data.js` (20 produk) | Mudah ditinjau dan diperbarui melalui kode |
| Penyimpanan browser | localStorage | Memulihkan keranjang pada perangkat dan origin yang sama |
| Database server | Tidak digunakan pada MVP | Belum ada akun, stok tersinkron, atau transaksi server |
| Integrasi pemesanan | Tautan WhatsApp `wa.me` | Membuka pesan yang diperiksa dan dikirim sendiri oleh pengguna |
| Hosting/cloud rencana | Cloudflare Pages, unggahan aset statis | Sesuai untuk berkas statis melalui HTTPS; tidak memerlukan server aplikasi |
| Kontrol versi | Git | Meninjau perubahan dan mengembalikan versi |
| Server pengembangan | Python 3 `http.server` (opsional) | Menyerupai hosting; tidak wajib karena tidak memakai ES modules |
| Pemeriksaan | Browser DevTools; Node.js opsional untuk sintaks dan pengujian fungsi murni | Memeriksa interaksi, responsivitas, dan kesalahan JavaScript |

Fitur dan prosedur dashboard penyedia hosting perlu diperiksa kembali saat deployment. Tidak ada SDK cloud dalam kode aplikasi.

## 3. Kompatibilitas
Targetkan browser modern Chrome, Edge, Firefox, dan Safari, termasuk Android/iOS yang masih didukung produsennya. Gunakan input tanggal native dengan label serta validasi JavaScript. Tidak mendukung Internet Explorer. Periksa setidaknya satu browser Chromium dan satu browser lain (Safari atau Firefox) sebelum rilis bila tersedia.

## 4. Pengelolaan data
- localStorage hanya menyimpan versi skema, ID produk, jumlah, metode, dan tanggal.
- Nama, nomor kontak, alamat, dan catatan hanya berada di memori formulir sampai pengguna membuka WhatsApp; jangan simpan dalam localStorage atau log.
- Katalog sumber menjadi acuan harga; jangan percaya harga atau total dari localStorage.
- Penyimpanan browser bukan database bersama dan tidak menyediakan stok atau reservasi.
- Tanpa API key, password, token, atau rahasia di frontend. Nomor usaha bersifat publik.

## 5. Identitas visual dan font
Warna ditetapkan sebagai CSS custom properties berdasarkan palet Iris Bakery (`#78001F`, `#C6427A`, `#D982A5`, `#F1B2CA`, `#F9D0DF`); rincian fungsi warna ada di `ui.ux.md`. Gunakan font sistem agar tidak bergantung pada CDN font: judul memakai tumpukan serif elegan (`Georgia, "Times New Roman", serif`) dan teks isi memakai `system-ui, sans-serif`. Font web kustom hanya boleh ditambahkan bila berkas dihosting lokal dan lisensinya jelas.

## 6. Aset dan performa
Foto produk berasal dari pemilik usaha dan disimpan lokal di `assets/images/`. Konversi ke WebP/AVIF bila tersedia, gunakan rasio tetap dengan dimensi gambar eksplisit, dan lazy loading untuk gambar di bawah area awal. Hak penggunaan foto harus jelas dan dicatat. Target awal total aset halaman sekitar 2 MB atau lebih kecil (20 foto produk + hero) dan tidak ada kesalahan console pada alur utama. Tidak ada hotlink ke foto internet.

## 7. Pengembangan berikutnya
Jika dibutuhkan pesanan terdokumentasi, stok bersama, pembayaran, atau ongkir otomatis, tambahkan backend serta database relasional, pemeriksaan ketersediaan, autentikasi admin, integrasi pembayaran, dan validasi server. Pilihan layanan ditentukan pada fase tersebut; localStorage tidak boleh menjadi dasar konfirmasi transaksi atau pembayaran.
