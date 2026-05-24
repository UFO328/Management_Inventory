// =============================================
// MODAL REGISTER ACCOUNT
// File: modal_register.js
// =============================================

(function () {

    console.log('Modal Register Loaded');

    // =============================================
    // ELEMENTS
    // =============================================

    const overlay      = document.getElementById('modalCreateAccount');
    const form         = document.getElementById('formCreateAccount');

    const btnClose     = document.getElementById('btnCaClose');
    const btnCancel    = document.getElementById('btnCaCancel');
    const btnSubmit    = document.getElementById('btnCaSubmit');

    const roleSelect   = document.getElementById('caRole');
    const roleInfo     = document.getElementById('caRoleInfo');
    const roleInfoText = document.getElementById('caRoleInfoText');

    // =============================================
    // VALIDATION CHECK
    // =============================================

    if (!overlay || !form) {
        console.error('Modal register tidak ditemukan');
        return;
    }

    // =============================================
    // ROLE DESCRIPTION
    // =============================================

    const roleDesc = {
        hrd: 'Dapat mengelola data karyawan dan akun.',
        kepala_gudang: 'Dapat mengelola stok gudang.',
        staff_gudang: 'Dapat input dan melihat stok.'
    };

    // =============================================
    // OPEN MODAL
    // =============================================

    window.bukaModalCreateAccount = function (dataset) {

        console.log('OPEN MODAL');
        console.log(dataset);

        resetForm();

        // set form action
        if (dataset.url) {
            form.action = dataset.url;
        }

        overlay.classList.add('show');

        document.body.style.overflow = 'hidden';

        const usernameEl = document.getElementById('caUsername');

        if (usernameEl) {
            usernameEl.focus();
        }
    };

    // =============================================
    // CLOSE MODAL
    // =============================================

    function closeModal() {

        overlay.classList.remove('show');

        document.body.style.overflow = '';
    }

    // =============================================
    // CLOSE EVENTS
    // =============================================

    if (btnClose) {
        btnClose.addEventListener('click', closeModal);
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', closeModal);
    }

    // click outside
    overlay.addEventListener('click', function (e) {

        if (e.target === overlay) {
            closeModal();
        }
    });

    // esc close
    document.addEventListener('keydown', function (e) {

        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // =============================================
    // ROLE INFO
    // =============================================

    if (roleSelect) {

        roleSelect.addEventListener('change', function () {

            const value = this.value;

            if (value && roleDesc[value]) {

                roleInfo.classList.add('show');

                roleInfoText.textContent = roleDesc[value];

            } else {

                roleInfo.classList.remove('show');
            }
        });
    }

    // =============================================
    // SUBMIT
    // =============================================

    if (btnSubmit) {

        btnSubmit.addEventListener('click', function () {

            clearErrors();

            const usernameEl = document.getElementById('caUsername');
            const roleEl     = document.getElementById('caRole');
            const emailEl    = document.getElementById('email');

            const username = usernameEl
                ? usernameEl.value.trim()
                : '';

            const role = roleEl
                ? roleEl.value
                : '';

            const email = emailEl
                ? emailEl.value.trim()
                : '';

            let valid = true;

            // username
            if (!username) {

                showError(
                    'caUsernameErr',
                    'Username wajib diisi'
                );

                valid = false;

            } else if (!/^[a-z0-9_]+$/.test(username)) {

                showError(
                    'caUsernameErr',
                    'Gunakan huruf kecil, angka, dan underscore'
                );

                valid = false;
            }

            // role
            if (!role) {

                showError(
                    'caRoleErr',
                    'Role wajib dipilih'
                );

                valid = false;
            }

            // email
            if (!email) {

                showError(
                    'caEmailErr',
                    'Email wajib diisi'
                );

                valid = false;
            }

            // invalid email
            else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                showError(
                    'caEmailErr',
                    'Format email tidak valid'
                );

                valid = false;
            }

            if (!valid) {
                return;
            }

            // loading state
            btnSubmit.disabled = true;

            btnSubmit.innerHTML =
                '<div class="ca-spinner"></div> Menyimpan...';

            form.submit();
        });
    }

    // =============================================
    // RESET FORM
    // =============================================

    function resetForm() {

        form.reset();

        clearErrors();

        if (roleInfo) {
            roleInfo.classList.remove('show');
        }

        btnSubmit.disabled = false;

        btnSubmit.innerHTML =
            '<i class="bi bi-person-plus"></i> Buat Akun';
    }

    // =============================================
    // ERROR HELPERS
    // =============================================

    function showError(id, message) {

        const el = document.getElementById(id);

        if (!el) return;

        el.textContent = message;

        el.classList.add('show');
    }

    function clearErrors() {

        const errors = [
            'caUsernameErr',
            'caRoleErr',
            'caEmailErr'
        ];

        errors.forEach(function (id) {

            const el = document.getElementById(id);

            if (!el) return;

            el.textContent = '';

            el.classList.remove('show');
        });
    }

})();