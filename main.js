/**
 * Chroma Studio - Main JavaScript File
 * 
 * This file contains all the interactive functionality for the Chroma Studio website,
 * including animations, form validation, theme switching, and responsive behaviors.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================================================
    // Global Variables
    // ==========================================================================
    
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    const animatedTagline = document.getElementById('animated-tagline');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');
    
    // Taglines for the hero section animation
    const taglines = [
        "Building the future of Roblox experiences",
        "Where creativity meets innovation",
        "Pushing the limits of Roblox",
        "Crafting immersive worlds"
    ];
    
    // ==========================================================================
    // Helper Functions
    // ==========================================================================
    
    /**
     * Debounce function to limit the rate at which a function is called
     * @param {Function} func - The function to debounce
     * @param {number} wait - The time to wait in milliseconds
     * @returns {Function} - The debounced function
     */
    function debounce(func, wait = 10) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} el - The element to check
     * @returns {boolean} - True if the element is in the viewport
     */
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.5 &&
            rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) / 3
        );
    }
    
    // ==========================================================================
    // Theme Switching
    // ==========================================================================
    
    /**
     * Set the theme based on localStorage or preference
     */
    function setTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        
        // Update toggle icons
        const icon = savedTheme === 'dark' ? 'fa-moon' : 'fa-sun';
        themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle icons
        const icon = newTheme === 'dark' ? 'fa-moon' : 'fa-sun';
        themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
        mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    // Initialize theme
    setTheme();
    
    // Event listeners for theme toggles
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    
    /**
     * Toggle the mobile menu
     */
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle between menu and close icon
        if (mobileMenu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            body.style.overflow = 'hidden';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        }
    }
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        });
    });
    
    // Event listener for menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // ==========================================================================
    // Smooth Scrolling
    // ==========================================================================
    
    /**
     * Smooth scroll to a section when a navigation link is clicked
     * @param {Event} e - The click event
     */
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Add event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // ==========================================================================
    // Animated Tagline
    // ==========================================================================
    
    /**
     * Animate the tagline in the hero section by cycling through an array of phrases
     */
    function animateTagline() {
        let currentIndex = 0;
        
        function typeWriter(text, i, callback) {
            if (i < text.length) {
                animatedTagline.innerHTML = text.substring(0, i + 1);
                setTimeout(() => typeWriter(text, i + 1, callback), 100);
            } else if (typeof callback === 'function') {
                setTimeout(callback, 1500);
            }
        }
        
        function eraseText(callback) {
            const text = animatedTagline.innerHTML;
            if (text.length > 0) {
                animatedTagline.innerHTML = text.substring(0, text.length - 1);
                setTimeout(() => eraseText(callback), 50);
            } else if (typeof callback === 'function') {
                setTimeout(callback, 500);
            }
        }
        
        function cycleTaglines() {
            const text = taglines[currentIndex];
            typeWriter(text, 0, () => {
                eraseText(() => {
                    currentIndex = (currentIndex + 1) % taglines.length;
                    cycleTaglines();
                });
            });
        }
        
        cycleTaglines();
    }
    
    // Start the tagline animation
    animateTagline();
    
    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    
    /**
     * Add active class to sections when they come into view
     */
    function checkScroll() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('active');
            }
        });
    }
    
    /**
     * Toggle navbar shadow and back-to-top button based on scroll position
     */
    function handleScroll() {
        // Add shadow to navbar when scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show back-to-top button when scrolled down
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Check for section animations
        checkScroll();
    }
    
    // Initialize scroll animations on page load
    window.addEventListener('load', () => {
        handleScroll();
        checkScroll();
    });
    
    // Add scroll event listeners
    window.addEventListener('scroll', debounce(handleScroll));
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================================================
    // Form Validation
    // ==========================================================================
    
    /**
     * Validate the contact form
     * @param {Event} e - The form submission event
     */
    function validateForm(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Email is required';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate subject
        const subject = document.getElementById('subject');
        if (subject.value === '') {
            document.getElementById('subject-error').textContent = 'Please select a subject';
            document.getElementById('subject-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Message is required';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        }
    }
    
    // Add form validation event listener
    contactForm.addEventListener('submit', validateForm);
    
    // ==========================================================================
    // Project Card Hover Effects
    // ==========================================================================
    
    /**
     * Add tilt effect to project cards on mouse move
     */
    function initProjectCardTilt() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    
    // Initialize project card tilt effects
    initProjectCardTilt();
    
    // ==========================================================================
    // Testimonial Slider
    // ==========================================================================
    
    /**
     * Initialize the testimonial slider with auto-scroll functionality
     */
    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse/touch events for dragging
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Initialize testimonial slider
    initTestimonialSlider();
});
