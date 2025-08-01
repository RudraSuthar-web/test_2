# AssignTrack - Assignment Submission Tracker

A comprehensive web application for managing academic assignments, deadlines, and submissions for both students and faculty.

## 🏗️ Project Structure

The project is organized into a clean, scalable folder structure:

```
Assigntrack/
├── index.html                 # Main entry point (redirects to landing)
├── README.md                  # Project documentation
├── auth/                      # Authentication module
│   ├── signin.html           # Sign in page
│   ├── signup.html           # Sign up page
│   ├── auth-script.js        # Authentication JavaScript
│   └── auth-styles.css       # Authentication styles
├── dashboards/               # Dashboard module
│   ├── student-dashboard.html    # Student dashboard
│   ├── faculty-dashboard-enhanced.html    # Enhanced faculty dashboard


│   └── dashboard-styles.css      # Dashboard styles
└── landing/                  # Landing page module
    ├── index.html            # Main landing page
    ├── script.js             # Landing page JavaScript
    └── styles.css            # Landing page styles
```

## 📁 Folder Organization

### 🔐 Auth Folder (`/auth/`)
Contains all authentication-related files:
- **signin.html** - User login page with email/password and social login options
- **signup.html** - User registration page with role selection (student/faculty)
- **auth-script.js** - Authentication logic, form validation, and user session management
- **auth-styles.css** - Styling specific to authentication pages

### 📊 Dashboards Folder (`/dashboards/`)
Contains all dashboard-related files for both user types:
- **student-dashboard.html** - Comprehensive student dashboard with assignment tracking, progress monitoring, and deadline management
- **faculty-dashboard-enhanced.html** - Enhanced faculty dashboard for managing assignments, reviewing submissions, and tracking student progress


- **dashboard-styles.css** - Dashboard-specific styling and responsive design

### 🏠 Landing Folder (`/landing/`)
Contains the main landing page and general-purpose files:
- **index.html** - Marketing landing page with features, benefits, and call-to-action
- **script.js** - Landing page interactions and animations
- **styles.css** - Global styles and landing page design

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assigntrack
   ```

2. **Open the application**
   - Open `index.html` in your web browser
   - Or directly access `landing/index.html` for the main landing page

3. **Navigate the application**
   - **Landing Page**: Visit `landing/index.html` for the main marketing page
   - **Sign Up**: Navigate to `auth/signup.html` to create an account
   - **Sign In**: Navigate to `auth/signin.html` to log in
   - **Dashboards**: After authentication, choose between student and faculty dashboards

## 🎯 Key Features

### For Students
- 📅 Assignment deadline tracking
- 📊 Progress monitoring and analytics
- 🔔 Smart reminder notifications
- 📁 File organization and submission
- 📈 Performance insights

### For Faculty
- 👥 Student management
- 📝 Assignment creation and distribution
- ✅ Submission review and grading
- 📊 Class performance analytics
- 🔔 Deadline management

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🔧 Development Guidelines

### File Naming Conventions
- Use kebab-case for file names (e.g., `student-dashboard.html`)
- Use descriptive names that clearly indicate the file's purpose
- Group related files in appropriate folders

### CSS Organization
- Global styles in `landing/styles.css`
- Module-specific styles in their respective folders
- Use CSS custom properties for consistent theming

### JavaScript Structure
- Modular approach with separate files for different functionalities
- Event-driven architecture
- Clean separation of concerns

## 🚀 Future Enhancements

The organized structure supports easy scaling for future features:

### Potential Additions
- **API Integration**: Backend services for data persistence
- **Real-time Features**: WebSocket integration for live updates
- **Mobile App**: React Native or Flutter mobile application
- **Advanced Analytics**: Detailed reporting and insights
- **Collaboration Tools**: Group assignments and peer review
- **Calendar Integration**: Sync with external calendar services

### Scalability Considerations
- The modular structure allows for easy addition of new features
- Separate concerns make maintenance and updates straightforward
- Clear file organization supports team collaboration
- Consistent naming conventions improve code readability

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository. 