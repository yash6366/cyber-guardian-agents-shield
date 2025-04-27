import React from 'react';
import { Activity, Database, Shield, Cloud, Server, Zap, Lock, Brain, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ArchitectureDiagram = () => {
  const layers = [
    {
      name: "Multi-Agent Layer",
      bgClass: "from-blue-950/50 to-blue-900/30",
      borderClass: "border-blue-800/50",
      components: [
        { name: "Hunter Agent", icon: <Brain className="w-6 h-6 text-blue-500" /> },
        { name: "Classifier Agent", icon: <Cpu className="w-6 h-6 text-purple-500" /> },
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
        { name: "Vulnerabilities DB", icon: <Lock className="w-6 h-6 text-yellow-500" /> }
      ]
    },
    {
      name: "Simulation Environment Layer",
      bgClass: "from-cyan-950/50 to-cyan-900/30",
      borderClass: "border-cyan-800/50",
      components: [
        { name: "Cloud Network", icon: <Cloud className="w-6 h-6 text-cyan-500" /> },
        { name: "VMs", icon: <Server className="w-6 h-6 text-cyan-500" /> },
        { name: "Applications", icon: <Zap className="w-6 h-6 text-cyan-500" /> }
      ]
    }
  ];

  return (
    <div className="p-4">
      <div className="space-y-4">
        {layers.map((layer, index) => (
          <Card key={index} className={`p-4 bg-gradient-to-r ${layer.bgClass} border ${layer.borderClass}`}>
            <h3 className="text-lg font-semibold mb-4 text-white">{layer.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layer.components.map((component, compIndex) => (
                <div key={compIndex} className="flex items-center space-x-3 p-3 rounded-lg bg-black/20">
                  {component.icon}
                  <span className="text-sm text-gray-200">{component.name}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;