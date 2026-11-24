/**
 * ============================================================
 * Katalog Es Gabin - Mellowbites - JavaScript Application Logic
 * ============================================================
 */

// 1. Tailwind CDN Configuration
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        },
        colors: {
          brand: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
          }
        }
      }
    }
  };
}

// 2. Data 8 Varian Rasa Es Gabin
let PRODUCTS = [
  {
    id: 'gabin-double-choco',
    name: 'Double Choco',
    category: 'choco',
    isBestSeller: true,
    price: 8000,
    desc: 'Fla cokelat pekat ganda dengan lelehan choco chips di antara biskuit gabin renyah.',
    tag: 'Best Seller',
    tagColor: 'bg-amber-100 text-amber-900',
    flavorBg: 'bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-700',
    creamColor: '#5c3826',
    image: 'img/Double Choco.webp'
  },
  {
    id: 'gabin-strawberry',
    name: 'Strawberry',
    category: 'fruity',
    isBestSeller: false,
    price: 8000,
    desc: 'Fla stroberi manis asam segar buah alami, dingin sejuk menyegarkan harimu.',
    tag: 'Fruity Segar',
    tagColor: 'bg-rose-100 text-rose-800',
    flavorBg: 'bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400',
    creamColor: '#f43f5e',
    image: 'img/Strawberry.webp'
  },
  {
    id: 'gabin-vanilla-oreo',
    name: 'Vanilla Oreo',
    category: 'special',
    isBestSeller: true,
    price: 8000,
    desc: 'Fla vanila wangi lembut bertabur remahan biskuit Oreo asli yang renyah legit.',
    tag: 'Favorit Anak',
    tagColor: 'bg-slate-200 text-slate-800',
    flavorBg: 'bg-gradient-to-tr from-slate-800 via-stone-700 to-slate-600',
    creamColor: '#f1f5f9',
    image: 'img/vanilla oreo.webp'
  },
  {
    id: 'gabin-matcha-regal',
    name: 'Matcha Regal',
    category: 'special',
    isBestSeller: true,
    price: 8000,
    desc: 'Matcha otentik wangi khas Jepang dipadu remahan biskuit Marie Regal gurih.',
    tag: 'Signature',
    tagColor: 'bg-emerald-100 text-emerald-800',
    flavorBg: 'bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600',
    creamColor: '#059669',
    image: 'img/Matcha regal.webp'
  },
  {
    id: 'gabin-mango',
    name: 'Mango',
    category: 'fruity',
    isBestSeller: false,
    price: 8000,
    desc: 'Fla mangga tropis harum manis alami, tekstur creamy lumer saat digigit.',
    tag: 'Tropis Manis',
    tagColor: 'bg-amber-100 text-amber-900',
    flavorBg: 'bg-gradient-to-tr from-amber-600 via-yellow-500 to-orange-400',
    creamColor: '#f59e0b',
    image: 'img/Mango.webp'
  },
  {
    id: 'gabin-strawberry-matcha',
    name: 'Strawberry Matcha',
    category: 'special',
    isBestSeller: true,
    price: 8000,
    desc: 'Dua lapis fla istimewa: manis asam stroberi berpadu pekat aroma matcha premium.',
    tag: '2 Layer Rasa',
    tagColor: 'bg-pink-100 text-pink-800',
    flavorBg: 'bg-gradient-to-tr from-pink-600 via-emerald-700 to-rose-500',
    creamColor: '#ec4899',
    image: 'img/Strawberry Matcha.webp'
  },
  {
    id: 'gabin-durian-choco',
    name: 'Durian Choco',
    category: 'choco',
    isBestSeller: false,
    price: 8000,
    desc: 'Aroma fla durian asli yang legit harum berpadu saus lelehan cokelat pekat.',
    tag: 'Super Legit',
    tagColor: 'bg-yellow-100 text-yellow-900',
    flavorBg: 'bg-gradient-to-tr from-yellow-700 via-amber-800 to-amber-950',
    creamColor: '#ca8a04',
    image: 'img/Durian Choco.webp'
  },
  {
    id: 'gabin-Taro',
    name: 'Taro',
    category: 'special',
    isBestSeller: false,
    price: 8000,
    desc: 'Aroma khas taro manis lembut dengan tekstur fla dingin lumer dan gabin renyah.',
    tag: 'Sweet & Creamy',
    tagColor: 'bg-orange-100 text-orange-900',
    flavorBg: 'bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400',
    creamColor: '#fbbf24',
    image: 'img/Taro.webp'
  }
];

// 3. State & Storage Constants
const STORAGE_CART_KEY = 'mellowbites_es_gabin_cart_v1';
const STORAGE_NAME_KEY = 'mellowbites_customer_name';
const STORAGE_ADDRESS_KEY = 'mellowbites_customer_address';
const STORAGE_ORDER_HISTORY_KEY = 'mellowbites_order_history_v1';
let isStoreManuallyOpen = true;
let storeSettingsUpdatedAt = null;

let cart = {};
let currentCategory = 'all';
let searchQuery = '';
let selectedOrderMethod = 'pickup'; // 'pickup' | 'delivery'
let selectedPaymentMethod = 'qris'; // 'qris' | 'tunai'
let qrisProofFile = null;
let currentOrder = null;
let hasConfirmedWhatsApp = false;

// 4. LocalStorage Helpers
function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn('Gagal menyimpan cart ke localStorage:', err);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(STORAGE_CART_KEY);
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (parsed && typeof parsed === 'object') {
        cart = parsed;
      }
    }

    // Restore nama pemesan jika pernah diisi sebelumnya
    const savedName = localStorage.getItem(STORAGE_NAME_KEY);
    const nameInput = document.getElementById('customerName');
    if (savedName && nameInput) {
      nameInput.value = savedName;
    }

    // Restore alamat pengiriman / lokasi antar jika pernah diisi sebelumnya
    const savedAddress = localStorage.getItem(STORAGE_ADDRESS_KEY);
    const addressInput = document.getElementById('deliveryAddress');
    if (savedAddress && addressInput) {
      addressInput.value = savedAddress;
    }
  } catch (err) {
    console.warn('Gagal membaca dari localStorage:', err);
    cart = {};
  }
}

// 4b. LocalStorage Helper: Riwayat Pesanan Customer
function getCustomerOrderHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_ORDER_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Gagal membaca riwayat pesanan:', err);
    return [];
  }
}

function saveCustomerOrderHistory(order) {
  if (!order || !order.orderNumber) return;
  try {
    let history = getCustomerOrderHistory();
    // Hindari duplikasi jika orderNumber sudah ada
    history = history.filter(o => o.orderNumber !== order.orderNumber);
    // Masukkan pesanan terbaru di urutan pertama
    const cleanOrder = {
      ...order,
      timestamp: order.timestamp instanceof Date ? order.timestamp.toISOString() : (order.timestamp || new Date().toISOString())
    };
    history.unshift(cleanOrder);
    // Batasi riwayat maksimal 30 pesanan
    if (history.length > 30) history = history.slice(0, 30);
    localStorage.setItem(STORAGE_ORDER_HISTORY_KEY, JSON.stringify(history));
    updateHistoryBadge();
  } catch (err) {
    console.warn('Gagal menyimpan riwayat pesanan:', err);
  }
}

function updateHistoryBadge() {
  const badge = document.getElementById('historyBadge');
  if (!badge) return;
  const history = getCustomerOrderHistory();
  if (history.length > 0) {
    badge.textContent = history.length > 9 ? '9+' : history.length;
    badge.classList.remove('hidden');
    badge.classList.add('flex');
  } else {
    badge.classList.add('hidden');
    badge.classList.remove('flex');
  }
}

// 5. Utility: Format Rupiah
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

// 6. Utility: Gambar Ilustrasi Gabin SVG (Fallback jika foto offline/loading)
function getGabinSvg(creamColor) {
  return `
    <svg class="w-16 h-16 drop-shadow-md" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="90" height="20" rx="6" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
      <circle cx="20" cy="18" r="3" fill="#B45309"/>
      <circle cx="35" cy="18" r="3" fill="#B45309"/>
      <circle cx="50" cy="18" r="3" fill="#B45309"/>
      <circle cx="65" cy="18" r="3" fill="#B45309"/>
      <circle cx="80" cy="18" r="3" fill="#B45309"/>
      <rect x="10" y="26" width="80" height="28" rx="5" fill="${creamColor}" stroke="#78350F" stroke-width="2"/>
      <rect x="5" y="52" width="90" height="20" rx="6" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
      <circle cx="20" cy="62" r="3" fill="#B45309"/>
      <circle cx="35" cy="62" r="3" fill="#B45309"/>
      <circle cx="50" cy="62" r="3" fill="#B45309"/>
      <circle cx="65" cy="62" r="3" fill="#B45309"/>
      <circle cx="80" cy="62" r="3" fill="#B45309"/>
    </svg>
  `;
}

// 7. Inisialisasi Kartu Produk SEKALI SAJA (Foto Tidak Pernah Di-render Ulang!)
function initProductGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((product, idx) => {
    const isAvail = product.isAvailable !== false;
    const searchTokens = `${product.name} ${product.desc} ${product.tag}`.toLowerCase();

    return `
      <div 
        id="card-${product.id}"
        data-id="${product.id}"
        data-category="${product.category}"
        data-bestseller="${product.isBestSeller}"
        data-search="${searchTokens}"
        class="product-card group relative bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-300 ${!isAvail ? 'opacity-75' : ''}"
      >
        <!-- Area Klik untuk Buka Pop-up Detail Produk -->
        <div onclick="openProductDetailModal('${product.id}')" class="cursor-pointer select-none">
          <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden ${product.flavorBg} mb-3 flex items-center justify-center">
            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-105">
              ${getGabinSvg(product.creamColor)}
            </div>

            <img 
              src="${product.image}" 
              alt="${product.name}" 
              loading="${idx < 4 ? 'eager' : 'lazy'}"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${!isAvail ? 'grayscale-[60%]' : ''}"
              onerror="this.remove()"
            />

            ${!isAvail ? `
              <div class="absolute inset-0 bg-stone-900/50 flex items-center justify-center z-20">
                <span class="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-rose-600 text-white shadow-sm uppercase tracking-wider">
                  Habis
                </span>
              </div>
            ` : ''}

            <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

            <span class="absolute top-2 left-2 ${product.tagColor} text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs z-10">
              ${product.tag}
            </span>

            <div id="card-badge-${product.id}"></div>
          </div>

          <div class="flex items-start justify-between gap-1 mb-1">
            <h4 class="font-bold text-stone-900 text-sm leading-tight group-hover:text-brand-600 transition-colors">${product.name}</h4>
            <span class="text-xs font-black text-brand-600 whitespace-nowrap">${formatRupiah(product.price)}</span>
          </div>
          <p class="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-3">
            ${product.desc}
          </p>
        </div>

        <div class="pt-2 border-t border-stone-100 flex items-center justify-between" onclick="event.stopPropagation()">
          <span class="text-[10px] text-stone-400 font-medium">Satuan / pcs</span>
          <div id="card-action-${product.id}" class="flex items-center"></div>
        </div>
      </div>
    `;
  }).join('');

  PRODUCTS.forEach(p => updateProductCardState(p.id));
  updateDynamicVariantCounts(); // <-- TAMBAHAN 1: Panggil fungsi penghitung jumlah rasa
  applyFilters();
}

