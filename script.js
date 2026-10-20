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

    // ==========================================================================
    // 11. AWWWARDS MOTION ENGINE & LENIS SMOOTH SCROLL
    // ==========================================================================
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Custom Magnetic Cursor Follower
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorFollower && cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }, { passive: true });

        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover expansions
        const interactiveTargets = document.querySelectorAll('a, button, input, select, .portfolio-item, .service-card, .material-btn, .hotspot-pin, canvas');
        interactiveTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
            target.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
        });
    }

    // ==========================================================================
    // 12. HERO WEBGL LIQUID CAUSTICS SHADER CANVAS
    // ==========================================================================
    const heroCanvas = document.getElementById('heroGlCanvas');
    if (heroCanvas && window.WebGLRenderingContext) {
        const gl = heroCanvas.getContext('webgl');
        if (gl) {
            const vsSource = `
                attribute vec2 position;
                varying vec2 vUv;
                void main() {
                    vUv = position * 0.5 + 0.5;
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            const fsSource = `
                precision highp float;
                varying vec2 vUv;
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uResolution;

                void main() {
                    vec2 uv = gl_FragCoord.xy / uResolution.xy;
                    float aspect = uResolution.x / uResolution.y;
                    vec2 p = uv;
                    p.x *= aspect;

                    vec2 m = uMouse;
                    m.x *= aspect;

                    float dist = distance(p, m);
                    float ripple = sin(dist * 22.0 - uTime * 2.5) * 0.03 * exp(-dist * 1.8);

                    // Liquid caustic noise approximation
                    vec2 coord = uv + ripple;
                    float n = sin(coord.x * 9.0 + uTime * 0.6) * cos(coord.y * 9.0 + uTime * 0.6);
                    float n2 = sin(coord.x * 18.0 - uTime * 0.9) * cos(coord.y * 18.0 + uTime * 0.9);
                    float caustics = pow(max(0.0, n * 0.5 + n2 * 0.5 + 0.2), 3.0);

                    // Gold & Cyan luxury chromatic highlights
                    vec3 gold = vec3(0.77, 0.63, 0.35);
                    vec3 cyan = vec3(0.0, 0.74, 0.83);
                    vec3 color = mix(gold, cyan, sin(uTime * 0.3) * 0.2 + 0.2) * caustics * 0.45;

                    gl_FragColor = vec4(color, caustics * 0.4);
                }
            `;

            function createShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            }

            const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
            const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
            const program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            gl.useProgram(program);

            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1, -1,
                 1, -1,
                -1,  1,
                -1,  1,
                 1, -1,
                 1,  1
            ]), gl.STATIC_DRAW);

            const posLoc = gl.getAttribLocation(program, 'position');
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            const timeLoc = gl.getUniformLocation(program, 'uTime');
            const mouseLoc = gl.getUniformLocation(program, 'uMouse');
            const resLoc = gl.getUniformLocation(program, 'uResolution');

            let mouseX = 0.5;
            let mouseY = 0.5;
            let currentMouseX = 0.5;
            let currentMouseY = 0.5;

            window.addEventListener('mousemove', (e) => {
                const rect = heroCanvas.getBoundingClientRect();
                if (e.clientY <= rect.bottom) {
                    mouseX = (e.clientX - rect.left) / rect.width;
                    mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
                }
            }, { passive: true });

            function resizeHeroCanvas() {
                const rect = heroCanvas.parentElement.getBoundingClientRect();
                heroCanvas.width = rect.width * Math.min(window.devicePixelRatio, 1.5);
                heroCanvas.height = rect.height * Math.min(window.devicePixelRatio, 1.5);
                gl.viewport(0, 0, heroCanvas.width, heroCanvas.height);
            }
            window.addEventListener('resize', resizeHeroCanvas);
            resizeHeroCanvas();

            function renderHero(time) {
                currentMouseX += (mouseX - currentMouseX) * 0.05;
                currentMouseY += (mouseY - currentMouseY) * 0.05;

                gl.uniform1f(timeLoc, time * 0.001);
                gl.uniform2f(mouseLoc, currentMouseX, currentMouseY);
                gl.uniform2f(resLoc, heroCanvas.width, heroCanvas.height);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(renderHero);
            }
            requestAnimationFrame(renderHero);
        }
    }

    // ==========================================================================
    // 13. THREE.JS 3D LUXURY ATELIER & MATERIAL CUSTOMIZER
    // ==========================================================================
    const studioViewport = document.getElementById('studio3dViewport');
    const studioCanvas = document.getElementById('studio3dCanvas');
    const studioLoader = document.getElementById('studio3dLoader');

    if (studioViewport && studioCanvas && typeof THREE !== 'undefined') {
        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a16, 0.12);

        const camera = new THREE.PerspectiveCamera(
            42,
            studioViewport.clientWidth / studioViewport.clientHeight,
            0.1,
            100
        );
        camera.position.set(3.2, 2.5, 4.2);

        const renderer = new THREE.WebGLRenderer({
            canvas: studioCanvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(studioViewport.clientWidth, studioViewport.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // OrbitControls
        let controls = null;
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.06;
            controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent camera going below floor
            controls.minDistance = 2.8;
            controls.maxDistance = 7.5;
            controls.target.set(0, 0.4, 0);
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.8;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xf5f3ef, 0.8);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
        mainLight.position.set(4, 6, 4);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        mainLight.shadow.bias = -0.0005;
        scene.add(mainLight);

        const goldRimLight = new THREE.PointLight(0xc5a059, 2.5, 10);
        goldRimLight.position.set(-3, 2, -2);
        scene.add(goldRimLight);

        const fillLight = new THREE.DirectionalLight(0x00bcd4, 0.4);
        fillLight.position.set(-3, 1, 3);
        scene.add(fillLight);

        // Procedural Textures Generator for Realistic PBR Marbles
        function createMarbleCanvas(type) {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');

            if (type === 'calacatta') {
                // Off-white ivory base
                ctx.fillStyle = '#f8f7f4';
                ctx.fillRect(0, 0, 1024, 1024);

                // Organic gold and grey veins
                ctx.lineWidth = 14;
                ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(80, 0);
                ctx.bezierCurveTo(300, 250, 450, 600, 950, 1024);
                ctx.stroke();

                ctx.lineWidth = 6;
                ctx.strokeStyle = 'rgba(90, 85, 78, 0.25)';
                ctx.beginPath();
                ctx.moveTo(0, 400);
                ctx.bezierCurveTo(350, 450, 600, 750, 1024, 850);
                ctx.stroke();

                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
                ctx.beginPath();
                ctx.moveTo(250, 100);
                ctx.bezierCurveTo(450, 200, 520, 380, 800, 500);
                ctx.stroke();
            } else if (type === 'marquina') {
                // Obsidian deep black base
                ctx.fillStyle = '#0f1016';
                ctx.fillRect(0, 0, 1024, 1024);

                // Sharp crystalline white quartz veins
                ctx.lineWidth = 8;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(400, 380);
                ctx.lineTo(650, 550);
                ctx.lineTo(1024, 900);
                ctx.stroke();

                ctx.lineWidth = 3;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.moveTo(400, 380);
                ctx.lineTo(250, 700);
                ctx.lineTo(500, 1024);
                ctx.stroke();
            }
            return new THREE.CanvasTexture(canvas);
        }

        const calacattaTexture = createMarbleCanvas('calacatta');
        const marquinaTexture = createMarbleCanvas('marquina');

        // Material Presets
        const MATERIALS = {
            calacatta: {
                vanity: new THREE.MeshStandardMaterial({
                    map: calacattaTexture,
                    color: 0xffffff,
                    roughness: 0.18,
                    metalness: 0.05
                }),
                metal: new THREE.MeshStandardMaterial({
                    color: 0xd4af37, // Gold hardware
                    roughness: 0.22,
                    metalness: 0.95
                })
            },
            marquina: {
                vanity: new THREE.MeshStandardMaterial({
                    map: marquinaTexture,
                    color: 0x151620,
                    roughness: 0.2,
                    metalness: 0.08
                }),
                metal: new THREE.MeshStandardMaterial({
                    color: 0xddc085,
                    roughness: 0.2,
                    metalness: 0.92
                })
            },
            gold: {
                vanity: new THREE.MeshStandardMaterial({
                    color: 0xcaa35a,
                    roughness: 0.25,
                    metalness: 0.88
                }),
                metal: new THREE.MeshStandardMaterial({
                    color: 0xf5df9e,
                    roughness: 0.15,
                    metalness: 0.98
                })
            },
            copper: {
                vanity: new THREE.MeshStandardMaterial({
                    color: 0xaf6346,
                    roughness: 0.32,
                    metalness: 0.78
                }),
                metal: new THREE.MeshStandardMaterial({
                    color: 0xc97c5d,
                    roughness: 0.25,
                    metalness: 0.92
                })
            }
        };

        let currentMaterialKey = 'calacatta';

        // Build 3D Architectural Model (Floating Luxury Monolith Vanity)
        const vanityGroup = new THREE.Group();

        // 1. Monolithic Vanity Block
        const vanityGeom = new THREE.BoxGeometry(2.4, 0.48, 1.2);
        const vanityMesh = new THREE.Mesh(vanityGeom, MATERIALS.calacatta.vanity);
        vanityMesh.position.y = 0.5;
        vanityMesh.castShadow = true;
        vanityMesh.receiveShadow = true;
        vanityGroup.add(vanityMesh);

        // 2. Carved Basin Inset
        const basinGeom = new THREE.CylinderGeometry(0.55, 0.48, 0.22, 32);
        const basinMaterial = new THREE.MeshStandardMaterial({
            color: 0x090a16,
            roughness: 0.1,
            metalness: 0.1
        });
        const basinMesh = new THREE.Mesh(basinGeom, basinMaterial);
        basinMesh.position.set(0, 0.65, 0);
        vanityGroup.add(basinMesh);

        // 3. Faucet Spout & Mixer Hardware
        const faucetGroup = new THREE.Group();
        faucetGroup.position.set(0, 0.74, -0.32);

        // Base flange
        const baseGeom = new THREE.CylinderGeometry(0.06, 0.07, 0.04, 24);
        const faucetMesh = new THREE.Mesh(baseGeom, MATERIALS.calacatta.metal);
        faucetGroup.add(faucetMesh);

        // Vertical pillar
        const pillarGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.42, 24);
        const pillarMesh = new THREE.Mesh(pillarGeom, MATERIALS.calacatta.metal);
        pillarMesh.position.y = 0.21;
        faucetGroup.add(pillarMesh);

        // Curved Spout
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0.42, 0),
            new THREE.Vector3(0, 0.58, 0.28),
            new THREE.Vector3(0, 0.38, 0.32)
        );
        const tubeGeom = new THREE.TubeGeometry(curve, 20, 0.03, 16, false);
        const tubeMesh = new THREE.Mesh(tubeGeom, MATERIALS.calacatta.metal);
        faucetGroup.add(tubeMesh);

        // Mixer handles
        const handleGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.14, 24);
        const handleLeft = new THREE.Mesh(handleGeom, MATERIALS.calacatta.metal);
        handleLeft.position.set(-0.25, 0.07, 0);
        faucetGroup.add(handleLeft);

        const handleRight = new THREE.Mesh(handleGeom, MATERIALS.calacatta.metal);
        handleRight.position.set(0.25, 0.07, 0);
        faucetGroup.add(handleRight);

        vanityGroup.add(faucetGroup);

        // 4. Back Wall Panel with indirect lighting shadow
        const backWallGeom = new THREE.PlaneGeometry(3.6, 2.8);
        const backWallMat = new THREE.MeshStandardMaterial({
            color: 0x080914,
            roughness: 0.9,
            metalness: 0.1
        });
        const backWall = new THREE.Mesh(backWallGeom, backWallMat);
        backWall.position.set(0, 1.2, -0.65);
        backWall.receiveShadow = true;
        vanityGroup.add(backWall);

        // 5. Architectural Backlit Mirror
        const mirrorGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.03, 48);
        mirrorGeom.rotateX(Math.PI / 2);
        const mirrorMat = new THREE.MeshStandardMaterial({
            color: 0xe5e7eb,
            roughness: 0.05,
            metalness: 0.98
        });
        const mirrorMesh = new THREE.Mesh(mirrorGeom, mirrorMat);
        mirrorMesh.position.set(0, 1.45, -0.62);
        vanityGroup.add(mirrorMesh);

        // 6. Floor shadow catcher
        const floorGeom = new THREE.PlaneGeometry(8, 8);
        floorGeom.rotateX(-Math.PI / 2);
        const floorMat = new THREE.ShadowMaterial({ opacity: 0.45 });
        const floorMesh = new THREE.Mesh(floorGeom, floorMat);
        floorMesh.position.y = 0.0;
        floorMesh.receiveShadow = true;
        scene.add(floorMesh);

        scene.add(vanityGroup);

        // Hide loader when scene is ready
        setTimeout(() => {
            if (studioLoader) studioLoader.classList.add('hidden');
        }, 350);

        // Material Switcher Logic
        function applyMaterial(key) {
            const mat = MATERIALS[key];
            if (!mat) return;
            currentMaterialKey = key;

            vanityMesh.material = mat.vanity;
            faucetMesh.material = mat.metal;
            pillarMesh.material = mat.metal;
            tubeMesh.material = mat.metal;
            handleLeft.material = mat.metal;
            handleRight.material = mat.metal;

            // Micro-animation pulse on vanity
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(vanityGroup.scale, 
                    { x: 0.97, y: 0.97, z: 0.97 },
                    { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(2)' }
                );
            }
        }

        const materialBtns = document.querySelectorAll('.material-btn[data-material]');
        materialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                materialBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const matKey = btn.getAttribute('data-material');
                applyMaterial(matKey);
            });
        });

        // HUD Controls (Reset View & Auto-Rotate)
        const btnResetView = document.getElementById('btnResetView');
        if (btnResetView) {
            btnResetView.addEventListener('click', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(camera.position, {
                        x: 3.2,
                        y: 2.5,
                        z: 4.2,
                        duration: 1.2,
                        ease: 'power3.inOut'
                    });
                } else {
                    camera.position.set(3.2, 2.5, 4.2);
                }
                if (controls) controls.target.set(0, 0.4, 0);
            });
        }

        const btnAutoRotate = document.getElementById('btnAutoRotate');
        const autoRotateLabel = document.getElementById('autoRotateLabel');
        if (btnAutoRotate && controls) {
            btnAutoRotate.addEventListener('click', () => {
                controls.autoRotate = !controls.autoRotate;
                btnAutoRotate.classList.toggle('active', controls.autoRotate);
                if (autoRotateLabel) {
                    autoRotateLabel.textContent = controls.autoRotate ? 'Rotation ON' : 'Rotation OFF';
                }
            });
        }

        // Render Loop
        function animate3D() {
            requestAnimationFrame(animate3D);
            if (controls) controls.update();
            renderer.render(scene, camera);
        }
        animate3D();

        // Responsive Resize
        function resizeStudio() {
            if (!studioViewport) return;
            const width = studioViewport.clientWidth;
            const height = studioViewport.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener('resize', resizeStudio);
    }
});

