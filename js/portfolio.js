/**
 * Portfolio JavaScript file
 * Contains portfolio-specific functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
    
    // Portfolio Modal Functionality
    const modalLinks = document.querySelectorAll('.project-link[data-modal]');
    const modalContainer = document.querySelector('.modal-container');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    if (modalLinks.length > 0 && modalContainer && modals.length > 0) {
        // Open modal when clicking on project link
        modalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get modal ID
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    // Show modal container
                    modalContainer.style.display = 'flex';
                    
                    // Hide all modals
                    modals.forEach(m => {
                        m.style.display = 'none';
                    });
                    
                    // Show selected modal
                    modal.style.display = 'block';
                    
                    // Prevent body scrolling
                    document.body.style.overflow = 'hidden';
                    
                    // Add animation class
                    setTimeout(() => {
                        modal.classList.add('active');
                    }, 10);
                }
            });
        });
        
        // Close modal when clicking on close button
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // Close modal when clicking outside of modal content
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                closeModal();
            }
        });
        
        // Close modal when pressing ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Function to close modal
        function closeModal() {
            // Remove active class from modals
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Hide modal container after animation
            setTimeout(() => {
                modalContainer.style.display = 'none';
                
                // Allow body scrolling
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Lightbox Gallery for Portfolio Images
    const projectImages = document.querySelectorAll('.project-img img');
    
    if (projectImages.length > 0) {
        projectImages.forEach(image => {
            image.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImage = document.createElement('img');
                lightboxImage.src = this.src;
                
                const closeButton = document.createElement('span');
                closeButton.className = 'lightbox-close';
                closeButton.innerHTML = '&times;';
                
                // Append elements to DOM
                lightboxContent.appendChild(lightboxImage);
                lightboxContent.appendChild(closeButton);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
                
                // Add animation class
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                
                // Close lightbox when clicking on close button
                closeButton.addEventListener('click', function() {
                    closeLightbox(lightbox);
                });
                
                // Close lightbox when clicking outside of image
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox(lightbox);
                    }
                });
                
                // Close lightbox when pressing ESC key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeLightbox(lightbox);
                    }
                });
            });
        });
        
        // Function to close lightbox
        function closeLightbox(lightbox) {
            lightbox.classList.remove('active');
            
            // Remove lightbox after animation
            setTimeout(() => {
                document.body.removeChild(lightbox);
                
                // Allow body scrolling
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Add CSS styles for lightbox if not already in CSS files
    if (!document.getElementById('lightbox-styles')) {
        const lightboxStyles = document.createElement('style');
        lightboxStyles.id = 'lightbox-styles';
        lightboxStyles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                border: 5px solid #fff;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 30px;
                color: #fff;
                cursor: pointer;
            }
            
            .modal {
                transform: scale(0.9);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .modal.active {
                transform: scale(1);
                opacity: 1;
            }
        `;
        document.head.appendChild(lightboxStyles);
    }
    
    // Initialize Isotope for portfolio grid if available
    if (typeof Isotope !== 'undefined') {
        const portfolioGrid = document.querySelector('.projects-grid');
        
        if (portfolioGrid) {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.project-item',
                layoutMode: 'fitRows'
            });
            
            // Filter items on button click
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filterValue = this.getAttribute('data-filter');
                    iso.arrange({
                        filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
                    });
                });
            });
        }
    }
});
