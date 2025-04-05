/**
 * Main JavaScript file for Portfolio Website
 * Contains general functionality for all pages
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize variables
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const skillBars = document.querySelectorAll('.skill-progress');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Animate skill bars when in viewport
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') + '%';
            bar.style.width = progress;
        });
    }
    
    // FAQ Accordion
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlider && testimonialCards.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected slide and activate corresponding dot
            testimonialCards[index].style.display = 'block';
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto slide change
        setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialCards.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000);
    }
    
    // Scroll Reveal Animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
        
        // Animate skill bars when they come into view
        const skillSection = document.querySelector('.skills');
        if (skillSection) {
            const sectionTop = skillSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                animateSkillBars();
            }
        }
    }
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on page load
    revealOnScroll();
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '') {
                showError('name', 'Name is required');
                return;
            }
            
            if (email === '') {
                showError('email', 'Email is required');
                return;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email');
                return;
            }
            
            if (subject === '') {
                showError('subject', 'Subject is required');
                return;
            }
            
            if (message === '') {
                showError('message', 'Message is required');
                return;
            }
            
            // If validation passes, show success message
            // In a real application, you would send the form data to a server here
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                const errorElement = group.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Helper function to show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove any existing error messages
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to form group
        formGroup.classList.add('error');
        
        // Create and append error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
        
        // Focus on the field with error
        field.focus();
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add CSS class to body based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.body.classList.add(currentPage.split('.')[0] + '-page');
    
    // Typed.js is initialized in the HTML file for the home page
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .about-image, .about-text, .skill-category, .timeline-item');
    
    animatedElements.forEach((element, index) => {
        // Add different animation classes based on element type or position
        if (element.classList.contains('service-card') || element.classList.contains('project-card')) {
            element.classList.add('fade-in');
            element.style.animationDelay = (index % 3) * 0.2 + 's';
        } else if (element.classList.contains('about-image')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('about-text')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('slide-up');
            element.style.animationDelay = (index % 2) * 0.2 + 's';
        } else if (element.classList.contains('timeline-item')) {
            element.classList.add('fade-in');
            element.style.animationDelay = index * 0.2 + 's';
        } else {
            element.classList.add('fade-in');
        }
    });
});
