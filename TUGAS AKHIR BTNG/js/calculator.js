/**
 * Calculator Module - Simulasi Kredit & Pembayaran Showroom
 */

const CarCalculator = {
  // Format angka ke format Rupiah standar Indonesia
  formatRupiah(amount) {
    if (isNaN(amount) || amount === null) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Format angka ringkas (misal: 12.5 Jt)
  formatJuta(amount) {
    if (isNaN(amount) || amount === null) return '0';
    const juta = amount / 1000000;
    if (juta >= 1000) {
      return (juta / 1000).toFixed(2) + ' M';
    }
    return juta.toFixed(1) + ' Jt';
  },

  /**
   * Menghitung rincian simulasi kredit mobil
   * @param {number} carPrice - Harga mobil (IDR)
   * @param {number} dpPercent - Persentase Uang Muka (10 - 80)
   * @param {number} tenorYears - Lama tenor dalam tahun (1 - 5)
   * @param {number} interestRate - Suku bunga tahunan dalam persen (contoh 4.8)
   */
  calculateLoan(carPrice, dpPercent = 20, tenorYears = 3, interestRate = 5.0) {
    const price = Math.max(0, Number(carPrice) || 0);
    const dpPct = Math.min(80, Math.max(10, Number(dpPercent) || 20));
    const tenor = Math.max(1, Math.min(7, Number(tenorYears) || 3));
    const rate = Math.max(1, Number(interestRate) || 5.0);

    const dpNominal = Math.round(price * (dpPct / 100));
    const pokokPinjaman = Math.max(0, price - dpNominal);

    // Total bunga flat per tahun
    const totalBunga = Math.round(pokokPinjaman * (rate / 100) * tenor);
    const totalPinjamanPlusBunga = pokokPinjaman + totalBunga;
    const totalBulan = tenor * 12;

    const angsuranPerBulan = totalBulan > 0 ? Math.round(totalPinjamanPlusBunga / totalBulan) : 0;

    // Estimasi biaya asuransi komprehensif & administrasi
    const biayaAdmin = 2500000;
    const estimasiAsuransi = Math.round(price * 0.022); // ~2.2% dari harga
    const totalPembayaranPertama = dpNominal + biayaAdmin + estimasiAsuransi + angsuranPerBulan;

    return {
      hargaMobil: price,
      dpPercent: dpPct,
      dpNominal: dpNominal,
      pokokPinjaman: pokokPinjaman,
      tenorTahun: tenor,
      tenorBulan: totalBulan,
      sukuBunga: rate,
      totalBunga: totalBunga,
      angsuranPerBulan: angsuranPerBulan,
      biayaAdmin: biayaAdmin,
      estimasiAsuransi: estimasiAsuransi,
      totalPembayaranPertama: totalPembayaranPertama
    };
  },

  /**
   * Estimasi cicilan termurah untuk ditampilkan pada card katalog mobil
   * (Mengasumsikan DP 20% dengan tenor terpanjang 5 tahun bunga 5%)
   */
  getQuickInstallment(carPrice) {
    const loan = this.calculateLoan(carPrice, 20, 5, 5.0);
    return this.formatJuta(loan.angsuranPerBulan);
  }
};
