// =============================================
//  LOGIN PAGE — ERP System
//  UI only: toggle password + inline validation
//  Auth ditangani Django (form POST biasa)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  const form        = document.getElementById('loginForm');
  const usernameEl  = document.getElementById('username');
  const passwordEl  = document.getElementById('password');
  const togglePwBtn = document.getElementById('togglePw');
  const eyeIcon     = document.getElementById('eyeIcon');
  const btnLogin    = document.getElementById('btnLogin');
  const usernameErr = document.getElementById('usernameErr');
  const passwordErr = document.getElementById('passwordErr');

  // ── Toggle show/hide password ──
  togglePwBtn.addEventListener('click', function () {
    const isPassword  = passwordEl.type === 'password';
    passwordEl.type   = isPassword ? 'text' : 'password';
    eyeIcon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
  });

  // ── Clear error saat user mengetik ──
  usernameEl.addEventListener('input', function () {
    clearFieldError(usernameEl, usernameErr);
  });

  passwordEl.addEventListener('input', function () {
    clearFieldError(passwordEl, passwordErr);
  });

  // ── Validasi sebelum form dikirim ke Django ──
  form.addEventListener('submit', function (e) {
    clearAllErrors();

    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    let valid = true;

    if (!username) {
      showFieldError(usernameEl, usernameErr, 'Username tidak boleh kosong.');
      valid = false;
    }

    if (!password) {
      showFieldError(passwordEl, passwordErr, 'Password tidak boleh kosong.');
      valid = false;
    }

    // Jika tidak valid, tahan submit — Django tidak dipanggil
    if (!valid) {
      e.preventDefault();
      return;
    }

    // Jika valid: loading state, lalu biarkan form submit ke Django
    btnLogin.disabled  = true;
    btnLogin.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
  });

  // ══════════════════════
  //  HELPERS
  // ══════════════════════
  function showFieldError(input, errEl, msg) {
    input.classList.add('is-error');
    errEl.textContent = msg;
    errEl.classList.add('show');
  }

  function clearFieldError(input, errEl) {
    input.classList.remove('is-error');
    errEl.textContent = '';
    errEl.classList.remove('show');
  }

  function clearAllErrors() {
    clearFieldError(usernameEl, usernameErr);
    clearFieldError(passwordEl, passwordErr);
  }

});
