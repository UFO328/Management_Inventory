// =============================================
//  CREATE PRODUCT — ERP System
//  UI only: validasi sebelum submit ke Django
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  const form      = document.getElementById('formCreateProduct');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnReset  = document.getElementById('btnReset');

  // ── Reset ──
  btnReset.addEventListener('click', function () {
    form.reset();
    clearAllErrors();
    resetBtn();
  });

  // ── Submit ──
  form.addEventListener('submit', function (e) {
    clearAllErrors();

    const data = {
      nama:       document.getElementById('namaProduk').value.trim(),
      kode:       document.getElementById('kodeBarang').value.trim(),
      stok:       document.getElementById('stok').value,
      kategori:   document.getElementById('kategori').value,
    };

    if (!validate(data)) {
      e.preventDefault();  // tahan submit kalau tidak valid
      return;
    }

    // Valid — loading state, biarkan form submit ke Django
    setLoading(true);
  });

  // ══════════════════════════════
  //  VALIDASI
  // ══════════════════════════════
  function validate(data) {
    let valid = true;

    if (!data.nama) {
      showFieldError('namaProduk', 'namaErr', 'Nama produk tidak boleh kosong.');
      valid = false;
    }

    if (!data.kode) {
      showFieldError('kodeBarang', 'kodeErr', 'Kode barang tidak boleh kosong.');
      valid = false;
    } else if (!/^[A-Za-z0-9\-_]+$/.test(data.kode)) {
      showFieldError('kodeBarang', 'kodeErr', 'Kode hanya boleh huruf, angka, - dan _.');
      valid = false;
    }

    if (data.stok === '' || data.stok === null) {
      showFieldError('stok', 'stokErr', 'Stok tidak boleh kosong.');
      valid = false;
    } else if (parseInt(data.stok) < 0) {
      showFieldError('stok', 'stokErr', 'Stok tidak boleh negatif.');
      valid = false;
    }

    if (!data.kategori) {
      showFieldError('kategori', 'kategoriErr', 'Pilih kategori produk.');
      valid = false;
    }

    return valid;
  }

  // ══════════════════════════════
  //  HELPERS
  // ══════════════════════════════
  function setLoading(on) {
    btnSubmit.disabled  = on;
    btnSubmit.innerHTML = on
      ? '<div class="spinner"></div> Menyimpan...'
      : '<i class="bi bi-floppy"></i> Simpan Produk';
  }

  function resetBtn() {
    btnSubmit.disabled  = false;
    btnSubmit.classList.remove('success');
    btnSubmit.innerHTML = '<i class="bi bi-floppy"></i> Simpan Produk';
  }

  function showFieldError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
    if (input) input.classList.add('is-error');
    if (err)   { err.textContent = msg; err.classList.add('show'); }

    // Clear saat user mengetik
    if (input) {
      input.addEventListener('input', function () {
        input.classList.remove('is-error');
        if (err) { err.textContent = ''; err.classList.remove('show'); }
      }, { once: true });

      input.addEventListener('change', function () {
        input.classList.remove('is-error');
        if (err) { err.textContent = ''; err.classList.remove('show'); }
      }, { once: true });
    }
  }

  function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(function (el) {
      el.textContent = '';
      el.classList.remove('show');
    });
    document.querySelectorAll('.form-input').forEach(function (el) {
      el.classList.remove('is-error');
    });
  }

});
