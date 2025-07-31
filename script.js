// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Language Menu Functionality
const languageBtn = document.querySelector('.language-btn');
const languageDropdown = document.querySelector('.language-dropdown');
const languageOptions = document.querySelectorAll('.language-dropdown a');

// Toggle language dropdown
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.style.opacity = languageDropdown.style.opacity === '1' ? '0' : '1';
    languageDropdown.style.visibility = languageDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
    languageDropdown.style.transform = languageDropdown.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.style.opacity = '0';
        languageDropdown.style.visibility = 'hidden';
        languageDropdown.style.transform = 'translateY(-10px)';
    }
});

// Language switching functionality
languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = option.getAttribute('data-lang');
        
        // Update active state
        languageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update button aria-expanded
        languageBtn.setAttribute('aria-expanded', 'false');
        
        // Change language
        changeLanguage(selectedLang);
        
        // Close dropdown
        languageDropdown.style.opacity = '0';
        languageDropdown.style.visibility = 'hidden';
        languageDropdown.style.transform = 'translateY(-10px)';
        languageDropdown.classList.remove('show');
    });
});

// Language change function
function changeLanguage(lang) {
    // Update title
    const title = document.querySelector('title');
    if (title.getAttribute(`data-${lang}`)) {
        title.textContent = title.getAttribute(`data-${lang}`);
    }
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-' + lang + ']');
    elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Update placeholders for form inputs
            const placeholder = element.getAttribute(`data-${lang}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        } else {
            // Update text content for other elements
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        }
    });
    
    // Update navigation menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const dataAttr = link.getAttribute(`data-${lang}`);
        if (dataAttr) {
            link.textContent = dataAttr;
        }
    });
    
    console.log(`Language changed to: ${lang}`);
}



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Elimino el bloque que maneja el submit del formulario de contacto para permitir el envío normal a Formspree.

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profileCard = document.querySelector('.profile-card');
    
    if (hero && profileCard) {
        const rate = scrolled * -0.5;
        profileCard.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preloader (if needed)
const preloader = document.querySelector('.preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff3333 0%, #ff6666 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 51, 51, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-3px)';
    backToTopBtn.style.boxShadow = '0 8px 25px rgba(255, 51, 51, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 5px 15px rgba(255, 51, 51, 0.3)';
});

// CV Download Button Functionality
const cvBtn = document.querySelector('.cv-btn');
if (cvBtn) {
    cvBtn.addEventListener('click', () => {
        // URL del archivo PDF
        const pdfUrl = 'Diseño sin título.pdf.pdf'; // Cambia esto a la ruta correcta de tu archivo PDF
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Cristopher_llerena_CV.pdf'; // Nombre del archivo que se descargará
        link.click();
    });
}

// Social Links Functionality
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const href = icon.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        } else {
            // Add your social media URLs here
            const iconClass = icon.querySelector('i').className;
            let url = '#';
            
            if (iconClass.includes('linkedin')) {
                url = 'https://www.linkedin.com/in/cristopher-llerena-1a6321358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app';
            } else if (iconClass.includes('github')) {
                url = 'https://github.com/NotchArth';
            } else if (iconClass.includes('envelope')) {
                url = 'mailto:cristopherxs178@gmail.com';
            }
            
            if (url !== '#') {
                window.open(url, '_blank');
            }
        }
    });
}); 