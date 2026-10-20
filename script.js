/**
 * AQUA NOVA — Interactive Client Logic
 * Version: 2.0 (Production Master)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 1. STICKY NAVBAR & ACTIVE LINK TRACKING ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link on Scroll
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 2. MOBILE MENU TOGGLE ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // --- 3. SMOOTH ANCHOR SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. PORTFOLIO FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 5. LIGHTBOX MODAL ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    const openLightbox = (imgSrc, captionText) => {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText || 'Aqua Nova — Réalisation Prestige';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent;
            if (img) {
                openLightbox(img.src, title);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- 6. INTERACTIVE ESTIMATOR CALCULATOR ---
    const calcService = document.getElementById('calcService');
    const calcArea = document.getElementById('calcArea');
    const areaValue = document.getElementById('areaValue');
    const gradeBtns = document.querySelectorAll('.grade-btn');
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const btnUseEstimate = document.getElementById('btnUseEstimate');

    let currentGrade = 'prestige';

    // Pricing Matrix per m² (Min, Max)
    const PRICING_MATRIX = {
        bathroom: {
            prestige: { min: 450, max: 650 },
            hautecouture: { min: 700, max: 950 },
            signature: { min: 1000, max: 1400 }
        },
        plumbing: {
            prestige: { min: 250, max: 400 },
            hautecouture: { min: 420, max: 600 },
            signature: { min: 650, max: 900 }
        },
        plaster: {
            prestige: { min: 80, max: 130 },
            hautecouture: { min: 140, max: 210 },
            signature: { min: 220, max: 320 }
        },
        full: {
            prestige: { min: 800, max: 1200 },
            hautecouture: { min: 1300, max: 1800 },
            signature: { min: 1900, max: 2800 }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const updateEstimate = () => {
        if (!calcService || !calcArea || !calcPriceDisplay) return;

        const service = calcService.value;
        const area = parseInt(calcArea.value, 10);
        if (areaValue) areaValue.textContent = `${area} m²`;

        const servicePricing = PRICING_MATRIX[service] || PRICING_MATRIX.bathroom;
        const gradePricing = servicePricing[currentGrade] || servicePricing.prestige;

        const minTotal = area * gradePricing.min;
        const maxTotal = area * gradePricing.max;

        calcPriceDisplay.textContent = `${formatCurrency(minTotal)} — ${formatCurrency(maxTotal)}`;
    };

    if (calcArea) {
        calcArea.addEventListener('input', updateEstimate);
    }

    if (calcService) {
        calcService.addEventListener('change', updateEstimate);
    }

    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gradeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGrade = btn.getAttribute('data-grade');
            updateEstimate();
        });
    });

    if (btnUseEstimate) {
        btnUseEstimate.addEventListener('click', () => {
            const serviceSelect = document.getElementById('contactService');
            const messageArea = document.getElementById('contactMessage');
            const area = calcArea ? calcArea.value : 15;
            const price = calcPriceDisplay ? calcPriceDisplay.textContent : '';

            if (serviceSelect && calcService) {
                const mapService = {
                    bathroom: 'salle-de-bain',
                    plumbing: 'plomberie',
                    plaster: 'platrerie',
                    full: 'globale'
                };
                serviceSelect.value = mapService[calcService.value] || 'salle-de-bain';
            }

            if (messageArea) {
                messageArea.value = `Bonjour, je souhaite un devis pour mon projet d'environ ${area} m² (${currentGrade.toUpperCase()}). Estimation indicative en ligne : ${price}.`;
            }

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('contactName');
                if (nameInput) setTimeout(() => nameInput.focus(), 600);
            }
        });
    }

    // Initialize initial estimate calculation
    updateEstimate();

    // --- 7. FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- 8. CONTACT FORM VALIDATION & FEEDBACK ---
    const contactForm = document.getElementById('contactForm');
    const toastNotice = document.getElementById('toastNotice');
    const toastMessage = document.getElementById('toastMessage');

    const showToast = (message, isError = false) => {
        if (!toastNotice || !toastMessage) return;
        toastMessage.textContent = message;
        if (isError) {
            toastNotice.style.borderColor = '#ef4444';
        } else {
            toastNotice.style.borderColor = 'var(--gold-500)';
        }
        toastNotice.classList.add('show');
        setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 4000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Anti-spam Honeypot Check
            const honeypot = contactForm.querySelector('input[name="company_check"]');
            if (honeypot && honeypot.value.trim() !== '') {
                // Silently ignore bots
                return;
            }

            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) {
                showToast('Veuillez renseigner les champs obligatoires (nom, courriel, message).', true);
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast('Veuillez renseigner une adresse courriel valide.', true);
                return;
            }

            // Submit Simulation with instant feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Transmission en cours...</span>';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }
                showToast('Votre demande a bien été transmise. Un maître artisan vous recontactera sous 24h.');
                contactForm.reset();
                updateEstimate();
            }, 800);
        });
    }

    // --- 9. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 10. ANIMATED METRICS COUNTER ---
    const metricElements = document.querySelectorAll('.metric-number[data-count]');
    let metricsAnimated = false;

    const animateMetrics = () => {
        metricElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = `${target}+`;
                    clearInterval(timer);
                } else {
                    el.textContent = `${Math.floor(current)}+`;
                }
            }, 30);
        });
    };

    if ('IntersectionObserver' in window && metricElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !metricsAnimated) {
                    metricsAnimated = true;
                    animateMetrics();
                }
            });
        }, { threshold: 0.5 });

        const heroMetrics = document.querySelector('.hero-metrics');
        if (heroMetrics) observer.observe(heroMetrics);
    }
});
