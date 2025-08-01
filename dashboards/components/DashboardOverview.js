class DashboardOverview {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.mainContent.innerHTML = 
            <div class="dashboard-overview">
                <h1>Dashboard Overview</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Courses</h3>
                        <p class="stat-value">3</p>
                    </div>
                    <div class="stat-card">
                        <h3>Active Assignments</h3>
                        <p class="stat-value">12</p>
                    </div>
                    <div class="stat-card">
                        <h3>Students Enrolled</h3>
                        <p class="stat-value">85</p>
                    </div>
                    <div class="stat-card">
                        <h3>Pending Grades</h3>
                        <p class="stat-value">24</p>
                    </div>
                </div>
                <div class="chart-section">
                    <h2>Performance Overview</h2>
                    <div class="chart-placeholder" style="height: 200px; background: var(--bg-tertiary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                        <p>Performance Chart Placeholder</p>
                    </div>
                </div>
                <div class="recent-activity">
                    <h2>Recent Activity</h2>
                    <ul class="activity-list">
                        <li class="activity-item">
                            <span class="activity-icon"><i class="fas fa-file-upload"></i></span>
                            <div class="activity-content">
                                <p>New submission for "Database Project" by John Doe</p>
                                <span class="activity-time">2 hours ago</span>
                            </div>
                        </li>
                        <li class="activity-item">
                            <span class="activity-icon"><i class="fas fa-check-circle"></i></span>
                            <div class="activity-content">
                                <p>Graded "Web Dev Assignment" for Jane Smith</p>
                                <span class="activity-time">Yesterday</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        ;
    }
}