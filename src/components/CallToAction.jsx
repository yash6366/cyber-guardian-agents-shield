
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Activity } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-gradient"></div>
      
      <div className="relative backdrop-blur-sm rounded-2xl border border-blue-500/10 p-8 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="flex justify-center gap-4 mb-6">
          <Shield className="w-8 h-8 text-blue-500 animate-pulse" />
          <Activity className="w-8 h-8 text-cyan-500" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Ready to strengthen your security?
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Experience the next generation of cybersecurity with our autonomous defense system.
          Our AI agents work 24/7 to protect your infrastructure.
        </p>
        
        <Link to="/dashboard">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <Shield className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
