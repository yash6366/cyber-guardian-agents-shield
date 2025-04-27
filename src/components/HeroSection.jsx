
import { Shield, Activity, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-8 gap-6">
          <Shield className="w-16 h-16 text-blue-500 animate-pulse" />
          <Database className="w-12 h-12 text-purple-500" />
          <Activity className="w-14 h-14 text-cyan-500" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-400 mb-6 text-center">
          Cyber Guardian
        </h1>
        
        <p className="text-xl md:text-2xl text-center text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Next-generation AI agents for real-time autonomous cybersecurity defense, 
          powered by machine learning and advanced threat detection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="group relative overflow-hidden px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Dashboard
                <Activity className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          
          <Link to="/simulation">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 transition-colors duration-300"
            >
              <Shield className="w-5 h-5 mr-2" />
              Try Simulation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
