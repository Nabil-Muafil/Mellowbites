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

// 3. State, Location & Storage Constants
const STORAGE_CART_KEY = 'mellowbites_es_gabin_cart_v1';
const STORAGE_NAME_KEY = 'mellowbites_customer_name';
const STORAGE_PHONE_KEY = 'mellowbites_customer_phone';
const STORAGE_ADDRESS_KEY = 'mellowbites_customer_address';
const STORAGE_ORDER_HISTORY_KEY = 'mellowbites_order_history_v1';
const STORAGE_REVIEWED_ORDERS_KEY = 'mellowbites_reviewed_orders_v1';
const STORAGE_COORDS_KEY = 'mellowbites_customer_coords_v1';

// Koordinat Tetap Kedai Gabin Ice Bar - Mellowbites (Denanyar, Jombang)
const STORE_COORDS = {
  lat: -7.5431218,
  lng: 112.2134476
};

// Pengaturan Jarak & Tarif Ongkir
const DELIVERY_CONFIG = {
  maxDistanceKm: 20,  // Batas maksimal jarak pengantaran (km)
  roadFactor: 1.25,   // Faktor koreksi jarak jalan jika memakai fallback Haversine
  tiers: [
    { ltKm: 8, fee: 0 },    // Di bawah 8 km (< 8 km) : Gratis Ongkir
    { ltKm: 12, fee: 4000 }, // 8 km – 11,9 km          : Rp 4.000
    { ltKm: 16, fee: 6000 }, // 12 km – 15,9 km         : Rp 6.000
    { maxKm: 20, fee: 8000 }  // 16 km – 20 km           : Rp 8.000
  ]
};

// State Peta & Ongkir
let deliveryMap = null;
let storeMarker = null;
let customerMarker = null;
let userGpsCircle = null;
let customerCoords = null;     // { lat, lng }
let deliveryDistanceKm = null; // Jarak dalam km (angka desimal 1 digit)

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
let hasSentWhatsAppClick = false;
let activeDetailProductId = null;
let pendingOrder = null;
let pendingQrisOrderMeta = null;
let isCreatingOrder = false;

// State Ulasan & Rating Produk
let productRatingsMap = {};
let productReviewsListMap = {};
let reviewedItemsByOrder = {};
let activeReviewOrder = null;
let reviewDraftState = {};
let isSubmittingReviews = false;

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

    const savedName = localStorage.getItem(STORAGE_NAME_KEY);
    const nameInput = document.getElementById('customerName');
    if (savedName && nameInput) {
      nameInput.value = savedName;
    }

    const savedPhone = localStorage.getItem(STORAGE_PHONE_KEY);
    const phoneInput = document.getElementById('customerPhone');
    if (savedPhone && phoneInput) {
      phoneInput.value = savedPhone;
    }

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
    history = history.filter(o => o.orderNumber !== order.orderNumber);
    const { _recordPromise, ...restOrder } = order;
    const cleanOrder = {
      ...restOrder,
      timestamp: order.timestamp instanceof Date ? order.timestamp.toISOString() : (order.timestamp || new Date().toISOString())
    };
    history.unshift(cleanOrder);
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

// 5. Utility: Format Rupiah & Sanitasi HTML
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

const HTML_ESCAPE_MAP = {
  '&': '\x26amp;',
  '<': '\x26lt;',
  '>': '\x26gt;',
  '"': '\x26quot;',
  "'": '\x26#39;'
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch]);
}

function isQrisOrder(order) {
  return String(order?.paymentMethod || '').toLowerCase() === 'qris';
}

function normalizeIndonesianPhone(rawPhone) {
  if (rawPhone === null || rawPhone === undefined) return '';
  let digits = String(rawPhone).replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('620')) {
    digits = '0' + digits.slice(3);
  } else if (digits.startsWith('62')) {
    digits = '0' + digits.slice(2);
  } else if (digits.startsWith('8')) {
    digits = '0' + digits;
  }
  return digits;
}

function isValidIndonesianPhone(rawPhone) {
  const trimmed = String(rawPhone || '').trim();
  if (!trimmed || /[^\d\s+\-().]/.test(trimmed)) return false;
  const normalized = normalizeIndonesianPhone(trimmed);
  return /^08[1-9]\d{7,11}$/.test(normalized);
}

function toWhatsAppPhone(rawPhone) {
  const normalized = normalizeIndonesianPhone(rawPhone);
  if (!/^08[1-9]\d{7,11}$/.test(normalized)) return '';
  return '62' + normalized.slice(1);
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
      <rect x="10" y="26" width="80" height="28" rx="5" fill="${escapeHtml(creamColor)}" stroke="#78350F" stroke-width="2"/>
      <rect x="5" y="52" width="90" height="20" rx="6" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
      <circle cx="20" cy="62" r="3" fill="#B45309"/>
      <circle cx="35" cy="62" r="3" fill="#B45309"/>
      <circle cx="50" cy="62" r="3" fill="#B45309"/>
      <circle cx="65" cy="62" r="3" fill="#B45309"/>
      <circle cx="80" cy="62" r="3" fill="#B45309"/>
    </svg>
  `;
}

// 7. Inisialisasi Kartu Produk SEKALI SAJA (Foto Tidak Pernah Di-render Ulang)
function initProductGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((product, idx) => {
    const isAvail = product.isAvailable !== false;
    const searchTokens = escapeHtml(product.name.toLowerCase());
    const safeId = escapeHtml(product.id);
    const safeName = escapeHtml(product.name);
    const safeDesc = escapeHtml(product.desc);
    const safeTag = escapeHtml(product.tag);
    const safeImage = escapeHtml(product.image);

    return `
      <div 
        id="card-${safeId}"
        data-id="${safeId}"
        data-category="${escapeHtml(product.category)}"
        data-bestseller="${product.isBestSeller}"
        data-search="${searchTokens}"
        class="product-card group relative bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-300 ${!isAvail ? 'opacity-75' : ''}"
      >
        <div onclick="openProductDetailModal('${safeId}')" class="cursor-pointer select-none">
          <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden ${product.flavorBg} mb-3 flex items-center justify-center">
            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-105">
              ${getGabinSvg(product.creamColor)}
            </div>

            <img
              src="${safeImage}"
              alt="${safeName}"
              width="400"
              height="300"
              loading="${idx < 4 ? 'eager' : 'lazy'}"
              fetchpriority="${idx === 0 ? 'high' : 'auto'}"
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
              ${safeTag}
            </span>

            <div id="card-badge-${safeId}"></div>
          </div>

          <div class="flex items-start justify-between gap-1 mb-1">
            <h4 class="font-bold text-stone-900 text-sm leading-tight group-hover:text-brand-600 transition-colors">${safeName}</h4>
            <span class="text-xs font-black text-brand-600 whitespace-nowrap">${formatRupiah(product.price)}</span>
          </div>
          <div id="card-rating-${safeId}" class="mb-1.5 empty:hidden">${getCardRatingHtml(product.id)}</div>
          <p class="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-3">
            ${safeDesc}
          </p>
        </div>

        <div class="pt-2 border-t border-stone-100 flex items-center justify-between" onclick="event.stopPropagation()">
          <span class="text-[10px] text-stone-400 font-medium">Satuan / pcs</span>
          <div id="card-action-${safeId}" class="flex items-center"></div>
        </div>
      </div>
    `;
  }).join('');

  PRODUCTS.forEach(p => updateProductCardState(p.id));
  updateDynamicVariantCounts();
  applyFilters();
}

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

  if (isSelected) {
    card.classList.add('border-brand-500', 'ring-2', 'ring-brand-100');
    card.classList.remove('border-stone-200');
  } else {
    card.classList.remove('border-brand-500', 'ring-2', 'ring-brand-100');
    card.classList.add('border-stone-200');
  }

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

  const actionEl = document.getElementById(`card-action-${productId}`);
  const safeId = escapeHtml(productId);
  if (actionEl) {
    if (qty === 0) {
      actionEl.innerHTML = `
        <button 
          onclick="event.stopPropagation(); addToCart('${safeId}')"
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
            onclick="event.stopPropagation(); updateQty('${safeId}', -1)"
            class="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-rose-50 hover:text-rose-600 shadow-xs flex items-center justify-center font-black text-sm active:scale-90 transition"
            aria-label="Kurangi"
          >
            -
          </button>
          <span class="w-8 text-center text-xs font-extrabold text-stone-800">
            ${qty}
          </span>
          <button 
            onclick="event.stopPropagation(); updateQty('${safeId}', 1)"
            class="w-7 h-7 rounded-lg bg-brand-500 text-white hover:bg-brand-600 shadow-xs flex items-center justify-center font-black text-sm active:scale-90 transition"
            aria-label="Tambah"
          >
            +
          </button>
        </div>
      `;
    }
  }

  if (activeDetailProductId === productId) {
    renderProductDetailAction();
  }
}

// ============================================================
// 8b. Pop-up Modal Detail Produk (#productDetailModal)
// ============================================================
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

  const tagEl = document.getElementById('detailProdTag');
  if (tagEl) {
    tagEl.className = `absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs z-10 ${product.tagColor || 'bg-amber-100 text-amber-900'}`;
    tagEl.textContent = product.tag || 'Favorit';
  }

  const catBadge = document.getElementById('detailProdCategoryBadge');
  if (catBadge) {
    catBadge.textContent = getCategoryDisplayName(product.category);
  }

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

  const nameEl = document.getElementById('detailProdName');
  if (nameEl) nameEl.textContent = product.name;

  const priceEl = document.getElementById('detailProdPrice');
  if (priceEl) priceEl.textContent = formatRupiah(product.price);

  const catTextEl = document.getElementById('detailProdCategoryText');
  if (catTextEl) catTextEl.textContent = `Varian ${getCategoryDisplayName(product.category)}`;

  updateProductDetailRatingBadge(productId);

  const descEl = document.getElementById('detailProdDesc');
  if (descEl) descEl.textContent = product.desc || 'Kombinasi biskuit gabin renyah dengan isian fla lembut yang manis dingin menyegarkan.';

  renderProductDetailAction();

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

// 9. Filter Produk Berdasarkan Kategori & Pencarian
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

// ============================================================
// 10b. Peta Interaktif (Leaflet), GPS & Hitung Ongkir Otomatis
// ============================================================
function calculateHaversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function fetchRoadDistanceKm(lat, lng) {
  const straightKm = calculateHaversineKm(STORE_COORDS.lat, STORE_COORDS.lng, lat, lng);
  const fallbackKm = Math.round(straightKm * DELIVERY_CONFIG.roadFactor * 10) / 10;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const url = `https://router.project-osrm.org/route/v1/driving/${STORE_COORDS.lng},${STORE_COORDS.lat};${lng},${lat}?overview=false`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return fallbackKm;
    const data = await res.json();
    const meters = data?.routes?.[0]?.distance;
    if (typeof meters === 'number' && meters > 0) {
      return Math.round((meters / 1000) * 10) / 10;
    }
  } catch (_) {
    // Fallback otomatis ke estimasi Haversine jika server rute sibuk/offline
  }
  return fallbackKm;
}

