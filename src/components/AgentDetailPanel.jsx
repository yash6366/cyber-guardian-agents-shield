
import React from 'react';
import { Card } from "@/components/ui/card";
import { Activity, Database, Shield, Code, FileText, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const AgentDetailPanel = ({ agentType }) => {
  const agentDetails = {
    hunter: {
      name: "Hunter Agent",
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      description: "Autonomously detects threats in network traffic and system logs using machine learning.",
      status: "Active",
      metrics: [
        { name: "Detection Accuracy", value: 92 },
        { name: "False Positive Rate", value: 3 },
        { name: "Scanning Speed", value: 98 },
      ],
      technologies: [
        "Random Forest Classifier",
        "Network Traffic Analysis",
        "Anomaly Detection",
        "Log Analysis"
      ],
      codeSnippet: `
def detect_threats(network_traffic, system_logs):
    # Preprocess the data
    features = preprocess_data(network_traffic, system_logs)
    
    # Run the machine learning model
    predictions = model.predict(features)
    
    # Filter and return threats
    return [threat for threat, is_threat in zip(raw_data, predictions) if is_threat]
      `
    },
    classifier: {
      name: "Classifier Agent",
      icon: <Database className="w-8 h-8 text-purple-500" />,
      description: "Classifies detected threats using LLMs and retrieval-augmented generation.",
      status: "Active",
      metrics: [
        { name: "Classification Accuracy", value: 89 },
        { name: "Context Retrieval", value: 95 },
        { name: "Processing Time", value: 84 },
      ],
      technologies: [
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Knowledge Base Integration",
        "Threat Intelligence"
      ],
      codeSnippet: `
async def classify_threat(threat_data):
    # Retrieve relevant context from knowledge base
    context = knowledge_base.retrieve(threat_data)
    
    # Generate prompt with context
    prompt = generate_prompt(threat_data, context)
    
    # Get classification from LLM
    classification = await llm_model.generate(prompt)
    
    return parse_classification(classification)
      `
    },
    response: {
      name: "Response Agent",
      icon: <Shield className="w-8 h-8 text-green-500" />,
      description: "Executes appropriate response actions based on threat classifications.",
      status: "Standing By",
      metrics: [
        { name: "Response Accuracy", value: 95 },
        { name: "Action Execution", value: 91 },
        { name: "Time to Mitigate", value: 90 },
      ],
      technologies: [
        "Policy-Based Response",
        "Self-Healing System",
        "Firewall Integration",
        "Network Segmentation"
      ],
      codeSnippet: `
def execute_response(threat_classification):
    # Look up appropriate response policy
    policy = response_policies.get_policy(
        threat_classification.type,
        threat_classification.severity
    )
    
    # Execute response actions according to policy
    for action in policy.actions:
        try:
            action_result = execute_action(action, threat_classification.target)
            log_response(action, action_result)
        except Exception as e:
            handle_failed_action(action, e)
      `
    }
  };

  const details = agentDetails[agentType];

  return (
    <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700 shadow-xl backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6 relative">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
          {details.icon}
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{details.name}</h3>
          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
            details.status === "Active" ? "bg-green-900/60 text-green-400 border border-green-500/30" : 
            "bg-yellow-900/60 text-yellow-400 border border-yellow-500/30"
          }`}>
            {details.status}
          </span>
        </div>

        <p className="text-gray-300 mb-8 leading-relaxed">{details.description}</p>
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Performance Metrics</span>
        </h4>
        
        <div className="space-y-6 mb-8">
          {details.metrics.map(metric => (
            <div key={metric.name} className="hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">{metric.name}</span>
                <span className="text-sm font-medium text-white">{metric.value}%</span>
              </div>
              <div className="relative">
                <Progress value={metric.value} className="h-2 bg-gray-700" indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="absolute inset-0 bg-blue-500/10 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-8 bg-gray-700/50" />
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Core Technologies</span>
        </h4>
        
        <div className="mb-8">
          <ul className="grid grid-cols-2 gap-3">
            {details.technologies.map(tech => (
              <li key={tech} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-gray-300 text-sm">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator className="my-8 bg-gray-700/50" />
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Implementation Sample</span>
        </h4>
        
        <div className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto border border-gray-700/50 shadow-inner">
          <pre className="text-gray-300 text-sm font-mono">
            {details.codeSnippet}
          </pre>
        </div>
      </div>
    </Card>
  );
};

export default AgentDetailPanel;
