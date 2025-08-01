// Signup Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initSignupForm();
    initPasswordToggles();
    initCustomCheckbox();
});

// Initialize Signup Form
function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateSignupForm()) {
            handleSignupSubmission();
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
        
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                clearFieldError(this);
            });
        }
    });
}

// Validate entire signup form
function validateSignupForm() {
    const form = document.getElementById('signupForm');
    let isValid = true;
    
    // Get all form fields
    const fullName = form.querySelector('#fullName');
    const email = form.querySelector('#email');
    const userType = form.querySelector('#userType');
    const institution = form.querySelector('#institution');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirmPassword');
    const terms = form.querySelector('#terms');
    
    // Validate each field
    if (!validateField(fullName)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(userType)) isValid = false;
    if (!validateField(institution)) isValid = false;
    if (!validateField(password)) isValid = false;
    if (!validateField(confirmPassword)) isValid = false;
    if (!validateField(terms)) isValid = false;
    
    // Additional validations
    if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    if (!validateEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validatePasswordStrength(password.value)) {
        showFieldError(password, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError(field);
    
    // Required field validation
    if (!value && field.type !== 'checkbox') {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && !field.checked) {
        showFieldError(field, 'You must agree to the Terms of Service and Privacy Policy');
        return false;
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'password':
            if (value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
                return false;
            }
            break;
            
        case 'confirmPassword':
            const password = document.querySelector('#password');
            if (password && value !== password.value) {
                showFieldError(field, 'Passwords do not match');
                return false;
            }
            break;
            
        case 'fullName':
            if (value.length < 2) {
                showFieldError(field, 'Full name must be at least 2 characters long');
                return false;
            }
            break;
            
        case 'institution':
            if (value.length < 2) {
                showFieldError(field, 'Institution name must be at least 2 characters long');
                return false;
            }
            break;
            
        case 'userType':
            if (!value) {
                showFieldError(field, 'Please select your role');
                return false;
            }
            break;
            
        case 'terms':
            if (!field.checked) {
                showFieldError(field, 'You must agree to the Terms of Service and Privacy Policy');
                return false;
            }
            break;
    }
    
    // Show success state
    showFieldSuccess(field);
    return true;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength validation
function validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

// Show field error
function showFieldError(field, message) {
    let wrapper;
    
    if (field.type === 'checkbox') {
        wrapper = field.closest('.checkbox-container') || field.closest('.checkbox-group');
    } else {
        wrapper = field.closest('.input-wrapper');
    }
    
    if (wrapper) {
        wrapper.classList.add('error');
        wrapper.classList.remove('success');
    }
    
    // Remove existing error message
    const existingError = wrapper.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    wrapper.parentNode.appendChild(errorDiv);
}

// Show field success
function showFieldSuccess(field) {
    let wrapper;
    
    if (field.type === 'checkbox') {
        wrapper = field.closest('.checkbox-container') || field.closest('.checkbox-group');
    } else {
        wrapper = field.closest('.input-wrapper');
    }
    
    if (wrapper) {
        wrapper.classList.add('success');
        wrapper.classList.remove('error');
    }
    
    // Remove existing error message
    const existingError = wrapper.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Clear field error
function clearFieldError(field) {
    let wrapper;
    
    if (field.type === 'checkbox') {
        wrapper = field.closest('.checkbox-container') || field.closest('.checkbox-group');
    } else {
        wrapper = field.closest('.input-wrapper');
    }
    
    if (wrapper) {
        wrapper.classList.remove('error', 'success');
    }
    
    const errorMessage = wrapper.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Get field label
function getFieldLabel(fieldName) {
    const labels = {
        'fullName': 'Full Name',
        'email': 'Email Address',
        'password': 'Password',
        'confirmPassword': 'Confirm Password',
        'institution': 'Institution',
        'userType': 'Role',
        'terms': 'Terms and Conditions'
    };
    return labels[fieldName] || fieldName;
}

// Handle signup submission
function handleSignupSubmission() {
    const form = document.getElementById('signupForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    
    // Store user data in localStorage (simulate account creation)
    const users = JSON.parse(localStorage.getItem('assignTrackUsers') || '[]');
    const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        isActive: true
    };
    
    users.push(newUser);
    localStorage.setItem('assignTrackUsers', JSON.stringify(users));
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Simulate API delay
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(form, 'Account created successfully! Redirecting...');
        
        // Redirect based on user type
        setTimeout(() => {
            const userType = userData.userType;
            if (userType === 'faculty') {
                window.location.href = '../dashboards/faculty-dashboard-enhanced.html';
            } else {
                window.location.href = '../dashboards/student-dashboard.html';
            }
        }, 2000);
        
    }, 2000);
}

// Show success message
function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i>${message}`;
    
    form.appendChild(successDiv);
}

// Initialize password toggles
function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Initialize custom checkbox
function initCustomCheckbox() {
    const checkbox = document.querySelector('#terms');
    const customCheckbox = document.querySelector('.custom-checkbox');
    const checkboxContainer = document.querySelector('.checkbox-container');
    
    if (!checkbox || !customCheckbox) return;
    
    // Handle custom checkbox click
    customCheckbox.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
    
    // Handle checkbox change
    checkbox.addEventListener('change', function() {
        clearFieldError(this);
        if (this.checked) {
            showFieldSuccess(this);
        }
    });
    
    // Handle container click for accessibility
    if (checkboxContainer) {
        checkboxContainer.addEventListener('click', function(e) {
            // Don't trigger if clicking on the custom checkbox (already handled)
            if (e.target.closest('.custom-checkbox')) return;
            
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        });
    }
} 