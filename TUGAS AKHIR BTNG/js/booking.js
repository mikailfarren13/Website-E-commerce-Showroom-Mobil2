/**
 * Booking Module - Pengelolaan Form Pengajuan Test Drive & SPK Pemesanan
 */

const BookingManager = {
  init() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleBookingSubmit(form);
    });
  },

  handleBookingSubmit(form) {
    const carSelect = form.querySelector('#bookingCarSelect');
    const nameInput = form.querySelector('#bookingName');
    const phoneInput = form.querySelector('#bookingPhone');
    const dateInput = form.querySelector('#bookingDate');
    const timeInput = form.querySelector('#bookingTimeSlot');
    const serviceType = form.querySelector('input[name="bookingService"]:checked') || { value: 'showroom' };
    const notesInput = form.querySelector('#bookingNotes');

    const carId = Number(carSelect.value);
    const car = AppState.getCarById(carId);

    // Validasi Sederhana
    if (!nameInput.value.trim()) {
      UI.showToast('Validasi Gagal', 'Silakan masukkan nama lengkap Anda.', 'error');
      nameInput.focus();
      return;
    }

    const phone = phoneInput.value.trim();
    if (!phone || phone.length < 9) {
      UI.showToast('Validasi Gagal', 'Nomor telepon/WhatsApp minimal 9 digit.', 'error');
      phoneInput.focus();
      return;
    }

    if (!dateInput.value) {
      UI.showToast('Validasi Gagal', 'Silakan pilih tanggal test drive yang diinginkan.', 'error');
      dateInput.focus();
      return;
    }

    // Persiapkan Objek Booking
    const bookingData = {
      carId: carId,
      carName: car ? car.nama : 'Unit Mobil Pilihan',
      carPrice: car ? car.harga : 0,
      name: nameInput.value.trim(),
      phone: phone,
      date: dateInput.value,
      timeSlot: timeInput ? timeInput.value : 'Pagi (09:00 - 11:30)',
      serviceType: serviceType.value,
      notes: notesInput ? notesInput.value.trim() : ''
    };

    // Simpan ke State & LocalStorage
    const savedBooking = AppState.addBooking(bookingData);

    // Reset Form
    form.reset();

    // Tutup Modal Form
    UI.closeModal('modalBooking');

    // Beri Feedback Notifikasi
    UI.showToast(
      'Pemesanan Berhasil!', 
      `Jadwal test drive #${savedBooking.id} untuk ${savedBooking.carName} berhasil dicatat. Tim sales kami akan segera menghubungi Anda melalui WhatsApp.`, 
      'success'
    );

    // Tampilkan Riwayat
    setTimeout(() => {
      UI.renderBookingsModal();
    }, 600);
  }
};
