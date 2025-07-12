import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { motion } from "motion/react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isScrolled, setIscrolled] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIscrolled(window.scrollY > 0)
    })

    return window.removeEventListener("scroll", () => {
      setIscrolled(window.scrollY > 0)
    })
  }, [])

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={` fixed z-50 w-full bg-white text-black  ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"} `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <span className="flex items-center">
                <svg 
                  className="h-8 w-8 mr-2" 
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
                TaskManager
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="py-2 px-3 rounded hover:bg-blue-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/tasks/create" 
                  className="py-2 px-3 rounded hover:bg-blue-100 transition-colors"
                >
                  New Task
                </Link>
                <div className="relative ml-4 group">
                  <button className="flex items-center py-2 px-3 rounded hover:bg-blue-100 transition-colors">
                    <span className="mr-1">{user?.name || 'User'}</span>
                    <svg 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-0 w-30 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div className="md:hidden bg-black/60 text-white pb-4  "
            initial= {{
              opacity: 0
            }}
            whileInView={{
              opacity: 1,
              animationDuration:3000
            }}
          >
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/dashboard" 
                  className="py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/tasks/create" 
                  className="py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Task
                </Link>
                <Link 
                  to="/profile" 
                  className="py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 