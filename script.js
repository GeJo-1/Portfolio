// 1. MOBILE MENU TOGGLE
const menuIcon = document.querySelector("#menu");
const navLinks = document.querySelector("#links");
const allLinks = document.querySelectorAll("#links a"); // Select all links inside the menu

// Toggle menu on icon click
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

// Close menu when a link is clicked
allLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navLinks.classList.remove('active');
    });
});

// 2. REVEAL ON SCROLL (Intersection Observer)
const observerOptions = {
    threshold: 0.15, // Triggers when 15% of the section is visible
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    revealObserver.observe(section);
});

// 3. TYPING EFFECT FOR HERO SECTION
const typingText = document.querySelector(".typing-text");
const roles = ["Web Developer", "IT Solutions Specialist", "UI/UX Designer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
window.onload = () => {
    type();
};

// 4. IMPROVED MUSIC CONTROL WITH VISUALIZER
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const visualizer = document.querySelector('.visualizer');
const musicText = document.getElementById('music-text');

music.volume = 0.3; // Gentle start volume

toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(err => console.log("User interaction required: ", err));
        visualizer.classList.add('playing');
        musicText.textContent = 'Pause';
    } else {
        music.pause();
        visualizer.classList.remove('playing');
        musicText.textContent = 'Play Music';
    }
});

// 5. NAVBAR SCROLL EFFECT
window.onscroll = () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(10, 10, 10, 0.95)";
        nav.style.padding = "1rem 8%";
    } else {
        nav.style.background = "rgba(15, 15, 15, 0.7)";
        nav.style.padding = "1.5rem 8%";
    }
};
