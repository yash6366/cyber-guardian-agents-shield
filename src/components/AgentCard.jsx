
import React from "react";
import { Activity, Shield, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

const AgentCard = ({ name, description, status, type }) => {
  const getIcon = () => {
    switch (type) {
      case "detection":
        return Activity;
      case "classification":
        return Shield;
      case "response":
        return Bot;
      default:
        return Shield;
    }
  };

  const Icon = getIcon();
  const statusColor = status === "Active" ? "bg-green-500" : "bg-yellow-500";
  
  let gradientClass = "";
  let hoverGradient = "";
  
  switch (type) {
    case "detection":
      gradientClass = "from-blue-500/10 to-cyan-500/10";
      hoverGradient = "group-hover:from-blue-500/20 group-hover:to-cyan-500/20";
      break;
    case "classification":
      gradientClass = "from-purple-500/10 to-blue-500/10";
      hoverGradient = "group-hover:from-purple-500/20 group-hover:to-blue-500/20";
      break;
    case "response":
      gradientClass = "from-cyan-500/10 to-blue-500/10";
      hoverGradient = "group-hover:from-cyan-500/20 group-hover:to-blue-500/20";
      break;
  }

  return (
    <Card className={`bg-gradient-to-br ${gradientClass} backdrop-blur-sm border-gray-700/50 overflow-hidden relative group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-800/70 rounded-lg mr-3">
            <Icon className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{name}</h3>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center mt-auto">
          <div className={`w-2 h-2 rounded-full mr-2 ${statusColor}`} />
          <span className="text-sm text-gray-400">{status}</span>
        </div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Animated corner accent */}
      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  );
};

export default AgentCard;
