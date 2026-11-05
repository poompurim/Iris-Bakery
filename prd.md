# Product Requirement Document — Iris Bakery

Status: implementasi MVP tersedia di repositori ini; deployment belum dilakukan. Nama “Iris Bakery” berasal dari pemilik usaha; deskripsi, nomor WhatsApp, alamat toko, jam operasional, area antar, dan ongkos kirim adalah asumsi atau data contoh yang harus diganti dengan data usaha sebelum peluncuran. Harga final dan 20 foto produk sudah diberikan pemilik usaha.

## 1. Visi produk
Memperkenalkan Iris Bakery dan memudahkan pelanggan memilih dessert, bakery, serta minuman manis lalu mengajukan pemesanan melalui website berbahasa Indonesia yang ringan, elegan, dan nyaman dipakai di ponsel.

## 2. Masalah yang dipecahkan
- Pelanggan harus bertanya satu per satu untuk mengetahui menu, harga, dan deskripsi produk.
- Pesanan melalui percakapan sering tidak mencantumkan jumlah, tanggal ambil/antar, atau alamat secara lengkap.
- Pelanggan tidak mengetahui perkiraan total sebelum menghubungi penjual.
- Pengelola perlu menerima pesanan yang terstruktur agar konfirmasi stok dan pembayaran lebih cepat.

## 3. Target pengguna
| Pengguna | Kebutuhan utama |
| --- | --- |
| Remaja dan mahasiswa | Melihat produk menarik dengan harga jelas dan memesan lewat ponsel |
| Dewasa muda dan pekerja | Memesan cepat untuk diri sendiri, kolega, atau hadiah kecil |
| Pemesan untuk acara kecil | Memesan beberapa jenis produk dengan jumlah berbeda untuk tanggal tertentu |
| Pengelola Iris Bakery | Menerima ringkasan pesanan untuk pengecekan stok dan tindak lanjut |

## 4. Ruang lingkup MVP
1. Beranda berisi pengenalan Iris Bakery, ajakan melihat katalog, alur pemesanan, dan kontak.
2. Katalog tepat 20 produk dengan nama, kategori, deskripsi, foto lokal, dan harga per item dalam rupiah.
3. Pencarian berdasarkan nama dan filter kategori: Semua, Dessert & Bakery, dan Drinks.
4. Keranjang: tambah produk, ubah jumlah, hapus produk, dan tampilkan subtotal.
5. Pilihan metode: ambil di toko atau antar, tanggal pengambilan/pengantaran, dan catatan opsional.
6. Formulir nama, nomor WhatsApp, dan alamat (hanya untuk metode antar), lalu ringkasan pesanan yang dapat diperiksa sebelum membuka WhatsApp toko.
7. Penyimpanan keranjang pada browser yang sama dengan localStorage, termasuk pemulihan aman jika data rusak.
8. Informasi pemesanan, pembayaran, pembatalan, alergen, FAQ, dan pemberitahuan bahwa stok perlu dikonfirmasi.
9. Tata letak responsif dan interaksi yang dapat dioperasikan menggunakan keyboard.

### Daftar produk (tepat 20)
Harga berasal dari pemilik usaha (Honey Croffle: Rp25.000 untuk 3 pcs, perlu dikonfirmasi); deskripsi masih contoh dan harus diverifikasi. ID bersifat stabil dan dipakai sebagai nama berkas foto (`assets/images/<id>.webp`).

