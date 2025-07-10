import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const Header = ({ setActiveTab, activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-full md:w-64 bg-white shadow-md h-full">
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center p-4 border-b">
        <button className="text-gray-500 focus:outline-none">
          <svg 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar content */}
      <div className="p-6">
        <div className="hidden md:block">
          <div className="mt-2 text-sm text-gray-600">
            Welcome, {user?.name || 'User'}!
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Dashboard
          </h2>
          <div className="mt-4 space-y-2">
            <button
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                activeTab === 'assigned' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('assigned')}
            >
              <svg 
                className={`h-5 w-5 mr-2 ${
                  activeTab === 'assigned' ? 'text-blue-500' : 'text-gray-500'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Tasks Assigned to Me
            </button>
            
            <button
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                activeTab === 'created' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('created')}
            >
              <svg 
                className={`h-5 w-5 mr-2 ${
                  activeTab === 'created' ? 'text-blue-500' : 'text-gray-500'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tasks Created by Me
            </button>
            
            <button
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                activeTab === 'overdue' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('overdue')}
            >
              <svg 
                className={`h-5 w-5 mr-2 ${
                  activeTab === 'overdue' ? 'text-blue-500' : 'text-gray-500'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Overdue Tasks
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Actions
          </h2>
          <div className="mt-4 space-y-2">
            <Link 
              to="/tasks/create"
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg 
                className="h-5 w-5 mr-2 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Task
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-700 rounded-md hover:bg-red-50"
          >
            <svg 
              className="h-5 w-5 mr-2 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header; 