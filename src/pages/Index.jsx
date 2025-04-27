
import { Shield, Activity, Lock, Database, Cloud, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AgentCard from "@/components/AgentCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusMonitor from "@/components/StatusMonitor";

const Index = () => {
  const agents = [
    {
      name: "Hunter Agent",
      description: "Uses machine learning to detect threats in network traffic and system logs",
      status: "Active",
      type: "detection"
    },
    {
      name: "Classifier Agent",
      description: "Employs LLMs and RAG for dynamic threat classification",
      status: "Active",
      type: "classification"
    },
    {
      name: "Response Agent",
      description: "Executes autonomous response actions based on threat assessments",
      status: "Standing By",
      type: "response"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="mb-8 flex justify-center">
          <Shield className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Autonomous Cyber Defense
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Multi-agent AI system for real-time autonomous cybersecurity defense. Combining machine learning, LLMs, and autonomous agents for comprehensive threat protection.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Defense Dashboard
          </Button>
        </Link>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <Activity className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">98.2%</h3>
            <p className="text-gray-400">Threat Detection Rate</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <Lock className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">850ms</h3>
            <p className="text-gray-400">Average Response Time</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <Database className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">15TB</h3>
            <p className="text-gray-400">Data Processed Daily</p>
          </div>
        </div>
      </motion.section>

      {/* Architecture Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          System Architecture
        </h2>
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <ArchitectureDiagram />
        </div>
      </motion.section>

      {/* Agents Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Defense Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              className="transform hover:-translate-y-2 transition-all duration-300"
            >
              <AgentCard {...agent} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* System Monitor */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">System Status</h2>
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
          <StatusMonitor />
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
