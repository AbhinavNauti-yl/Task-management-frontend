import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isAuthPage, setIsAuthPage] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setIsAuthPage(pathname === '/login' || pathname === '/register');
    }
  }, []);

  // No footer on login/register pages
  if (isAuthPage && !isAuthenticated) {
    return null;
  }
  
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Task Manager</h3>
            <p className="text-gray-300 text-sm">
              A powerful task management system to help you organize your work and boost productivity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tasks/create" className="text-gray-300 hover:text-white">
                  Create Task
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@taskmanager.com</li>
              <li>Phone: +91 750X9 81X9X</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {currentYear} Task Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 