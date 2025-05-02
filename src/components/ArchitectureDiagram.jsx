
import React from 'react';
import { Activity, Database, Shield, Cloud, Server } from 'lucide-react';
import { Card } from './ui/card';

const ArchitectureDiagram = () => {
  const layers = [
    {
      name: "Multi-Agent Layer",
      components: [
        { name: "Hunter Agent", icon: <Activity className="w-5 h-5 text-blue-500" /> },
        { name: "Classifier Agent", icon: <Database className="w-5 h-5 text-purple-500" /> },
        { name: "Response Agent", icon: <Shield className="w-5 h-5 text-green-500" /> }
      ]
    },
    {
      name: "Shared Memory / State Layer",
      components: [
        { name: "Logs", icon: <Database className="w-5 h-5 text-yellow-500" /> },
        { name: "Network Traffic", icon: <Activity className="w-5 h-5 text-yellow-500" /> },
        { name: "Vulnerabilities DB", icon: <Database className="w-5 h-5 text-yellow-500" /> }
      ]
    },
    {
      name: "Simulation Environment Layer",
      components: [
        { name: "Cloud Network", icon: <Cloud className="w-5 h-5 text-cyan-500" /> },
        { name: "VMs", icon: <Server className="w-5 h-5 text-cyan-500" /> },
        { name: "Applications", icon: <Server className="w-5 h-5 text-cyan-500" /> }
      ]
    },
    {
      name: "External Data APIs",
      components: [
        { name: "Threat Intel", icon: <Database className="w-5 h-5 text-orange-500" /> },
        { name: "CVE Database", icon: <Database className="w-5 h-5 text-orange-500" /> },
        { name: "RAG", icon: <Database className="w-5 h-5 text-orange-500" /> }
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {layers.map((layer, index) => (
        <div key={layer.name} className="mb-8">
          <Card className="border border-gray-700 bg-gray-800/50 rounded-lg p-4 relative">
            <div className="text-xl font-semibold text-center mb-4">{layer.name}</div>
            
            <div className="grid grid-cols-3 gap-4">
              {layer.components.map(component => (
                <div key={component.name} className="flex flex-col items-center border border-gray-700 bg-gray-900/50 rounded p-3">
                  {component.icon}
                  <span className="text-sm mt-2 text-gray-300">{component.name}</span>
                </div>
              ))}
            </div>
            
            {index < layers.length - 1 && (
              <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 z-10">
                <div className="w-0.5 h-6 bg-blue-500" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r border-blue-500" />
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ArchitectureDiagram;
