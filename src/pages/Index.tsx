
import { Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import AgentCard from "@/components/AgentCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusMonitor from "@/components/StatusMonitor";

const Index = () => {
  const agents = [
    {
      name: "Hunter Agent",
      description: "Autonomous threat detection and monitoring",
      status: "Active",
      type: "detection" as const,
    },
    {
      name: "Classifier Agent",
      description: "Dynamic threat classification using LLMs",
      status: "Active",
      type: "classification" as const,
    },
    {
      name: "Response Agent",
      description: "Real-time self-healing response system",
      status: "Standing By",
      type: "response" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-12 h-12 text-blue-500 mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Cyber Guardian
          </h1>
        </div>
        <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-12">
          Next-generation AI agents for real-time autonomous cybersecurity defense
        </p>
      </section>

      {/* Architecture Diagram */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
        <ArchitectureDiagram />
      </section>

      {/* Agents Status */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Defense Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard 
              key={agent.name}
              name={agent.name}
              description={agent.description}
              status={agent.status}
              type={agent.type}
            />
          ))}
        </div>
      </section>

      {/* Status Monitor */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gray-800/50 border-gray-700">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">System Monitor</h2>
            <StatusMonitor />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;
