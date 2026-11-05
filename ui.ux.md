# Panduan UI/UX — Iris Bakery

## 1. Arah desain
Tampilan pink aesthetic bakery yang modern, elegan, minimalis, dan feminine tetapi tidak childish. Layout bersih dengan whitespace cukup, sudut membulat, tipografi mudah dibaca, dan animasi sederhana yang halus. Foto produk menjadi fokus utama. Fokus pengguna adalah menemukan produk, memahami harga, dan menyusun pesanan. Semua teks antarmuka menggunakan bahasa Indonesia, termasuk pesan kesalahan. Target pengguna: remaja hingga dewasa.

## 2. Token visual awal
Palet merek: Dark Maroon `#78001F`, Raspberry Pink `#C6427A`, Dusty Pink `#D982A5`, Soft Pink `#F1B2CA`, Light Pink `#F9D0DF`.

| Elemen | Nilai/pedoman |
| --- | --- |
| Latar utama | `#FFF8FA` (putih bersemu pink; warna netral pendukung, asumsi) |
| Latar seksi bergantian | Light Pink `#F9D0DF`, dipakai hemat |
| Permukaan kartu | `#FFFFFF`, border tipis Soft Pink `#F1B2CA` |
| Judul dan teks penekanan | Dark Maroon `#78001F` |
| Teks isi | `#3B1B25` (maroon gelap netral, asumsi) |
| Teks sekunder | `#6B4150` (asumsi; verifikasi kontras) |
| Warna aksi utama | Raspberry Pink `#C6427A`, dengan teks putih (perkiraan ±5:1; verifikasi) |
| Hover tombol utama | Dark Maroon `#78001F`, teks putih |
| Aksen dekoratif | Dusty Pink `#D982A5` untuk garis, ikon, dan lencana; bila menjadi latar, teks memakai `#78001F`. Tidak dipakai sebagai teks pada latar terang |
| Soft Pink `#F1B2CA` | Latar chip kategori, border, dan highlight dengan teks `#78001F` |
| Kesalahan | `#B42318`, selalu disertai teks dan ikon/penanda |
| Font judul | `Georgia, "Times New Roman", serif` |
| Font isi | `system-ui, sans-serif` |
| Teks dasar | 16 px, line-height 1.5–1.6 |
| Radius | Kartu 20 px, input/tombol 12 px, chip 999 px |
| Bayangan | Lembut, berwarna maroon transparan rendah |
| Spasi | Kelipatan 4/8 px; jarak antarbagian 56–88 px |
| Lebar konten | Maksimum 1200 px, padding sisi minimal 16 px |
| Animasi | Transisi 150–250 ms (hover, fokus, fade-in kartu); dimatikan pada `prefers-reduced-motion` |

Verifikasi kontras setiap pasangan warna pada implementasi, termasuk hover, fokus, dan disabled. Jangan memakai teks putih pada Dusty Pink atau Soft Pink.

## 3. Susunan halaman
Header → hero → katalog → keranjang dan formulir → cara pesan → informasi pemesanan/FAQ → kontak dan footer. Pada desktop, keranjang dapat menjadi kolom kanan katalog. Pada ponsel, gunakan bagian keranjang di bawah katalog dengan tombol menuju keranjang yang menampilkan jumlah item. Hindari modal pada MVP agar alur keyboard lebih sederhana.

## 4. User journey
| Tahap | Tujuan pengguna | Respons antarmuka |
| --- | --- | --- |
| Mengenal | Memastikan Iris Bakery sesuai selera | Judul, foto hero, keterangan pre-order, tombol “Lihat menu” |
| Menemukan | Memilih dessert, bakery, atau minuman | Pencarian, filter kategori, foto besar, deskripsi, harga |
| Menyusun | Mengatur isi pesanan | Tambah produk, jumlah, hapus, indikator jumlah keranjang |
| Menjadwalkan | Menentukan metode dan tanggal | Pilihan ambil/antar, tanggal, petunjuk masa tunggu |
| Memeriksa | Menghindari kesalahan | Ringkasan produk, jumlah, total, kontak, alamat, dan ketentuan |
| Menghubungi | Meminta konfirmasi pengelola | Tombol “Pesan via WhatsApp” dan keterangan pengguna perlu mengirim pesan |

## 5. Wireframe
### Desktop
```text
┌──────────────────────────────────────────────────────────┐
│ Iris Bakery        Menu  Cara pesan  FAQ  Kontak           │
├──────────────────────────────────────────────────────────┤
│ Manis yang dibuat dengan hati.        Foto hero produk     │
│ [Lihat menu]                                              │
├────────────────────────────────────┬─────────────────────┤
│ Menu                               │ Keranjang (3 item)  │
│ [Cari produk...]                   │ Produk / jumlah     │
│ [Semua] [Dessert & Bakery] [Drinks]│ Ambil / Antar       │
│ [Kartu]  [Kartu]  [Kartu]           │ Tanggal             │
│ [Kartu]  [Kartu]  [Kartu]           │ Total estimasi      │
│ [Kartu]  [Kartu]  [Kartu]           │ Nama / WhatsApp     │
│                                    │ [Periksa pesanan]   │
├────────────────────────────────────┴─────────────────────┤
│ Cara pesan → Informasi dan FAQ → Kontak → Footer          │
└──────────────────────────────────────────────────────────┘
```
### Ponsel
```text
┌────────────────────────────┐
│ Iris Bakery   [Keranjang]  │
│ Judul dan deskripsi       │
│ [Lihat menu]              │
│ [Cari produk...]          │
│ [Kategori ▼]              │
│ [Kartu produk]            │
│ [Kartu produk]            │
│ Keranjang dan jumlah      │
│ Ambil / Antar, tanggal    │
│ Estimasi total            │
│ Formulir dan ringkasan    │
│ [Pesan via WhatsApp]      │
│ Cara pesan / FAQ / kontak │
└────────────────────────────┘
```

