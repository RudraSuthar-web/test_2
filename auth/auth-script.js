// Authentication Script for AssignTrack
// Handles signup, signin, and role-based routing with localStorage

document.addEventListener('DOMContentLoaded', function() {
    initPasswordToggles();
    initFormValidation();
    initFormSubmission();
    initSocialAuth();
    initAnimations();
    initPasswordStrength();
});

// Password Toggle Functionality
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

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        if (!validateEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Password validation
    if (fieldName === 'password' && value) {
        if (value.length < 8) {
            showFieldError(field, 'Password must be at least 8 characters long');
            return false;
        }
    }
    
    // Confirm password validation
    if (fieldName === 'confirmPassword' && value) {
        const password = document.getElementById('password')?.value;
        if (value !== password) {
            showFieldError(field, 'Passwords do not match');
            return false;
        }
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
            showFieldError(field, 'You must agree to the terms and conditions');
            return false;
        }
    }
    
    // Show success state
    showFieldSuccess(field);
    return true;
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Field Error
function showFieldError(field, message) {
    let wrapper = field.closest('.input-wrapper');
    
    // Handle checkboxes and other elements without input-wrapper
    if (!wrapper) {
        wrapper = field.closest('.form-group') || field.parentElement;
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff5f56;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    `;
    
    wrapper.appendChild(errorDiv);
    
    // Only set border color for input fields
    if (field.tagName === 'INPUT' || field.tagName === 'SELECT') {
        field.style.borderColor = '#ff5f56';
    }
}

// Show Field Success
function showFieldSuccess(field) {
    // Only set border color for input fields
    if (field.tagName === 'INPUT' || field.tagName === 'SELECT') {
        field.style.borderColor = '#27ca3f';
    }
}

// Clear Field Error
function clearFieldError(field) {
    let wrapper = field.closest('.input-wrapper');
    
    // Handle checkboxes and other elements without input-wrapper
    if (!wrapper) {
        wrapper = field.closest('.form-group') || field.parentElement;
    }
    
    const errorDiv = wrapper.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Only clear border color for input fields
    if (field.tagName === 'INPUT' || field.tagName === 'SELECT') {
        field.style.borderColor = '';
    }
}

// Get Field Label
function getFieldLabel(fieldName) {
    const labels = {
        fullName: 'Full Name',
        email: 'Email Address',
        userType: 'Role',
        institution: 'Institution',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        agree: 'Terms Agreement'
    };
    return labels[fieldName] || fieldName;
}

// Form Submission Handler
function initFormSubmission() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach((form, index) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
    });
}

// Validate Entire Form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    
    inputs.forEach((input, index) => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Handle Form Submission
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        if (form.id === 'signupForm') {
            // Handle signup
            handleSignup(data);
        } else {
            // Handle signin
            handleSignin(data);
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
    }, 2000);
}

// Handle Signup
function handleSignup(data) {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('assignTrackUsers') || '[]');
    
    const userExists = existingUsers.find(user => user.email === data.email);
    
    if (userExists) {
        showToast('User with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        userType: data.userType,
        institution: data.institution,
        password: data.password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    // Save user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('assignTrackUsers', JSON.stringify(existingUsers));
    
    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        userType: newUser.userType,
        institution: newUser.institution
    }));
    
    showToast('Account created successfully! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        redirectBasedOnRole(newUser.userType);
    }, 2000);
}

// Handle Signin
function handleSignin(data) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('assignTrackUsers') || '[]');
    const user = users.find(u => u.email === data.email && u.password === data.password);
    
    if (!user) {
        showToast('Invalid email or password', 'error');
        return;
    }
    
    // Check if role matches
    if (user.userType !== data.userType) {
        showToast(`Please select the correct role. You are registered as a ${user.userType}`, 'error');
        return;
    }
    
    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        institution: user.institution
    }));
    
    showToast('Welcome back! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        redirectBasedOnRole(user.userType);
    }, 2000);
}

// Redirect Based on Role
function redirectBasedOnRole(userType) {
    if (userType === 'faculty') {
        window.location.href = '../dashboards/faculty-dashboard-enhanced.html';
    } else {
        window.location.href = '../dashboards/student-dashboard.html';
    }
}

// Social Authentication
function initSocialAuth() {
    const socialButtons = document.querySelectorAll('.btn-social');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get role for social auth
            const roleField = document.getElementById('socialUserType') || document.getElementById('userType');
            const userType = roleField?.value;
            
            if (!userType) {
                showToast('Please select your role first', 'error');
                return;
            }
            
            const provider = this.classList.contains('btn-google') ? 'Google' : 'Microsoft';
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate social auth
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Create or get user from social auth
                handleSocialAuth(provider, userType);
                
            }, 2000);
        });
    });
}

// Handle Social Authentication
function handleSocialAuth(provider, userType) {
    // In a real app, this would handle OAuth flow
    // For demo purposes, we'll create a mock user
    
    const mockUser = {
        id: Date.now().toString(),
        fullName: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
        email: `demo.${userType}@example.com`,
        userType: userType,
        institution: 'Demo University',
        provider: provider,
        createdAt: new Date().toISOString()
    };
    
    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify({
        id: mockUser.id,
        fullName: mockUser.fullName,
        email: mockUser.email,
        userType: mockUser.userType,
        institution: mockUser.institution
    }));
    
    showToast(`Successfully connected with ${provider}! Redirecting...`, 'success');
    
    setTimeout(() => {
        redirectBasedOnRole(userType);
    }, 1500);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--background-primary, #ffffff);
        color: var(--text-primary, #333333);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'}-color, #4285f4);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Get Toast Icon
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Animations
function initAnimations() {
    // Animate form elements on load
    const formElements = document.querySelectorAll('.form-group, .auth-divider, .social-auth, .auth-footer');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate visual elements
    const visualElements = document.querySelectorAll('.feature-highlight');
    
    visualElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, (index + 1) * 200);
    });
}

// Password Strength Indicator
function initPasswordStrength() {
    const passwordInput = document.querySelector('#password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updatePasswordStrengthIndicator(strength);
    });
}

// Calculate Password Strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    
    return score;
}

// Update Password Strength Indicator
function updatePasswordStrengthIndicator(strength) {
    const wrapper = document.querySelector('#password').closest('.input-wrapper');
    const existingIndicator = wrapper.parentNode.querySelector('.password-strength');
    
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (strength === 0) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'password-strength';
    
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['#ff5f56', '#ff8c00', '#ffbd2e', '#27ca3f', '#27ca3f'];
    
    indicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${strengthColor[strength - 1]};"></div>
        </div>
        <span style="color: ${strengthColor[strength - 1]}; font-size: 0.875rem;">${strengthText[strength - 1]}</span>
    `;
    
    indicator.style.cssText = `
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const strengthBar = indicator.querySelector('.strength-bar');
    strengthBar.style.cssText = `
        flex: 1;
        height: 4px;
        background-color: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
    `;
    
    const strengthFill = indicator.querySelector('.strength-fill');
    strengthFill.style.cssText = `
        height: 100%;
        transition: width 0.3s ease;
    `;
    
    wrapper.parentNode.appendChild(indicator);
}

// Utility Functions

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if user has specific role
function hasRole(role) {
    const user = getCurrentUser();
    return user && user.userType === role;
}

// Redirect if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'signin.html';
        return false;
    }
    return true;
}

// Redirect if not correct role
function requireRole(role) {
    if (!requireAuth()) return false;
    
    const user = getCurrentUser();
    if (user.userType !== role) {
        showToast(`Access denied. This page is for ${role}s only.`, 'error');
        setTimeout(() => {
            redirectBasedOnRole(user.userType);
        }, 2000);
        return false;
    }
    return true;
}

// Export functions for use in other scripts
window.AuthUtils = {
    isAuthenticated,
    getCurrentUser,
    logout,
    hasRole,
    requireAuth,
    requireRole,
    showToast
}; 