function getDeliveryFeeSummary() {
  if (selectedOrderMethod !== 'delivery') {
    return {
      hasPin: true,
      distanceKm: 0,
      fee: 0,
      isOutOfRange: false,
      routeUrl: null
    };
  }

  if (!customerCoords || deliveryDistanceKm === null) {
    return {
      hasPin: false,
      distanceKm: null,
      fee: 0,
      isOutOfRange: false,
      routeUrl: null
    };
  }

  const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${STORE_COORDS.lat},${STORE_COORDS.lng}&destination=${customerCoords.lat},${customerCoords.lng}`;

  if (deliveryDistanceKm > DELIVERY_CONFIG.maxDistanceKm) {
    return {
      hasPin: true,
      distanceKm: deliveryDistanceKm,
      fee: 0,
      isOutOfRange: true,
      routeUrl
    };
  }

  const matchedTier = DELIVERY_CONFIG.tiers.find(t =>
    typeof t.ltKm === 'number' ? deliveryDistanceKm < t.ltKm : deliveryDistanceKm <= t.maxKm
  ) || DELIVERY_CONFIG.tiers[DELIVERY_CONFIG.tiers.length - 1];

  return {
    hasPin: true,
    distanceKm: deliveryDistanceKm,
    fee: matchedTier.fee,
    isOutOfRange: false,
    routeUrl
  };
}

function updateDeliveryFeeUI() {
  const resultBox = document.getElementById('deliveryFeeResultBox');
  const distText = document.getElementById('deliveryDistanceText');
  const feeText = document.getElementById('deliveryFeeText');

  const info = getDeliveryFeeSummary();

  if (resultBox && distText && feeText) {
    if (!info.hasPin) {
      resultBox.classList.add('hidden');
    } else {
      resultBox.classList.remove('hidden');
      if (info.isOutOfRange) {
        resultBox.className = 'p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-2';
        distText.textContent = `Jarak: ${info.distanceKm} km (Maks. ${DELIVERY_CONFIG.maxDistanceKm} km)`;
        feeText.textContent = 'Di Luar Area';
        feeText.className = 'text-xs font-black text-rose-600 bg-white px-2.5 py-1 rounded-lg border border-rose-200 shrink-0';
      } else {
        resultBox.className = 'p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-between gap-2';
        distText.textContent = `Jarak ke lokasi: ${info.distanceKm} km`;
        feeText.textContent = info.fee === 0 ? 'Gratis Ongkir' : formatRupiah(info.fee);
        feeText.className = 'text-xs font-black text-brand-600 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0';
      }
    }
  }

  renderModalCart();
}

async function setCustomerDeliveryPin(lat, lng, panToPin = false) {
  customerCoords = {
    lat: Number(lat.toFixed(6)),
    lng: Number(lng.toFixed(6))
  };

  try {
    localStorage.setItem(STORAGE_COORDS_KEY, JSON.stringify(customerCoords));
  } catch (_) { }

  clearFieldError('deliveryMap');

  if (deliveryMap) {
    if (!customerMarker) {
      const redPinIcon = L.divIcon({
        className: 'custom-customer-pin',
        html: `<svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 5px rgba(0,0,0,0.35));">
          <path d="M16 1C8.268 1 2 7.268 2 15C2 24.75 16 36.5 16 36.5C16 36.5 30 24.75 30 15C30 7.268 23.732 1 16 1Z" fill="#e11d48" stroke="#ffffff" stroke-width="2.5"/>
          <circle cx="16" cy="14.5" r="5" fill="#ffffff"/>
        </svg>`,
        iconSize: [32, 38],
        iconAnchor: [16, 37],
        popupAnchor: [0, -34]
      });

      customerMarker = L.marker([customerCoords.lat, customerCoords.lng], {
        draggable: true,
        icon: redPinIcon
      }).addTo(deliveryMap);

      customerMarker.bindPopup('<b>📍 Lokasi Antar</b><br><span style="font-size:11px">Geser pin merah jika titik belum pas</span>');
      customerMarker.on('dragend', () => {
        const pos = customerMarker.getLatLng();
        setCustomerDeliveryPin(pos.lat, pos.lng, false);
      });
    } else {
      customerMarker.setLatLng([customerCoords.lat, customerCoords.lng]);
    }

    if (panToPin) {
      deliveryMap.flyTo([customerCoords.lat, customerCoords.lng], 16, { duration: 0.7 });
    }
  }

  const straightKm = calculateHaversineKm(STORE_COORDS.lat, STORE_COORDS.lng, customerCoords.lat, customerCoords.lng);
  deliveryDistanceKm = Math.round(straightKm * DELIVERY_CONFIG.roadFactor * 10) / 10;
  updateDeliveryFeeUI();

  const exactRoadKm = await fetchRoadDistanceKm(customerCoords.lat, customerCoords.lng);
  if (customerCoords && customerCoords.lat === Number(lat.toFixed(6)) && customerCoords.lng === Number(lng.toFixed(6))) {
    deliveryDistanceKm = exactRoadKm;
    updateDeliveryFeeUI();
  }
}

// Loader Dinamis Leaflet CSS & JS (Hanya aktif saat opsi Delivery dipilih)
let leafletAssetsPromise = null;
function loadLeafletAssets() {
  if (typeof L !== 'undefined') return Promise.resolve();
  if (leafletAssetsPromise) return leafletAssetsPromise;

  leafletAssetsPromise = new Promise((resolve, reject) => {
    // 1. Injeksi Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // 2. Injeksi Leaflet JS
    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.crossOrigin = '';
    script.onload = () => resolve();
    script.onerror = (err) => {
      leafletAssetsPromise = null;
      console.error('Gagal memuat Leaflet JS:', err);
      reject(err);
    };
    document.head.appendChild(script);
  });

  return leafletAssetsPromise;
}

async function initDeliveryMap() {
  const mapEl = document.getElementById('deliveryMap');
  if (!mapEl) return;

  if (typeof L === 'undefined') {
    try {
      await loadLeafletAssets();
    } catch (_) {
      return;
    }
  }

  if (!deliveryMap) {
    deliveryMap = L.map('deliveryMap', {
      zoomControl: true,
      attributionControl: false
    }).setView([STORE_COORDS.lat, STORE_COORDS.lng], 14);

    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(deliveryMap);

    deliveryMap.on('click', (e) => {
      const statusEl = document.getElementById('deliveryLocationStatus');
      if (statusEl) {
        statusEl.innerHTML = '📌 Titik dipilih manual. Geser pin merah jika ingin menyesuaikan posisi rumah.';
      }
      setCustomerDeliveryPin(e.latlng.lat, e.latlng.lng, false);
    });

    try {
      const saved = localStorage.getItem(STORAGE_COORDS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
          setCustomerDeliveryPin(parsed.lat, parsed.lng, true);
          return;
        }
      }
    } catch (_) { }

    locateCustomerGPS(false);
  } else {
    setTimeout(() => deliveryMap.invalidateSize(), 150);
  }
}

function locateCustomerGPS(showAlertOnDenied = true) {
  const statusEl = document.getElementById('deliveryLocationStatus');
  const btn = document.getElementById('btnUseCurrentLocation');

  if (!navigator.geolocation) {
    if (statusEl) {
      statusEl.innerHTML = '⚠️ Browser tidak mendukung GPS — silakan <strong>tap peta</strong> di titik rumah Anda.';
    }
    return;
  }

  if (btn) btn.classList.add('opacity-75');
  if (statusEl) statusEl.innerHTML = '🛰️ Mencari titik lokasi GPS Anda...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (btn) btn.classList.remove('opacity-75');
      const { latitude, longitude } = pos.coords;

      if (deliveryMap) {
        if (!userGpsCircle) {
          userGpsCircle = L.circleMarker([latitude, longitude], {
            radius: 7,
            fillColor: '#0284c7',
            color: '#ffffff',
            weight: 2.5,
            opacity: 1,
            fillOpacity: 0.95
          }).addTo(deliveryMap);
        } else {
          userGpsCircle.setLatLng([latitude, longitude]);
        }
      }

      if (statusEl) {
        statusEl.innerHTML = '✅ Lokasi GPS terkini ditemukan! Geser pin merah jika titik belum tepat di depan rumah.';
      }
      setCustomerDeliveryPin(latitude, longitude, true);
    },
    () => {
      if (btn) btn.classList.remove('opacity-75');
      if (statusEl) {
        statusEl.innerHTML = '📍 Izin lokasi tidak aktif — silakan <strong>tap pada peta</strong> atau geser pin merah ke lokasi rumah Anda.';
      }
      if (showAlertOnDenied) {
        showToast('Izin GPS ditolak. Silakan tap langsung lokasi rumah di peta.');
      }
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
  );
}

// Pencarian Alamat / Tempat pada Peta (Gratis via Nominatim OSM)
let mapSearchDebounceTimer = null;

function onMapSearchInput(value) {
  const resultsBox = document.getElementById('mapSearchResults');
  const query = (value || '').trim();

  if (mapSearchDebounceTimer) {
    clearTimeout(mapSearchDebounceTimer);
    mapSearchDebounceTimer = null;
  }

  if (query.length < 3) {
    if (resultsBox) resultsBox.classList.add('hidden');
    return;
  }

  mapSearchDebounceTimer = setTimeout(() => {
    searchMapLocation(true);
  }, 500);
}

const JOMBANG_BBOX = {
  minLat: -7.85,
  maxLat: -7.25,
  minLng: 111.95,
  maxLng: 112.55
};

function isWithinJombangBbox(lat, lng) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= JOMBANG_BBOX.minLat &&
    lat <= JOMBANG_BBOX.maxLat &&
    lng >= JOMBANG_BBOX.minLng &&
    lng <= JOMBANG_BBOX.maxLng
  );
}

const JOMBANG_LANDMARKS = [
  { name: 'Alun-Alun Jombang', subtitle: 'Jl. KH. Wahid Hasyim, Jombang', lat: -7.5461, lng: 112.2331, aliases: ['alun alun', 'alun2'] },
  { name: 'Stasiun Jombang', subtitle: 'Jl. Basuki Rahmat, Jombang', lat: -7.5582, lng: 112.2334, aliases: ['stasiun', 'ka jombang'] },
  { name: 'SMAN 2 Jombang', subtitle: 'Jl. Dr. Wahidin Sudirohusodo, Jombang', lat: -7.5432, lng: 112.2356, aliases: ['sma negeri 2', 'smada', 'sman 2'] },
  { name: 'SMAN 1 Jombang', subtitle: 'Jl. Bupati R. Soedirman, Jombang', lat: -7.5488, lng: 112.2305, aliases: ['sma negeri 1', 'smasa', 'sman 1'] },
  { name: 'SMAN 3 Jombang', subtitle: 'Jl. Dr. Soetomo, Jombang', lat: -7.5416, lng: 112.2286, aliases: ['sma negeri 3', 'smaga', 'sman 3'] },
  { name: 'SMPN 1 Jombang', subtitle: 'Jl. Pattimura, Jombang', lat: -7.5453, lng: 112.2279, aliases: ['smp negeri 1', 'smpn 1'] },
  { name: 'SMPN 2 Jombang', subtitle: 'Jl. Bupati R. Soedirman, Jombang', lat: -7.5495, lng: 112.2309, aliases: ['smp negeri 2', 'smpn 2'] },
  { name: 'SMKN 1 Jombang', subtitle: 'Jl. Dr. Soetomo, Jombang', lat: -7.5405, lng: 112.2292, aliases: ['smk negeri 1', 'smkn 1'] },
  { name: 'MAN 1 Jombang', subtitle: 'Jl. Dr. Wahidin Sudirohusodo, Jombang', lat: -7.5441, lng: 112.2371, aliases: ['madrasah aliyah negeri 1', 'man 1'] },
  { name: 'RSUD Jombang', subtitle: 'Jl. KH. Wahid Hasyim No.52, Jombang', lat: -7.5499, lng: 112.2273, aliases: ['rumah sakit umum daerah', 'rsud'] },
  { name: 'RS Islam Jombang', subtitle: 'Jl. Brigjen Kretarto, Jombang', lat: -7.5378, lng: 112.2376, aliases: ['rumah sakit islam', 'rsi jombang'] },
  { name: 'Taman Kebonratu', subtitle: 'Jl. Brigjen Kretarto, Keplaksari, Peterongan', lat: -7.5396, lng: 112.2484, aliases: ['kebon ratu', 'taman kebon ratu'] },
  { name: 'Ringin Contong', subtitle: 'Simpang Empat Jl. KH. Wahid Hasyim, Jombang', lat: -7.5515, lng: 112.2306, aliases: ['ringin contong', 'bundaran ringin'] },
  { name: 'Universitas Darul Ulum (Undar)', subtitle: 'Jl. Gus Dur No.29A, Mojongapit, Jombang', lat: -7.5539, lng: 112.2449, aliases: ['undar', 'univ darul ulum', 'universitas darul ulum'] },
  { name: 'Unipdu Peterongan', subtitle: 'Komplek Ponpes Darul Ulum, Peterongan, Jombang', lat: -7.5456, lng: 112.2756, aliases: ['unipdu', 'darul ulum peterongan'] },
  { name: 'Pasar Legi Jombang', subtitle: 'Jl. Seroja, Jombang', lat: -7.5532, lng: 112.2261, aliases: ['pasar legi', 'pasar citra niaga'] },
  { name: 'Terminal Kepuhsari', subtitle: 'Kepuhsari, Peterongan, Jombang', lat: -7.5471, lng: 112.2636, aliases: ['terminal jombang', 'kepuhsari'] },
  { name: 'Denanyar', subtitle: 'Desa Denanyar, Kec. Jombang', lat: -7.5345, lng: 112.2155, aliases: ['denanyar', 'ponpes mambaul maarif'] },
  { name: 'Ponpes Tebuireng', subtitle: 'Cukir, Diwek, Jombang', lat: -7.6063, lng: 112.2375, aliases: ['tebuireng', 'makam gus dur', 'cukir'] },
  { name: 'Alun-Alun Mojoagung', subtitle: 'Jl. Raya Mojoagung, Jombang', lat: -7.5681, lng: 112.3469, aliases: ['mojoagung', 'pasar mojoagung'] }
];

const MAP_ABBREVIATION_RULES = [
  [/\bsma negeri\b/gi, 'sman'],
  [/\bsmp negeri\b/gi, 'smpn'],
  [/\bsmk negeri\b/gi, 'smkn'],
  [/\bmadrasah aliyah negeri\b/gi, 'man'],
  [/\brumah sakit umum daerah\b/gi, 'rsud'],
  [/\brumah sakit\b/gi, 'rs'],
  [/\bperumahan\b/gi, 'perum'],
  [/\bjalan\b/gi, 'jl'],
  [/\buniversitas\b/gi, 'univ']
];

function normalizeMapKeyword(rawQuery) {
  let normalized = (rawQuery || '').trim().replace(/\s+/g, ' ');
  for (const [pattern, replacement] of MAP_ABBREVIATION_RULES) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized.trim();
}

function matchJombangLandmarks(rawQuery) {
  const normalized = normalizeMapKeyword(rawQuery).toLowerCase();
  const rawLower = (rawQuery || '').trim().toLowerCase();
  if (!normalized || normalized.length < 2) return [];

  return JOMBANG_LANDMARKS.filter((lm) => {
    const nameLower = lm.name.toLowerCase();
    const subLower = lm.subtitle.toLowerCase();
    if (nameLower.includes(normalized) || nameLower.includes(rawLower) || subLower.includes(normalized)) {
      return true;
    }
    return lm.aliases.some((alias) => alias.includes(normalized) || normalized.includes(alias) || alias.includes(rawLower));
  }).map((lm) => ({
    lat: lm.lat,
    lng: lm.lng,
    title: lm.name,
    subtitle: lm.subtitle,
    fullName: `${lm.name} — ${lm.subtitle}`
  }));
}

function buildMapSearchQueries(rawQuery) {
  const normalized = normalizeMapKeyword(rawQuery);
  if (!normalized) return [];

  const queries = new Set();
  const hasJombang = /\bjombang\b/i.test(normalized);

  if (hasJombang) {
    queries.add(normalized);
    const withoutJombang = normalized.replace(/\bdi\s+jombang\b/gi, '').replace(/\bjombang\b/gi, '').replace(/[,\s]+$/g, '').trim();
    if (withoutJombang.length >= 2) {
      queries.add(withoutJombang);
    }
  } else {
    queries.add(`${normalized} jombang`);
    queries.add(normalized);
  }

  return Array.from(queries).slice(0, 3);
}

function formatPhotonPlace(feature) {
  const coords = feature?.geometry?.coordinates;
  const props = feature?.properties || {};
  if (!Array.isArray(coords) || coords.length < 2) return null;

  const lng = Number(coords[0]);
  const lat = Number(coords[1]);
  if (!isWithinJombangBbox(lat, lng)) return null;

  const title = props.name || props.street || props.district || props.city || props.county || 'Lokasi';
  const rawParts = [
    props.street,
    props.village || props.suburb || props.locality,
    props.district,
    props.city || props.county
  ].filter(Boolean);

  const seen = new Set([title.toLowerCase()]);
  const subtitleParts = [];
  for (const part of rawParts) {
    const key = part.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      subtitleParts.push(part);
    }
  }

  const subtitle = subtitleParts.join(', ');
  const fullName = subtitle ? `${title} — ${subtitle}` : title;
  return { lat, lng, title, subtitle, fullName };
}

async function fetchPhotonPlaces(query) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lat=-7.546&lon=112.233&limit=15`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Photon HTTP ${res.status}`);
  const data = await res.json();
  const features = Array.isArray(data?.features) ? data.features : [];
  return features.map(formatPhotonPlace).filter(Boolean);
}

async function fetchNominatimPlaces(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=id&viewbox=111.95,-7.25,112.55,-7.85&bounded=1&limit=10&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'id' }
  });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data
    .map((place) => {
      const lat = Number(place.lat);
      const lng = Number(place.lon);
      if (!isWithinJombangBbox(lat, lng)) return null;

      const fullName = place.display_name || '';
      const parts = fullName.split(',').map((s) => s.trim()).filter(Boolean);
      const title = parts[0] || fullName;
      const subtitle = parts.slice(1, 4).join(', ');
      return {
        lat,
        lng,
        title,
        subtitle: subtitle || fullName,
        fullName: subtitle ? `${title} — ${subtitle}` : title
      };
    })
    .filter(Boolean);
}

function deduplicatePlaces(places) {
  const unique = [];
  for (const place of places) {
    if (!isWithinJombangBbox(place.lat, place.lng)) continue;
    const isTooClose = unique.some(
      (existing) => calculateHaversineKm(existing.lat, existing.lng, place.lat, place.lng) < 0.1
    );
    if (!isTooClose) {
      unique.push(place);
    }
  }
  return unique.slice(0, 10);
}

async function searchMapLocation(isAuto = false) {
  if (mapSearchDebounceTimer) {
    clearTimeout(mapSearchDebounceTimer);
    mapSearchDebounceTimer = null;
  }

  const input = document.getElementById('mapSearchInput');
  const resultsBox = document.getElementById('mapSearchResults');
  const btn = document.getElementById('btnMapSearch');
  const query = (input?.value || '').trim();

  if (query.length < 3) {
    if (!isAuto) {
      showToast('Ketik minimal 3 huruf nama jalan/tempat');
      input?.focus();
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = '...';
  }

  try {
    const landmarkMatches = matchJombangLandmarks(query);
    const queries = buildMapSearchQueries(query);

    const settled = await Promise.allSettled([
      ...queries.map((q) => fetchPhotonPlaces(q)),
      ...queries.map((q) => fetchNominatimPlaces(q))
    ]);

    const apiPlaces = settled
      .filter((r) => r.status === 'fulfilled' && Array.isArray(r.value))
      .flatMap((r) => r.value);

    const places = deduplicatePlaces([...landmarkMatches, ...apiPlaces]);

    if (!resultsBox) return;

    if (places.length === 0) {
      resultsBox.innerHTML = `
        <div class="p-3 text-xs text-stone-500 text-center leading-relaxed">
          Alamat tidak ditemukan? Pilih jalan/desa terdekat lalu geser pin langsung di peta, atau klik tombol <strong>Lokasi Saya</strong>.
        </div>
      `;
      resultsBox.classList.remove('hidden');
      return;
    }

    resultsBox.innerHTML = places.map((place) => {
      const safeFullName = escapeHtml(place.fullName);
      const safeTitle = escapeHtml(place.title);
      const safeSubtitle = escapeHtml(place.subtitle || place.fullName);
      return `
        <button 
          type="button"
          data-lat="${escapeHtml(String(place.lat))}"
          data-lng="${escapeHtml(String(place.lng))}"
          data-name="${safeFullName}"
          onclick="selectSearchedLocationFromBtn(this)"
          class="w-full text-left px-3 py-2 hover:bg-brand-50 transition flex items-start gap-2"
        >
          <span class="text-xs mt-0.5">📍</span>
          <div class="min-w-0">
            <p class="text-xs font-bold text-stone-800 truncate">${safeTitle}</p>
            <p class="text-[10px] text-stone-500 line-clamp-1">${safeSubtitle}</p>
          </div>
        </button>
      `;
    }).join('');

    resultsBox.classList.remove('hidden');
  } catch (err) {
    console.warn('Gagal mencari lokasi:', err);
    showToast('Koneksi pencarian sibuk, coba geser pin langsung di peta');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Cari';
    }
  }
}

function selectSearchedLocationFromBtn(btnEl) {
  if (!btnEl) return;
  const lat = Number(btnEl.dataset.lat);
  const lng = Number(btnEl.dataset.lng);
  const displayName = btnEl.dataset.name || '';
  selectSearchedLocation(lat, lng, displayName);
}

function selectSearchedLocation(lat, lng, displayName) {
  const input = document.getElementById('mapSearchInput');
  const resultsBox = document.getElementById('mapSearchResults');
  const statusEl = document.getElementById('deliveryLocationStatus');
  const shortName = escapeHtml((displayName || '').split(',')[0]);

  if (input && displayName) input.value = displayName;
  if (resultsBox) resultsBox.classList.add('hidden');
  if (statusEl) {
    statusEl.innerHTML = `📍 Titik dipindah ke <strong>${shortName}</strong>. Geser pin merah jika posisi rumah belum pas.`;
  }

  setCustomerDeliveryPin(Number(lat), Number(lng), true);
}

document.addEventListener('click', (e) => {
  const resultsBox = document.getElementById('mapSearchResults');
  const searchInput = document.getElementById('mapSearchInput');
  const searchBtn = document.getElementById('btnMapSearch');
  if (!resultsBox || resultsBox.classList.contains('hidden')) return;
  if (
    !resultsBox.contains(e.target) &&
    e.target !== searchInput &&
    e.target !== searchBtn
  ) {
    resultsBox.classList.add('hidden');
  }
});

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
      upsert: false
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
  openResetCartModal();
}

function openResetCartModal() {
  const modal = document.getElementById('resetCartConfirmModal');
  const box = document.getElementById('resetCartConfirmBox');
  if (!modal || !box) return;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('scale-95');
  box.classList.add('scale-100');
}

function closeResetCartModal() {
  const modal = document.getElementById('resetCartConfirmModal');
  const box = document.getElementById('resetCartConfirmBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('scale-95');
  box.classList.remove('scale-100');
}

function confirmResetCart() {
  closeResetCartModal();

  const productIds = Object.keys(cart);
  if (productIds.length === 0) return;

  cart = {};
  saveCartToStorage();
  productIds.forEach(id => updateProductCardState(id));
  updateUI();
  showToast('Keranjang berhasil dikosongkan');
  closeCartModal();
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

function formatIndonesianPickupDate(isoStr, withRelativeTag = false) {
  if (!isoStr || !/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return '';
  const [y, m, d] = isoStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);

  const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const dateText = `${namaHari[target.getDay()]} ${target.getDate()} ${namaBulan[target.getMonth()]} ${y}`;

  if (!withRelativeTag) return dateText;

  const todayIso = getTodayWIBIso();
  const [ty, tm, td] = todayIso.split('-').map(Number);
  const today = new Date(ty, tm - 1, td);
  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays === 0) return `Hari Ini (${dateText})`;
  if (diffDays === 1) return `Besok (${dateText})`;
  if (diffDays === 2) return `Lusa (${dateText})`;
  return dateText;
}

function formatPickupDisplay(rawPickupTime) {
  const raw = String(rawPickupTime || '').trim();
  if (!raw) return '-';
  const cleaned = raw.replace(/^(Hari Ini|Besok|Lusa)\s+adalah\s+/i, '');
  if (/\bpukul\b/i.test(cleaned)) return cleaned;
  if (/^\d{1,2}:\d{2}$/.test(cleaned)) return `pukul (${cleaned})`;
  return cleaned.replace(/\s*\((\d{1,2}:\d{2})\)$/, ' pukul ($1)');
}

function updatePickupDatePreview() {
  const dateInput = document.getElementById('pickupDateSelect');
  const previewEl = document.getElementById('pickupDatePreview');
  if (!dateInput || !previewEl) return;

  const formatted = formatIndonesianPickupDate(dateInput.value, true);
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

  syncFromSupabase().then(() => {
    initProductGrid();
    updateUI();
    updateStoreStatus();
    renderModalCart();
  }).catch(() => { });

  if (!isStoreOpen()) {
    showToast('Toko sedang tutup. Fitur checkout dibuka kembali pukul 08.00 WIB');
    return;
  }

  const modal = document.getElementById('cartModal');
  const box = document.getElementById('cartContentBox');
  if (!modal || !box) return;

  renderModalCart();
  updateCustomerPhoneFieldUI();

  if (selectedOrderMethod === 'delivery') {
    loadLeafletAssets().then(() => {
      setTimeout(() => initDeliveryMap(), 180);
    });
  }

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
  const listContainer = document.getElementById('cartItemList');
  const modalItemSubtitle = document.getElementById('modalItemSubtitle');
  const modalTotalItems = document.getElementById('modalTotalItems');
  const modalTotalPrice = document.getElementById('modalTotalPrice');
  const modalBtnSubmit = document.getElementById('modalBtnSubmit');

  const { items, totalItems, totalPrice } = getCartSummary();
  const deliveryInfo = getDeliveryFeeSummary();
  const grandTotal = totalPrice + (selectedOrderMethod === 'delivery' ? deliveryInfo.fee : 0);

  if (modalItemSubtitle) modalItemSubtitle.textContent = `${totalItems} item dipilih`;
  if (modalTotalItems) modalTotalItems.textContent = `${totalItems} pcs`;

  const subtotalEl = document.getElementById('modalSubtotalPrice');
  const feeRowEl = document.getElementById('modalDeliveryFeeRow');
  const feeLabelEl = document.getElementById('modalDeliveryFeeLabel');
  const feeValEl = document.getElementById('modalDeliveryFee');

  if (subtotalEl) subtotalEl.textContent = formatRupiah(totalPrice);
  if (feeRowEl && feeLabelEl && feeValEl) {
    if (selectedOrderMethod === 'delivery') {
      feeRowEl.classList.remove('hidden');
      if (!deliveryInfo.hasPin) {
        feeLabelEl.textContent = 'Ongkos Kirim:';
        feeValEl.textContent = 'Pilih titik di peta';
        feeValEl.className = 'font-bold text-amber-600';
      } else if (deliveryInfo.isOutOfRange) {
        feeLabelEl.textContent = `Ongkos Kirim (${deliveryInfo.distanceKm} km):`;
        feeValEl.textContent = 'Di luar jangkauan';
        feeValEl.className = 'font-bold text-rose-600';
      } else {
        feeLabelEl.textContent = `Ongkos Kirim (${deliveryInfo.distanceKm} km):`;
        feeValEl.textContent = deliveryInfo.fee === 0 ? 'Gratis' : formatRupiah(deliveryInfo.fee);
        feeValEl.className = 'font-bold text-stone-800';
      }
    } else {
      feeRowEl.classList.add('hidden');
    }
  }

  if (modalTotalPrice) modalTotalPrice.textContent = formatRupiah(grandTotal);

  if (!listContainer) return;

  if (items.length === 0) {
    if (modalBtnSubmit) modalBtnSubmit.disabled = true;
    listContainer.innerHTML = `
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

  listContainer.innerHTML = items.map(item => `
    <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 ${item.flavorBg} flex items-center justify-center shadow-xs">
          <span class="text-xs">🥪</span>
        </div>
        <div class="min-w-0">
          <h5 class="font-bold text-stone-900 text-xs truncate">${escapeHtml(item.name)}</h5>
          <div class="text-[10px] text-stone-500">
            ${formatRupiah(item.price)} × ${item.qty}
          </div>
          <span class="text-xs font-black text-brand-600">${formatRupiah(item.subtotal)}</span>
        </div>
      </div>

      <div class="flex items-center bg-white rounded-lg p-0.5 border border-stone-200 shrink-0">
        <button 
          type="button"
          onclick="updateQty('${escapeHtml(item.id)}', -1)"
          class="w-6 h-6 rounded bg-stone-100 text-stone-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center font-bold text-xs"
          aria-label="Kurangi"
        >
          -
        </button>
        <span class="w-7 text-center text-xs font-bold text-stone-800">${item.qty}</span>
        <button 
          type="button"
          onclick="updateQty('${escapeHtml(item.id)}', 1)"
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
    clearFieldError('deliveryMap');
  } else {
    tabDelivery?.classList.add('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');
    tabDelivery?.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
    tabPickup?.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
    tabPickup?.classList.remove('border-brand-500', 'bg-brand-50/80', 'text-brand-900', 'shadow-xs');

    pickupSection?.classList.add('hidden');
    deliverySection?.classList.remove('hidden');
    clearFieldError('pickupTime');
    loadLeafletAssets().then(() => {
      setTimeout(() => initDeliveryMap(), 80);
    });
  }

  clearFieldError('orderMethod');
  renderModalCart();
}

function updateCustomerPhoneFieldUI() {
  const phoneGroup = document.getElementById('customerPhoneGroup');
  const requiredMark = document.getElementById('customerPhoneRequiredMark');
  const hintEl = document.getElementById('customerPhoneHint');
  const isQris = selectedPaymentMethod === 'qris';

  if (phoneGroup) {
    phoneGroup.classList.remove('hidden');
  }
  if (requiredMark) {
    requiredMark.textContent = '*';
    requiredMark.className = 'text-rose-500';
  }
  if (hintEl) {
    hintEl.textContent = isQris
      ? 'Wajib diisi untuk jaga-jaga agar admin tetap bisa menghubungi Anda jika lupa mengirim konfirmasi ke WhatsApp.'
      : 'Wajib diisi agar admin dapat menghubungi Anda lewat WhatsApp / telepon saat pesanan diproses atau diantar.';
  }
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
    clearFieldError('customerPhone');
  }

  updateCustomerPhoneFieldUI();
  clearFieldError('qrisProof');
  renderModalCart();
}

function isSelectedPickupToday() {
  const dateInput = document.getElementById('pickupDateSelect');
  if (!dateInput || !dateInput.value) return true;
  return dateInput.value === getTodayWIBIso();
}

// 15b. Handler Input Jam Manual (Otomatis Tahan di Jam Operasional 08:00 - 20:00 WIB)
function onPickupHourInput(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 2);

  if (v.length === 1) {
    const d = parseInt(v, 10);
    if (d === 8 || d === 9) {
      v = '0' + d;
    } else if (d >= 3 && d <= 7) {
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

  // 1b. Validasi Nomor WhatsApp / Telepon (Wajib untuk QRIS & Tunai)
  const phoneInput = document.getElementById('customerPhone');
  const phoneRaw = (phoneInput?.value || '').trim();
  let normalizedPhone = null;
  if (!phoneRaw) {
    setFieldError('customerPhone', 'Nomor WhatsApp / Telepon wajib diisi');
    hasError = true;
    if (!firstErrorEl) firstErrorEl = phoneInput;
  } else {
    if (/[^\d\s+\-().]/.test(phoneRaw)) {
      setFieldError('customerPhone', 'Nomor telepon hanya boleh berisi angka (cth: 081234567890)');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = phoneInput;
    } else if (!isValidIndonesianPhone(phoneRaw)) {
      setFieldError('customerPhone', 'Format nomor HP Indonesia tidak valid (cth: 081234567890, 10–14 digit)');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = phoneInput;
    } else {
      clearFieldError('customerPhone');
      normalizedPhone = normalizeIndonesianPhone(phoneRaw);
      if (phoneInput) phoneInput.value = normalizedPhone;
      try {
        localStorage.setItem(STORAGE_PHONE_KEY, normalizedPhone);
      } catch (_) { }
    }
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
    const deliveryInfo = getDeliveryFeeSummary();
    const mapBoxEl = document.getElementById('deliveryMap');

    if (!deliveryInfo.hasPin) {
      setFieldError('deliveryMap', 'Silakan tentukan titik lokasi rumah pada peta (klik Lokasi Saya atau tap peta)');
      hasError = true;
      if (!firstErrorEl) firstErrorEl = mapBoxEl;
    } else if (deliveryInfo.isOutOfRange) {
      setFieldError('deliveryMap', `Maaf, jarak pengantaran (${deliveryInfo.distanceKm} km) melebihi batas maksimal ${DELIVERY_CONFIG.maxDistanceKm} km.`);
      hasError = true;
      if (!firstErrorEl) firstErrorEl = mapBoxEl;
    } else {
      clearFieldError('deliveryMap');
    }

    const addrInput = document.getElementById('deliveryAddress');
    const addrVal = (addrInput?.value || '').trim();
    if (addrVal.length < 6) {
      setFieldError('deliveryAddress', 'Detail alamat & patokan rumah wajib diisi (minimal 6 karakter)');
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
    pickupTimeFormatted = pickupDateLabel ? `${pickupDateLabel} pukul (${clockStr})` : `pukul (${clockStr})`;
  }

  const deliveryInfo = getDeliveryFeeSummary();
  const deliveryFee = selectedOrderMethod === 'delivery' ? deliveryInfo.fee : 0;

  pendingOrder = {
    customerName: nameVal,
    customerPhone: normalizedPhone,
    orderMethod: selectedOrderMethod,
    pickupTime: pickupTimeFormatted,
    deliveryAddress: selectedOrderMethod === 'delivery' ? document.getElementById('deliveryAddress').value.trim() : null,
    deliveryDistanceKm: selectedOrderMethod === 'delivery' ? deliveryInfo.distanceKm : null,
    deliveryFee: deliveryFee,
    deliveryRouteUrl: selectedOrderMethod === 'delivery' ? deliveryInfo.routeUrl : null,
    paymentMethod: selectedPaymentMethod,
    items: [...items],
    totalItems: totalItems,
    subtotalPrice: totalPrice,
    totalPrice: totalPrice + deliveryFee
  };

  renderConfirmModal(pendingOrder);
  openConfirmModal();
  return true;
}

// 17b. Modal Konfirmasi Data Pesanan (#confirmModal)
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

  const cfmPhoneRow = document.getElementById('cfmCustomerPhoneRow');
  const cfmPhoneEl = document.getElementById('cfmCustomerPhone');
  if (cfmPhoneRow && cfmPhoneEl) {
    if (order.customerPhone) {
      cfmPhoneEl.textContent = order.customerPhone;
      cfmPhoneRow.classList.remove('hidden');
    } else {
      cfmPhoneEl.textContent = '-';
      cfmPhoneRow.classList.add('hidden');
    }
  }

  const methodText = order.orderMethod === 'pickup' ? 'Ambil Sendiri (Pickup)' : 'Diantar / COD (Delivery)';
  document.getElementById('cfmOrderMethod').textContent = methodText;

  const detailBox = document.getElementById('cfmDetailBox');
  if (order.orderMethod === 'pickup') {
    detailBox.innerHTML = `<strong>Rencana Ambil:</strong> ${escapeHtml(formatPickupDisplay(order.pickupTime))} WIB di Kedai Mellowbites`;
  } else {
    const ongkirLabel = (order.deliveryFee || 0) > 0 ? formatRupiah(order.deliveryFee) : 'Gratis';
    detailBox.innerHTML = `
      <strong>Alamat Pengiriman:</strong> ${escapeHtml(order.deliveryAddress)}
      <div class="mt-1 pt-1 border-t border-stone-100 text-brand-700 font-bold">
        🛵 Jarak: ${order.deliveryDistanceKm ?? '-'} km • Ongkir: ${ongkirLabel}
      </div>
    `;
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
  if (isCreatingOrder) return;

  if (!pendingOrder) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  if (!isStoreOpen()) {
    showToast('Toko sedang tutup. Fitur checkout dibuka kembali pukul 08.00 WIB');
    closeConfirmModal();
    return;
  }

  const btn = document.getElementById('btnProceedCreateOrder');
  const origHtml = btn ? btn.innerHTML : '';

  try {
    isCreatingOrder = true;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>Memproses...</span>';
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
  } finally {
    isCreatingOrder = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
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
  if (!order) return false;
  if (order._isRecordedToBackend) return true;
  if (order._recordPromise) return order._recordPromise;

  order._recordPromise = (async () => {
    const safeCleanAddress = order.deliveryAddress
      ? order.deliveryAddress.trim().replace(/\[/g, '(').replace(/\]/g, ')')
      : null;

    const formattedDeliveryAddress = order.orderMethod === 'delivery'
      ? `${safeCleanAddress} [Jarak: ${order.deliveryDistanceKm ?? '-'} km | Ongkir: ${formatRupiah(order.deliveryFee || 0)}]${order.deliveryRouteUrl ? ` • Rute Maps: ${order.deliveryRouteUrl}` : ''}`
      : null;

    if (!sbClient) {
      order._isRecordedToBackend = true;
      saveCustomerOrderHistory(order);
      return true;
    }

    const { error: insertErr } = await sbClient.from('orders').insert([{
      order_number: order.orderNumber,
      customer_name: order.customerName,
      customer_phone: order.customerPhone || null,
      order_method: order.orderMethod,
      pickup_time: order.pickupTime,
      delivery_address: formattedDeliveryAddress,
      payment_method: order.paymentMethod,
      payment_proof_url: order.paymentProofUrl,
      items: order.items,
      total_items: order.totalItems,
      total_price: order.totalPrice
    }]);

    if (insertErr) {
      console.warn('Gagal mencatat pesanan ke rekap admin:', insertErr);
      return false;
    }

    // Hanya masuk ke Riwayat Pesanan setelah dipastikan tercatat di database admin
    order._isRecordedToBackend = true;
    saveCustomerOrderHistory(order);

    order._isRecordedToBackend = true;

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
        No_Telepon: order.customerPhone || '-',
        Metode_Pesanan: order.orderMethod === 'pickup'
          ? `Ambil Sendiri (${formatPickupDisplay(order.pickupTime)} WIB)`
          : `Diantar / COD (${formattedDeliveryAddress})`,
        Metode_Pembayaran: order.paymentMethod.toUpperCase(),
        Bukti_Transfer: order.paymentProofUrl || '-',
        Rincian_Pesanan: `\n${daftarMenuEmail}`,
        Total_Bayar: formatRupiah(order.totalPrice)
      })
    }).catch(err => console.warn('Gagal kirim notifikasi email:', err));

    return true;
  })();

  try {
    return await order._recordPromise;
  } finally {
    order._recordPromise = null;
  }
}

// 17e. Finalisasi Simpan ke Database (Khusus QRIS) & Buka Struk Digital
async function finalizeAndIssueReceipt(finalOrder) {
  currentOrder = {
    ...finalOrder,
    _isRecordedToBackend: false,
    _recordPromise: null
  };

  try {
    localStorage.setItem(STORAGE_NAME_KEY, currentOrder.customerName);
    if (currentOrder.customerPhone) {
      localStorage.setItem(STORAGE_PHONE_KEY, currentOrder.customerPhone);
    }
    if (currentOrder.deliveryAddress) {
      localStorage.setItem(STORAGE_ADDRESS_KEY, currentOrder.deliveryAddress);
    }
  } catch (_) { }

  const productIds = Object.keys(cart);
  cart = {};
  saveCartToStorage();
  clearQrisProof();

  productIds.forEach(id => updateProductCardState(id));
  updateUI();

  closeConfirmModal();
  closeCartModal();

  // Tetap terkunci (false) untuk semua metode pembayaran sampai tombol WhatsApp diklik
  hasConfirmedWhatsApp = false;
  hasSentWhatsAppClick = false;

  if (isQrisOrder(currentOrder)) {
    // QRIS: Langsung simpan ke database begitu struk terbit
    await recordOrderToBackend(currentOrder);
  }

  // Simpan status pending WA agar banner pengingat muncul jika tab ditutup paksa
  const { _recordPromise, ...serializableOrder } = currentOrder;
  try {
    localStorage.setItem('mellowbites_pending_wa_order', JSON.stringify(serializableOrder));
  } catch (_) { }

  updateReceiptConfirmationState();
  renderReceiptModal(currentOrder);
  openReceiptModal();

  if (isQrisOrder(currentOrder) && currentOrder._isRecordedToBackend) {
    showToast('Bukti QRIS tercatat! Wajib klik Konfirmasi WhatsApp untuk menutup struk.');
  } else {
    showToast('Struk siap! Wajib klik Konfirmasi ke WhatsApp agar pesanan diproses.');
  }
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

  if (!hasConfirmedWhatsApp) {
    history.pushState({ receiptLocked: true }, '', location.href);
  }
}

window.addEventListener('popstate', () => {
  const modal = document.getElementById('receiptModal');
  const isReceiptOpen = modal && !modal.classList.contains('pointer-events-none');

  if (isReceiptOpen && !hasConfirmedWhatsApp) {
    history.pushState({ receiptLocked: true }, '', location.href);
    showToast('⚠️ Wajib konfirmasi pesanan ke WhatsApp terlebih dahulu!');
    flashWaNotice();
  }
});

window.addEventListener('beforeunload', (e) => {
  const modal = document.getElementById('receiptModal');
  const isReceiptOpen = modal && !modal.classList.contains('pointer-events-none');

  if (isReceiptOpen && !hasConfirmedWhatsApp) {
    e.preventDefault();
  }
});

function closeReceiptModal(force = false) {
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
      if (isQrisOrder(currentOrder) && currentOrder._isRecordedToBackend) {
        text.innerHTML = '<strong class="font-bold">Bukti QRIS tercatat — Wajib Konfirmasi WA:</strong> Klik tombol hijau di bawah untuk konfirmasi ke WhatsApp agar pesanan segera diproses. Struk tidak dapat ditutup sebelum konfirmasi.';
      } else {
        text.innerHTML = '<strong class="font-bold">Wajib:</strong> Klik tombol hijau di bawah untuk konfirmasi ke WhatsApp agar pesanan masuk & segera dibuatkan. Struk tidak dapat ditutup sebelum konfirmasi.';
      }
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

  const rcptPhoneRow = document.getElementById('rcptCustomerPhoneRow');
  const rcptPhoneEl = document.getElementById('rcptCustomerPhone');
  const rcptPhoneVal = (order.customerPhone || order.customer_phone || '').trim();
  if (rcptPhoneRow && rcptPhoneEl) {
    if (rcptPhoneVal) {
      rcptPhoneEl.textContent = normalizeIndonesianPhone(rcptPhoneVal) || rcptPhoneVal;
      rcptPhoneRow.classList.remove('hidden');
    } else {
      rcptPhoneEl.textContent = '-';
      rcptPhoneRow.classList.add('hidden');
    }
  }

  const methodText = order.orderMethod === 'pickup' ? 'Ambil Sendiri (Pickup)' : 'Diantar / COD (Delivery)';
  document.getElementById('rcptOrderMethod').textContent = methodText;

  const detailRow = document.getElementById('rcptDetailRow');
  if (order.orderMethod === 'pickup') {
    detailRow.innerHTML = `<strong>Rencana Ambil:</strong> ${escapeHtml(formatPickupDisplay(order.pickupTime))} WIB di Kedai Mellowbites`;
  } else {
    detailRow.innerHTML = `<strong>Alamat Pengiriman:</strong> ${escapeHtml(order.deliveryAddress)}`;
  }

  const rcptFeeRow = document.getElementById('rcptDeliveryFeeRow');
  const rcptFeeLabel = document.getElementById('rcptDeliveryFeeLabel');
  const rcptFeeVal = document.getElementById('rcptDeliveryFee');
  if (rcptFeeRow && rcptFeeLabel && rcptFeeVal) {
    if (order.orderMethod === 'delivery') {
      rcptFeeRow.classList.remove('hidden');
      rcptFeeLabel.textContent = order.deliveryDistanceKm != null
        ? `Ongkos Kirim (${order.deliveryDistanceKm} km):`
        : 'Ongkos Kirim:';
      rcptFeeVal.textContent = (order.deliveryFee || 0) === 0 ? 'Gratis' : formatRupiah(order.deliveryFee);
    } else {
      rcptFeeRow.classList.add('hidden');
    }
  }

  const payBadge = document.getElementById('rcptPaymentMethod');
  if (order.paymentMethod === 'qris') {
    payBadge.textContent = 'QRIS';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-brand-100 text-brand-800';
  } else {
    payBadge.textContent = 'Tunai (COD)';
    payBadge.className = 'font-extrabold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800';
  }

  const itemsList = document.getElementById('rcptItemsList');
  itemsList.innerHTML = order.items.map(item => `
    <div class="rcpt-item-row">
      <div style="min-width: 0; flex: 1;">
        <p class="rcpt-item-name">${escapeHtml(item.name)}</p>
        <p class="rcpt-item-sub">${formatRupiah(item.price)} × ${item.qty}</p>
      </div>
      <span class="rcpt-item-price">${formatRupiah(item.subtotal)}</span>
    </div>
  `).join('');

  document.getElementById('rcptTotalItems').textContent = `${order.totalItems} pcs`;
  document.getElementById('rcptTotalPrice').textContent = formatRupiah(order.totalPrice);
}

// Unduh Struk Digital sebagai Gambar PNG via html2canvas
async function downloadReceiptPng() {
  if (typeof html2canvas === 'undefined') {
    showToast('Library pembuat gambar sedang dimuat, silakan coba sesaat lagi...');
    return;
  }
  const paper = document.getElementById('receiptPaper');
  if (!paper || !currentOrder) return;

  showToast('Membuat struk gambar PNG...');

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(paper, {
      scale: 2.5,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedPaper = clonedDoc.getElementById('receiptPaper');
        if (clonedPaper) {
          clonedPaper.style.transform = 'none';
          clonedPaper.style.margin = '0 auto';
          clonedPaper.style.boxShadow = 'none';
          clonedPaper.style.width = '360px';
          clonedPaper.style.maxWidth = '360px';
          clonedPaper.style.overflow = 'visible';

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
    } catch (_) { }
  }

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

// 21. Generator Teks Ringkasan Pesanan (Format WhatsApp Lengkap)
function buildOrderString() {
  const o = currentOrder;
  if (!o) return null;

  const formattedDate = formatDateTime(o.timestamp);

  let text = `Halo Kak, saya mau konfirmasi pesanan *Es Gabin - Mellowbites*:\n\n`;
  text += `*No. Order:* ${o.orderNumber}\n`;
  text += `*Waktu Pesan:* ${formattedDate}\n`;
  text += `*Nama Pemesan:* ${o.customerName}\n`;
  if (o.customerPhone) {
    text += `*No. Telp / WA:* ${o.customerPhone}\n`;
  }
  text += `\n`;

  text += `*Metode Pesanan:* ${o.orderMethod === 'pickup' ? `Ambil Sendiri (Pickup) - ${formatPickupDisplay(o.pickupTime)} WIB` : `Diantar / COD (Delivery)`}\n`;
  if (o.orderMethod === 'delivery') {
    text += `*Alamat Pengiriman:* ${o.deliveryAddress}\n`;
    text += `*Jarak & Ongkir:* ${o.deliveryDistanceKm ?? '-'} km (${(o.deliveryFee || 0) === 0 ? 'Gratis' : formatRupiah(o.deliveryFee)})\n`;
    if (o.deliveryRouteUrl) {
      text += `*Link Rute Kurir:* ${o.deliveryRouteUrl}\n`;
    }
  }
  text += `*Metode Pembayaran:* ${o.paymentMethod === 'qris' ? 'QRIS' : 'Tunai (COD)'}\n\n`;

  text += `*Rincian Item:*\n`;
  o.items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}* (${item.qty} pcs) = ${formatRupiah(item.subtotal)}\n`;
  });
  if (o.orderMethod === 'delivery') {
    text += `• *Ongkos Kirim (${o.deliveryDistanceKm ?? '-'} km)* = ${(o.deliveryFee || 0) === 0 ? 'Gratis' : formatRupiah(o.deliveryFee)}\n`;
  }
  text += `\n*Total Item:* ${o.totalItems} pcs\n`;
  text += `*Total Tagihan:* *${formatRupiah(o.totalPrice)}*\n\n`;

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
async function submitWhatsAppOrder() {
  if (!currentOrder) {
    showToast('Silakan buat pesanan terlebih dahulu');
    return;
  }

  const text = buildOrderString();
  if (!text) return;

  const btn = document.getElementById('btnSubmitWaOrder');
  const btnText = document.getElementById('btnSubmitWaText');
  const prevLabel = btnText ? btnText.textContent : '';

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Menyimpan pesanan...';

  try {
    // Untuk Tunai (COD): pesanan baru dicatat ke database di tahap ini.
    // Untuk QRIS: otomatis dilewati jika sudah tercatat saat struk terbit, atau dicoba ulang jika tadi gagal.
    const saved = await recordOrderToBackend(currentOrder);
    if (!saved && !isQrisOrder(currentOrder)) {
      const lanjutWa = confirm(
        'Koneksi ke server sedang bermasalah sehingga pesanan belum tercatat otomatis di sistem. Tetap lanjut konfirmasi manual ke WhatsApp admin?'
      );
      if (!lanjutWa) return;
    }

    hasConfirmedWhatsApp = true;
    hasSentWhatsAppClick = true;
    localStorage.removeItem('mellowbites_pending_wa_order');
    document.getElementById('unconfirmedOrderBanner')?.classList.add('hidden');
    updateReceiptConfirmationState();

    const waNumber = '6285646409023';
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(text)}`;

    showToast('Pesanan masuk & membuka WhatsApp...');
    const waWindow = window.open(waUrl, '_blank');
    if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
      // Fallback untuk in-app browser Instagram / TikTok yang memblokir window.open
      window.location.href = waUrl;
    }
  } finally {
    if (btn) btn.disabled = false;
    if (btnText && !hasConfirmedWhatsApp) {
      btnText.textContent = prevLabel;
    }
  }
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

// 23b. Riwayat Pesanan, Live Tracking & Repeat Order untuk Pelanggan
let customerHistoryChannel = null;

function getOrderTrackingMeta(status, orderMethod) {
  const normalized = String(status || 'Menunggu Konfirmasi').trim();
  const isDelivery = orderMethod === 'delivery';

  if (normalized === 'Tidak Terdeteksi') {
    return {
      step: 0,
      isNotFound: true,
      badgeText: '❌ Tidak Terdeteksi',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      step2Label: isDelivery ? 'Diantar' : 'Disiapkan',
      hintText: 'Pesanan tidak terdeteksi di sistem kedai (kemungkinan belum terkonfirmasi ke admin atau data sudah dihapus).'
    };
  }

  if (normalized === 'Selesai') {
    return {
      step: 3,
      isNotFound: false,
      badgeText: '✅ Selesai',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      step2Label: isDelivery ? 'Diantar' : 'Disiapkan',
      hintText: isDelivery
        ? 'Pesanan sudah sampai & diterima. Terima kasih sudah jajan di Mellowbites!'
        : 'Pesanan sudah diambil. Selamat menikmati Es Gabin Mellowbites!'
    };
  }

  if (normalized === 'Diproses / Diantar') {
    return {
      step: 2,
      isNotFound: false,
      badgeText: isDelivery ? '🛵 Sedang Diantar' : '📦 Sedang Disiapkan',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
      step2Label: isDelivery ? 'Diantar' : 'Disiapkan',
      hintText: isDelivery
        ? 'Pesananmu sudah dikonfirmasi & sedang dalam perjalanan ke lokasimu!'
        : 'Pesananmu sedang disiapkan di kedai. Silakan datang sesuai jam ambil.'
    };
  }

  return {
    step: 1,
    isNotFound: false,
    badgeText: '⏳ Menunggu Konfirmasi',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    step2Label: isDelivery ? 'Diantar' : 'Disiapkan',
    hintText: 'Pesanan masuk & sedang menunggu konfirmasi dari admin kedai.'
  };
}

function getPendingUnrecordedOrder() {
  try {
    const raw = localStorage.getItem('mellowbites_pending_wa_order');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.orderNumber && !parsed._isRecordedToBackend) {
      return parsed;
    }
  } catch (_) { }
  return null;
}

function renderOrderHistoryCards(orders, isSyncing = false) {
  const listContainer = document.getElementById('orderHistoryList');
  if (!listContainer) return;

  const pendingOrder = getPendingUnrecordedOrder();
  const pendingWarningHtml = pendingOrder ? `
    <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2.5 shadow-2xs">
      <div class="flex items-start gap-2.5">
        <span class="text-lg leading-none mt-0.5">⚠️</span>
        <div class="min-w-0 flex-1 space-y-1">
          <p class="text-xs font-extrabold text-amber-900 leading-snug">
            Pesanan ${escapeHtml(pendingOrder.orderNumber)} Belum Masuk ke Admin
          </p>
          <p class="text-[11px] text-amber-800 leading-relaxed">
            Pesanan Tunai (COD) senilai <strong>${formatRupiah(pendingOrder.totalPrice || 0)}</strong> belum tercatat di sistem kedai dan belum masuk ke riwayat karena Anda belum menyelesaikan konfirmasi ke WhatsApp.
          </p>
        </div>
      </div>
      <button
        type="button"
        onclick="closeOrderHistoryModal(); resumeUnconfirmedOrder();"
        class="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5"
      >
        <span>💬</span>
        <span>Lanjutkan Konfirmasi WhatsApp Sekarang</span>
      </button>
    </div>
  ` : '';

  if (!orders || orders.length === 0) {
    listContainer.innerHTML = `
      ${pendingWarningHtml}
      <div class="py-10 px-4 text-center">
        <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl">
          🛍️
        </div>
        <h4 class="font-extrabold text-stone-800 text-sm">Belum Ada Riwayat Pesanan</h4>
        <p class="text-xs text-stone-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Pesanan yang sudah terkonfirmasi ke admin akan tercatat otomatis di sini untuk dilacak atau dipesan ulang.
        </p>
        <button onclick="closeOrderHistoryModal()" class="mt-4 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition active:scale-95">
          Lihat Menu Es Gabin
        </button>
      </div>
    `;
    return;
  }

  const syncBarHtml = `
    <div class="flex items-center justify-between gap-2 px-1 pb-1">
      <span class="text-[11px] font-semibold text-stone-500 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}"></span>
        <span>${isSyncing ? 'Menyegarkan status pesanan...' : 'Status terhubung otomatis ke kedai'}</span>
      </span>
      <button
        type="button"
        onclick="syncCustomerOrderStatuses(true)"
        ${isSyncing ? 'disabled' : ''}
        class="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-[11px] font-bold text-stone-700 transition active:scale-95 disabled:opacity-50"
      >
        ↻ Refresh Status
      </button>
    </div>
  `;

  const cardsHtml = orders.map(order => {
    const itemsListHtml = (order.items || []).map(i => `
      <div class="flex items-center justify-between text-xs py-1">
        <span class="text-stone-700 font-medium truncate pr-2">
          ${escapeHtml(i.name)} <span class="text-stone-400 font-bold">×${i.qty}</span>
        </span>
        <span class="text-stone-600 font-bold shrink-0">${formatRupiah(i.subtotal)}</span>
      </div>
    `).join('');

    const isPickup = order.orderMethod === 'pickup';
    const methodLabel = isPickup ? `🏬 Ambil: ${escapeHtml(formatPickupDisplay(order.pickupTime))} WIB` : `🛵 Antar COD`;
    const safeOrderNum = escapeHtml(order.orderNumber);
    const track = getOrderTrackingMeta(order.status, order.orderMethod);

    const step1Active = track.step >= 1;
    const step2Active = track.step >= 2;
    const step3Active = track.step >= 3;

    return `
      <div class="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3 transition hover:border-brand-300">
        <!-- Header Nomor Order & Badge Status Live -->
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="font-mono font-extrabold text-[11px] text-brand-600 tracking-wide">${safeOrderNum}</span>
            <p class="text-[10px] text-stone-400 font-medium mt-0.5">${formatDateTime(order.timestamp)} • ${methodLabel}</p>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${track.badgeClass}">
            ${track.badgeText}
          </span>
        </div>

        <!-- Tracker Progress 3 Tahap / Info Tidak Terdeteksi -->
        ${track.isNotFound ? `
          <div class="bg-rose-50/90 p-3 rounded-xl border border-rose-200/80 flex items-start gap-2">
            <span class="text-sm leading-none mt-0.5">⚠️</span>
            <p class="text-[11px] text-rose-800 font-medium leading-snug">
              ${track.hintText}
            </p>
          </div>
        ` : `
          <div class="bg-stone-50/90 p-3 rounded-xl border border-stone-200/70 space-y-2">
            <div class="flex items-center justify-between gap-1 text-[10px] font-bold">
              <!-- Tahap 1 -->
              <div class="flex items-center gap-1 ${step1Active ? 'text-brand-600' : 'text-stone-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${step1Active ? 'bg-brand-500 text-white' : 'bg-stone-200 text-stone-500'}">1</span>
                <span>Diterima</span>
              </div>

              <div class="flex-1 h-0.5 rounded-full ${step2Active ? 'bg-brand-500' : 'bg-stone-200'}"></div>

              <!-- Tahap 2 -->
              <div class="flex items-center gap-1 ${step2Active ? 'text-sky-700' : 'text-stone-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${step2Active ? 'bg-sky-500 text-white' : 'bg-stone-200 text-stone-500'}">2</span>
                <span>${track.step2Label}</span>
              </div>

              <div class="flex-1 h-0.5 rounded-full ${step3Active ? 'bg-emerald-500' : 'bg-stone-200'}"></div>

              <!-- Tahap 3 -->
              <div class="flex items-center gap-1 ${step3Active ? 'text-emerald-700' : 'text-stone-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${step3Active ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-500'}">3</span>
                <span>Selesai</span>
              </div>
            </div>

            <p class="text-[11px] text-stone-600 leading-snug">
              ${track.hintText}
            </p>
          </div>
        `}

        <!-- Daftar Item -->
        <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100 divide-y divide-stone-100">
          ${itemsListHtml}
        </div>

        <!-- Ringkasan Pembayaran -->
        <div class="flex items-center justify-between text-xs pt-0.5">
          <span class="text-stone-500 text-[11px]">
            ${order.totalItems} pcs • <strong class="text-stone-700 uppercase font-bold">${escapeHtml(order.paymentMethod)}</strong>
          </span>
          <div class="text-right">
            <span class="text-[10px] text-stone-400 block -mb-0.5">Total Bayar</span>
            <span class="font-black text-brand-600 text-sm">${formatRupiah(order.totalPrice)}</span>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2">
          <button 
            type="button" 
            onclick="viewPastOrderReceipt('${safeOrderNum}')"
            class="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <span>🧾</span>
            <span>Lihat Struk</span>
          </button>
          <button 
            type="button" 
            onclick="repeatOrder('${safeOrderNum}')"
            class="py-2 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-sm shadow-brand-500/20 active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <span>🔁</span>
            <span>Pesan Lagi</span>
          </button>
        </div>
        ${String(order.status || '').trim() === 'Selesai' && (order.items || []).length > 0 ? (
        isOrderFullyReviewed(order) ? `
            <div class="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center justify-center gap-1.5">
              <span>✅</span>
              <span>Sudah Diulas</span>
            </div>
          ` : `
            <button
              type="button"
              onclick="openReviewOrderModal('${safeOrderNum}')"
              class="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-extrabold text-xs active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <span>⭐</span>
              <span>Beri Ulasan</span>
            </button>
          `
      ) : ''}
      </div>
    `;
  }).join('');

  listContainer.innerHTML = pendingWarningHtml + syncBarHtml + cardsHtml;
}

async function syncCustomerOrderStatuses(showFeedback = false) {
  const localOrders = getCustomerOrderHistory();
  if (localOrders.length === 0) return;

  renderOrderHistoryCards(localOrders, true);

  if (typeof sbClient === 'undefined' || !sbClient) {
    renderOrderHistoryCards(localOrders, false);
    return;
  }

  try {
    const orderNumbers = localOrders.map(o => o.orderNumber).filter(Boolean);
    const { data, error } = await sbClient
      .from('orders')
      .select('order_number, status')
      .in('order_number', orderNumbers);

    if (!error && Array.isArray(data)) {
      const statusMap = {};
      data.forEach(row => {
        if (row.order_number && row.status) {
          statusMap[row.order_number] = row.status;
        }
      });

      let hasChanged = false;
      const updatedOrders = localOrders.map(order => {
        const liveStatus = statusMap[order.orderNumber];
        if (liveStatus) {
          if (order.status !== liveStatus || order._notFoundInServer) {
            hasChanged = true;
            return { ...order, status: liveStatus, _notFoundInServer: false };
          }
          return order;
        } else {
          // Tidak ditemukan di database admin
          if (!order._notFoundInServer || order.status !== 'Tidak Terdeteksi') {
            hasChanged = true;
            return { ...order, status: 'Tidak Terdeteksi', _notFoundInServer: true };
          }
          return order;
        }
      });

      if (hasChanged) {
        localStorage.setItem(STORAGE_ORDER_HISTORY_KEY, JSON.stringify(updatedOrders));
      }

      await syncCustomerReviewedOrders(orderNumbers);

      renderOrderHistoryCards(updatedOrders, false);
      if (showFeedback) showToast('Status pesanan diperbarui');
      return;
    }
  } catch (err) {
    console.warn('Gagal menyinkronkan status pesanan:', err);
  }

  await syncCustomerReviewedOrders(localOrders.map(o => o.orderNumber).filter(Boolean));
  renderOrderHistoryCards(localOrders, false);
}

function subscribeCustomerOrderRealtime() {
  if (customerHistoryChannel || typeof sbClient === 'undefined' || !sbClient) return;

  try {
    customerHistoryChannel = sbClient
      .channel('customer-orders-tracking')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        const updated = payload?.new;
        if (!updated?.order_number || !updated?.status) return;

        const localOrders = getCustomerOrderHistory();
        const idx = localOrders.findIndex(o => o.orderNumber === updated.order_number);
        if (idx !== -1 && localOrders[idx].status !== updated.status) {
          localOrders[idx].status = updated.status;
          localStorage.setItem(STORAGE_ORDER_HISTORY_KEY, JSON.stringify(localOrders));
          renderOrderHistoryCards(localOrders, false);
          showToast(`Update ${updated.order_number}: ${updated.status}`);
        }
      })
      .subscribe();
  } catch (_) { }
}

function openOrderHistoryModal() {
  const modal = document.getElementById('orderHistoryModal');
  const box = document.getElementById('orderHistoryContentBox');
  if (!modal || !box) return;

  syncFromSupabase().then(() => {
    initProductGrid();
    updateUI();
    updateStoreStatus();
  }).catch(() => { });

  const orders = getCustomerOrderHistory();
  renderOrderHistoryCards(orders, orders.length > 0);

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('scale-95');
  box.classList.add('scale-100');

  if (orders.length > 0) {
    syncCustomerOrderStatuses(false);
    subscribeCustomerOrderRealtime();
  }
}

function closeOrderHistoryModal() {
  const modal = document.getElementById('orderHistoryModal');
  const box = document.getElementById('orderHistoryContentBox');
  if (!modal || !box) return;

  if (customerHistoryChannel && typeof sbClient !== 'undefined' && sbClient) {
    sbClient.removeChannel(customerHistoryChannel);
    customerHistoryChannel = null;
  }

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

  hasConfirmedWhatsApp = true;
  hasSentWhatsAppClick = true;
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
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibMs = utcMs + 7 * 3600000;
  const wib = new Date(wibMs);
  return wib.getHours() * 60 + wib.getMinutes();
}

function isStoreOpen() {
  const nowMinutes = getWIBMinutes();
  const openMinutes = 8 * 60;   // 08:00 WIB
  const closeMinutes = 20 * 60; // 20:00 WIB
  const inNormalHours = nowMinutes >= openMinutes && nowMinutes < closeMinutes;

  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibNow = new Date(utcMs + 7 * 3600000);
  const todayOpenWib = new Date(wibNow);
  todayOpenWib.setHours(8, 0, 0, 0);
  const todayOpenUtcMs = todayOpenWib.getTime() - 7 * 3600000 - now.getTimezoneOffset() * 60000;

  const updatedMs = storeSettingsUpdatedAt ? new Date(storeSettingsUpdatedAt).getTime() : 0;

  if (!isStoreManuallyOpen) {
    if (inNormalHours && updatedMs < todayOpenUtcMs) {
      return true;
    }
    return false;
  }

  if (inNormalHours) return true;

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
    if (closedNotice) closedNotice.classList.add('hidden');
  } else {
    badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200/70 transition-all';
    badge.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
      <span>Tutup</span>
    `;
    badge.title = 'Toko sedang tutup (Buka kembali pukul 08.00 WIB)';
    if (closedNotice) closedNotice.classList.remove('hidden');
  }

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

