// Faculty Dashboard JavaScript for AssignTrack

class FacultyDashboard {
    constructor() {
        this.currentPage = 'overview';
        this.components = {};
        this.init();
    }

    init() {
        // Initialize sidebar
        window.facultySidebar = new FacultySidebar();
        
        // Initialize page components
        this.components.overview = new DashboardOverview();
        this.components.assignments = new AssignmentManagement();
        this.components.students = new StudentManagement();
        this.components.messages = new MessageManagement();
        
        // Make components globally available
        window.assignmentManager = this.components.assignments;
        window.studentManager = this.components.students;
        window.messageManager = this.components.messages;
        
        // Listen for sidebar navigation events
        document.addEventListener('sidebarNavigation', (e) => {
            this.navigateToPage(e.detail.route);
        });
        
        // Show initial page
        this.navigateToPage('overview');
    }

    navigateToPage(route) {
        this.currentPage = route;
        
        // Update sidebar active state
        window.facultySidebar.setActiveRoute(route);
        
        // Render appropriate component
        switch(route) {
            case 'overview':
                this.components.overview.render();
                break;
            case 'assignments':
                this.components.assignments.render();
                break;
            case 'students':
                this.components.students.render();
                break;
            case 'messages':
                this.components.messages.render();
                break;
            default:
                this.components.overview.render();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize assignment manager globally
    window.assignmentManager = new AssignmentManagement();
    
    // Initialize faculty dashboard
    new FacultyDashboard();
});


