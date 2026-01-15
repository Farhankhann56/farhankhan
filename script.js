// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
    easing: 'ease-out-cubic'
});

// Theme Toggle with smooth transition
const themeToggle = document.getElementById('themeToggle');

if (!themeToggle) {
    console.warn('Theme toggle button not found!');
} else {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');

        // Icon change
        themeToggle.querySelector('i').classList.toggle('fa-moon', !isDark);
        themeToggle.querySelector('i').classList.toggle('fa-sun', isDark);

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Optional: very smooth background transition
        gsap.to('body', {
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Optional: Close menu when clicking a link (good UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect + shadow
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});


// Skills horizontal bar animation
document.querySelectorAll('.skill-row').forEach(row => {
    const bar = row.querySelector('.progress-bar');
    const percent = parseInt(row.querySelector('.progress-value').textContent) || 0;

    gsap.to(bar, {
        width: percent + '%',
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Active navigation link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 220) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Particles.js background (hero section)
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#6366f1" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6366f1",
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Optional: Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});