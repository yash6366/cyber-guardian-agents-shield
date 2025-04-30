
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Cloud, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Check, 
  Database,
  Zap,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new utilities
import { getRandomAttackScenario, AttackScenario, AttackStep } from "@/utils/attackScenarios";
import { aiDetectionModel, generateSimulatedLogs, AnomalyDetectionResult, LogEntry } from "@/utils/aiDetection";
import { 
  createIncidentResponse, 
  IncidentResponse, 
  executeAutomatedTasks 
} from "@/utils/responseWorkflow";
import ResponseWorkflow from "@/components/ResponseWorkflow";

const Simulation = () => {
  // Original state variables
  const [simulationActive, setSimulationActive] = useState(false);
  const [attackInProgress, setAttackInProgress] = useState(false);
  const [detectionInProgress, setDetectionInProgress] = useState(false);
  const [responseInProgress, setResponseInProgress] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  
  // New state variables for enhanced features
  const [currentScenario, setCurrentScenario] = useState<AttackScenario | null>(null);
  const [currentStep, setCurrentStep] = useState<AttackStep | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [detectionResult, setDetectionResult] = useState<AnomalyDetectionResult | null>(null);
  const [simulatedLogs, setSimulatedLogs] = useState<LogEntry[]>([]);
  const [incidentResponse, setIncidentResponse] = useState<IncidentResponse | null>(null);
  const [selectedTab, setSelectedTab] = useState("simulation");
  
  const addLogEntry = (entry: string) => {
    setLog(prevLog => [entry, ...prevLog].slice(0, 100));
  };
  
  const startSimulation = () => {
    setSimulationActive(true);
    setCurrentScenario(null);
    setCurrentStep(null);
    setStepIndex(0);
    setDetectionResult(null);
    setSimulatedLogs([]);
    setIncidentResponse(null);
    
    addLogEntry("Simulation environment started");
    addLogEntry("Network environment initialized");
    addLogEntry("Virtual machines deployed");
    addLogEntry("Monitoring systems active");
    
    toast.success("Simulation Started", {
      description: "The network environment has been initialized",
    });
  };

  const stopSimulation = () => {
    setSimulationActive(false);
    setAttackInProgress(false);
    setDetectionInProgress(false);
    setResponseInProgress(false);
    setCurrentScenario(null);
    setCurrentStep(null);
    setStepIndex(0);
    setDetectionResult(null);
    setSimulatedLogs([]);
    setIncidentResponse(null);
    
    addLogEntry("Simulation environment stopped");
    
    toast.info("Simulation Stopped", {
      description: "All simulation processes have been terminated",
    });
  };
  
  // Execute current attack step
  const executeAttackStep = (step: AttackStep) => {
    if (!currentScenario) return;
    
    setCurrentStep(step);
    addLogEntry(`[ATTACK] Executing step: ${step.name}`);
    addLogEntry(`[ATTACK] ${step.description}`);
    
    // Generate simulated logs based on the attack
    const logs = generateSimulatedLogs(currentScenario.name.split(' ')[0], 10);
    setSimulatedLogs(prevLogs => [...logs, ...prevLogs]);
    
    setTimeout(() => {
      // Move to AI-based detection after step executes
      runDetection();
    }, step.duration);
  };
  
  // AI-based detection using our model
  const runDetection = () => {
    if (!currentScenario || !currentStep) return;
    
    setDetectionInProgress(true);
    addLogEntry(`[DETECTION] Hunter Agent analyzing suspicious activity`);
    
    setTimeout(() => {
      // Use our AI detection model to analyze logs
      const result = aiDetectionModel.detectAnomaly(simulatedLogs);
      setDetectionResult(result);
      
      if (result.isAnomaly) {
        addLogEntry(`[DETECTION] Hunter Agent detected ${result.detectedPattern} pattern (${Math.round(result.confidence * 100)}% confidence)`);
        addLogEntry(`[CLASSIFICATION] Classifier Agent identified ${currentScenario.name} attack`);
        
        // Start response workflow
        triggerResponseWorkflow();
      } else {
        addLogEntry(`[DETECTION] No significant threats detected`);
        setDetectionInProgress(false);
        
        // Continue to next attack step if there are more
        continueAttack();
      }
    }, 2000);
  };
  
  // Initialize response workflow
  const triggerResponseWorkflow = () => {
    if (!currentScenario) return;
    
    setResponseInProgress(true);
    addLogEntry(`[RESPONSE] Response Agent initiating defensive measures`);
    
    // Create a new incident response
    const response = createIncidentResponse(
      currentScenario.name.split(' ')[0], 
      currentScenario.targetSystems
    );
    
    setIncidentResponse(response);
    
    // Execute automated tasks
    const updatedResponse = executeAutomatedTasks(response);
    setIncidentResponse(updatedResponse);
    
    addLogEntry(`[RESPONSE] Incident response created: ${response.title}`);
    
    setTimeout(() => {
      setSelectedTab("response");
      
      toast.success("Response Workflow Initiated", {
        description: `Response activated for ${currentScenario.name}`,
      });
    }, 2000);
  };
  
  // Continue to next attack step
  const continueAttack = () => {
    if (!currentScenario) return;
    
    const nextIndex = stepIndex + 1;
    if (nextIndex < currentScenario.steps.length) {
      setStepIndex(nextIndex);
      executeAttackStep(currentScenario.steps[nextIndex]);
    } else {
      // Attack scenario completed
      setAttackInProgress(false);
      addLogEntry(`[ATTACK] ${currentScenario.name} scenario completed`);
    }
  };
  
  // Launch a new attack scenario
  const injectAttack = () => {
    if (!simulationActive) {
      toast.error("Error", {
        description: "Simulation must be running to inject attacks",
      });
      return;
    }

    const scenario = getRandomAttackScenario();
    setCurrentScenario(scenario);
    setStepIndex(0);
    setAttackInProgress(true);
    setDetectionInProgress(false);
    setResponseInProgress(false);
    setDetectionResult(null);
    setSimulatedLogs([]);
    setIncidentResponse(null);
    
    addLogEntry(`[ATTACK] Injecting ${scenario.name} (${scenario.complexity} complexity) attack into simulation`);
    addLogEntry(`[ATTACK] Target systems: ${scenario.targetSystems.join(', ')}`);
    
    // Execute first step
    executeAttackStep(scenario.steps[0]);
    
    toast.warning(`${scenario.name} Attack Started`, {
      description: `A ${scenario.complexity} complexity attack has been injected`,
    });
  };
  
  // Update incident response when tasks are advanced
  const handleIncidentUpdate = (updatedIncident: IncidentResponse) => {
    setIncidentResponse(updatedIncident);
    
    // Check if incident is closed
    if (updatedIncident.status === 'Closed') {
      setResponseInProgress(false);
      setAttackInProgress(false);
      setDetectionInProgress(false);
      
      addLogEntry(`[RESPONSE] Threat successfully mitigated`);
      
      toast.success("Threat Mitigated", {
        description: `${currentScenario?.name} attack was successfully contained`,
      });
      
      setSelectedTab("simulation");
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <Server className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Simulation Environment</h1>
        </div>
        
        <Tabs defaultValue="simulation" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="simulation">Network Simulation</TabsTrigger>
            <TabsTrigger value="detection">AI Detection</TabsTrigger>
            <TabsTrigger value="response">Response Workflow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulation" className="space-y-8 animate-fade-in">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
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
                      {attackInProgress && currentScenario?.targetSystems.includes('Web Server') && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Database className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Database</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && currentScenario?.targetSystems.includes('Database') && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">Auth Server</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && currentScenario?.targetSystems.includes('Auth Server') && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Cloud className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">CDN</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && currentScenario?.targetSystems.includes('CDN') && (
                        <AlertTriangle className="w-4 h-4 text-red-500 absolute animate-pulse" />
                      )}
                    </div>
                    
                    <div className="aspect-square rounded-md border border-gray-700 bg-gray-800 p-2 flex flex-col items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-xs text-gray-400">API Gateway</span>
                      {simulationActive && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      {attackInProgress && currentScenario?.targetSystems.includes('API Gateway') && (
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
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 text-blue-500 mr-2" />
                  Attack Scenarios
                </h3>
                
                <Button 
                  onClick={injectAttack} 
                  variant="destructive" 
                  disabled={!simulationActive || attackInProgress}
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Inject Random Attack
                </Button>
              </div>
              
              {currentScenario && (
                <div className="mb-6 border border-gray-700 rounded-lg p-4 bg-gray-900/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      {currentScenario.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      currentScenario.complexity === 'Critical' ? 'bg-red-900/30 text-red-400 border border-red-800/40' :
                      currentScenario.complexity === 'High' ? 'bg-orange-900/30 text-orange-400 border border-orange-800/40' :
                      'bg-yellow-900/30 text-yellow-400 border border-yellow-800/40'
                    }`}>
                      {currentScenario.complexity} Complexity
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{currentScenario.description}</p>
                  
                  <h5 className="text-sm font-medium mb-2">Attack Progression:</h5>
                  <div className="space-y-2">
                    {currentScenario.steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`flex items-center p-2 rounded ${
                          index < stepIndex ? 'bg-red-900/20 border border-red-900/30' : 
                          index === stepIndex ? 'bg-yellow-900/20 border border-yellow-900/30' : 
                          'bg-gray-800/50 border border-gray-700'
                        }`}
                      >
                        <div className="mr-3 flex-shrink-0">
                          {index < stepIndex ? (
                            <Check className="w-4 h-4 text-red-500" />
                          ) : index === stepIndex ? (
                            <ArrowRight className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{step.name}</div>
                          <div className="text-xs text-gray-400">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="detection" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  AI Detection System
                </h2>
                
                {detectionResult ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Detection Status</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        detectionResult.isAnomaly 
                          ? "bg-red-900/30 border border-red-800/40 text-red-400" 
                          : "bg-green-900/30 border border-green-800/40 text-green-400"
                      }`}>
                        {detectionResult.isAnomaly ? "Threat Detected" : "No Threats"}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Detection Confidence</span>
                        <span className="text-sm font-medium">{Math.round(detectionResult.confidence * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 ${detectionResult.isAnomaly ? "bg-red-500" : "bg-green-500"}`}
                          style={{ width: `${detectionResult.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {detectionResult.isAnomaly && detectionResult.detectedPattern && (
                      <>
                        <div className="p-3 bg-gray-900/70 border border-gray-700 rounded-md">
                          <div className="text-sm font-medium mb-1">Detected Pattern</div>
                          <div className="text-sm text-gray-300">{detectionResult.detectedPattern}</div>
                        </div>
                        
                        {detectionResult.associatedTechnique && (
                          <div className="p-3 bg-gray-900/70 border border-gray-700 rounded-md">
                            <div className="text-sm font-medium mb-1">Associated MITRE ATT&CK Technique</div>
                            <div className="text-sm text-gray-300">
                              {detectionResult.associatedTechnique} - {detectionResult.detectedPattern?.split(':')[0]}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {detectionResult.recommendations.map((rec, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start">
                                <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Activity className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                    <p>No detection data available</p>
                    <p className="text-sm mt-2">Run a simulation with an attack to see AI detection in action</p>
                  </div>
                )}
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  System Logs
                </h2>
                
                <div className="h-[400px] overflow-y-auto border border-gray-700 rounded-md bg-gray-900 p-4">
                  {simulatedLogs.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      <Database className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                      <p>No log entries</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {simulatedLogs.map((entry, index) => (
                        <div key={index} className="text-sm p-2 bg-gray-800/50 border border-gray-700 rounded">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{entry.source}</span>
                            <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">{entry.action}</span>
                            {entry.target && <span className="mx-1 text-gray-400">→</span>}
                            {entry.target && <span className="text-gray-300">{entry.target}</span>}
                          </div>
                          {entry.data && (
                            <div className="mt-1 text-xs bg-gray-900 p-1 rounded overflow-x-auto">
                              <pre className="text-gray-400">{JSON.stringify(entry.data, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="response" className="animate-fade-in">
            {incidentResponse ? (
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <ResponseWorkflow 
                  incident={incidentResponse} 
                  onIncidentUpdate={handleIncidentUpdate} 
                />
              </Card>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <div className="text-center py-16">
                  <Shield className="w-16 h-16 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-xl font-medium mb-2">No Active Incidents</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    When a threat is detected, the Response Agent will automatically create an incident response workflow
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="container mx-auto px-4 mt-8">
        <Card className="bg-gray-800/50 border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 text-blue-500 mr-2" />
              Simulation Log
            </h2>
            
            <div className="h-[300px] overflow-y-auto border border-gray-700 rounded-md bg-gray-900 p-4">
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
  );
};

export default Simulation;
