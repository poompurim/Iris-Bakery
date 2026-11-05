# Panduan Pengembangan — Iris Bakery

## 1. Cakupan dan urutan kerja
Dokumentasi ini menjadi dasar implementasi website statis HTML, CSS, dan JavaScript (skrip klasik tanpa ES modules). Selesaikan dan tinjau kebutuhan sebelum membuat fitur. Tidak ada website atau deployment yang dinyatakan sudah selesai hanya karena dokumen tersedia.

Baca berurutan: `prd.md` → `tech_stack.md` → `arsitektur.md` → `ui.ux.md`. Gunakan `verification.md` sebagai daftar pemeriksaan dan tempat mencatat hasil. Nama merek: Iris Bakery.

## 2. Prasyarat
- Editor kode, browser modern, Python 3, dan Git jika menggunakan kontrol versi.
- Node.js opsional untuk pemeriksaan sintaks; bukan dependensi runtime website.
- Data usaha sebelum peluncuran: nomor WhatsApp internasional, alamat toko, jam buka, harga final, **20 foto produk dari pemilik usaha**, area dan ongkos antar, masa tunggu pesanan, metode pembayaran, kebijakan pembatalan, serta informasi alergen dan masa simpan.
- Dilarang menggunakan nomor contoh sebagai penerima pesanan aktif. Jika nomor asli belum tersedia, nonaktifkan pemesanan.
- Foto belum tersedia saat dokumen ini dibuat. Sebelum membuat katalog, minta foto kepada pemilik usaha. Jangan memakai foto internet tanpa izin; gambar pengganti sementara harus ditandai jelas.

## 3. Langkah implementasi
1. **Siapkan struktur:** buat berkas dan direktori runtime sesuai `arsitektur.md`; mulai dari `index.html`, `css/styles.css`, dan modul `js/`.
2. **Definisikan konfigurasi:** masukkan nama usaha, kontak publik, alamat, jam operasional, dan `MIN_LEAD_DAYS` (asumsi 1) di `js/config.js`. Nomor WhatsApp usaha memakai kode negara dan digit saja, tanpa `+`, spasi, atau awalan nol lokal.
3. **Buat katalog:** tambahkan tepat 20 produk sesuai daftar di `prd.md` (12 `dessert-bakery`, 8 `drinks`). Setiap item memiliki ID unik, nama, kategori, deskripsi, harga integer positif, path gambar lokal `assets/images/<id>.webp`, dan alt. Tandai harga dan deskripsi sebagai contoh selama belum diverifikasi pemilik usaha.
4. **Siapkan foto:** (sudah dikerjakan) letakkan foto dari pemilik usaha di `assets/images/`, ubah ke WebP dengan rasio seragam (misalnya 4:3 atau 1:1), periksa bahwa tiap foto sesuai nama produk, dan catat asal/lisensi.
5. **Bangun HTML semantik:** header, hero, katalog, keranjang, formulir, ringkasan, cara pesan, FAQ, kontak, footer, dan `noscript`. Muat `js/config.js`, `data.js`, `cart.js`, `storage.js`, `checkout.js`, lalu `app.js` sebagai skrip klasik berurutan (saling terhubung lewat namespace `Iris`).
6. **Terapkan CSS mobile-first:** token warna palet Iris Bakery (`#78001F`, `#C6427A`, `#D982A5`, `#F1B2CA`, `#F9D0DF`) sebagai custom properties, tipografi, grid kartu, kontrol formulir, status/error, animasi halus, dan focus-visible. Pada layar kecil tampilkan satu kolom; tambah kolom sesuai ruang konten.
7. **Implementasikan katalog:** pencarian tanpa membedakan huruf besar/kecil, filter kategori (Semua, Dessert & Bakery, Drinks), jumlah hasil, dan keadaan kosong. Pencarian dan filter harus dapat digabungkan.
8. **Implementasikan keranjang:** satu sumber state, tambah/ubah/hapus berdasarkan ID; tolak jumlah selain integer 1–99. Gunakan harga katalog saat menghitung ulang.
9. **Implementasikan metode dan tanggal:** pilihan ambil/antar, validasi tanggal nyata dan minimal hari ini ditambah `MIN_LEAD_DAYS` seperti `arsitektur.md`; tampilkan petunjuk masa tunggu. Kolom alamat wajib hanya untuk metode antar.
10. **Implementasikan penyimpanan:** hanya ID, jumlah, metode, tanggal, dan versi skema (kunci `iris-bakery:cart:v1`). Tangani JSON rusak, versi tidak dikenal, item hilang, dan akses storage yang ditolak tanpa crash.
11. **Implementasikan pengajuan:** validasi nama/kontak/alamat sesuai `ui.ux.md`, tampilkan ringkasan, lalu bentuk tautan WhatsApp dari state terbaru dengan `encodeURIComponent`. Perubahan input setelah pemeriksaan membatalkan status pemeriksaan. Jangan otomatis mengirim atau mengosongkan keranjang.
12. **Lengkapi konten:** aturan konfirmasi stok, estimasi harga, ongkir, pembayaran, pembatalan, alergen, masa simpan, dan penggunaan data saat beralih ke WhatsApp. Jangan mengarang alamat, stok, testimoni, klaim halal, atau ketentuan transaksi.
13. **Verifikasi:** jalankan pemeriksaan di bawah dan di `verification.md`, perbaiki masalah, dan catat hasil sebelum deployment.

