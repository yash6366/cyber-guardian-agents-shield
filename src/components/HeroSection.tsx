import { Shield, Activity, Database, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-green-900/30 text-green-400 border-green-600/40 px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            All Systems Operational
          </Badge>
        </div>

        {/* Main Icons */}
        <div className="flex items-center justify-center mb-8 gap-6">
          <div className="relative">
            <Shield className="w-16 h-16 text-blue-500 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <Database className="w-12 h-12 text-purple-500" />
          <Activity className="w-14 h-14 text-cyan-500" />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-400 mb-6">
          Cyber Guardian
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-center text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
          Next-generation autonomous cybersecurity platform powered by AI agents for 
          <span className="text-blue-400 font-semibold"> real-time threat detection</span>, 
          <span className="text-purple-400 font-semibold"> intelligent classification</span>, and 
          <span className="text-cyan-400 font-semibold"> automated response</span>.
        </p>

        {/* Key Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">98.7%</div>
            <div className="text-gray-400">Detection Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">4.2min</div>
            <div className="text-gray-400">Mean Time to Detect</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">24/7</div>
            <div className="text-gray-400">Autonomous Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-gray-400">Threats Mitigated</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="group relative overflow-hidden px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>
          
          <Link to="/simulation">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View Demo
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-4">Trusted by security teams worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-gray-600 font-semibold">SOC 2 Compliant</div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="text-gray-600 font-semibold">ISO 27001</div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="text-gray-600 font-semibold">MITRE ATT&CK</div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="text-gray-600 font-semibold">Zero Trust</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;