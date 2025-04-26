
import { Shield, FileText, Code } from "lucide-react";
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

      {/* Project Summary */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">Project Overview</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <p>
                This project implements a multi-agent AI system for autonomous cybersecurity defense, 
                consisting of three specialized agents that work together to detect, classify, and respond to threats 
                in real-time.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="text-blue-400 font-medium">Real-time Threat Detection:</span> The Hunter Agent uses machine learning to detect threats in real-time.</li>
                  <li><span className="text-blue-400 font-medium">Dynamic Threat Classification:</span> The Classifier Agent uses LLMs and RAG to provide detailed threat classifications.</li>
                  <li><span className="text-blue-400 font-medium">Autonomous Response:</span> The Response Agent automatically executes appropriate response actions.</li>
                  <li><span className="text-blue-400 font-medium">Simulated Environment:</span> The system includes a realistic network simulation for testing and demonstration.</li>
                  <li><span className="text-blue-400 font-medium">Configurable Policies:</span> Response policies can be configured for different attack types and severity levels.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Technical Implementation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="text-blue-400 font-medium">Machine Learning:</span> The Hunter Agent uses a Random Forest classifier for threat detection.</li>
                  <li><span className="text-blue-400 font-medium">LLMs:</span> The Classifier Agent uses LLMs for threat classification and context generation.</li>
                  <li><span className="text-blue-400 font-medium">Multi-Agent Architecture:</span> The agents operate asynchronously and communicate through a shared memory space.</li>
                  <li><span className="text-blue-400 font-medium">Containerization:</span> The system is containerized using Docker for easy deployment.</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-center pt-2">
                <Code className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-400 text-sm">View source code for implementation details</span>
              </div>
            </div>
          </div>
        </Card>
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