async function syncFromSupabase() {
  if (!sbClient) return;
  try {
    const { data: settings } = await sbClient.from('store_settings').select('*').eq('id', 1).single();
    if (settings) {
      if (typeof settings.is_open === 'boolean') {
        isStoreManuallyOpen = settings.is_open;
      }
      storeSettingsUpdatedAt = settings.updated_at || null;

      const badgeEl = document.getElementById('heroPromoBadge');
      const titleEl = document.getElementById('heroPromoTitle');
      const descEl = document.getElementById('heroPromoDesc');
      if (badgeEl && settings.promo_badge) badgeEl.textContent = settings.promo_badge;
      if (titleEl && settings.promo_title) titleEl.textContent = settings.promo_title;
      if (descEl && settings.promo_desc) descEl.textContent = settings.promo_desc;
    }

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

    await syncProductReviewsSummary();
  } catch (err) {
    console.warn('Menggunakan data menu lokal (offline/fallback):', err);
  }
}

// ==========================================
// 25.5 Progressive Web App (PWA) & Service Worker
// ==========================================
let deferredInstallPrompt = null;

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

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;

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

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const btnInstall = document.getElementById('btnInstallApp');
  if (btnInstall) btnInstall.classList.add('hidden');
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
  closePwaGuideModal();
  showToast('🎉 Aplikasi Mellowbites berhasil dipasang!');
});

