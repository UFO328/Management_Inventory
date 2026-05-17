// =============================================
//  ALERT COMPONENT — ERP System
// =============================================

// ── Tutup alert manual (dipanggil dari tombol X) ──
function closeAlert(btn) {
  const alert = btn.closest('.alert-item');
  dismissAlert(alert);
}

// ── Animasi hilang lalu hapus dari DOM ──
function dismissAlert(alertEl) {
  if (!alertEl) return;
  alertEl.classList.add('fade-out');
  alertEl.addEventListener('animationend', function () {
    alertEl.remove();
    removeContainerIfEmpty();
  }, { once: true });
}

// ── Hapus container kalau sudah tidak ada alert ──
function removeContainerIfEmpty() {
  const container = document.getElementById('alertContainer');
  if (container && container.children.length === 0) {
    container.remove();
  }
}

// ── Auto-close alert setelah beberapa detik ──
function autoCloseAlerts(delayMs = 4000) {
  const alerts = document.querySelectorAll('.alert-item');
  alerts.forEach(function (alert) {
    alert.classList.add('auto-close');
    setTimeout(function () {
      dismissAlert(alert);
    }, delayMs);
  });
}

// ── Buat alert secara dinamis dari JS ──
// Contoh: createAlert('Data berhasil disimpan.', 'success')
function createAlert(message, type = 'info') {
  const icons = {
    success: 'bi-check-circle-fill',
    error:   'bi-exclamation-circle-fill',
    danger:  'bi-exclamation-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
  };

  // Buat atau ambil container
  let container = document.getElementById('alertContainer');
  if (!container) {
    container = document.createElement('div');
    container.className = 'alert-container';
    container.id = 'alertContainer';

    // Taruh di atas konten utama
    const contentArea = document.querySelector('.content-area') || document.body;
    contentArea.prepend(container);
  }

  const icon = icons[type] || icons.info;

  const alertEl = document.createElement('div');
  alertEl.className = `alert-item alert-${type} auto-close`;
  alertEl.setAttribute('role', 'alert');
  alertEl.innerHTML = `
    <div class="alert-icon"><i class="bi ${icon}"></i></div>
    <span class="alert-msg">${message}</span>
    <button class="alert-close" onclick="closeAlert(this)" aria-label="Tutup">
      <i class="bi bi-x"></i>
    </button>
  `;

  container.appendChild(alertEl);

  // Auto-close setelah 4 detik
  setTimeout(function () {
    dismissAlert(alertEl);
  }, 4000);
}

// ── Jalankan auto-close saat halaman load ──
document.addEventListener('DOMContentLoaded', function () {
  autoCloseAlerts(4000);
});
