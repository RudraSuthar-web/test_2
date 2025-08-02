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
            this.openCreateAssignmentModal();
        });

        // Handle assignment action buttons (View, Edit)
        this.mainContent.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;
            
            const action = btn.dataset.action;
            const id = parseInt(btn.dataset.id);
            
            if (action === 'view') {
                this.viewAssignment(id);
            } else if (action === 'edit') {
                this.editAssignment(id);
            }
        });
    }

    openCreateAssignmentModal() {
        // Check if modal exists, if not create it
        let modal = document.getElementById('createAssignmentModal');
        if (!modal) {
            this.createAssignmentModal();
            modal = document.getElementById('createAssignmentModal');
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    viewAssignment(id) {
        const assignment = this.assignments.find(a => a.id === id);
        if (!assignment) return;

        // Create and show assignment details modal
        this.showAssignmentDetailsModal(assignment);
    }

    editAssignment(id) {
        const assignment = this.assignments.find(a => a.id === id);
        if (!assignment) return;

        // Create and show edit assignment modal
        this.showEditAssignmentModal(assignment);
    }

    showAssignmentDetailsModal(assignment) {
        // Remove existing modal if any
        const existingModal = document.getElementById('assignmentDetailsModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'assignmentDetailsModal';
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-eye"></i> Assignment Details</h2>
                    <button class="modal-close" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="assignment-details">
                        <div class="detail-group">
                            <label>Title:</label>
                            <p>${assignment.title}</p>
                        </div>
                        <div class="detail-group">
                            <label>Course:</label>
                            <p>${assignment.course}</p>
                        </div>
                        <div class="detail-group">
                            <label>Type:</label>
                            <p>${assignment.type}</p>
                        </div>
                        <div class="detail-group">
                            <label>Due Date:</label>
                            <p>${assignment.dueDate}</p>
                        </div>
                        <div class="detail-group">
                            <label>Status:</label>
                            <p><span class="status-badge status-${assignment.status.toLowerCase()}">${assignment.status}</span></p>
                        </div>
                        <div class="detail-group">
                            <label>Description:</label>
                            <p>Complete the assigned tasks and submit your work before the due date. Make sure to follow all guidelines provided.</p>
                        </div>
                        <div class="detail-group">
                            <label>Submissions:</label>
                            <p>12 out of 25 students have submitted</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';">Close</button>
                    <button class="btn btn-primary" onclick="window.assignmentManager.editAssignment(${assignment.id}); this.closest('.modal').remove();">
                        <i class="fas fa-edit"></i> Edit Assignment
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    showEditAssignmentModal(assignment) {
        // Remove existing modal if any
        const existingModal = document.getElementById('editAssignmentModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'editAssignmentModal';
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-edit"></i> Edit Assignment</h2>
                    <button class="modal-close" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editAssignmentForm">
                        <div class="form-group">
                            <label for="editTitle">Assignment Title *</label>
                            <input type="text" id="editTitle" name="title" class="form-input" value="${assignment.title}" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editCourse">Course *</label>
                                <select id="editCourse" name="course" class="form-select" required>
                                    <option value="CS 101" ${assignment.course === 'CS 101' ? 'selected' : ''}>CS 101 - Intro to Programming</option>
                                    <option value="CS 201" ${assignment.course === 'CS 201' ? 'selected' : ''}>CS 201 - Web Development</option>
                                    <option value="CS 301" ${assignment.course === 'CS 301' ? 'selected' : ''}>CS 301 - Database Systems</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="editType">Assignment Type *</label>
                                <select id="editType" name="type" class="form-select" required>
                                    <option value="Assignment" ${assignment.type === 'Assignment' ? 'selected' : ''}>Assignment</option>
                                    <option value="Project" ${assignment.type === 'Project' ? 'selected' : ''}>Project</option>
                                    <option value="Lab" ${assignment.type === 'Lab' ? 'selected' : ''}>Lab</option>
                                    <option value="Quiz" ${assignment.type === 'Quiz' ? 'selected' : ''}>Quiz</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editDueDate">Due Date *</label>
                                <input type="date" id="editDueDate" name="dueDate" class="form-input" value="${assignment.dueDate}" required>
                            </div>
                            <div class="form-group">
                                <label for="editStatus">Status *</label>
                                <select id="editStatus" name="status" class="form-select" required>
                                    <option value="Active" ${assignment.status === 'Active' ? 'selected' : ''}>Active</option>
                                    <option value="Completed" ${assignment.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                    <option value="Draft" ${assignment.status === 'Draft' ? 'selected' : ''}>Draft</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="editDescription">Description</label>
                            <textarea id="editDescription" name="description" class="form-input" rows="4" placeholder="Assignment description...">Complete the assigned tasks and submit your work before the due date.</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';">Cancel</button>
                    <button class="btn btn-primary" onclick="window.assignmentManager.saveAssignmentChanges(${assignment.id}); this.closest('.modal').remove();">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }

    saveAssignmentChanges(id) {
        const form = document.getElementById('editAssignmentForm');
        if (!form) return;

        const formData = new FormData(form);
        const updatedAssignment = {
            id: id,
            title: formData.get('title'),
            course: formData.get('course'),
            type: formData.get('type'),
            dueDate: formData.get('dueDate'),
            status: formData.get('status')
        };

        // Update the assignment in the array
        const index = this.assignments.findIndex(a => a.id === id);
        if (index !== -1) {
            this.assignments[index] = { ...this.assignments[index], ...updatedAssignment };
            this.renderTable(this.assignments);
            this.showToast('Assignment updated successfully!', 'success');
        }
        
        document.body.style.overflow = 'auto';
    }

    createAssignmentModal() {
        const modal = document.createElement('div');
        modal.id = 'createAssignmentModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-plus"></i> Create New Assignment</h2>
                    <button class="modal-close" id="closeAssignmentModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="createAssignmentForm">
                        <div class="form-group">
                            <label for="assignmentTitle">Assignment Title *</label>
                            <input type="text" id="assignmentTitle" name="title" class="form-input" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="assignmentCourse">Course *</label>
                                <select id="assignmentCourse" name="course" class="form-select" required>
                                    <option value="">Select Course</option>
                                    <option value="CS 101">CS 101 - Intro to Programming</option>
                                    <option value="CS 201">CS 201 - Web Development</option>
                                    <option value="CS 301">CS 301 - Database Systems</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="assignmentType">Assignment Type *</label>
                                <select id="assignmentType" name="type" class="form-select" required>
                                    <option value="">Select Type</option>
                                    <option value="Assignment">Assignment</option>
                                    <option value="Project">Project</option>
                                    <option value="Lab">Lab</option>
                                    <option value="Quiz">Quiz</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="assignmentDueDate">Due Date *</label>
                            <input type="date" id="assignmentDueDate" name="dueDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="assignmentFile">Assignment PDF *</label>
                            <div class="file-upload-area" id="fileUploadArea">
                                <input type="file" id="assignmentFile" name="file" accept=".pdf" required>
                                <div class="file-upload-content">
                                    <div class="file-upload-icon">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <div class="file-upload-text">
                                        <p class="upload-main-text">Click to browse or drag and drop</p>
                                        <p class="upload-sub-text">PDF files only (Max 10MB)</p>
                                    </div>
                                    <button type="button" class="btn btn-outline" id="browseFileBtn">
                                        <i class="fas fa-folder-open"></i>
                                        Browse Files
                                    </button>
                                </div>
                                <div class="file-selected" id="fileSelected" style="display: none;">
                                    <div class="file-info">
                                        <i class="fas fa-file-pdf file-icon"></i>
                                        <div class="file-details">
                                            <span class="file-name" id="selectedFileName">No file selected</span>
                                            <span class="file-size" id="selectedFileSize"></span>
                                        </div>
                                        <button type="button" class="remove-file" id="removeFileBtn">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelAssignment">Cancel</button>
                    <button class="btn btn-primary" id="submitAssignment">
                        <i class="fas fa-upload"></i>
                        Create Assignment
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Initialize modal events
        this.initializeModalEvents();
    }

    initializeModalEvents() {
        const modal = document.getElementById('createAssignmentModal');
        const closeBtn = document.getElementById('closeAssignmentModal');
        const cancelBtn = document.getElementById('cancelAssignment');
        const submitBtn = document.getElementById('submitAssignment');
        
        // Close modal events
        [closeBtn, cancelBtn].forEach(btn => {
            btn?.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Submit form
        submitBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCreateAssignment();
        });
        
        // Initialize file upload for this modal
        this.initializeFileUpload();
    }

    handleCreateAssignment() {
        const form = document.getElementById('createAssignmentForm');
        const submitBtn = document.getElementById('submitAssignment');
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
        
        // Simulate API call
        setTimeout(() => {
            const formData = new FormData(form);
            const newAssignment = {
                id: this.assignments.length + 1,
                title: formData.get('title'),
                course: formData.get('course'),
                type: formData.get('type'),
                dueDate: formData.get('dueDate'),
                status: 'Active'
            };
            
            this.assignments.unshift(newAssignment);
            this.renderTable(this.assignments);
            
            // Reset and close modal
            form.reset();
            document.getElementById('createAssignmentModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            
            this.showToast('Assignment created successfully!', 'success');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-upload"></i> Create Assignment';
        }, 1500);
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}