async function handleInstallAppClick() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    showToast('Aplikasi Mellowbites sudah terpasang di perangkat ini ✨');
    return;
  }

  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
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

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  openPwaGuideModal(isIos);
}

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

function closePwaGuideModal() {
  const modal = document.getElementById('pwaGuideModal');
  if (modal) modal.classList.add('hidden');
}

async function triggerNativePwaPrompt() {
  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
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

function dismissInstallBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
  try {
    localStorage.setItem('mellowbites_pwa_dismissed', 'true');
  } catch (_) { }
}

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
      _isRecordedToBackend: Boolean(savedOrder._isRecordedToBackend),
      _recordPromise: null,
      items: Array.isArray(savedOrder.items) ? savedOrder.items : [],
      timestamp: savedOrder.timestamp ? new Date(savedOrder.timestamp) : new Date()
    };

    hasConfirmedWhatsApp = false;
    hasSentWhatsAppClick = false;
    updateReceiptConfirmationState();
    renderReceiptModal(currentOrder);
    openReceiptModal();
  } catch (err) {
    console.error('Gagal membuka struk pending:', err);
    showToast('Gagal membuka struk pesanan');
  }
}

window.handleInstallAppClick = handleInstallAppClick;
window.openPwaGuideModal = openPwaGuideModal;
window.closePwaGuideModal = closePwaGuideModal;
window.triggerNativePwaPrompt = triggerNativePwaPrompt;
window.dismissInstallBanner = dismissInstallBanner;
window.initPwaUI = initPwaUI;
window.checkUnconfirmedOrder = checkUnconfirmedOrder;
window.resumeUnconfirmedOrder = resumeUnconfirmedOrder;

