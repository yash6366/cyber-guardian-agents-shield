import React from 'react';
import { Card } from "@/components/ui/card";
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

const ThreatFeed: React.FC<ThreatFeedProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
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

  const getStatusIcon = (status: string) => {
    if (status === "Mitigated") {
      return <Check className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Threats</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div>
              <p className="font-medium">{alert.type}</p>
              <p className="text-sm opacity-70">{alert.time}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm">{alert.status}</span>
              {getStatusIcon(alert.status)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ThreatFeed;