/**
 * App Module - Inisialisasi Aplikasi, Event Listeners, dan Orkestrasi Seluruh Fitur Showroom
 */

const AppOrchestrator = {
  elements: {},

  async init() {
    this.cacheDOMElements();
    this.applyTheme(AppState.theme);
    this.bindEvents();
    BookingManager.init();
    UI.updateWishlistCountBadge();
    UI.renderCompareDrawer(AppState.compareList);

    // Muat data mobil dari API resmi
    await this.loadCarsData();

    // Inisialisasi kalkulator kredit dengan mobil pertama
    this.initCreditCalculator();
  },

  cacheDOMElements() {
    this.elements = {
      // Containers
      carsGrid: document.getElementById('carsGrid'),
      activeFiltersContainer: document.getElementById('activeFilters'),
      brandPillsContainer: document.getElementById('brandPillsContainer'),
      resultsCounter: document.getElementById('resultsCounter'),
      totalCarsCounter: document.getElementById('totalCarsCounter'),
      apiStatusBadge: document.getElementById('apiStatusBadge'),
      apiStatusText: document.getElementById('apiStatusText'),

      // Controls
      searchInput: document.getElementById('searchInput'),
      searchClearBtn: document.getElementById('searchClearBtn'),
      filterBrand: document.getElementById('filterBrand'),
      filterFuel: document.getElementById('filterFuel'),
      filterTrans: document.getElementById('filterTrans'),
      filterStatus: document.getElementById('filterStatus'),
      filterPriceRange: document.getElementById('filterPriceRange'),
      filterPriceDisplay: document.getElementById('filterPriceDisplay'),
      sortSelect: document.getElementById('sortSelect'),
      btnResetFilters: document.getElementById('btnResetFilters'),
      viewGridBtn: document.getElementById('viewGridBtn'),
      viewListBtn: document.getElementById('viewListBtn'),

      // Top Actions & Nav
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      btnNavWishlist: document.getElementById('btnNavWishlist'),
      btnNavBookings: document.getElementById('btnNavBookings'),
      navWishlistCount: document.getElementById('navWishlistCount'),
      mobileMenuToggle: document.getElementById('mobileMenuToggle'),
      navMenu: document.getElementById('navMenu'),

      // Compare Drawer
      compareDrawer: document.getElementById('compareDrawer'),
      btnOpenCompareModal: document.getElementById('btnOpenCompareModal'),
      btnClearAllCompare: document.getElementById('btnClearAllCompare'),

      // Calculator Elements
      calcCarSelect: document.getElementById('calcCarSelect'),
      calcCarPriceInput: document.getElementById('calcCarPriceInput'),
      calcDpSlider: document.getElementById('calcDpSlider'),
      calcDpPercentDisplay: document.getElementById('calcDpPercentDisplay'),
      calcDpNominalDisplay: document.getElementById('calcDpNominalDisplay'),
      calcTenorButtons: document.querySelectorAll('.tenor-pill'),
      calcInterestInput: document.getElementById('calcInterestInput'),
      calcResultAngsuran: document.getElementById('calcResultAngsuran'),
      calcResultPokok: document.getElementById('calcResultPokok'),
      calcResultTotalBunga: document.getElementById('calcResultTotalBunga'),
      calcResultTdp: document.getElementById('calcResultTdp'),
      btnApplyCredit: document.getElementById('btnApplyCredit')
    };
  },

  async loadCarsData() {
    // Tampilkan Skeleton Loading state
    if (this.elements.carsGrid) {
      UI.renderSkeleton(this.elements.carsGrid, 6);
    }
    this.updateApiStatus('loading', 'Menghubungkan ke API DNCC...');

    try {
      const response = await fetchCarsFromAPI();
      AppState.setCars(response.data, response);

      // Perbarui UI Status API
      if (response.source === 'live') {
        this.updateApiStatus('live', `API Live Terhubung (${response.total} Unit Mobil)`);
        UI.showToast('Koneksi API Berhasil', `Berhasil mengambil ${response.total} data unit mobil dari server resmi DNCC.`, 'success');
      } else if (response.source === 'cache') {
        this.updateApiStatus('cache', `Data Cache Tersimpan (${response.total} Unit)`);
      } else {
        this.updateApiStatus('fallback', `Mode Cadangan Resmi Aktif (${response.total} Unit)`);
      }

      // Perbarui filter UI options
      this.populateFilterDropdowns();

      // Render katalog mobil
      this.render();

    } catch (err) {
      console.error('Error saat load data:', err);
      this.updateApiStatus('error', 'Gagal memuat API');
      UI.showToast('Gagal Memuat API', 'Terjadi kendala jaringan saat menghubungi server API.', 'error');
    }
  },

  updateApiStatus(type, message) {
    if (!this.elements.apiStatusBadge || !this.elements.apiStatusText) return;
    this.elements.apiStatusBadge.className = `api-status-badge status-${type}`;
    this.elements.apiStatusText.textContent = message;
  },

  populateFilterDropdowns() {
    // Brand dropdown di sidebar
    if (this.elements.filterBrand) {
      this.elements.filterBrand.innerHTML = '<option value="all">Semua Brand</option>';
      AppState.brands.forEach(brand => {
        const opt = document.createElement('option');
        opt.value = brand;
        opt.textContent = brand;
        this.elements.filterBrand.appendChild(opt);
      });
    }

    // Brand pills di atas grid
    if (this.elements.brandPillsContainer) {
      UI.renderBrandPills(AppState.brands, AppState.filters.brand, this.elements.brandPillsContainer);
    }

    // Set slider range harga maksimum
    if (this.elements.filterPriceRange && AppState.cars.length > 0) {
      const maxPrice = Math.max(...AppState.cars.map(c => c.harga));
      this.elements.filterPriceRange.max = maxPrice;
      this.elements.filterPriceRange.value = maxPrice;
      if (this.elements.filterPriceDisplay) {
        this.elements.filterPriceDisplay.textContent = CarCalculator.formatRupiah(maxPrice);
      }
    }

    // Populate car options di kalkulator kredit
    if (this.elements.calcCarSelect) {
      this.elements.calcCarSelect.innerHTML = '';
      AppState.cars.forEach(car => {
        const opt = document.createElement('option');
        opt.value = car.id;
        opt.textContent = `${car.nama} - ${CarCalculator.formatRupiah(car.harga)}`;
        this.elements.calcCarSelect.appendChild(opt);
      });
    }
  },

  render() {
    if (!this.elements.carsGrid) return;

    // Render cards
    UI.renderCarCards(AppState.filteredCars, this.elements.carsGrid);

    // Update counters
    if (this.elements.resultsCounter) {
      this.elements.resultsCounter.textContent = AppState.filteredCars.length;
    }
    if (this.elements.totalCarsCounter) {
      this.elements.totalCarsCounter.textContent = AppState.cars.length;
    }

    // Render active filter chips
    UI.renderActiveFilterChips(AppState.filters, this.elements.activeFiltersContainer);

    // Sync brand pills
    if (this.elements.brandPillsContainer) {
      UI.renderBrandPills(AppState.brands, AppState.filters.brand, this.elements.brandPillsContainer);
    }

    // Update wishlist badge count
    UI.updateWishlistCountBadge();
  },

  bindEvents() {
    // 1. Search input dengan debounce
    let searchDebounceTimeout = null;
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimeout);
        const val = e.target.value;
        if (this.elements.searchClearBtn) {
          this.elements.searchClearBtn.style.display = val ? 'inline-flex' : 'none';
        }
        searchDebounceTimeout = setTimeout(() => {
          AppState.setFilter('search', val);
          this.render();
        }, 250);
      });
    }

    if (this.elements.searchClearBtn) {
      this.elements.searchClearBtn.addEventListener('click', () => {
        this.elements.searchInput.value = '';
        this.elements.searchClearBtn.style.display = 'none';
        AppState.setFilter('search', '');
        this.render();
      });
    }

    // Quick Hero Search
    const heroSearchInput = document.getElementById('heroSearchInput');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    if (heroSearchBtn && heroSearchInput) {
      const triggerHeroSearch = () => {
        const query = heroSearchInput.value.trim();
        if (this.elements.searchInput) {
          this.elements.searchInput.value = query;
          if (this.elements.searchClearBtn) {
            this.elements.searchClearBtn.style.display = query ? 'inline-flex' : 'none';
          }
        }
        AppState.setFilter('search', query);
        this.render();
        const catalogSection = document.getElementById('katalog-mobil');
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      heroSearchBtn.addEventListener('click', triggerHeroSearch);
      heroSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') triggerHeroSearch();
      });
    }

    // Quick Hero Category Pills
    document.querySelectorAll('.hero-tag-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const fuel = e.currentTarget.dataset.fuel;
        if (fuel) {
          AppState.resetFilters();
          AppState.setFilter('bahan_bakar', fuel);
          this.syncFilterUI();
          this.render();
          const catalogSection = document.getElementById('katalog-mobil');
          if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // 2. Filter Dropdowns
    if (this.elements.filterBrand) {
      this.elements.filterBrand.addEventListener('change', (e) => {
        AppState.setFilter('brand', e.target.value);
        this.render();
      });
    }

    if (this.elements.filterFuel) {
      this.elements.filterFuel.addEventListener('change', (e) => {
        AppState.setFilter('bahan_bakar', e.target.value);
        this.render();
      });
    }

    if (this.elements.filterTrans) {
      this.elements.filterTrans.addEventListener('change', (e) => {
        AppState.setFilter('transmisi', e.target.value);
        this.render();
      });
    }

    if (this.elements.filterStatus) {
      this.elements.filterStatus.addEventListener('change', (e) => {
        AppState.setFilter('status', e.target.value);
        this.render();
      });
    }

    // 3. Price Range Slider
    if (this.elements.filterPriceRange) {
      this.elements.filterPriceRange.addEventListener('input', (e) => {
        const price = Number(e.target.value);
        if (this.elements.filterPriceDisplay) {
          this.elements.filterPriceDisplay.textContent = CarCalculator.formatRupiah(price);
        }
        AppState.setFilter('maxPrice', price);
        this.render();
      });
    }

    // 4. Sort Select
    if (this.elements.sortSelect) {
      this.elements.sortSelect.addEventListener('change', (e) => {
        AppState.setFilter('sortBy', e.target.value);
        this.render();
      });
    }

    // 5. Reset Filters
    if (this.elements.btnResetFilters) {
      this.elements.btnResetFilters.addEventListener('click', () => {
        AppState.resetFilters();
        this.syncFilterUI();
        this.render();
        UI.showToast('Filter Direset', 'Semua filter pencarian telah dikembalikan ke awal.', 'info');
      });
    }

    // 6. View Mode (Grid vs List)
    if (this.elements.viewGridBtn && this.elements.viewListBtn) {
      this.elements.viewGridBtn.addEventListener('click', () => {
        this.elements.viewGridBtn.classList.add('active');
        this.elements.viewListBtn.classList.remove('active');
        this.elements.carsGrid.classList.remove('list-view');
        AppState.viewMode = 'grid';
      });

      this.elements.viewListBtn.addEventListener('click', () => {
        this.elements.viewListBtn.classList.add('active');
        this.elements.viewGridBtn.classList.remove('active');
        this.elements.carsGrid.classList.add('list-view');
        AppState.viewMode = 'list';
      });
    }

    // 7. Event Delegation pada Kartu Mobil di Grid
    if (this.elements.carsGrid) {
      this.elements.carsGrid.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.btn-wishlist');
        if (wishlistBtn) {
          const id = Number(wishlistBtn.dataset.id);
          const added = AppState.toggleWishlist(id);
          UI.updateWishlistCountBadge();
          UI.updateCardWishlistStates();
          const car = AppState.getCarById(id);
          if (added) {
            UI.showToast('Ditambahkan ke Favorit', `${car ? car.nama : 'Mobil'} berhasil disimpan.`, 'success');
          } else {
            UI.showToast('Dihapus dari Favorit', `${car ? car.nama : 'Mobil'} dihapus dari daftar favorit.`, 'info');
          }
          return;
        }

        const compareBtn = e.target.closest('.btn-compare');
        if (compareBtn) {
          const id = Number(compareBtn.dataset.id);
          const res = AppState.toggleCompare(id);
          if (!res.success) {
            UI.showToast('Batas Komparasi', res.message, 'warning');
            return;
          }
          UI.updateCardCompareStates();
          UI.renderCompareDrawer(AppState.compareList);
          const car = AppState.getCarById(id);
          if (res.action === 'added') {
            UI.showToast('Komparasi', `${car ? car.nama : 'Mobil'} ditambahkan ke perbandingan (${res.count}/3).`, 'info');
          } else {
            UI.showToast('Komparasi', `${car ? car.nama : 'Mobil'} dihapus dari perbandingan.`, 'info');
          }
          return;
        }

        const detailBtn = e.target.closest('.btn-detail');
        if (detailBtn) {
          const id = Number(detailBtn.dataset.id);
          const car = AppState.getCarById(id);
          if (car) {
            UI.renderDetailModal(car);
          }
          return;
        }

        const bookingBtn = e.target.closest('.btn-booking');
        if (bookingBtn) {
          const id = Number(bookingBtn.dataset.id);
          const car = AppState.getCarById(id);
          if (car && car.status !== 'sold') {
            UI.openBookingModal(car);
          }
          return;
        }
      });
    }

    // 8. Event Delegation pada Brand Pills Container
    if (this.elements.brandPillsContainer) {
      this.elements.brandPillsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.brand-pill');
        if (pill) {
          const brand = pill.dataset.brand;
          AppState.setFilter('brand', brand);
          if (this.elements.filterBrand) {
            this.elements.filterBrand.value = brand;
          }
          this.render();
        }
      });
    }

    // 9. Event Delegation pada Active Filter Chips
    if (this.elements.activeFiltersContainer) {
      this.elements.activeFiltersContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.btn-chip-remove');
        if (removeBtn) {
          const key = removeBtn.dataset.key;
          if (key === 'search') {
            AppState.setFilter('search', '');
            if (this.elements.searchInput) this.elements.searchInput.value = '';
            if (this.elements.searchClearBtn) this.elements.searchClearBtn.style.display = 'none';
          } else if (key === 'sortBy') {
            AppState.setFilter('sortBy', 'default');
            if (this.elements.sortSelect) this.elements.sortSelect.value = 'default';
          } else {
            AppState.setFilter(key, 'all');
            this.syncFilterUI();
          }
          this.render();
          return;
        }

        const clearAll = e.target.closest('#btnClearAllChips');
        if (clearAll) {
          AppState.resetFilters();
          this.syncFilterUI();
          this.render();
        }
      });
    }

    // 10. Drawer Komparasi
    if (this.elements.compareDrawer) {
      this.elements.compareDrawer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.btn-remove-compare');
        if (removeBtn) {
          const id = Number(removeBtn.dataset.id);
          AppState.toggleCompare(id);
          UI.renderCompareDrawer(AppState.compareList);
          UI.updateCardCompareStates();
          return;
        }
      });
    }

    if (this.elements.btnOpenCompareModal) {
      this.elements.btnOpenCompareModal.addEventListener('click', () => {
        UI.renderCompareModal();
      });
    }

    if (this.elements.btnClearAllCompare) {
      this.elements.btnClearAllCompare.addEventListener('click', () => {
        AppState.clearCompare();
        UI.renderCompareDrawer(AppState.compareList);
        UI.updateCardCompareStates();
        UI.showToast('Komparasi Dikosongkan', 'Semua unit mobil telah dihapus dari perbandingan.', 'info');
      });
    }

    // 11. Navbar Modals (Wishlist & Booking History)
    if (this.elements.btnNavWishlist) {
      this.elements.btnNavWishlist.addEventListener('click', () => {
        UI.renderWishlistModal();
      });
    }

    if (this.elements.btnNavBookings) {
      this.elements.btnNavBookings.addEventListener('click', () => {
        UI.renderBookingsModal();
      });
    }

    // 12. Modal Close Buttons (Global Listener)
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
      el.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
          UI.closeModal(modal.id);
        }
      });
    });

    // ESC key untuk menutup modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          UI.closeModal(activeModal.id);
        }
      }
    });

    // 13. Theme Toggle (Dark & Light Mode)
    if (this.elements.themeToggleBtn) {
      this.elements.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }

    // 14. Mobile Menu Toggle
    if (this.elements.mobileMenuToggle && this.elements.navMenu) {
      this.elements.mobileMenuToggle.addEventListener('click', () => {
        this.elements.navMenu.classList.toggle('active');
        this.elements.mobileMenuToggle.classList.toggle('open');
      });

      // Tutup mobile menu saat link diklik
      this.elements.navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          this.elements.navMenu.classList.remove('active');
          this.elements.mobileMenuToggle.classList.remove('open');
        });
      });
    }

    // 15. FAQ Accordion
    document.querySelectorAll('.faq-item-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.faq-item');
        const isActive = item.classList.contains('active');
        // Tutup item lain
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // 16. Form Kontak Showroom
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        UI.showToast('Pesan Terkirim!', 'Terima kasih telah menghubungi AutoPrime Motors. Tim kami akan membalas via email / WhatsApp dalam kurun waktu 1x24 jam.', 'success');
        contactForm.reset();
      });
    }

    // 17. Reload API Manual Trigger (jika ada tombol refresh di status)
    const btnRefreshApi = document.getElementById('btnRefreshApi');
    if (btnRefreshApi) {
      btnRefreshApi.addEventListener('click', () => {
        this.loadCarsData();
      });
    }
  },

  syncFilterUI() {
    if (this.elements.searchInput) {
      this.elements.searchInput.value = AppState.filters.search;
    }
    if (this.elements.searchClearBtn) {
      this.elements.searchClearBtn.style.display = AppState.filters.search ? 'inline-flex' : 'none';
    }
    if (this.elements.filterBrand) {
      this.elements.filterBrand.value = AppState.filters.brand;
    }
    if (this.elements.filterFuel) {
      this.elements.filterFuel.value = AppState.filters.bahan_bakar;
    }
    if (this.elements.filterTrans) {
      this.elements.filterTrans.value = AppState.filters.transmisi;
    }
    if (this.elements.filterStatus) {
      this.elements.filterStatus.value = AppState.filters.status;
    }
    if (this.elements.sortSelect) {
      this.elements.sortSelect.value = AppState.filters.sortBy;
    }
    if (this.elements.filterPriceRange) {
      this.elements.filterPriceRange.value = AppState.filters.maxPrice;
      if (this.elements.filterPriceDisplay) {
        this.elements.filterPriceDisplay.textContent = CarCalculator.formatRupiah(AppState.filters.maxPrice);
      }
    }
  },

  applyTheme(theme) {
    AppState.theme = theme;
    localStorage.setItem('autoprime_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    if (this.elements.themeToggleBtn) {
      if (theme === 'light') {
        this.elements.themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        this.elements.themeToggleBtn.title = 'Ganti ke Mode Gelap (Dark)';
      } else {
        this.elements.themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        this.elements.themeToggleBtn.title = 'Ganti ke Mode Terang (Light)';
      }
    }
  },

  // Inisialisasi Kalkulator Kredit
  initCreditCalculator() {
    let currentCarPrice = AppState.cars.length > 0 ? AppState.cars[0].harga : 500000000;
    let selectedTenor = 3;
    let selectedDpPercent = 20;
    let selectedInterestRate = 5.0;

    const updateCalcView = () => {
      const calculation = CarCalculator.calculateLoan(currentCarPrice, selectedDpPercent, selectedTenor, selectedInterestRate);

      if (this.elements.calcCarPriceInput) {
        this.elements.calcCarPriceInput.value = CarCalculator.formatRupiah(currentCarPrice);
      }
      if (this.elements.calcDpPercentDisplay) {
        this.elements.calcDpPercentDisplay.textContent = `${selectedDpPercent}%`;
      }
      if (this.elements.calcDpNominalDisplay) {
        this.elements.calcDpNominalDisplay.textContent = CarCalculator.formatRupiah(calculation.dpNominal);
      }
      if (this.elements.calcResultAngsuran) {
        this.elements.calcResultAngsuran.textContent = CarCalculator.formatRupiah(calculation.angsuranPerBulan);
      }
      if (this.elements.calcResultPokok) {
        this.elements.calcResultPokok.textContent = CarCalculator.formatRupiah(calculation.pokokPinjaman);
      }
      if (this.elements.calcResultTotalBunga) {
        this.elements.calcResultTotalBunga.textContent = CarCalculator.formatRupiah(calculation.totalBunga);
      }
      if (this.elements.calcResultTdp) {
        this.elements.calcResultTdp.textContent = CarCalculator.formatRupiah(calculation.totalPembayaranPertama);
      }
    };

    // Event listener dropdown mobil
    if (this.elements.calcCarSelect) {
      this.elements.calcCarSelect.addEventListener('change', (e) => {
        const car = AppState.getCarById(e.target.value);
        if (car) {
          currentCarPrice = car.harga;
          updateCalcView();
        }
      });
    }

    // Event listener slider DP
    if (this.elements.calcDpSlider) {
      this.elements.calcDpSlider.addEventListener('input', (e) => {
        selectedDpPercent = Number(e.target.value);
        updateCalcView();
      });
    }

    // Event listener pilihan Tenor
    if (this.elements.calcTenorButtons) {
      this.elements.calcTenorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.elements.calcTenorButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedTenor = Number(btn.dataset.tenor);
          updateCalcView();
        });
      });
    }

    // Event listener suku bunga input
    if (this.elements.calcInterestInput) {
      this.elements.calcInterestInput.addEventListener('input', (e) => {
        selectedInterestRate = parseFloat(e.target.value) || 5.0;
        updateCalcView();
      });
    }

    // Tombol ajukan pembiayaan
    if (this.elements.btnApplyCredit) {
      this.elements.btnApplyCredit.addEventListener('click', () => {
        const carId = this.elements.calcCarSelect ? this.elements.calcCarSelect.value : null;
        const car = AppState.getCarById(carId);
        UI.openBookingModal(car);
      });
    }

    // Simpan referensi method agar bisa dipanggil dari card / modal
    this.loadCarToCalculator = (car) => {
      if (!car) return;
      currentCarPrice = car.harga;
      if (this.elements.calcCarSelect) {
        this.elements.calcCarSelect.value = car.id;
      }
      updateCalcView();
    };

    updateCalcView();
  }
};

// Pasang ke window object
window.AppOrchestrator = AppOrchestrator;

// Jalankan ketika DOM siap
document.addEventListener('DOMContentLoaded', () => {
  AppOrchestrator.init();
});