**Dessert & Bakery (12 produk)**
| No | ID | Nama | Harga (IDR) | Deskripsi singkat |
| --- | --- | --- | --- | --- |
| 1 | `og-salt-bread` | OG Salt Bread | 25.000 | Roti garam gulung klasik dengan bagian dalam lembut dan bawah renyah berbalut mentega |
| 2 | `garlic-cream-cheese-salt-bread` | Garlic Cream Cheese Salt Bread | 38.000 | Salt bread berisi krim keju gurih dengan aroma bawang putih panggang |
| 3 | `dubai-chocolate-salt-bread` | Dubai Chocolate Salt Bread | 45.000 | Salt bread isi krim pistachio, kataifi renyah, dan cokelat |
| 4 | `truffle-beef-ham-salt-bread` | Truffle Beef Ham Salt Bread | 53.000 | Salt bread isi beef ham, keju, dan saus beraroma truffle |
| 5 | `cheese-cake` | Cheese Cake | 38.000 | Potongan cheesecake lembut dengan dasar biskuit renyah |
| 6 | `matcha-cheese-cake` | Matcha Cheese Cake | 40.000 | Cheesecake rasa matcha dengan krim lembut dan sedikit pahit yang seimbang |
| 7 | `tiramisu` | Tiramisu | 42.000 | Lapisan biskuit kopi, krim mascarpone, dan taburan kakao |
| 8 | `dubai-chewy-cookie` | Dubai Chewy Cookie | 35.000 | Cookie kenyal berisi krim pistachio dan kataifi |
| 9 | `og-cookie` | OG Cookie | 20.000 | Cookie cokelat chip klasik, renyah di tepi dan kenyal di tengah |
| 10 | `red-velvet-cheese-cookie` | Red Velvet Cheese Cookie | 25.000 | Cookie red velvet dengan isian krim keju manis |
| 11 | `cookie-monster` | Cookie Monster | 28.000 | Cookie berukuran besar dengan campuran cokelat, kacang, dan potongan biskuit |
| 12 | `honey-croffle` | Honey Croffle | 25.000 / 3 pcs | Croissant yang dipanggang seperti waffle, disiram madu dan mentega |

**Drinks (8 produk)**
| No | ID | Nama | Harga (IDR) | Deskripsi singkat |
| --- | --- | --- | --- | --- |
| 13 | `mocha-latte` | Mocha Latte | 35.000 | Perpaduan espresso, cokelat, dan susu |
| 14 | `matcha-latte` | Matcha Latte | 45.000 | Matcha dengan susu, rasa lembut dan creamy |
| 15 | `matcha-ube` | Matcha Ube | 55.000 | Matcha dan ube berlapis dengan susu |
| 16 | `matcha-corn-milk` | Matcha Corn Milk | 50.000 | Matcha dengan susu jagung manis |
| 17 | `biscoff-latte` | Biscoff Latte | 35.000 | Latte beraroma karamel biskuit dengan taburan remah Biscoff |
| 18 | `mango-smoothies` | Mango Smoothies | 32.000 | Smoothies mangga segar yang manis dan menyegarkan |
| 19 | `mix-berries-smoothies` | Mix Berries Smoothies | 38.000 | Smoothies campuran beri dengan rasa manis asam |
| 20 | `vanilla-milkshake` | Vanilla Milkshake | 30.000 | Milkshake vanila kental dan lembut |

Aturan konten: jumlah produk harus tepat 20, setiap produk memiliki nama, kategori, harga, deskripsi, foto, dan teks alt. Deskripsi tidak boleh mengklaim halal, bebas alergen, atau bahan tertentu sebelum diverifikasi pemilik usaha.

### Di luar MVP
Akun pengguna, panel admin, stok real-time, pembayaran online, pelacakan pengiriman, kalkulasi ongkir otomatis, kode promo, ulasan pelanggan, dan database pesanan. Pengelola memperbarui katalog melalui berkas sumber.

## 5. Aturan bisnis
- Mata uang IDR; harga disimpan sebagai bilangan bulat rupiah dan ditampilkan menggunakan format Indonesia.
- Subtotal barang = harga × jumlah. Total produk = jumlah seluruh subtotal.
- Batas jumlah teknis 1–99 per produk; batas ini bukan informasi stok.
- Tanggal pengambilan/pengantaran harus tanggal nyata dan paling cepat hari ini ditambah masa tunggu minimum (asumsi awal: H+1, diatur di konfigurasi). Perbandingan memakai tanggal kalender lokal perangkat pengguna.
- Metode “Ambil di toko” tidak memerlukan alamat. Metode “Antar” mewajibkan alamat 10–200 karakter setelah trim.
- Ongkos kirim, biaya kemasan khusus, dan biaya lain belum dihitung. Total website adalah estimasi harga produk; pengelola menyampaikan biaya tambahan sebelum pelanggan menyetujui pesanan.
- Catatan opsional maksimum 200 karakter. Catatan tidak menjamin permintaan khusus dapat dipenuhi.
- Pengajuan WhatsApp tidak otomatis menjadi pesanan. Pesanan baru disepakati setelah pengelola memeriksa stok, jadwal, ongkir, dan pembayaran secara manual.
- Pengguna harus menekan kirim sendiri di WhatsApp. Website tidak dapat memastikan apakah pesan terkirim atau diterima.

