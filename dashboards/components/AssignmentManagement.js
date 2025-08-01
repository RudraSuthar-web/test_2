class AssignmentManagement {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.assignments = [
            { id: 1, title: 'Database Project', course: 'CS 301', dueDate: '2025-08-15', type: 'Project', status: 'Active' },
            { id: 2, title: 'Web Dev Assignment', course: 'CS 201', dueDate: '2025-08-10', type: 'Assignment', status: 'Active' },
            { id: 3, title: 'Lab 3', course: 'CS 101', dueDate: '2025-08-05', type: 'Lab', status: 'Completed' },
        ];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.mainContent.innerHTML =
           <div class="assignment-management">
                <div class="section-header">
                    <h1>Assignments</h1>
                    <button class="btn btn-primary" id="createAssignmentBtn">Create Assignment</button>
                </div>
                <div class="filter-section">
                    <input type="text" id="assignmentFilter" class="form-input" placeholder="Filter assignments..." />
                </div>
                <table class="assignment-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Course</th>
                            <th>Type</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="assignmentTableBody"></tbody>
                </table>
            </div>;
        this.renderTable(this.assignments);
    }

    renderTable(assignments) {
        const tbody = document.getElementById('assignmentTableBody');
        tbody.innerHTML = '';
        assignments.forEach(assignment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${assignment.title}</td>
                <td>${assignment.course}</td>
                <td>${assignment.type}</td>
                <td>${assignment.dueDate}</td>
                <td>${assignment.status}</td>
                <td>
                    <button class="btn btn-primary btn-sm" data-action="view" data-id="${assignment.id}">View</button>
                    <button class="btn btn-primary btn-sm" data-action="edit" data-id="${assignment.id}">Edit</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    bindEvents() {
        const filterInput = document.getElementById('assignmentFilter');
        filterInput?.addEventListener('input', () => {
            const query = filterInput.value.toLowerCase();
            const filtered = this.assignments.filter(a => 
                a.title.toLowerCase().includes(query) || 
                a.course.toLowerCase().includes(query) ||
                a.type.toLowerCase().includes(query)
            );
            this.renderTable(filtered);
        });

        const createBtn = document.getElementById('createAssignmentBtn');
        createBtn?.addEventListener('click', () => {
            window.modalManager.showModal('createAssignmentModal');
        });

        this.mainContent.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            if (action === 'view') {
                window.dashboard.showToast(`Viewing assignment ${id}`, 'info');
            } else if (action === 'edit') {
                window.dashboard.showToast(`Editing assignment ${id}`, 'info');
            }
        });
    }
}