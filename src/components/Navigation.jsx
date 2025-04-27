
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Server, Settings, Activity, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems = [
    { name: 'Overview', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Simulation', path: '/simulation', icon: <Server className="w-5 h-5" /> },
    { name: 'Configuration', path: '/config', icon: <Settings className="w-5 h-5" /> }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-gray-900 border-b border-gray-800'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </span>
          </Link>
          
          <div className="hidden md:flex ml-auto items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path 
                    ? 'bg-blue-900/50 text-white border-b-2 border-blue-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="relative ml-4">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <Activity className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-gray-900 animate-pulse"></span>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="ml-auto md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-blue-900/50 text-white border-l-4 border-blue-500'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
