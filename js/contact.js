/**
 * Contact JavaScript file
 * Contains contact form validation and submission functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Get contact form element
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Form validation and submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Get field values
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim();
            const message = messageField.value.trim();
            
            // Validate form fields
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            // Validate email
            if (email === '') {
                showError(emailField, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            // Validate subject
            if (subject === '') {
                showError(subjectField, 'Please enter a subject');
                isValid = false;
            } else {
                removeError(subjectField);
            }
            
            // Validate message
            if (message === '') {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else if (message.length < 20) {
                showError(messageField, 'Your message should be at least 20 characters');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                
                // Show loading indicator
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission delay
                setTimeout(function() {
                    // Hide loading indicator
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Real-time validation for email field
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const email = this.value.trim();
                
                if (email !== '' && !isValidEmail(email)) {
                    showError(this, 'Please enter a valid email address');
                } else {
                    removeError(this);
                }
            });
        }
        
        // Character counter for message field
        const messageField = document.getElementById('message');
        if (messageField) {
            // Create character counter element
            const charCounter = document.createElement('div');
            charCounter.className = 'char-counter';
            charCounter.textContent = '0 / 20 characters (minimum)';
            
            // Insert counter after message field
            messageField.parentNode.insertBefore(charCounter, messageField.nextSibling);
            
            // Update counter on input
            messageField.addEventListener('input', function() {
                const count = this.value.length;
                const minCount = 20;
                
                if (count < minCount) {
                    charCounter.textContent = `${count} / ${minCount} characters (minimum)`;
                    charCounter.style.color = '#dc3545';
                } else {
                    charCounter.textContent = `${count} characters`;
                    charCounter.style.color = '#28a745';
                }
            });
        }
    }
    
    // Helper function to show error message
    function showError(field, message) {
        // Get the parent form group
        const formGroup = field.closest('.form-group');
        
        // Remove any existing error messages
        removeError(field);
        
        // Add error class to form group
        formGroup.classList.add('error');
        
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
        
        // Highlight the field
        field.style.borderColor = '#dc3545';
    }
    
    // Helper function to remove error message
    function removeError(field) {
        // Get the parent form group
        const formGroup = field.closest('.form-group');
        
        // Remove error class from form group
        formGroup.classList.remove('error');
        
        // Remove any existing error messages
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Reset field style
        field.style.borderColor = '';
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show success message
    function showSuccessMessage() {
        // Remove any existing success message
        const existingSuccess = document.querySelector('.form-success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We\'ll get back to you soon.';
        
        // Insert success message before the form
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Add CSS for success message if not in CSS file
        if (!document.getElementById('contact-form-styles')) {
            const styles = document.createElement('style');
            styles.id = 'contact-form-styles';
            styles.textContent = `
                .form-success-message {
                    background-color: #d4edda;
                    color: #155724;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                }
                
                .form-success-message i {
                    margin-right: 10px;
                    font-size: 20px;
                }
                
                .error-message {
                    color: #dc3545;
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
                
                .form-group.error input,
                .form-group.error textarea {
                    border-color: #dc3545;
                }
                
                .char-counter {
                    font-size: 0.8rem;
                    color: #6c757d;
                    margin-top: 5px;
                    text-align: right;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Remove success message after 5 seconds
        setTimeout(function() {
            successMessage.remove();
        }, 5000);
    }
    
    // Google Maps Integration (if API key is available)
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer && typeof google !== 'undefined' && google.maps) {
        // Replace placeholder with actual Google Map
        mapContainer.innerHTML = '';
        
        // Create map element
        const mapElement = document.createElement('div');
        mapElement.id = 'google-map';
        mapElement.style.width = '100%';
        mapElement.style.height = '400px';
        mapContainer.appendChild(mapElement);
        
        // Initialize map
        const map = new google.maps.Map(mapElement, {
            center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City (replace with your location)
            zoom: 14,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": "2.00"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#9c9c9c"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7b7b7b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#c8d7d4"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#070707"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                }
            ]
        });
        
        // Add marker
        const marker = new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0060 }, // Default to New York City (replace with your location)
            map: map,
            title: 'My Location',
            animation: google.maps.Animation.DROP
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="padding: 10px;"><h4 style="margin: 0 0 5px;">My Office</h4><p style="margin: 0;">123 Main Street, New York, NY</p></div>'
        });
        
        // Open info window when marker is clicked
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
});