// <-- TAMBAHAN 2: Fungsi untuk mengisi angka jumlah varian ke 3 tempat di index.html
function updateDynamicVariantCounts() {
  const total = Array.isArray(PRODUCTS) ? PRODUCTS.length : 0;

  const catAllBtn = document.getElementById('catAllBtn');
  if (catAllBtn) {
    catAllBtn.textContent = total > 0 ? `Semua Rasa (${total})` : 'Semua Rasa';
  }

  const totalVariantBadge = document.getElementById('totalVariantBadge');
  if (totalVariantBadge) {
    totalVariantBadge.textContent = total > 0 ? `${total} Pilihan Rasa` : 'Pilihan Rasa';
  }

  const emptyStateResetBtn = document.getElementById('emptyStateResetBtn');
  if (emptyStateResetBtn) {
    emptyStateResetBtn.textContent = total > 0 ? `Lihat Semua ${total} Varian` : 'Lihat Semua Varian';
  }
}

// 8. Update Tampilan Khusus Satu Kartu Produk (Tanpa Sentuh <img>)

// 8. Update Tampilan Khusus Satu Kartu Produk (Tanpa Sentuh <img>)
function updateProductCardState(productId) {
  const card = document.getElementById(`card-${productId}`);
  if (!card) return;

  const product = PRODUCTS.find(p => p.id === productId);
  const isAvail = product ? product.isAvailable !== false : true;

  if (!isAvail) {
    if (cart[productId]) {
      delete cart[productId];
      saveCartToStorage();
    }
    card.classList.remove('border-brand-500', 'ring-2', 'ring-brand-100');
    card.classList.add('border-stone-200');

    const badgeEl = document.getElementById(`card-badge-${productId}`);
    if (badgeEl) badgeEl.innerHTML = '';

    const actionEl = document.getElementById(`card-action-${productId}`);
    if (actionEl) {
      actionEl.innerHTML = `
        <span class="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-400 text-xs font-bold select-none cursor-not-allowed">
          Habis
        </span>
      `;
    }

    if (activeDetailProductId === productId) {
      renderProductDetailAction();
    }
    return;
  }

  const qty = cart[productId] || 0;
  const isSelected = qty > 0;

  // Toggle border kartu
  if (isSelected) {
    card.classList.add('border-brand-500', 'ring-2', 'ring-brand-100');
    card.classList.remove('border-stone-200');
  } else {
    card.classList.remove('border-brand-500', 'ring-2', 'ring-brand-100');
    card.classList.add('border-stone-200');
  }

  // Update badge kuantitas pada foto
  const badgeEl = document.getElementById(`card-badge-${productId}`);
  if (badgeEl) {
    if (qty > 0) {
      badgeEl.innerHTML = `
        <span class="absolute bottom-2 right-2 bg-brand-500 text-white font-extrabold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full shadow-md animate-pop z-10 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          <span>${qty} dipilih</span>
        </span>
      `;
    } else {
      badgeEl.innerHTML = '';
    }
  }

  // Update tombol tambah atau kontrol +/-
  const actionEl = document.getElementById(`card-action-${productId}`);
  if (actionEl) {
    if (qty === 0) {
      actionEl.innerHTML = `
        <button 
          onclick="event.stopPropagation(); addToCart('${productId}')"
          class="px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-500 text-brand-600 hover:text-white text-xs font-bold transition flex items-center gap-1 active:scale-95 shadow-xs"
          aria-label="Tambah item"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Tambah</span>
        </button>
      `;
    } else {
      actionEl.innerHTML = `
        <div class="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200" onclick="event.stopPropagation()">
          <button 
            onclick="event.stopPropagation(); updateQty('${productId}', -1)"
            class="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-600 shadow-xs flex items-center justify-center font-black text-sm active:scale-90 transition"
            aria-label="Kurangi"
          >
            -
          </button>
          <span class="w-8 text-center text-xs font-extrabold text-stone-800">
            ${qty}
          </span>
          <button 
            onclick="event.stopPropagation(); updateQty('${productId}', 1)"
            class="w-7 h-7 rounded-lg bg-brand-500 text-white hover:bg-brand-600 shadow-xs flex items-center justify-center font-black text-sm active:scale-90 transition"
            aria-label="Tambah"
          >
            +
          </button>
        </div>
      `;
    }
  }

  // Sinkronkan tombol aksi di modal detail produk jika sedang terbuka untuk produk ini
  if (activeDetailProductId === productId) {
    renderProductDetailAction();
  }
}

// ============================================================
// 8b. Pop-up Modal Detail Produk (#productDetailModal)
// ============================================================
let activeDetailProductId = null;

function getCategoryDisplayName(cat) {
  if (cat === 'choco') return 'Cokelat';
  if (cat === 'fruity') return 'Fruity Segar';
  if (cat === 'special') return 'Spesial Mix';
  return 'Es Gabin';
}

function openProductDetailModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeDetailProductId = productId;
  const isAvail = product.isAvailable !== false;

  const modal = document.getElementById('productDetailModal');
  const box = document.getElementById('productDetailContentBox');
  if (!modal || !box) return;

  // 1. Tampilkan Gambar & Fallback SVG
  const imgEl = document.getElementById('detailProdImage');
  const flavorBg = document.getElementById('detailProdFlavorBg');
  const svgEl = document.getElementById('detailProdSvg');

  if (flavorBg) {
    flavorBg.className = `relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center ${product.flavorBg || 'bg-stone-800'}`;
  }
  if (svgEl) {
    svgEl.innerHTML = getGabinSvg(product.creamColor || '#f59e0b');
  }
  if (imgEl) {
    imgEl.classList.remove('hidden');
    imgEl.src = product.image || '';
    imgEl.alt = product.name;
    if (!isAvail) {
      imgEl.classList.add('grayscale-[60%]');
    } else {
      imgEl.classList.remove('grayscale-[60%]');
    }
  }

  // 2. Tag & Category Badges
  const tagEl = document.getElementById('detailProdTag');
  if (tagEl) {
    tagEl.className = `absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs z-10 ${product.tagColor || 'bg-amber-100 text-amber-900'}`;
    tagEl.textContent = product.tag || 'Favorit';
  }

  const catBadge = document.getElementById('detailProdCategoryBadge');
  if (catBadge) {
    catBadge.textContent = getCategoryDisplayName(product.category);
  }

  // 3. Status Stok Badge (Ready vs Habis)
  const stockBadge = document.getElementById('detailProdStockBadge');
  if (stockBadge) {
    if (isAvail) {
      stockBadge.innerHTML = `
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>Ready Stok</span>
        </span>
      `;
    } else {
      stockBadge.innerHTML = `
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-600/90 text-white backdrop-blur-md shadow-sm gap-1">
          <span>⚠️ Stok Habis</span>
        </span>
      `;
    }
  }

  // 4. Nama, Harga & Kategori
  const nameEl = document.getElementById('detailProdName');
  if (nameEl) nameEl.textContent = product.name;

  const priceEl = document.getElementById('detailProdPrice');
  if (priceEl) priceEl.textContent = formatRupiah(product.price);

  const catTextEl = document.getElementById('detailProdCategoryText');
  if (catTextEl) catTextEl.textContent = `Varian ${getCategoryDisplayName(product.category)}`;

  // 5. Deskripsi
  const descEl = document.getElementById('detailProdDesc');
  if (descEl) descEl.textContent = product.desc || 'Kombinasi biskuit gabin renyah dengan isian fla lembut yang manis dingin menyegarkan.';

  // 6. Render Tombol Aksi Keranjang
  renderProductDetailAction();

  // 7. Buka Modal dengan Animasi (Bottom sheet di HP, Card pop di Desktop)
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('translate-y-full', 'sm:scale-95');
  box.classList.add('translate-y-0', 'sm:scale-100');
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  const box = document.getElementById('productDetailContentBox');
  if (!modal || !box) return;

  activeDetailProductId = null;

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
  box.classList.remove('translate-y-0', 'sm:scale-100');
  box.classList.add('translate-y-full', 'sm:scale-95');
}

function renderProductDetailAction() {
  const container = document.getElementById('detailProdActionContainer');
  if (!container || !activeDetailProductId) return;

  const product = PRODUCTS.find(p => p.id === activeDetailProductId);
  if (!product) return;

  const isAvail = product.isAvailable !== false;
  const qty = cart[activeDetailProductId] || 0;

  if (!isAvail) {
    container.innerHTML = `
      <button disabled class="w-full py-3 rounded-2xl bg-stone-100 text-stone-400 font-extrabold text-xs sm:text-sm cursor-not-allowed flex items-center justify-center gap-1.5">
        <span>⚠️</span>
        <span>Varian Sedang Habis</span>
      </button>
    `;
    return;
  }

  if (qty === 0) {
    container.innerHTML = `
      <button 
        type="button" 
        onclick="addToCartFromDetail()"
        class="w-full py-3 px-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Tambah ke Keranjang • ${formatRupiah(product.price)}</span>
      </button>
    `;
  } else {
    container.innerHTML = `
      <div class="flex items-center justify-between gap-3 bg-stone-50 p-1.5 rounded-2xl border border-stone-200">
        <div class="pl-2">
          <span class="text-[10px] text-stone-400 block -mb-0.5 font-bold uppercase tracking-wider">Subtotal (${qty} pcs)</span>
          <span class="text-sm font-black text-brand-600">${formatRupiah(product.price * qty)}</span>
        </div>
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="updateQtyFromDetail(-1)"
            class="w-9 h-9 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-600 text-stone-700 shadow-xs flex items-center justify-center font-black text-base active:scale-90 transition border border-stone-200"
            aria-label="Kurangi kuantitas"
          >
            -
          </button>
          <span class="min-w-6 text-center text-sm font-black text-stone-900">${qty}</span>
          <button 
            type="button" 
            onclick="updateQtyFromDetail(1)"
            class="w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-xs flex items-center justify-center font-black text-base active:scale-90 transition"
            aria-label="Tambah kuantitas"
          >
            +
          </button>
        </div>
      </div>
    `;
  }
}

function addToCartFromDetail() {
  if (!activeDetailProductId) return;
  addToCart(activeDetailProductId);
  renderProductDetailAction();
}

