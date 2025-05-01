
import { v4 as uuidv4 } from 'uuid';

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'New' | 'Investigating' | 'Containment' | 'Eradication' | 'Recovery' | 'Closed';
export type NotificationSeverity = 'info' | 'warning' | 'error' | 'success';

export interface ResponseTask {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  assignee?: string;
  order: number;
  automated: boolean;
  startTime?: number;
  endTime?: number;
  category?: 'detection' | 'containment' | 'eradication' | 'recovery' | 'post-incident';
  dependencies?: string[]; // IDs of tasks that must be completed first
  artifacts?: TaskArtifact[]; // Evidence or artifacts related to this task
}

export interface TaskArtifact {
  id: string;
  name: string;
  type: 'ip' | 'domain' | 'file' | 'url' | 'hash' | 'log' | 'other';
  value: string;
  isMalicious?: boolean;
  description?: string;
  timestamp: number;
}

export interface IncidentResponse {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: number;
  updatedAt: number;
  threatType: string;
  affectedSystems: string[];
  tasks: ResponseTask[];
  timeline: {
    timestamp: number;
    message: string;
    taskId?: string;
    severity?: NotificationSeverity;
  }[];
  owner?: string;
  tags?: string[];
  artifacts?: TaskArtifact[];
  ttc?: number; // Time to contain (ms)
  ttr?: number; // Time to resolve (ms)
  mitreAttackTechniques?: string[]; // MITRE ATT&CK techniques identified
  containmentActions?: string[]; // Actions taken to contain the threat
  reminderTime?: number; // Time for next follow-up
}

export interface PlaybookAction {
  title: string;
  description: string;
  automated: boolean;
  command?: string;
  validationSteps?: string[];
  category: 'detection' | 'containment' | 'eradication' | 'recovery' | 'post-incident';
}

export interface ResponsePlaybook {
  id: string;
  name: string;
  threatType: string;
  description: string;
  severity: IncidentSeverity;
  version: string;
  author: string;
  actions: PlaybookAction[];
  mitreAttackTechniques?: string[];
  tags?: string[];
}

export interface ResponseTemplate {
  id: string;
  name: string;
  threatType: string;
  description: string;
  severity: IncidentSeverity;
  playbookId?: string;
  taskTemplates: {
    title: string;
    description: string;
    order: number;
    automated: boolean;
    category?: 'detection' | 'containment' | 'eradication' | 'recovery' | 'post-incident';
    dependencies?: number[]; // Order numbers of tasks this depends on
  }[];
}

// Helper function to ensure severity values are of the correct type
function getSafeSeverity(severity: string | undefined): NotificationSeverity {
  if (severity && ["error", "success", "info", "warning"].includes(severity)) {
    return severity as NotificationSeverity;
  }
  return "info"; // Default fallback
}

