
import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, Brain, Zap } from "lucide-react";

interface AgentCardProps {
  name: string;
  description: string;
  type: 'hunter' | 'classifier' | 'response';
  status: 'active' | 'inactive' | 'learning';
}

const AgentCard: React.FC<AgentCardProps> = ({ name, description, type, status }) => {
  const getIcon = () => {
    switch (type) {
      case 'hunter': return <Shield className="w-6 h-6 text-blue-500" />;
      case 'classifier': return <Brain className="w-6 h-6 text-purple-500" />;
      case 'response': return <Zap className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="text-xl font-semibold ml-3">{name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'active' ? 'bg-green-900/40 text-green-400' :
          status === 'learning' ? 'bg-yellow-900/40 text-yellow-400' :
          'bg-red-900/40 text-red-400'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-300">{description}</p>
    </Card>
  );
};

export default AgentCard;
