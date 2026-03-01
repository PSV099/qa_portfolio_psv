document.addEventListener('DOMContentLoaded', function() {
    console.log('QA Portfolio loaded');
    
    // ===== Dark Mode Toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkMode = localStorage.getItem('darkMode') !== 'false' ? true : false;
    
    // Set initial dark mode state from localStorage (default to dark mode)
    if (isDarkMode !== false) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
    
    // Toggle dark mode on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const nowDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', nowDark);
        });
    }
    
    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Certificate Carousel Auto-Rotation with Navigation =====
    const certificatesSection = document.querySelector('#certificates');
    if (certificatesSection) {
        const slides = certificatesSection.querySelectorAll('.certificate-slide');
        const prevBtn = certificatesSection.querySelector('.carousel-nav--prev');
        const nextBtn = certificatesSection.querySelector('.carousel-nav--next');
        let currentIndex = 0;
        let autoRotateInterval;
        
        function updateSlides() {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev');
                if (i === currentIndex) {
                    slide.classList.add('active');
                } else if (i < currentIndex) {
                    slide.classList.add('prev');
                }
            });
        }
        
        function nextCertificate() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        }
        
        function prevCertificate() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        }
        
        function startAutoRotate() {
            autoRotateInterval = setInterval(nextCertificate, 4000);
        }
        
        function resetAutoRotate() {
            clearInterval(autoRotateInterval);
            startAutoRotate();
        }
        
        // Event listeners for navigation arrows
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevCertificate();
                resetAutoRotate();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextCertificate();
                resetAutoRotate();
            });
        }
        
        // Initialize
        if (slides.length > 0) {
            updateSlides();
            startAutoRotate();
        }
    }
    
    // ===== Scroll Spy for Active Navigation =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call on page load
    
    // ===== Scroll behavior for header shadow =====
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 5) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===== Navigation & Section Hover =====
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        section.addEventListener('mouseover', function() {
            this.style.opacity = '1';
        });
        section.addEventListener('mouseout', function() {
            this.style.opacity = '';
        });
    });

    // ===== Hero Reveal Animation =====
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('hero-animate');
        setTimeout(() => hero.classList.add('revealed'), 80);

        // Gentle hover lift for image
        const img = hero.querySelector('.hero-image img');
        if (img) {
            hero.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const dx = (e.clientX - (rect.left + rect.width/2)) / 40;
                const dy = (e.clientY - (rect.top + rect.height/2)) / 60;
                img.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
            });
            hero.addEventListener('mouseleave', () => img.style.transform = 'translate3d(0,0,0)');
        }
    }

    // ===== Intersection Observer for Scroll Reveal =====
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .proficiency-item, .technique-card');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Handle child items with stagger
                    const childItems = entry.target.querySelectorAll('.reveal-on-scroll--item');
                    if (childItems.length) {
                        childItems.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.classList.add('revealed');
                            }, itemIndex * 100);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.querySelector('.nav-toggle');
    const siteHeader = document.querySelector('.site-header');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && siteHeader && mainNav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            siteHeader.classList.toggle('nav-open');
        });

        // Close nav when a navigation link is clicked
        mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            siteHeader.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                siteHeader.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close nav when clicking backdrop (outside menu)
        document.addEventListener('click', (e) => {
            const isClickInsideNav = mainNav.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);
            if (!isClickInsideNav && !isClickOnToggle && siteHeader.classList.contains('nav-open')) {
                siteHeader.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
