
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Server, Settings, Activity } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Simulation', path: '/simulation', icon: <Server className="w-5 h-5" /> },
    { name: 'Configuration', path: '/config', icon: <Settings className="w-5 h-5" /> }
  ];
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-gray-900 border-b border-gray-800`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </span>
          </Link>
          
          <div className="flex ml-auto items-center space-x-4">
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
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            ))}
            
            <div className="relative">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <Activity className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-gray-900 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
