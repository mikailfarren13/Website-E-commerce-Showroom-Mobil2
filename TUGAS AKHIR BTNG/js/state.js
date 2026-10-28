/**
 * State Module - Pengelolaan State Global Aplikasi Showroom
 */

const AppState = {
  // Data mobil dari API
  cars: [],
  filteredCars: [],
  brands: [],
  apiStatus: {
    source: 'loading',
    message: 'Menghubungkan ke API...',
    lastUpdated: null
  },

  // Konfigurasi Filter
  filters: {
    search: '',
    brand: 'all',
    bahan_bakar: 'all',
    transmisi: 'all',
    status: 'all',
    minPrice: 0,
    maxPrice: 1000000000,
    sortBy: 'default'
  },

  // UI States
  viewMode: 'grid', // 'grid' | 'list'
  theme: localStorage.getItem('autoprime_theme') || 'dark',

  // Wishlist / Favorit
  wishlist: new Set(),

  // Komparasi Mobil (Maksimal 3 unit)
  compareList: [],

  // Riwayat Pengajuan / Pemesanan
  bookings: [],

  // Inisialisasi state dari localStorage
  init() {
    try {
      const savedWishlist = localStorage.getItem('autoprime_wishlist');
      if (savedWishlist) {
        this.wishlist = new Set(JSON.parse(savedWishlist));
      }

      const savedCompare = localStorage.getItem('autoprime_compare');
      if (savedCompare) {
        this.compareList = JSON.parse(savedCompare);
      }

      const savedBookings = localStorage.getItem('autoprime_bookings');
      if (savedBookings) {
        this.bookings = JSON.parse(savedBookings);
      }
    } catch (e) {
      console.warn('Gagal membaca storage:', e);
    }
  },

  setCars(carsData, statusInfo = {}) {
    this.cars = [...carsData];
    this.apiStatus = {
      source: statusInfo.source || 'live',
      message: statusInfo.message || 'Data aktif',
      lastUpdated: new Date().toLocaleTimeString('id-ID')
    };

    // Ekstrak daftar brand unik
    const brandSet = new Set(this.cars.map(c => c.brand).filter(Boolean));
    this.brands = Array.from(brandSet).sort();

    // Hitung range harga maksimum dari data
    const prices = this.cars.map(c => c.harga);
    if (prices.length > 0) {
      this.filters.maxPrice = Math.max(...prices);
    }

    this.applyFilters();
  },

  setFilter(key, value) {
    this.filters[key] = value;
    this.applyFilters();
  },

  resetFilters() {
    const maxPrice = this.cars.length > 0 ? Math.max(...this.cars.map(c => c.harga)) : 1000000000;
    this.filters = {
      search: '',
      brand: 'all',
      bahan_bakar: 'all',
      transmisi: 'all',
      status: 'all',
      minPrice: 0,
      maxPrice: maxPrice,
      sortBy: 'default'
    };
    this.applyFilters();
  },

  applyFilters() {
    let result = [...this.cars];

    // Filter Search (nama mobil atau brand)
    if (this.filters.search.trim() !== '') {
      const q = this.filters.search.toLowerCase().trim();
      result = result.filter(car => 
        (car.nama && car.nama.toLowerCase().includes(q)) ||
        (car.brand && car.brand.toLowerCase().includes(q)) ||
        (car.transmisi && car.transmisi.toLowerCase().includes(q)) ||
        (car.bahan_bakar && car.bahan_bakar.toLowerCase().includes(q))
      );
    }

    // Filter Brand
    if (this.filters.brand !== 'all') {
      result = result.filter(car => car.brand.toLowerCase() === this.filters.brand.toLowerCase());
    }

    // Filter Bahan Bakar
    if (this.filters.bahan_bakar !== 'all') {
      result = result.filter(car => car.bahan_bakar.toLowerCase() === this.filters.bahan_bakar.toLowerCase());
    }

    // Filter Transmisi
    if (this.filters.transmisi !== 'all') {
      result = result.filter(car => car.transmisi.toLowerCase() === this.filters.transmisi.toLowerCase());
    }

    // Filter Status
    if (this.filters.status !== 'all') {
      result = result.filter(car => car.status.toLowerCase() === this.filters.status.toLowerCase());
    }

    // Filter Rentang Harga
    result = result.filter(car => car.harga >= this.filters.minPrice && car.harga <= this.filters.maxPrice);

    // Pengurutan (Sorting)
    switch (this.filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.harga - b.harga);
        break;
      case 'price_desc':
        result.sort((a, b) => b.harga - a.harga);
        break;
      case 'year_desc':
        result.sort((a, b) => b.tahun - a.tahun);
        break;
      case 'name_asc':
        result.sort((a, b) => a.nama.localeCompare(b.nama));
        break;
      case 'name_desc':
        result.sort((a, b) => b.nama.localeCompare(a.nama));
        break;
      default:
        // Default urutan ID descending (terbaru ditambahkan)
        result.sort((a, b) => b.id - a.id);
        break;
    }

    this.filteredCars = result;
  },

  // Toggle Wishlist
  toggleWishlist(carId) {
    const id = Number(carId);
    let added = false;
    if (this.wishlist.has(id)) {
      this.wishlist.delete(id);
      added = false;
    } else {
      this.wishlist.add(id);
      added = true;
    }

    try {
      localStorage.setItem('autoprime_wishlist', JSON.stringify(Array.from(this.wishlist)));
    } catch (e) {
      console.warn('Gagal menyimpan wishlist:', e);
    }

    return added;
  },

  isWishlisted(carId) {
    return this.wishlist.has(Number(carId));
  },

  getWishlistCars() {
    return this.cars.filter(c => this.wishlist.has(c.id));
  },

  // Compare System (Max 3 unit)
  toggleCompare(carId) {
    const id = Number(carId);
    const index = this.compareList.indexOf(id);
    let action = '';

    if (index > -1) {
      this.compareList.splice(index, 1);
      action = 'removed';
    } else {
      if (this.compareList.length >= 3) {
        return { success: false, message: 'Maksimal 3 unit mobil untuk dikomparasi sekaligus.' };
      }
      this.compareList.push(id);
      action = 'added';
    }

    try {
      localStorage.setItem('autoprime_compare', JSON.stringify(this.compareList));
    } catch (e) {
      console.warn('Gagal menyimpan komparasi:', e);
    }

    return { success: true, action, count: this.compareList.length };
  },

  isCompared(carId) {
    return this.compareList.includes(Number(carId));
  },

  getCompareCars() {
    return this.cars.filter(c => this.compareList.includes(c.id));
  },

  clearCompare() {
    this.compareList = [];
    localStorage.removeItem('autoprime_compare');
  },

  // Simpan booking
  addBooking(bookingData) {
    const newBooking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Terkonfirmasi (Menunggu Jadwal)',
      ...bookingData
    };
    this.bookings.unshift(newBooking);
    try {
      localStorage.setItem('autoprime_bookings', JSON.stringify(this.bookings));
    } catch (e) {
      console.warn('Gagal menyimpan booking:', e);
    }
    return newBooking;
  },

  getCarById(id) {
    const numId = Number(id);
    return this.cars.find(c => c.id === numId) || null;
  }
};

// Inisialisasi awal
AppState.init();