## 6. Komponen dan keadaan
- **Navigasi:** tautan anchor, fokus terlihat, skip link menuju konten utama.
- **Kartu produk:** foto dengan rasio tetap dan sudut membulat sebagai elemen dominan, nama, deskripsi singkat, harga “Rp25.000”, lencana kategori, tombol “Tambah”. Tidak menampilkan klaim stok tersedia. Hover berupa pengangkatan ringan kartu dan zoom foto yang halus.
- **Pencarian/filter:** label jelas, jumlah hasil, tombol reset jika tidak ada hasil; kategori aktif terlihat dan terpapar secara semantik.
- **Kontrol jumlah:** tombol kurang/tambah serta input bilangan dengan label produk; minimum 1, maksimum 99. Penghapusan melalui tombol “Hapus”.
- **Metode dan tanggal:** pilihan radio “Ambil di toko” / “Antar”, label “Tanggal pengambilan/pengantaran”, petunjuk masa tunggu minimum, dan error dekat field. Kolom alamat hanya muncul untuk metode antar.
- **Ringkasan:** nama produk, jumlah, harga satuan, subtotal, dan total estimasi, disertai keterangan “Belum termasuk ongkos kirim”. Saat keranjang kosong tampilkan pesan keranjang kosong.
- **Formulir kontak:** nama 2–80 karakter setelah trim; nomor WhatsApp 8–15 digit setelah spasi, tanda hubung, kurung, dan tanda tambah awal dinormalisasi, menerima awalan 08 maupun 62; alamat 10–200 karakter bila diantar; catatan opsional maksimum 200 karakter. Jangan mengklaim validasi memastikan nomor terdaftar.
- **Pemeriksaan pesanan:** tampilkan ringkasan dalam halaman, sediakan “Ubah pesanan” dan “Pesan via WhatsApp”. Perubahan keranjang, metode, atau tanggal mengharuskan pemeriksaan ulang.
- **Pemberitahuan:** penambahan produk dan kegagalan penyimpanan memakai area status; hindari notifikasi yang merebut fokus.
- **FAQ:** elemen `details` dan `summary` untuk interaksi native (pembayaran, pembatalan, alergen, masa simpan, area antar).

## 7. Contoh microcopy
- Keranjang kosong: “Keranjangmu masih kosong. Pilih menu favoritmu untuk memulai.”
- Hasil kosong: “Produk tidak ditemukan. Coba kata lain atau reset filter.”
- Tanggal salah: “Pilih tanggal paling cepat besok.” (mengikuti nilai masa tunggu di konfigurasi)
- Alamat kurang: “Alamat pengantaran wajib diisi minimal 10 karakter.”
- Penyimpanan gagal: “Keranjang dapat digunakan, tetapi belum bisa disimpan pada browser ini.”
- Sebelum WhatsApp: “Nama, nomor kontak, alamat (jika diantar), dan rincian pesanan akan dibuka di WhatsApp. Kirim pesan untuk meminta konfirmasi stok dan ongkos kirim. Total ini adalah estimasi harga produk.”
- Pemesanan belum dikonfigurasi: “Pemesanan online belum tersedia. Silakan gunakan kontak toko yang tercantum.” Hanya tampilkan kontak yang benar-benar sudah disediakan.

## 8. Aksesibilitas
Target implementasi mengacu pada prinsip WCAG 2.2 tingkat AA, dengan verifikasi sebelum mengklaim kepatuhan.
- Gunakan `lang="id"`, landmark semantik, satu `h1`, dan urutan heading logis.
- Semua fungsi bisa digunakan melalui keyboard; jangan membuat kartu `div` sebagai tombol.
- Setiap input memiliki `label`; error dihubungkan melalui `aria-describedby` dan `aria-invalid`.
- Setelah validasi gagal, fokus ke field salah pertama. Pembaruan keranjang memakai `aria-live="polite"` tanpa membacakan ulang seluruh halaman.
- Targetkan kontras teks normal minimal 4.5:1 dan teks besar 3:1; kontrol serta indikator fokus minimal 3:1 terhadap warna sekitar. Indikator fokus memakai garis Dark Maroon atau Raspberry yang jelas.
- Target sentuh minimal 44 × 44 CSS px, fokus terlihat, dan tidak tertutup elemen sticky.
- Informasi tidak bergantung hanya pada warna atau hover. Foto produk memiliki alt yang menjelaskan produk; gambar dekoratif memakai alt kosong.
- Dukung pembesaran teks dan zoom 200%; periksa reflow hingga 320 CSS px.
- Hormati `prefers-reduced-motion`; animasi tidak diperlukan untuk menjalankan tugas.

## 9. Validasi pengalaman
Jalankan skenario tambah beberapa produk dari dua kategori, ubah jumlah, pilih tanggal terlalu cepat, koreksi tanggal, ganti metode ke antar, periksa total, dan buka WhatsApp. Ulangi dengan keyboard serta layar kecil. Catat hambatan 5 calon pelanggan dan perbaiki hambatan utama sebelum peluncuran.
