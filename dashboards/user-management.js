// User Management System for AssignTrack Faculty Dashboard

class UserManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.checkAuthentication();
        this.updateUI();
    }

    // Authentication State Management
    loadUserFromStorage() {
        try {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            this.clearUserData();
        }
    }

    saveUserToStorage(userData) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUser = userData;
            this.isAuthenticated = true;
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    clearUserData() {
        try {
            localStorage.removeItem('currentUser');
            this.currentUser = null;
            this.isAuthenticated = false;
        } catch (error) {
            console.error('Error clearing user data:', error);
        }
    }

    checkAuthentication() {
        if (!this.isAuthenticated || !this.currentUser) {
            // Don't redirect immediately, just return false
            // This allows the dashboard to load and show appropriate UI
            return false;
        }
        return true;
    }

    requireAuthentication() {
        if (!this.checkAuthentication()) {
            // Redirect to login if not authenticated
            window.location.href = '../auth/signin.html';
            return false;
        }
        return true;
    }

    // User Data Management
    getUser() {
        return this.currentUser;
    }

    getUserDisplayName() {
        if (!this.currentUser) return 'Guest';
        
        const { firstName, lastName, title } = this.currentUser;
        if (title && firstName && lastName) {
            return `${title} ${firstName} ${lastName}`;
        } else if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        } else if (firstName) {
            return firstName;
        } else {
            return 'Faculty Member';
        }
    }

    getUserInitials() {
        if (!this.currentUser) return 'G';
        
        const { firstName, lastName } = this.currentUser;
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        } else if (firstName) {
            return firstName.charAt(0).toUpperCase();
        } else {
            return 'F';
        }
    }

    getUserRole() {
        if (!this.currentUser) return 'Guest';
        return this.currentUser.department || 'Faculty';
    }

    getUserEmail() {
        if (!this.currentUser) return '';
        return this.currentUser.email || '';
    }

    getUserAvatar() {
        if (!this.currentUser) return null;
        return this.currentUser.avatar || null;
    }

    // Profile Management
    updateProfile(profileData) {
        if (!this.currentUser) return false;

        try {
            const updatedUser = { ...this.currentUser, ...profileData };
            this.saveUserToStorage(updatedUser);
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Error updating profile:', error);
            return false;
        }
    }

    updatePassword(newPassword) {
        if (!this.currentUser) return false;

        try {
            const updatedUser = { ...this.currentUser, password: newPassword };
            this.saveUserToStorage(updatedUser);
            return true;
        } catch (error) {
            console.error('Error updating password:', error);
            return false;
        }
    }

    updateAvatar(avatarUrl) {
        if (!this.currentUser) return false;

        try {
            const updatedUser = { ...this.currentUser, avatar: avatarUrl };
            this.saveUserToStorage(updatedUser);
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Error updating avatar:', error);
            return false;
        }
    }

    // UI Updates
    updateUI() {
        this.updateSidebarUserInfo();
        this.updateHeaderUserInfo();
        this.updateProfilePage();
    }

    updateSidebarUserInfo() {
        const userAvatar = document.querySelector('.sidebar .user-avatar');
        const userName = document.querySelector('.sidebar .user-name');
        const userRole = document.querySelector('.sidebar .user-role');

        if (userAvatar) {
            if (this.currentUser?.avatar) {
                userAvatar.src = this.currentUser.avatar;
                userAvatar.alt = this.getUserDisplayName();
            } else {
                userAvatar.src = `https://via.placeholder.com/40x40/333333/ffffff?text=${this.getUserInitials()}`;
                userAvatar.alt = this.getUserDisplayName();
            }
        }

        if (userName) {
            userName.textContent = this.getUserDisplayName();
        }

        if (userRole) {
            userRole.textContent = this.getUserRole();
        }
    }

    updateHeaderUserInfo() {
        const headerAvatar = document.querySelector('.top-nav .user-avatar');
        const headerUserName = document.querySelector('.top-nav .user-name');

        if (headerAvatar) {
            if (this.currentUser?.avatar) {
                headerAvatar.src = this.currentUser.avatar;
                headerAvatar.alt = this.getUserDisplayName();
            } else {
                headerAvatar.src = `https://via.placeholder.com/32x32/333333/ffffff?text=${this.getUserInitials()}`;
                headerAvatar.alt = this.getUserDisplayName();
            }
        }

        if (headerUserName) {
            headerUserName.textContent = this.getUserDisplayName();
        }
    }

    updateProfilePage() {
        const profilePage = document.getElementById('profilePage');
        if (!profilePage || !this.currentUser) return;

        // Update profile form fields
        const firstNameField = document.getElementById('profileFirstName');
        const lastNameField = document.getElementById('profileLastName');
        const emailField = document.getElementById('profileEmail');
        const departmentField = document.getElementById('profileDepartment');
        const titleField = document.getElementById('profileTitle');
        const bioField = document.getElementById('profileBio');
        const profileAvatar = document.getElementById('profileAvatar');

        if (firstNameField) firstNameField.value = this.currentUser.firstName || '';
        if (lastNameField) lastNameField.value = this.currentUser.lastName || '';
        if (emailField) emailField.value = this.currentUser.email || '';
        if (departmentField) departmentField.value = this.currentUser.department || '';
        if (titleField) titleField.value = this.currentUser.title || '';
        if (bioField) bioField.value = this.currentUser.bio || '';

        if (profileAvatar) {
            if (this.currentUser.avatar) {
                profileAvatar.src = this.currentUser.avatar;
            } else {
                profileAvatar.src = `https://via.placeholder.com/120x120/333333/ffffff?text=${this.getUserInitials()}`;
            }
            profileAvatar.alt = this.getUserDisplayName();
        }

        // Update activity summary
        this.updateActivitySummary();
    }

    updateActivitySummary() {
        const activityContainer = document.getElementById('activitySummary');
        if (!activityContainer || !this.currentUser) return;

        const lastLogin = this.currentUser.lastLogin || new Date().toISOString();
        const assignmentsCreated = this.currentUser.assignmentsCreated || 0;
        const studentsManaged = this.currentUser.studentsManaged || 0;

        activityContainer.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="activity-content">
                    <h4>Last Login</h4>
                    <p>${new Date(lastLogin).toLocaleDateString()} at ${new Date(lastLogin).toLocaleTimeString()}</p>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="activity-content">
                    <h4>Assignments Created</h4>
                    <p>${assignmentsCreated} assignments</p>
                </div>
            </div>
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="activity-content">
                    <h4>Students Managed</h4>
                    <p>${studentsManaged} students</p>
                </div>
            </div>
        `;
    }

    // Authentication Methods
    login(userData) {
        // Add login timestamp
        const userWithTimestamp = {
            ...userData,
            lastLogin: new Date().toISOString()
        };
        
        this.saveUserToStorage(userWithTimestamp);
        this.updateUI();
        
        // Update login timestamp
        this.updateLastLogin();
    }

    logout() {
        this.clearUserData();
        window.location.href = '../auth/signin.html';
    }

    updateLastLogin() {
        if (this.currentUser) {
            const updatedUser = { ...this.currentUser, lastLogin: new Date().toISOString() };
            this.saveUserToStorage(updatedUser);
        }
    }

    // Profile Picture Upload
    handleAvatarUpload(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                reject(new Error('Please select an image file'));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                reject(new Error('File size must be less than 5MB'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarUrl = e.target.result;
                if (this.updateAvatar(avatarUrl)) {
                    resolve(avatarUrl);
                } else {
                    reject(new Error('Failed to update avatar'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }

    // Form Validation
    validateProfileForm(formData) {
        const errors = {};

        if (!formData.firstName?.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName?.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!this.isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.department?.trim()) {
            errors.department = 'Department is required';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    validatePasswordForm(formData) {
        const errors = {};

        if (!formData.currentPassword?.trim()) {
            errors.currentPassword = 'Current password is required';
        }

        if (!formData.newPassword?.trim()) {
            errors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters long';
        }

        if (!formData.confirmPassword?.trim()) {
            errors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Utility Methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Event Handlers
    handleProfileUpdate(formData) {
        const validation = this.validateProfileForm(formData);
        
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        const success = this.updateProfile(formData);
        return {
            success,
            errors: {}
        };
    }

    handlePasswordChange(formData) {
        const validation = this.validatePasswordForm(formData);
        
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors
            };
        }

        // In a real application, you would verify the current password with the server
        const success = this.updatePassword(formData.newPassword);
        return {
            success,
            errors: {}
        };
    }

    handleAvatarChange(file) {
        return this.handleAvatarUpload(file);
    }
}

// Initialize User Manager
const userManager = new UserManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManager;
} 