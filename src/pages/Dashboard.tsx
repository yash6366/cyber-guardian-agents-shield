import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Shield, Database, Bell, Check, AlertTriangle, Users, Globe, Bug, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import AgentDetailPanel from "@/components/AgentDetailPanel";
import ThreatFeed from "@/components/ThreatFeed";
import SecurityOperationsCenter from "@/components/SecurityOperationsCenter";
import ThreatIntelligence from "@/components/ThreatIntelligence";
import VulnerabilityManagement from "@/components/VulnerabilityManagement";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<"hunter" | "classifier" | "response">("hunter");

  const detectionData = [
    { time: '00:00', threats: 4, resolved: 3, mlAccuracy: 92, falsePositives: 1 },
    { time: '04:00', threats: 3, resolved: 3, mlAccuracy: 94, falsePositives: 0 },
    { time: '08:00', threats: 7, resolved: 5, mlAccuracy: 91, falsePositives: 2 },
    { time: '12:00', threats: 2, resolved: 2, mlAccuracy: 95, falsePositives: 0 },
    { time: '16:00', threats: 6, resolved: 4, mlAccuracy: 93, falsePositives: 1 },
    { time: '20:00', threats: 4, resolved: 3, mlAccuracy: 96, falsePositives: 0 },
    { time: '24:00', threats: 5, resolved: 4, mlAccuracy: 94, falsePositives: 1 },
  ];

  const agentPerformanceData = [
    { name: 'Hunter', accuracy: 92, speed: 98, autonomy: 87 },
    { name: 'Classifier', accuracy: 89, speed: 84, autonomy: 92 },
    { name: 'Response', accuracy: 95, speed: 90, autonomy: 85 },
  ];

  const threatTypes = [
    { name: 'Malware', value: 35, color: '#ef4444' },
    { name: 'Phishing', value: 25, color: '#f97316' },
    { name: 'DDoS', value: 15, color: '#eab308' },
    { name: 'Data Breach', value: 20, color: '#3b82f6' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const securityMetrics = [
    { metric: 'Threat Detection Rate', value: 98.7, trend: '+2.3%', color: 'text-green-400' },
    { metric: 'False Positive Rate', value: 2.1, trend: '-0.8%', color: 'text-green-400' },
    { metric: 'Mean Time to Detect', value: 4.2, trend: '-1.1min', color: 'text-green-400' },
    { metric: 'Mean Time to Respond', value: 12.5, trend: '+0.3min', color: 'text-red-400' },
  ];

  const recentAlerts = [
    { id: 1, type: "Advanced Persistent Threat", severity: "Critical" as const, time: "5 mins ago", status: "Investigating" as const },
    { id: 2, type: "Suspicious PowerShell Activity", severity: "High" as const, time: "12 mins ago", status: "Mitigated" as const },
    { id: 3, type: "Unusual Network Traffic", severity: "Medium" as const, time: "25 mins ago", status: "Investigating" as const },
    { id: 4, type: "Failed Login Attempts", severity: "Medium" as const, time: "1 hour ago", status: "Mitigated" as const },
    { id: 5, type: "Malware Detection", severity: "High" as const, time: "2 hours ago", status: "Mitigated" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pb-24 pt-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-900/30 rounded-lg">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Cyber Guardian Dashboard
              </h1>
              <p className="text-gray-400">Comprehensive security operations and threat intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-900/20 px-3 py-2 rounded-lg border border-green-800/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">All Systems Operational</span>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Activity className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Threats</p>
                <p className="text-3xl font-bold text-red-400">23</p>
                <p className="text-xs text-red-300">+5 from yesterday</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500 opacity-80" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Threats Mitigated</p>
                <p className="text-3xl font-bold text-green-400">1,247</p>
                <p className="text-xs text-green-300">98.7% success rate</p>
              </div>
              <Check className="w-10 h-10 text-green-500 opacity-80" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Vulnerabilities</p>
                <p className="text-3xl font-bold text-yellow-400">89</p>
                <p className="text-xs text-yellow-300">12 critical</p>
              </div>
              <Bug className="w-10 h-10 text-yellow-500 opacity-80" />
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">SOC Analysts</p>
                <p className="text-3xl font-bold text-purple-400">8</p>
                <p className="text-xs text-purple-300">6 active, 2 on break</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-80" />
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid grid-cols-6 mb-8 bg-gray-800/50 border border-gray-700/50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="soc" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              SOC
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Threat Intel
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Threat Detection Timeline
                  </span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.95)', 
                          borderColor: '#4B5563', 
                          borderRadius: '0.5rem',
                          backdropFilter: 'blur(10px)'
                        }}
                        labelStyle={{ color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        activeDot={{ r: 8, fill: '#3B82F6' }} 
                        name="Detected"
                        animationDuration={1500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        activeDot={{ r: 8, fill: '#10B981' }} 
                        name="Resolved"
                        animationDuration={1500}
                        animationBegin={300}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Threat Distribution
                  </span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1500}
                      >
                        {threatTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.95)', 
                          borderColor: '#4B5563', 
                          borderRadius: '0.5rem' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Security Metrics */}
            <div className="mt-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Eye className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Security Performance Metrics
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {securityMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <p className="text-sm text-gray-400 mb-1">{metric.metric}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{metric.value}{metric.metric.includes('Rate') ? '%' : 'min'}</p>
                        <span className={`text-sm ${metric.color}`}>{metric.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Alerts */}
            <div className="mt-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Bell className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Recent Security Alerts
                  </span>
                </h3>
                <ThreatFeed alerts={recentAlerts} />
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
          
          <TabsContent value="soc" className="mt-6 animate-fade-in">
            <SecurityOperationsCenter />
          </TabsContent>
          
          <TabsContent value="threats" className="mt-6 animate-fade-in">
            <ThreatIntelligence />
          </TabsContent>

          <TabsContent value="vulnerabilities" className="mt-6 animate-fade-in">
            <VulnerabilityManagement />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Agent Performance Analytics
                  </span>
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.95)', 
                          borderColor: '#4B5563', 
                          borderRadius: '0.5rem' 
                        }}
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

              <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/50 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Globe className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Global Threat Landscape
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-sm">Active Threat Campaigns</span>
                    <span className="text-lg font-bold text-red-400">47</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-sm">IOCs Identified Today</span>
                    <span className="text-lg font-bold text-orange-400">1,432</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-sm">Threat Actors Tracked</span>
                    <span className="text-lg font-bold text-yellow-400">89</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-sm">Intelligence Sources</span>
                    <span className="text-lg font-bold text-green-400">12</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-blue-800/30 flex items-center justify-between mt-8">
          <div className="flex items-center">
            <Shield className="text-blue-500 w-6 h-6 mr-4" />
            <div>
              <p className="font-medium">System Status: All Security Controls Active</p>
              <p className="text-sm text-gray-400 mt-1">
                Last security assessment: 2 hours ago • Next scheduled scan: 6 hours
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Operational</span>
            </div>
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-900/30">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;