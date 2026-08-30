document.addEventListener('DOMContentLoaded', () => {
    // 1. Service Worker Registration (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('SW registered');
            }).catch(registrationError => {
                console.log('SW registration failed');
            });
        });
    }

    // 2. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Scroll-to-Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.title = 'Yukarı Çık / Go Top';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Cookie Consent Banner
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <p>Deneyiminizi geliştirmek için çerezleri (cookies) kullanıyoruz. / We use cookies to improve your experience.</p>
            <button id="acceptCookies">Kabul Et / Accept</button>
        `;
        document.body.appendChild(banner);

        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.classList.add('hide');
        });
    }

    // 6. Lightbox for Gallery
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal && galleryImages.length > 0) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxModal.classList.add('active');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }

    // 7. Custom Search System
    const searchInputs = document.querySelectorAll('#site-search');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase();
                if (query.includes('müzik') || query.includes('music') || query.includes('spotify')) {
                    window.location.href = 'music.html';
                } else if (query.includes('iletişim') || query.includes('contact')) {
                    window.location.href = 'iletisim.html';
                } else if (query.includes('hakkında') || query.includes('about') || query.includes('biyografi')) {
                    window.location.href = 'about.html';
                } else if (query.includes('galeri') || query.includes('gallery') || query.includes('foto')) {
                    window.location.href = 'galeri.html';
                } else if (query.includes('blog')) {
                    window.location.href = 'blog.html';
                } else {
                    alert('Sonuç bulunamadı. Lütfen Müzik, Galeri, İletişim gibi kelimeler deneyin.');
                }
            }
        });
    });

    // 8. Page Transitions
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Slight delay to ensure paint
    setTimeout(() => {
        overlay.classList.add('loaded');
    }, 50);

    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="javascript"])');
    links.forEach(link => {
        link.addEventListener('click', e => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const targetUrl = link.href;
                overlay.classList.remove('loaded');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // Wait for transition
            }
        });
    });

    // 9. Developer Easter Egg
    console.log("%c ESHAN SAYHAN ", "font-size: 40px; font-weight: bold; color: #20D5EC; text-shadow: 2px 2px 0 #000, 4px 4px 0 #ff0055;");
    console.log("%c Welcome to the source code. Are you a developer? Let's talk: hi@eshansayhan.com", "font-size: 16px; color: #fff;");
});
