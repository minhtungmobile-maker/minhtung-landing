document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // 1. COOKIE BANNER
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => cookieBanner.classList.add('show'), 2000);
    }
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // 2. MOBILE MENU
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }

    // 3. STICKY HEADER
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)';
        header.style.padding = window.scrollY > 50 ? '10px 0' : '15px 0';
    }, { passive: true });

    // 4. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu?.classList.remove('active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 5. FORM HANDLING (FormSubmit.co AJAX)
    const leadForm = document.getElementById('leadForm');
    const formStatus = document.getElementById('formStatus');
    
    if (leadForm) {        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Anti-spam: Honeypot check
            const honeypot = this.querySelector('._honey, .honeypot');
            if (honeypot && honeypot.value) {
                console.log('Spam detected');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'ĐANG GỬI...';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✅ Cảm ơn! Chúng tôi sẽ liên hệ số ' + document.getElementById('phone').value + ' trong 15 phút.';
                    formStatus.style.display = 'block';
                    leadForm.reset();
                    
                    // Track conversion (uncomment if using GTM)
                    // dataLayer.push({ 'event': 'lead_submit', 'service': document.getElementById('service').value });
                    
                } else {
                    throw new Error('Network error');
                }
            } catch (error) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '❌ Lỗi kết nối. Vui lòng gọi Zalo 0907.327.457 để được hỗ trợ ngay.';
                formStatus.style.display = 'block';
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 6. DYNAMIC YEAR
    const yearEl = document.getElementById('year');    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 7. LAZY LOAD FALLBACK (for older browsers)
    if ('loading' in HTMLImageElement.prototype === false) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

    // 8. PREVENT RIGHT-CLICK ON IMAGES (Optional - uncomment if needed)
    // document.querySelectorAll('.hero-image img, .why-image img').forEach(img => {
    //     img.addEventListener('contextmenu', e => e.preventDefault());
    // });
});
Đã gửi
Viết cho
