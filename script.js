// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
            let isValid = true;
            let errorMessage = '';

            requiredFields.forEach(field => {
                if (!formObject[field] || formObject[field].trim() === '') {
                    isValid = false;
                    errorMessage += `${field.charAt(0).toUpperCase() + field.slice(1)} is required.\n`;
                }
            });

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.email && !emailRegex.test(formObject.email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }

            // Validate phone number (basic validation)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (formObject.phone && !phoneRegex.test(formObject.phone.replace(/\s+/g, ''))) {
                isValid = false;
                errorMessage += 'Please enter a valid phone number.\n';
            }

            // Check consent checkbox
            if (!document.getElementById('consent').checked) {
                isValid = false;
                errorMessage += 'Please agree to receive information.\n';
            }

            if (!isValid) {
                alert(errorMessage);
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);

            // In a real application, you would send the data to your server
            console.log('Form submitted:', formObject);
        });
    }
});

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .facility-card, .service-card, .university-card, .stat-card, .choose-item');
    
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Counter Animation for Statistics
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target.toLocaleString());
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current).toLocaleString());
            }
        }, 1);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        lastScrollY = window.scrollY;
    });
});

// Form Field Validation (Real-time)
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    // Real-time email validation
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#dc2626';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '#059669';
                removeFieldError(this);
            }
        });
    });

    // Real-time phone validation
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Allow only numbers, spaces, hyphens, and plus sign
            this.value = this.value.replace(/[^\d\s\-\+]/g, '');
        });

        input.addEventListener('blur', function() {
            const phoneRegex = /^[\+]?[1-9][\d\s\-]{7,15}$/;
            if (this.value && !phoneRegex.test(this.value)) {
                this.style.borderColor = '#dc2626';
                showFieldError(this, 'Please enter a valid phone number');
            } else if (this.value) {
                this.style.borderColor = '#059669';
                removeFieldError(this);
            }
        });
    });

    function showFieldError(field, message) {
        removeFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
});

// Loading Screen (Optional)
document.addEventListener('DOMContentLoaded', function() {
    // Simple loading animation for page transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target !== '_blank') {
                const loadingOverlay = document.createElement('div');
                loadingOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                `;
                loadingOverlay.innerHTML = '<div class="loading"></div>';
                document.body.appendChild(loadingOverlay);

                // Remove loading overlay after a short delay
                setTimeout(() => {
                    if (document.body.contains(loadingOverlay)) {
                        document.body.removeChild(loadingOverlay);
                    }
                }, 500);
            }
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Parallax Effect for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// University Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const universityCards = document.querySelectorAll('.university-card');
    
    universityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Search Functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
}

// Print Functionality
function printPage() {
    window.print();
}

// Share Functionality
function shareContent(platform, url = window.location.href, title = document.title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Cookie Consent (Basic Implementation)
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1f2937;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 9998;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;
        
        cookieBanner.innerHTML = `
            <p style="margin: 0 0 1rem 0;">We use cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.</p>
            <button onclick="acceptCookies()" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Accept</button>
            <button onclick="declineCookies()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-left: 1rem;">Decline</button>
        `;
        
        document.body.appendChild(cookieBanner);
        
        setTimeout(() => {
            cookieBanner.style.transform = 'translateY(0)';
        }, 1000);
        
        window.acceptCookies = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.remove();
        };
        
        window.declineCookies = function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.remove();
        };
    }
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels where missing
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', 'Image');
    });
});

// Performance Monitoring
document.addEventListener('DOMContentLoaded', function() {
    // Simple performance logging
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // You can send this data to analytics service
        if (loadTime > 3000) {
            console.warn('Page load time is over 3 seconds. Consider optimization.');
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // In production, you might want to send error reports to a service
});

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('UMA Website loaded successfully!');
    
    // You can add initialization code for third-party libraries here
    // initializeAnalytics();
    // initializeChatWidget();
    // initializeNotifications();
});