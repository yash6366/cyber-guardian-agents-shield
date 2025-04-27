import React from 'react';
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ProjectOverview = () => {
  return (
    <section className="container mx-auto px-4 py-8 mb-8">
      <Card className="bg-gray-800/50 border-gray-700">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Project Overview</h2>
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
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProjectOverview;