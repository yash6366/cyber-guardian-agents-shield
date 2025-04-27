
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProjectOverview from "@/components/ProjectOverview";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import AgentCard from "@/components/AgentCard";
import StatusMonitor from "@/components/StatusMonitor";
import CallToAction from "@/components/CallToAction";
import { Card } from "@/components/ui/card";

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
      <HeroSection />
      <StatsSection />
      <ProjectOverview />
      
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

      <CallToAction />
    </div>
  );
};

export default Index;
