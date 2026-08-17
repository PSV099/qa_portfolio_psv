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

    // ===== Recruiter-Focused QA Mindset =====
    const qaMindset = document.querySelector('.qa-mindset');
    const mindsetPhrase = qaMindset?.querySelector('.qa-mindset__phrase');
    const mindsetPhrases = [
        'Quality Ownership',
        'Attention to Detail',
        'Critical Thinking',
        'Clear Communication',
        'User-Focused Testing',
        'Problem Solving'
    ];
    if (qaMindset && mindsetPhrase && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;
        function rotateMindset() {
            const current = mindsetPhrases[phraseIndex];
            mindsetPhrase.textContent = current.slice(0, characterIndex);
            if (!deleting && characterIndex < current.length) {
                characterIndex += 1;
                setTimeout(rotateMindset, 42);
            } else if (!deleting) {
                qaMindset.setAttribute('aria-label', `QA Mindset: ${current}`);
                deleting = true;
                setTimeout(rotateMindset, 2100);
            } else if (characterIndex > 0) {
                characterIndex -= 1;
                setTimeout(rotateMindset, 24);
            } else {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % mindsetPhrases.length;
                setTimeout(rotateMindset, 250);
            }
        }
        mindsetPhrase.textContent = '';
        rotateMindset();
    }

    // Editable portfolio presentation data.
    const skillProficiencies = {
        'AI Testing': 100,
        'Manual Testing': 100,
        'Automation Testing': 80,
        'API Testing': 80,
        'Mobile Testing': 75,
        'Database / SQL': 65,
        'CI/CD': 70
    };
    const projectMetrics = {
        campus: ['95% Regression Coverage', '150+ Test Scenarios'],
        one: ['120+ Test Cases', '30% Faster Regression'],
        internal: ['20+ AI Workflows Tested', 'Chatbot + CMS Validation']
    };

    document.querySelectorAll('[data-project-metrics]').forEach(container => {
        const metrics = projectMetrics[container.dataset.projectMetrics] || [];
        container.replaceChildren(...metrics.map(metric => {
            const badge = document.createElement('span');
            badge.className = 'project-metric';
            badge.textContent = metric;
            return badge;
        }));
    });

    const skillsSection = document.querySelector('#skills');
    const skillItems = skillsSection ? skillsSection.querySelectorAll('.proficiency-item') : [];
    skillItems.forEach(item => {
        const fill = item.querySelector('[data-proficiency]');
        const value = item.querySelector('.proficiency-value');
        const target = skillProficiencies[fill.dataset.proficiency];
        fill.style.setProperty('--proficiency', `${target}%`);
        value.dataset.target = target;
    });

    function animateSkillValue(element, target) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) { element.textContent = `${target}%`; return; }
        const duration = 1000;
        const started = performance.now();
        function update(now) {
            const progress = Math.min((now - started) / duration, 1);
            element.textContent = `${Math.round(progress * target)}%`;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    if (skillsSection && skillItems.length) {
        const skillsObserver = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('is-animated');
                    animateSkillValue(item.querySelector('.proficiency-value'), Number(item.querySelector('.proficiency-value').dataset.target));
                }, reduceMotion ? 0 : index * 100);
            });
            skillsObserver.unobserve(skillsSection);
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // ===== Interactive QA Testing Distribution =====
    const testingDistribution = document.querySelector('[data-testing-distribution]');
    if (testingDistribution) {
        const testingAreas = [
            { category: 'Manual Testing', chartValue: 1, metric: '500+ Test Cases', points: ['Functional Testing', 'Regression Testing', 'End-to-End Testing'], color: '#2563eb' },
            { category: 'Automation Testing', chartValue: 1, metric: '40% Regression Improvement', points: ['Playwright + JavaScript', 'Selenium Automation', 'POM-Based Automation'], color: '#4f46e5' },
            { category: 'Mobile App Testing', chartValue: 1, metric: '6 Mobile Releases', points: ['Android & iOS Testing', 'Emulator Testing', 'ADB Validation'], color: '#0f766e' },
            { category: 'API Testing', chartValue: 1, metric: '120+ APIs Validated', points: ['Postman API Testing', 'REST Assured', 'Response Validation'], color: '#475569' },
            { category: 'AI Testing', chartValue: 1, metric: '20+ AI Workflows Tested', points: ['Chatbot Testing', 'CMS Tool Testing', 'AI Workflow Validation'], color: '#7c3aed' },
            { category: 'Database / SQL Testing', chartValue: 1, metric: '200+ Data Validations', points: ['SQL Data Validation', 'Backend Testing', 'API-DB Verification'], color: '#0369a1' }
        ];
        const svg = testingDistribution.querySelector('.donut-svg');
        const legend = testingDistribution.querySelector('.testing-legend');
        const tooltip = testingDistribution.querySelector('.donut-tooltip');
        const centerTitle = testingDistribution.querySelector('.donut-center__title');
        const centerMetric = testingDistribution.querySelector('.donut-center__metric');
        const insight = testingDistribution.querySelector('.testing-insight');
        const insightTitle = insight.querySelector('.testing-insight__title');
        const insightMetric = insight.querySelector('.testing-insight__metric');
        const insightPoints = insight.querySelector('.testing-insight__points');
        const radius = 86;
        const circumference = 2 * Math.PI * radius;
        const segmentLength = circumference / testingAreas.length;

        testingAreas.forEach((area, index) => {
            const segment = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            segment.setAttribute('class', 'donut-segment');
            segment.setAttribute('cx', '120'); segment.setAttribute('cy', '120'); segment.setAttribute('r', radius);
            segment.setAttribute('fill', 'none'); segment.setAttribute('stroke', area.color);
            segment.setAttribute('stroke-dasharray', `${segmentLength} ${circumference - segmentLength}`);
            segment.setAttribute('stroke-dashoffset', String(-index * segmentLength));
            segment.setAttribute('stroke-width', '30'); segment.setAttribute('tabindex', '0');
            segment.setAttribute('role', 'button'); segment.setAttribute('aria-label', `${area.category}: ${area.metric}`);
            segment.dataset.index = index;
            svg.appendChild(segment);
            const item = document.createElement('button');
            item.type = 'button'; item.className = 'testing-legend__button'; item.style.setProperty('--legend-color', area.color);
            item.innerHTML = `<span class="testing-legend__dot"></span><span>${area.category}</span>`;
            item.setAttribute('aria-label', `Show ${area.category} insight`); item.dataset.index = index;
            legend.appendChild(item);
        });

        function selectArea(index) {
            const area = testingAreas[index];
            svg.querySelectorAll('.donut-segment').forEach((segment, i) => segment.classList.toggle('is-selected', i === index));
            legend.querySelectorAll('.testing-legend__button').forEach((button, i) => {
                button.classList.toggle('is-selected', i === index);
                button.setAttribute('aria-pressed', String(i === index));
            });
            centerTitle.textContent = area.category;
            centerMetric.textContent = area.metric;
            insight.style.setProperty('--insight-color', area.color);
            insightTitle.textContent = area.category;
            insightMetric.textContent = area.metric;
            insightPoints.replaceChildren(...area.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; }));
        }
        function showTooltip(index) { const area = testingAreas[index]; tooltip.textContent = `${area.category}: ${area.metric}`; tooltip.hidden = false; }
        function hideTooltip() { tooltip.hidden = true; }
        testingDistribution.addEventListener('click', event => { const target = event.target.closest('[data-index]'); if (target) selectArea(Number(target.dataset.index)); });
        testingDistribution.addEventListener('pointerover', event => { const target = event.target.closest('.donut-segment'); if (target) showTooltip(Number(target.dataset.index)); });
        testingDistribution.addEventListener('pointerout', event => { if (event.target.closest('.donut-segment')) hideTooltip(); });
        svg.addEventListener('keydown', event => { const target = event.target.closest('.donut-segment'); if (target && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); selectArea(Number(target.dataset.index)); } });
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