// ==========================================
// 25.6 Ulasan & Rating Pelanggan (product_reviews)
// ==========================================
const REVIEW_RATING_LABELS = {
  1: 'Kurang',
  2: 'Cukup',
  3: 'Lumayan',
  4: 'Enak',
  5: 'Enak Banget!'
};

function loadReviewedOrdersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_REVIEWED_ORDERS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      reviewedItemsByOrder = parsed;
    }
  } catch (_) {
    reviewedItemsByOrder = {};
  }
}

function saveReviewedOrdersToStorage() {
  try {
    localStorage.setItem(STORAGE_REVIEWED_ORDERS_KEY, JSON.stringify(reviewedItemsByOrder));
  } catch (_) { }
}

function markOrderItemReviewedLocally(orderNumber, productId) {
  if (!orderNumber || !productId) return;
  const list = Array.isArray(reviewedItemsByOrder[orderNumber]) ? reviewedItemsByOrder[orderNumber] : [];
  if (!list.includes(productId)) {
    reviewedItemsByOrder[orderNumber] = [...list, productId];
  }
}

function isOrderFullyReviewed(order) {
  if (!order || !order.orderNumber) return false;
  const reviewedList = reviewedItemsByOrder[order.orderNumber];
  if (!Array.isArray(reviewedList) || reviewedList.length === 0) return false;

  const uniqueProductIds = [...new Set(
    (order.items || [])
      .map(i => String(i.id || i.name || '').trim())
      .filter(Boolean)
  )];
  if (uniqueProductIds.length === 0) return false;
  return uniqueProductIds.every(pid => reviewedList.includes(pid));
}