function updateQtyFromDetail(delta) {
  if (!activeDetailProductId) return;
  updateQty(activeDetailProductId, delta);
  renderProductDetailAction();
}

// 9. Filter Produk Berdasarkan Kategori & Pencarian (Toggle CSS .hidden, Foto Tidak Di-reload)
function applyFilters() {
  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;
  const q = searchQuery.toLowerCase().trim();

  cards.forEach(card => {
    const cat = card.dataset.category;
    const isBest = card.dataset.bestseller === 'true';
    const searchData = card.dataset.search || '';

    const matchCategory =
      currentCategory === 'all' ? true :
      currentCategory === 'bestseller' ? isBest :
      currentCategory === 'choco' ? cat === 'choco' :
      currentCategory === 'fruity' ? cat === 'fruity' :
      currentCategory === 'special' ? cat === 'special' : true;

    const matchSearch = q === '' || searchData.includes(q);

    if (matchCategory && matchSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  const emptyState = document.getElementById('emptyState');
  const badgeCount = document.getElementById('filteredCountBadge');

  if (badgeCount) badgeCount.textContent = `(${visibleCount})`;

  if (emptyState) {
    if (visibleCount === 0) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
    } else {
      emptyState.classList.add('hidden');
      emptyState.classList.remove('flex');
    }
  }
}

// 10. Hitung Ringkasan Keranjang
function getCartSummary() {
  let totalItems = 0;
  let totalPrice = 0;
  const items = [];

  for (const [id, qty] of Object.entries(cart)) {
    if (qty > 0) {
      const product = PRODUCTS.find(p => p.id === id);
      if (product && product.isAvailable !== false) {
        totalItems += qty;
        const subtotal = product.price * qty;
        totalPrice += subtotal;
        items.push({
          ...product,
          qty,
          subtotal
        });
      }
    }
  }

  return { totalItems, totalPrice, items };
}

function getPayableTotal(baseTotal) {
  if (!baseTotal || baseTotal <= 0) return 0;
  return baseTotal;
}

function handleQrisProofChange(event) {
  const file = event.target?.files?.[0];
  const previewBox = document.getElementById('qrisProofPreviewBox');
  const previewImg = document.getElementById('qrisProofPreviewImg');
  const dropzone = document.getElementById('qrisProofDropzone');
  clearFieldError('qrisProof');

  if (!file) {
    clearQrisProof();
    return;
  }

  if (!file.type.startsWith('image/')) {
    event.target.value = '';
    setFieldError('qrisProof', 'File harus berupa gambar (JPG, PNG, atau WebP)');
    clearQrisProof();
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    event.target.value = '';
    setFieldError('qrisProof', 'Ukuran gambar maksimal 8 MB');
    clearQrisProof();
    return;
  }

  qrisProofFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    if (previewImg) previewImg.src = e.target.result;
    previewBox?.classList.remove('hidden');
    dropzone?.classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function clearQrisProof() {
  qrisProofFile = null;
  const input = document.getElementById('qrisProofInput');
  const camInput = document.getElementById('qrisProofCameraInput');
  const previewBox = document.getElementById('qrisProofPreviewBox');
  const previewImg = document.getElementById('qrisProofPreviewImg');
  const dropzone = document.getElementById('qrisProofDropzone');

  if (input) input.value = '';
  if (camInput) camInput.value = '';
  if (previewImg) previewImg.src = '';
  previewBox?.classList.add('hidden');
  dropzone?.classList.remove('hidden');
  clearFieldError('qrisProof');
}

function compressProofImage(file, maxWidth = 900, quality = 0.78) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', quality);
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

async function uploadQrisProofToSupabase(file, orderNumber) {
  if (!sbClient || !file) return null;
  const compressedBlob = await compressProofImage(file);
  const filePath = `${orderNumber}-${Date.now()}.jpg`;

  const { error } = await sbClient.storage
    .from('payment-proofs')
    .upload(filePath, compressedBlob, {
      contentType: 'image/jpeg',
      upsert: true
    });

  if (error) throw new Error('Gagal mengunggah bukti transfer: ' + error.message);

  const { data } = sbClient.storage.from('payment-proofs').getPublicUrl(filePath);
  return data?.publicUrl || null;
}

// 11. Perbarui Antarmuka Pengguna (UI Keranjang & Floating Bar)
let saveCartTimer = null;

function updateUI() {
  const { totalItems, totalPrice } = getCartSummary();

  const floatBadge = document.getElementById('floatCartBadge');
  const floatItemCount = document.getElementById('floatItemCountText');
  const floatTotalPrice = document.getElementById('floatTotalPrice');
  const btnCheckout = document.getElementById('btnCheckout');
  const headerCartCount = document.getElementById('headerCartCount');

  if (floatBadge) floatBadge.textContent = totalItems;
  if (floatItemCount) floatItemCount.textContent = `${totalItems} item`;
  if (floatTotalPrice) floatTotalPrice.textContent = formatRupiah(totalPrice);

  if (headerCartCount) {
    if (totalItems > 0) {
      headerCartCount.textContent = totalItems;
      headerCartCount.classList.remove('hidden');
      headerCartCount.classList.add('flex');
    } else {
      headerCartCount.classList.add('hidden');
      headerCartCount.classList.remove('flex');
    }
  }

  if (btnCheckout) {
    const open = isStoreOpen();
    if (!open) {
      btnCheckout.disabled = true;
      btnCheckout.innerHTML = `<span>Toko Tutup (Buka 08.00 WIB)</span>`;
    } else {
      btnCheckout.disabled = totalItems === 0;
      btnCheckout.innerHTML = `
        <span>Lihat Pesanan</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
    }
  }

  clearTimeout(saveCartTimer);
  saveCartTimer = setTimeout(saveCartToStorage, 300);

  const cartModal = document.getElementById('cartModal');
  if (cartModal && !cartModal.classList.contains('pointer-events-none')) {
    renderModalCart();
  }
}

// 12. Aksi Keranjang
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product && product.isAvailable === false) {
    showToast(`Maaf, ${product.name} sedang habis`);
    return;
  }
  cart[productId] = (cart[productId] || 0) + 1;
  showToast(`+1 ${product ? product.name : 'Item'} ditambahkan`);
  updateProductCardState(productId);
  updateUI();
}

function updateQty(productId, delta) {
  const current = cart[productId] || 0;
  const next = current + delta;
  const product = PRODUCTS.find(p => p.id === productId);

  if (delta > 0 && product && product.isAvailable === false) {
    showToast(`Maaf, ${product.name} sedang habis`);
    return;
  }

  if (next <= 0) {
    delete cart[productId];
    showToast(`${product ? product.name : 'Item'} dihapus dari keranjang`);
  } else {
    cart[productId] = next;
    if (delta > 0) {
      showToast(`+1 ${product ? product.name : 'Item'}`);
    }
  }

  updateProductCardState(productId);
  updateUI();
}

function clearEntireCart() {
  if (Object.keys(cart).length === 0) return;
  if (confirm('Kosongkan semua pesanan di keranjang?')) {
    const productIds = Object.keys(cart);
    cart = {};
    saveCartToStorage();
    productIds.forEach(id => updateProductCardState(id));
    updateUI();
    showToast('Keranjang berhasil dikosongkan');
    closeCartModal();
  }
}

// 13. Filter Kategori & Pencarian
function setCategory(cat, btnElement) {
  currentCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  applyFilters();
}

function handleSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    if (val.trim().length > 0) {
      clearBtn.classList.remove('hidden');
      clearBtn.classList.add('flex');
    } else {
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('flex');
    }
  }
  applyFilters();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  searchQuery = '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  currentCategory = 'all';
  document.querySelectorAll('.cat-pill').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });
  applyFilters();
}

function getTodayWIBIso() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utcMs + 7 * 3600000);
  const yyyy = wib.getFullYear();
  const mm = String(wib.getMonth() + 1).padStart(2, '0');
  const dd = String(wib.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatIndonesianPickupDate(isoStr) {
  if (!isoStr || !/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return '';
  const [y, m, d] = isoStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);

  const todayIso = getTodayWIBIso();
  const [ty, tm, td] = todayIso.split('-').map(Number);
  const today = new Date(ty, tm - 1, td);

  const diffDays = Math.round((target - today) / 86400000);
  const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  let prefix = '';
  if (diffDays === 0) prefix = 'Hari Ini adalah ';
  else if (diffDays === 1) prefix = 'Besok adalah ';
  else if (diffDays === 2) prefix = 'Lusa adalah ';

  return `${prefix}${namaHari[target.getDay()]}, ${target.getDate()} ${namaBulan[target.getMonth()]} ${y}`;
}

function updatePickupDatePreview() {
  const dateInput = document.getElementById('pickupDateSelect');
  const previewEl = document.getElementById('pickupDatePreview');
  if (!dateInput || !previewEl) return;

  const formatted = formatIndonesianPickupDate(dateInput.value);
  previewEl.textContent = formatted ? `📅 ${formatted}` : '';
}

function populatePickupDates() {
  const dateInput = document.getElementById('pickupDateSelect');
  if (!dateInput) return;

  const todayIso = getTodayWIBIso();
  dateInput.min = todayIso;

  if (!dateInput.value || dateInput.value < todayIso) {
    const nowMin = getWIBMinutes();
    if (nowMin >= 20 * 60) {
      const [ty, tm, td] = todayIso.split('-').map(Number);
      const tomorrow = new Date(ty, tm - 1, td + 1);
      dateInput.value = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    } else {
      dateInput.value = todayIso;
    }
  }

  updatePickupDatePreview();
}

// 14. Modal Keranjang
function openCartModal() {
  populatePickupDates();
  closeProductDetailModal();
  

  if (!isStoreOpen()) {
    showToast('Toko sedang tutup. Fitur checkout dibuka kembali pukul 08.00 WIB');
    return;
  }

  const modal = document.getElementById('cartModal');
  const box = document.getElementById('cartContentBox');
  if (!modal || !box) return;

  renderModalCart();

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('translate-y-full', 'sm:translate-y-4');
  box.classList.add('translate-y-0');
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  const box = document.getElementById('cartContentBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('translate-y-full', 'sm:translate-y-4');
  box.classList.remove('translate-y-0');
}

function renderModalCart() {
  const { totalItems, totalPrice, items } = getCartSummary();
  const listEl = document.getElementById('cartItemList');
  const modalItemSubtitle = document.getElementById('modalItemSubtitle');
  const modalTotalItems = document.getElementById('modalTotalItems');
  const modalTotalPrice = document.getElementById('modalTotalPrice');
  const modalBtnSubmit = document.getElementById('modalBtnSubmit');

  if (modalItemSubtitle) modalItemSubtitle.textContent = `${totalItems} item dipilih`;
  if (modalTotalItems) modalTotalItems.textContent = `${totalItems} pcs`;
  if (modalTotalPrice) modalTotalPrice.textContent = formatRupiah(totalPrice);
  if (!listEl) return;

  if (items.length === 0) {
    if (modalBtnSubmit) modalBtnSubmit.disabled = true;
    listEl.innerHTML = `
      <div class="py-8 text-center flex flex-col items-center justify-center">
        <span class="text-3xl mb-1.5">🛒</span>
        <p class="font-bold text-stone-700 text-xs">Keranjang Belanja Masih Kosong</p>
        <p class="text-[11px] text-stone-400 mt-0.5 max-w-xs">Pilih varian Es Gabin favoritmu untuk melanjutkan pemesanan.</p>
        <button type="button" onclick="closeCartModal()" class="mt-3 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-500 rounded-xl shadow-xs hover:bg-brand-600 transition">
          Lihat Menu Es Gabin
        </button>
      </div>
    `;
    return;
  }

  if (modalBtnSubmit) {
    const open = isStoreOpen();
    if (!open) {
      modalBtnSubmit.disabled = true;
      modalBtnSubmit.innerHTML = `<span>Toko Tutup (Buka 08.00 WIB)</span>`;
    } else {
      modalBtnSubmit.disabled = false;
      if (selectedPaymentMethod === 'qris') {
        modalBtnSubmit.innerHTML = `
          <span>Selanjutnya</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        `;
      } else {
        modalBtnSubmit.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Buat Pesanan & Lihat Struk</span>
        `;
      }
    }
  }

  listEl.innerHTML = items.map(item => `
    <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 ${item.flavorBg} flex items-center justify-center shadow-xs">
          <span class="text-xs">🥪</span>
        </div>
        <div class="min-w-0">
          <h5 class="font-bold text-stone-900 text-xs truncate">${item.name}</h5>
          <div class="text-[10px] text-stone-500">
            ${formatRupiah(item.price)} × ${item.qty}
          </div>
          <span class="text-xs font-black text-brand-600">${formatRupiah(item.subtotal)}</span>
        </div>
      </div>

      <div class="flex items-center bg-white rounded-lg p-0.5 border border-stone-200 shrink-0">
        <button 
          type="button"
          onclick="updateQty('${item.id}', -1)"
          class="w-6 h-6 rounded bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center font-bold text-xs"
          aria-label="Kurangi"
        >
          -
        </button>
        <span class="w-7 text-center text-xs font-bold text-stone-800">${item.qty}</span>
        <button 
          type="button"
          onclick="updateQty('${item.id}', 1)"
          class="w-6 h-6 rounded bg-brand-500 text-white hover:bg-brand-600 flex items-center justify-center font-bold text-xs"
          aria-label="Tambah"
        >
          +
        </button>
      </div>
    </div>
  `).join('');
}

// 15. Pilihan Metode Pesanan & Pembayaran
function setOrderMethod(method) {
  selectedOrderMethod = method;
  const tabPickup = document.getElementById('tabMethodPickup');
  const tabDelivery = document.getElementById('tabMethodDelivery');
  const pickupSection = document.getElementById('pickupSection');
  const deliverySection = document.getElementById('deliverySection');

  if (method === 'pickup') {
    tabPickup?.classList.add('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');
    tabPickup?.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
    tabDelivery?.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
    tabDelivery?.classList.remove('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');

    pickupSection?.classList.remove('hidden');
    deliverySection?.classList.add('hidden');
    clearFieldError('deliveryAddress');
  } else {
    tabDelivery?.classList.add('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');
    tabDelivery?.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
    tabPickup?.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
    tabPickup?.classList.remove('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');

    pickupSection?.classList.add('hidden');
    deliverySection?.classList.remove('hidden');
    clearFieldError('pickupTime');
  }
  clearFieldError('orderMethod');
}

function setPaymentMethod(method) {
  selectedPaymentMethod = method;
  const tabQris = document.getElementById('tabPaymentQris');
  const tabTunai = document.getElementById('tabPaymentTunai');
  const qrisBox = document.getElementById('qrisPaymentBox');
  const tunaiBox = document.getElementById('tunaiPaymentBox');

  qrisBox?.classList.add('hidden');

  if (method === 'qris') {
    tabQris?.classList.add('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');
    tabQris?.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
    tabTunai?.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
    tabTunai?.classList.remove('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');

    tunaiBox?.classList.add('hidden');
  } else {
    tabTunai?.classList.add('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');
    tabTunai?.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
    tabQris?.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
    tabQris?.classList.remove('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');

    tunaiBox?.classList.remove('hidden');
  }

  clearFieldError('qrisProof');
  renderModalCart();
}

function isSelectedPickupToday() {
  const dateInput = document.getElementById('pickupDateSelect');
  if (!dateInput || !dateInput.value) return true;
  return dateInput.value === getTodayWIBIso();
}

// 15b. Handler Input Jam Manual (Ketik Langsung, Format 24 Jam)
// 15b. Handler Input Jam Manual (Otomatis Tahan di Jam Operasional 08:00 - 20:00 WIB)
function onPickupHourInput(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 2);

  if (v.length === 1) {
    const d = parseInt(v, 10);
    if (d === 8 || d === 9) {
      // Ketik langsung 8 atau 9 otomatis menjadi 08 / 09
      v = '0' + d;
    } else if (d >= 3 && d <= 7) {
      // Angka 3-7 tidak bisa jadi puluhan jam & di bawah jam buka 08:00
      v = '08';
      showToast('Jam operasional toko mulai pukul 08:00 WIB');
    }
  }

  if (v.length === 2) {
    let n = parseInt(v, 10);
    if (n < 8) {
      n = 8;
      showToast('Jam operasional toko mulai pukul 08:00 WIB');
    } else if (n > 20) {
      n = 20;
      showToast('Jam operasional toko maksimal pukul 20:00 WIB');
    }
    v = String(n).padStart(2, '0');

    // Jika jam = 20, kunci menit ke 00 agar tidak melebihi 20:00 WIB
    const minEl = document.getElementById('pickupMinute');
    if (n === 20 && minEl && (minEl.value === '' || parseInt(minEl.value, 10) > 0)) {
      minEl.value = '00';
    }
  }

  el.value = v;
  clearFieldError('pickupTime');

  if (v.length === 2) {
    const minEl = document.getElementById('pickupMinute');
    minEl?.focus();
    minEl?.select();
  }
}

function onPickupHourBlur(el) {
  const raw = (el.value || '').trim();
  if (!raw) return;

  let n = parseInt(raw, 10);
  if (isNaN(n) || n < 8) {
    n = 8;
    showToast('Jam operasional toko mulai pukul 08:00 WIB');
  } else if (n > 20) {
    n = 20;
    showToast('Jam operasional toko maksimal pukul 20:00 WIB');
  }
  el.value = String(n).padStart(2, '0');

  const minEl = document.getElementById('pickupMinute');
  if (n === 20 && minEl && (minEl.value === '' || parseInt(minEl.value, 10) > 0)) {
    minEl.value = '00';
  }
}

function onPickupMinuteInput(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 2);
  const hourVal = parseInt(document.getElementById('pickupHour')?.value || '0', 10);

  // Jika jam sudah 20, menit ditahan di 00 (batas tutup 20:00 WIB)
  if (hourVal === 20 && v !== '') {
    if (parseInt(v, 10) > 0) {
      showToast('Batas akhir pengambilan pukul 20:00 WIB');
    }
    el.value = '00';
    clearFieldError('pickupTime');
    return;
  }

  if (v.length === 1 && parseInt(v, 10) > 5) {
    v = '59';
  }
  if (v.length === 2) {
    let n = parseInt(v, 10);
    if (n > 59) n = 59;
    v = String(n).padStart(2, '0');
  }

  el.value = v;
  clearFieldError('pickupTime');
}

