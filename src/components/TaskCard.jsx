import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'In Progress':
        return 'text-blue-600 bg-blue-100';
      case 'To Do':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.dueDate || task.status === 'Completed') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
        <div className="flex space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm mt-2 mb-4">{task.description}</p>
      )}
      
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-gray-500">Created by</p>
          <p className="font-medium">{task.createdBy?.name || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-gray-500">Assigned to</p>
          <p className="font-medium">{task.assignedTo?.name || 'Unassigned'}</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm">
        <p className={`${isOverdue() ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
          Due: {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
          {isOverdue() && ' (Overdue)'}
        </p>
      </div>
      
      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
        <Link 
          to={`/tasks/${task._id}/edit`}
          className="text-sm bg-blue-50 text-blue-600 py-1 px-3 rounded-md mr-2 hover:bg-blue-100"
        >
          Edit
        </Link>
        <button 
          onClick={() => onDelete(task._id)}
          className="text-sm bg-red-50 text-red-600 py-1 px-3 rounded-md hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 