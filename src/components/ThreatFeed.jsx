
import React from 'react';
import { AlertTriangle, Check, Shield, Clock } from 'lucide-react';

const ThreatFeed = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-gray-700/60 text-gray-300 border-gray-600";
      case "Medium":
        return "bg-yellow-900/60 text-yellow-400 border-yellow-600/40";
      case "High":
        return "bg-orange-900/60 text-orange-400 border-orange-600/40";
      case "Critical":
        return "bg-red-900/60 text-red-400 border-red-600/40";
      default:
        return "bg-gray-700/60 text-gray-300 border-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Mitigated") {
      return <Check className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-4 relative">
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
      
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className="border border-gray-700/50 bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <h4 className="font-medium text-white">{alert.type}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <p>{alert.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
            <span className={`text-sm ${
              alert.status === "Mitigated" ? "text-green-500" : 
              alert.status === "Investigating" ? "text-yellow-500" : "text-gray-400"
            }`}>
              {alert.status}
            </span>
            {getStatusIcon(alert.status)}
          </div>
        </div>
      ))}
      
      {alerts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Shield className="w-16 h-16 text-gray-600/30 mx-auto mb-4" />
          <p className="text-xl font-light">No recent alerts</p>
          <p className="text-sm mt-2">The system is currently operating normally</p>
        </div>
      )}
    </div>
  );
};

export default ThreatFeed;
