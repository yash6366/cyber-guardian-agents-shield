
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Config = () => {
  const threatPolicies = [
    {
      id: 1,
      name: "SQL Injection Response",
      severity: "Critical"
    },
    {
      id: 2,
      name: "DDoS Mitigation",
      severity: "High"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Configuration</h1>
        </div>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              Response Policies
            </h2>
            
            <div className="space-y-6">
              {threatPolicies.map(policy => (
                <div key={policy.id} className="border border-gray-700 rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className={`w-5 h-5 mr-2 ${
                        policy.severity === "Critical" ? "text-red-500" :
                        policy.severity === "High" ? "text-orange-500" :
                        "text-yellow-500"
                      }`} />
                      <h3 className="font-medium">{policy.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Config;
