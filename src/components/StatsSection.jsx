
import { Activity, Shield, Clock } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900/20 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-blue-400 animate-pulse" />
              <div>
                <h3 className="text-3xl font-bold text-blue-400 mb-1 relative">
                  99.9%
                  <span className="absolute -top-1 -right-4 text-sm text-blue-300">↑</span>
                </h3>
                <p className="text-gray-400">Threat Detection Rate</p>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-3xl font-bold text-cyan-400 mb-1">
                  &lt;50ms
                  <span className="text-sm text-cyan-300 ml-1">response</span>
                </h3>
                <p className="text-gray-400">Average Response Time</p>
              </div>
            </div>
          </div>

          <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-3xl font-bold text-purple-400 mb-1">24/7</h3>
                <p className="text-gray-400">Active Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
