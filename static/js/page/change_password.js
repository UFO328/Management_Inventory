// =============================================
//  CHANGE PASSWORD — First Login
//  UI only: validasi + strength indicator
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  var form        = document.getElementById('cpForm');
  var passwordEl  = document.getElementById('cpPassword');
  var confirmEl   = document.getElementById('cpConfirm');
  var btnSubmit   = document.getElementById('cpBtnSubmit');
  var alert       = document.getElementById('cpAlert');
  var alertMsg    = document.getElementById('cpAlertMsg');
  var strengthWrap  = document.getElementById('cpStrengthWrap');
  var strengthFill  = document.getElementById('cpStrengthFill');
  var strengthLabel = document.getElementById('cpStrengthLabel');

  // ── Toggle show/hide password ──
  setupToggle('cpToggle1', 'cpPassword', 'cpEye1');
  setupToggle('cpToggle2', 'cpConfirm',  'cpEye2');

  function setupToggle(btnId, inputId, iconId) {
    var btn   = document.getElementById(btnId);
    var input = document.getElementById(inputId);
    var icon  = document.getElementById(iconId);
    if (!btn || !input) return;
    btn.addEventListener('click', function () {
      var isPass   = input.type === 'password';
      input.type   = isPass ? 'text' : 'password';
      if (icon) icon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
    });
  }

  // ── Password strength & rules ──
  var rules = {
    ruleLength: function (v) { return v.length >= 8; },
    ruleUpper:  function (v) { return /[A-Z]/.test(v); },
    ruleNumber: function (v) { return /[0-9]/.test(v); },
  };

  passwordEl.addEventListener('input', function () {
    var val = this.value;

    // Update rules
    var passed = 0;
    Object.keys(rules).forEach(function (id) {
      var el  = document.getElementById(id);
      var ok  = rules[id](val);
      if (ok) { el.classList.add('valid'); passed++; }
      else    { el.classList.remove('valid'); }
    });

    // Strength bar
    if (val.length > 0) {
      strengthWrap.classList.add('show');
      var pct, color, label;
      if (passed === 1) {
        pct = 33; color = '#c0392b'; label = 'Lemah';
      } else if (passed === 2) {
        pct = 66; color = '#d4ac0d'; label = 'Sedang';
      } else {
        pct = 100; color = '#1e7e34'; label = 'Kuat';
      }
      strengthFill.style.width     = pct + '%';
      strengthFill.style.background = color;
      strengthLabel.textContent    = label;
      strengthLabel.style.color    = color;
    } else {
      strengthWrap.classList.remove('show');
    }

    // Clear error
    clearFieldError('cpPassword', 'cpPasswordErr');
    hideAlert();
  });

  confirmEl.addEventListener('input', function () {
    clearFieldError('cpConfirm', 'cpConfirmErr');
    hideAlert();
  });

  // ── Form submit ──
  form.addEventListener('submit', function (e) {
    hideAlert();
    clearFieldError('cpPassword', 'cpPasswordErr');
    clearFieldError('cpConfirm',  'cpConfirmErr');

    var password = passwordEl.value;
    var confirm  = confirmEl.value;
    var valid    = true;

    if (!password) {
      showFieldError('cpPassword', 'cpPasswordErr', 'Password tidak boleh kosong.');
      valid = false;
    } else if (password.length < 8) {
      showFieldError('cpPassword', 'cpPasswordErr', 'Password minimal 8 karakter.');
      valid = false;
    }

    if (!confirm) {
      showFieldError('cpConfirm', 'cpConfirmErr', 'Konfirmasi password tidak boleh kosong.');
      valid = false;
    } else if (password !== confirm) {
      showFieldError('cpConfirm', 'cpConfirmErr', 'Password tidak cocok.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      showAlert('Periksa kembali isian form di atas.');
      return;
    }

    // Valid — loading state, submit ke Django
    setLoading(true);
  });

  // ── Helpers ──
  function setLoading(on) {
    btnSubmit.disabled  = on;
    btnSubmit.innerHTML = on
      ? '<div class="cp-spinner"></div> Menyimpan...'
      : '<i class="bi bi-shield-check"></i> Simpan Password Baru';
  }

  function showAlert(msg) {
    alertMsg.textContent  = msg;
    alert.style.display   = 'flex';
  }

  function hideAlert() {
    alert.style.display = 'none';
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

});
