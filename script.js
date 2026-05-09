document.addEventListener('DOMContentLoaded', () => {
    // ── 1. CORE SETUP & COMPONENT LOADING ──
    const components = [
        { id: 'navbar-container', path: 'components/navbar.html' },
        { id: 'hero-container', path: 'components/hero.html' },
        { id: 'resources-container', path: 'components/resources.html' },
        { id: 'events-container', path: 'components/events.html' },
        { id: 'impact-container', path: 'components/impact.html' },
        { id: 'members-container', path: 'components/members.html' },
        { id: 'footer-container', path: 'components/footer.html' },
        { id: 'chatbot-container', path: 'components/chatbot.html' }
    ];

    async function loadComponent(component) {
        try {
            const response = await fetch(component.path);
            if (!response.ok) throw new Error(`Failed to load ${component.path}`);
            const html = await response.text();
            document.getElementById(component.id).innerHTML = html;
        } catch (error) {
            console.error("Component Load Error:", error);
        }
    }

    async function init() {
        // Load all components
        await Promise.all(components.map(loadComponent));
        
        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // ── 2. GLOBAL UTILITIES (Scroll Animations) ──
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        const revealables = document.querySelectorAll('.reveal, .section, .resource-card, .event-card, .stat-card');
        revealables.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
            observer.observe(el);
        });

        // Global scroll effects (Header & Logo)
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.site-header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (window.scrollY > window.innerHeight * 0.8) {
                    document.body.classList.add('scrolled-past-hero');
                } else {
                    document.body.classList.remove('scrolled-past-hero');
                }
            }
        });

        // ── 3. NAVBAR (Kinetic Fullscreen Menu) ──
        const menuToggleBtn = document.getElementById('menuToggleBtn');
        const navOverlay = document.getElementById('navOverlay');
        const navOverlayBg = document.getElementById('navOverlayBg');
        let isMenuOpen = false;

        if (menuToggleBtn && navOverlay && typeof gsap !== 'undefined') {
            const mainEase = (() => {
                try {
                    if (typeof CustomEase !== 'undefined') {
                        gsap.registerPlugin(CustomEase);
                        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
                        return "main";
                    }
                } catch (e) { }
                return "power2.out";
            })();
            gsap.defaults({ ease: mainEase, duration: 0.7 });

            const menuPanel = navOverlay.querySelector('.nav-menu-panel');
            const overlayBg = navOverlay.querySelector('.nav-overlay-bg');
            const backdropLayers = Array.from(navOverlay.querySelectorAll('.nav-backdrop-layer'));
            const menuLinks = Array.from(navOverlay.querySelectorAll('.nav-menu-link'));
            const btnLabels = Array.from(menuToggleBtn.querySelectorAll('.menu-btn-label'));
            const btnIcon = menuToggleBtn.querySelector('.menu-btn-icon');

            function openMenu() {
                if (!menuPanel || !overlayBg) return;
                isMenuOpen = true;
                navOverlay.setAttribute('data-nav', 'open');
                document.body.style.overflow = 'hidden';
                gsap.killTweensOf(menuPanel);
                gsap.killTweensOf(overlayBg);
                if (backdropLayers.length) gsap.killTweensOf(backdropLayers);
                if (menuLinks.length) gsap.killTweensOf(menuLinks);
                gsap.set(overlayBg, { autoAlpha: 0 });
                gsap.set(menuPanel, { xPercent: 100, x: 0, visibility: 'visible' });
                if (backdropLayers.length) gsap.set(backdropLayers, { xPercent: 101 });
                if (menuLinks.length) gsap.set(menuLinks, { yPercent: 140, rotate: 10, opacity: 0 });
                const tl = gsap.timeline();
                tl.to(btnLabels, { yPercent: -100, stagger: 0.1, duration: 0.4 }, 0)
                  .to(btnIcon, { rotate: 315, duration: 0.4 }, 0)
                  .to(overlayBg, { autoAlpha: 1, duration: 0.4 }, 0)
                  .to(menuPanel, { xPercent: 0, duration: 0.6, ease: mainEase }, 0);
                if (backdropLayers.length) {
                    tl.to(backdropLayers, { xPercent: 0, stagger: 0.1, duration: 0.6, ease: mainEase }, 0.1);
                }
                if (menuLinks.length) {
                    tl.to(menuLinks, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, 0.3);
                }
            }

            function closeMenu() {
                if (!menuPanel || !overlayBg) return;
                isMenuOpen = false;
                navOverlay.setAttribute('data-nav', 'closed');
                document.body.style.overflow = '';
                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set([menuPanel, overlayBg, ...backdropLayers, ...menuLinks], { clearProps: 'all' });
                    }
                });
                tl.to(overlayBg, { autoAlpha: 0, duration: 0.4 }, 0);
                if (backdropLayers.length) {
                    tl.to(backdropLayers, { xPercent: 101, stagger: 0.05, duration: 0.4 }, 0);
                }
                tl.to(menuPanel, { xPercent: 100, duration: 0.5, ease: "power2.in" }, 0)
                  .to(btnLabels, { yPercent: 0, duration: 0.4 }, 0)
                  .to(btnIcon, { rotate: 0, duration: 0.4 }, 0);
            }

            menuToggleBtn.addEventListener('click', () => {
                if (isMenuOpen) closeMenu();
                else openMenu();
            });

            if (navOverlayBg) {
                navOverlayBg.addEventListener('click', closeMenu);
            }

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isMenuOpen) closeMenu();
            });

            // Shape hover effects
            const menuItems = Array.from(navOverlay.querySelectorAll('.nav-menu-item[data-shape]'));
            const shapesContainer = navOverlay.querySelector('.nav-ambient-shapes');

            menuItems.forEach((item) => {
                const shapeIndex = item.getAttribute('data-shape');
                const shape = shapesContainer ? shapesContainer.querySelector(`.nav-bg-shape-${shapeIndex}`) : null;
                if (!shape) return;
                const shapeEls = Array.from(shape.querySelectorAll('.nav-shape-el'));
                if (!shapeEls.length) return;
                item.addEventListener('mouseenter', () => {
                    if (shapesContainer) {
                        shapesContainer.querySelectorAll('.nav-bg-shape').forEach(s => s.classList.remove('active'));
                    }
                    shape.classList.add('active');
                    gsap.fromTo(shapeEls,
                        { scale: 0.5, opacity: 0, rotation: -10, transformOrigin: "50% 50%" },
                        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', overwrite: 'auto' }
                    );
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(shapeEls, {
                        scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in',
                        onComplete: () => shape.classList.remove('active'),
                        overwrite: 'auto'
                    });
                });
            });

            menuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    closeMenu();
                    setTimeout(() => {
                        const targetId = href.substring(1);
                        const target = document.getElementById(targetId);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 600);
                });
            });
        }

        // ── 4. HERO SECTION (Tagline Morph, 3D Scroll, Cursor Reveal) ──
        
        // Cursor-reveal image effect
        const heroSection = document.querySelector('.hero.twogood-v2');
        const revealImg = document.querySelector('.hero-reveal-img');
        if (heroSection && revealImg) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                revealImg.style.setProperty('--mx', `${x}px`);
                revealImg.style.setProperty('--my', `${y}px`);
            });
            heroSection.addEventListener('mouseleave', () => {
                revealImg.style.setProperty('--mx', '-9999px');
                revealImg.style.setProperty('--my', '-9999px');
            });
        }

        // Gooey Morphing Text
        const text1 = document.getElementById('text1');
        const text2 = document.getElementById('text2');
        if (text1 && text2) {
            const texts = ["CONNECT.", "EVOLVE.", "INNOVATE."];
            const morphTime = 1;
            const cooldownTime = 3.0;
            let textIndex = texts.length - 1;
            let time = new Date();
            let morph = 0;
            let cooldown = cooldownTime;
            text1.textContent = texts[textIndex % texts.length];
            text2.textContent = texts[(textIndex + 1) % texts.length];

            function setMorph(fraction) {
                text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
                fraction = 1 - fraction;
                text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            }
            function doCooldown() {
                morph = 0;
                text2.style.filter = "";
                text2.style.opacity = "100%";
                text1.style.filter = "";
                text1.style.opacity = "0%";
            }
            function doMorph() {
                morph -= cooldown;
                cooldown = 0;
                let fraction = morph / morphTime;
                if (fraction > 1) {
                    cooldown = cooldownTime;
                    fraction = 1;
                }
                setMorph(fraction);
            }
            function animateMorph() {
                requestAnimationFrame(animateMorph);
                const newTime = new Date();
                const shouldIncrementIndex = cooldown > 0;
                const dt = (newTime.getTime() - time.getTime()) / 1000;
                time = newTime;
                cooldown -= dt;
                if (cooldown <= 0) {
                    if (shouldIncrementIndex) {
                        textIndex = (textIndex + 1) % texts.length;
                        text1.textContent = texts[textIndex % texts.length];
                        text2.textContent = texts[(textIndex + 1) % texts.length];
                    }
                    doMorph();
                } else {
                    doCooldown();
                }
            }
            animateMorph();
        }

        // 3D Mission Box Scroll
        const scrollBox = document.querySelector('.mission-scroll-box');
        const scrollContainer = document.querySelector('.scroll-box-container');
        if (scrollBox && scrollContainer) {
            function updateScrollAnimation() {
                if (window.innerWidth <= 768) {
                    scrollBox.style.transform = 'none';
                    scrollBox.classList.add('animate-in');
                    return;
                }
                const rect = scrollContainer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const start = windowHeight;
                const end = windowHeight * 0.25;
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                const rotateX = 20 * (1 - progress);
                const scale = 1.05 - (0.05 * progress);
                const translateY = -100 * progress;
                scrollBox.style.transform = `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
                if (progress > 0.01) scrollBox.classList.add('animate-in');
                else scrollBox.classList.remove('animate-in');
            }
            window.addEventListener('scroll', updateScrollAnimation, { passive: true });
            updateScrollAnimation();
        }

        // ── 5. RESOURCES SECTION ──
        // (Currently handled by CSS & Component Loading)

        // ── 6. MEMBERS SECTION (Founders, Teachers, Builders) ──
        const memberGroups = {
            founders: {
                title: 'the <span class="accent">founders</span>',
                subheading: "who laid the vision behind the community",
                members: [
                    { name: "Abhishek Kumar Rai", role: "Founder", desc: "Visionary leader driving community growth and strategic partnerships.", linkedin: "#", email: "abhishek@codemate.com", github: "#", imageSrc: "images/founders/akb.jpg.jpeg", thumbnailSrc: "images/founders/akbt.png" },
                    { name: "Harsh Pandey", role: "Founder", desc: "Operations expert ensuring smooth execution of community initiatives.", linkedin: "#", email: "harsh@codemate.com", github: "#", imageSrc: "images/founders/hp.png", thumbnailSrc: "images/founders/hpt.png" },
                    { name: "Abhi Nitnaware", role: "Founder", desc: "Technical pioneer focusing on resource development and innovation.", linkedin: "#", email: "abhi@codemate.com", github: "#", imageSrc: "images/founders/an.png", thumbnailSrc: "images/founders/ant.png" }
                ]
            },
            teachers: {
                title: 'the <span class="accent">teacher co-ordinators</span>',
                subheading: "who guide us with experience and mentorship",
                members: [
                    { name: "Dr. Arnab Kumar Maji", role: "Coordinator", desc: "Academic advisor providing deep insights into research and excellence.", linkedin: "#", email: "arnab@codemate.com", github: "#", imageSrc: "images/teacher_coordinator/it.png", thumbnailSrc: "images/teacher_coordinator/itt.png" },
                    { name: "Prof. Sirsendu Sekhar Ray", role: "Coordinator", desc: "Mentorship lead fostering student growth through expert guidance.", linkedin: "#", email: "sirsendu@codemate.com", github: "#", imageSrc: "images/teacher_coordinator/bme.png", thumbnailSrc: "images/teacher_coordinator/bmet.png" },
                    { name: "Mr. Asif Ahmed", role: "Coordinator", desc: "Industry liaison bridging the gap between academia and career.", linkedin: "#", email: "asif@codemate.com", github: "#", imageSrc: "images/teacher_coordinator/ece.png", thumbnailSrc: "images/teacher_coordinator/ecet.png" }
                ]
            },
            leads: {
                title: 'the <span class="accent">builders</span>',
                subheading: "who are making everything happen",
                members: [
                    { name: "Bandeep Bhatta", role: "Club Lead", subgroup: "Leads", desc: "Driving overall club strategy and community engagement.", linkedin: "#", email: "bandeep@codemate.com", github: "#", imageSrc: "images/team/biku_p.jpeg", thumbnailSrc: "images/team/biku_t.png" },
                    { name: "Nikunj Maheshwari", role: "Ops & Strategy", subgroup: "Leads", desc: "Managing operations and long-term strategic growth.", linkedin: "#", email: "nikunj@codemate.com", github: "#", imageSrc: "images/team/nikunj_p.png", thumbnailSrc: "images/team/nikunj_t.png" },
                    { name: "Soumojit Bhuin", role: "Tech Lead", subgroup: "Leads", desc: "Overseeing technical infrastructure and project development.", linkedin: "https://www.linkedin.com/in/soumojit-bhuin-313328345", email: "soumojit@codemate.com", github: "#", imageSrc: "images/team/soumojit_p.png", thumbnailSrc: "images/team/soumojit_t.png" },
                    { name: "Anurag Saud", role: "Full-Stack Developer", subgroup: "Tech Team", desc: "Maintains full-stack systems and CodeMate's Discord.", linkedin: "#", email: "anurag@codemate.com", github: "#", imageSrc: "images/team/anurag_p.jpeg", thumbnailSrc: "images/team/anurag_t.png" },
                    { name: "Pratyay Pratim Borah", role: "Frontend Developer", subgroup: "Tech Team", desc: "Develops scalable web interfaces and optimizes UX.", linkedin: "#", email: "pratyay@codemate.com", github: "#", imageSrc: "images/team/pratyay_p.jpeg", thumbnailSrc: "images/team/pratyay_t.jpeg" },
                    { name: "Vaivbhav Papney", role: "CP Enthusiast", subgroup: "Tech Team", desc: "Supports technical projects and maintains documentation.", linkedin: "#", email: "vaivbhav@codemate.com", github: "#", imageSrc: "images/team/vaibhav_p.png", thumbnailSrc: "images/team/vaibhav_t.png" },
                    { name: "Sazeed Taj", role: "Web Designer", subgroup: "Tech Team", desc: "Designs web layouts and ensures brand visual consistency.", linkedin: "#", email: "sazeed@codemate.com", github: "#", imageSrc: "images/team/sazeed_p.jpeg", thumbnailSrc: "images/team/sazeed_t.jpeg" },
                    { name: "Rishita Kashyap", role: "Community Engagement Coordinator", subgroup: "Event Management Team", desc: "Drives event promotion, sponsor outreach, and Instagram growth.", linkedin: "#", email: "rishita@codemate.com", github: "#", imageSrc: "images/team/rishita_p.jpeg", thumbnailSrc: "images/team/rishita_t.jpeg" },
                    { name: "Disha Saha", role: "Documentation Coordinator", subgroup: "Event Management Team", desc: "Captures and organizes event moments through visual storytelling.", linkedin: "#", email: "disha@codemate.com", github: "#", imageSrc: "images/team/disha_p.jpeg", thumbnailSrc: "images/team/disha_t.jpeg" },
                    { name: "Chandrasmita Gayan", role: "Graphic Designer", subgroup: "Event Management Team", desc: "Creates event graphics, manages LinkedIn, and assists with Instagram.", linkedin: "#", email: "chandrasmita@codemate.com", github: "#", imageSrc: "images/team/chandrasmita_p.jpeg", thumbnailSrc: "images/team/chandrasmita_t.jpeg" },
                    { name: "Deepanshu Das", role: "Graphic Designer", subgroup: "Event Management Team", desc: "Creates event graphics, handles photo coverage, and assists with Instagram.", linkedin: "#", email: "deepanshu@codemate.com", github: "#", imageSrc: "images/team/deepanshu_p.jpeg", thumbnailSrc: "images/team/deepanshu_t.jpeg" },
                    { name: "Krish Das", role: "Content Manager", subgroup: "Event Management Team", desc: "Creates promotional videos and builds CodeMate's Instagram presence.", linkedin: "#", email: "krish@codemate.com", github: "#", imageSrc: "images/team/krish_p.jpeg", thumbnailSrc: "images/team/krish_t.jpeg" }
                ]
            }
        };

        let currentActiveGroup = 'founders';
        let currentMemberIndex = 0;

        function createMemberCard(member) {
            return `
                <div class="member-card reveal">
                    <div class="member-card-img-wrap">
                        <img src="${member.imageSrc}" alt="${member.name}" class="member-card-img">
                    </div>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <span class="role">${member.role}</span>
                    </div>
                    <p class="member-desc">${member.desc}</p>
                    <div class="member-links">
                        <a href="${member.linkedin}" class="member-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="mailto:${member.email}" class="member-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                        <a href="${member.github}" class="member-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-3-7-3"/></svg>
                        </a>
                    </div>
                </div>
            `;
        }

        function renderSlider(group) {
            const members = group.members;
            const activeMember = members[currentMemberIndex];
            const thumbnailReviews = [];
            const numThumbnails = Math.min(2, Math.max(0, members.length - 1));
            for (let i = 1; i <= numThumbnails; i++) {
                const idx = (currentMemberIndex + i) % members.length;
                thumbnailReviews.push({ ...members[idx], originalIndex: idx });
            }
            const pagination = `${String(currentMemberIndex + 1).padStart(2, "0")} / ${String(members.length).padStart(2, "0")}`;
            const thumbnailsHTML = thumbnailReviews.map(member => `
                <button onclick="window.handleThumbnailClick(${member.originalIndex})" class="slider-thumb-btn">
                    <img src="${member.thumbnailSrc}" alt="${member.name}" class="slider-thumb-img">
                </button>
            `).join('');
            const viewAllBtn = (currentActiveGroup === 'leads') ? `
                <button onclick="window.toggleViewAll()" class="view-all-btn-circular">
                    <span class="view-all-text">view All</span>
                </button>
            ` : '';
            return `
                <div class="testimonial-slider-container">
                    ${viewAllBtn}
                    <div class="ts-left-col">
                        <div class="ts-meta">
                            <span class="ts-pagination">${pagination}</span>
                            <h2 class="ts-vertical-text">Members</h2>
                        </div>
                        <div class="ts-thumbnails">${thumbnailsHTML}</div>
                    </div>
                    <div class="ts-center-col">
                        <img src="${activeMember.imageSrc}" alt="${activeMember.name}" class="ts-main-image" id="ts-main-image">
                    </div>
                    <div class="ts-right-col">
                        <div class="ts-text-content" id="ts-text-content">
                            <p class="ts-role">${activeMember.role}</p>
                            <h3 class="ts-name">${activeMember.name}</h3>
                            <blockquote class="ts-quote">"${activeMember.desc}"</blockquote>
                            <div class="member-links ts-contact-icons" style="margin-top: 2rem;">
                                <a href="${activeMember.linkedin}" class="member-link"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                                <a href="mailto:${activeMember.email}" class="member-link"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
                                <a href="${activeMember.github}" class="member-link"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-3-7-3"/></svg></a>
                            </div>
                        </div>
                        <div class="ts-nav-buttons">
                            <button onclick="window.handlePrevMember()" class="ts-nav-btn"><i data-lucide="arrow-left"></i></button>
                            <button onclick="window.handleNextMember()" class="ts-nav-btn ts-nav-btn-primary"><i data-lucide="arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderGrid(groupKey) {
            const group = memberGroups[groupKey];
            return `
                <div class="members-view-all-container">
                    <div class="members-grid">
                        ${group.members.map(createMemberCard).join('')}
                    </div>
                </div>
            `;
        }

        window.toggleViewAll = () => { console.log("toggleViewAll called but UI buttons removed"); };
        window.handleNextMember = () => {
            const members = memberGroups[currentActiveGroup].members;
            currentMemberIndex = (currentMemberIndex + 1) % members.length;
            updateSliderDOM();
        };
        window.handlePrevMember = () => {
            const members = memberGroups[currentActiveGroup].members;
            currentMemberIndex = (currentMemberIndex - 1 + members.length) % members.length;
            updateSliderDOM();
        };
        window.handleThumbnailClick = (index) => {
            currentMemberIndex = index;
            updateSliderDOM();
        };
        function updateSliderDOM() {
            const grid = document.getElementById('members-active-grid');
            if (!grid) return;
            gsap.to(['#ts-main-image', '#ts-text-content'], { opacity: 0, y: 10, duration: 0.25, ease: "power2.in", onComplete: () => {
                grid.innerHTML = renderSlider(memberGroups[currentActiveGroup]);
                if (window.lucide) window.lucide.createIcons();
                gsap.from(['#ts-main-image', '#ts-text-content'], { opacity: 0, y: -10, duration: 0.4, ease: "power2.out" });
            }});
        }

        function updateMembersUI(activeId) {
            currentActiveGroup = activeId;
            currentMemberIndex = 0; 
            const group = memberGroups[activeId];
            const heading = document.getElementById('members-heading');
            const subheading = document.getElementById('members-subheading');
            const grid = document.getElementById('members-active-grid');
            const nav = document.getElementById('members-nav');
            if (!heading || !grid || !nav) return;
            heading.innerHTML = group.title;
            subheading.textContent = group.subheading;
            if (activeId === 'leads' && window.innerWidth > 768) grid.innerHTML = renderGrid(activeId);
            else grid.innerHTML = renderSlider(group);

            const otherGroups = Object.keys(memberGroups).filter(id => id !== activeId);
            nav.innerHTML = otherGroups.map(id => {
                let displayName = id === 'founders' ? "Founders" : (id === 'teachers' ? "Teachers" : "Builders");
                return `
                    <button class="member-nav-btn" data-group="${id}">
                        <span class="nav-btn-label">SWITCH TO</span>
                        <span class="nav-btn-name">${displayName}</span>
                    </button>
                `;
            }).join('');
            if (window.lucide) window.lucide.createIcons();
            const newRevealables = grid.querySelectorAll('.reveal');
            newRevealables.forEach(el => observer.observe(el));

            nav.querySelectorAll('.member-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const target = btn.getAttribute('data-group');
                    const content = document.querySelector('.members-display');
                    const membersSection = document.getElementById('members');
                    gsap.to(content, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in", onComplete: () => {
                        if (window.innerWidth <= 768) {
                            updateMembersUI(target);
                            const membersHeader = document.getElementById('members-header-wrap');
                            if (membersHeader) {
                                const y = membersHeader.getBoundingClientRect().top + window.pageYOffset - 80;
                                window.scrollTo({top: y, behavior: 'smooth'});
                            }
                        } else {
                            const beforeTop = membersSection.getBoundingClientRect().top;
                            updateMembersUI(target);
                            const diff = membersSection.getBoundingClientRect().top - beforeTop;
                            if (Math.abs(diff) > 0) window.scrollBy(0, diff);
                        }
                        gsap.fromTo(content, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
                    }});
                });
            });
        }

        const membersSection = document.getElementById('members');
        if (membersSection) updateMembersUI('founders');

        // ── 7. EVENTS SECTION (Animated Events) ──
        const eventCards = document.querySelectorAll('.event-animated-card');
        const eventDots = document.querySelectorAll('.event-dot');
        let activeEventIndex = 0;
        let eventAutoRotateInterval;

        function updateEvents(newIndex) {
            if (newIndex === activeEventIndex || !eventCards.length) return;
            const oldCard = eventCards[activeEventIndex];
            const newCard = eventCards[newIndex];
            if (typeof gsap !== 'undefined') {
                gsap.to(oldCard, { opacity: 0, x: 100, scale: 0.9, duration: 0.5, ease: "power2.inOut", zIndex: 0 });
                gsap.fromTo(newCard, { opacity: 0, x: 100, scale: 0.9, zIndex: 10 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
            } else {
                oldCard.classList.remove('active');
                newCard.classList.add('active');
            }
            oldCard.style.pointerEvents = "none";
            newCard.style.pointerEvents = "auto";
            eventDots[activeEventIndex].classList.remove('active');
            eventDots[newIndex].classList.add('active');
            activeEventIndex = newIndex;
        }

        if (eventCards.length && eventDots.length) {
            if (typeof gsap !== 'undefined') {
                gsap.set(eventCards, { opacity: 0, x: 100, scale: 0.9, zIndex: 0 });
                gsap.set(eventCards[0], { opacity: 1, x: 0, scale: 1, zIndex: 10 });
            }
            eventDots.forEach((dot, index) => {
                dot.addEventListener('click', () => { updateEvents(index); resetEventInterval(); });
            });
            function startEventInterval() { eventAutoRotateInterval = setInterval(() => { updateEvents((activeEventIndex + 1) % eventCards.length); }, 6000); }
            function resetEventInterval() { clearInterval(eventAutoRotateInterval); startEventInterval(); }
            startEventInterval();
        }

        // ── 8. IMPACT SECTION (Cybernetic Bento Grid) ──
        const bentoItems = document.querySelectorAll('.bento-item');
        bentoItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
            item.addEventListener('mouseleave', () => {
                item.style.setProperty('--mouse-x', '-999px');
                item.style.setProperty('--mouse-y', '-999px');
            });
        });

        // ── 9. FOOTER SECTION ──
        // (Currently handled by CSS & Component Loading)

        // ── 10. CHATBOT LOGIC ──
        function initChatbot() {
            const toggleBtn = document.getElementById('chatbot-toggle');
            const closeBtn = document.getElementById('chatbot-close');
            const chatWindow = document.getElementById('chatbot-window');
            const chatForm = document.getElementById('chatbot-form');
            const chatInput = document.getElementById('chatbot-input');
            const messagesContainer = document.getElementById('chatbot-messages');

            if (!toggleBtn || !chatWindow) return;

            toggleBtn.addEventListener('click', () => {
                chatWindow.classList.toggle('hidden');
                if (!chatWindow.classList.contains('hidden')) {
                    chatInput.focus();
                }
            });

            closeBtn.addEventListener('click', () => {
                chatWindow.classList.add('hidden');
            });

            function addMessage(text, isUser) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
                
                let contentHTML;
                if (isUser) {
                    contentHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                } else {
                    if (typeof marked !== 'undefined') {
                        contentHTML = marked.parse(text);
                    } else {
                        contentHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    }
                }
                
                msgDiv.innerHTML = `<div class="message-content">${contentHTML}</div>`;
                messagesContainer.appendChild(msgDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            if (chatForm) {
                chatForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const message = chatInput.value.trim();
                    if (!message) return;

                    addMessage(message, true);
                    chatInput.value = '';
                    
                    // Show typing indicator
                    const typingId = 'typing-' + Date.now();
                    const typingDiv = document.createElement('div');
                    typingDiv.id = typingId;
                    typingDiv.className = 'message bot-message';
                    typingDiv.innerHTML = '<div class="message-content typing-indicator"><span>.</span><span>.</span><span>.</span></div>';
                    messagesContainer.appendChild(typingDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    try {
                        const response = await fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message })
                        });
                        
                        const data = await response.json();
                        document.getElementById(typingId).remove();
                        
                        if (response.ok) {
                            addMessage(data.answer, false);
                        } else {
                            addMessage(data.error || "Sorry, something went wrong.", false);
                        }
                    } catch (err) {
                        const t = document.getElementById(typingId);
                        if(t) t.remove();
                        addMessage("Connection error. Please try again.", false);
                    }
                });
            }
        }
        initChatbot();

        // ── 11. ASSETS PRELOADING ──
        function preloadAssets() {
            const imagesToPreload = [];
            if (typeof memberGroups !== 'undefined') {
                Object.values(memberGroups).forEach(group => {
                    group.members.forEach(member => {
                        if (member.imageSrc) imagesToPreload.push(member.imageSrc);
                        if (member.thumbnailSrc) imagesToPreload.push(member.thumbnailSrc);
                    });
                });
            }
            document.querySelectorAll('img').forEach(img => { if (img.src) imagesToPreload.push(img.src); });
            const uniqueImages = [...new Set(imagesToPreload.filter(src => src && !src.startsWith('data:')))];
            uniqueImages.forEach(src => { const img = new Image(); img.src = src; });
            document.querySelectorAll('video').forEach(video => { video.preload = 'auto'; });
            console.log(`[Preload] ${uniqueImages.length} images preloaded.`);
        }
        setTimeout(preloadAssets, 1000);
    }

    init();
});