function onPickupMinuteBlur(el) {
  const raw = (el.value || '').trim();
  if (!raw) return;

  const hourVal = parseInt(document.getElementById('pickupHour')?.value || '0', 10);
  let n = parseInt(raw, 10);
  if (hourVal === 20 || isNaN(n) || n < 0) {
    n = 0;
  } else if (n > 59) {
    n = 59;
  }
  el.value = String(n).padStart(2, '0');
}

// 16. Helper Tampilan Error Validasi
function setFieldError(fieldId, msg) {
  if (fieldId === 'pickupTime') {
    ['pickupHour', 'pickupMinute'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('border-rose-500', 'ring-1', 'ring-rose-200');
        el.classList.remove('border-stone-200');
      }
    });
  } else {
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.add('border-rose-500', 'ring-1', 'ring-rose-200');
      input.classList.remove('border-stone-200');
    }
  }
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
  }
}

function clearFieldError(fieldId) {
  if (fieldId === 'pickupTime') {
    ['pickupHour', 'pickupMinute'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('border-rose-500', 'ring-1', 'ring-rose-200');
        el.classList.add('border-stone-200');
      }
    });
  } else {
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.remove('border-rose-500', 'ring-1', 'ring-rose-200');
      input.classList.add('border-stone-200');
    }
  }
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
}

