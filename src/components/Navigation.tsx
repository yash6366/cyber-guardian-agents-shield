import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Server, Settings, Activity, User, BarChart } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: <Shield className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Simulation', path: '/simulation', icon: <Server className="w-5 h-5" /> },
    { name: 'Reports', path: '/reports', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Configuration', path: '/config', icon: <Settings className="w-5 h-5" /> },
    { name: 'Account', path: '/auth', icon: <User className="w-5 h-5" />}
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </span>
          </Link>

          <div className="ml-auto flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="relative rounded-full w-8 h-8 flex items-center justify-center bg-blue-700 text-white">
              <Activity className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-gray-900"></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;