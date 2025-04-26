
import { Activity, Shield, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  name: string;
  description: string;
  status: string;
  type: "detection" | "classification" | "response";
}

const AgentCard = ({ name, description, status, type }: AgentCardProps) => {
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

  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden relative group">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center">
          <div
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              status === "Active" ? "bg-green-500" : "bg-yellow-500"
            )}
          />
          <span className="text-sm text-gray-400">{status}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};

export default AgentCard;
