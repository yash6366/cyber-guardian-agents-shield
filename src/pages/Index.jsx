
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse -top-48 -right-48" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -left-48" />
      </div>

      {/* Hero Section with Animation */}
      <section className="container mx-auto px-4 pt-24 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-500 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Cyber Guardian
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Next-generation AI agents for real-time autonomous cybersecurity defense
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <Activity className="mr-2 h-5 w-5" /> Live Dashboard
              </Button>
            </Link>
            <Link to="/simulation">
              <Button variant="outline" size="lg">
                <Lock className="mr-2 h-5 w-5" /> Try Simulation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Architecture Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
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
          className="mb-16"
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

        {/* Status Monitor */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <StatusMonitor />
        </motion.section>
      </section>
    </div>
  );
};

export default Index;
