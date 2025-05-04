# Task Management System - Frontend

This is a beginner-friendly Task Management System frontend built with React and Tailwind CSS. It allows users to register, login, and manage their tasks with features like task creation, assignment, and status tracking.

## Features

- User authentication (register, login, logout)
- Dashboard with task categorization (assigned to me, created by me, overdue)
- Create, edit, and delete tasks
- Task filtering by different categories
- Responsive design for all screen sizes

## Technologies Used

- React 19.0.0
- React Router DOM 7.5.3
- Redux & Redux Toolkit for state management
- React Hook Form for form handling
- Tailwind CSS for styling
- Axios for API requests

## Project Structure

The project follows a route-based file structure:

- `/register` → User registration form
- `/login` → Login form
- `/dashboard` → Dashboard with task listing
- `/tasks/create` → Page to create a new task
- `/tasks/[id]/edit` → Page to edit an existing task

Each task has the following fields:
- Title (string, required)
- Description (string)
- Due Date (date)
- Priority (Low, Medium, High)
- Status (To Do, In Progress, Completed)
- Created By (user)
- Assigned To (user)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## API Integration

The frontend is designed to work with a backend server that provides the following API endpoints:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/tasks → list tasks
- POST /api/tasks → create a task
- PUT /api/tasks/:id → update a task
- DELETE /api/tasks/:id → delete a task

For development purposes, the app includes mock data to showcase the UI functionality without an actual backend connection.

## Authentication

The system uses JWT tokens for authentication:
- Token is stored in localStorage
- API requests include the token in the Authorization header
- Protected routes redirect to login if not authenticated

## Screenshots

(Add screenshots of your application here)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
