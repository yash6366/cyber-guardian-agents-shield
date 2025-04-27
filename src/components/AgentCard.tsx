
import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, Brain, Zap } from "lucide-react";

interface AgentCardProps {
  type: 'hunter' | 'classifier' | 'response';
  status: 'active' | 'inactive' | 'learning';
  metrics: {
    accuracy?: number;
    latency?: number;
    threats?: number;
  };
}

const AgentCard: React.FC<AgentCardProps> = ({ type, status, metrics }) => {
  const getIcon = () => {
    switch (type) {
      case 'hunter': return <Shield className="w-6 h-6 text-blue-500" />;
      case 'classifier': return <Brain className="w-6 h-6 text-purple-500" />;
      case 'response': return <Zap className="w-6 h-6 text-orange-500" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'hunter': return 'Hunter Agent';
      case 'classifier': return 'Classifier Agent';
      case 'response': return 'Response Agent';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="text-xl font-semibold ml-3">{getTitle()}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'active' ? 'bg-green-900/40 text-green-400' :
          status === 'learning' ? 'bg-yellow-900/40 text-yellow-400' :
          'bg-red-900/40 text-red-400'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {metrics.accuracy && (
          <div>
            <p className="text-gray-400 text-sm">Accuracy</p>
            <p className="text-xl font-semibold">{metrics.accuracy}%</p>
          </div>
        )}
        {metrics.latency && (
          <div>
            <p className="text-gray-400 text-sm">Latency</p>
            <p className="text-xl font-semibold">{metrics.latency}ms</p>
          </div>
        )}
        {metrics.threats && (
          <div>
            <p className="text-gray-400 text-sm">Threats</p>
            <p className="text-xl font-semibold">{metrics.threats}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AgentCard;
