/**
 * UI Module - Manipulasi DOM, Rendering Kartu Mobil, Modal, dan Komponen Interaktif
 */

const UI = {
  // SVG Icon Helper untuk tampilan visual yang tajam dan konsisten tanpa dependensi font eksternal
  icons: {
    gas: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22h12M4 9h10M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9l-3-3"/></svg>`,
    zap: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    cog: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    heartFilled: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" stroke="#ef4444" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    compare: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    cross: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    steering: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="2.05" y1="13" x2="9.05" y2="13"/><line x1="14.95" y1="13" x2="21.95" y2="13"/></svg>`
  },

  // Fallback placeholder image URL jika image dari API gagal diakses
  fallbackImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%231a2234"><rect width="600" height="400" fill="%230f172a"/><path d="M120 280 L180 210 L300 210 L350 250 L480 250 L500 280 Z" fill="%23334155"/><circle cx="190" cy="285" r="35" fill="%23475569"/><circle cx="430" cy="285" r="35" fill="%23475569"/><circle cx="190" cy="285" r="18" fill="%2364748b"/><circle cx="430" cy="285" r="18" fill="%2364748b"/><text x="300" y="360" font-family="sans-serif" font-size="18" fill="%2394a3b8" text-anchor="middle">Foto Mobil AutoPrime</text></svg>',

  /**
   * Menampilkan Skeleton Loading saat data sedang diambil
   */
  renderSkeleton(container, count = 6) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const card = document.createElement('div');
      card.className = 'car-card skeleton-card';
      card.innerHTML = `
        <div class="skeleton-img skeleton-shimmer"></div>
        <div class="card-body">
          <div class="skeleton-pill skeleton-shimmer"></div>
          <div class="skeleton-title skeleton-shimmer"></div>
          <div class="skeleton-specs">
            <span class="skeleton-tag skeleton-shimmer"></span>
            <span class="skeleton-tag skeleton-shimmer"></span>
            <span class="skeleton-tag skeleton-shimmer"></span>
          </div>
          <div class="skeleton-price skeleton-shimmer"></div>
          <div class="skeleton-buttons">
            <div class="skeleton-btn skeleton-shimmer"></div>
            <div class="skeleton-btn skeleton-shimmer"></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    }
  },

  /**
   * Helper untuk menentukan icon dan class bahan bakar
   */
  getFuelBadge(fuelType) {
    const fuel = (fuelType || '').toLowerCase();
    if (fuel.includes('listrik') || fuel.includes('electric') || fuel.includes('ev')) {
      return { label: fuelType, icon: this.icons.zap, className: 'badge-fuel-electric' };
    }
    if (fuel.includes('hybrid') || fuel.includes('hev')) {
      return { label: fuelType, icon: this.icons.leaf, className: 'badge-fuel-hybrid' };
    }
    if (fuel.includes('diesel')) {
      return { label: fuelType, icon: this.icons.gas, className: 'badge-fuel-diesel' };
    }
    return { label: fuelType, icon: this.icons.gas, className: 'badge-fuel-gasoline' };
  },

  /**
   * Render kartu mobil secara dinamis menggunakan DOM Manipulation
   */
  renderCarCards(cars, container) {
    container.innerHTML = '';

    if (!cars || cars.length === 0) {
      this.renderEmptyState(container);
      return;
    }

    const fragment = document.createDocumentFragment();

    cars.forEach(car => {
      const card = document.createElement('article');
      card.className = `car-card ${car.status === 'sold' ? 'car-card-sold' : ''}`;
      card.dataset.id = car.id;
      card.dataset.brand = car.brand;

      const isWishlisted = AppState.isWishlisted(car.id);
      const isCompared = AppState.isCompared(car.id);
      const isSold = car.status && car.status.toLowerCase() === 'sold';
      const fuelInfo = this.getFuelBadge(car.bahan_bakar);
      const formattedPrice = CarCalculator.formatRupiah(car.harga);
      const quickInstallment = CarCalculator.getQuickInstallment(car.harga);

      card.innerHTML = `
        <div class="card-media">
          <img 
            src="${car.foto || this.fallbackImage}" 
            alt="${car.nama}" 
            class="car-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='${this.fallbackImage}';"
          />
          <div class="media-overlay"></div>
          
          <!-- Badges Atas -->
          <div class="card-badges-top">
            <span class="badge ${isSold ? 'badge-sold' : 'badge-available'}">
              <span class="status-dot"></span>
              ${isSold ? 'TERJUAL' : 'TERSEDIA'}
            </span>
            <span class="badge badge-brand">${car.brand}</span>
          </div>

          <!-- Tombol Wishlist & Compare Quick Action -->
          <div class="card-actions-float">
            <button 
              type="button" 
              class="btn-icon btn-wishlist ${isWishlisted ? 'active' : ''}" 
              data-id="${car.id}" 
              title="${isWishlisted ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}"
              aria-label="Wishlist">
              ${isWishlisted ? this.icons.heartFilled : this.icons.heart}
            </button>
            <button 
              type="button" 
              class="btn-icon btn-compare ${isCompared ? 'active' : ''}" 
              data-id="${car.id}" 
              title="${isCompared ? 'Batal Komparasi' : 'Bandingkan Mobil'}"
              aria-label="Bandingkan">
              ${this.icons.compare}
            </button>
          </div>

          <div class="card-badges-bottom">
            <span class="badge-pill ${fuelInfo.className}">
              ${fuelInfo.icon}
              <span>${fuelInfo.label}</span>
            </span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-header-info">
            <span class="car-brand-sub">${car.brand}</span>
            <div class="car-rating">
              ${this.icons.star}
              <span>4.9</span>
            </div>
          </div>

          <h3 class="car-name" title="${car.nama}">${car.nama}</h3>

          <div class="car-specs-grid">
            <div class="spec-chip" title="Tahun Pembuatan">
              ${this.icons.calendar}
              <span>${car.tahun}</span>
            </div>
            <div class="spec-chip" title="Transmisi">
              ${this.icons.cog}
              <span>${car.transmisi}</span>
            </div>
            <div class="spec-chip" title="Bahan Bakar">
              ${fuelInfo.icon}
              <span>${car.bahan_bakar}</span>
            </div>
          </div>

          <div class="card-divider"></div>

          <div class="card-pricing">
            <div class="price-wrap">
              <span class="price-label">Harga OTR</span>
              <span class="price-value">${formattedPrice}</span>
            </div>
            <div class="installment-wrap">
              <span class="inst-label">Cicilan Mulai</span>
              <span class="inst-value">Rp ${quickInstallment}/bln</span>
            </div>
          </div>

          <div class="card-footer-buttons">
            <button 
              type="button" 
              class="btn btn-outline btn-detail" 
              data-id="${car.id}">
              Lihat Detail
            </button>
            <button 
              type="button" 
              class="btn btn-primary btn-booking ${isSold ? 'disabled' : ''}" 
              data-id="${car.id}"
              ${isSold ? 'disabled' : ''}>
              ${isSold ? 'Unit Terjual' : 'Test Drive / Beli'}
            </button>
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  },

  /**
   * Render Tampilan Kosong saat Filter Tidak Cocok
   */
  renderEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon-wrap">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-title">Mobil Tidak Ditemukan</h3>
        <p class="empty-desc">Tidak ada unit mobil yang sesuai dengan kriteria filter atau pencarian Anda saat ini.</p>
        <button type="button" class="btn btn-primary" id="btnResetFiltersEmpty">
          Reset Semua Filter
        </button>
      </div>
    `;

    const resetBtn = container.querySelector('#btnResetFiltersEmpty');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        AppState.resetFilters();
        if (window.AppOrchestrator) {
          window.AppOrchestrator.syncFilterUI();
          window.AppOrchestrator.render();
        }
      });
    }
  },

  /**
   * Render Filter Chips yang sedang aktif
   */
  renderActiveFilterChips(filters, container) {
    if (!container) return;
    container.innerHTML = '';

    const chips = [];

    if (filters.search) {
      chips.push({ key: 'search', label: `Cari: "${filters.search}"` });
    }
    if (filters.brand !== 'all') {
      chips.push({ key: 'brand', label: `Brand: ${filters.brand}` });
    }
    if (filters.bahan_bakar !== 'all') {
      chips.push({ key: 'bahan_bakar', label: `Bahan Bakar: ${filters.bahan_bakar}` });
    }
    if (filters.transmisi !== 'all') {
      chips.push({ key: 'transmisi', label: `Transmisi: ${filters.transmisi}` });
    }
    if (filters.status !== 'all') {
      chips.push({ key: 'status', label: `Status: ${filters.status === 'tersedia' ? 'Tersedia' : 'Terjual'}` });
    }
    if (filters.sortBy !== 'default') {
      const sortLabels = {
        price_asc: 'Harga Terendah',
        price_desc: 'Harga Tertinggi',
        year_desc: 'Tahun Terbaru',
        name_asc: 'Nama A-Z',
        name_desc: 'Nama Z-A'
      };
      chips.push({ key: 'sortBy', label: `Urut: ${sortLabels[filters.sortBy] || filters.sortBy}` });
    }

    if (chips.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    const fragment = document.createDocumentFragment();

    chips.forEach(chip => {
      const chipEl = document.createElement('div');
      chipEl.className = 'filter-chip';
      chipEl.innerHTML = `
        <span>${chip.label}</span>
        <button type="button" class="btn-chip-remove" data-key="${chip.key}" aria-label="Hapus filter">
          &times;
        </button>
      `;
      fragment.appendChild(chipEl);
    });

    // Tombol Hapus Semua
    const clearAllEl = document.createElement('button');
    clearAllEl.type = 'button';
    clearAllEl.className = 'btn-clear-all-chips';
    clearAllEl.textContent = 'Hapus Semua';
    clearAllEl.id = 'btnClearAllChips';
    fragment.appendChild(clearAllEl);

    container.appendChild(fragment);
  },

  /**
   * Render Brand Shortcut Pills di Toolbar
   */
  renderBrandPills(brands, activeBrand, container) {
    if (!container) return;
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `brand-pill ${activeBrand === 'all' ? 'active' : ''}`;
    allBtn.dataset.brand = 'all';
    allBtn.textContent = 'Semua Brand';
    container.appendChild(allBtn);

    brands.forEach(brand => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `brand-pill ${activeBrand.toLowerCase() === brand.toLowerCase() ? 'active' : ''}`;
      btn.dataset.brand = brand;
      btn.textContent = brand;
      container.appendChild(btn);
    });
  },

  /**
   * Render Modal Detail Mobil Lengkap
   */
  renderDetailModal(car) {
    const modal = document.getElementById('modalDetail');
    if (!modal || !car) return;

    const formattedPrice = CarCalculator.formatRupiah(car.harga);
    const loan = CarCalculator.calculateLoan(car.harga, 20, 5, 5.0);
    const isWishlisted = AppState.isWishlisted(car.id);
    const isSold = car.status && car.status.toLowerCase() === 'sold';
    const fuelInfo = this.getFuelBadge(car.bahan_bakar);

    // Mock fitur unggulan berdasarkan tipe kendaraan
    const isElectric = car.bahan_bakar.toLowerCase().includes('listrik');
    const isHybrid = car.bahan_bakar.toLowerCase().includes('hybrid');
    const features = [
      'Garansi Resmi DNCC Certified 1 Tahun',
      'Lolos 160 Titik Inspeksi Ketat Tanpa Bekas Tabrak & Banjir',
      'Surat-surat Lengkap (BPKB, STNK & Faktur Asli)',
      isElectric ? 'Kapasitas Baterai Sehat 98% (SOH) + Charger Portable' : 'Servis Record Resmi Dealer Selalu Rutin',
      isHybrid ? 'Dual Powertrain Efisien BBM Hingga 22 km/L' : 'Interior Bersih Bebas Bau Rokok & Higienis',
      'Head Unit Touchscreen Apple CarPlay & Android Auto',
      'Kamera Mundur & Sensor Parkir 360 Derajat',
      'Keyless Entry & Push Engine Start Button'
    ];

    const content = modal.querySelector('.modal-content-dynamic');
    content.innerHTML = `
      <div class="detail-grid">
        <div class="detail-gallery">
          <div class="detail-main-img-wrap">
            <img 
              src="${car.foto || this.fallbackImage}" 
              alt="${car.nama}" 
              id="detailMainImg" 
              class="detail-main-img"
              onerror="this.onerror=null; this.src='${this.fallbackImage}';"
            />
            <span class="badge ${isSold ? 'badge-sold' : 'badge-available'} detail-status-badge">
              ${isSold ? 'TERJUAL' : 'TERSEDIA DI SHOWROOM'}
            </span>
          </div>
          <div class="detail-thumbnails">
            <button type="button" class="thumb-btn active">
              <img src="${car.foto || this.fallbackImage}" alt="Tampak Depan" onerror="this.src='${this.fallbackImage}';" />
            </button>
            <button type="button" class="thumb-btn">
              <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80" alt="Tampak Samping" onerror="this.src='${this.fallbackImage}';" />
            </button>
            <button type="button" class="thumb-btn">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80" alt="Tampak Interior" onerror="this.src='${this.fallbackImage}';" />
            </button>
          </div>

          <div class="detail-guarantee-box">
            <div class="guarantee-icon">${this.icons.shield}</div>
            <div class="guarantee-text">
              <strong>Jaminan Garansi AutoPrime 100%</strong>
              <span>Jaminan uang kembali 5 hari jika mobil terbukti pernah kena banjir atau kecelakaan besar.</span>
            </div>
          </div>
        </div>

        <div class="detail-info-col">
          <div class="detail-header">
            <span class="detail-brand-badge">${car.brand}</span>
            <h2 class="detail-title">${car.nama}</h2>
            <div class="detail-price-box">
              <div class="detail-price-main">${formattedPrice}</div>
              <div class="detail-installment-sub">
                Estimasi Cicilan: <strong>${CarCalculator.formatRupiah(loan.angsuranPerBulan)}</strong> / bulan (Tenor 5 Thn)
              </div>
            </div>
          </div>

          <h4 class="detail-section-title">Spesifikasi Utama</h4>
          <div class="detail-specs-table">
            <div class="spec-row">
              <span class="spec-label">Merk / Brand</span>
              <span class="spec-val">${car.brand}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Tahun Pembuatan</span>
              <span class="spec-val">${car.tahun}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Transmisi</span>
              <span class="spec-val">${car.transmisi}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Bahan Bakar</span>
              <span class="spec-val">${fuelInfo.icon} ${car.bahan_bakar}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Status Ketersediaan</span>
              <span class="spec-val ${isSold ? 'text-sold' : 'text-available'}">
                ${isSold ? 'Sudah Terjual (Sold Out)' : 'Tersedia Siap Kirim'}
              </span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Kategori Ruang</span>
              <span class="spec-val">Public Showroom DNCC</span>
            </div>
          </div>

          <h4 class="detail-section-title">Fitur & Keunggulan Terverifikasi</h4>
          <ul class="detail-features-list">
            ${features.map(f => `<li>${this.icons.check} <span>${f}</span></li>`).join('')}
          </ul>

          <div class="detail-action-buttons">
            <button 
              type="button" 
              class="btn btn-primary btn-lg btn-book-from-detail ${isSold ? 'disabled' : ''}" 
              data-id="${car.id}"
              ${isSold ? 'disabled' : ''}>
              ${this.icons.steering}
              <span>${isSold ? 'Unit Telah Terjual' : 'Jadwalkan Test Drive / SPK'}</span>
            </button>
            <button 
              type="button" 
              class="btn btn-secondary btn-calc-from-detail" 
              data-id="${car.id}" 
              data-price="${car.harga}">
              Simulasi Kredit
            </button>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20AutoPrime,%20saya%20tertarik%20dengan%20unit%20${encodeURIComponent(car.nama)}%20seharga%20${encodeURIComponent(formattedPrice)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-whatsapp">
              WhatsApp Sales
            </a>
          </div>
        </div>
      </div>
    `;

    // Pasang thumbnail clicker
    const mainImg = content.querySelector('#detailMainImg');
    const thumbBtns = content.querySelectorAll('.thumb-btn');
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const img = btn.querySelector('img');
        if (img && mainImg) {
          mainImg.src = img.src;
        }
      });
    });

    // Tombol aksi dalam modal
    const bookBtn = content.querySelector('.btn-book-from-detail');
    if (bookBtn && !isSold) {
      bookBtn.addEventListener('click', () => {
        this.closeModal('modalDetail');
        this.openBookingModal(car);
      });
    }

    const calcBtn = content.querySelector('.btn-calc-from-detail');
    if (calcBtn) {
      calcBtn.addEventListener('click', () => {
        this.closeModal('modalDetail');
        const calcSection = document.getElementById('simulasi-kredit');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
          if (window.AppOrchestrator) {
            window.AppOrchestrator.loadCarToCalculator(car);
          }
        }
      });
    }

    this.openModal('modalDetail');
  },

  /**
   * Render Floating Comparison Drawer
   */
  renderCompareDrawer(compareIds) {
    const drawer = document.getElementById('compareDrawer');
    if (!drawer) return;

    if (!compareIds || compareIds.length === 0) {
      drawer.classList.remove('active');
      return;
    }

    drawer.classList.add('active');
    const itemsContainer = drawer.querySelector('.compare-drawer-items');
    const countBadge = drawer.querySelector('#compareCountBadge');
    if (countBadge) countBadge.textContent = compareIds.length;

    itemsContainer.innerHTML = '';
    const cars = AppState.getCompareCars();

    cars.forEach(car => {
      const item = document.createElement('div');
      item.className = 'compare-chip';
      item.innerHTML = `
        <img src="${car.foto || this.fallbackImage}" alt="${car.nama}" onerror="this.src='${this.fallbackImage}';" />
        <div class="compare-chip-info">
          <span class="compare-chip-name">${car.nama}</span>
          <span class="compare-chip-price">${CarCalculator.formatRupiah(car.harga)}</span>
        </div>
        <button type="button" class="btn-remove-compare" data-id="${car.id}" title="Hapus">&times;</button>
      `;
      itemsContainer.appendChild(item);
    });
  },

  /**
   * Render Modal Komparasi Mobil Side-by-Side
   */
  renderCompareModal() {
    const modal = document.getElementById('modalCompare');
    if (!modal) return;

    const cars = AppState.getCompareCars();
    const content = modal.querySelector('.modal-content-dynamic');

    if (cars.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <h3>Belum Ada Mobil yang Dipilih</h3>
          <p>Pilih hingga 3 mobil dari katalog dengan mengklik tombol komparasi.</p>
        </div>
      `;
      this.openModal('modalCompare');
      return;
    }

    content.innerHTML = `
      <div class="compare-table-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="spec-head-cell">Spesifikasi</th>
              ${cars.map(c => `
                <th class="car-head-cell">
                  <div class="compare-header-card">
                    <img src="${c.foto || this.fallbackImage}" alt="${c.nama}" onerror="this.src='${this.fallbackImage}';" />
                    <h4>${c.nama}</h4>
                    <span class="compare-brand-tag">${c.brand}</span>
                    <button type="button" class="btn-remove-col-compare" data-id="${c.id}">Hapus</button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="spec-label-col">Harga Resmi OTR</td>
              ${cars.map(c => `<td class="spec-val-highlight">${CarCalculator.formatRupiah(c.harga)}</td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Estimasi Cicilan (DP 20%)</td>
              ${cars.map(c => `<td><strong>Rp ${CarCalculator.getQuickInstallment(c.harga)}/bln</strong></td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Tahun Pembuatan</td>
              ${cars.map(c => `<td>${c.tahun}</td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Transmisi</td>
              ${cars.map(c => `<td>${c.transmisi}</td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Jenis Bahan Bakar</td>
              ${cars.map(c => `<td>${c.bahan_bakar}</td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Status Ketersediaan</td>
              ${cars.map(c => `<td><span class="badge ${c.status === 'sold' ? 'badge-sold' : 'badge-available'}">${c.status === 'sold' ? 'TERJUAL' : 'TERSEDIA'}</span></td>`).join('')}
            </tr>
            <tr>
              <td class="spec-label-col">Aksi Pembelian</td>
              ${cars.map(c => `
                <td>
                  <button type="button" class="btn btn-sm btn-primary btn-compare-book ${c.status === 'sold' ? 'disabled' : ''}" data-id="${c.id}" ${c.status === 'sold' ? 'disabled' : ''}>
                    ${c.status === 'sold' ? 'Terjual' : 'Pesan / Test Drive'}
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Event handler hapus dari modal komparasi
    content.querySelectorAll('.btn-remove-col-compare').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        AppState.toggleCompare(id);
        this.renderCompareDrawer(AppState.compareList);
        this.renderCompareModal();
        this.updateCardCompareStates();
      });
    });

    // Event handler booking dari tabel komparasi
    content.querySelectorAll('.btn-compare-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const car = AppState.getCarById(e.currentTarget.dataset.id);
        if (car) {
          this.closeModal('modalCompare');
          this.openBookingModal(car);
        }
      });
    });

    this.openModal('modalCompare');
  },

  /**
   * Render Modal Wishlist / Favorit
   */
  renderWishlistModal() {
    const modal = document.getElementById('modalWishlist');
    if (!modal) return;

    const cars = AppState.getWishlistCars();
    const content = modal.querySelector('.modal-content-dynamic');

    if (cars.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon-wrap">${this.icons.heart}</div>
          <h3>Daftar Favorit Kosong</h3>
          <p>Anda belum menyimpan unit mobil ke daftar favorit. Klik ikon hati pada mobil yang Anda sukai.</p>
        </div>
      `;
      this.openModal('modalWishlist');
      return;
    }

    content.innerHTML = `
      <div class="wishlist-items-list">
        ${cars.map(car => `
          <div class="wishlist-item-row" data-id="${car.id}">
            <img src="${car.foto || this.fallbackImage}" alt="${car.nama}" class="wishlist-thumb" onerror="this.src='${this.fallbackImage}';" />
            <div class="wishlist-item-info">
              <h4>${car.nama}</h4>
              <span class="wishlist-price">${CarCalculator.formatRupiah(car.harga)}</span>
              <div class="wishlist-specs">
                <span>${car.tahun}</span> • <span>${car.transmisi}</span> • <span>${car.bahan_bakar}</span>
              </div>
            </div>
            <div class="wishlist-item-actions">
              <button type="button" class="btn btn-sm btn-primary btn-wishlist-book ${car.status === 'sold' ? 'disabled' : ''}" data-id="${car.id}" ${car.status === 'sold' ? 'disabled' : ''}>
                ${car.status === 'sold' ? 'Terjual' : 'Test Drive'}
              </button>
              <button type="button" class="btn btn-sm btn-outline btn-wishlist-detail" data-id="${car.id}">
                Detail
              </button>
              <button type="button" class="btn-icon btn-remove-wishlist" data-id="${car.id}" title="Hapus dari Favorit">
                ${this.icons.cross}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Event listener untuk tombol hapus dari wishlist modal
    content.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        AppState.toggleWishlist(id);
        this.updateWishlistCountBadge();
        this.updateCardWishlistStates();
        this.renderWishlistModal();
        this.showToast('Favorit', 'Unit mobil dihapus dari daftar favorit', 'info');
      });
    });

    content.querySelectorAll('.btn-wishlist-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const car = AppState.getCarById(e.currentTarget.dataset.id);
        if (car) {
          this.closeModal('modalWishlist');
          this.renderDetailModal(car);
        }
      });
    });

    content.querySelectorAll('.btn-wishlist-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const car = AppState.getCarById(e.currentTarget.dataset.id);
        if (car) {
          this.closeModal('modalWishlist');
          this.openBookingModal(car);
        }
      });
    });

    this.openModal('modalWishlist');
  },

  /**
   * Buka Form Booking / Test Drive dengan unit mobil terpilih
   */
  openBookingModal(car) {
    const modal = document.getElementById('modalBooking');
    if (!modal) return;

    const selectEl = modal.querySelector('#bookingCarSelect');
    if (selectEl) {
      selectEl.innerHTML = '';
      AppState.cars.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = `${c.nama} (${c.tahun}) - ${CarCalculator.formatRupiah(c.harga)}`;
        if (car && c.id === car.id) {
          option.selected = true;
        }
        selectEl.appendChild(option);
      });
    }

    // Set tanggal minimal besok
    const dateInput = modal.querySelector('#bookingDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    this.openModal('modalBooking');
  },

  /**
   * Render Modal Riwayat Booking Saya
   */
  renderBookingsModal() {
    const modal = document.getElementById('modalBookingsHistory');
    if (!modal) return;

    const bookings = AppState.bookings;
    const content = modal.querySelector('.modal-content-dynamic');

    if (!bookings || bookings.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon-wrap">${this.icons.calendar}</div>
          <h3>Belum Ada Jadwal / Pengajuan</h3>
          <p>Anda belum pernah mengajukan jadwal test drive atau pemesanan unit mobil.</p>
        </div>
      `;
      this.openModal('modalBookingsHistory');
      return;
    }

    content.innerHTML = `
      <div class="booking-history-list">
        ${bookings.map(b => `
          <div class="booking-history-card">
            <div class="bh-header">
              <span class="bh-code">${b.id}</span>
              <span class="bh-status badge badge-available">${b.status}</span>
            </div>
            <h4 class="bh-car-name">${b.carName}</h4>
            <div class="bh-details-grid">
              <div><strong>Nama Pemesan:</strong> ${b.name}</div>
              <div><strong>No. WhatsApp:</strong> ${b.phone}</div>
              <div><strong>Tanggal:</strong> ${b.date} (${b.timeSlot})</div>
              <div><strong>Jenis Layanan:</strong> ${b.serviceType === 'showroom' ? 'Datang ke Showroom' : 'Home Test Drive (Diantar)'}</div>
            </div>
            ${b.notes ? `<p class="bh-notes"><strong>Catatan:</strong> ${b.notes}</p>` : ''}
            <div class="bh-footer">
              <span class="bh-date-created">Diajukan: ${new Date(b.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              <a href="https://wa.me/6281234567890?text=Konfirmasi%20Jadwal%20${b.id}%20untuk%20unit%20${encodeURIComponent(b.carName)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                Chat Konfirmasi CS
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.openModal('modalBookingsHistory');
  },

  /**
   * Update Badge Angka Wishlist di Navbar
   */
  updateWishlistCountBadge() {
    const badge = document.getElementById('navWishlistCount');
    if (badge) {
      const count = AppState.wishlist.size;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  },

  /**
   * Update Status Visual Tombol Wishlist di Semua Kartu
   */
  updateCardWishlistStates() {
    const buttons = document.querySelectorAll('.btn-wishlist');
    buttons.forEach(btn => {
      const id = Number(btn.dataset.id);
      const active = AppState.isWishlisted(id);
      btn.classList.toggle('active', active);
      btn.innerHTML = active ? this.icons.heartFilled : this.icons.heart;
    });
  },

  /**
   * Update Status Visual Tombol Komparasi di Semua Kartu
   */
  updateCardCompareStates() {
    const buttons = document.querySelectorAll('.btn-compare');
    buttons.forEach(btn => {
      const id = Number(btn.dataset.id);
      const active = AppState.isCompared(id);
      btn.classList.toggle('active', active);
    });
  },

  /**
   * Buka Modal berdasarkan ID
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  },

  /**
   * Tutup Modal berdasarkan ID
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      // Jika tidak ada modal lain yang terbuka, buka scroll body
      const anyActive = document.querySelectorAll('.modal.active').length > 0;
      if (!anyActive) {
        document.body.classList.remove('modal-open');
      }
    }
  },

  /**
   * Tampilkan Toast Alert Mengambang
   */
  showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;

    const iconSvg = type === 'success' ? this.icons.check : (type === 'error' ? this.icons.cross : this.icons.info);

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <strong class="toast-title">${title}</strong>
        <p class="toast-desc">${message}</p>
      </div>
      <button type="button" class="toast-close" aria-label="Tutup">&times;</button>
    `;

    container.appendChild(toast);

    // Animasi masuk
    requestAnimationFrame(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-visible');
    });

    const removeToast = () => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', removeToast);
    }

    // Auto dismiss dalam 4 detik
    setTimeout(removeToast, 4000);
  }
};