// 17. Validasi Error Handling Sebelum Checkout
function validateCheckoutForm() {
  if (!isStoreOpen()) {
    showToast('Toko sedang tutup. Fitur checkout dibuka kembali pukul 08.00 WIB');
    return false;
  }

  const { totalItems, totalPrice, items } = getCartSummary();
  if (totalItems === 0) {
    showToast('Keranjang belanja Anda masih kosong');
    return false;
  }

  let hasError = false;
  let firstErrorEl = null;

  // 1. Validasi Nama Pemesan
  const nameInput = document.getElementById('customerName');
  const nameVal = (nameInput?.value || '').trim();
  if (nameVal.length < 2) {
    setFieldError('customerName', 'Nama pemesan wajib diisi (minimal 2 karakter)');
    hasError = true;
    if (!firstErrorEl) firstErrorEl = nameInput;
  } else {
    clearFieldError('customerName');
  }

  // 2. Validasi Metode Pesanan
  let pickupDateLabel = '';
  if (selectedOrderMethod === 'pickup') {
    const dateInput = document.getElementById('pickupDateSelect');
    const dateVal = (dateInput?.value || '').trim();
    const todayIso = getTodayWIBIso();

    if (!dateVal) {
      setFieldError('pickupDate', 'Hari & tanggal rencana ambil wajib dipilih');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = dateInput;
    } else if (dateVal < todayIso) {
      setFieldError('pickupDate', 'Tanggal pengambilan tidak boleh tanggal yang sudah lewat');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = dateInput;
    } else {
      clearFieldError('pickupDate');
      pickupDateLabel = formatIndonesianPickupDate(dateVal);
    }

    const hourEl = document.getElementById('pickupHour');
    const minEl = document.getElementById('pickupMinute');
    const hourRaw = (hourEl?.value || '').trim();
    const minRaw = (minEl?.value || '').trim();
    const h = parseInt(hourRaw, 10);
    const m = parseInt(minRaw, 10);

    const nowMin = getWIBMinutes();
    const inNormalHours = nowMin >= 8 * 60 && nowMin < 20 * 60;
    const isToday = isSelectedPickupToday();
    const totalPickMin = h * 60 + m;

    if (hourRaw === '' || minRaw === '') {
      setFieldError('pickupTime', 'Jam & menit rencana ambil wajib diisi');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = hourRaw === '' ? hourEl : minEl;
    } else if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      setFieldError('pickupTime', 'Format jam tidak valid (cth: jam 14, menit 30)');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = isNaN(h) ? hourEl : minEl;
    } else if (totalPickMin < 8 * 60 || totalPickMin > 20 * 60) {
      // Koreksi otomatis ke jam operasional terdekat jika lolos lewat autofill
      if (totalPickMin < 8 * 60) {
        hourEl.value = '08';
        minEl.value = '00';
      } else {
        hourEl.value = '20';
        minEl.value = '00';
      }
      setFieldError('pickupTime', 'Jam ambil harus pukul 08:00 – 20:00 WIB. Angka disesuaikan ke jam terdekat.');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = hourEl;
    } else if (isToday && inNormalHours && totalPickMin < nowMin) {
      setFieldError('pickupTime', 'Jam ambil hari ini sudah terlewat. Pilih jam lebih malam atau ganti ke Besok');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = hourEl;
    } else {
      clearFieldError('pickupTime');
    }
  } else if (selectedOrderMethod === 'delivery') {
    const addrInput = document.getElementById('deliveryAddress');
    const addrVal = (addrInput?.value || '').trim();
    if (addrVal.length < 10) {
      setFieldError('deliveryAddress', 'Alamat pengiriman & patokan wajib diisi lengkap (minimal 10 karakter)');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = addrInput;
    } else {
      clearFieldError('deliveryAddress');
    }
  }

  // 3. Validasi Metode Pembayaran
  if (!selectedPaymentMethod) {
    setFieldError('paymentMethod', 'Silakan pilih metode pembayaran');
    hasError = true;
  } else {
    clearFieldError('paymentMethod');
  }

  if (hasError) {
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorEl.focus();
    }
    return false;
  }

  let pickupTimeFormatted = null;
  if (selectedOrderMethod === 'pickup') {
    const h = parseInt(document.getElementById('pickupHour').value, 10);
    const m = parseInt(document.getElementById('pickupMinute').value, 10);
    const clockStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    pickupTimeFormatted = pickupDateLabel ? `${pickupDateLabel} (${clockStr})` : clockStr;
  }

  pendingOrder = {
    customerName: nameVal,
    orderMethod: selectedOrderMethod,
    pickupTime: pickupTimeFormatted,
    deliveryAddress: selectedOrderMethod === 'delivery' ? document.getElementById('deliveryAddress').value.trim() : null,
    paymentMethod: selectedPaymentMethod,
    items: [...items],
    totalItems: totalItems,
    totalPrice: totalPrice
  };

  renderConfirmModal(pendingOrder);
  openConfirmModal();
  return true;
}

// 17b. Modal Konfirmasi Data Pesanan (#confirmModal)
let pendingOrder = null;

