
import React, { useEffect } from "react";
import { Shield, FileText, Code, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import AgentCard from "@/components/AgentCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusMonitor from "@/components/StatusMonitor";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const agents = [
    {
      name: "Hunter Agent",
      description: "Autonomous threat detection and monitoring",
      status: "Active",
      type: "detection"
    },
    {
      name: "Classifier Agent",
      description: "Dynamic threat classification using LLMs",
      status: "Active",
      type: "classification"
    },
    {
      name: "Response Agent", 
      description: "Real-time self-healing response system",
      status: "Standing By",
      type: "response"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-8">
      {/* Compact Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Next-generation AI agents for real-time autonomous cybersecurity defense
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Dashboard
                  <Activity className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link to="/simulation">
              <Button variant="outline">Try Simulation</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compact Stats Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-400">99.9%</h3>
            <p className="text-gray-400 text-sm">Threat Detection</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold text-cyan-400">&lt;50ms</h3>
            <p className="text-gray-400 text-sm">Response Time</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold text-purple-400">24/7</h3>
            <p className="text-gray-400 text-sm">Active Monitoring</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="container mx-auto px-4 mb-12">
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Project Overview</h2>
          </div>
          <p className="text-gray-300 mb-4">
            A multi-agent AI system for autonomous cybersecurity defense, 
            consisting of three specialized agents that detect, classify, and respond to threats in real-time.
          </p>
        </Card>
      </section>

      {/* Agents Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Defense Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">System Architecture</h2>
        <ArchitectureDiagram />
      </section>

      {/* System Monitor */}
      <section className="container mx-auto px-4">
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-6">System Monitor</h2>
          <StatusMonitor />
        </Card>
      </section>
    </div>
  );
};

export default Index;