## 6. Alur utama
Buka beranda → telusuri katalog → cari/filter → tambah produk → atur jumlah → pilih metode dan tanggal → isi kontak (dan alamat bila diantar) → periksa ringkasan dan ketentuan → buka WhatsApp → kirim pesan → pengelola mengonfirmasi stok, biaya, dan pembayaran secara manual.

## 7. Kriteria penerimaan
- Katalog menampilkan tepat 20 produk dengan ID unik dan kategori valid (12 Dessert & Bakery, 8 Drinks).
- Pencarian dan filter bekerja bersamaan; hasil kosong memiliki pesan dan tombol reset.
- Produk dengan ID yang sama digabung dalam satu baris keranjang.
- Keranjang kosong tidak dapat diajukan; jumlah tidak valid dan tanggal tidak valid ditolak dengan pesan jelas.
- Contoh verifikasi: 2 OG Salt Bread Rp25.000 dan 1 Mocha Latte Rp35.000 menghasilkan total Rp85.000.
- Pesan WhatsApp berisi nama, kontak, metode, alamat (bila antar), tanggal, nama dan jumlah produk, rincian harga, total estimasi, catatan, serta permintaan konfirmasi stok dan biaya tambahan.
- Jika nomor toko belum diatur, pengajuan dinonaktifkan dan petunjuk konfigurasi hanya ada dalam dokumentasi pengembang.
- Muat ulang memulihkan keranjang yang valid; kegagalan localStorage tidak menghentikan penggunaan katalog.
- Pada lebar 360 px tidak muncul gulir horizontal halaman; seluruh kontrol utama bisa digunakan dengan keyboard.
- Setiap foto produk relevan dengan namanya dan dimuat tanpa aset hilang.

## 8. Metrik keberhasilan
Target berikut merupakan sasaran awal, bukan hasil yang telah diukur.

| Metrik | Target awal | Cara ukur |
| --- | --- | --- |
| Keberhasilan tugas | ≥ 4 dari 5 peserta dapat menyusun pesanan tanpa bantuan | Uji tugas dengan calon pelanggan |
| Waktu menyusun pesanan | Median ≤ 3 menit | Uji tugas dari katalog sampai ringkasan |
| Kelengkapan pesanan | ≥ 90% pesan mencantumkan produk, jumlah, tanggal, metode, dan kontak | Rekap manual pengelola selama 30 hari |
| Akurasi estimasi | 100% skenario perhitungan yang disepakati lolos | Pemeriksaan kasus hitung sebelum rilis |
| Kemudahan seluler | Semua alur utama berhasil pada lebar 360, 768, dan 1280 px | Pemeriksaan responsif |

MVP tidak memasang analitik atau pelacak. Klik WhatsApp tidak dihitung sebagai transaksi berhasil.

## 9. Risiko dan dependensi
Katalog dapat tertinggal dari kondisi stok; tampilkan penjelasan konfirmasi manual. Produk segar memiliki masa simpan terbatas dan mungkin mengandung alergen (susu, telur, gluten, kacang, dan lainnya); informasi ini harus disediakan pengelola. WhatsApp bergantung pada layanan eksternal dan perangkat pengguna. Foto produk (dari pemilik usaha), nomor toko, alamat, jam operasional, area dan ongkos antar, masa tunggu pesanan, metode pembayaran, serta kebijakan pembatalan harus disediakan pengelola sebelum rilis.
