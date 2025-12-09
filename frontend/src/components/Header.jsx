import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBriefcase, FiUsers, FiMail, FiLogIn } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', icon: <FiHome />, href: '#home' },
    { name: 'Projects', icon: <FiBriefcase />, href: '#projects' },
    { name: 'Clients', icon: <FiUsers />, href: '#clients' },
    { name: 'Contact', icon: <FiMail />, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PortfolioPro
              </h1>
              <p className="text-xs text-gray-500">Professional Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
            
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <FiLogIn />
              <span>Admin Panel</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-blue-600">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
              <Link
                to="/login"
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiLogIn />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;