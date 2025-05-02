
import { v4 as uuidv4 } from 'uuid';

// Helper function to ensure severity values are of the correct type
function getSafeSeverity(severity) {
  if (severity && ["error", "success", "info", "warning"].includes(severity)) {
    return severity;
  }
  return "info"; // Default fallback
}

// Predefined response templates based on TheHive methodologies
export const responseTemplates = [
  {
    id: uuidv4(),
    name: 'SQL Injection Response',
    threatType: 'SQL Injection',
    description: 'Response workflow for SQL injection attacks targeting database systems',
    severity: 'High',
    taskTemplates: [
      {
        title: 'Initial Triage',
        description: 'Assess affected systems and initial impact',
        order: 1,
        automated: true
      },
      {
        title: 'Database Isolation',
        description: 'Temporarily restrict access to affected database',
        order: 2,
        automated: true
      },
      {
        title: 'Query Analysis',
        description: 'Analyze malicious queries and identify vulnerabilities',
        order: 3,
        automated: false
      },
      {
        title: 'Patch Vulnerable Code',
        description: 'Apply input validation and prepared statements',
        order: 4,
        automated: false
      },
      {
        title: 'Database Sanitization',
        description: 'Remove malicious data and validate integrity',
        order: 5,
        automated: true
      },
      {
        title: 'Service Restoration',
        description: 'Restore database service with security enhancements',
        order: 6,
        automated: true
      },
      {
        title: 'Post-Incident Analysis',
        description: 'Document incident and update security policies',
        order: 7,
        automated: false
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
        automated: true
      },
      {
        title: 'Traffic Filtering',
        description: 'Configure firewall to filter attack traffic',
        order: 2,
        automated: true
      },
      {
        title: 'Scale Resources',
        description: 'Increase resources to handle legitimate traffic',
        order: 3,
        automated: true
      },
      {
        title: 'CDN Configuration',
        description: 'Configure CDN to absorb attack traffic',
        order: 4,
        automated: false
      },
      {
        title: 'Service Monitoring',
        description: 'Continuously monitor service availability',
        order: 5,
        automated: true
      },
      {
        title: 'Post-Attack Analysis',
        description: 'Document attack patterns and improve defenses',
        order: 6,
        automated: false
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
        automated: true
      },
      {
        title: 'System Isolation',
        description: 'Isolate compromised systems from network',
        order: 2,
        automated: true
      },
      {
        title: 'Credential Reset',
        description: 'Force reset of all credentials in affected domains',
        order: 3,
        automated: true
      },
      {
        title: 'Forensic Analysis',
        description: 'Perform detailed forensics on compromised systems',
        order: 4,
        automated: false
      },
      {
        title: 'Malware Removal',
        description: 'Remove all identified malware and backdoors',
        order: 5,
        automated: false
      },
      {
        title: 'System Rebuilding',
        description: 'Rebuild compromised systems from clean images',
        order: 6,
        automated: false
      },
      {
        title: 'Security Hardening',
        description: 'Apply additional security controls to prevent re-infection',
        order: 7,
        automated: true
      },
      {
        title: 'Threat Intelligence',
        description: 'Create and share threat intelligence from the incident',
        order: 8,
        automated: false
      }
    ]
  }
];

// Create a new incident response based on a template and threat information
export function createIncidentResponse(threatType, affectedSystems) {
  // Find matching template or use default
  const template = responseTemplates.find((t) => t.threatType === threatType) || responseTemplates[2];
  const now = Date.now();

  // Generate tasks from template
  const tasks = template.taskTemplates.map((taskTemplate) => ({
    id: uuidv4(),
    title: taskTemplate.title,
    description: taskTemplate.description,
    status: 'Pending',
    order: taskTemplate.order,
    automated: taskTemplate.automated
  }));

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
        message: `Incident response created for ${threatType} attack affecting ${affectedSystems.join(', ')}`
      }
    ]
  };
}

// Advance a task in the workflow
export function advanceTask(response, taskId) {
  const taskIndex = response.tasks.findIndex((task) => task.id === taskId);
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
        severity: 'info'
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
        severity: 'success'
      }
    ];

    // Check if all tasks are completed to update incident status
    let status = response.status;
    const allTasksCompleted = updatedTasks.every((t) => t.status === 'Completed' || t.status === 'Failed');
    if (allTasksCompleted) {
      status = 'Closed';
      timeline.push({
        timestamp: now,
        message: 'All tasks completed, incident closed',
        severity: 'success'
      });
    } else {
      // Progress through incident lifecycle
      const pendingTasks = updatedTasks.filter((t) => t.status === 'Pending');
      if (pendingTasks.length > 0) {
        const nextTask = pendingTasks.reduce((min, task) => task.order < min.order ? task : min, pendingTasks[0]);
        if (nextTask.order <= 2) status = 'Investigating';
        else if (nextTask.order <= 4) status = 'Containment';
        else if (nextTask.order <= 6) status = 'Eradication';
        else status = 'Recovery';

        timeline.push({
          timestamp: now,
          message: `Incident status updated to ${status}`,
          severity: 'info'
        });
      }
    }

    return {
      ...response,
      tasks: updatedTasks,
      timeline,
      status,
      updatedAt: now
    };
  }

  return response;
}

// Get next steps in the workflow
export function getNextTasks(response) {
  const inProgressTasks = response.tasks.filter((task) => task.status === 'In Progress');
  if (inProgressTasks.length > 0) {
    return inProgressTasks;
  }

  const pendingTasks = response.tasks.filter((task) => task.status === 'Pending');
  if (pendingTasks.length === 0) return [];

  const minOrder = Math.min(...pendingTasks.map((task) => task.order));
  return pendingTasks.filter((task) => task.order === minOrder);
}

// Simulate automated task execution
export function executeAutomatedTasks(response) {
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
