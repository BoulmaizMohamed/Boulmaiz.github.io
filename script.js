// ===================================
// MODERN PORTFOLIO - JAVASCRIPT
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===== DOM ELEMENTS =====
const header = document.querySelector('.header');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');
const overlay = document.querySelector('.overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// ===== THEME TOGGLE =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no preference is saved
    if (savedTheme === 'dark' || !savedTheme) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
function openMobileMenu() {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuToggle.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// ===== SMOOTH SCROLL & ACTIVE NAV =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Backend Developer',
    'Project Manager',
    'Laravel Expert',
    'API Specialist',
    'Database Optimizer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
}

// Start typing effect
if (typingText) {
    setTimeout(type, 1000);
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(skill => {
    skillObserver.observe(skill);
});

// ===== CUSTOM CURSOR =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for dot
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;

        // Slower follow for outline
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        if (cursorDot) {
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        }

        if (cursorOutline) {
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ===== CONTACT FORM =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formStatus = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        formStatus.style.display = 'none';

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'success';
            formStatus.style.display = 'block';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);

        } catch (error) {
            // Error
            formStatus.textContent = '✗ Failed to send message. Please try again or email me directly.';
            formStatus.className = 'error';
            formStatus.style.display = 'block';
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');

    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== REVEAL ANIMATIONS =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .education-card').forEach(el => {
    revealObserver.observe(el);
});

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }

    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    updateActiveNav();
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===== PRELOADER (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Remove any preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking for a talented developer? Let\'s connect!', 'font-size: 14px; color: #475569;');
console.log('%c📧 mohamed.boulmaiz@univ-constantine2.dz', 'font-size: 12px; color: #667eea;');

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNav();

    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== SERVICE WORKER (Optional - for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===== ANALYTICS (Optional) =====
// Add your analytics code here
// Example: Google Analytics, Plausible, etc.

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can send errors to an error tracking service here
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTheme,
        animateCounter,
        debounce,
        throttle
    };
}
