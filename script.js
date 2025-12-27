// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderDots = document.getElementById('sliderDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

if (slides.length > 0 && sliderDots) {
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlideHandler() {
        showSlide(currentSlide + 1);
    }

    function prevSlideHandler() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
    }

    // Event listeners for slider buttons
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', nextSlideHandler);
    }
    
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', prevSlideHandler);
    }

    // Auto slide every 5 seconds
    let autoSlide = setInterval(nextSlideHandler, 5000);

    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        heroSlider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlideHandler, 5000);
        });
    }

    // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlideHandler();
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlideHandler, 5000);
        } else if (e.key === 'ArrowRight') {
            nextSlideHandler();
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlideHandler, 5000);
        }
    });
}

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.program-card, .quick-access-item, .feature-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Dropdown menu for mobile
if (window.innerWidth <= 768) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });
        }
    });
}

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    }
});

console.log('ACE Cambodia website loaded successfully!');