## 4. Menjalankan lokal
Dari direktori proyek setelah berkas aplikasi dibuat:
```bash
python3 -m http.server 5500 --bind 127.0.0.1
```
Buka `http://localhost:5500`. Hentikan dengan Ctrl+C. Karena memakai skrip klasik, `index.html` juga dapat dibuka langsung (klik dua kali) melalui `file://`; server lokal tetap disarankan untuk menyerupai hosting. Tidak perlu `npm install` atau proses build.

## 5. Aturan penulisan kode
- Gunakan indentasi 2 spasi, UTF-8, nama file huruf kecil, dan kebab-case untuk kelas CSS serta ID HTML.
- Variabel/fungsi JavaScript memakai camelCase; konstanta konfigurasi tetap memakai UPPER_SNAKE_CASE.
- Gunakan `const` secara default dan `let` saat perlu mutasi; hindari `var`, global yang tidak diperlukan, dan inline handler seperti `onclick`.
- Pisahkan tanggung jawab per berkas JavaScript (skrip klasik dalam IIFE yang mengekspor lewat `Iris`). Perhitungan harga dan validasi tanggal dibuat sebagai fungsi murni agar mudah diperiksa.
- Pisahkan data, state, logika, dan render; jangan menghitung total dengan membaca teks harga dari DOM.
- Gunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` untuk format rupiah.
- Render input/data dinamis melalui `textContent` atau DOM API. Jangan memasukkan input pengguna ke `innerHTML`.
- Tangani kegagalan localStorage dan validasi input secara eksplisit. Jangan mencatat nama, nomor kontak, atau alamat ke console.
- Tulis komentar untuk alasan keputusan yang tidak jelas, bukan mengulang operasi kode.
- Gunakan aset lokal dengan nama deskriptif (`<id-produk>.webp`). Catat asal/lisensi aset yang memerlukannya.
- Jangan memasukkan token, rahasia, file `.env`, atau data pelanggan ke repository dan paket deployment.

## 6. Pemeriksaan sebelum rilis
| Skenario | Hasil yang diharapkan |
| --- | --- |
| Katalog pertama dibuka | 20 produk tampil, tanpa error console atau foto hilang |
| Hitung kategori | 12 produk Dessert & Bakery dan 8 produk Drinks |
| Cari nama + pilih kategori | Hasil memenuhi kedua kondisi; reset mengembalikan katalog |
| Tambah produk sama dua kali | Satu baris dengan jumlah 2 |
| Jumlah 0, negatif, desimal, atau 100 | Ditolak dengan pesan jelas |
| Dua OG Salt Bread 25.000 + satu Mocha Latte 35.000 | Total Rp85.000 |
| Tanggal kemarin, hari ini (bila masa tunggu H+1), atau tanggal tidak nyata (31 Februari) | Pengajuan ditolak |
| Tanggal lintas bulan/tahun dan 29 Februari tahun kabisat | Diterima dan dibandingkan dengan benar |
| Metode antar tanpa alamat | Ditolak dan fokus ke kolom alamat |
| Keranjang kosong atau kontak invalid | Fokus menuju masalah pertama dan ada penjelasan |
| Reload, data JSON rusak, atau storage ditolak | State valid dipulihkan atau aplikasi pulih dengan aman |
| Produk dihapus/harga diubah pada katalog | ID hilang diabaikan; harga terkini dipakai |
| Nama/catatan mengandung `<`, `&`, tanda kutip, atau baris baru | Ditampilkan sebagai teks dan URL tetap ter-encode |
| Nomor usaha kosong | Tombol pengajuan tidak aktif |
| WhatsApp dibuka | Draf lengkap; pengguna masih perlu menekan kirim |
| Keranjang diubah sesudah ringkasan | Ringkasan harus diperiksa ulang sebelum membuka WhatsApp |
| Lebar 360, 768, 1280 px dan zoom 200% | Konten terbaca dan kontrol tidak terpotong |
| Keyboard tanpa mouse | Urutan fokus masuk akal dan semua aksi dapat dijalankan |

Periksa juga reflow pada 320 CSS px, kontras palet pink, alt gambar, label formulir, dan reduced motion. Jika browser atau perangkat tertentu tidak tersedia, catat keterbatasan pemeriksaan. Automasi pengujian fungsi murni dapat ditambahkan bila logika berkembang; tidak perlu framework pengujian untuk sekadar konten statis.

Jika Node.js tersedia, jalankan pengujian fungsi murni dan periksa sintaks dari root:
```bash
npm test
node --check js/app.js
```
Ulangi `node --check` untuk berkas lain. Pemeriksaan sintaks tidak menggantikan pemeriksaan alur di browser.

## 7. Proses deployment statis
Rencana penyedia: Cloudflare Pages. Prosedur dashboard dan ketersediaan fitur perlu diverifikasi pada saat eksekusi. Tidak memerlukan backend, database, atau environment variable rahasia.

1. Pastikan data usaha sudah benar, foto berizin, nomor tujuan valid, dan seluruh pemeriksaan penerimaan lulus.
2. Siapkan folder paket publik yang hanya berisi `index.html`, `css/`, `js/`, dan `assets/`. Jangan sertakan dokumentasi internal, `.git/`, atau data pribadi.
3. Jalankan server lokal dengan folder paket sebagai root dan periksa seluruh tautan serta path aset. Gunakan path relatif agar tetap dapat dihosting di subpath bila diperlukan.
4. Buat proyek hosting statis dan unggah paket melalui fasilitas unggah langsung yang tersedia. Paket ini tidak memerlukan perintah build atau fungsi server.
5. Gunakan URL HTTPS hasil hosting untuk smoke test: muat halaman, cari produk, tambah keranjang, pilih tanggal, dan buka draf WhatsApp tanpa mengirim pesan uji ke pihak lain.
6. Bila memakai domain sendiri, atur DNS sesuai instruksi penyedia, lalu periksa sertifikat HTTPS dan ulangi smoke test pada origin final.
7. Catat URL, tanggal rilis, versi/commit sumber, paket yang diunggah, dan hasil pemeriksaan dalam catatan rilis.

## 8. Rollback dan pemeliharaan
Simpan paket rilis sebelumnya. Jika rilis baru bermasalah, gunakan fitur rollback penyedia bila tersedia atau unggah ulang paket sebelumnya; periksa halaman dan alur utama. Perubahan domain/origin membuat localStorage lama tidak ikut berpindah. Untuk pembaruan katalog (produk musiman, harga, atau foto baru), jaga ID produk tetap stabil, periksa harga, dan ulangi pemeriksaan hitung. Jika skema penyimpanan berubah, naikkan versi dan sediakan reset/migrasi yang aman.

## 9. Definition of Done
Implementasi dianggap selesai setelah fitur dan kriteria penerimaan di `prd.md` terpenuhi, data usaha dan 20 foto produk dikonfirmasi, aksesibilitas dasar diperiksa, aset serta console bersih dari error, dan hasil pengujian dicatat di `verification.md`. Deployment hanya dianggap selesai setelah URL hosting dapat diakses dan smoke test lulus. Dokumentasi harus diperbarui jika keputusan teknis atau aturan bisnis berubah.
