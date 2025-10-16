// 🚀 LIGHTNING-FAST PORTFOLIO JAVASCRIPT - OPTIMIZED FOR SPEED

// Modern Loader Control
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // Show loader initially
    loader.style.display = 'flex';
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        // Add a small delay for better UX
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5 second loader display
    });
    
    // Fallback: hide loader after 3 seconds regardless
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 3000);
}

// Fast Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
    } else {
            navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Fast Animations
function initializeAnimations() {
    // Simple intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .info-card, .about-skills, .contact-form, .tech-stack');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Fast Skill Circles Animation
function initializeSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percentage = circle.dataset.percentage;
                animateSkillCircle(circle, percentage);
                skillObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    skillCircles.forEach(circle => {
        skillObserver.observe(circle);
    });
}

function animateSkillCircle(circle, percentage) {
    const percentageElement = circle.querySelector('.skill-percentage');
    let currentPercentage = 0;
    const targetPercentage = parseInt(percentage);
    const increment = targetPercentage / 30; // Faster animation
    
    const animation = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(animation);
        }
        
        const angle = (currentPercentage / 100) * 360;
        circle.style.background = `conic-gradient(#d4af37 ${angle}deg, rgba(212, 175, 55, 0.2) ${angle}deg)`;
        percentageElement.textContent = `${Math.round(currentPercentage)}%`;
    }, 50);
}

// Fast Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Simple loading animation
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                // Get form data
                const formData = {
                    name: this.name.value,
                    email: this.email.value,
                    subject: this.subject.value,
                    message: this.message.value
                };
                
                // Validate form data
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    throw new Error('All fields are required');
                }
                
                if (!isValidEmail(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }
                
                // Create mailto link
                const mailtoLink = createMailtoLink(formData);
                
                // Show success message
                showNotification('Opening your email client to send the message. If it doesn\'t open, please copy the details and email me directly at aniketmandage85@gmail.com', 'success');
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                setTimeout(() => {
    this.reset();
                }, 2000);
                
            } catch (error) {
                console.error('Error:', error);
                showNotification(error.message || 'Sorry, there was an error. Please try again or contact me directly at aniketmandage85@gmail.com', 'error');
            } finally {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// Create mailto link
function createMailtoLink(formData) {
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
    `);
    
    return `mailto:aniketmandage85@gmail.com?subject=${subject}&body=${body}`;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fast Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Fast Scroll Effects
function initializeScrollEffects() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add CSS for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
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
    }
    
    .notification-close:hover {
        transform: scale(1.2) rotate(90deg);
    }
    
    .nav-link.active {
        color: white;
        background: rgba(255, 255, 255, 0.1);
    }
`;

document.head.appendChild(styleSheet);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events with debouncing
const debouncedScrollHandler = debounce(function() {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
  });
});

    // Initialize all fast portfolio functionality
    initializeLoader();
    initializeNavigation();
    initializeAnimations();
    initializeSkillCircles();
    initializeContactForm();
    initializeScrollEffects();
});

// Fast console welcome message
console.log('%c🚀 Welcome to Aniket Mandage\'s Lightning-Fast Portfolio!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript - Optimized for maximum speed!', 'color: #7c3aed; font-size: 14px;');
console.log('%cThis portfolio is optimized for lightning-fast performance!', 'color: #06b6d4; font-size: 12px;');