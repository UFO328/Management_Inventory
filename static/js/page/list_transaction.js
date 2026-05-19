// =============================================
//  LIST TRANSAKSI — UI only
//  Search & filter server-side
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  var filterForm   = document.getElementById('filterForm');
  var filterJenis  = document.getElementById('filterJenis');
  var btnClear     = document.getElementById('btnClearSearch');
  var searchInput  = document.getElementById('searchInput');

  // Auto-submit saat dropdown berubah
  if (filterJenis) {
    filterJenis.addEventListener('change', function () {
      filterForm.submit();
    });
  }

  // Tombol clear search
  if (btnClear && searchInput) {
    btnClear.addEventListener('click', function () {
      searchInput.value = '';
      filterForm.submit();
    });
  }

  // Submit saat tekan Enter
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterForm.submit();
      }
    });
  }

});
