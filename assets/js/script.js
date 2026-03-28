// ===================================
// Header Scroll & Dynamic States
// ===================================
const header = document.querySelector('.header');

const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll(); // Check on load

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const headerEl = document.querySelector('.header');

// Create overlay
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
if (headerEl) {
    headerEl.appendChild(menuOverlay);
}

const toggleMenu = () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMenu);
}
if (menuOverlay) {
    menuOverlay.addEventListener('click', toggleMenu);
}

// Close mobile menu when clicking on a link or hitting Escape
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ===================================
// Reveal Animations (Final Professional Logic)
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            
            // Staggered children reveal
            const staggeredChildren = el.querySelectorAll('.service-item, .service-card, .footer-section, .step-detail, .faq-item');
            
            if (staggeredChildren.length > 0) {
                staggeredChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                        if (child.classList.contains('reveal')) child.classList.add('active');
                    }, index * 100); 
                });
            }
            
            el.classList.add('active');
            revealObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.05, // Trigger earlier
    rootMargin: '0px'
});

// Initialize and handle above-the-fold elements
const initReveal = () => {
    // Reveal group triggers
    document.querySelectorAll('.services-grid, .services-list, .footer-content, .process-steps, .faq-grid').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Individual reveal triggers
    document.querySelectorAll('.reveal').forEach(el => {
        // Immediate reveal if in viewport on load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
            // Also reveal children
            el.querySelectorAll('.service-item, .service-card, .footer-section, .step-detail, .faq-item').forEach((child, index) => {
                setTimeout(() => child.classList.add('active'), index * 100);
            });
            return; // No need to observe
        }
        revealObserver.observe(el);
    });
};

// ===================================
// FAQ Accordion Logic
// ===================================
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active-faq');
            });
            item.classList.toggle('active-faq');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initFAQ();
});

// ===================================
// Back to Top Functionality
// ===================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (window.scrollY <= 400) backToTopBtn.style.display = 'none';
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Smooth Scroll for Internal Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') === '#') return;
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
