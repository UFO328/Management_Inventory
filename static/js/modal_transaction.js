// =============================================
//  MODAL TRANSAKSI
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  const overlay   = document.getElementById('modalTransaksiOverlay');
  const btnClose  = document.getElementById('btnCloseTransaksi');
  const btnCancel = document.getElementById('btnCancelTransaksi');
  const btnSubmit = document.getElementById('btnSubmitTransaksi');

  const form      = document.getElementById('formTransaksi');

  const alertBox  = document.getElementById('transaksiAlert');
  const alertMsg  = document.getElementById('transaksiAlertMsg');

  if (!overlay) return;

  // ══════════════════════════════
  // OPEN MODAL
  // ══════════════════════════════
  window.openTransaksiModal = function (dataset) {

    document.getElementById('transaksiNama').textContent =
      dataset.nama;

    document.getElementById('transaksiStok').textContent =
      dataset.stok;

    document.getElementById('transaksiProdukId').value =
      dataset.id;

    form.action = dataset.url;

    form.reset();

    document.getElementById('jenisMasuk').checked = true;

    clearErrors();
    hideAlert();
    resetButton();

    showModal();
  };

  // ══════════════════════════════
  // SHOW MODAL
  // ══════════════════════════════
  function showModal() {

    overlay.classList.add('show');

    document.body.style.overflow = 'hidden';

    document.getElementById('transaksiJumlah').focus();
  }

  // ══════════════════════════════
  // CLOSE MODAL
  // ══════════════════════════════
  function closeModal() {

    overlay.classList.remove('show');

    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closeModal);

  btnCancel.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {

    if (e.target === overlay) {
      closeModal();
    }

  });

  document.addEventListener('keydown', function (e) {

    if (
      e.key === 'Escape' &&
      overlay.classList.contains('show')
    ) {
      closeModal();
    }

  });

  // ══════════════════════════════
  // SUBMIT
  // ══════════════════════════════
  btnSubmit.addEventListener('click', function () {

    hideAlert();

    clearErrors();

    const jumlah = parseInt(
      document.getElementById('transaksiJumlah').value
    );

    const jenis = document.querySelector(
      'input[name="jenis"]:checked'
    )?.value;

    const stok = parseInt(
      document.getElementById('transaksiStok').textContent
    );

    if (!validate(jumlah, jenis, stok)) {
      return;
    }

    setLoading(true);

    form.submit();

  });

  // ══════════════════════════════
  // VALIDASI
  // ══════════════════════════════
  function validate(jumlah, jenis, stok) {

    let valid = true;

    if (!jumlah || jumlah <= 0) {

      showFieldError(
        'transaksiJumlah',
        'jumlahErr',
        'Jumlah harus lebih dari 0.'
      );

      valid = false;
    }

    // STOCK OUT VALIDATION
    if (
      valid &&
      jenis === 'OUT' &&
      jumlah > stok
    ) {

      showAlert(
        `Stok tidak mencukupi. Stok tersedia: ${stok}`
      );

      valid = false;
    }

    return valid;
  }

  // ══════════════════════════════
  // HELPERS
  // ══════════════════════════════
  function setLoading(on) {

    btnSubmit.disabled = on;

    btnSubmit.innerHTML = on
      ? '<div class="spinner"></div> Menyimpan...'
      : '<i class="bi bi-check2-circle"></i> Simpan Transaksi';
  }

  function resetButton() {

    btnSubmit.disabled = false;

    btnSubmit.innerHTML =
      '<i class="bi bi-check2-circle"></i> Simpan Transaksi';
  }

  function showAlert(msg) {

    alertMsg.textContent = msg;

    alertBox.classList.add('show');
  }

  function hideAlert() {

    alertBox.classList.remove('show');
  }

  function showFieldError(inputId, errId, msg) {

    const input = document.getElementById(inputId);

    const err = document.getElementById(errId);

    if (input) {
      input.classList.add('is-error');
    }

    if (err) {

      err.textContent = msg;

      err.classList.add('show');
    }

    if (input) {

      input.addEventListener('input', function () {

        input.classList.remove('is-error');

        if (err) {

          err.textContent = '';

          err.classList.remove('show');
        }

        hideAlert();

      }, { once: true });

    }

  }

  function clearErrors() {

    document.querySelectorAll('.modal-field-error')
      .forEach(function (el) {

        el.textContent = '';

        el.classList.remove('show');

      });

    document.querySelectorAll('.modal-input')
      .forEach(function (el) {

        el.classList.remove('is-error');

      });

  }

});