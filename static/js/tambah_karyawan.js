// =============================================
//  TAMBAH KARYAWAN — ERP System
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Elements ──
  const form        = document.getElementById('formKaryawan');
  const btnSubmit   = document.getElementById('btnSubmit');
  const btnReset    = document.getElementById('btnReset');
  const alertSuccess = document.getElementById('alertSuccess');
  const alertError   = document.getElementById('alertError');
  const roleSelect   = document.getElementById('role');
  const roleInfo     = document.getElementById('roleInfo');
  const roleInfoText = document.getElementById('roleInfoText');

  // ── Role descriptions ──
  const roleDesc = {
    hrd:             'Dapat mengelola data karyawan, membuat akun baru, dan mengatur hak akses pengguna.',
    manager:         'Dapat melihat semua laporan, menyetujui permintaan pengadaan, dan memantau stok.',
    staff_gudang:    'Dapat menginput penerimaan & pengeluaran barang, serta memperbarui data stok.',
    staff_keuangan:  'Dapat menginput transaksi keuangan, membuat laporan, dan mengelola invoice.',
    viewer:          'Hanya dapat melihat data (read-only). Tidak dapat melakukan perubahan apapun.',
  };

  // ── Show role info on select ──
  roleSelect.addEventListener('change', function () {
    const val = this.value;
    if (val && roleDesc[val]) {
      roleInfoText.textContent = roleDesc[val];
      roleInfo.style.display = 'flex';
    } else {
      roleInfo.style.display = 'none';
    }
    clearFieldError('roleErr');
  });

  // ── Clear error on input ──
  const fields = ['namaLengkap', 'nik', 'email', 'jabatan', 'departemen', 'tglBergabung', 'username', 'role'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const errId = {
        namaLengkap: 'namaErr', nik: 'nikErr', email: 'emailErr',
        jabatan: 'jabatanErr', departemen: 'deptErr',
        tglBergabung: 'tglErr', username: 'usernameErr', role: 'roleErr'
      }[id];
      if (errId) clearFieldError(errId);
      el.classList.remove('is-error');
      hideAlerts();
    });
    el.addEventListener('change', () => {
      const errId = {
        namaLengkap: 'namaErr', nik: 'nikErr', email: 'emailErr',
        jabatan: 'jabatanErr', departemen: 'deptErr',
        tglBergabung: 'tglErr', username: 'usernameErr', role: 'roleErr'
      }[id];
      if (errId) clearFieldError(errId);
      el.classList.remove('is-error');
    });
  });

  // ── Reset button ──
  btnReset.addEventListener('click', function () {
    form.reset();
    hideAlerts();
    clearAllErrors();
    roleInfo.style.display = 'none';
    btnSubmit.disabled = false;
    btnSubmit.classList.remove('success');
    btnSubmit.innerHTML = '<i class="bi bi-person-plus"></i> Buat Akun Karyawan';
  });

  // ── Form submit ──
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideAlerts();
    clearAllErrors();

    const data = {
      namaLengkap:  document.getElementById('namaLengkap').value.trim(),
      nik:          document.getElementById('nik').value.trim(),
      email:        document.getElementById('email').value.trim(),
      noTelp:       document.getElementById('noTelp').value.trim(),
      jabatan:      document.getElementById('jabatan').value.trim(),
      departemen:   document.getElementById('departemen').value,
      tglBergabung: document.getElementById('tglBergabung').value,
      username:     document.getElementById('username').value.trim(),
      role:         document.getElementById('role').value,
    };

    if (!validate(data)) return;

    // Loading state
    setLoading(true);

    // Simulasi API call ke Django
    // Ganti dengan: await fetch('/api/karyawan/', { method: 'POST', ... })
    await delay(1500);

    // Simulasi sukses
    setLoading(false);
    showSuccess(`Akun untuk <strong>${data.namaLengkap}</strong> berhasil dibuat. Password sementara telah dikirim ke <strong>${data.email}</strong>.`);
    btnSubmit.classList.add('success');
    btnSubmit.innerHTML = '<i class="bi bi-check2"></i> Berhasil Dibuat';
    btnSubmit.disabled = true;
  });

  // ══════════════════════════════
  //  VALIDATION
  // ══════════════════════════════
  function validate(data) {
    let valid = true;

    if (!data.namaLengkap) {
      showFieldError('namaErr', 'Nama lengkap tidak boleh kosong.', 'namaLengkap');
      valid = false;
    }

    if (!data.nik) {
      showFieldError('nikErr', 'NIK tidak boleh kosong.', 'nik');
      valid = false;
    } else if (!/^\d{16}$/.test(data.nik)) {
      showFieldError('nikErr', 'NIK harus 16 digit angka.', 'nik');
      valid = false;
    }

    if (!data.email) {
      showFieldError('emailErr', 'Email tidak boleh kosong.', 'email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showFieldError('emailErr', 'Format email tidak valid.', 'email');
      valid = false;
    }

    if (!data.jabatan) {
      showFieldError('jabatanErr', 'Jabatan tidak boleh kosong.', 'jabatan');
      valid = false;
    }

    if (!data.departemen) {
      showFieldError('deptErr', 'Pilih departemen terlebih dahulu.', 'departemen');
      valid = false;
    }

    if (!data.tglBergabung) {
      showFieldError('tglErr', 'Tanggal bergabung tidak boleh kosong.', 'tglBergabung');
      valid = false;
    }

    if (!data.username) {
      showFieldError('usernameErr', 'Username tidak boleh kosong.', 'username');
      valid = false;
    } else if (!/^[a-z0-9_]+$/.test(data.username)) {
      showFieldError('usernameErr', 'Hanya huruf kecil, angka, dan underscore.', 'username');
      valid = false;
    }

    if (!data.role) {
      showFieldError('roleErr', 'Pilih role untuk karyawan ini.', 'role');
      valid = false;
    }

    return valid;
  }

  // ══════════════════════════════
  //  HELPERS
  // ══════════════════════════════
  function setLoading(isLoading) {
    btnSubmit.disabled = isLoading;
    btnSubmit.innerHTML = isLoading
      ? '<div class="spinner"></div> Menyimpan...'
      : '<i class="bi bi-person-plus"></i> Buat Akun Karyawan';
  }

  function showSuccess(msg) {
    document.getElementById('successMsg').innerHTML = msg;
    alertSuccess.classList.add('show');
    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showAlert(msg) {
    document.getElementById('errorMsg').textContent = msg;
    alertError.classList.add('show');
  }

  function hideAlerts() {
    alertSuccess.classList.remove('show');
    alertError.classList.remove('show');
  }

  function showFieldError(errId, msg, inputId) {
    const errEl = document.getElementById(errId);
    if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
    if (inputId) {
      const inputEl = document.getElementById(inputId);
      if (inputEl) inputEl.classList.add('is-error');
    }
  }

  function clearFieldError(errId) {
    const el = document.getElementById(errId);
    if (el) { el.textContent = ''; el.classList.remove('show'); }
  }

  function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.classList.remove('show');
    });
    document.querySelectorAll('.form-input').forEach(el => {
      el.classList.remove('is-error');
    });
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

});
