
import { Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
