// 1. MOBILE MENU TOGGLE
const menuIcon = document.querySelector("#menu");
const navLinks = document.querySelector("#links");
const allLinks = document.querySelectorAll("#links a"); 

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
    threshold: 0.15, 
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
        typeSpeed = 2000; 
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

music.volume = 0.3; 

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

// 6. DYNAMIC VIDEO MODAL LOGIC
const videoTriggers = document.querySelectorAll('.eden-video-trigger');
const videoModal = document.getElementById('video-modal');
const closeModal = document.querySelector('.close-modal');
const popupVideo = document.getElementById('popup-video');

if (videoTriggers.length > 0 && videoModal && closeModal && popupVideo) {
    const popupSource = popupVideo.querySelector('source');
    
    // Loop through all project video triggers
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Get the specific video file name from the clicked card
            const videoSrc = trigger.getAttribute('data-video');
            popupSource.src = videoSrc;
            popupVideo.load(); // Load the new video
            
            videoModal.style.display = 'block';
            popupVideo.currentTime = 0; 
            popupVideo.play();
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        popupVideo.pause();
    });

    // Close if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            popupVideo.pause();
        }
    });
}

// 7. INITIALIZE 3D VANTA BACKGROUND
if (typeof VANTA !== 'undefined') {
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x6cff52,
        backgroundColor: 0x050505,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
    });
}

// Check if the user is on a touch device (Phone/Tablet)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// 8. CUSTOM NEON CURSOR (ONLY FOR NON-TOUCH DEVICES)
if (!isTouchDevice) {
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Trailing effect using animate
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover states for cursor on links/buttons
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .eden-video-trigger, i');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(108, 255, 82, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// 9. 3D TILT EFFECT ON CARDS (DISABLED ON MOBILE FOR SMOOTH SCROLLING)
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".bento-item, .project-card, .contact-card"), {
        max: isTouchDevice ? 0 : 8, // 0 tilt on mobile, 8 on desktop
        speed: 400,
        glare: !isTouchDevice,      // Disable glare on mobile
        "max-glare": 0.2,
        scale: isTouchDevice ? 1 : 1.02 // Disable scale bump on mobile
    });
}

// 10. SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressHeight = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progressHeight + "%";
});