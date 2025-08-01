// Faculty Dashboard JavaScript for AssignTrack

class FacultyDashboard {
    constructor() {
        this.currentPage = 'dashboard';
        this.userManager = null;
        this.init();
    }

    init() {
        this.initializeUserManager();
        this.initializeEventListeners();
        this.initializeCharts();
        this.loadDashboardData();
        this.setupNavigation();
    }

    initializeUserManager() {
        // Initialize user management if available
        if (typeof UserManager !== 'undefined') {
            this.userManager = new UserManager();
            
            // Check if user is authenticated, if not, redirect to login
            if (!this.userManager.checkAuthentication()) {
                window.location.href = '../auth/signin.html';
                return;
            }
        } else {
            // Fallback: check for currentUser in localStorage
            const currentUser = localStorage.getItem('currentUser');
            if (!currentUser) {
                window.location.href = '../auth/signin.html';
                return;
            }
        }
    }

    initializeEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Modal functionality
        this.initializeModals();
        
        // Form submissions
        this.initializeForms();
    }

    initializeModals() {
        // Create Assignment Modal
        const createAssignmentBtn = document.getElementById('createAssignmentBtn');
        const createAssignmentModal = document.getElementById('createAssignmentModal');
        const closeAssignmentModal = document.getElementById('closeAssignmentModal');
        const cancelAssignment = document.getElementById('cancelAssignment');

        if (createAssignmentBtn) {
            createAssignmentBtn.addEventListener('click', () => {
                createAssignmentModal.classList.add('active');
            });
        }

        if (closeAssignmentModal) {
            closeAssignmentModal.addEventListener('click', () => {
                createAssignmentModal.classList.remove('active');
            });
        }

        if (cancelAssignment) {
            cancelAssignment.addEventListener('click', () => {
                createAssignmentModal.classList.remove('active');
            });
        }

        // Compose Message Modal
        const composeMessageBtn = document.getElementById('composeMessageBtn');
        const composeMessageModal = document.getElementById('composeMessageModal');
        const closeComposeModal = document.getElementById('closeComposeModal');
        const saveDraft = document.getElementById('saveDraft');

        if (composeMessageBtn) {
            composeMessageBtn.addEventListener('click', () => {
                composeMessageModal.classList.add('active');
            });
        }

        if (closeComposeModal) {
            closeComposeModal.addEventListener('click', () => {
                composeMessageModal.classList.remove('active');
            });
        }

        if (saveDraft) {
            saveDraft.addEventListener('click', () => {
                this.saveMessageDraft();
            });
        }

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    initializeForms() {
        // Create Assignment Form
        const createAssignmentForm = document.getElementById('createAssignmentForm');
        if (createAssignmentForm) {
            createAssignmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCreateAssignment();
            });
        }

        // Compose Message Form
        const composeMessageForm = document.getElementById('composeMessageForm');
        if (composeMessageForm) {
            composeMessageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSendMessage();
            });
        }
    }

    navigateToPage(page) {
        // Update active navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Update breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            const pageNames = {
                'dashboard': 'Dashboard',
                'assignments': 'Assignments',
                'students': 'Students',
                'reports': 'Reports',
                'messages': 'Messages',
                'profile': 'Profile',
                'settings': 'Settings'
            };
            breadcrumb.textContent = pageNames[page] || 'Dashboard';
        }

        // Show/hide content sections
        this.showPageContent(page);
        this.currentPage = page;
    }

    showPageContent(page) {
        // Hide all content sections
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const targetSection = document.getElementById(`${page}Section`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Load page-specific data
        switch (page) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'assignments':
                this.loadAssignmentsData();
                break;
            case 'students':
                this.loadStudentsData();
                break;
            case 'reports':
                this.loadReportsData();
                break;
            case 'messages':
                this.loadMessagesData();
                break;
            case 'profile':
                this.loadProfileData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }

    setupNavigation() {
        // Set initial page
        this.navigateToPage('dashboard');
    }

    initializeCharts() {
        // Initialize Chart.js charts
        this.createDashboardCharts();
    }

    createDashboardCharts() {
        // Submission Rate Chart
        const submissionCtx = document.getElementById('submissionRateChart');
        if (submissionCtx) {
            new Chart(submissionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Submitted', 'Pending'],
                    datasets: [{
                        data: [87, 13],
                        backgroundColor: ['#10B981', '#F59E0B'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Average Grade',
                        data: [85, 87, 89, 88, 91, 90],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    loadDashboardData() {
        // Load dashboard statistics and data
        this.updateDashboardStats();
        this.loadRecentActivity();
    }

    updateDashboardStats() {
        // Update dashboard statistics
        const stats = {
            activeAssignments: 24,
            totalStudents: 156,
            upcomingDeadlines: 8,
            submissionRate: 87
        };

        // Update stats in the UI
        Object.keys(stats).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = stats[key];
            }
        });
    }

    loadRecentActivity() {
        // Load recent activity feed
        const activityFeed = document.getElementById('activityFeed');
        if (activityFeed) {
            const activities = [
                { type: 'submission', message: 'John Doe submitted Assignment 3', time: '2 minutes ago' },
                { type: 'assignment', message: 'New assignment created: Final Project', time: '1 hour ago' },
                { type: 'message', message: 'New message from Sarah Wilson', time: '3 hours ago' }
            ];

            activityFeed.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon ${activity.type}">
                        <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.message}</p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    getActivityIcon(type) {
        const icons = {
            'submission': 'file-upload',
            'assignment': 'file-alt',
            'message': 'envelope'
        };
        return icons[type] || 'info-circle';
    }

    loadAssignmentsData() {
        // Load assignments data
        const assignmentsTable = document.getElementById('assignmentsTable');
        if (assignmentsTable) {
            // Populate assignments table
            this.populateAssignmentsTable();
        }
    }

    loadStudentsData() {
        // Load students data
        const studentsGrid = document.getElementById('studentsGrid');
        if (studentsGrid) {
            // Populate students grid
            this.populateStudentsGrid();
        }
    }

    loadReportsData() {
        // Load reports data
        this.createReportCharts();
    }

    loadMessagesData() {
        // Load messages data
        const messagesList = document.getElementById('messagesList');
        if (messagesList) {
            // Populate messages list
            this.populateMessagesList();
        }
    }

    loadProfileData() {
        // Load profile data
        if (this.userManager) {
            this.userManager.updateProfilePage();
        }
    }

    loadSettingsData() {
        // Load settings data
        console.log('Loading settings data...');
    }

    populateAssignmentsTable() {
        const assignments = [
            { title: 'Programming Assignment 1', course: 'CS 101', type: 'Assignment', dueDate: '2024-01-15', submissions: 45, status: 'Active' },
            { title: 'Web Development Project', course: 'CS 201', type: 'Project', dueDate: '2024-01-20', submissions: 32, status: 'Active' },
            { title: 'Database Design Lab', course: 'CS 301', type: 'Lab', dueDate: '2024-01-18', submissions: 28, status: 'Active' }
        ];

        const tbody = document.querySelector('#assignmentsTable tbody');
        if (tbody) {
            tbody.innerHTML = assignments.map(assignment => `
                <tr>
                    <td>${assignment.title}</td>
                    <td>${assignment.course}</td>
                    <td>${assignment.type}</td>
                    <td>${assignment.dueDate}</td>
                    <td>${assignment.submissions}</td>
                    <td><span class="status-badge ${assignment.status.toLowerCase()}">${assignment.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-secondary">View</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    populateStudentsGrid() {
        const students = [
            { name: 'John Doe', email: 'john.doe@email.com', course: 'CS 101', status: 'Active', grade: 92 },
            { name: 'Jane Smith', email: 'jane.smith@email.com', course: 'CS 201', status: 'Active', grade: 88 },
            { name: 'Mike Johnson', email: 'mike.johnson@email.com', course: 'CS 301', status: 'Active', grade: 85 }
        ];

        const grid = document.getElementById('studentsGrid');
        if (grid) {
            grid.innerHTML = students.map(student => `
                <div class="student-card">
                    <div class="student-avatar">
                        <img src="https://via.placeholder.com/60x60/3B82F6/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
                    </div>
                    <div class="student-info">
                        <h4>${student.name}</h4>
                        <p>${student.email}</p>
                        <p class="student-course">${student.course}</p>
                        <div class="student-stats">
                            <span class="grade">Grade: ${student.grade}%</span>
                            <span class="status ${student.status.toLowerCase()}">${student.status}</span>
                        </div>
                    </div>
                    <div class="student-actions">
                        <button class="btn btn-sm btn-primary">View Profile</button>
                        <button class="btn btn-sm btn-secondary">Send Message</button>
                    </div>
                </div>
            `).join('');
        }
    }

    populateMessagesList() {
        const messages = [
            { sender: 'John Doe', subject: 'Assignment Question', preview: 'I have a question about the programming assignment...', time: '2 hours ago', unread: true },
            { sender: 'Jane Smith', subject: 'Project Submission', preview: 'I have submitted my web development project...', time: '1 day ago', unread: false },
            { sender: 'Mike Johnson', subject: 'Lab Report', preview: 'Here is my lab report for the database design...', time: '2 days ago', unread: false }
        ];

        const list = document.getElementById('messagesList');
        if (list) {
            list.innerHTML = messages.map(message => `
                <div class="message-item ${message.unread ? 'unread' : ''}">
                    <div class="message-avatar">
                        <img src="https://via.placeholder.com/40x40/3B82F6/ffffff?text=${message.sender.charAt(0)}" alt="${message.sender}">
                    </div>
                    <div class="message-content">
                        <div class="message-header">
                            <h4>${message.sender}</h4>
                            <span class="message-time">${message.time}</span>
                        </div>
                        <h5>${message.subject}</h5>
                        <p>${message.preview}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    createReportCharts() {
        // Create charts for reports page
        console.log('Creating report charts...');
    }

    handleCreateAssignment() {
        const form = document.getElementById('createAssignmentForm');
        const formData = new FormData(form);
        
        // Validate form data
        const assignmentData = {
            title: formData.get('assignmentTitle') || document.getElementById('assignmentTitle').value,
            course: formData.get('assignmentCourse') || document.getElementById('assignmentCourse').value,
            type: formData.get('assignmentType') || document.getElementById('assignmentType').value,
            dueDate: formData.get('assignmentDueDate') || document.getElementById('assignmentDueDate').value,
            points: formData.get('assignmentPoints') || document.getElementById('assignmentPoints').value,
            description: formData.get('assignmentDescription') || document.getElementById('assignmentDescription').value
        };

        // Validate required fields
        if (!assignmentData.title || !assignmentData.course || !assignmentData.type || !assignmentData.dueDate) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Simulate assignment creation
        console.log('Creating assignment:', assignmentData);
        this.showToast('Assignment created successfully!', 'success');
        
        // Close modal and reset form
        document.getElementById('createAssignmentModal').classList.remove('active');
        form.reset();
        
        // Refresh assignments data
        this.loadAssignmentsData();
    }

    handleSendMessage() {
        const form = document.getElementById('composeMessageForm');
        const formData = new FormData(form);
        
        const messageData = {
            recipient: formData.get('messageRecipient') || document.getElementById('messageRecipient').value,
            subject: formData.get('messageSubject') || document.getElementById('messageSubject').value,
            body: formData.get('messageBody') || document.getElementById('messageBody').value
        };

        // Validate required fields
        if (!messageData.recipient || !messageData.subject || !messageData.body) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Simulate message sending
        console.log('Sending message:', messageData);
        this.showToast('Message sent successfully!', 'success');
        
        // Close modal and reset form
        document.getElementById('composeMessageModal').classList.remove('active');
        form.reset();
    }

    saveMessageDraft() {
        this.showToast('Draft saved successfully!', 'info');
    }

    handleLogout() {
        // Clear user data
        if (this.userManager) {
            this.userManager.logout();
        } else {
            localStorage.removeItem('currentUser');
        }
        
        // Redirect to login
        window.location.href = '../auth/signin.html';
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);

        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toast.remove();
            });
        }
    }

    getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FacultyDashboard();
}); 