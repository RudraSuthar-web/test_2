/**
 * Student Management Component
 * Handles student overview, grades, and communication
 */

class StudentManagement {
    constructor() {
        this.students = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@university.edu',
                studentId: 'CS2024001',
                course: 'CS 301',
                grade: 92.5,
                submissions: 8,
                totalAssignments: 10,
                lastActive: '2024-01-12',
                status: 'active'
            },
            {
                id: 2,
                name: 'Sarah Wilson',
                email: 'sarah.wilson@university.edu',
                studentId: 'CS2024002',
                course: 'CS 201',
                grade: 87.3,
                submissions: 9,
                totalAssignments: 10,
                lastActive: '2024-01-11',
                status: 'active'
            },
            {
                id: 3,
                name: 'Mike Johnson',
                email: 'mike.johnson@university.edu',
                studentId: 'CS2024003',
                course: 'CS 301',
                grade: 78.9,
                submissions: 7,
                totalAssignments: 10,
                lastActive: '2024-01-08',
                status: 'at-risk'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <!-- Student Management Header -->
            <header class="page-header">
                <div class="header-content">
                    <h1>Student Management</h1>
                    <p class="header-subtitle">Monitor student progress and manage class roster</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary" id="exportStudentsBtn">
                        <i class="fas fa-download"></i>
                        <span>Export List</span>
                    </button>
                    <button class="btn btn-primary" id="messageAllBtn">
                        <i class="fas fa-envelope"></i>
                        <span>Message All</span>
                    </button>
                </div>
            </header>

            <!-- Student Stats -->
            <section class="student-stats">
                <div class="stats-grid">
                    <div class="stat-card stat-card-primary">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-value">${this.students.length}</h3>
                            <p class="stat-title">Total Students</p>
                        </div>
                    </div>
                    <div class="stat-card stat-card-success">
                        <div class="stat-icon">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-value">${this.getActiveStudents().length}</h3>
                            <p class="stat-title">Active</p>
                        </div>
                    </div>
                    <div class="stat-card stat-card-warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-value">${this.getAtRiskStudents().length}</h3>
                            <p class="stat-title">At Risk</p>
                        </div>
                    </div>
                    <div class="stat-card stat-card-info">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-value">${this.getClassAverage()}%</h3>
                            <p class="stat-title">Class Average</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Student Filters and Search -->
            <section class="filters-section">
                <div class="filters-container">
                    <div class="search-group">
                        <div class="search-input-container">
                            <i class="fas fa-search search-icon"></i>
                            <input type="text" id="studentSearch" class="form-input" placeholder="Search students...">
                        </div>
                    </div>
                    <div class="filter-group">
                        <label for="courseFilter">Course</label>
                        <select id="courseFilter" class="form-select">
                            <option value="all">All Courses</option>
                            <option value="CS 101">CS 101</option>
                            <option value="CS 201">CS 201</option>
                            <option value="CS 301">CS 301</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="statusFilter">Status</label>
                        <select id="statusFilter" class="form-select">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="at-risk">At Risk</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Student Table -->
            <section class="students-table-section">
                <div class="table-container">
                    <div class="table-header">
                        <h2>Student Roster</h2>
                        <div class="table-actions">
                            <button class="btn btn-text" id="bulkActionsBtn">
                                <i class="fas fa-tasks"></i>
                                Bulk Actions
                            </button>
                        </div>
                    </div>
                    <div class="table-wrapper">
                        ${this.renderStudentTable()}
                    </div>
                </div>
            </section>
        `;
    }
    
    renderStudentTable() {
        return `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" id="selectAll" class="form-checkbox">
                        </th>
                        <th>Student</th>
                        <th>Student ID</th>
                        <th>Course</th>
                        <th>Current Grade</th>
                        <th>Progress</th>
                        <th>Last Active</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.students.map(student => `
                        <tr>
                            <td>
                                <input type="checkbox" class="form-checkbox student-checkbox" value="${student.id}">
                            </td>
                            <td>
                                <div class="student-info">
                                    <div class="student-avatar">
                                        <img src="https://via.placeholder.com/40x40/6366f1/ffffff?text=${student.name.split(' ').map(n => n[0]).join('')}" 
                                             alt="${student.name}">
                                    </div>
                                    <div class="student-details">
                                        <h4 class="student-name">${student.name}</h4>
                                        <span class="student-email">${student.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="student-id">${student.studentId}</span>
                            </td>
                            <td>
                                <span class="course-badge">${student.course}</span>
                            </td>
                            <td>
                                <div class="grade-display">
                                    <span class="grade-value ${this.getGradeClass(student.grade)}">${student.grade}%</span>
                                    <span class="grade-letter">${this.getLetterGrade(student.grade)}</span>
                                </div>
                            </td>
                            <td>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${(student.submissions / student.totalAssignments) * 100}%"></div>
                                    </div>
                                    <span class="progress-text">${student.submissions}/${student.totalAssignments}</span>
                                </div>
                            </td>
                            <td>
                                <span class="last-active">${this.formatDate(student.lastActive)}</span>
                            </td>
                            <td>
                                <span class="status-badge status-${student.status}">${student.status}</span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-sm btn-info" onclick="viewStudentProfile(${student.id})" title="View Profile">
                                        <i class="fas fa-user"></i>
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="messageStudent(${student.id})" title="Send Message">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                    <button class="btn btn-sm btn-secondary" onclick="viewGrades(${student.id})" title="View Grades">
                                        <i class="fas fa-chart-bar"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    getActiveStudents() {
        return this.students.filter(s => s.status === 'active');
    }
    
    getAtRiskStudents() {
        return this.students.filter(s => s.status === 'at-risk');
    }
    
    getClassAverage() {
        const total = this.students.reduce((sum, s) => sum + s.grade, 0);
        return Math.round(total / this.students.length * 10) / 10;
    }
    
    getGradeClass(grade) {
        if (grade >= 90) return 'grade-a';
        if (grade >= 80) return 'grade-b';
        if (grade >= 70) return 'grade-c';
        if (grade >= 60) return 'grade-d';
        return 'grade-f';
    }
    
    getLetterGrade(grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    bindEvents() {
        // Search functionality
        document.getElementById('studentSearch')?.addEventListener('input', (e) => {
            this.filterStudents(e.target.value);
        });
        
        // Select all checkbox
        document.getElementById('selectAll')?.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.student-checkbox');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
        });
    }
    
    filterStudents(searchTerm) {
        // Implementation for filtering students
        console.log('Filtering students:', searchTerm);
    }
}

// Global functions for student actions
window.viewStudentProfile = (id) => {
    console.log('View student profile:', id);
};

window.messageStudent = (id) => {
    console.log('Message student:', id);
};

window.viewGrades = (id) => {
    console.log('View grades:', id);
};

// Export for use
window.StudentManagement = StudentManagement;