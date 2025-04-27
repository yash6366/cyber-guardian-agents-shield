
import React from 'react';
import { Card } from "@/components/ui/card";
import { Activity, Database, Shield, Code, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AgentDetailPanelProps {
  agentType: "hunter" | "classifier" | "response";
}

const AgentDetailPanel = ({ agentType }: AgentDetailPanelProps) => {
  const agentDetails = {
    hunter: {
      name: "Hunter Agent",
      icon: <Activity className="w-6 h-6 text-blue-500" />,
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
      icon: <Database className="w-6 h-6 text-purple-500" />,
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
      icon: <Shield className="w-6 h-6 text-green-500" />,
      description: "Executes appropriate response actions based on threat classifications.",
      status: "Standing By",
      metrics: [
        { name: "Response Accuracy", value: 95 },
        { name: "Action Execution", value: 91 },
        { name: "Time to Mitigate", value: 90 },
      ],
      technologies: [
        "RAG-Enhanced Classification",
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
    <Card className="bg-gray-800/50 border-gray-700">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {details.icon}
          <h3 className="text-2xl font-bold">{details.name}</h3>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
            details.status === "Active" ? "bg-green-900/60 text-green-400" : 
            "bg-yellow-900/60 text-yellow-400"
          }`}>
            {details.status}
          </span>
        </div>

        <p className="text-gray-300 mb-6">{details.description}</p>
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Performance Metrics
        </h4>
        
        <div className="space-y-4 mb-6">
          {details.metrics.map(metric => (
            <div key={metric.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">{metric.name}</span>
                <span className="text-sm font-medium">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          Core Technologies
        </h4>
        
        <div className="mb-6">
          <ul className="grid grid-cols-2 gap-2">
            {details.technologies.map(tech => (
              <li key={tech} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-300 text-sm">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator className="my-6" />
        
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-500" />
          Implementation Sample
        </h4>
        
        <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
          <pre className="text-gray-300 text-sm font-mono">
            {details.codeSnippet}
          </pre>
        </div>
      </div>
    </Card>
  );
};

export default AgentDetailPanel;
