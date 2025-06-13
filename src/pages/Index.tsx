import { Shield, FileText, Code, Activity, Users, Globe, Zap, TrendingUp, Lock, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AgentCard from "@/components/AgentCard";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import StatusMonitor from "@/components/StatusMonitor";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CallToAction from "@/components/CallToAction";
import ProjectOverview from "@/components/ProjectOverview";

const Index = () => {
  const agents = [
    {
      name: "Hunter Agent",
      description: "AI-powered threat detection using advanced machine learning algorithms and behavioral analysis",
      status: "active" as const,
      type: "hunter" as const,
    },
    {
      name: "Classifier Agent",
      description: "Dynamic threat classification using LLMs, RAG, and real-time threat intelligence feeds",
      status: "active" as const,
      type: "classifier" as const,
    },
    {
      name: "Response Agent",
      description: "Autonomous incident response with automated containment and remediation capabilities",
      status: "active" as const,
      type: "response" as const,
    },
  ];

  const capabilities = [
    {
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      title: "Real-time Threat Detection",
      description: "Advanced ML algorithms detect threats in milliseconds with 98.7% accuracy",
      metrics: "< 4.2min MTTD"
    },
    {
      icon: <Database className="w-6 h-6 text-purple-500" />,
      title: "Threat Intelligence Integration",
      description: "Real-time feeds from 12+ sources including MISP, commercial, and dark web intelligence",
      metrics: "1,432 IOCs/day"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Autonomous Response",
      description: "Automated containment and remediation with policy-based response workflows",
      metrics: "< 12.5min MTTR"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "SOC Integration",
      description: "Seamless integration with security operations centers and analyst workflows",
      metrics: "24/7 monitoring"
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      title: "Vulnerability Management",
      description: "Continuous vulnerability assessment with automated patch management",
      metrics: "89 active vulns"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Incident Response",
      description: "Structured playbooks with automated task execution and SLA tracking",
      metrics: "95% SLA compliance"
    }
  ];

  const securityFeatures = [
    "MITRE ATT&CK Framework Integration",
    "Zero Trust Architecture Support",
    "SIEM/SOAR Integration",
    "Compliance Reporting (SOC 2, ISO 27001)",
    "Threat Hunting Capabilities",
    "Digital Forensics Integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Project Overview */}
      <ProjectOverview />

      {/* Capabilities Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Advanced Security Capabilities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade cybersecurity powered by artificial intelligence and machine learning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-700/30 transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-900/50 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  {capability.icon}
                </div>
                <h3 className="font-semibold">{capability.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">{capability.description}</p>
              <Badge variant="outline" className="text-xs">
                {capability.metrics}
              </Badge>
            </Card>
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Multi-Agent Architecture
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Distributed AI agents working in harmony to provide comprehensive cybersecurity coverage
          </p>
        </div>
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Autonomous Defense Agents</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three specialized AI agents providing end-to-end threat detection, classification, and response
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="transform hover:-translate-y-2 transition-all duration-300"
            >
              <AgentCard {...agent} />
            </div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Enterprise Security Standards</h2>
            <p className="text-gray-400 mb-8">
              Built with enterprise security requirements in mind, our platform integrates with existing 
              security infrastructure and follows industry best practices.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="bg-gray-800/50 border-gray-700 p-8">
            <div className="text-center">
              <Lock className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Security First</h3>
              <p className="text-gray-400 mb-6">
                Zero trust architecture with end-to-end encryption, role-based access control, 
                and comprehensive audit logging.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900/50 p-3 rounded">
                  <p className="font-medium text-green-400">99.9%</p>
                  <p className="text-gray-400">Uptime SLA</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded">
                  <p className="font-medium text-blue-400">SOC 2</p>
                  <p className="text-gray-400">Compliant</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* System Monitor */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real-time System Status</h2>
          <p className="text-gray-400">Live monitoring of threat detection and system performance</p>
        </div>
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <StatusMonitor />
        </Card>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default Index;