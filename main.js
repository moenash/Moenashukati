// Intersection Observer for Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before/after scroll
    });

    revealElements.forEach(el => observer.observe(el));
});

// Smooth Scroll for Navigation
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for the sticky header
                behavior: 'smooth'
            });
        }
    });
});

const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.padding = '0.75rem 0';
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.padding = '1.25rem 0';
        nav.style.backgroundColor = 'rgba(17, 17, 17, 0.7)';
    }
});
