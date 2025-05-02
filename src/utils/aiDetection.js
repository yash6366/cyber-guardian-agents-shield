
// AI Detection Utility for Enhanced Threat Detection
import { v4 as uuidv4 } from 'uuid';

// Simulated anomaly detection engine based on behavioral patterns
export const detectionSettings = {
  sensitivityLevel: 0.65,  // 0-1 range, higher is more sensitive
  minSampleSize: 100,      // Minimum data points required for analysis
  baselinePeriod: 7,       // Days of data to establish normal behavior
  decisionThreshold: 0.8,  // Confidence threshold for alerting
  learningRate: 0.05       // Rate at which the model adapts to new patterns
};

// Anomaly types the system can detect
export const anomalyTypes = [
  { 
    id: 'TRAFFIC_SPIKE',
    name: 'Unusual Traffic Volume',
    description: 'Sudden significant increase in network traffic',
    severity: 'Medium',
    mitreTactic: 'Initial Access'
  },
  { 
    id: 'AUTH_FAILURE',
    name: 'Authentication Anomaly',
    description: 'Multiple failed authentication attempts or unusual login patterns',
    severity: 'High',
    mitreTactic: 'Credential Access'
  },
  { 
    id: 'LATERAL_MOVEMENT',
    name: 'Lateral Movement',
    description: 'Unusual communication between systems that don\'t typically interact',
    severity: 'Critical',
    mitreTactic: 'Lateral Movement'
  },
  { 
    id: 'DATA_EXFIL',
    name: 'Data Exfiltration',
    description: 'Unusual outbound data transfer or access to sensitive data',
    severity: 'Critical',
    mitreTactic: 'Exfiltration'
  },
  { 
    id: 'PRIVILEGE_ESC',
    name: 'Privilege Escalation',
    description: 'Attempts to gain higher-level permissions',
    severity: 'High',
    mitreTactic: 'Privilege Escalation'
  }
];

// Simulate ML model detection
export function detectAnomalies(networkData, logData) {
  const anomalies = [];
  const detectionTime = Date.now();
  
  // Simulated network traffic anomaly detection
  if (networkData && networkData.length > 0) {
    const trafficAnalysis = analyzeNetworkTraffic(networkData);
    
    if (trafficAnalysis.anomalyDetected) {
      anomalies.push({
        id: uuidv4(),
        type: 'TRAFFIC_SPIKE',
        detection_time: detectionTime,
        confidence: trafficAnalysis.confidence,
        source_ip: trafficAnalysis.sourceIp,
        destination_ip: trafficAnalysis.destinationIp,
        details: trafficAnalysis.details,
        severity: 'Medium'
      });
    }
  }
  
  // Simulated log analysis for authentication anomalies
  if (logData && logData.length > 0) {
    const authAnalysis = analyzeAuthenticationLogs(logData);
    
    if (authAnalysis.anomalyDetected) {
      anomalies.push({
        id: uuidv4(),
        type: 'AUTH_FAILURE',
        detection_time: detectionTime,
        confidence: authAnalysis.confidence,
        username: authAnalysis.username,
        source_ip: authAnalysis.sourceIp,
        details: authAnalysis.details,
        severity: 'High'
      });
    }
  }
  
  return anomalies;
}

// Simulate network traffic analysis
function analyzeNetworkTraffic(networkData) {
  // This would be a complex ML algorithm in a real implementation
  const hasAnomaly = Math.random() > 0.7;
  
  return {
    anomalyDetected: hasAnomaly,
    confidence: hasAnomaly ? 0.85 + (Math.random() * 0.1) : 0,
    sourceIp: hasAnomaly ? '192.168.1.' + Math.floor(Math.random() * 255) : '',
    destinationIp: hasAnomaly ? '10.0.0.' + Math.floor(Math.random() * 255) : '',
    details: hasAnomaly ? 'Unusual traffic pattern detected - volume exceeded baseline by 287%' : ''
  };
}

// Simulate authentication log analysis
function analyzeAuthenticationLogs(logData) {
  // This would be a complex ML algorithm in a real implementation
  const hasAnomaly = Math.random() > 0.8;
  
  return {
    anomalyDetected: hasAnomaly,
    confidence: hasAnomaly ? 0.9 + (Math.random() * 0.09) : 0,
    username: hasAnomaly ? 'admin' : '',
    sourceIp: hasAnomaly ? '209.58.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) : '',
    details: hasAnomaly ? 'Multiple failed login attempts from unusual location' : ''
  };
}

