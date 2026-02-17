// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
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

// Newsletter form submission
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.cssText = `
                background-color: #28a745;
                color: white;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
            `;
            
            this.appendChild(successMessage);
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'newsletter-error';
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.style.cssText = `
                background-color: #dc3545;
                color: white;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                text-align: center;
            `;
            
            this.appendChild(errorMessage);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
});

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (!isNaN(numericValue)) {
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(currentValue).toLocaleString() + '+';
                    }, 30);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.initiative-card, .news-card, .philosophy-item, .timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Contact form validation (for contact page)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    
                    // Add error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'field-error';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 5px;';
                    
                    if (!input.parentNode.querySelector('.field-error')) {
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.style.borderColor = '#28a745';
                    const errorMsg = input.parentNode.querySelector('.field-error');
                    if (errorMsg) errorMsg.remove();
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            if (emailInput.value && !emailInput.value.includes('@')) {
                isValid = false;
                emailInput.style.borderColor = '#dc3545';
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <h3>Thank you for your message!</h3>
                    <p>We will get back to you within 24-48 business hours.</p>
                `;
                successMessage.style.cssText = `
                    background-color: #28a745;
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    text-align: center;
                `;
                
                this.parentNode.insertBefore(successMessage, this);
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightbox.addEventListener('click', function() {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    animateOnScroll();
    headerScrollEffect();
    initContactForm();
    initGalleryLightbox();
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for hamburger menu animation
const style = document.createElement('style');
style.textContent = `
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
