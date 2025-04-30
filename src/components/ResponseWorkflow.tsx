
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertTriangle, Shield, ArrowRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { IncidentResponse, ResponseTask, advanceTask } from '@/utils/responseWorkflow';

interface ResponseWorkflowProps {
  incident: IncidentResponse;
  onIncidentUpdate: (updatedIncident: IncidentResponse) => void;
}

const ResponseWorkflow: React.FC<ResponseWorkflowProps> = ({ incident, onIncidentUpdate }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  const handleAdvanceTask = (taskId: string) => {
    const updatedIncident = advanceTask(incident, taskId);
    onIncidentUpdate(updatedIncident);
  };
  
  const getStatusColor = (status: ResponseTask['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-900/60 text-green-400 border-green-600/40';
      case 'In Progress': return 'bg-blue-900/60 text-blue-400 border-blue-600/40';
      case 'Failed': return 'bg-red-900/60 text-red-400 border-red-600/40';
      case 'Pending': return 'bg-gray-900/60 text-gray-400 border-gray-600/40';
      default: return 'bg-gray-900/60 text-gray-400 border-gray-600/40';
    }
  };

  const getIncidentStatusColor = (status: IncidentResponse['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-900/60 text-blue-400 border-blue-600/40';
      case 'Investigating': return 'bg-yellow-900/60 text-yellow-400 border-yellow-600/40';
      case 'Containment': return 'bg-orange-900/60 text-orange-400 border-orange-600/40';
      case 'Eradication': return 'bg-purple-900/60 text-purple-400 border-purple-600/40';
      case 'Recovery': return 'bg-cyan-900/60 text-cyan-400 border-cyan-600/40';
      case 'Closed': return 'bg-green-900/60 text-green-400 border-green-600/40';
      default: return 'bg-gray-900/60 text-gray-400 border-gray-600/40';
    }
  };

  const getSeverityColor = (severity: IncidentResponse['severity']) => {
    switch (severity) {
      case 'Critical': return 'bg-red-900/60 text-red-400 border-red-600/40';
      case 'High': return 'bg-orange-900/60 text-orange-400 border-orange-600/40';
      case 'Medium': return 'bg-yellow-900/60 text-yellow-400 border-yellow-600/40';
      case 'Low': return 'bg-blue-900/60 text-blue-400 border-blue-600/40';
      default: return 'bg-gray-900/60 text-gray-400 border-gray-600/40';
    }
  };

  // Calculate completion percentage
  const completedTasks = incident.tasks.filter(t => t.status === 'Completed').length;
  const completionPercentage = Math.round((completedTasks / incident.tasks.length) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            {incident.title}
          </h3>
          <p className="text-gray-400 text-sm">{incident.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`px-3 py-1 ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </Badge>
          <Badge variant="outline" className={`px-3 py-1 ${getIncidentStatusColor(incident.status)}`}>
            {incident.status}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Response Progress</span>
          <span className="font-medium">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Response Tasks
          </h4>
          
          <div className="space-y-3">
            {incident.tasks.map((task) => (
              <div 
                key={task.id}
                className={`border ${task.id === selectedTask ? 'border-blue-500' : 'border-gray-700'} rounded-md p-3 cursor-pointer hover:bg-gray-700/30 transition-colors`}
                onClick={() => setSelectedTask(task.id)}
              >
                <div className="flex justify-between">
                  <h5 className="font-medium flex items-center gap-2">
                    {task.status === 'Completed' && <Check className="w-4 h-4 text-green-500" />}
                    {task.status === 'In Progress' && <Clock className="w-4 h-4 text-blue-500" />}
                    {task.status === 'Pending' && <Clock className="w-4 h-4 text-gray-500" />}
                    {task.status === 'Failed' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {task.title}
                  </h5>
                  <Badge variant="outline" className={`px-2 py-0.5 ${getStatusColor(task.status)}`}>
                    {task.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                
                {task.status === 'In Progress' && (
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleAdvanceTask(task.id)}
                    >
                      <Check className="w-4 h-4" />
                      Complete Task
                    </Button>
                  </div>
                )}
                
                {task.status === 'Pending' && task.order === Math.min(...incident.tasks.filter(t => t.status === 'Pending').map(t => t.order)) && (
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleAdvanceTask(task.id)}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Start Task
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Timeline
          </h4>
          
          <div className="space-y-4">
            {incident.timeline.slice().reverse().map((event, index) => (
              <div key={index} className="relative pl-6 pb-4">
                <div className="absolute left-0 top-0 h-full w-px bg-gray-700"></div>
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                
                <div className="text-sm text-gray-400">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
                <div className="text-sm mt-1">{event.message}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResponseWorkflow;