// Create an AI-based threat detection report
export function generateAIDetectionReport(timeframe) {
  const detections = [];
  const now = Date.now();
  const reportId = uuidv4();
  
  // Number of simulated detections based on timeframe
  const detectionCount = timeframe === 'day' ? 3 : 
                         timeframe === 'week' ? 12 : 
                         timeframe === 'month' ? 38 : 5;
  
  // Generate simulated detections
  for (let i = 0; i < detectionCount; i++) {
    const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
    const timeOffset = Math.random() * (timeframe === 'day' ? 86400000 : 
                                      timeframe === 'week' ? 604800000 : 
                                      timeframe === 'month' ? 2592000000 : 259200000);
    
    detections.push({
      id: uuidv4(),
      detection_time: now - timeOffset,
      type: anomalyType.id,
      name: anomalyType.name,
      description: anomalyType.description,
      confidence: 0.7 + (Math.random() * 0.29),
      severity: anomalyType.severity,
      mitre_tactic: anomalyType.mitreTactic,
      affected_system: `srv-${Math.floor(Math.random() * 20)}.internal`,
      status: Math.random() > 0.3 ? 'Investigating' : 'New'
    });
  }
  
  // Sort by detection time (newest first)
  detections.sort((a, b) => b.detection_time - a.detection_time);
  
  return {
    id: reportId,
    generated_at: now,
    timeframe: timeframe,
    detection_count: detections.length,
    detections: detections,
    summary: {
      critical: detections.filter(d => d.severity === 'Critical').length,
      high: detections.filter(d => d.severity === 'High').length,
      medium: detections.filter(d => d.severity === 'Medium').length,
      low: detections.filter(d => d.severity === 'Low').length
    }
  };
}

// Enhance an existing threat with AI analysis
export function enhanceWithAIAnalysis(threat) {
  // Simulated AI enhancement of threat data
  const enhancedThreat = {
    ...threat,
    ai_analysis: {
      risk_score: Math.round(70 + Math.random() * 30),
      confidence: Math.round((0.65 + Math.random() * 0.35) * 100) / 100,
      similar_threats: Math.floor(Math.random() * 5),
      prediction: {
        next_likely_step: threat.type === 'SQL Injection' ? 'Data Exfiltration' : 
                         threat.type === 'DDoS' ? 'Service Disruption' : 'Lateral Movement',
        target_systems_at_risk: generateRiskTargets(3),
        recommended_actions: generateRecommendedActions(threat.type)
      },
      historical_context: {
        previous_occurrences: Math.floor(Math.random() * 10),
        average_remediation_time: Math.floor(Math.random() * 48) + 2 + ' hours',
        success_rate: Math.round((0.7 + Math.random() * 0.3) * 100) + '%'
      }
    }
  };
  
  return enhancedThreat;
}

// Generate list of systems at risk
function generateRiskTargets(count) {
  const systems = [
    'Database Server', 'Authentication Service', 'Web Application Server',
    'API Gateway', 'File Storage', 'User Directory', 'Payment Processing',
    'Admin Console', 'Customer Database', 'Network Gateway'
  ];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * systems.length);
    if (!result.includes(systems[randomIndex])) {
      result.push(systems[randomIndex]);
    } else {
      i--; // Try again to get a unique system
    }
  }
  
  return result;
}

// Generate recommended actions based on threat type
function generateRecommendedActions(threatType) {
  const commonActions = [
    'Enable enhanced logging',
    'Review access controls'
  ];
  
  const specificActions = {
    'SQL Injection': [
      'Apply input validation patches',
      'Update database firewall rules',
      'Implement prepared statements'
    ],
    'DDoS': [
      'Enable traffic filtering',
      'Scale infrastructure resources',
      'Activate CDN protection'
    ],
    'APT': [
      'Isolate affected systems',
      'Reset all credentials',
      'Enable network segment isolation'
    ],
    'default': [
      'Update security policies',
      'Run vulnerability scan',
      'Review system configurations'
    ]
  };
  
  const actions = specificActions[threatType] || specificActions.default;
  return [...actions, ...commonActions];
}
