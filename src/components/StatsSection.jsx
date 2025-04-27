
const StatsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">99.9%</h3>
            <p className="text-gray-400">Threat Detection Rate</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-cyan-400 mb-2">&lt;50ms</h3>
            <p className="text-gray-400">Response Time</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-3xl font-bold text-purple-400 mb-2">24/7</h3>
            <p className="text-gray-400">Active Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
