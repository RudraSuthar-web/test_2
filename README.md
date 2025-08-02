# 📚 AssignTrack

**Never Miss Another Assignment Deadline.**

AssignTrack is a smart and minimal assignment submission tracker built for college students and faculty. It helps users organize academic tasks, track deadlines, and improve overall academic performance through a clean UI and intuitive interactions.

---

## 🌟 Use Case

AssignTrack is designed for:

- 🎓 **Students** to:
  - Track assignment deadlines
  - Get reminders for due tasks
  - Submit work digitally
  - View submission status

- 🧑‍🏫 **Faculty** to:
  - Assign new tasks to specific students or classes
  - Check who submitted assignments on time
  - Mark, update, and close assignments

---

## ⚙️ Functionality

### 🔐 Authentication
- Users can **Sign In / Sign Up** based on role (Student or Faculty)
- Input validation and redirection based on role type

### 🎓 Student Dashboard
- View upcoming, submitted, or overdue assignments
- Simple assignment cards showing:
  - Subject
  - Status (e.g., Submitted, Due Tomorrow)
  - Due Date
- Option to submit assignments (planned feature)

### 🧑‍🏫 Faculty Dashboard
- Create and assign assignments to students
- Track submitted work per subject
- Filter and sort assignments by due date or submission status

### 🧭 Navigation
- Modern navigation bar across pages
- Dashboard selector based on user type
- Scroll-based hints and animations (arrow for next section)

### 📱 Responsive Design
- Fully mobile-compatible layout using CSS Grid and Flexbox
- Optimized for both desktop and mobile views

---

## 📁 Project Structure

```bash
Assigntrack/
├── auth/
│   ├── signin.html
│   ├── signup.html
│   ├── auth-script.js
│   └── auth-styles.css
│
├── dashboards/
│   ├── student-dashboard.html
│   ├── faculty-dashboard.html
│   ├── dashboard-script.js
│   ├── dashboard-selector.html
│   └── dashboard-styles.css
│
├── landing/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── README.md
