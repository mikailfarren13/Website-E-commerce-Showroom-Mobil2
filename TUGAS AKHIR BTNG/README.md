# AutoPrime Motors - Premium Car Showroom & E-Commerce

> **Tugas Akhir Web Development Frontend**  
> Tema: E-Commerce / Showroom Mobil  
> Teknologi: **HTML5, CSS3, JavaScript Native (Vanilla JavaScript - No Framework)**  
> Integrasi API: `https://api-web.dnccudinus.org/api/mobil`

---

## 📌 Deskripsi Proyek
**AutoPrime Motors** adalah platform web modern untuk showroom dan e-commerce otomotif yang menyajikan katalog mobil mewah, elektrik (EV), hybrid, SUV, dan sedan secara interaktif. Seluruh data mobil diambil langsung dari endpoint API resmi DNCC UDINUS menggunakan fungsi native `fetch()` dan diproses ke dalam antarmuka pengguna menggunakan manipulasi DOM dinamis (`document.createElement()`, `innerHTML`, event delegation).

Website dirancang dengan standar UI/UX profesional berkonsep **Obsidian Luxury & Electric Cyan**, mendukung tampilan responsif di semua perangkat (Desktop, Tablet, Smartphone), serta dilengkapi fitur-fitur transaksi dan konsultasi showroom yang lengkap.

---

## ✨ Fitur-Fitur Utama

### 1. 🌐 Integrasi API Resmi DNCC Real-Time
- **Endpoint**: `https://api-web.dnccudinus.org/api/mobil`
- **Fungsi**: Menggunakan native `fetch()` dengan penanganan error, abort controller timeout, status live indicator, dan caching lokal.
- **API Status Strip**: Indikator langsung di bagian atas halaman dengan lampu denyut hijau (*pulsing dot*) yang menunjukkan status koneksi server, jumlah unit aktif, dan tombol *refresh* data.

### 2. 🔍 Pencarian Real-Time (Live Search)
- Pencarian instan berdasarkan nama mobil, brand, tipe bahan bakar, atau transmisi.
- Dilengkapi mekanisme *debounce* (250ms) agar performa pencarian tetap ringan dan mulus.
- Tombol *clear* (x) untuk mengosongkan kata kunci dengan satu klik.
- Kolom pencarian cepat terintegrasi langsung di Hero Section.

### 3. 🎛️ Filter Multi-Kategori & Pengurutan (Sorting)
- **Brand Shortcut Pills & Dropdown**: Filter cepat untuk Toyota, Honda, BYD, Mazda, Hyundai, Wuling, Suzuki, Mitsubishi, Daihatsu.
- **Filter Jenis Bahan Bakar**: Bensin, Diesel, Hybrid, Listrik (EV).
- **Filter Transmisi**: Matic (AT), CVT, Manual (MT).
- **Filter Status Unit**: Unit Tersedia (Available) dan Terjual (Sold Out).
- **Slider Rentang Harga**: Menyesuaikan batas harga maksimal dengan format Rupiah otomatis.
- **Pengurutan (Sort)**:
  - Terbaru Ditambahkan
  - Harga Termurah ke Termahal
  - Harga Termahal ke Termurah
  - Tahun Paling Baru
  - Nama A-Z dan Z-A
- **Active Filter Chips**: Tag penanda filter aktif yang dapat dihapus secara individual atau sekaligus.

### 4. 🔲 Pilihan Tampilan (Grid & List View)
- Beralih antara tampilan **Grid View** (3 kolom responsif) dan **List View** (horizontal kartu memanjang) sesuai preferensi pengguna.

### 5. 🚘 Kartu Mobil Interaktif (Car Cards)
- Rasio visual 16:9 dengan efek *smooth hover zoom* dan *dark gradient overlay*.
- Lencana status ketersediaan (*Tersedia* hijau vs *Terjual* merah).
- Lencana bahan bakar pintar dengan ikon (Petir biru untuk EV, Daun hijau untuk Hybrid, Pom bensin kuning untuk Diesel).
- Estimasi cicilan per bulan (*Mulai Rp X jt/bln*).
- Tombol aksi: Favorit (Wishlist), Bandingkan, Lihat Detail, dan Pesan / Test Drive.

### 6. 🔍 Modal Detail Mobil Lengkap (Quick View Modal)
- Galeri foto kendaraan interaktif dengan tombol *thumbnail switcher*.
- Tabel spesifikasi detail (Brand, Tahun, Transmisi, Bahan Bakar, Status Ketersediaan, Kategori Ruang).
- Daftar keunggulan terverifikasi (160 Titik Inspeksi, Garansi 1 Tahun, dsb.).
- Integrasi tombol langsung ke WhatsApp Sales Resmi dengan pesan otomatis.

### 7. ⚖️ Fitur Komparasi Mobil (Side-by-Side Comparison)
- Pilih hingga 3 unit mobil dari katalog.
- *Floating Comparison Drawer* di bagian bawah layar yang menampilkan unit terpilih.
- Modal tabel komparasi detail untuk membandingkan harga OTR, estimasi cicilan, tahun, transmisi, bahan bakar, dan status ketersediaan secara berdampingan.

