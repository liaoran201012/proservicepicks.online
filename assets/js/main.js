/**
 * ProServicePicks - Main JavaScript
 * Interactive features and animations
 */

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ============================================
// Add Animation Delays to Cards
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card.reveal');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const trustItems = document.querySelectorAll('.trust-item.reveal');
    trustItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
});

// ============================================
// CTA Button Ripple Effect
// ============================================
const buttons = document.querySelectorAll('.btn-primary, .btn-card, .btn-nav');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-card, .btn-nav {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Track Scroll Depth (for analytics)
// ============================================
let scrollDepth = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Track milestones
    Object.keys(scrollDepth).forEach(depth => {
        if (scrollPercent >= depth && !scrollDepth[depth]) {
            scrollDepth[depth] = true;
            console.log(`Scroll depth: ${depth}%`);
            // Here you can add analytics tracking
            // Example: gtag('event', 'scroll_depth', { depth: depth });
        }
    });
});

// ============================================
// Mobile Menu Toggle (if needed in future)
// ============================================
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Only create mobile menu on small screens
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle menu');

        navbar.querySelector('.nav-container').appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.innerHTML = menuToggle.classList.contains('active') ? '✕' : '☰';
        });
    }
};

// Initialize mobile menu if needed
window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// ============================================
// Performance: Lazy Load Images (if needed)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Add Floating Animation to Hero Image
// ============================================
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    let floatDirection = 1;
    let floatPosition = 0;

    setInterval(() => {
        floatPosition += floatDirection * 0.5;
        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }
        heroImage.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}

// ============================================
// Animated Counter for Statistics
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const trustStats = document.querySelector('.trust-stats');
if (trustStats) {
    statsObserver.observe(trustStats);
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c👋 Welcome to ProServicePicks!', 'font-size: 20px; font-weight: bold; color: #1dbf73;');
console.log('%cLooking for elite Fiverr professionals? You\'re in the right place!', 'font-size: 14px; color: #666;');

// ============================================
// Google Ads Conversion Tracking
// ============================================
document.addEventListener('click', function (e) {
    // Find the closest anchor tag
    const link = e.target.closest('a');

    // Check if it's a Fiverr affiliate link
    if (link && link.href.includes('go.fiverr.com')) {
        // Fire Google Ads Conversion Event
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17297709178/Ms9MCNiY8NMBEPqwmLhA'
            });
            console.log('Conversion event sent to Google Ads');
        }
    }
});
