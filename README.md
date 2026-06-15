# 🏢 Company Operations Dashboard

A full-stack **Company Operations Dashboard** built to manage employees, projects, tasks, activities, and notifications in one centralized CRM-style platform.

The system helps administrators monitor company operations with real-time data updates, employee management, project tracking, task assignments, and notification alerts.

---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure password encryption using bcrypt
- Role-based user management

---

# 👥 Employee Management

Manage company employees with:

- Add employees
- View employee list
- Update employee details
- Delete employees
- Department management
- Role management

Employee activities are tracked automatically.

Example:

- Added Employee
- Updated Employee

---

# 📁 Project Management

Manage company projects:

Features:

- Create projects
- Update projects
- Delete projects
- Track project progress
- Assign teams
- Manage project leads
- Update project status


Project details:

- Project Name
- Team
- Lead
- Progress
- Status


---

# ✅ Task Management

Complete task management system:

Features:

- Create tasks
- Assign tasks to employees
- Connect tasks with projects
- Update task status
- Delete tasks


Task Priority:

- Low
- Medium
- High


Task Status:

- Pending
- In Progress
- Completed


---

# 📊 Dashboard

The dashboard provides live company insights:

Cards display:

- Total Employees
- Total Projects
- Active Tasks
- Completed Tasks


Dashboard also includes:

- Recent Activities table
- Employee updates
- Project updates
- Task updates


---

# 🔔 Notification System

Modern notification module.

Features:

- Notification bell
- Dropdown notification panel
- Unread notification count


Notification types:

- Employee notifications
- Project notifications
- Task notifications
- Activity notifications


---

# 📝 Activity Tracking

The system records important company actions.

Examples:

```
Added Employee
Updated Employee
Created Project
Updated Project
Created Task
Updated Task Status
```

Activities are displayed in the dashboard.

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- React Router
- CSS
- JavaScript


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt


---

# 📂 Project Structure

```
Company Operations Dashboard

│
├── backend
│
│   ├── controllers
│   │     ├── authController.js
│   │     ├── employeeController.js
│   │     └── notificationController.js
│   │
│   ├── middleware 
│   │     └── authMiddleware.js
│   │
│   ├── models
│   │     ├── User.js
│   │     ├── Project.js
│   │     ├── Task.js
│   │     ├── Activity.js
│   │     └── Notification.js
│   │
│   ├── routes
│   │     ├── authRoutes.js
│   │     ├── activityRoutes.js
│   │     ├── employeeRoutes.js
│   │     ├── projectRoutes.js
│   │     ├── taskRoutes.js
│   │     └── notificationRoutes.js
│   │
│   └── server.js
│
│
├── frontend
│
│   ├── src 
│   │     ├── components 
│   │     │     ├── Navbar.js 
│   │     │     ├── Notifications.js
│   │     │     └── Sidebar.js
│   │     │
│   │     ├── pages 
│   │     │     ├── Dashboard.js 
│   │     │     ├── Employees.js 
│   │     │     ├── Login.css
│   │     │     ├── Login.js 
│   │     │     ├── Projects.js 
│   │     │     ├── Register.js
│   │     │     └── Tasks.js
│   │     │
│   │     ├── services 
│   │     │     └── api.js
│   │     │
│   │     ├── App.css
│   │     ├── App.js
│   │     ├── index.css
│   │     └── index.js
│   │
│   └── .gitignore
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Shraddha-1803/NIE_CompanyDashboard
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install packages:

```bash
npm install
```


Create `.env` file:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```


Start backend:

```bash
npm run dev
```


Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install packages:

```bash
npm install
```


Start React:

```bash
npm start
```


Frontend runs on:

```
http://localhost:3000
```

---

# 🔗 API Endpoints


## Authentication

```
POST /api/auth/register

POST /api/auth/login
```


---

## Employees

```
GET /api/employees

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id
```


---

## Projects

```
GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id
```


---

## Tasks

```
GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
```


---

## Notifications

```
GET /api/notifications

PUT /api/notifications/:id
```


---

# 🎨 UI Features

- Modern dashboard design
- Sidebar navigation
- Responsive layout
- Notification dropdown
- Activity monitoring
- Data cards
- Clean enterprise interface


---

# 🔮 Future Improvements

Planned features:

- Real-time updates using Socket.io
- Email notification system
- Attendance management
- Analytics dashboard
- Charts and reports
- File management
- Deployment support


---

# 👩‍💻 Developer

**Shraddha Agarwal**
GitHub: https://github.com/Shraddha-1803

---

# ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!


