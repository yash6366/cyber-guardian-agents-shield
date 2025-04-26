import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Shield, Database, Bell, Check, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import AgentDetailPanel from "@/components/AgentDetailPanel";
import ThreatFeed from "@/components/ThreatFeed";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<"hunter" | "classifier" | "response">("hunter");

  const detectionData = [
    { time: '00:00', threats: 4, resolved: 3 },
    { time: '04:00', threats: 3, resolved: 3 },
    { time: '08:00', threats: 7, resolved: 5 },
    { time: '12:00', threats: 2, resolved: 2 },
    { time: '16:00', threats: 6, resolved: 4 },
    { time: '20:00', threats: 4, resolved: 3 },
    { time: '24:00', threats: 5, resolved: 4 },
  ];

  const agentPerformanceData = [
    { name: 'Hunter', accuracy: 92, speed: 98, autonomy: 87 },
    { name: 'Classifier', accuracy: 89, speed: 84, autonomy: 92 },
    { name: 'Response', accuracy: 95, speed: 90, autonomy: 85 },
  ];

  const threatTypes = [
    { name: 'SQL Injection', value: 35 },
    { name: 'XSS', value: 25 },
    { name: 'DDOS', value: 15 },
    { name: 'Phishing', value: 20 },
    { name: 'Other', value: 5 },
  ];

  const recentAlerts = [
    { id: 1, type: "SQL Injection", severity: "High" as const, time: "10 mins ago", status: "Mitigated" as const },
    { id: 2, type: "Suspicious Login", severity: "Medium" as const, time: "25 mins ago", status: "Investigating" as const },
    { id: 3, type: "DDoS Attempt", severity: "Critical" as const, time: "1 hour ago", status: "Mitigated" as const },
    { id: 4, type: "Data Exfiltration", severity: "High" as const, time: "2 hours ago", status: "Mitigated" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Defense Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-semibold">Total Threats</h3>
              </div>
              <span className="text-2xl font-bold">142</span>
            </div>
            <div className="h-1 w-full bg-gray-700 mb-2">
              <div className="h-1 bg-blue-500" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-gray-400">85% mitigated automatically</p>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold">Response Rate</h3>
              </div>
              <span className="text-2xl font-bold">98.2%</span>
            </div>
            <div className="h-1 w-full bg-gray-700 mb-2">
              <div className="h-1 bg-green-500" style={{ width: '98%' }}></div>
            </div>
            <p className="text-xs text-gray-400">2.5% increase from last week</p>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold">Active Threats</h3>
              </div>
              <span className="text-2xl font-bold">3</span>
            </div>
            <div className="h-1 w-full bg-gray-700 mb-2">
              <div className="h-1 bg-yellow-500" style={{ width: '15%' }}></div>
            </div>
            <p className="text-xs text-gray-400">All being actively mitigated</p>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  Threat Detection Timeline
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Detected"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Resolved"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  Agent Performance Metrics
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Legend />
                      <Bar dataKey="accuracy" name="Accuracy" fill="#3B82F6" />
                      <Bar dataKey="speed" name="Response Speed" fill="#8B5CF6" />
                      <Bar dataKey="autonomy" name="Autonomy" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="agents" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Button 
                variant={selectedAgent === "hunter" ? "default" : "outline"}
                onClick={() => setSelectedAgent("hunter")}
                className="flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Hunter Agent
              </Button>
              <Button 
                variant={selectedAgent === "classifier" ? "default" : "outline"}
                onClick={() => setSelectedAgent("classifier")}
                className="flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4" />
                Classifier Agent
              </Button>
              <Button 
                variant={selectedAgent === "response" ? "default" : "outline"}
                onClick={() => setSelectedAgent("response")}
                className="flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Response Agent
              </Button>
            </div>
            
            <AgentDetailPanel agentType={selectedAgent} />
          </TabsContent>
          
          <TabsContent value="threats" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  Threat Distribution
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={threatTypes}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Bar dataKey="value" name="Incidents" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="w-5 h-5 text-blue-500 mr-2" />
                  Recent Alerts
                </h3>
                <ThreatFeed alerts={recentAlerts} />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
