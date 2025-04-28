
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Server, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Simulation', path: '/simulation', icon: <Server className="w-5 h-5" /> },
    { name: 'Configuration', path: '/config', icon: <Settings className="w-5 h-5" /> }
  ];
  
  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800">
      <div className="px-4 py-6">
        <Link to="/" className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-blue-500 mr-2" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Cyber Guardian
          </span>
        </Link>
        
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-900/50 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
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