function getCardRatingHtml(productId) {
  const stat = productRatingsMap[productId];
  if (!stat || stat.count <= 0) return '';
  const safeId = escapeHtml(productId);
  return `
    <button type="button" onclick="event.stopPropagation(); openProductReviewsModal('${safeId}')"
      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-[10px] font-bold text-amber-800 transition cursor-pointer"
      title="Cek Ulasan Pelanggan">
      <span class="text-amber-500 leading-none">★</span>
      <span>${stat.avg.toFixed(1)}</span>
      <span class="text-stone-500 font-semibold">(${stat.count})</span>
      <span class="text-brand-600 underline decoration-brand-300 ml-0.5">Cek Ulasan</span>
    </button>
  `;
}

function updateAllProductCardRatings() {
  if (!Array.isArray(PRODUCTS)) return;
  PRODUCTS.forEach(p => {
    const el = document.getElementById(`card-rating-${p.id}`);
    if (el) {
      el.innerHTML = getCardRatingHtml(p.id);
    }
  });
}

function updateProductDetailRatingBadge(productId) {
  const badge = document.getElementById('detailProdRatingBadge');
  const avgEl = document.getElementById('detailProdRatingAvg');
  const countEl = document.getElementById('detailProdRatingCount');
  if (!badge || !avgEl || !countEl) return;

  const stat = productRatingsMap[productId];
  if (stat && stat.count > 0) {
    avgEl.textContent = stat.avg.toFixed(1);
    countEl.textContent = `(${stat.count} ulasan)`;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

async function syncProductReviewsSummary() {
  if (typeof sbClient === 'undefined' || !sbClient) return;
  try {
    const { data, error } = await sbClient
      .from('product_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !Array.isArray(data)) return;

    const nextMap = {};
    const nextListMap = {};
    data.forEach(row => {
      if (row.is_visible === false) return;
      const pid = String(row.product_id || '').trim();
      const rating = Number(row.rating);
      if (!pid || !Number.isFinite(rating) || rating < 1 || rating > 5) return;

      if (!nextMap[pid]) {
        nextMap[pid] = { sum: 0, count: 0, avg: 0 };
        nextListMap[pid] = [];
      }
      nextMap[pid].sum += rating;
      nextMap[pid].count += 1;
      nextListMap[pid].push(row);
    });

    Object.keys(nextMap).forEach(pid => {
      nextMap[pid].avg = nextMap[pid].sum / nextMap[pid].count;
    });

    productRatingsMap = nextMap;
    productReviewsListMap = nextListMap;
    updateAllProductCardRatings();
    if (activeDetailProductId) {
      updateProductDetailRatingBadge(activeDetailProductId);
    }
  } catch (err) {
    console.warn('Gagal memuat ringkasan ulasan produk:', err);
  }
}

function openProductReviewsModal(productId) {
  const modal = document.getElementById('productReviewsModal');
  const titleEl = document.getElementById('prodReviewsModalTitle');
  const avgEl = document.getElementById('prodReviewsModalAvg');
  const countEl = document.getElementById('prodReviewsModalCount');
  const listEl = document.getElementById('prodReviewsModalList');
  if (!modal || !listEl) return;

  const product = PRODUCTS.find(p => p.id === productId);
  const stat = productRatingsMap[productId] || { avg: 0, count: 0 };
  const reviews = productReviewsListMap[productId] || [];

  if (titleEl) titleEl.textContent = `Ulasan ${product ? product.name : 'Menu'}`;
  if (avgEl) avgEl.textContent = stat.count > 0 ? stat.avg.toFixed(1) : '0.0';
  if (countEl) countEl.textContent = `(${stat.count} ulasan)`;

  if (reviews.length === 0) {
    listEl.innerHTML = `
      <div class="bg-white p-6 rounded-2xl border border-stone-200 text-center text-xs text-stone-400">
        Belum ada ulasan yang ditampilkan untuk menu ini.
      </div>
    `;
  } else {
    listEl.innerHTML = reviews.map(r => {
      const ratingNum = Math.max(1, Math.min(5, Number(r.rating || 0)));
      const stars = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
      const commentText = String(r.comment || '').trim();
      const adminReply = String(r.admin_reply || '').trim();
      const dateStr = r.created_at
        ? new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        : '';

      return `
        <div class="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-bold text-stone-900 text-xs">${escapeHtml(r.customer_name || 'Pelanggan')}</p>
              ${dateStr ? `<p class="text-[10px] text-stone-400">${escapeHtml(dateStr)}</p>` : ''}
            </div>
            <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 shrink-0">
              <span class="text-amber-500 leading-none">${stars}</span>
              <span>${ratingNum}/5</span>
            </div>
          </div>

          <p class="text-xs leading-relaxed ${commentText ? 'text-stone-700' : 'text-stone-400 italic'}">
            ${commentText ? escapeHtml(commentText) : 'Tidak ada komentar tertulis.'}
          </p>

          ${adminReply ? `
            <div class="mt-2 p-2.5 rounded-xl bg-brand-50/70 border border-brand-200/80 space-y-0.5">
              <p class="text-[10px] font-extrabold text-brand-700 uppercase tracking-wide">Balasan Admin</p>
              <p class="text-xs text-stone-700 leading-relaxed">${escapeHtml(adminReply)}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductReviewsModal() {
  const modal = document.getElementById('productReviewsModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

async function syncCustomerReviewedOrders(orderNumbers) {
  if (typeof sbClient === 'undefined' || !sbClient || !Array.isArray(orderNumbers) || orderNumbers.length === 0) {
    return;
  }

  try {
    const { data, error } = await sbClient
      .from('product_reviews')
      .select('order_number, product_id')
      .in('order_number', orderNumbers);

    if (error || !Array.isArray(data)) return;

    data.forEach(row => {
      markOrderItemReviewedLocally(row.order_number, String(row.product_id || '').trim());
    });
    saveReviewedOrdersToStorage();
  } catch (err) {
    console.warn('Gagal sinkron status ulasan pesanan:', err);
  }
}

function setReviewModalError(msg) {
  const errEl = document.getElementById('reviewModalError');
  if (!errEl) return;
  if (msg) {
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
  } else {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
}

function renderReviewOrderItems() {
  const listEl = document.getElementById('reviewOrderItemsList');
  if (!listEl) return;

  const entries = Object.values(reviewDraftState);
  if (entries.length === 0) {
    listEl.innerHTML = '<p class="text-xs text-stone-400 text-center py-6">Tidak ada varian untuk diulas.</p>';
    return;
  }

  listEl.innerHTML = entries.map(entry => {
    const safePid = escapeHtml(entry.productId);
    const safeName = escapeHtml(entry.productName);
    const starsHtml = [1, 2, 3, 4, 5].map(star => {
      const isActive = entry.rating >= star;
      return `
        <button
          type="button"
          data-review-pid="${safePid}"
          data-review-star="${star}"
          aria-label="Beri ${star} bintang untuk ${safeName}"
          class="review-star-btn w-8 h-8 rounded-lg border transition flex items-center justify-center text-base leading-none active:scale-90 ${isActive
          ? 'bg-amber-100 border-amber-300 text-amber-500 shadow-2xs'
          : 'bg-stone-50 border-stone-200 text-stone-300 hover:text-amber-400 hover:border-amber-200'
        }"
        >★</button>
      `;
    }).join('');

    return `
      <div class="bg-white p-3.5 rounded-2xl border border-stone-200/90 space-y-2.5 shadow-2xs" data-review-card="${safePid}">
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <h4 class="font-extrabold text-stone-900 text-xs sm:text-sm truncate">${safeName}</h4>
            <p class="text-[10px] text-stone-400 font-medium">${entry.qty} pcs dibeli</p>
          </div>
          ${entry.alreadyReviewed ? `
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 shrink-0">
              ✅ Sudah Diulas
            </span>
          ` : `
            <span class="review-rating-label text-[11px] font-bold ${entry.rating ? 'text-amber-600' : 'text-stone-400'} shrink-0" data-review-label="${safePid}">
              ${entry.rating ? `${entry.rating}/5 • ${REVIEW_RATING_LABELS[entry.rating] || ''}` : 'Pilih bintang *'}
            </span>
          `}
        </div>

        ${entry.alreadyReviewed ? `
          <p class="text-[11px] text-stone-500 italic bg-stone-50 px-3 py-2 rounded-xl border border-stone-100">
            Varian ini pada pesanan tersebut sudah pernah Anda ulas.
          </p>
        ` : `
          <div class="flex items-center gap-1.5">
            ${starsHtml}
          </div>
          <textarea
            rows="2"
            maxlength="300"
            data-review-comment-pid="${safePid}"
            placeholder="Tulis ulasan singkat tentang rasa/tekstur (opsional)..."
            class="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition resize-none"
          >${escapeHtml(entry.comment || '')}</textarea>
        `}
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.review-star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-review-pid');
      const star = Number(btn.getAttribute('data-review-star'));
      if (!pid || !reviewDraftState[pid]) return;
      reviewDraftState[pid].rating = star;
      setReviewModalError('');
      updateReviewCardStarUI(pid);
    });
  });

  listEl.querySelectorAll('[data-review-comment-pid]').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const pid = textarea.getAttribute('data-review-comment-pid');
      if (!pid || !reviewDraftState[pid]) return;
      reviewDraftState[pid].comment = e.target.value;
    });
  });
}

function updateReviewCardStarUI(productId) {
  const entry = reviewDraftState[productId];
  if (!entry) return;

  const listEl = document.getElementById('reviewOrderItemsList');
  if (!listEl) return;

  listEl.querySelectorAll('.review-star-btn').forEach(btn => {
    if (btn.getAttribute('data-review-pid') !== productId) return;
    const star = Number(btn.getAttribute('data-review-star'));
    const isActive = entry.rating >= star;
    btn.className = `review-star-btn w-8 h-8 rounded-lg border transition flex items-center justify-center text-base leading-none active:scale-90 ${isActive
      ? 'bg-amber-100 border-amber-300 text-amber-500 shadow-2xs'
      : 'bg-stone-50 border-stone-200 text-stone-300 hover:text-amber-400 hover:border-amber-200'
      }`;
  });

  listEl.querySelectorAll('[data-review-label]').forEach(lbl => {
    if (lbl.getAttribute('data-review-label') !== productId) return;
    lbl.textContent = entry.rating
      ? `${entry.rating}/5 • ${REVIEW_RATING_LABELS[entry.rating] || ''}`
      : 'Pilih bintang *';
    lbl.className = `review-rating-label text-[11px] font-bold ${entry.rating ? 'text-amber-600' : 'text-stone-400'} shrink-0`;
  });
}

async function openReviewOrderModal(orderNumber) {
  const history = getCustomerOrderHistory();
  const order = history.find(o => o.orderNumber === orderNumber);
  if (!order) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  if (String(order.status || '').trim() !== 'Selesai') {
    showToast('Ulasan hanya dapat diberikan setelah pesanan selesai');
    return;
  }

  activeReviewOrder = order;
  reviewDraftState = {};
  setReviewModalError('');

  const subEl = document.getElementById('reviewOrderSub');
  if (subEl) subEl.textContent = `No. Order: ${order.orderNumber}`;

  await syncCustomerReviewedOrders([order.orderNumber]);
  const reviewedList = Array.isArray(reviewedItemsByOrder[order.orderNumber])
    ? reviewedItemsByOrder[order.orderNumber]
    : [];

  (order.items || []).forEach(item => {
    const pid = String(item.id || item.name || '').trim();
    if (!pid) return;
    if (!reviewDraftState[pid]) {
      reviewDraftState[pid] = {
        productId: pid,
        productName: item.name || 'Gabin Ice Bar',
        qty: Number(item.qty || 1),
        rating: 0,
        comment: '',
        alreadyReviewed: reviewedList.includes(pid)
      };
    } else {
      reviewDraftState[pid].qty += Number(item.qty || 1);
    }
  });

  const submitBtn = document.getElementById('btnSubmitOrderReviews');
  const hasPendingToReview = Object.values(reviewDraftState).some(item => !item.alreadyReviewed);
  if (submitBtn) {
    submitBtn.disabled = !hasPendingToReview;
  }

  renderReviewOrderItems();

  const modal = document.getElementById('reviewOrderModal');
  const box = document.getElementById('reviewOrderContentBox');
  if (!modal || !box) return;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  box.classList.remove('translate-y-6', 'sm:scale-95');
  box.classList.add('translate-y-0', 'sm:scale-100');
}

function closeReviewOrderModal() {
  const modal = document.getElementById('reviewOrderModal');
  const box = document.getElementById('reviewOrderContentBox');
  if (!modal || !box) return;

  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  box.classList.add('translate-y-6', 'sm:scale-95');
  box.classList.remove('translate-y-0', 'sm:scale-100');

  activeReviewOrder = null;
  reviewDraftState = {};
  setReviewModalError('');
}

async function submitOrderReviews() {
  if (isSubmittingReviews) return;
  if (!activeReviewOrder) {
    showToast('Data pesanan tidak ditemukan');
    return;
  }

  if (typeof sbClient === 'undefined' || !sbClient) {
    setReviewModalError('Koneksi database belum tersedia. Silakan coba lagi saat online.');
    return;
  }

  const pendingItems = Object.values(reviewDraftState).filter(entry => !entry.alreadyReviewed);
  if (pendingItems.length === 0) {
    closeReviewOrderModal();
    showToast('Semua varian pada pesanan ini sudah diulas.');
    return;
  }

  const missingRating = pendingItems.find(entry => !entry.rating || entry.rating < 1 || entry.rating > 5);
  if (missingRating) {
    setReviewModalError(`Pilih bintang (1–5) terlebih dahulu untuk varian "${missingRating.productName}".`);
    return;
  }

  const btn = document.getElementById('btnSubmitOrderReviews');
  const origHtml = btn ? btn.innerHTML : '';

  try {
    isSubmittingReviews = true;
    setReviewModalError('');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>Mengirim Ulasan...</span>';
    }

    const orderNumber = activeReviewOrder.orderNumber;
    const customerName = String(activeReviewOrder.customerName || 'Pelanggan').trim() || 'Pelanggan';

    // Pencegahan duplikat berdasarkan (order_number, product_id)
    const { data: existingRows, error: checkErr } = await sbClient
      .from('product_reviews')
      .select('product_id')
      .eq('order_number', orderNumber);

    if (checkErr) {
      throw new Error('Gagal memeriksa status ulasan sebelumnya: ' + checkErr.message);
    }

    const existingPidSet = new Set(
      (existingRows || []).map(r => String(r.product_id || '').trim()).filter(Boolean)
    );
    existingPidSet.forEach(pid => markOrderItemReviewedLocally(orderNumber, pid));

    const rowsToInsert = pendingItems
      .filter(entry => !existingPidSet.has(entry.productId))
      .map(entry => ({
        order_number: orderNumber,
        product_id: entry.productId,
        product_name: entry.productName,
        customer_name: customerName,
        rating: Number(entry.rating),
        comment: (entry.comment || '').trim() || null
      }));

    if (rowsToInsert.length > 0) {
      const { error: insertErr } = await sbClient
        .from('product_reviews')
        .insert(rowsToInsert);

      if (insertErr && insertErr.code !== '23505') {
        throw new Error(insertErr.message || 'Gagal menyimpan ulasan.');
      }

      rowsToInsert.forEach(row => markOrderItemReviewedLocally(orderNumber, row.product_id));
    }

    saveReviewedOrdersToStorage();
    await syncProductReviewsSummary();
    renderOrderHistoryCards(getCustomerOrderHistory(), false);

    closeReviewOrderModal();
    playCustomerSuccessChime();
    showToast('Terima kasih! Ulasan Anda berhasil dikirim ⭐');
  } catch (err) {
    console.error('Gagal mengirim ulasan:', err);
    setReviewModalError(err.message || 'Gagal mengirim ulasan, silakan coba lagi.');
  } finally {
    isSubmittingReviews = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

function playCustomerSuccessChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => { });
    }
    const now = ctx.currentTime;
    const notes = [587.33, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const noteTime = now + (idx * 0.08);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.setValueAtTime(0.3, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
    setTimeout(() => {
      ctx.close().catch(() => { });
    }, 700);
  } catch (_) { }
}

window.openProductReviewsModal = openProductReviewsModal;
window.closeProductReviewsModal = closeProductReviewsModal;
window.openReviewOrderModal = openReviewOrderModal;
window.closeReviewOrderModal = closeReviewOrderModal;
window.submitOrderReviews = submitOrderReviews;

// 26. Inisialisasi Saat Dokumen Siap
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  loadReviewedOrdersFromStorage();
  updateHistoryBadge();
  checkUnconfirmedOrder();

  // 1. Render UI & Product Grid langsung secara instan (FCP & LCP optimal tanpa jeda database)
  initProductGrid();
  updateUI();
  updateStoreStatus();
  initPwaUI();

  // 2. Tunda pemanggilan syncFromSupabase(), data ulasan, dan Realtime subscribe selama 400ms
  setTimeout(async () => {
    try {
      await syncFromSupabase();
      // Perbarui tampilan jika ada sinkronisasi harga/stok terbaru dari database Supabase
      initProductGrid();
      updateUI();
      updateStoreStatus();
    } catch (_) { }

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
          .on('postgres_changes', { event: '*', schema: 'public', table: 'product_reviews' }, async () => {
            await syncProductReviewsSummary();
          })
          .subscribe();
      } catch (_) { }
    }
  }, 400);

  document.getElementById('customerName')?.addEventListener('input', (e) => {
    clearFieldError('customerName');
    try {
      localStorage.setItem(STORAGE_NAME_KEY, e.target.value);
    } catch (_) { }
  });

  document.getElementById('customerPhone')?.addEventListener('input', (e) => {
    clearFieldError('customerPhone');
    try {
      localStorage.setItem(STORAGE_PHONE_KEY, e.target.value);
    } catch (_) { }
  });

  const pickupDateEl = document.getElementById('pickupDateSelect');
  ['change', 'input'].forEach((evt) => {
    pickupDateEl?.addEventListener(evt, () => {
      clearFieldError('pickupDate');
      clearFieldError('pickupTime');
      updatePickupDatePreview();
    });
  });

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
    } catch (_) { }
  });

  setInterval(updateStoreStatus, 30000);
});