// =============================================
//  MODAL — Edit, Delete & Transaksi
//  Component JS (digabung dalam 1 file)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ══════════════════════════════
  //  MODAL EDIT
  // ══════════════════════════════
  const editOverlay   = document.getElementById('modalEditOverlay');
  const btnClose      = document.getElementById('btnCloseModalEdit');
  const btnCancelEdit = document.getElementById('btnCancelEdit');
  const btnSave       = document.getElementById('btnSaveEdit');
  const editForm      = document.getElementById('formEditKaryawan');
  const alertError    = document.getElementById('modalAlertError');
  const alertMsg      = document.getElementById('modalAlertMsg');

  if (editOverlay) {

    // ── Buka modal edit ──
    window.openEditModal = function (dataset) {
      document.getElementById('editNama').value   = dataset.nama   || '';
      document.getElementById('editNik').value    = dataset.nik    || '';
      document.getElementById('editEmail').value  = dataset.email  || '';
      document.getElementById('editNoTelp').value = dataset.telp   || '';
      document.getElementById('editAlamat').value = dataset.alamat || '';

      setSelectValue('editDepartemen', dataset.departemen);
      setSelectValue('editJabatan',    dataset.jabatan);

      editForm.action = dataset.url;

      clearAllErrors();
      resetSaveBtn();
      showModal(editOverlay);
    };

    // ── Tutup modal edit ──
    btnClose.addEventListener('click',      function () { closeModal(editOverlay); });
    btnCancelEdit.addEventListener('click', function () { closeModal(editOverlay); });

    editOverlay.addEventListener('click', function (e) {
      if (e.target === editOverlay) closeModal(editOverlay);
    });

    // ── Submit edit ──
    btnSave.addEventListener('click', function () {
      hideAlert();
      clearAllErrors();

      const data = {
        nama:       document.getElementById('editNama').value.trim(),
        nik:        document.getElementById('editNik').value.trim(),
        email:      document.getElementById('editEmail').value.trim(),
        no_telepon: document.getElementById('editNoTelp').value.trim(),
        departemen: document.getElementById('editDepartemen').value,
        jabatan:    document.getElementById('editJabatan').value,
      };

      if (!validateEdit(data)) return;

      setSaveLoading(true);
      editForm.submit();
    });

    // ── Validasi edit ──
    function validateEdit(data) {
      let valid = true;

      if (!data.nama) {
        showFieldError('editNama', 'editNamaErr', 'Nama tidak boleh kosong.');
        valid = false;
      }

      if (!data.nik) {
        showFieldError('editNik', 'editNikErr', 'NIK tidak boleh kosong.');
        valid = false;
      } else if (!/^\d{16}$/.test(data.nik)) {
        showFieldError('editNik', 'editNikErr', 'NIK harus 16 digit angka.');
        valid = false;
      }

      if (!data.email) {
        showFieldError('editEmail', 'editEmailErr', 'Email tidak boleh kosong.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showFieldError('editEmail', 'editEmailErr', 'Format email tidak valid.');
        valid = false;
      }

      if (!data.no_telepon) {
        showFieldError('editNoTelp', 'editTelpErr', 'No. telepon tidak boleh kosong.');
        valid = false;
      }

      if (!data.departemen) {
        showFieldError('editDepartemen', 'editDeptErr', 'Pilih departemen.');
        valid = false;
      }

      if (!data.jabatan) {
        showFieldError('editJabatan', 'editJabatanErr', 'Pilih jabatan.');
        valid = false;
      }

      if (!valid) showAlert('Periksa kembali isian form di bawah ini.');
      return valid;
    }

    // ── Helpers edit ──
    function setSaveLoading(on) {
      btnSave.disabled  = on;
      btnSave.innerHTML = on
        ? '<div class="spinner"></div> Menyimpan...'
        : '<i class="bi bi-floppy"></i> Simpan Perubahan';
    }

    function resetSaveBtn() {
      btnSave.disabled  = false;
      btnSave.classList.remove('success');
      btnSave.innerHTML = '<i class="bi bi-floppy"></i> Simpan Perubahan';
    }

    function showAlert(msg) {
      alertMsg.textContent = msg;
      alertError.classList.add('show');
    }

    function hideAlert() {
      alertError.classList.remove('show');
    }

    function showFieldError(inputId, errId, msg) {
      const input = document.getElementById(inputId);
      const err   = document.getElementById(errId);
      if (input) input.classList.add('is-error');
      if (err)   { err.textContent = msg; err.classList.add('show'); }

      if (input) {
        input.addEventListener('input', function () {
          input.classList.remove('is-error');
          if (err) { err.textContent = ''; err.classList.remove('show'); }
          hideAlert();
        }, { once: true });
      }
    }

    function clearAllErrors() {
      document.querySelectorAll('.modal-field-error').forEach(function (el) {
        el.textContent = '';
        el.classList.remove('show');
      });
      document.querySelectorAll('.modal-input').forEach(function (el) {
        el.classList.remove('is-error');
      });
    }

  } // end editOverlay guard

  // ══════════════════════════════
  //  MODAL DELETE
  // ══════════════════════════════
  const deleteOverlay   = document.getElementById('modalDeleteOverlay');
  const btnCancelDelete = document.getElementById('btnCancelDelete');
  const btnConfirm      = document.getElementById('btnConfirmDelete');
  const deleteForm      = document.getElementById('formDelete');
  const deleteNama      = document.getElementById('deleteNama');

  if (deleteOverlay) {

    // ── Buka modal delete ──
    window.openDeleteModal = function (dataset) {
      deleteNama.textContent = dataset.nama;
      deleteForm.action      = dataset.url;

      resetDeleteBtn();
      showModal(deleteOverlay);
    };

    // ── Tutup modal delete ──
    btnCancelDelete.addEventListener('click', function () { closeModal(deleteOverlay); });

    deleteOverlay.addEventListener('click', function (e) {
      if (e.target === deleteOverlay) closeModal(deleteOverlay);
    });

    // ── Submit delete ──
    btnConfirm.addEventListener('click', function () {
      setDeleteLoading(true);
      deleteForm.submit();
    });

    // ── Helpers delete ──
    function setDeleteLoading(on) {
      btnConfirm.disabled  = on;
      btnConfirm.innerHTML = on
        ? '<div class="delete-spinner"></div> Menghapus...'
        : '<i class="bi bi-trash3"></i> Ya, Hapus';
    }

    function resetDeleteBtn() {
      btnConfirm.disabled  = false;
      btnConfirm.innerHTML = '<i class="bi bi-trash3"></i> Ya, Hapus';
    }

  } // end deleteOverlay guard

  // ══════════════════════════════
  //  MODAL TRANSAKSI
  // ══════════════════════════════
  const transaksiOverlay  = document.getElementById('modalTransaksiOverlay');
  const btnCloseTransaksi = document.getElementById('btnCloseTransaksi');
  const btnCancelTransaksi = document.getElementById('btnCancelTransaksi');
  const btnSubmitTransaksi = document.getElementById('btnSubmitTransaksi');
  const transaksiForm     = document.getElementById('formTransaksi');
  const transaksiAlert    = document.getElementById('transaksiAlert');
  const transaksiAlertMsg = document.getElementById('transaksiAlertMsg');

  if (transaksiOverlay) {

    // ── Buka modal transaksi ──
    // Pakai: onclick="openTransaksiModal(this.dataset)"
    window.openTransaksiModal = function (dataset) {
      document.getElementById('transaksiNama').textContent = dataset.nama;
      document.getElementById('transaksiStok').textContent = dataset.stok;
      document.getElementById('transaksiProdukId').value   = dataset.id;

      transaksiForm.action = dataset.url;

      // Reset form
      transaksiForm.reset();
      document.getElementById('jenisMasuk').checked = true;

      clearTransaksiErrors();
      hideTransaksiAlert();
      resetTransaksiBtn();
      showModal(transaksiOverlay);

      document.getElementById('transaksiJumlah').focus();
    };

    // ── Tutup modal transaksi ──
    btnCloseTransaksi.addEventListener('click',   function () { closeModal(transaksiOverlay); });
    btnCancelTransaksi.addEventListener('click',  function () { closeModal(transaksiOverlay); });

    transaksiOverlay.addEventListener('click', function (e) {
      if (e.target === transaksiOverlay) closeModal(transaksiOverlay);
    });

    // ── Submit transaksi ──
    btnSubmitTransaksi.addEventListener('click', function () {
      hideTransaksiAlert();
      clearTransaksiErrors();

      const jumlah = document.getElementById('transaksiJumlah').value;
      const jenis  = document.querySelector('input[name="jenis"]:checked')?.value;
      const stok   = parseInt(document.getElementById('transaksiStok').textContent) || 0;

      if (!validateTransaksi(jumlah, jenis, stok)) return;

      setTransaksiLoading(true);
      transaksiForm.submit();
    });

    // ── Validasi transaksi ──
    function validateTransaksi(jumlah, jenis, stok) {
      let valid = true;

      if (!jumlah || parseInt(jumlah) <= 0) {
        showTransaksiFieldError('transaksiJumlah', 'jumlahErr', 'Jumlah harus lebih dari 0.');
        valid = false;
      }

      // Cek stok cukup kalau keluar
      if (valid && jenis === 'keluar' && parseInt(jumlah) > stok) {
        showTransaksiAlert(`Stok tidak mencukupi. Stok saat ini: ${stok}`);
        valid = false;
      }

      return valid;
    }

    // ── Helpers transaksi ──
    function setTransaksiLoading(on) {
      btnSubmitTransaksi.disabled  = on;
      btnSubmitTransaksi.innerHTML = on
        ? '<div class="spinner"></div> Menyimpan...'
        : '<i class="bi bi-check2-circle"></i> Simpan Transaksi';
    }

    function resetTransaksiBtn() {
      btnSubmitTransaksi.disabled  = false;
      btnSubmitTransaksi.innerHTML = '<i class="bi bi-check2-circle"></i> Simpan Transaksi';
    }

    function showTransaksiAlert(msg) {
      transaksiAlertMsg.textContent = msg;
      transaksiAlert.classList.add('show');
    }

    function hideTransaksiAlert() {
      transaksiAlert.classList.remove('show');
    }

    function showTransaksiFieldError(inputId, errId, msg) {
      const input = document.getElementById(inputId);
      const err   = document.getElementById(errId);
      if (input) input.classList.add('is-error');
      if (err)   { err.textContent = msg; err.classList.add('show'); }

      if (input) {
        input.addEventListener('input', function () {
          input.classList.remove('is-error');
          if (err) { err.textContent = ''; err.classList.remove('show'); }
          hideTransaksiAlert();
        }, { once: true });
      }
    }

    function clearTransaksiErrors() {
      const errIds   = ['jumlahErr'];
      const inputIds = ['transaksiJumlah'];

      errIds.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) { el.textContent = ''; el.classList.remove('show'); }
      });

      inputIds.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('is-error');
      });
    }

  } // end transaksiOverlay guard

  // ══════════════════════════════
  //  SHARED HELPERS
  // ══════════════════════════════
  function showModal(overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function setSelectValue(selectId, value) {
    const el = document.getElementById(selectId);
    if (el && value) el.value = value;
  }

  // ── Escape key — tutup semua modal yang aktif ──
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    [editOverlay, deleteOverlay, transaksiOverlay].forEach(function (overlay) {
      if (overlay && overlay.classList.contains('show')) closeModal(overlay);
    });
  });

});
