
import { FileText, Code } from "lucide-react";
import { Card } from "@/components/ui/card";

const ProjectOverview = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="bg-gray-800/40 border-gray-700 backdrop-blur-xl">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-bold">Project Overview</h2>
          </div>
          <div className="space-y-6 text-gray-300">
            <p>
              This project implements a multi-agent AI system for autonomous cybersecurity defense, 
              consisting of three specialized agents that work together to detect, classify, and respond to threats 
              in real-time.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="text-blue-400 font-medium">Real-time Threat Detection:</span> The Hunter Agent uses machine learning to detect threats in real-time.</li>
                <li><span className="text-blue-400 font-medium">Dynamic Threat Classification:</span> The Classifier Agent uses LLMs and RAG to provide detailed threat classifications.</li>
                <li><span className="text-blue-400 font-medium">Autonomous Response:</span> The Response Agent automatically executes appropriate response actions.</li>
                <li><span className="text-blue-400 font-medium">Simulated Environment:</span> The system includes a realistic network simulation for testing and demonstration.</li>
                <li><span className="text-blue-400 font-medium">Configurable Policies:</span> Response policies can be configured for different attack types and severity levels.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Technical Implementation</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="text-blue-400 font-medium">Machine Learning:</span> The Hunter Agent uses a Random Forest classifier for threat detection.</li>
                <li><span className="text-blue-400 font-medium">LLMs:</span> The Classifier Agent uses LLMs for threat classification and context generation.</li>
                <li><span className="text-blue-400 font-medium">Multi-Agent Architecture:</span> The agents operate asynchronously and communicate through a shared memory space.</li>
                <li><span className="text-blue-400 font-medium">Containerization:</span> The system is containerized using Docker for easy deployment.</li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center pt-2">
              <Code className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-gray-400 text-sm">View source code for implementation details</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProjectOverview;
