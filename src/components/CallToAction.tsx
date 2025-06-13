import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Activity, ArrowRight, Zap } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-gradient"></div>
      
      <div className="relative backdrop-blur-sm rounded-2xl border border-blue-500/10 p-12 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="flex justify-center gap-4 mb-8">
          <Shield className="w-10 h-10 text-blue-500 animate-pulse" />
          <Activity className="w-10 h-10 text-cyan-500" />
          <Zap className="w-10 h-10 text-purple-500 animate-pulse delay-300" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Ready to Transform Your Security?
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-3xl mx-auto text-lg">
          Join the next generation of cybersecurity with our autonomous AI-powered defense system.
          Experience real-time threat detection, intelligent classification, and automated response.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Enterprise Ready</h3>
            <p className="text-sm text-gray-400">SOC 2 compliant with enterprise-grade security</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <Activity className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Real-time Protection</h3>
            <p className="text-sm text-gray-400">24/7 autonomous monitoring and response</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">AI-Powered</h3>
            <p className="text-sm text-gray-400">Advanced machine learning and threat intelligence</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 px-8 py-4 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Protecting Now
              <ArrowRight className="w-5  h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link to="/simulation">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
            >
              <Activity className="w-5 h-5 mr-2" />
              See It In Action
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <p className="text-gray-500 text-sm">
            Protecting organizations worldwide • 99.9% uptime SLA • 24/7 expert support
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;