### 8. 🧮 Kalkulator Simulasi Kredit & Pembiayaan
- Pilih unit mobil dari daftar.
- Slider Uang Muka (DP) interaktif dari 10% hingga 70% dengan kalkulasi nominal Rupiah otomatis.
- Pilihan tenor pinjaman: 1, 2, 3, 4, hingga 5 Tahun.
- Input suku bunga flat tahunan (%).
- Rincian komprehensif: Estimasi Angsuran Bulanan, Pokok Pinjaman, Total Beban Bunga, dan Total Pembayaran Pertama (TDP).
- Tombol "Ajukan Pembiayaan" yang langsung meneruskan data mobil ke form pemesanan.

### 9. 📝 Formulir Pemesanan & Jadwal Test Drive (SPK)
- Formulir booking terintegrasi dengan validasi data nama, nomor WhatsApp aktif, tanggal rencana (minimal H+1), sesi waktu, opsi layanan (*Datang ke Showroom* atau *Home Test Drive*), dan catatan.
- Menghasilkan kode referensi pemesanan unik (contoh: `BK-893124`).
- Tersimpan secara persisten pada `localStorage`.
- Modal **"Riwayat Pengajuan Saya"** untuk melihat status pemesanan yang pernah diajukan.

### 10. ❤️ Sistem Wishlist / Favorit
- Simpan mobil impian dengan animasi *heart pop*.
- Penghitung angka favorit *real-time* di bilah navigasi (Navbar Badge).
- Modal daftar favorit khusus untuk mengelola atau langsung memesan unit yang disimpan.
- Data tersimpan secara persisten di `localStorage`.

### 11. 🌓 Pengganti Mode Tema (Dark & Light Theme)
- Pilihan tema gelap mewah (*Obsidian Luxe*) dan tema terang bersih (*Clean Light*).
- Pilihan tema tersimpan secara otomatis di `localStorage`.

### 12. 🔔 Sistem Notifikasi Toast Mengambang
- Notifikasi non-intrusif di pojok kanan atas dengan animasi masuk dan keluar untuk setiap aksi (tambah favorit, komparasi, booking, reset filter, dll).

### 13. 💬 FAQ Accordion & Ulasan Konsumen (Testimoni)
- Akordeon interaktif untuk pertanyaan seputar pembelian, garansi, dan inspeksi.
- Ulasan pembeli dengan peringkat 5 bintang.

---

## 📁 Struktur Direktori Proyek

```
TUGAS AKHIR BTNG/
│
├── index.html              # Struktur utama HTML5 aplikasi
├── README.md               # Dokumentasi lengkap proyek
│
├── css/
│   ├── style.css           # Desain sistem, warna CSS variables, komponen, layout
│   ├── animations.css      # Animasi skeleton loading, shimmer, pulse, transitions
│   └── responsive.css      # Media queries untuk Tablet, Mobile, dan layar kecil
│
├── js/
│   ├── api.js              # Integrasi fetch() ke https://api-web.dnccudinus.org/api/mobil
│   ├── state.js            # State global (mobil, filter, wishlist, komparasi, booking)
│   ├── calculator.js       # Logika perhitungan matematika simulasi kredit & angsuran
│   ├── ui.js               # Manipulasi DOM (kartu mobil, badge, modal, toast, drawer)
│   ├── booking.js          # Pengelolaan formulir jadwal test drive & SPK
│   └── app.js              # Orkestrasi event listeners, inisialisasi aplikasi & tema
│
└── assets/                 # Folder aset statis
```

---

## 🚀 Cara Menjalankan Website

Website dibuat menggunakan **HTML, CSS, dan JavaScript Native**, sehingga tidak membutuhkan instalasi dependensi pihak ketiga atau proses *build*.

### Opsi 1: Buka Langsung di Browser
1. Buka folder proyek `d:\TUGAS AKHIR BTNG\`.
2. Klik dua kali file `index.html` untuk membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

### Opsi 2: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek di Visual Studio Code.
2. Klik kanan file `index.html` dan pilih **"Open with Live Server"**.
3. Website akan terbuka di alamat `http://127.0.0.1:5500/index.html`.

### Opsi 3: Menggunakan Python HTTP Server
1. Buka terminal/PowerShell di folder proyek.
2. Jalankan perintah:
   ```bash
   python -m http.server 8000
   ```
3. Buka browser dan kunjungi `http://localhost:8000`.

---

## 🧪 Pembuktian Pengambilan Data API

Data mobil diambil langsung dari endpoint:  
`https://api-web.dnccudinus.org/api/mobil`

Ketika website dijalankan:
1. Fungsi `fetchCarsFromAPI()` pada `js/api.js` mengirimkan permintaan GET ke endpoint panitia.
2. Saat proses memuat, komponen **Skeleton Loader** dengan animasi shimmer ditampilkan.
3. Setelah data berhasil diterima:
   - Bilah status menampilkan lencana hijau berkedip bertuliskan:  
     `API Live Terhubung (12 Unit Mobil)`.
   - Notifikasi toast muncul mengonfirmasi penerimaan data.
   - Fungsi `UI.renderCarCards()` merender kartu-kartu mobil ke elemen `#carsGrid` secara dinamis.
4. Jika perangkat penguji berada dalam mode luring (*offline*), sistem memiliki mekanisme *fallback* cadangan resmi sehingga situs tetap dapat dievaluasi secara menyeluruh tanpa kegagalan tampilan.

---

## 👨‍💻 Pengembang
- **Nama Program**: Tugas Akhir Frontend Web Development DNCC UDINUS 2026
- **Spesialisasi**: Frontend Web Development (Vanilla HTML5, CSS3, JavaScript)
#   W e b s i t e - E - c o m m e r c e - S h o w r o o m - M o b i l  
 