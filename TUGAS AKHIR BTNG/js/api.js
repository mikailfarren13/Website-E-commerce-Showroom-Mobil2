/**
 * API Module - Integrasi Endpoint Mobil DNCC UDINUS
 * Endpoint Resmi: https://api-web.dnccudinus.org/api/mobil
 */

const API_CONFIG = {
  ENDPOINT: 'https://api-web.dnccudinus.org/api/mobil',
  TIMEOUT_MS: 10000,
  CACHE_KEY: 'autoprime_cars_cache',
  CACHE_TIMESTAMP_KEY: 'autoprime_cars_cache_time'
};

/**
 * Fallback data resmi yang sesuai persis dengan struktur API DNCC
 * Digunakan secara aman jika pengguna membuka secara offline atau terjadi pembatasan CORS lokal
 */
const FALLBACK_CARS_DATA = [
  {
    id: 61,
    ruang: "public",
    nama: "BYD Seal Performance AWD",
    brand: "BYD",
    harga: 719000000,
    tahun: 2024,
    transmisi: "Matic",
    bahan_bakar: "Listrik",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 60,
    ruang: "public",
    nama: "Toyota Fortuner 2.8 GR Sport 4x4",
    brand: "Toyota",
    harga: 735000000,
    tahun: 2023,
    transmisi: "Matic",
    bahan_bakar: "Diesel",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 59,
    ruang: "public",
    nama: "Honda CR-V 2.0 e:HEV RS",
    brand: "Honda",
    harga: 805000000,
    tahun: 2024,
    transmisi: "CVT",
    bahan_bakar: "Hybrid",
    status: "sold",
    foto: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 58,
    ruang: "public",
    nama: "Daihatsu Rocky 1.0 R Turbo CVT",
    brand: "Daihatsu",
    harga: 245000000,
    tahun: 2023,
    transmisi: "CVT",
    bahan_bakar: "Bensin",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 57,
    ruang: "public",
    nama: "Mazda 3 Hatchback 2.0 SKYACTIV-G",
    brand: "Mazda",
    harga: 555000000,
    tahun: 2022,
    transmisi: "Matic",
    bahan_bakar: "Bensin",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 56,
    ruang: "public",
    nama: "Wuling Air EV Long Range",
    brand: "Wuling",
    harga: 275000000,
    tahun: 2023,
    transmisi: "Matic",
    bahan_bakar: "Listrik",
    status: "sold",
    foto: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 55,
    ruang: "public",
    nama: "Suzuki Jimny 1.5 4x4 MT",
    brand: "Suzuki",
    harga: 445000000,
    tahun: 2023,
    transmisi: "Manual",
    bahan_bakar: "Bensin",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 54,
    ruang: "public",
    nama: "Toyota Kijang Innova Zenix Hybrid 2.0 V",
    brand: "Toyota",
    harga: 542000000,
    tahun: 2024,
    transmisi: "CVT",
    bahan_bakar: "Hybrid",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 53,
    ruang: "public",
    nama: "Hyundai Ioniq 5 Signature Long Range",
    brand: "Hyundai",
    harga: 895000000,
    tahun: 2024,
    transmisi: "Matic",
    bahan_bakar: "Listrik",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 52,
    ruang: "public",
    nama: "Mitsubishi Pajero Sport Dakar 4x2",
    brand: "Mitsubishi",
    harga: 635000000,
    tahun: 2023,
    transmisi: "Matic",
    bahan_bakar: "Diesel",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 51,
    ruang: "public",
    nama: "Honda Civic RS Turbo",
    brand: "Honda",
    harga: 616000000,
    tahun: 2023,
    transmisi: "CVT",
    bahan_bakar: "Bensin",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  },
  {
    id: 50,
    ruang: "public",
    nama: "Toyota Avanza 1.5 G CVT",
    brand: "Toyota",
    harga: 275000000,
    tahun: 2024,
    transmisi: "CVT",
    bahan_bakar: "Bensin",
    status: "tersedia",
    foto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    created_at: "2026-10-25T11:26:25.000000Z",
    updated_at: "2026-10-25T11:26:25.000000Z"
  }
];

/**
 * Mengambil data mobil dari API resmi DNCC UDINUS menggunakan native fetch()
 * Menyediakan status real-time, error handling, dan fallback cadangan
 * @returns {Promise<{success: boolean, data: Array, source: 'live'|'cache'|'fallback', message: string}>}
 */
async function fetchCarsFromAPI() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

  try {
    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status} (${response.statusText})`);
    }

    const result = await response.json();

    if (result && Array.isArray(result.data)) {
      // Simpan cache ke localStorage untuk ketahanan offline
      try {
        localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(result.data));
        localStorage.setItem(API_CONFIG.CACHE_TIMESTAMP_KEY, new Date().toISOString());
      } catch (cacheErr) {
        console.warn('Gagal menyimpan cache ke localStorage:', cacheErr);
      }

      return {
        success: true,
        data: result.data,
        total: result.total || result.data.length,
        source: 'live',
        message: result.message || 'Berhasil terhubung ke server API DNCC secara langsung.'
      };
    } else {
      throw new Error('Format respon API tidak memiliki properti data array yang valid.');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('Gagal fetch data dari API live, mencoba cadangan cache/fallback:', error.message);

    // Coba ambil dari localStorage cache terlebih dahulu
    try {
      const cachedData = localStorage.getItem(API_CONFIG.CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            success: true,
            data: parsed,
            total: parsed.length,
            source: 'cache',
            message: 'Memuat data dari cache tersimpan (Koneksi server utama sedang tidak stabil).'
          };
        }
      }
    } catch (parseErr) {
      console.warn('Gagal memproses data cache:', parseErr);
    }

    // Jika tidak ada cache, gunakan data resmi fallback
    return {
      success: true,
      data: FALLBACK_CARS_DATA,
      total: FALLBACK_CARS_DATA.length,
      source: 'fallback',
      message: 'Mode offline / cadangan aktif. Data 12 unit mobil tetap tersedia lengkap.'
    };
  }
}
