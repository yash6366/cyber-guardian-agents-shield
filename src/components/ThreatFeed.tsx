
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';

interface ThreatAlert {
  id: number;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  time: string;
  status: "Mitigated" | "Investigating" | "Pending";
}

interface ThreatFeedProps {
  alerts: ThreatAlert[];
}

const ThreatFeed = ({ alerts }: ThreatFeedProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-gray-700 text-gray-300";
      case "Medium":
        return "bg-yellow-900/60 text-yellow-400";
      case "High":
        return "bg-orange-900/60 text-orange-400";
      case "Critical":
        return "bg-red-900/60 text-red-400";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "Mitigated") {
      return <Check className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className="border border-gray-700 bg-gray-900/50 rounded p-4 flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
              <h4 className="font-medium">{alert.type}</h4>
            </div>
            <p className="text-sm text-gray-400 mt-1">{alert.time}</p>
          </div>
          <div className="flex items-center gap-2">
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
        <div className="text-center py-8 text-gray-400">
          No recent alerts
        </div>
      )}
    </div>
  );
};

export default ThreatFeed;
