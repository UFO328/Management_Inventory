  // =============================================
// KARYAWAN LIST — UI only
// Filter handled by Django (server-side)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Auto-submit filter dropdown ──
  const filterDept = document.getElementById('filterDept');
  const filterJabatan = document.getElementById('filterJabatan');
  const filterForm = document.getElementById('filterForm');

  if (filterDept) {
    filterDept.addEventListener('change', function () {
      filterForm.submit();
    });
  }

  if (filterJabatan) {
    filterJabatan.addEventListener('change', function () {
      filterForm.submit();
    });
  }

  // ── Clear search input ──
  const btnClear = document.getElementById('btnClearSearch');
  const searchInput = document.getElementById('searchInput');

  if (btnClear && searchInput) {
    btnClear.addEventListener('click', function () {
      searchInput.value = '';
      filterForm.submit();
    });
  }

});