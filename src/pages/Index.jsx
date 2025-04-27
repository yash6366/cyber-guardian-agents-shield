import { Shield, FileText, Code, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import AgentCard from "@/components/AgentCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusMonitor from "@/components/StatusMonitor";

const Index = () => {
  useEffect(() => {
    // Smooth scroll animation for sections
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Hero Section with animated gradient */}
      <section className="container mx-auto px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-16 h-16 text-blue-500 mr-4 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-center text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Next-generation AI agents for real-time autonomous cybersecurity defense, powered by machine learning and advanced threat detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="group relative overflow-hidden px-8 py-3 text-lg">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Dashboard
                  <Activity className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transform transition-transform group-hover:scale-105"></div>
              </Button>
            </Link>
            <Link to="/simulation">
              <Button variant="outline" size="lg" className="text-lg border-blue-500/50 hover:bg-blue-500/10">
                Try Simulation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">99.9%</h3>
              <p className="text-gray-400">Threat Detection Rate</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20">
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                &lt;50ms
              </h3>
              <p className="text-gray-400">Response Time</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-3xl font-bold text-purple-400 mb-2">24/7</h3>
              <p className="text-gray-400">Active Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Summary with glass effect */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gray-800/40 border-gray-700 backdrop-blur-xl">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Project Overview</h2>
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

      {/* Architecture Section with enhanced diagram */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          System Architecture
        </h2>
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Agents Section with hover effects */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Defense Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div 
              key={agent.name}
              className="transform hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <AgentCard {...agent} />
            </div>
          ))}
        </div>
      </section>

      {/* Live Monitor Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gray-800/40 border-gray-700 backdrop-blur-xl">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-8">System Monitor</h2>
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <StatusMonitor />
            </div>
          </div>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to strengthen your security?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Experience the next generation of cybersecurity with our autonomous defense system.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
