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

// ========== Deadline Countdown Timer ==========
(function () {
    // Using a more Safari-compatible date format
    const DEADLINE = new Date(2026, 4, 7, 23, 59, 59).getTime(); // May 7, 2026

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const timerEl = document.getElementById('deadline-timer');

    if (!daysEl || !hoursEl || !minutesEl || !timerEl) {
        console.warn('Timer elements not found');
        return;
    }

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateTimer() {
        const now = Date.now();
        let diff = DEADLINE - now;

        if (isNaN(diff) || diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(mins);
    }

    function checkScroll() {
        const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPos > 300) {
            timerEl.classList.add('visible');
            window.removeEventListener('scroll', checkScroll);
        }
    }

    // Update immediately and every second
    updateTimer();
    setInterval(updateTimer, 1000);

    // Initial check and scroll listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
})();
