// =============================================
//  NAVBAR — ERP System
//  Sidebar toggle + user dropdown
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  var sidebar  = document.getElementById('sidebar');
  var hamburger = document.getElementById('hamburger');
  var overlay  = document.getElementById('sidebarOverlay');
  var userDropdown = document.getElementById('userDropdown');
  var userBtn  = document.getElementById('userBtn');

  // ── Pastikan body tidak terkunci saat halaman load ──
  document.body.style.overflow = '';

  // ── Sidebar toggle (mobile) ──
  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';  // ← selalu reset
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Tutup sidebar saat resize ke desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeSidebar();
  });

  // Tutup sidebar saat navigasi (back button)
  window.addEventListener('pageshow', function () {
    closeSidebar();
  });

  // ── User dropdown ──
  if (userBtn) {
    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (userDropdown) userDropdown.classList.toggle('open');
    });
  }

  document.addEventListener('click', function () {
    if (userDropdown) userDropdown.classList.remove('open');
  });

});
