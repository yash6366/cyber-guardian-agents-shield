
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Shield, Database, Bell, Check, AlertTriangle, Zap, Server, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import AgentDetailPanel from "@/components/AgentDetailPanel";
import ThreatFeed from "@/components/ThreatFeed";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState("hunter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest threat data has been loaded",
        variant: "default",
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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
    { id: 1, type: "SQL Injection", severity: "High", time: "10 mins ago", status: "Mitigated" },
    { id: 2, type: "Suspicious Login", severity: "Medium", time: "25 mins ago", status: "Investigating" },
    { id: 3, type: "DDoS Attempt", severity: "Critical", time: "1 hour ago", status: "Mitigated" },
    { id: 4, type: "Data Exfiltration", severity: "High", time: "2 hours ago", status: "Mitigated" },
  ];

  const StatCard = ({ icon, title, value, color, percentage, trend }) => (
    <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-xl"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 bg-${color}-900/30 border border-${color}-700/30`}>
            {icon}
          </div>
          <h3 className="font-semibold text-gray-300">{title}</h3>
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">{value}</span>
      </div>
      <div className="h-1 w-full bg-gray-700 mb-2 rounded-full overflow-hidden">
        <div className={`h-1 bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <p>{percentage}% {trend}</p>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>Updated 5m ago</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pb-24 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <div className="p-2 bg-blue-900/30 rounded-lg mr-4">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Defense Dashboard</h1>
            <p className="text-gray-400">Real-time monitoring and threat analysis</p>
          </div>
          <div className="ml-auto flex items-center">
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-900/30 mr-2">
              <Zap className="w-4 h-4 mr-2" />
              Run Scan
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Shield className="w-4 h-4 mr-2" />
              Security Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10"></div>
          
          <StatCard 
            icon={<Activity className="w-5 h-5 text-blue-500" />}
            title="Total Threats"
            value="142"
            color="blue"
            percentage={85}
            trend="mitigated automatically"
          />
          
          <StatCard 
            icon={<Check className="w-5 h-5 text-green-500" />}
            title="Response Rate"
            value="98.2%"
            color="green"
            percentage={98}
            trend="increase from last week"
          />
          
          <StatCard 
            icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
            title="Active Threats"
            value="3"
            color="yellow"
            percentage={15}
            trend="being actively mitigated"
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-800/50 border border-gray-700/50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              System Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Agent Performance
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Threat Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Threat Detection Timeline</span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: '#4B5563', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Detected"
                        animationDuration={1000}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Resolved"
                        animationDuration={1000}
                        animationBegin={500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Agent Performance Metrics</span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: '#4B5563', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="accuracy" name="Accuracy" fill="#3B82F6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                      <Bar dataKey="speed" name="Response Speed" fill="#8B5CF6" radius={[4, 4, 0, 0]} animationDuration={1500} animationBegin={300} />
                      <Bar dataKey="autonomy" name="Autonomy" fill="#10B981" radius={[4, 4, 0, 0]} animationDuration={1500} animationBegin={600} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="agents" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Button 
                variant={selectedAgent === "hunter" ? "default" : "outline"}
                onClick={() => setSelectedAgent("hunter")}
                className={`flex items-center justify-center gap-2 ${
                  selectedAgent === "hunter" ? 
                  "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" :
                  "border-blue-500/30 text-blue-400 hover:bg-blue-900/30"
                }`}
              >
                <Activity className="w-4 h-4" />
                Hunter Agent
              </Button>
              <Button 
                variant={selectedAgent === "classifier" ? "default" : "outline"}
                onClick={() => setSelectedAgent("classifier")}
                className={`flex items-center justify-center gap-2 ${
                  selectedAgent === "classifier" ? 
                  "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" :
                  "border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                }`}
              >
                <Database className="w-4 h-4" />
                Classifier Agent
              </Button>
              <Button 
                variant={selectedAgent === "response" ? "default" : "outline"}
                onClick={() => setSelectedAgent("response")}
                className={`flex items-center justify-center gap-2 ${
                  selectedAgent === "response" ? 
                  "bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700" :
                  "border-green-500/30 text-green-400 hover:bg-green-900/30"
                }`}
              >
                <Shield className="w-4 h-4" />
                Response Agent
              </Button>
            </div>
            
            <AgentDetailPanel agentType={selectedAgent} />
          </TabsContent>
          
          <TabsContent value="threats" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Threat Distribution</span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={threatTypes} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderColor: '#4B5563', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Bar 
                        dataKey="value" 
                        name="Incidents" 
                        fill="url(#threatGradient)" 
                        radius={[0, 4, 4, 0]}
                        animationDuration={1500}
                      />
                      <defs>
                        <linearGradient id="threatGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#DC2626" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Bell className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Recent Alerts</span>
                </h3>
                <ThreatFeed alerts={recentAlerts} />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border border-blue-800/30 flex items-center justify-between mt-8">
          <div className="flex items-center">
            <Server className="text-blue-500 w-5 h-5 mr-3" />
            <span className="text-sm text-gray-300">System running in enhanced security mode. All agents are actively monitoring.</span>
          </div>
          <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-900/30 text-xs">
            View System Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
