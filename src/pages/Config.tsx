
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Settings, Database, Shield, AlertTriangle, Check } from "lucide-react";

const Config = () => {
  const { toast } = useToast();
  const [systemSettings, setSystemSettings] = useState({
    loggingLevel: "INFO",
    threatThreshold: 0.75,
    autoRespond: true,
    useRAG: true,
    maxThreads: 8
  });

  const [threatPolicies, setThreatPolicies] = useState([
    {
      id: 1,
      name: "SQL Injection",
      severity: "High",
      autoResponse: true,
      actions: ["Block Source IP", "Log Event", "Alert Admin"]
    },
    {
      id: 2,
      name: "XSS Attack",
      severity: "Medium",
      autoResponse: true,
      actions: ["Sanitize Input", "Log Event"]
    },
    {
      id: 3,
      name: "DDoS",
      severity: "Critical",
      autoResponse: true,
      actions: ["Rate Limit", "Block Source IP Range", "Scale Resources", "Alert Admin"]
    },
    {
      id: 4,
      name: "Brute Force",
      severity: "Medium",
      autoResponse: true,
      actions: ["Temporary Account Lock", "Log Event", "CAPTCHA Challenge"]
    }
  ]);

  const handleSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePolicyChange = (id: number, field: string, value: any) => {
    setThreatPolicies(policies => 
      policies.map(policy => 
        policy.id === id ? { ...policy, [field]: value } : policy
      )
    );
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated",
    });
  };

  const resetSettings = () => {
    setSystemSettings({
      loggingLevel: "INFO",
      threatThreshold: 0.75,
      autoRespond: true,
      useRAG: true,
      maxThreads: 8
    });

    toast({
      title: "Settings Reset",
      description: "System configuration has been reset to defaults",
    });
  };

  const logLevels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"];
  const severityLevels = ["Low", "Medium", "High", "Critical"];
  const possibleActions = [
    "Log Event",
    "Alert Admin",
    "Block Source IP",
    "Block Source IP Range",
    "Sanitize Input",
    "Rate Limit",
    "Scale Resources",
    "Temporary Account Lock",
    "CAPTCHA Challenge",
    "Reset Password",
    "Isolate System"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <Settings className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Configuration</h1>
        </div>
        
        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="policies">Response Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system">
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  System Configuration
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Logging Level
                      </label>
                      <select 
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
                        value={systemSettings.loggingLevel}
                        onChange={(e) => handleSettingChange("loggingLevel", e.target.value)}
                      >
                        {logLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Controls the detail level of system logs
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Threat Detection Threshold
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          value={systemSettings.threatThreshold}
                          onChange={(e) => handleSettingChange("threatThreshold", parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <span className="ml-2 text-sm">{systemSettings.threatThreshold}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence threshold for threat detection (higher = fewer false positives)
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Automatic Response</h3>
                        <p className="text-xs text-gray-500">
                          Allow agents to respond automatically to detected threats
                        </p>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input 
                          type="checkbox"
                          checked={systemSettings.autoRespond}
                          onChange={(e) => handleSettingChange("autoRespond", e.target.checked)}
                          className="sr-only"
                          id="auto-respond"
                        />
                        <label 
                          htmlFor="auto-respond"
                          className={`relative w-11 h-6 bg-gray-700 rounded-full transition-colors cursor-pointer ${
                            systemSettings.autoRespond ? "bg-blue-600" : ""
                          }`}
                        >
                          <span 
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              systemSettings.autoRespond ? "transform translate-x-5" : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Use RAG for Classification</h3>
                        <p className="text-xs text-gray-500">
                          Enable retrieval-augmented generation for better threat classification
                        </p>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input 
                          type="checkbox"
                          checked={systemSettings.useRAG}
                          onChange={(e) => handleSettingChange("useRAG", e.target.checked)}
                          className="sr-only"
                          id="use-rag"
                        />
                        <label 
                          htmlFor="use-rag"
                          className={`relative w-11 h-6 bg-gray-700 rounded-full transition-colors cursor-pointer ${
                            systemSettings.useRAG ? "bg-blue-600" : ""
                          }`}
                        >
                          <span 
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              systemSettings.useRAG ? "transform translate-x-5" : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Maximum Threads
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="1" 
                        max="32"
                        value={systemSettings.maxThreads}
                        onChange={(e) => handleSettingChange("maxThreads", parseInt(e.target.value))}
                        className="w-20 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum number of concurrent threads for agent processing
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <Button onClick={saveSettings} className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={resetSettings} className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies">
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
                        <div className="flex items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            policy.severity === "Critical" ? "bg-red-900/40 text-red-400" :
                            policy.severity === "High" ? "bg-orange-900/40 text-orange-400" :
                            "bg-yellow-900/40 text-yellow-400"
                          }`}>
                            {policy.severity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Severity Level
                          </label>
                          <select 
                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
                            value={policy.severity}
                            onChange={(e) => handlePolicyChange(policy.id, "severity", e.target.value)}
                          >
                            {severityLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="flex items-center">
                          <label className="text-sm font-medium text-gray-300 mr-4">
                            Auto-Response
                          </label>
                          <div className="relative inline-flex items-center">
                            <input 
                              type="checkbox"
                              checked={policy.autoResponse}
                              onChange={(e) => handlePolicyChange(policy.id, "autoResponse", e.target.checked)}
                              className="sr-only"
                              id={`auto-response-${policy.id}`}
                            />
                            <label 
                              htmlFor={`auto-response-${policy.id}`}
                              className={`relative w-11 h-6 bg-gray-700 rounded-full transition-colors cursor-pointer ${
                                policy.autoResponse ? "bg-blue-600" : ""
                              }`}
                            >
                              <span 
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                  policy.autoResponse ? "transform translate-x-5" : ""
                                }`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Response Actions
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {possibleActions.map(action => (
                            <div key={action} className="flex items-center">
                              <input 
                                type="checkbox"
                                id={`action-${policy.id}-${action}`}
                                checked={policy.actions.includes(action)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handlePolicyChange(policy.id, "actions", [...policy.actions, action]);
                                  } else {
                                    handlePolicyChange(policy.id, "actions", policy.actions.filter(a => a !== action));
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 bg-gray-900"
                              />
                              <label htmlFor={`action-${policy.id}-${action}`} className="ml-2 text-sm text-gray-300">
                                {action}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <Button onClick={saveSettings} className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Save Policies
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Config;