function openConfirmModal() {
  const modal = document.getElementById('confirmModal');
  const box = document.getElementById('confirmContentBox');
  if (!modal || !box) return;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('scale-95');
  box.classList.add('scale-100');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirmModal');
  const box = document.getElementById('confirmContentBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('scale-95');
  box.classList.remove('scale-100');
}

function renderConfirmModal(order) {
  if (!order) return;

  document.getElementById('cfmCustomerName').textContent = order.customerName;

  const methodText = order.orderMethod === 'pickup' ? 'Ambil Sendiri (Pickup)' : 'Diantar / COD (Delivery)';
  document.getElementById('cfmOrderMethod').textContent = methodText;

  const detailBox = document.getElementById('cfmDetailBox');
  if (order.orderMethod === 'pickup') {
    detailBox.innerHTML = `<strong>Rencana Ambil:</strong> Pukul ${order.pickupTime} WIB di Kedai Mellowbites`;
  } else {
    detailBox.innerHTML = `<strong>Alamat Pengiriman:</strong> ${order.deliveryAddress}`;
  }

  const payBadge = document.getElementById('cfmPaymentMethod');
  if (order.paymentMethod === 'qris') {
    payBadge.textContent = 'QRIS';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-brand-100 text-brand-800';
  } else {
    payBadge.textContent = 'Tunai (COD)';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800';
  }

  document.getElementById('cfmOrderTotal').textContent = `${order.totalItems} pcs · ${formatRupiah(order.totalPrice)}`;
}

// 17c. Modal Langkah Pembayaran QRIS (#qrisStepModal)
let pendingQrisOrderMeta = null;

function openQrisStepModal(orderMeta) {
  pendingQrisOrderMeta = orderMeta;
  const modal = document.getElementById('qrisStepModal');
  const box = document.getElementById('qrisStepContentBox');
  if (!modal || !box) {
    showToast('Elemen layar QRIS belum ditemukan di index.html');
    return;
  }

  const subEl = document.getElementById('qrisStepOrderSub');
  const amtEl = document.getElementById('qrisStepTotalAmount');
  if (subEl) subEl.textContent = `No. Order: ${orderMeta.orderNumber}`;
  if (amtEl) amtEl.textContent = formatRupiah(orderMeta.totalPrice);

  clearQrisProof();

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('translate-y-6', 'sm:scale-95');
  box.classList.add('translate-y-0', 'sm:scale-100');
}

function cancelQrisStepModal() {
  const modal = document.getElementById('qrisStepModal');
  const box = document.getElementById('qrisStepContentBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('translate-y-6', 'sm:scale-95');
  box.classList.remove('translate-y-0', 'sm:scale-100');
}

async function proceedCreateOrder() {
  if (!pendingOrder) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  if (!isStoreOpen()) {
    showToast('Toko sedang tutup. Fitur checkout dibuka kembali pukul 08.00 WIB');
    closeConfirmModal();
    return;
  }

  const orderMeta = {
    ...pendingOrder,
    orderNumber: generateOrderNumber(),
    timestamp: new Date()
  };

  if (orderMeta.paymentMethod === 'qris') {
    closeConfirmModal();
    closeCartModal();
    openQrisStepModal(orderMeta);
    return;
  }

  await finalizeAndIssueReceipt({
    ...orderMeta,
    paymentProofUrl: null
  });
}

// 17d. Submit Bukti Transfer QRIS & Terbitkan Struk
async function submitQrisPaymentAndFinish() {
  if (!pendingQrisOrderMeta) {
    showToast('Data pesanan QRIS tidak ditemukan');
    return;
  }

  if (!qrisProofFile) {
    setFieldError('qrisProof', 'Silakan upload foto bukti transfer QRIS terlebih dahulu');
    document.getElementById('qrisProofInput')?.focus();
    return;
  }

  const btn = document.getElementById('btnSubmitQrisStep');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Mengunggah Bukti TF...</span>`;
  }

  try {
    const paymentProofUrl = await uploadQrisProofToSupabase(qrisProofFile, pendingQrisOrderMeta.orderNumber);
    cancelQrisStepModal();

    await finalizeAndIssueReceipt({
      ...pendingQrisOrderMeta,
      paymentProofUrl
    });

    pendingQrisOrderMeta = null;
  } catch (err) {
    console.error('Gagal upload bukti QRIS:', err);
    showToast(err.message || 'Gagal mengunggah bukti transfer, coba lagi');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

async function recordOrderToBackend(order) {
  if (!order || order._isRecordedToBackend) return;
  order._isRecordedToBackend = true;

  saveCustomerOrderHistory(order);

  if (sbClient) {
    const { error: insertErr } = await sbClient.from('orders').insert([{
      order_number: order.orderNumber,
      customer_name: order.customerName,
      order_method: order.orderMethod,
      pickup_time: order.pickupTime,
      delivery_address: order.deliveryAddress,
      payment_method: order.paymentMethod,
      payment_proof_url: order.paymentProofUrl,
      items: order.items,
      total_items: order.totalItems,
      total_price: order.totalPrice
    }]);
    if (insertErr) console.warn('Gagal mencatat pesanan ke rekap admin:', insertErr);

    const daftarMenuEmail = order.items
      .map(i => `- ${i.name} (${i.qty} pcs) = ${formatRupiah(i.subtotal)}`)
      .join('\n');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '00db6347-97f9-41eb-9077-820ec9bd01f3',
        subject: `🔔 Pesanan Baru Mellowbites: ${order.orderNumber} (${order.customerName})`,
        from_name: 'Mellowbites',
        No_Order: order.orderNumber,
        Nama_Pemesan: order.customerName,
        Metode_Pesanan: order.orderMethod === 'pickup'
          ? `Ambil Sendiri (Jam ${order.pickupTime} WIB)`
          : `Diantar / COD (${order.deliveryAddress})`,
        Metode_Pembayaran: order.paymentMethod.toUpperCase(),
        Bukti_Transfer: order.paymentProofUrl || '-',
        Rincian_Pesanan: `\n${daftarMenuEmail}`,
        Total_Bayar: formatRupiah(order.totalPrice)
      })
    }).catch(err => console.warn('Gagal kirim notifikasi email:', err));
  }
}

// 17e. Finalisasi Simpan ke Database, Email, & Buka Struk Digital
async function finalizeAndIssueReceipt(finalOrder) {
  currentOrder = {
    ...finalOrder,
    _isRecordedToBackend: false
  };

  try {
    localStorage.setItem(STORAGE_NAME_KEY, currentOrder.customerName);
    if (currentOrder.deliveryAddress) {
      localStorage.setItem(STORAGE_ADDRESS_KEY, currentOrder.deliveryAddress);
    }
  } catch (_) {}

  const productIds = Object.keys(cart);
  cart = {};
  saveCartToStorage();
  clearQrisProof();

  productIds.forEach(id => updateProductCardState(id));
  updateUI();

  closeConfirmModal();
  closeCartModal();

  hasConfirmedWhatsApp = false;
  localStorage.setItem('mellowbites_pending_wa_order', JSON.stringify(currentOrder));
  updateReceiptConfirmationState();

  renderReceiptModal(currentOrder);
  openReceiptModal();

  showToast('Struk siap! Klik Konfirmasi ke WhatsApp agar pesanan masuk.');
}

// 18. Helper Format Nomor Order & Tanggal
function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MB-${y}${m}${d}-${rand}`;
}

function formatDateTime(d) {
  const date = new Date(d);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
}

// 19. Modal Struk Digital (#receiptModal & #receiptPaper)
function openReceiptModal() {
  const modal = document.getElementById('receiptModal');
  const box = document.getElementById('receiptContentBox');
  if (!modal || !box) return;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('scale-95');
  box.classList.add('scale-100');

  // Kunci tombol Back di HP selama struk terbuka & belum konfirmasi WA
  if (!hasConfirmedWhatsApp) {
    history.pushState({ receiptLocked: true }, '', location.href);
  }
}

// Tangkap tombol Back / gesture swipe back di HP
window.addEventListener('popstate', () => {
  const modal = document.getElementById('receiptModal');
  const isReceiptOpen = modal && !modal.classList.contains('pointer-events-none');

  if (isReceiptOpen && !hasConfirmedWhatsApp) {
    history.pushState({ receiptLocked: true }, '', location.href);
    showToast('⚠️ Wajib konfirmasi pesanan ke WhatsApp terlebih dahulu!');
    flashWaNotice();
  }
});

// Cegah tutup tab / pull-to-refresh tidak sengaja sebelum konfirmasi WA
window.addEventListener('beforeunload', (e) => {
  const modal = document.getElementById('receiptModal');
  const isReceiptOpen = modal && !modal.classList.contains('pointer-events-none');

  if (isReceiptOpen && !hasConfirmedWhatsApp) {
    e.preventDefault();
  }
});

function closeReceiptModal(force = false) {
  // Jika belum konfirmasi ke WhatsApp, tolak penutupan struk & beri peringatan
  if (!force && !hasConfirmedWhatsApp) {
    showToast('⚠️ Wajib konfirmasi pesanan ke WhatsApp terlebih dahulu!');
    flashWaNotice();
    return;
  }

  const modal = document.getElementById('receiptModal');
  const box = document.getElementById('receiptContentBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('scale-95');
  box.classList.remove('scale-100');
}

function flashWaNotice() {
  const statusBox = document.getElementById('rcptWaStatusBox');
  const btn = document.getElementById('btnSubmitWaOrder');

  if (statusBox) {
    statusBox.classList.add('ring-2', 'ring-amber-500', 'bg-amber-100', 'scale-[1.02]');
    setTimeout(() => {
      statusBox.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100', 'scale-[1.02]');
    }, 800);
  }

  if (btn) {
    btn.classList.add('ring-4', 'ring-emerald-400', 'scale-105');
    setTimeout(() => {
      btn.classList.remove('ring-4', 'ring-emerald-400', 'scale-105');
    }, 800);
  }
}

function updateReceiptConfirmationState() {
  const statusBox = document.getElementById('rcptWaStatusBox');
  const icon = document.getElementById('rcptWaStatusIcon');
  const text = document.getElementById('rcptWaStatusText');
  const btnClose = document.getElementById('btnCloseReceipt');
  const btnText = document.getElementById('btnSubmitWaText');

  if (hasConfirmedWhatsApp) {
    if (statusBox) {
      statusBox.className = 'p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between gap-2 transition-all duration-200';
    }
    if (icon) icon.textContent = '✅';
    if (text) {
      text.innerHTML = '<span class="font-bold text-emerald-800">Sudah dikonfirmasi ke WhatsApp!</span> <span class="text-[10px] text-stone-500">Struk sekarang sudah bisa ditutup.</span>';
    }
    if (btnClose) {
      btnClose.title = 'Tutup Struk';
      btnClose.classList.remove('opacity-50');
    }
    if (btnText) {
      btnText.textContent = 'Kirim Ulang ke WhatsApp';
    }
  } else {
    if (statusBox) {
      statusBox.className = 'p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2 transition-all duration-200';
    }
    if (icon) icon.textContent = '⚠️';
    if (text) {
      text.innerHTML = '<strong class="font-bold">Wajib:</strong> Klik tombol hijau di bawah untuk konfirmasi ke WhatsApp agar pesanan segera dibuatkan. Struk tidak dapat ditutup sebelum konfirmasi.';
    }
    if (btnClose) {
      btnClose.title = 'Wajib konfirmasi WA sebelum menutup struk';
    }
    if (btnText) {
      btnText.textContent = 'Konfirmasi ke WhatsApp (Wajib)';
    }
  }
}

function renderReceiptModal(order) {
  if (!order) return;

  document.getElementById('rcptOrderNumber').textContent = order.orderNumber;
  document.getElementById('rcptDateTime').textContent = formatDateTime(order.timestamp);
  document.getElementById('rcptCustomerName').textContent = order.customerName;

  const methodText = order.orderMethod === 'pickup' ? 'Ambil Sendiri (Pickup)' : 'Diantar / COD (Delivery)';
  document.getElementById('rcptOrderMethod').textContent = methodText;

  const detailRow = document.getElementById('rcptDetailRow');
  if (order.orderMethod === 'pickup') {
    detailRow.innerHTML = `<strong>Jam Rencana Ambil:</strong> Pukul ${order.pickupTime} WIB di Kedai Mellowbites`;
  } else {
    detailRow.innerHTML = `<strong>Alamat Pengiriman:</strong> ${order.deliveryAddress}`;
  }

  const payBadge = document.getElementById('rcptPaymentMethod');
  if (order.paymentMethod === 'qris') {
    payBadge.textContent = 'QRIS';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-brand-100 text-brand-800';
  } else {
    payBadge.textContent = 'Tunai (COD)';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800';
  }

  // Render daftar item menu dengan layout stabil bebas terpotong
  const itemsList = document.getElementById('rcptItemsList');
  itemsList.innerHTML = order.items.map(item => `
    <div class="rcpt-item-row">
      <div style="min-width: 0; flex: 1;">
        <p class="rcpt-item-name">${item.name}</p>
        <p class="rcpt-item-sub">${formatRupiah(item.price)} × ${item.qty}</p>
      </div>
      <span class="rcpt-item-price">${formatRupiah(item.subtotal)}</span>
    </div>
  `).join('');

  document.getElementById('rcptTotalItems').textContent = `${order.totalItems} pcs`;
  document.getElementById('rcptTotalPrice').textContent = formatRupiah(order.totalPrice);
}

// Unduh Struk Digital sebagai Gambar PNG via html2canvas (Bebas Terpotong)
async function downloadReceiptPng() {
  if (typeof html2canvas === 'undefined') {
    showToast('Library pembuat gambar sedang dimuat, silakan coba sesaat lagi...');
    return;
  }
  const paper = document.getElementById('receiptPaper');
  if (!paper || !currentOrder) return;

  showToast('Membuat struk gambar PNG...');

  try {
    // 1. Tunggu web font selesai dimuat agar ukuran teks dihitung sempurna
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. Render dengan html2canvas menggunakan clone yang dinormalisasi
    const canvas = await html2canvas(paper, {
      scale: 2.5, // Hasil sangat jernih dan tajam
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedPaper = clonedDoc.getElementById('receiptPaper');
        if (clonedPaper) {
          // Reset transform pada modal agar tidak menimbulkan pergeseran posisi koordinat
          clonedPaper.style.transform = 'none';
          clonedPaper.style.margin = '0 auto';
          clonedPaper.style.boxShadow = 'none';
          clonedPaper.style.width = '360px';
          clonedPaper.style.maxWidth = '360px';
          clonedPaper.style.overflow = 'visible';

          // Netralkan parent agar tidak memotong struk
          let p = clonedPaper.parentElement;
          while (p) {
            p.style.transform = 'none';
            p.style.overflow = 'visible';
            p = p.parentElement;
          }
        }
      }
    });

    const link = document.createElement('a');
    link.download = `Struk-Mellowbites-${currentOrder.orderNumber}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    showToast('Struk berhasil diunduh (PNG)!');
  } catch (err) {
    console.error('Gagal membuat gambar struk:', err);
    showToast('Gagal mengunduh struk gambar');
  }
}

// Unduh Gambar QRIS Statis Mellowbites
async function downloadQrisImage() {
  const btn = document.getElementById('btnDownloadQris');
  const imgEl = document.getElementById('qrisImgElement');
  const fallbackEl = document.getElementById('qrisSvgFallback');

  // 1. Jika gambar foto img/qris.png ada dan berhasil dimuat (tidak hidden)
  if (imgEl && !imgEl.classList.contains('hidden') && imgEl.naturalWidth > 0) {
    try {
      const resp = await fetch(imgEl.src);
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'QRIS-Mellowbites.png';
      link.click();
      URL.revokeObjectURL(blobUrl);
      showToast('Gambar QRIS berhasil diunduh!');
      return;
    } catch (_) {
      // Fallback lanjut ke html2canvas jika fetch gagal
    }
  }

  // 2. Jika menggunakan fallback SVG atau html2canvas
  const qrisArea = document.getElementById('qrisDownloadArea');
  if (!qrisArea) return;

  if (typeof html2canvas === 'undefined') {
    showToast('Sedang menyiapkan gambar, coba lagi dalam sekejap...');
    return;
  }

  const origText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Mengunduh...</span>`;
  }

  try {
    const canvas = await html2canvas(qrisArea, {
      scale: 3,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false
    });

    const link = document.createElement('a');
    link.download = 'QRIS-Mellowbites.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    showToast('Gambar QRIS berhasil diunduh!');
  } catch (err) {
    console.error('Gagal download QRIS:', err);
    showToast('Gagal mengunduh gambar QRIS');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

// 20. Sanitasi Teks WhatsApp
function sanitizeForWhatsApp(text) {
  if (!text) return '';
  return text.replace(/[\uFE00-\uFE0F\u200B-\u200D]/g, '');
}

// 21. Generator Teks Ringkasan Pesanan (Format WhatsApp Lengkap dengan No. Order & Kalimat Dinamis)
function buildOrderString() {
  const o = currentOrder;
  if (!o) return null;

  const formattedDate = formatDateTime(o.timestamp);

  let text = `Halo Kak, saya mau konfirmasi pesanan *Es Gabin - Mellowbites*:\n\n`;
  text += `*No. Order:* ${o.orderNumber}\n`;
  text += `*Waktu Pesan:* ${formattedDate}\n`;
  text += `*Nama Pemesan:* ${o.customerName}\n\n`;

  text += `*Metode Pesanan:* ${o.orderMethod === 'pickup' ? `Ambil Sendiri (Pickup) - Jam ${o.pickupTime} WIB` : `Diantar / COD (Delivery)`}\n`;
  if (o.orderMethod === 'delivery') {
    text += `*Alamat Pengiriman:* ${o.deliveryAddress}\n`;
  }
  text += `*Metode Pembayaran:* ${o.paymentMethod === 'qris' ? 'QRIS' : 'Tunai (COD)'}\n\n`;

  text += `*Rincian Item:*\n`;
  o.items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}* (${item.qty} pcs) = ${formatRupiah(item.subtotal)}\n`;
  });
  text += `\n*Total Item:* ${o.totalItems} pcs\n`;
  text += `*Total Tagihan:* *${formatRupiah(o.totalPrice)}*\n\n`;

  // Kalimat penutup dinamis sesuai metode pembayaran
 if (o.paymentMethod === 'qris') {
    text += `Saya sudah transfer via QRIS sebesar *${formatRupiah(o.totalPrice)}*.\n`;
    if (o.paymentProofUrl) {
      text += `*Bukti Transfer:* ${o.paymentProofUrl}\n\n`;
    }
    text += `Berikut saya lampirkan juga struk pesanannya ya kak 🙏😇`;
  } else {
    text += `Pembayaran Tunai (COD) saat pesanan diterima/diambil ya kak, berikut struk pesanannya 🙏😇`;
  }

  return sanitizeForWhatsApp(text);
}

// 22. Kirim Konfirmasi ke WhatsApp
function submitWhatsAppOrder() {
  if (!currentOrder) {
    showToast('Silakan buat pesanan terlebih dahulu');
    return;
  }

  const text = buildOrderString();
  if (!text) return;

  // Catat ke Supabase, email notifikasi, & riwayat hanya setelah tombol WA diklik
  recordOrderToBackend(currentOrder);

  // Tandai sudah konfirmasi ke WhatsApp (Membuka izin tutup struk)
  hasConfirmedWhatsApp = true;
  localStorage.removeItem('mellowbites_pending_wa_order');
  document.getElementById('unconfirmedOrderBanner')?.classList.add('hidden');
  updateReceiptConfirmationState();

  const waNumber = '6285646409023';
  const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(text)}`;

  window.open(waUrl, '_blank');
  showToast('Pesanan masuk & membuka WhatsApp...');
}

// 23. Salin Rincian Pesanan ke Clipboard
function copyOrderText() {
  const text = buildOrderString();
  if (!text) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Rincian pesanan berhasil disalin!');
    }).catch(() => {
      showToast('Gagal menyalin ke clipboard');
    });
  } else {
    showToast('Clipboard tidak didukung di browser ini');
  }
}

