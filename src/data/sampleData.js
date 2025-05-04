// Sample users for testing
export const sampleUsers = [
  {
    _id: "661f1e4c92d3c3b8a0f9a123",
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    _id: "661f1e4c92d3c3b8a0f9a456",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  }
];

// Sample tasks for testing UI
export const sampleTasks = [
  {
    _id: "task123",
    title: "Design UI",
    description: "Create responsive dashboard layout",
    dueDate: "2024-06-30",
    priority: "High",
    status: "In Progress",
    createdBy: { 
      _id: "661f1e4c92d3c3b8a0f9a123", 
      name: "John Doe",
      email: "john@example.com" 
    },
    assignedTo: { 
      _id: "661f1e4c92d3c3b8a0f9a456",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "task456",
    title: "Implement Authentication",
    description: "Set up JWT authentication for the API",
    dueDate: "2024-06-25",
    priority: "Medium",
    status: "To Do",
    createdBy: { 
      _id: "661f1e4c92d3c3b8a0f9a123", 
      name: "John Doe",
      email: "john@example.com" 
    },
    assignedTo: { 
      _id: "661f1e4c92d3c3b8a0f9a123",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "task789",
    title: "Database Setup",
    description: "Configure MongoDB connection and create schemas",
    dueDate: "2024-06-15",
    priority: "High",
    status: "Completed",
    createdBy: { 
      _id: "661f1e4c92d3c3b8a0f9a456", 
      name: "Jane Smith",
      email: "jane@example.com" 
    },
    assignedTo: { 
      _id: "661f1e4c92d3c3b8a0f9a123",
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    _id: "task101",
    title: "Deploy to Production",
    description: "Configure deployment pipeline and deploy the application",
    dueDate: "2024-07-10",
    priority: "High",
    status: "To Do",
    createdBy: { 
      _id: "661f1e4c92d3c3b8a0f9a123", 
      name: "John Doe",
      email: "john@example.com" 
    },
    assignedTo: { 
      _id: "661f1e4c92d3c3b8a0f9a456",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    _id: "task202",
    title: "Create User Documentation",
    description: "Write documentation for users explaining how to use the system",
    dueDate: "2024-07-05",
    priority: "Medium",
    status: "To Do",
    createdBy: { 
      _id: "661f1e4c92d3c3b8a0f9a456", 
      name: "Jane Smith",
      email: "jane@example.com" 
    },
    assignedTo: { 
      _id: "661f1e4c92d3c3b8a0f9a456",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  }
];

// Sample login responses for development (without real backend)
export const sampleLoginResponses = {
  "john@example.com": {
    user: {
      _id: "661f1e4c92d3c3b8a0f9a123",
      name: "John Doe",
      email: "john@example.com"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjFmMWU0YzkyZDNjM2I4YTBmOWExMjMiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MTU0MjQxMjF9.2kYt8nEHTfJ9JQ1op0iA9S3-Z-J9RBgqxjFL5JKldQM"
  },
  "jane@example.com": {
    user: {
      _id: "661f1e4c92d3c3b8a0f9a456",
      name: "Jane Smith",
      email: "jane@example.com"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjFmMWU0YzkyZDNjM2I4YTBmOWE0NTYiLCJlbWFpbCI6ImphbmVAZXhhbXBsZS5jb20iLCJpYXQiOjE2MTU0MjQxMjF9.8N7t0uyAJwGHJObMKO7x4gUvUZmVIRZ-MdGHXUn1aBs"
  }
}; 