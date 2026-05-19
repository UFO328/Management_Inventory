// =============================================
//  MODAL CREATE ACCOUNT — Standalone JS
//  Buka: onclick="bukaModalCreateAccount(karyawanId, namaKaryawan)"
// =============================================

(function () {

  // Role descriptions
  var roleDesc = {
    hrd:             'Dapat mengelola data karyawan, membuat akun, dan mengatur hak akses.',
    manager:         'Dapat melihat semua laporan dan menyetujui transaksi.',
    kepala_gudang:   'Dapat mengelola stok, barang masuk dan keluar.',
    staff_gudang:    'Dapat input stok dan melihat data barang.',
    staff_keuangan:  'Dapat input transaksi keuangan dan membuat laporan.',
    viewer:          'Hanya dapat melihat data (read-only).',
  };

  // ── Buka modal ──
  window.bukaModalCreateAccount = function (karyawanId, namaKaryawan) {
    var overlay = document.getElementById('modalCreateAccount');
    if (!overlay) return;

    // Set action form
    var form = document.getElementById('formCreateAccount');
    if (form) {
      form.action = dataset.id;
      form.reset();
    }

    // Reset state
    resetCaForm();
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    var usernameEl = document.getElementById('caUsername');
    if (usernameEl) usernameEl.focus();
  };

  // ── Init saat DOM ready ──
  document.addEventListener('DOMContentLoaded', function () {

    var overlay     = document.getElementById('modalCreateAccount');
    if (!overlay) return;

    var btnClose    = document.getElementById('btnCaClose');
    var btnCancel   = document.getElementById('btnCaCancel');
    var btnSubmit   = document.getElementById('btnCaSubmit');
    var form        = document.getElementById('formCreateAccount');
    var roleSelect  = document.getElementById('caRole');
    var togglePw    = document.getElementById('caTogglePw');
    var eyeIcon     = document.getElementById('caEyeIcon');
    var passwordEl  = document.getElementById('caPassword');
    var roleInfo    = document.getElementById('caRoleInfo');
    var roleInfoTxt = document.getElementById('caRoleInfoText');

    // ── Tutup modal ──
    function tutup() {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (btnClose)  btnClose.addEventListener('click',  tutup);
    if (btnCancel) btnCancel.addEventListener('click', tutup);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) tutup();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) tutup();
    });

    // ── Toggle show/hide password ──
    if (togglePw && passwordEl) {
      togglePw.addEventListener('click', function () {
        var isPass = passwordEl.type === 'password';
        passwordEl.type = isPass ? 'text' : 'password';
        if (eyeIcon) {
          eyeIcon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
        }
      });
    }

    // ── Role info ──
    if (roleSelect) {
      roleSelect.addEventListener('change', function () {
        var val = this.value;
        clearFieldError('caRole', 'caRoleErr');
        if (val && roleDesc[val]) {
          if (roleInfoTxt) roleInfoTxt.textContent = roleDesc[val];
          if (roleInfo)    roleInfo.classList.add('show');
        } else {
          if (roleInfo) roleInfo.classList.remove('show');
        }
      });
    }

    // ── Clear error on input ──
    ['caUsername', 'caPassword', 'caPasswordConfirm'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          var errMap = {
            caUsername:        'caUsernameErr',
            caPassword:        'caPasswordErr',
            caPasswordConfirm: 'caPasswordConfirmErr',
          };
          clearFieldError(id, errMap[id]);
          hideAlert();
        });
      }
    });

    // ── Submit ──
    if (btnSubmit) {
      btnSubmit.addEventListener('click', function () {
        hideAlert();
        clearAllCaErrors();

        var username  = document.getElementById('caUsername')?.value.trim()  || '';
        var role      = document.getElementById('caRole')?.value             || '';
        var password  = document.getElementById('caPassword')?.value         || '';
        var confirm   = document.getElementById('caPasswordConfirm')?.value  || '';

        if (!validate(username, role, password, confirm)) return;

        setLoading(true);
        if (form) form.submit();
      });
    }

    // ── Validasi ──
    function validate(username, role, password, confirm) {
      var valid = true;

      if (!username) {
        showFieldError('caUsername', 'caUsernameErr', 'Username tidak boleh kosong.');
        valid = false;
      } else if (!/^[a-z0-9_]+$/.test(username)) {
        showFieldError('caUsername', 'caUsernameErr', 'Hanya huruf kecil, angka, dan underscore.');
        valid = false;
      }

      if (!role) {
        showFieldError('caRole', 'caRoleErr', 'Pilih role untuk akun ini.');
        valid = false;
      }

      if (!password) {
        showFieldError('caPassword', 'caPasswordErr', 'Password tidak boleh kosong.');
        valid = false;
      } else if (password.length < 8) {
        showFieldError('caPassword', 'caPasswordErr', 'Password minimal 8 karakter.');
        valid = false;
      }

      if (!confirm) {
        showFieldError('caPasswordConfirm', 'caPasswordConfirmErr', 'Konfirmasi password tidak boleh kosong.');
        valid = false;
      } else if (password !== confirm) {
        showFieldError('caPasswordConfirm', 'caPasswordConfirmErr', 'Password tidak cocok.');
        valid = false;
      }

      if (!valid) showAlert('Periksa kembali isian form di bawah ini.');
      return valid;
    }

    // ── Helpers ──
    function setLoading(on) {
      if (!btnSubmit) return;
      btnSubmit.disabled  = on;
      btnSubmit.innerHTML = on
        ? '<div class="ca-spinner"></div> Menyimpan...'
        : '<i class="bi bi-person-plus"></i> Buat Akun';
    }

    function showAlert(msg) {
      var alert = document.getElementById('caAlert');
      var msgEl = document.getElementById('caAlertMsg');
      if (msgEl)  msgEl.textContent = msg;
      if (alert)  alert.classList.add('show');
    }

    function hideAlert() {
      var alert = document.getElementById('caAlert');
      if (alert) alert.classList.remove('show');
    }

    function showFieldError(inputId, errId, msg) {
      var input = document.getElementById(inputId);
      var err   = document.getElementById(errId);
      if (input) input.classList.add('is-error');
      if (err)   { err.textContent = msg; err.classList.add('show'); }
    }

    function clearFieldError(inputId, errId) {
      var input = document.getElementById(inputId);
      var err   = document.getElementById(errId);
      if (input) input.classList.remove('is-error');
      if (err)   { err.textContent = ''; err.classList.remove('show'); }
    }

    function clearAllCaErrors() {
      ['caUsername', 'caRole', 'caPassword', 'caPasswordConfirm'].forEach(function (id) {
        var errMap = {
          caUsername:        'caUsernameErr',
          caRole:            'caRoleErr',
          caPassword:        'caPasswordErr',
          caPasswordConfirm: 'caPasswordConfirmErr',
        };
        clearFieldError(id, errMap[id]);
      });
    }

  });

  function resetCaForm() {
    var roleInfo = document.getElementById('caRoleInfo');
    if (roleInfo) roleInfo.classList.remove('show');
    var alert = document.getElementById('caAlert');
    if (alert) alert.classList.remove('show');
    ['caUsername', 'caRole', 'caPassword', 'caPasswordConfirm'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('is-error');
    });
    ['caUsernameErr', 'caRoleErr', 'caPasswordErr', 'caPasswordConfirmErr'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.textContent = ''; el.classList.remove('show'); }
    });
    var btnSubmit = document.getElementById('btnCaSubmit');
    if (btnSubmit) {
      btnSubmit.disabled  = false;
      btnSubmit.innerHTML = '<i class="bi bi-person-plus"></i> Buat Akun';
    }
    var eyeIcon = document.getElementById('caEyeIcon');
    var pwEl    = document.getElementById('caPassword');
    if (eyeIcon) eyeIcon.className = 'bi bi-eye';
    if (pwEl)    pwEl.type = 'password';
  }

})();