// 23b. Riwayat Pesanan & Repeat Order untuk Pelanggan
function openOrderHistoryModal() {
  const modal = document.getElementById('orderHistoryModal');
  const box = document.getElementById('orderHistoryContentBox');
  const listContainer = document.getElementById('orderHistoryList');
  if (!modal || !box || !listContainer) return;

  const orders = getCustomerOrderHistory();

  if (orders.length === 0) {
    listContainer.innerHTML = `
      <div class="py-12 px-4 text-center">
        <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl">
          🛍️
        </div>
        <h4 class="font-extrabold text-stone-800 text-sm">Belum Ada Riwayat Pesanan</h4>
        <p class="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Pesanan yang Anda buat di sini akan tercatat otomatis. Anda bisa melihat struk atau memesan ulang dengan 1 klik!
        </p>
        <button onclick="closeOrderHistoryModal()" class="mt-4 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition active:scale-95">
          Lihat Menu Es Gabin
        </button>
      </div>
    `;
  } else {
    listContainer.innerHTML = orders.map(order => {
      const itemsListHtml = (order.items || []).map(i => `
        <div class="flex items-center justify-between text-xs py-1">
          <span class="text-stone-700 font-medium truncate pr-2">
            ${i.name} <span class="text-stone-400 font-bold">×${i.qty}</span>
          </span>
          <span class="text-stone-600 font-bold shrink-0">${formatRupiah(i.subtotal)}</span>
        </div>
      `).join('');

      const isPickup = order.orderMethod === 'pickup';
      const methodLabel = isPickup ? `🏬 Ambil (${order.pickupTime || '-'})` : `🛵 Antar COD`;

      return `
        <div class="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2.5 transition hover:border-brand-300">
          <!-- Top Row: Order #, Date, Method Badge -->
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="font-mono font-extrabold text-[11px] text-brand-600 tracking-wide">${order.orderNumber}</span>
              <p class="text-[10px] text-stone-400 font-medium mt-0.5">${formatDateTime(order.timestamp)}</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isPickup ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
              ${methodLabel}
            </span>
          </div>

          <!-- Items Breakdown -->
          <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100 divide-y divide-stone-100">
            ${itemsListHtml}
          </div>

          <!-- Total & Method -->
          <div class="flex items-center justify-between text-xs pt-0.5">
            <span class="text-stone-500 text-[11px]">
              ${order.totalItems} pcs • <strong class="text-stone-700 uppercase font-bold">${order.paymentMethod}</strong>
            </span>
            <div class="text-right">
              <span class="text-[10px] text-stone-400 block -mb-0.5">Total Bayar</span>
              <span class="font-black text-brand-600 text-sm">${formatRupiah(order.totalPrice)}</span>
            </div>
          </div>

          <!-- Actions: Lihat Struk & Pesan Lagi -->
          <div class="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onclick="viewPastOrderReceipt('${order.orderNumber}')"
              class="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <span>🧾</span>
              <span>Lihat Struk</span>
            </button>
            <button 
              type="button" 
              onclick="repeatOrder('${order.orderNumber}')"
              class="py-2 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-sm shadow-brand-500/20 active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <span>🔁</span>
              <span>Pesan Lagi</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('scale-95');
  box.classList.add('scale-100');
}

function closeOrderHistoryModal() {
  const modal = document.getElementById('orderHistoryModal');
  const box = document.getElementById('orderHistoryContentBox');
  if (!modal || !box) return;

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
  box.classList.remove('scale-100');
  box.classList.add('scale-95');
}

function viewPastOrderReceipt(orderNumber) {
  const history = getCustomerOrderHistory();
  const order = history.find(o => o.orderNumber === orderNumber);
  if (!order) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  currentOrder = {
    ...order,
    timestamp: new Date(order.timestamp)
  };

  // Pesanan riwayat masa lalu dianggap sudah dikonfirmasi sehingga struk bisa ditutup bebas
  hasConfirmedWhatsApp = true;
  updateReceiptConfirmationState();

  renderReceiptModal(currentOrder);
  closeOrderHistoryModal();
  openReceiptModal();
}

function repeatOrder(orderNumber) {
  const history = getCustomerOrderHistory();
  const order = history.find(o => o.orderNumber === orderNumber);
  if (!order || !order.items || order.items.length === 0) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  let addedCount = 0;
  const unavailableNames = [];

  order.items.forEach(item => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    if (!prod || prod.isAvailable === false) {
      unavailableNames.push(item.name);
    } else {
      cart[item.id] = (cart[item.id] || 0) + item.qty;
      addedCount++;
    }
  });

  if (addedCount === 0) {
    showToast('Maaf, semua menu dari pesanan ini sedang habis/tidak tersedia.');
    return;
  }

  saveCartToStorage();
  updateUI();
  PRODUCTS.forEach(p => updateProductCardState(p.id));

  closeOrderHistoryModal();
  openCartModal();

  if (unavailableNames.length > 0) {
    showToast(`Menu ditambahkan! (${unavailableNames.join(', ')} sedang habis & dilewati)`);
  } else {
    showToast('Pesanan berhasil dimasukkan ke keranjang!');
  }
}

// 24. Notifikasi Toast
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('opacity-0');
    toast.classList.remove('opacity-100');
  }, 1600);
}

// 25. Logika Jam Buka/Tutup Toko (berbasis WIB UTC+7)
function getWIBMinutes() {
  // Konversi waktu saat ini ke menit dalam zona WIB (UTC+7),
  // terlepas dari zona lokal perangkat customer (WIT/WITA/WIB sekalipun)
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibMs = utcMs + 7 * 3600000; // UTC+7
  const wib = new Date(wibMs);
  return wib.getHours() * 60 + wib.getMinutes();
}

function isStoreOpen() {
  const nowMinutes = getWIBMinutes();
  const openMinutes = 8 * 60;   // 08:00 WIB
  const closeMinutes = 20 * 60; // 20:00 WIB
  const inNormalHours = nowMinutes >= openMinutes && nowMinutes < closeMinutes;

  // Hitung timestamp pukul 08:00 WIB hari ini
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibNow = new Date(utcMs + 7 * 3600000);
  const todayOpenWib = new Date(wibNow);
  todayOpenWib.setHours(8, 0, 0, 0);
  const todayOpenUtcMs = todayOpenWib.getTime() - 7 * 3600000 - now.getTimezoneOffset() * 60000;

  const updatedMs = storeSettingsUpdatedAt ? new Date(storeSettingsUpdatedAt).getTime() : 0;

  // Jika saklar admin dimatikan: hanya kunci toko kalau dimatikan SETELAH jam 08:00 WIB hari ini
  if (!isStoreManuallyOpen) {
    if (inNormalHours && updatedMs < todayOpenUtcMs) {
      return true; // Otomatis buka lagi saat masuk jam 08:00 WIB pagi
    }
    return false;
  }

  // Jika saklar admin aktif, buka di jam operasional normal
  if (inNormalHours) return true;

  // Di luar jam operasional (20:00 - 07:59 WIB): tetap buka hanya jika dinyalakan manual setelah jam 20:00 terakhir
  if (!isNaN(updatedMs) && updatedMs > 0) {
    const lastCloseWib = new Date(wibNow);
    lastCloseWib.setHours(20, 0, 0, 0);
    if (wibNow.getHours() < 8) {
      lastCloseWib.setDate(lastCloseWib.getDate() - 1);
    }
    const lastCloseUtcMs = lastCloseWib.getTime() - 7 * 3600000 - now.getTimezoneOffset() * 60000;
    if (updatedMs >= lastCloseUtcMs) return true;
  }

  return false;
}

function updateStoreStatus() {
  const badge = document.getElementById('storeStatusBadge');
  const closedNotice = document.getElementById('storeClosedNotice');
  if (!badge) return;

  const open = isStoreOpen();

  if (open) {
    badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/70 transition-all';
    badge.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
      <span>Buka</span>
    `;
    badge.title = 'Toko sedang buka (08.00 - 20.00 WIB)';

    if (closedNotice) {
      closedNotice.classList.add('hidden');
    }
  } else {
    badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200/70 transition-all';
    badge.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
      <span>Tutup</span>
    `;
    badge.title = 'Toko sedang tutup (Buka kembali pukul 08.00 WIB)';

    if (closedNotice) {
      closedNotice.classList.remove('hidden');
    }
  }

  // Sinkronkan status tombol checkout dengan jam operasional toko
  const btnCheckout = document.getElementById('btnCheckout');
  const { totalItems } = getCartSummary();
  if (btnCheckout) {
    if (!open) {
      btnCheckout.disabled = true;
      btnCheckout.innerHTML = `<span>Toko Tutup (Buka 08.00 WIB)</span>`;
    } else {
      btnCheckout.disabled = totalItems === 0;
      btnCheckout.innerHTML = `
        <span>Lihat Pesanan</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
    }
  }
}

 let hasSyncedCodeProducts = false;

async function syncFromSupabase() {
  if (!sbClient) return;
  try {
    // 1. Ambil status buka/tutup manual & banner promo dari admin
    const { data: settings } = await sbClient.from('store_settings').select('*').eq('id', 1).single();
    if (settings) {
      if (typeof settings.is_open === 'boolean') {
        isStoreManuallyOpen = settings.is_open;
      }
      storeSettingsUpdatedAt = settings.updated_at || null;

      // Perbarui teks banner promo secara dinamis
      const badgeEl = document.getElementById('heroPromoBadge');
      const titleEl = document.getElementById('heroPromoTitle');
      const descEl = document.getElementById('heroPromoDesc');
      if (badgeEl && settings.promo_badge) {
        badgeEl.textContent = settings.promo_badge;
      }
      if (titleEl && settings.promo_title) {
        titleEl.textContent = settings.promo_title;
      }
      if (descEl && settings.promo_desc) {
        descEl.textContent = settings.promo_desc;
      }
    }

    // 2. Ambil daftar menu & status stok terbaru
    const { data: dbProducts } = await sbClient.from('products').select('*').order('sort_order', { ascending: true });
    if (dbProducts && dbProducts.length > 0) {
      PRODUCTS = dbProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        isBestSeller: p.is_best_seller,
        price: p.price,
        desc: p.description || '',
        tag: p.tag || 'Favorit',
        tagColor: p.tag_color || 'bg-amber-100 text-amber-900',
        flavorBg: p.flavor_bg || 'bg-gradient-to-tr from-amber-800 to-amber-600',
        creamColor: p.cream_color || '#f59e0b',
        image: p.image_url || '',
        isAvailable: p.is_available !== false && p.is_available !== 'false'
      }));

      // Hapus item dari keranjang jika stoknya habis di database
      let cartChanged = false;
      for (const id in cart) {
        const prod = PRODUCTS.find(p => p.id === id);
        if (prod && prod.isAvailable === false) {
          delete cart[id];
          cartChanged = true;
        }
      }
      if (cartChanged) {
        saveCartToStorage();
      }
    }
  } catch (err) {
    console.warn('Menggunakan data menu lokal (offline/fallback):', err);
  }
}

