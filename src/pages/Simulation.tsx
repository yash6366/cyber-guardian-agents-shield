
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Cloud, Shield, AlertTriangle, Activity, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Simulation = () => {
  const { toast } = useToast();
  const [simulationActive, setSimulationActive] = useState(false);
  const [attackInProgress, setAttackInProgress] = useState(false);
  const [detectionInProgress, setDetectionInProgress] = useState(false);
  const [responseInProgress, setResponseInProgress] = useState(false);
  const [attackType, setAttackType] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const attackTypes = [
    "SQL Injection",
    "Cross-Site Scripting (XSS)",
    "Distributed Denial of Service (DDoS)",
    "Brute Force Login",
    "Data Exfiltration"
  ];

  const startSimulation = () => {
    setSimulationActive(true);
    addLogEntry("Simulation environment started");
    addLogEntry("Network environment initialized");
    addLogEntry("Virtual machines deployed");
    addLogEntry("Monitoring systems active");
    
    toast({
      title: "Simulation Started",
      description: "The network environment has been initialized",
    });
  };

  const stopSimulation = () => {
    setSimulationActive(false);
    setAttackInProgress(false);
    setDetectionInProgress(false);
    setResponseInProgress(false);
    setAttackType("");
    addLogEntry("Simulation environment stopped");
    
    toast({
      title: "Simulation Stopped",
      description: "All simulation processes have been terminated",
    });
  };

  const injectAttack = () => {
    if (!simulationActive) {
      toast({
        title: "Error",
        description: "Simulation must be running to inject attacks",
        variant: "destructive",
      });
      return;
    }

    const selectedAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    setAttackType(selectedAttack);
    setAttackInProgress(true);
    
    addLogEntry(`[ATTACK] Injecting ${selectedAttack} attack into simulation`);
    
    // Simulate detection
    setTimeout(() => {
      setDetectionInProgress(true);
      addLogEntry(`[DETECTION] Hunter Agent detected suspicious activity`);
      addLogEntry(`[CLASSIFICATION] Classifier Agent identified ${selectedAttack} attack`);
      
      // Simulate response
      setTimeout(() => {
        setResponseInProgress(true);
        addLogEntry(`[RESPONSE] Response Agent initiating defensive measures`);
        
        setTimeout(() => {
          addLogEntry(`[RESPONSE] Threat successfully mitigated`);
          setAttackInProgress(false);
          setDetectionInProgress(false);
          setResponseInProgress(false);
          
          toast({
            title: "Threat Mitigated",
            description: `${selectedAttack} attack was successfully contained`,
          });
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const addLogEntry = (entry: string) => {
    setLog(prevLog => [entry, ...prevLog].slice(0, 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <Server className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Simulation Environment</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Cloud className="w-5 h-5 text-blue-500 mr-2" />
                Network Simulation
              </h2>
              
              <div className="mb-6">
                <div className="flex space-x-4 mb-4">
                  <Button 
                    onClick={startSimulation} 
                    disabled={simulationActive}
                    className="flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Start Simulation
                  </Button>
                  <Button 
                    onClick={stopSimulation} 
                    variant="outline" 
                    disabled={!simulationActive}
                    className="flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Stop Simulation
                  </Button>
                </div>
                
                <div className="relative h-64 border border-gray-700 rounded-md bg-gray-900/70 overflow-hidden p-4">
                  {!simulationActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
                      <p className="text-gray-400">Simulation not running</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* Simulated network nodes */}
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Web Server</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Database</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && attackType.includes("SQL") && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Auth Server</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && attackType.includes("Brute Force") && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Cloud className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">CDN</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">API Gateway</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && attackType.includes("XSS") && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Shield className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Firewall</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {responseInProgress && (
                        <div className="absolute w-full h-full bg-green-500/20 animate-pulse rounded-md"></div>
                      )}
                    </div>
                  </div>
                  
                  {detectionInProgress && (
                    <div className="absolute top-4 left-4 bg-yellow-900/40 border border-yellow-800 text-yellow-400 rounded px-2 py-1 text-xs flex items-center">
                      <Activity className="w-3 h-3 mr-1 animate-pulse" />
                      Threat Detection Active
                    </div>
                  )}
                  
                  {responseInProgress && (
                    <div className="absolute bottom-4 right-4 bg-green-900/40 border border-green-800 text-green-400 rounded px-2 py-1 text-xs flex items-center">
                      <Shield className="w-3 h-3 mr-1 animate-pulse" />
                      Response Active
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Attack Injection</h3>
              <p className="text-sm text-gray-400 mb-4">
                Inject simulated cyber attacks into the environment to test agent responses
              </p>
              
              <Button 
                onClick={injectAttack} 
                variant="destructive" 
                disabled={!simulationActive || attackInProgress}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Inject Random Attack
              </Button>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                Agent Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-700 rounded-md bg-gray-900/70 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Hunter Agent</h3>
                    <div className={`w-2 h-2 rounded-full ${simulationActive ? "bg-green-500" : "bg-gray-500"}`}></div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Threat Detection</p>
                  <div className="flex items-center text-xs text-gray-300">
                    <span className={`${detectionInProgress ? "text-yellow-400" : "text-gray-500"}`}>
                      {detectionInProgress ? "Active Scanning" : "Idle"}
                    </span>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-md bg-gray-900/70 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Classifier Agent</h3>
                    <div className={`w-2 h-2 rounded-full ${simulationActive ? "bg-green-500" : "bg-gray-500"}`}></div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Threat Classification</p>
                  <div className="flex items-center text-xs text-gray-300">
                    <span className={`${detectionInProgress ? "text-yellow-400" : "text-gray-500"}`}>
                      {detectionInProgress ? "Analyzing Threat" : "Idle"}
                    </span>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-md bg-gray-900/70 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Response Agent</h3>
                    <div className={`w-2 h-2 rounded-full ${simulationActive ? "bg-green-500" : "bg-gray-500"}`}></div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Threat Response</p>
                  <div className="flex items-center text-xs text-gray-300">
                    <span className={`${responseInProgress ? "text-green-400" : "text-gray-500"}`}>
                      {responseInProgress ? "Mitigating" : "Standing By"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  Simulation Log
                </h2>
                
                <div className="h-[500px] overflow-y-auto border border-gray-700 rounded-md bg-gray-900 p-4">
                  {log.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">No log entries</div>
                  ) : (
                    <div className="space-y-2">
                      {log.map((entry, index) => (
                        <div key={index} className={`text-sm px-2 py-1 rounded ${
                          entry.includes("[ATTACK]") ? "text-red-400 bg-red-900/20" :
                          entry.includes("[DETECTION]") ? "text-yellow-400 bg-yellow-900/20" :
                          entry.includes("[CLASSIFICATION]") ? "text-purple-400 bg-purple-900/20" :
                          entry.includes("[RESPONSE]") ? "text-green-400 bg-green-900/20" :
                          "text-gray-300"
                        }`}>
                          {entry}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
