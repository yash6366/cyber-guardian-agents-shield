
import React from 'react';
import { Activity, Database, Shield, Cloud, Server, Zap, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ArchitectureDiagram = () => {
  const layers = [
    {
      name: "Multi-Agent Layer",
      bgClass: "from-blue-950/50 to-blue-900/30",
      borderClass: "border-blue-800/50",
      components: [
        { name: "Hunter Agent", icon: <Activity className="w-6 h-6 text-blue-500" /> },
        { name: "Classifier Agent", icon: <Database className="w-6 h-6 text-purple-500" /> },
        { name: "Response Agent", icon: <Shield className="w-6 h-6 text-green-500" /> }
      ]
    },
    {
      name: "Shared Memory / State Layer",
      bgClass: "from-purple-950/50 to-purple-900/30",
      borderClass: "border-purple-800/50",
      components: [
        { name: "Logs", icon: <Database className="w-6 h-6 text-yellow-500" /> },
        { name: "Network Traffic", icon: <Activity className="w-6 h-6 text-yellow-500" /> },
        { name: "Vulnerabilities DB", icon: <Database className="w-6 h-6 text-yellow-500" /> }
      ]
    },
    {
      name: "Simulation Environment Layer",
      bgClass: "from-cyan-950/50 to-cyan-900/30",
      borderClass: "border-cyan-800/50",
      components: [
        { name: "Cloud Network", icon: <Cloud className="w-6 h-6 text-cyan-500" /> },
        { name: "VMs", icon: <Server className="w-6 h-6 text-cyan-500" /> },
        { name: "Applications", icon: <Server className="w-6 h-6 text-cyan-500" /> }
      ]
    },
    {
      name: "External Data APIs",
      bgClass: "from-orange-950/50 to-orange-900/30",
      borderClass: "border-orange-800/50",
      components: [
        { name: "Threat Intel", icon: <Database className="w-6 h-6 text-orange-500" /> },
{ name: "ML Models", icon: <Brain className="w-6 h-6 text-purple-500" /> },
{ name: "LLM Integration", icon: <Cpu className="w-6 h-6 text-blue-500" /> },
        { name: "CVE Database", icon: <Database className="w-6 h-6 text-orange-500" /> },
        { name: "RAG", icon: <Database className="w-6 h-6 text-orange-500" /> }
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl -z-10"></div>
      
      {layers.map((layer, index) => (
        <div key={layer.name} className="mb-12 transform hover:scale-[1.01] transition-all duration-300">
          <Card className={`border ${layer.borderClass} bg-gradient-to-br ${layer.bgClass} backdrop-blur-sm rounded-lg p-6 relative shadow-lg`}>
            <div className="text-xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              {layer.name}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {layer.components.map(component => (
                <div 
                  key={component.name} 
                  className="flex flex-col items-center border border-gray-700/50 bg-gray-900/70 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-gray-800/70 mb-3">
                    {component.icon}
                  </div>
                  <span className="text-sm mt-1 text-gray-300 text-center">{component.name}</span>
                </div>
              ))}
            </div>
            
            {index < layers.length - 1 && (
              <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 z-10 flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
              </div>
            )}
          </Card>
        </div>
      ))}
      
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-900/60 px-4 py-2 rounded-full border border-gray-800">
          <Lock className="w-4 h-4" />
          <span>Secure Multi-Agent Architecture</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