// ==========================================
// 25.5 Progressive Web App (PWA) & Service Worker
// ==========================================

let deferredInstallPrompt = null;

// Registrasi Service Worker untuk Caching & Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker aktif dengan scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[PWA] Service Worker gagal didaftarkan:', err);
      });
  });
}

// Tangkap event sebelum instalasi browser (Chrome, Edge, Android)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  console.log('[PWA] Event beforeinstallprompt berhasil ditangkap');

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (!isStandalone) {
    const btnInstall = document.getElementById('btnInstallApp');
    if (btnInstall) {
      btnInstall.classList.remove('hidden');
      btnInstall.classList.add('flex');
    }

    const banner = document.getElementById('pwaInstallBanner');
    const isDismissed = localStorage.getItem('mellowbites_pwa_dismissed');
    if (banner && !isDismissed) {
      banner.classList.remove('hidden');
    }
  }
});

// Event saat aplikasi selesai dipasang oleh user
window.addEventListener('appinstalled', () => {
  console.log('[PWA] Aplikasi Mellowbites sukses terpasang di perangkat');
  deferredInstallPrompt = null;
  const btnInstall = document.getElementById('btnInstallApp');
  if (btnInstall) btnInstall.classList.add('hidden');
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
  closePwaGuideModal();
  showToast('🎉 Aplikasi Mellowbites berhasil dipasang!');
});

// Fungsi penanganan saat tombol Download / Install diklik
async function handleInstallAppClick() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    showToast('Aplikasi Mellowbites sudah terpasang di perangkat ini ✨');
    return;
  }

  // Jika browser mendukung programmatic prompt dan event sudah tersedia
  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] Pilihan user:', choiceResult.outcome);
      if (choiceResult.outcome === 'accepted') {
        showToast('Memasang aplikasi Mellowbites...');
      }
      deferredInstallPrompt = null;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.classList.add('hidden');
      return;
    } catch (err) {
      console.warn('[PWA] Gagal menampilkan install prompt:', err);
    }
  }

  // Jika di iOS Safari atau prompt browser belum siap, tampilkan modal panduan interaktif
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  openPwaGuideModal(isIos);
}

// Buka modal panduan download / install
function openPwaGuideModal(isIos = false) {
  const modal = document.getElementById('pwaGuideModal');
  const iosGuide = document.getElementById('pwaIosGuide');
  const androidGuide = document.getElementById('pwaAndroidGuide');
  const btnDirect = document.getElementById('btnPwaPromptDirect');

  if (!modal) return;

  if (isIos) {
    if (iosGuide) iosGuide.classList.remove('hidden');
    if (androidGuide) androidGuide.classList.add('hidden');
  } else {
    if (iosGuide) iosGuide.classList.add('hidden');
    if (androidGuide) androidGuide.classList.remove('hidden');
    if (btnDirect) {
      if (deferredInstallPrompt) {
        btnDirect.classList.remove('hidden');
      } else {
        btnDirect.classList.add('hidden');
      }
    }
  }

  modal.classList.remove('hidden');
}

// Tutup modal panduan
function closePwaGuideModal() {
  const modal = document.getElementById('pwaGuideModal');
  if (modal) modal.classList.add('hidden');
}

// Tombol pasang langsung dari dalam modal Android/PC
async function triggerNativePwaPrompt() {
  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] Pilihan user dari modal:', choiceResult.outcome);
      deferredInstallPrompt = null;
      closePwaGuideModal();
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.classList.add('hidden');
    } catch (err) {
      console.warn('[PWA] Error prompt direct:', err);
    }
  } else {
    showToast('Silakan gunakan menu browser (titik 3 ⋮) lalu pilih "Instal aplikasi"');
  }
}

// Tutup banner atas & simpan status agar tidak mengganggu
function dismissInstallBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
  try {
    localStorage.setItem('mellowbites_pwa_dismissed', 'true');
  } catch (_) {}
}

// Inisialisasi status PWA saat halaman dimuat
function initPwaUI() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const btnInstall = document.getElementById('btnInstallApp');
  const banner = document.getElementById('pwaInstallBanner');

  if (isStandalone) {
    if (btnInstall) btnInstall.classList.add('hidden');
    if (banner) banner.classList.add('hidden');
    return;
  }

  if (btnInstall) {
    btnInstall.classList.remove('hidden');
    btnInstall.classList.add('flex');
  }

  const isDismissed = localStorage.getItem('mellowbites_pwa_dismissed');
  if (banner && !isDismissed) {
    banner.classList.remove('hidden');
  }
}

window.handleInstallAppClick = handleInstallAppClick;
window.openPwaGuideModal = openPwaGuideModal;
window.closePwaGuideModal = closePwaGuideModal;
window.triggerNativePwaPrompt = triggerNativePwaPrompt;
window.dismissInstallBanner = dismissInstallBanner;
window.initPwaUI = initPwaUI;

// 26. Inisialisasi Saat Dokumen Siap
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Muat data keranjang & formulir dari localStorage
  loadCartFromStorage();
  updateHistoryBadge();
  checkUnconfirmedOrder();

  // 1.5. Ambil status toko & data produk terbaru dari Supabase
  await syncFromSupabase();

  // 2. Render kartu produk SEKALI SAJA (foto tetap di-cache oleh browser)
  initProductGrid();

  // 27. Perbarui bilah total & status toko
  updateUI();
  updateStoreStatus();

  // Inisialisasi tombol & banner PWA download
  initPwaUI();

  // Realtime update dari Supabase jika ada perubahan stok atau setting toko
  if (sbClient) {
    try {
      sbClient
        .channel('public:store_sync')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
          await syncFromSupabase();
          initProductGrid();
          updateUI();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'store_settings' }, async () => {
          await syncFromSupabase();
          updateStoreStatus();
        })
        .subscribe();
    } catch (_) {}
  }

  // 4. Pasang listener otomatis hapus error saat user mengetik/mengubah input
  document.getElementById('customerName')?.addEventListener('input', (e) => {
    clearFieldError('customerName');
    try {
      localStorage.setItem(STORAGE_NAME_KEY, e.target.value);
    } catch (_) {}
  });
  const pickupDateEl = document.getElementById('pickupDateSelect');
  ['change', 'input'].forEach((evt) => {
    pickupDateEl?.addEventListener(evt, () => {
      clearFieldError('pickupDate');
      clearFieldError('pickupTime');
      updatePickupDatePreview();
    });
  });

  // Handler clearError sudah ditangani langsung via oninput di HTML (onPickupHourInput / onPickupMinuteInput)
  // Listener tambahan di sini sebagai fallback

  document.getElementById('pickupHour')?.addEventListener('blur', (e) => {
    onPickupHourBlur(e.target);
  });

  document.getElementById('pickupMinute')?.addEventListener('blur', (e) => {
    onPickupMinuteBlur(e.target);
  });

  document.getElementById('deliveryAddress')?.addEventListener('input', (e) => {
    clearFieldError('deliveryAddress');
    try {
      localStorage.setItem(STORAGE_ADDRESS_KEY, e.target.value);
    } catch (_) {}
  });

  // 5. Periksa status buka/tutup berkala setiap 30 detik
  setInterval(updateStoreStatus, 30000);

  function checkUnconfirmedOrder() {
  try {
    const raw = localStorage.getItem('mellowbites_pending_wa_order');
    if (!raw) return;
    const savedOrder = JSON.parse(raw);
    if (savedOrder && savedOrder.orderNumber) {
      const banner = document.getElementById('unconfirmedOrderBanner');
      const numEl = document.getElementById('bannerOrderNumber');
      if (numEl) numEl.textContent = savedOrder.orderNumber;
      if (banner) banner.classList.remove('hidden');
    }
  } catch (err) {
    console.warn('Gagal membaca pesanan pending:', err);
  }
}

function resumeUnconfirmedOrder() {
  try {
    const raw = localStorage.getItem('mellowbites_pending_wa_order');
    if (!raw) {
      showToast('Data pesanan tidak ditemukan');
      return;
    }

    const savedOrder = JSON.parse(raw);
    currentOrder = {
      ...savedOrder,
      items: Array.isArray(savedOrder.items) ? savedOrder.items : [],
      timestamp: savedOrder.timestamp ? new Date(savedOrder.timestamp) : new Date()
    };

    hasConfirmedWhatsApp = false;
    updateReceiptConfirmationState();
    renderReceiptModal(currentOrder);
    openReceiptModal();
  } catch (err) {
    console.error('Gagal membuka struk pending:', err);
    showToast('Gagal membuka struk pesanan');
  }
}

window.checkUnconfirmedOrder = checkUnconfirmedOrder;
window.resumeUnconfirmedOrder = resumeUnconfirmedOrder;
});
