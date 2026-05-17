// =============================================
//  LIST PRODUCT — UI only
//  Search & filter ditangani Django (server-side)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  const filterForm     = document.getElementById('filterForm');
  const filterKategori = document.getElementById('filterKategori');
  const filterSupplier = document.getElementById('filterSupplier');
  const filterStok     = document.getElementById('filterStok');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const searchInput    = document.getElementById('searchInput');

  // ── Auto-submit saat dropdown berubah ──
  [filterKategori, filterSupplier, filterStok].forEach(function (el) {
    if (el) el.addEventListener('change', function () {
      filterForm.submit();
    });
  });

  // ── Tombol clear search ──
  if (btnClearSearch && searchInput) {
    btnClearSearch.addEventListener('click', function () {
      searchInput.value = '';
      filterForm.submit();
    });
  }

  // ── Submit saat tekan Enter ──
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterForm.submit();
      }
    });
  }

});
