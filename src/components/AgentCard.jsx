
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
  const gradientClass = type === "detection" 
    ? "from-blue-500/10 to-cyan-500/10" 
    : type === "classification" 
    ? "from-purple-500/10 to-blue-500/10" 
    : "from-cyan-500/10 to-blue-500/10";

  return (
    <Card className={`bg-gradient-to-br ${gradientClass} backdrop-blur-sm border-gray-700/50 overflow-hidden relative group`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-blue-500 mr-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${statusColor}`} />
          <span className="text-sm text-gray-400">{status}</span>
        </div>
      </div>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${gradientClass}`} />
    </Card>
  );
};

export default AgentCard;
