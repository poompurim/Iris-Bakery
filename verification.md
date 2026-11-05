# Catatan Verifikasi — Iris Bakery

Tanggal dokumen: 1 November 2026. Status: implementasi MVP selesai; deployment belum dilakukan. Baris di bawah hanya berstatus `Lulus` bila benar-benar diperiksa (pengujian otomatis `npm test` dan smoke test Chromium/Playwright pada 1 November 2026). Sisanya masih `Belum diperiksa`.

Keterangan status: `Belum diperiksa`, `Lulus`, `Gagal`, atau `Tidak dapat diperiksa` (sertakan alasan).

## Hasil pemeriksaan

### Katalog dan konten
| Pemeriksaan | Status | Catatan |
| --- | --- | --- |
| Jumlah produk tepat 20, ID unik | Lulus | npm test |
| 12 produk Dessert & Bakery dan 8 produk Drinks | Lulus | npm test |
| Setiap produk memiliki nama, kategori, harga integer positif, deskripsi, foto, dan alt | Lulus | npm test |
| Setiap foto relevan dengan nama produk dan berasal dari pemilik usaha | Belum diperiksa | 20 foto dari pemilik usaha dimuat; pencocokan nama-foto perlu ditinjau pemilik (Biscoff Latte memakai Lotus_Latte.png) |
| Pencarian + filter kategori gabungan, reset, dan hasil kosong | Lulus | Chromium: 4 hasil cookie, kosong, reset kembali ke 20 |

### Logika keranjang, tanggal, dan biaya
| Pemeriksaan | Status | Catatan |
| --- | --- | --- |
| Produk sama digabung; jumlah 0, negatif, desimal, dan 100 ditolak | Lulus | npm test |
| 2 OG Salt Bread (25.000) + 1 Mocha Latte (35.000) = Rp85.000 | Lulus | npm test (Rp85.000 dengan harga final) |
| Tanggal lampau, di bawah masa tunggu, dan tidak nyata ditolak; lintas bulan/tahun dan kabisat diterima | Lulus | npm test: kemarin, hari ini, 31 Feb ditolak; lintas bulan/tahun dan 29 Feb 2028 diterima |
| Alamat wajib untuk metode antar; tidak wajib untuk ambil di toko | Lulus | Chromium: fokus ke alamat bila antar tanpa alamat |
| Validasi nama, nomor WhatsApp (awalan 08/62), dan catatan | Lulus | npm test |
| Pemulihan storage: reload, JSON rusak, versi tidak dikenal, ID hilang, akses ditolak | Lulus | npm test dan reload Chromium |
| Privasi: nama, nomor, alamat, dan catatan tidak tersimpan di localStorage atau console | Lulus | npm test dan isi localStorage hanya versi, ID, jumlah, metode, tanggal |
| Encoding draf WhatsApp dengan `<`, `&`, tanda kutip, dan baris baru | Lulus | npm test |
| Nomor usaha kosong menonaktifkan tombol pengajuan | Lulus | npm test dan Chromium: nomor kosong menonaktifkan tombol WhatsApp |

### Browser, responsif, dan aksesibilitas
| Pemeriksaan | Status | Catatan |
| --- | --- | --- |
| Smoke test browser Chromium: katalog, filter, keranjang, tanggal, ringkasan | Lulus | Playwright, lewat file:// dan http:// |
| Browser kedua (Safari atau Firefox) | Belum diperiksa | |
| Tanpa gulir horizontal pada 320, 360, 768, dan 1280 CSS px | Belum diperiksa | Lebar 360 dan 1280 tanpa gulir horizontal; 320, 768, dan 1280 lainnya belum |
| Zoom 200% dan reflow 320 CSS px | Belum diperiksa | |
| Keyboard: skip link, urutan fokus, fokus ke field salah pertama | Belum diperiksa | |
| Kontras palet pink (teks, tombol, hover, fokus, disabled) | Belum diperiksa | |
| Alt gambar, label formulir, `aria-live`, dan `prefers-reduced-motion` | Belum diperiksa | |
| Tidak ada error console atau respons aset berstatus gagal | Lulus | Tanpa error console atau gambar gagal pada alur utama |
| Total ukuran aset halaman (target sekitar ≤ 2 MB) | Lulus | sekitar 0,3 MB untuk 20 foto + logo |

### Uji pengguna dan metrik PRD
| Pemeriksaan | Status | Catatan |
| --- | --- | --- |
| Uji tugas 5 calon pelanggan (target ≥ 4 dari 5 berhasil; median ≤ 3 menit) | Belum diperiksa | |
| Rekap kelengkapan pesan 30 hari setelah rilis | Belum diperiksa | Hanya mungkin setelah peluncuran |

## Cara menjalankan pemeriksaan

1. Jalankan server lokal sesuai `instruction.md` (`python3 -m http.server 5500 --bind 127.0.0.1`).
2. Jalankan skenario pada tabel “Pemeriksaan sebelum rilis” di `instruction.md` dan catat status di atas.
3. Bila Node.js tersedia, periksa sintaks setiap modul di `js/` dengan `node --input-type=module --check < js/<modul>.js`. Pengujian fungsi murni dan smoke test browser otomatis boleh ditambahkan pada `tests/` bila logika berkembang; jangan menandai pengujian otomatis sebagai ada sebelum berkasnya dibuat dan dijalankan.
4. Jangan membuka atau mengirim pesan WhatsApp ke pihak lain selama pengujian; gunakan nomor uji hanya di memori.

## Batas verifikasi dan kesiapan rilis

- Implementasi ada; hanya baris berstatus `Lulus` yang sudah diperiksa.
- Foto 20 produk sudah diterima; kecocokan nama-foto dan hak penggunaan dikonfirmasi pemilik usaha.
- Nomor WhatsApp usaha, alamat, jam operasional, area dan ongkos antar, masa tunggu pesanan, metode pembayaran, kebijakan pembatalan, serta informasi alergen belum disediakan. Selama nomor usaha kosong, tombol pengajuan WhatsApp harus nonaktif.
- Harga dari pemilik usaha (Honey Croffle Rp25.000 untuk 3 pcs perlu dikonfirmasi); deskripsi masih contoh.
- Audit WCAG formal, pengujian screen reader, dan pengujian perangkat fisik belum direncanakan secara spesifik; catat keterbatasan bila tidak dilakukan.
- Tidak ada backend, stok real-time, pembayaran, atau penyimpanan transaksi. Seluruh konfirmasi dilakukan manual setelah pengguna mengirim pesan.
- Belum ada URL hosting atau pengujian produksi. Peluncuran memerlukan data usaha, foto, dan pemeriksaan rilis yang belum dilakukan.

## Catatan rilis (diisi saat deployment)

| Item | Nilai |
| --- | --- |
| URL hosting | Belum ada |
| Tanggal rilis | Belum ada |
| Versi/commit sumber | Belum ada |
| Paket yang diunggah | Belum ada |
| Hasil smoke test pada origin final | Belum diperiksa |
