class DashboardOverview {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.stats = {
            totalAssignments: 12,
            activeAssignments: 8,
            totalStudents: 45,
            pendingSubmissions: 23
        };
    }

    render() {
        this.mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-section">
                    <h1 class="page-title">Dashboard Overview</h1>
                    <p class="page-subtitle">Welcome back! Here's what's happening in your classes.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-outline" id="refreshDashboard">
                        <i class="fas fa-sync-alt"></i>
                        Refresh
                    </button>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.stats.totalAssignments}</div>
                        <div class="stat-label">Total Assignments</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.stats.activeAssignments}</div>
                        <div class="stat-label">Active Assignments</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.stats.totalStudents}</div>
                        <div class="stat-label">Total Students</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-number">${this.stats.pendingSubmissions}</div>
                        <div class="stat-label">Pending Submissions</div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Quick Actions</h2>
                </div>
                <div class="quick-actions">
                    <button class="quick-action-btn" data-action="create-assignment">
                        <div class="action-icon">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="action-content">
                            <div class="action-title">Create Assignment</div>
                            <div class="action-subtitle">Add a new assignment</div>
                        </div>
                    </button>
                    <button class="quick-action-btn" data-action="grade-submissions">
                        <div class="action-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="action-content">
                            <div class="action-title">Grade Submissions</div>
                            <div class="action-subtitle">Review student work</div>
                        </div>
                    </button>
                    <button class="quick-action-btn" data-action="send-announcement">
                        <div class="action-icon">
                            <i class="fas fa-bullhorn"></i>
                        </div>
                        <div class="action-content">
                            <div class="action-title">Send Announcement</div>
                            <div class="action-subtitle">Notify all students</div>
                        </div>
                    </button>
                    <button class="quick-action-btn" data-action="view-reports">
                        <div class="action-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="action-content">
                            <div class="action-title">View Reports</div>
                            <div class="action-subtitle">Class performance</div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Recent Activity</h2>
                    <a href="#" class="section-link">View All</a>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-upload"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">New submission from John Smith</div>
                            <div class="activity-subtitle">Web Development Project - 2 hours ago</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Question from Sarah Johnson</div>
                            <div class="activity-subtitle">About Assignment 3 requirements - 4 hours ago</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Assignment deadline approaching</div>
                            <div class="activity-subtitle">Database Project due in 2 days - 6 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Upcoming Deadlines -->
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Upcoming Deadlines</h2>
                </div>
                <div class="deadline-list">
                    <div class="deadline-item urgent">
                        <div class="deadline-date">
                            <div class="date-day">15</div>
                            <div class="date-month">Jan</div>
                        </div>
                        <div class="deadline-content">
                            <div class="deadline-title">Web Development Project</div>
                            <div class="deadline-course">CS 201</div>
                            <div class="deadline-status">Due in 2 days</div>
                        </div>
                    </div>
                    <div class="deadline-item">
                        <div class="deadline-date">
                            <div class="date-day">20</div>
                            <div class="date-month">Jan</div>
                        </div>
                        <div class="deadline-content">
                            <div class="deadline-title">Database Assignment</div>
                            <div class="deadline-course">CS 301</div>
                            <div class="deadline-status">Due in 1 week</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        // Quick action buttons
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Refresh button
        document.getElementById('refreshDashboard')?.addEventListener('click', () => {
            this.refreshDashboard();
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case 'create-assignment':
                // Switch to assignments page and open create modal
                window.facultySidebar.setActiveRoute('assignments');
                window.facultySidebar.dispatchNavigationEvent('assignments');
                setTimeout(() => {
                    if (window.assignmentManager) {
                        window.assignmentManager.openCreateAssignmentModal();
                    }
                }, 100);
                break;
            case 'grade-submissions':
                window.facultySidebar.setActiveRoute('assignments');
                window.facultySidebar.dispatchNavigationEvent('assignments');
                break;
            case 'send-announcement':
                window.facultySidebar.setActiveRoute('messages');
                window.facultySidebar.dispatchNavigationEvent('messages');
                setTimeout(() => {
                    if (window.messageManager) {
                        window.messageManager.showComposeModal();
                    }
                }, 100);
                break;
            case 'view-reports':
                this.showToast('Reports feature coming soon!', 'info');
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }

    refreshDashboard() {
        const refreshBtn = document.getElementById('refreshDashboard');
        const icon = refreshBtn.querySelector('i');
        
        // Add spinning animation
        icon.classList.add('fa-spin');
        refreshBtn.disabled = true;
        
        // Simulate refresh
        setTimeout(() => {
            icon.classList.remove('fa-spin');
            refreshBtn.disabled = false;
            this.showToast('Dashboard refreshed!', 'success');
        }, 1000);
    }

    showToast(message, type = 'info') {
        // Basic toast implementation
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}