// Predefined response templates based on TheHive methodologies
export const responseTemplates: ResponseTemplate[] = [
  {
    id: uuidv4(),
    name: 'SQL Injection Response',
    threatType: 'SQL',
    description: 'Response workflow for SQL injection attacks targeting database systems',
    severity: 'High',
    taskTemplates: [
      {
        title: 'Initial Triage',
        description: 'Assess affected systems and initial impact',
        order: 1,
        automated: true,
        category: 'detection'
      },
      {
        title: 'Database Isolation',
        description: 'Temporarily restrict access to affected database',
        order: 2,
        automated: true,
        category: 'containment',
        dependencies: [1]
      },
      {
        title: 'Query Analysis',
        description: 'Analyze malicious queries and identify vulnerabilities',
        order: 3,
        automated: false,
        category: 'detection',
        dependencies: [2]
      },
      {
        title: 'Patch Vulnerable Code',
        description: 'Apply input validation and prepared statements',
        order: 4,
        automated: false,
        category: 'eradication',
        dependencies: [3]
      },
      {
        title: 'Database Sanitization',
        description: 'Remove malicious data and validate integrity',
        order: 5,
        automated: true,
        category: 'eradication',
        dependencies: [4]
      },
      {
        title: 'Service Restoration',
        description: 'Restore database service with security enhancements',
        order: 6,
        automated: true,
        category: 'recovery',
        dependencies: [5]
      },
      {
        title: 'Post-Incident Analysis',
        description: 'Document incident and update security policies',
        order: 7,
        automated: false,
        category: 'post-incident',
        dependencies: [6]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'DDoS Attack Response',
    threatType: 'DDoS',
    description: 'Response workflow for Distributed Denial of Service attacks',
    severity: 'High',
    taskTemplates: [
      {
        title: 'Traffic Analysis',
        description: 'Analyze attack patterns and traffic sources',
        order: 1,
        automated: true,
        category: 'detection'
      },
      {
        title: 'Traffic Filtering',
        description: 'Configure firewall to filter attack traffic',
        order: 2,
        automated: true,
        category: 'containment',
        dependencies: [1]
      },
      {
        title: 'Scale Resources',
        description: 'Increase resources to handle legitimate traffic',
        order: 3,
        automated: true,
        category: 'containment',
        dependencies: [2]
      },
      {
        title: 'CDN Configuration',
        description: 'Configure CDN to absorb attack traffic',
        order: 4,
        automated: false,
        category: 'containment',
        dependencies: [2]
      },
      {
        title: 'Service Monitoring',
        description: 'Continuously monitor service availability',
        order: 5,
        automated: true,
        category: 'recovery',
        dependencies: [3, 4]
      },
      {
        title: 'Post-Attack Analysis',
        description: 'Document attack patterns and improve defenses',
        order: 6,
        automated: false,
        category: 'post-incident',
        dependencies: [5]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Advanced Persistent Threat Response',
    threatType: 'APT',
    description: 'Response workflow for sophisticated APT attacks',
    severity: 'Critical',
    taskTemplates: [
      {
        title: 'Threat Hunting',
        description: 'Identify indicators of compromise across systems',
        order: 1,
        automated: true,
        category: 'detection'
      },
      {
        title: 'System Isolation',
        description: 'Isolate compromised systems from network',
        order: 2,
        automated: true,
        category: 'containment',
        dependencies: [1]
      },
      {
        title: 'Credential Reset',
        description: 'Force reset of all credentials in affected domains',
        order: 3,
        automated: true,
        category: 'containment',
        dependencies: [2]
      },
      {
        title: 'Forensic Analysis',
        description: 'Perform detailed forensics on compromised systems',
        order: 4,
        automated: false,
        category: 'detection',
        dependencies: [2]
      },
      {
        title: 'Malware Removal',
        description: 'Remove all identified malware and backdoors',
        order: 5,
        automated: false,
        category: 'eradication',
        dependencies: [4]
      },
      {
        title: 'System Rebuilding',
        description: 'Rebuild compromised systems from clean images',
        order: 6,
        automated: false,
        category: 'eradication',
        dependencies: [5]
      },
      {
        title: 'Security Hardening',
        description: 'Apply additional security controls to prevent re-infection',
        order: 7,
        automated: true,
        category: 'recovery',
        dependencies: [6]
      },
      {
        title: 'Threat Intelligence',
        description: 'Create and share threat intelligence from the incident',
        order: 8,
        automated: false,
        category: 'post-incident',
        dependencies: [7]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Ransomware Incident Response',
    threatType: 'Ransomware',
    description: 'Response workflow for ransomware attacks targeting organizational data',
    severity: 'Critical',
    taskTemplates: [
      {
        title: 'Initial Assessment',
        description: 'Determine scope and systems affected by ransomware',
        order: 1,
        automated: true,
        category: 'detection'
      },
      {
        title: 'Network Isolation',
        description: 'Isolate affected systems to prevent spread',
        order: 2,
        automated: true,
        category: 'containment',
        dependencies: [1]
      },
      {
        title: 'Malware Identification',
        description: 'Identify ransomware variant and potential decryption options',
        order: 3,
        automated: false,
        category: 'detection',
        dependencies: [2]
      },
      {
        title: 'Evidence Collection',
        description: 'Collect forensic evidence for investigation and potential legal action',
        order: 4,
        automated: false,
        category: 'detection',
        dependencies: [3]
      },
      {
        title: 'Backup Assessment',
        description: 'Verify integrity of backups and prepare for restoration',
        order: 5,
        automated: false,
        category: 'recovery',
        dependencies: [2]
      },
      {
        title: 'System Restoration',
        description: 'Clean affected systems and restore from trusted backups',
        order: 6,
        automated: false,
        category: 'recovery',
        dependencies: [3, 5]
      },
      {
        title: 'Security Control Updates',
        description: 'Update security controls to prevent future ransomware attacks',
        order: 7,
        automated: false,
        category: 'post-incident',
        dependencies: [6]
      }
    ]
  }
];

// Playbooks for automated response
export const responsePlaybooks: ResponsePlaybook[] = [
  {
    id: uuidv4(),
    name: 'SQL Injection Mitigation',
    threatType: 'SQL',
    description: 'A structured playbook for addressing SQL injection vulnerabilities',
    severity: 'High',
    version: '1.2',
    author: 'Security Operations',
    mitreAttackTechniques: ['T1190'],
    actions: [
      {
        title: 'Identify affected database',
        description: 'Query logs to identify affected database instances',
        automated: true,
        command: 'grep -r "SQL injection" /var/log/database/',
        category: 'detection'
      },
      {
        title: 'Block malicious IP addresses',
        description: 'Add source IPs to blocklist',
        automated: true,
        command: 'iptables -A INPUT -s $ATTACKER_IP -j DROP',
        category: 'containment'
      },
      {
        title: 'Apply WAF rules',
        description: 'Update WAF rules to block SQL injection patterns',
        automated: true,
        command: 'apply-waf-rules --ruleset=sql-injection',
        category: 'containment'
      },
      {
        title: 'Patch vulnerable endpoints',
        description: 'Apply parameterized queries to affected endpoints',
        automated: false,
        validationSteps: [
          'Review code for direct SQL string concatenation',
          'Replace with parameterized queries',
          'Test with SQL injection payloads'
        ],
        category: 'eradication'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'DDoS Mitigation',
    threatType: 'DDoS',
    description: 'A structured playbook for mitigating DDoS attacks',
    severity: 'High',
    version: '2.1',
    author: 'Network Security',
    mitreAttackTechniques: ['T1498', 'T1499'],
    actions: [
      {
        title: 'Analyze attack pattern',
        description: 'Determine the type of DDoS attack',
        automated: true,
        command: 'analyze-traffic --window=5m',
        category: 'detection'
      },
      {
        title: 'Activate traffic scrubbing',
        description: 'Redirect traffic through scrubbing center',
        automated: true,
        command: 'activate-scrubbing --mode=full',
        category: 'containment'
      },
      {
        title: 'Rate limit suspicious traffic',
        description: 'Implement rate limiting for suspicious traffic patterns',
        automated: true,
        command: 'rate-limit --threshold=1000rps --subnet=$ATTACK_SUBNET',
        category: 'containment'
      }
    ]
  }
];

// Create a new incident response based on a template and threat information
export function createIncidentResponse(threatType: string, affectedSystems: string[]): IncidentResponse {
  // Find matching template or use default
  const template = responseTemplates.find(t => t.threatType === threatType) || responseTemplates[2];
  
  const now = Date.now();
  
  // Find related playbook if exists
  const relatedPlaybook = responsePlaybooks.find(p => p.threatType === threatType);
  
  // Generate tasks from template
  const tasks = template.taskTemplates.map(taskTemplate => ({
    id: uuidv4(),
    title: taskTemplate.title,
    description: taskTemplate.description,
    status: 'Pending' as const,
    order: taskTemplate.order,
    automated: taskTemplate.automated,
    category: taskTemplate.category,
    dependencies: taskTemplate.dependencies?.map(order => 
      // Find task ID with matching order
      template.taskTemplates.find(t => t.order === order)?.title
    ).filter(Boolean)
  }));
  
  // Generate MITRE ATT&CK techniques if available from playbook
  const mitreAttackTechniques = relatedPlaybook?.mitreAttackTechniques || [];
  
  // Setup containment actions if available
  const containmentActions = relatedPlaybook?.actions
    .filter(a => a.category === 'containment')
    .map(a => a.title) || [];
  
  return {
    id: uuidv4(),
    title: `${threatType} Incident Response`,
    description: template.description,
    severity: template.severity,
    status: 'New',
    createdAt: now,
    updatedAt: now,
    threatType,
    affectedSystems,
    tasks,
    timeline: [
      {
        timestamp: now,
        message: `Incident response created for ${threatType} attack affecting ${affectedSystems.join(', ')}`,
        severity: 'info'
      }
    ],
    mitreAttackTechniques,
    containmentActions,
    tags: [threatType, ...affectedSystems],
    artifacts: []
  };
}

// Advance a task in the workflow
export function advanceTask(response: IncidentResponse, taskId: string): IncidentResponse {
  const taskIndex = response.tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return response;
  
  const updatedTasks = [...response.tasks];
  const task = updatedTasks[taskIndex];
  const now = Date.now();
  
  // Update task status
  if (task.status === 'Pending') {
    updatedTasks[taskIndex] = {
      ...task,
      status: 'In Progress',
      startTime: now
    };
    
    // Add timeline event
    const timeline = [
      ...response.timeline,
      {
        timestamp: now,
        message: `Task "${task.title}" started`,
        taskId,
        severity: 'info' as NotificationSeverity
      }
    ];
    
    return {
      ...response,
      tasks: updatedTasks,
      timeline,
      updatedAt: now
    };
  } else if (task.status === 'In Progress') {
    updatedTasks[taskIndex] = {
      ...task,
      status: 'Completed',
      endTime: now
    };
    
    // Add timeline event
    const timeline = [
      ...response.timeline,
      {
        timestamp: now,
        message: `Task "${task.title}" completed`,
        taskId,
        severity: 'success' as NotificationSeverity
      }
    ];
    
    // Check if all tasks are completed to update incident status
    let status = response.status;
    const allTasksCompleted = updatedTasks.every(t => t.status === 'Completed' || t.status === 'Failed');
    
    if (allTasksCompleted) {
      status = 'Closed';
      const ttc = calculateTimeToContain(response, now);
      const ttr = now - response.createdAt;
      
      timeline.push({
        timestamp: now,
        message: 'All tasks completed, incident closed',
        severity: 'success' as NotificationSeverity
      });
      
      return {
        ...response,
        tasks: updatedTasks,
        timeline,
        status,
        updatedAt: now,
        ttc,
        ttr
      };
    } else {
      // Progress through incident lifecycle based on task categories
      const pendingTasks = updatedTasks.filter(t => t.status === 'Pending');
      if (pendingTasks.length > 0) {
        const nextTask = pendingTasks.reduce((min, task) => 
          task.order < min.order ? task : min, pendingTasks[0]);
          
        // Update status based on next pending task category
        if (nextTask.category === 'detection' || !nextTask.category) {
          status = 'Investigating';
        } else if (nextTask.category === 'containment') {
          status = 'Containment';
        } else if (nextTask.category === 'eradication') {
          status = 'Eradication';
        } else if (nextTask.category === 'recovery' || nextTask.category === 'post-incident') {
          status = 'Recovery';
        }
        
        timeline.push({
          timestamp: now,
          message: `Incident status updated to ${status}`,
          severity: 'info' as NotificationSeverity
        });
      }
      
      return {
        ...response,
        tasks: updatedTasks,
        timeline,
        status,
        updatedAt: now
      };
    }
  }
  
  return response;
}

// Calculate time to contain the incident
function calculateTimeToContain(response: IncidentResponse, closeTime: number): number | undefined {
  // Find the first containment task that was completed
  const containmentTasks = response.tasks.filter(t => t.category === 'containment' && t.endTime);
  if (containmentTasks.length === 0) return undefined;
  
  // Get the earliest completion time of a containment task
  const earliestContainment = Math.min(...containmentTasks.map(t => t.endTime || Infinity));
  return earliestContainment - response.createdAt;
}

// Add an artifact to the incident
export function addArtifact(response: IncidentResponse, artifact: Omit<TaskArtifact, 'id' | 'timestamp'>): IncidentResponse {
  const now = Date.now();
  const newArtifact = {
    ...artifact,
    id: uuidv4(),
    timestamp: now
  };
  
  const artifacts = [...(response.artifacts || []), newArtifact];
  
  const timeline = [
    ...response.timeline,
    {
      timestamp: now,
      message: `Artifact added: ${artifact.type} - ${artifact.name}`,
      severity: artifact.isMalicious ? 'warning' : 'info' as NotificationSeverity
    }
  ];
  
  return {
    ...response,
    artifacts,
    timeline,
    updatedAt: now
  };
}

// Get next steps in the workflow
export function getNextTasks(response: IncidentResponse): ResponseTask[] {
  const inProgressTasks = response.tasks.filter(task => task.status === 'In Progress');
  if (inProgressTasks.length > 0) {
    return inProgressTasks;
  }
  
  // Get all pending tasks
  const pendingTasks = response.tasks.filter(task => task.status === 'Pending');
  if (pendingTasks.length === 0) return [];
  
  // Filter tasks whose dependencies are all completed
  const tasksWithMetDependencies = pendingTasks.filter(task => {
    if (!task.dependencies || task.dependencies.length === 0) return true;
    
    // Check if all dependencies are completed
    return task.dependencies.every(depTitle => {
      const dependencyTask = response.tasks.find(t => t.title === depTitle);
      return dependencyTask && dependencyTask.status === 'Completed';
    });
  });
  
  if (tasksWithMetDependencies.length === 0) return [];
  
  // Return tasks with lowest order among those with met dependencies
  const minOrder = Math.min(...tasksWithMetDependencies.map(task => task.order));
  return tasksWithMetDependencies.filter(task => task.order === minOrder);
}

// Create a full task dependency tree for visualization
export function getTaskDependencyGraph(response: IncidentResponse): { tasks: ResponseTask[], links: {source: string, target: string}[] } {
  const links: {source: string, target: string}[] = [];
  
  // Create links for each dependency
  for (const task of response.tasks) {
    if (task.dependencies && task.dependencies.length > 0) {
      for (const depTitle of task.dependencies) {
        const dependencyTask = response.tasks.find(t => t.title === depTitle);
        if (dependencyTask) {
          links.push({
            source: dependencyTask.id,
            target: task.id
          });
        }
      }
    }
  }
  
  return {
    tasks: response.tasks,
    links
  };
}

// Simulate automated task execution
export function executeAutomatedTasks(response: IncidentResponse): IncidentResponse {
  let updatedResponse = { ...response };
  
  // Get next tasks
  const nextTasks = getNextTasks(updatedResponse);
  
  // Execute automated tasks
  for (const task of nextTasks) {
    if (task.automated) {
      updatedResponse = advanceTask(updatedResponse, task.id);
      
      // After a short delay, complete the automated task
      setTimeout(() => {
        updatedResponse = advanceTask(updatedResponse, task.id);
      }, 2000);
    }
  }
  
  return updatedResponse;
}

// Get metrics for the incident
export function getIncidentMetrics(response: IncidentResponse): {
  totalTasks: number,
  completedTasks: number,
  automatedTasksCount: number,
  manualTasksCount: number,
  averageTaskCompletionTime: number,
  timeToContain?: number,
  timeToResolve?: number
} {
  const completedTasks = response.tasks.filter(t => t.status === 'Completed');
  const automatedTasksCount = response.tasks.filter(t => t.automated).length;
  const manualTasksCount = response.tasks.filter(t => !t.automated).length;
  
  // Calculate average task completion time
  let totalCompletionTime = 0;
  let tasksWithTime = 0;
  
  for (const task of completedTasks) {
    if (task.startTime && task.endTime) {
      totalCompletionTime += task.endTime - task.startTime;
      tasksWithTime++;
    }
  }
  
  const averageTaskCompletionTime = tasksWithTime > 0 ? totalCompletionTime / tasksWithTime : 0;
  
  return {
    totalTasks: response.tasks.length,
    completedTasks: completedTasks.length,
    automatedTasksCount,
    manualTasksCount,
    averageTaskCompletionTime,
    timeToContain: response.ttc,
    timeToResolve: response.ttr
  };
}
