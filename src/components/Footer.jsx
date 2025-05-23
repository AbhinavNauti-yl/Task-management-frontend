const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-4 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} Task Management System. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 