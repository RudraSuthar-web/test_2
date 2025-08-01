class FacultySidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.mainContent = document.getElementById('main-content');
        this.navbar = document.querySelector('.navbar');
        this.isCollapsed = false;

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.sidebar.innerHTML = `
            <div class="sidebar-header">
                <a href="/" class="sidebar-logo">
                    <i class="fas fa-tasks"></i>
                    <span>AssignTrack</span>
                </a>
                <button class="toggle-btn" aria-label="Toggle sidebar">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="sidebar-item active" data-route="overview">
                    <i class="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
                <a href="/assignments" class="sidebar-item" data-route="assignments">
                    <i class="fas fa-clipboard-list"></i>
                    <span>Assignments</span>
                </a>
                <a href="/students" class="sidebar-item" data-route="students">
                    <i class="fas fa-users"></i>
                    <span>Students</span>
                </a>
            </nav>
        `;
    }

    bindEvents() {
        const toggleBtn = this.sidebar.querySelector('.toggle-btn');
        toggleBtn.addEventListener('click', () => this.toggleSidebar());

        const navItems = this.sidebar.querySelectorAll('.sidebar-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.getAttribute('data-route');
                this.dispatchNavigationEvent(route);
            });
        });
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        this.sidebar.classList.toggle('collapsed', this.isCollapsed);
        this.mainContent.style.marginLeft = this.isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)';
        this.navbar.style.left = this.isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)';
    }

    setActiveRoute(route) {
        const navItems = this.sidebar.querySelectorAll('.sidebar-item');
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-route') === route);
        });
    }

    dispatchNavigationEvent(route) {
        const event = new CustomEvent('sidebarNavigation', { detail: { route } });
        document.dispatchEvent(event);
    }
}