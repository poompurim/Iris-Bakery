// Skrip klasik: berjalan lewat file:// maupun server HTTP; saling terhubung lewat namespace Iris.
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const Iris = (root.Iris = root.Iris || {});
  const D = 'dessert-bakery', R = 'drinks';
  const p = (id, name, category, price, description, unit = '') => ({
    id, name, category, price, description, unit,
    image: `assets/images/${id}.webp`,
    imageAlt: `Foto ${name}`
  });
  // Harga dari pemilik usaha; deskripsi masih contoh dan perlu diverifikasi.
  const PRODUCTS = [
    p('og-salt-bread', 'OG Salt Bread', D, 25000, 'Roti garam gulung klasik dengan bagian dalam lembut dan bawah renyah berbalut mentega'),
    p('garlic-cream-cheese-salt-bread', 'Garlic Cream Cheese Salt Bread', D, 38000, 'Salt bread berisi krim keju gurih dengan aroma bawang putih panggang'),
    p('dubai-chocolate-salt-bread', 'Dubai Chocolate Salt Bread', D, 45000, 'Salt bread isi krim pistachio, kataifi renyah, dan cokelat'),
    p('truffle-beef-ham-salt-bread', 'Truffle Beef Ham Salt Bread', D, 53000, 'Salt bread isi beef ham, keju, dan saus beraroma truffle'),
    p('cheese-cake', 'Cheese Cake', D, 38000, 'Potongan cheesecake lembut dengan dasar biskuit renyah'),
    p('matcha-cheese-cake', 'Matcha Cheese Cake', D, 40000, 'Cheesecake rasa matcha dengan krim lembut dan sedikit pahit yang seimbang'),
    p('tiramisu', 'Tiramisu', D, 42000, 'Lapisan biskuit kopi, krim mascarpone, dan taburan kakao'),
    p('dubai-chewy-cookie', 'Dubai Chewy Cookie', D, 35000, 'Cookie kenyal berisi krim pistachio dan kataifi'),
    p('og-cookie', 'OG Cookie', D, 20000, 'Cookie cokelat chip klasik, renyah di tepi dan kenyal di tengah'),
    p('red-velvet-cheese-cookie', 'Red Velvet Cheese Cookie', D, 25000, 'Cookie red velvet dengan isian krim keju manis'),
    p('cookie-monster', 'Cookie Monster', D, 28000, 'Cookie berukuran besar dengan campuran cokelat, kacang, dan potongan biskuit'),
    p('honey-croffle', 'Honey Croffle', D, 25000, 'Croissant yang dipanggang seperti waffle, disiram madu dan mentega', '3 pcs'),
    p('mocha-latte', 'Mocha Latte', R, 35000, 'Perpaduan espresso, cokelat, dan susu'),
    p('matcha-latte', 'Matcha Latte', R, 45000, 'Matcha dengan susu, rasa lembut dan creamy'),
    p('matcha-ube', 'Matcha Ube', R, 55000, 'Matcha dan ube berlapis dengan susu'),
    p('matcha-corn-milk', 'Matcha Corn Milk', R, 50000, 'Matcha dengan susu jagung manis'),
    p('biscoff-latte', 'Biscoff Latte', R, 35000, 'Latte beraroma karamel biskuit dengan taburan remah Biscoff'),
    p('mango-smoothies', 'Mango Smoothies', R, 32000, 'Smoothies mangga segar yang manis dan menyegarkan'),
    p('mix-berries-smoothies', 'Mix Berries Smoothies', R, 38000, 'Smoothies campuran beri dengan rasa manis asam'),
    p('vanilla-milkshake', 'Vanilla Milkshake', R, 30000, 'Milkshake vanila kental dan lembut')
  ];
  const CATEGORIES = [
    { id: 'all', label: 'Semua' },
    { id: 'dessert-bakery', label: 'Dessert & Bakery' },
    { id: 'drinks', label: 'Drinks' }
  ];
  const categoryLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || id;
  Object.assign(Iris, { PRODUCTS, CATEGORIES, categoryLabel });
})();
