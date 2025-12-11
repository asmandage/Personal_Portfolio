// ========================================
// PORTFOLIO JAVASCRIPT - OPTIMIZED VERSION
// ========================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeNavigation();
    initializeTypingAnimation();
    initializeSkillProgress();
    initializeActiveNavigation();
    initializeContactForm();
    initializeAnimations();
    initializeTouchOptimizations();
});

// ========================================
// PRELOADER
// ========================================
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 3000);
}

// ========================================
// NAVIGATION
// ========================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Toggle body scroll
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after click
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        });
    });

    // Navbar background on scroll
    function updateNavbar() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', function() {
        requestAnimationFrame(updateNavbar);
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Helper function to close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// TYPING ANIMATION
// ========================================
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typingElement || !cursorElement) return;
    
    const texts = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Web Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeText() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of typing
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeText();
            }, 2000);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start animation after a short delay
    setTimeout(typeText, 1000);
}

// ========================================
// SKILL PROGRESS ANIMATION
// ========================================
function initializeSkillProgress() {
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelectorAll('.skill-progress');
                skillProgress.forEach((progress, index) => {
                    const width = progress.getAttribute('data-width');
                    setTimeout(() => {
                        progress.style.width = width;
                    }, index * 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
}

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Set initial active link
}

// ========================================
// CONTACT FORM
// ========================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                subject: this.subject.value.trim(),
                message: this.message.value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                throw new Error('All fields are required');
            }
            
            if (!isValidEmail(formData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Create mailto link
            const mailtoLink = createMailtoLink(formData);
            
            // Show success message
            showNotification(
                'Opening your email client to send the message. If it doesn\'t open, please copy the details and email me directly at aniketmandage85@gmail.com',
                'success'
            );
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            showNotification(
                error.message || 'Sorry, there was an error. Please try again or contact me directly at aniketmandage85@gmail.com',
                'error'
            );
        } finally {
            // Reset button state
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1000);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create mailto link helper
function createMailtoLink(formData) {
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        '---\n' +
        'This message was sent from your portfolio contact form.'
    );
    
    return `mailto:aniketmandage85@gmail.com?subject=${subject}&body=${body}`;
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add CSS for animations if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                margin-left: auto;
                transition: transform 0.2s ease;
                border-radius: 4px;
            }
            .notification-close:hover {
                transform: scale(1.2) rotate(90deg);
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initializeAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.about-card, .info-card, .skill-category, .project-card, .contact-card, .contact-form'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// TOUCH OPTIMIZATIONS
// ========================================
function initializeTouchOptimizations() {
    // Add touch class for touch-specific styles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // Improve touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
}

// ========================================
// ERROR HANDLING FOR IMAGES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🚀 Welcome to Aniket Mandage\'s Portfolio!', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with modern HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 14px;');