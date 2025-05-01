
// AI-based detection system inspired by AI-Hunter and DeepLog
export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number;
  detectedPattern?: string;
  associatedTechnique?: string;
  recommendations: string[];
  timeline?: { timestamp: number; event: string }[];
  riskScore?: number;  // 0-100 scale
  falsePositiveProbability?: number;  // 0-1 scale
  relatedIncidents?: string[];
}

export interface LogEntry {
  timestamp: number;
  source: string;
  action: string;
  target?: string;
  data?: any;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

// Advanced features inspired by AI-Hunter and DeepLog
interface FeatureVector {
  timeDelta: number[];  // Time between events
  sourceEntropy: number;  // Entropy of source distribution
  actionEntropy: number;  // Entropy of action types
  volumeMetrics: number[];  // Volume metrics over time windows
  patternAnomaly: number;  // Pattern anomaly score
}

type DetectionModel = 'statistical' | 'deepLearning' | 'ensemble';

// Simulated ML model for detecting anomalies
class AnomalyDetectionModel {
  private knownPatterns: Map<string, number>;
  private thresholds: { [key: string]: number };
  private techniques: Map<string, string[]>;
  private historicalData: LogEntry[] = [];
  private currentModel: DetectionModel = 'ensemble';
  private falsePositiveRates: Map<string, number> = new Map();
  private patternConfidenceLevels: Map<string, number> = new Map();
  
  constructor() {
    // Simulated model weights and known patterns
    this.knownPatterns = new Map([
      ["database:query:malformed", 0.92],
      ["auth:login:failed:multiple", 0.88],
      ["network:traffic:unusual_destination", 0.85],
      ["network:traffic:unusual_volume", 0.90],
      ["system:process:unusual_execution", 0.87],
      ["api:request:malformed", 0.86],
      ["system:file:unauthorized_access", 0.93],
      ["network:scan:port_sweep", 0.89],
      ["auth:elevation:unexpected", 0.91],
      ["system:configuration:change", 0.82],
      ["data:exfiltration:large_transfer", 0.94],
      ["network:dns:anomalous_query", 0.86],
      ["network:protocol:unusual", 0.85],
      ["system:memory:suspicious_allocation", 0.92],
      ["system:registry:persistence_mechanism", 0.93],
    ]);
    
    this.thresholds = {
      "confidence": 0.65,
      "multiple_failures": 3,
      "traffic_volume": 100000,
      "time_window": 60000,  // 1 minute in ms
      "entropy_threshold": 0.7,
      "sequence_anomaly": 0.8,
    };
    
    this.techniques = new Map([
      ["database:query:malformed", ["T1190", "SQL Injection"]],
      ["auth:login:failed:multiple", ["T1110", "Brute Force"]],
      ["network:traffic:unusual_destination", ["T1048", "Exfiltration"]],
      ["network:traffic:unusual_volume", ["T1498", "DDoS"]],
      ["system:process:unusual_execution", ["T1059", "Command Execution"]],
      ["api:request:malformed", ["T1190", "Injection"]],
      ["system:file:unauthorized_access", ["T1083", "File Access"]],
      ["network:scan:port_sweep", ["T1046", "Network Service Scanning"]],
      ["auth:elevation:unexpected", ["T1068", "Privilege Escalation"]],
      ["system:configuration:change", ["T1562", "Defense Evasion"]],
      ["data:exfiltration:large_transfer", ["T1030", "Data Transfer Size Limits"]],
      ["network:dns:anomalous_query", ["T1071.004", "DNS Tunneling"]],
      ["network:protocol:unusual", ["T1071", "Protocol Tunneling"]],
      ["system:memory:suspicious_allocation", ["T1055", "Process Injection"]],
      ["system:registry:persistence_mechanism", ["T1547", "Boot/Logon Autostart Execution"]],
    ]);
    
    // Initialize pattern confidence levels
    for (const [pattern, confidence] of this.knownPatterns.entries()) {
      this.patternConfidenceLevels.set(pattern, confidence);
      // Initialize with low false positive rates
      this.falsePositiveRates.set(pattern, 0.05 + Math.random() * 0.1);
    }
  }

  // Calculate entropy of a discrete probability distribution
  private calculateEntropy(counts: Map<string, number>): number {
    const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
    if (total === 0) return 0;
    
    let entropy = 0;
    for (const count of counts.values()) {
      const probability = count / total;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    }
    
    // Normalize by max entropy (log2 of the number of unique values)
    const maxEntropy = Math.log2(counts.size || 1);
    return maxEntropy > 0 ? entropy / maxEntropy : 0;
  }
  
  // Extract feature vector for deep learning analysis
  private extractFeatures(logEntries: LogEntry[]): FeatureVector {
    if (logEntries.length < 2) {
      return {
        timeDelta: [],
        sourceEntropy: 0,
        actionEntropy: 0,
        volumeMetrics: [0, 0, 0],
        patternAnomaly: 0
      };
    }
    
    // Calculate time deltas between consecutive events
    const timeDelta = logEntries.slice(1).map((entry, i) => 
      entry.timestamp - logEntries[i].timestamp
    );
    
    // Count sources and actions for entropy calculation
    const sourceCounts = new Map<string, number>();
    const actionCounts = new Map<string, number>();
    
    for (const entry of logEntries) {
      sourceCounts.set(entry.source, (sourceCounts.get(entry.source) || 0) + 1);
      actionCounts.set(entry.action, (actionCounts.get(entry.action) || 0) + 1);
    }
    
    const sourceEntropy = this.calculateEntropy(sourceCounts);
    const actionEntropy = this.calculateEntropy(actionCounts);
    
    // Calculate volume metrics over different time windows
    const now = Date.now();
    const volumeMetrics = [
      logEntries.filter(e => now - e.timestamp < 10000).length,  // 10s window
      logEntries.filter(e => now - e.timestamp < 30000).length,  // 30s window
      logEntries.filter(e => now - e.timestamp < 60000).length   // 60s window
    ];
    
    // Calculate pattern anomaly score based on transition probabilities
    let patternAnomaly = 0;
    if (logEntries.length > 5) {
      // Simple n-gram analysis for sequence patterns
      const transitions = new Map<string, { total: number, next: Map<string, number> }>();
      
      // Build transition model
      for (let i = 0; i < logEntries.length - 1; i++) {
        const current = `${logEntries[i].source}:${logEntries[i].action}`;
        const next = `${logEntries[i+1].source}:${logEntries[i+1].action}`;
        
        if (!transitions.has(current)) {
          transitions.set(current, { total: 0, next: new Map() });
        }
        
        const transitionData = transitions.get(current)!;
        transitionData.total++;
        transitionData.next.set(next, (transitionData.next.get(next) || 0) + 1);
      }
      
      // Calculate anomaly score as average surprise (negative log probability)
      let totalSurprise = 0;
      let count = 0;
      
      for (let i = 0; i < logEntries.length - 1; i++) {
        const current = `${logEntries[i].source}:${logEntries[i].action}`;
        const next = `${logEntries[i+1].source}:${logEntries[i+1].action}`;
        
        if (transitions.has(current)) {
          const transitionData = transitions.get(current)!;
          const nextCount = transitionData.next.get(next) || 0;
          
          if (transitionData.total > 0) {
            const probability = nextCount / transitionData.total;
            // Add small epsilon to avoid log(0)
            const surprise = -Math.log(probability + 0.01);
            totalSurprise += surprise;
            count++;
          }
        }
      }
      
      patternAnomaly = count > 0 ? totalSurprise / count : 0;
      // Normalize to 0-1 scale with sigmoid
      patternAnomaly = 1 / (1 + Math.exp(-patternAnomaly + 5));
    }
    
    return {
      timeDelta,
      sourceEntropy,
      actionEntropy,
      volumeMetrics,
      patternAnomaly
    };
  }
  
  public detectAnomaly(logEntries: LogEntry[]): AnomalyDetectionResult {
    if (logEntries.length === 0) {
      return {
        isAnomaly: false,
        confidence: 0,
        recommendations: ["No log entries to analyze"],
        riskScore: 0,
        falsePositiveProbability: 0
      };
    }
    
    // Add to historical data for context
    this.historicalData = [...this.historicalData, ...logEntries].slice(-1000);
    
    // Extract features for deep learning approach
    const features = this.extractFeatures(logEntries);
    
    // Extract patterns from log entries using traditional approach
    const patterns = this.extractPatterns(logEntries);
    
    // Find the highest confidence match
    let highestConfidence = 0;
    let detectedPattern = "";
    let associatedTechnique = "";
    let falsePositiveProbability = 0;
    
    for (const pattern of patterns) {
      if (this.knownPatterns.has(pattern)) {
        // Base confidence from pattern match
        let baseConfidence = this.knownPatterns.get(pattern) || 0;
        
        // Adjust confidence based on feature analysis
        const featureContribution = this.analyzeFeatureContribution(features, pattern);
        const adjustedConfidence = baseConfidence * 0.7 + featureContribution * 0.3;
        
        if (adjustedConfidence > highestConfidence) {
          highestConfidence = adjustedConfidence;
          detectedPattern = pattern;
          associatedTechnique = this.techniques.get(pattern)?.[0] || "";
          falsePositiveProbability = this.falsePositiveRates.get(pattern) || 0.1;
        }
      }
    }
    
    // Calculate risk score (0-100)
    const riskScore = Math.round(highestConfidence * 100);
    
    // Generate anomaly timeline
    const timeline = this.generateAnomalyTimeline(logEntries, detectedPattern);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(detectedPattern);
    
    // Find potentially related incidents
    const relatedIncidents = this.findRelatedIncidents(detectedPattern);
    
    return {
      isAnomaly: highestConfidence > this.thresholds.confidence,
      confidence: highestConfidence,
      detectedPattern: detectedPattern || undefined,
      associatedTechnique: associatedTechnique || undefined,
      recommendations,
      timeline,
      riskScore,
      falsePositiveProbability,
      relatedIncidents
    };
  }
  
  private findRelatedIncidents(pattern: string): string[] {
    // Simulated related incidents based on pattern
    const relatedPatterns: { [key: string]: string[] } = {
      "database:query:malformed": ["Database Breach - June 2024", "SQL Injection Campaign - Customer Database"],
      "auth:login:failed:multiple": ["Brute Force Attack - Admin Accounts", "Credential Stuffing - March 2024"],
      "network:traffic:unusual_volume": ["DDoS Campaign - Company Website", "CDN Overload Incident"],
      "system:process:unusual_execution": ["Zero-day Exploit - Web Server", "Malware Outbreak - East Office"],
      "network:scan:port_sweep": ["Initial Recon - Network Segment A", "Pre-attack Scanning - DMZ"],
    };
    
    return relatedPatterns[pattern] || [];
  }
  
  private generateAnomalyTimeline(logEntries: LogEntry[], pattern: string): { timestamp: number; event: string }[] {
    if (!pattern) return [];
    
    const timeline: { timestamp: number; event: string }[] = [];
    const now = Date.now();
    
    // Create a simplified timeline based on the detected pattern
    switch (pattern) {
      case "database:query:malformed":
        const dbLogs = logEntries.filter(e => e.source === "database");
        if (dbLogs.length > 0) {
          timeline.push({
            timestamp: dbLogs[0].timestamp,
            event: "First suspicious database query detected"
          });
          
          const errorLogs = dbLogs.filter(e => e.data?.status === "error");
          if (errorLogs.length > 0) {
            timeline.push({
              timestamp: errorLogs[0].timestamp,
              event: "Database error triggered by malformed query"
            });
          }
          
          timeline.push({
            timestamp: now,
            event: "SQL injection pattern confirmed"
          });
        }
        break;
        
      case "auth:login:failed:multiple":
        const authLogs = logEntries.filter(e => e.source === "auth" && e.action === "login");
        if (authLogs.length > 0) {
          timeline.push({
            timestamp: authLogs[0].timestamp,
            event: "First failed login attempt"
          });
          
          timeline.push({
            timestamp: now - 60000,
            event: `${authLogs.length} failed login attempts detected`
          });
          
          timeline.push({
            timestamp: now,
            event: "Brute force attack pattern identified"
          });
        }
        break;
        
      case "network:traffic:unusual_volume":
        const netLogs = logEntries.filter(e => e.source === "network");
        if (netLogs.length > 0) {
          timeline.push({
            timestamp: netLogs[0].timestamp,
            event: "Traffic volume increase detected"
          });
          
          const maxTraffic = Math.max(...netLogs.map(log => log.data?.bytes || 0));
          timeline.push({
            timestamp: now - 30000,
            event: `Peak traffic volume: ${(maxTraffic/1024/1024).toFixed(2)} MB/s`
          });
          
          timeline.push({
            timestamp: now,
            event: "DDoS attack pattern confirmed"
          });
        }
        break;
        
      default:
        // Generic timeline
        if (logEntries.length > 0) {
          timeline.push({
            timestamp: logEntries[0].timestamp,
            event: "First suspicious activity detected"
          });
          
          timeline.push({
            timestamp: now,
            event: `Anomaly pattern identified: ${pattern}`
          });
        }
    }
    
    return timeline;
  }
  
  private analyzeFeatureContribution(features: FeatureVector, pattern: string): number {
    // Different patterns should be sensitive to different feature aspects
    switch (pattern) {
      case "network:traffic:unusual_volume":
        // For DDoS, volume metrics are most important
        return Math.min(features.volumeMetrics[2] / 100, 1) * 0.9;
        
      case "auth:login:failed:multiple":
        // For brute force, low time deltas and low entropy (same target) matter
        const avgTimeDelta = features.timeDelta.length > 0 
          ? features.timeDelta.reduce((sum, td) => sum + td, 0) / features.timeDelta.length 
          : Infinity;
        const isRapid = avgTimeDelta < 2000; // Less than 2 seconds between attempts
        return isRapid ? 0.9 : 0.2;
        
      case "system:process:unusual_execution":
        // For unusual execution, pattern anomaly score is most important
        return features.patternAnomaly * 0.9;
        
      case "database:query:malformed":
        // For SQL injection, pattern matters most
        return 0.85;
        
      default:
        // Default scoring is an average of entropy and pattern anomaly
        return (features.sourceEntropy + features.actionEntropy + features.patternAnomaly) / 3;
    }
  }
  
  private extractPatterns(logEntries: LogEntry[]): string[] {
    const patterns: string[] = [];
    
    // Group by source
    const sourceMap = new Map<string, LogEntry[]>();
    for (const entry of logEntries) {
      if (!sourceMap.has(entry.source)) {
        sourceMap.set(entry.source, []);
      }
      sourceMap.get(entry.source)?.push(entry);
    }
    
    // Analyze each source group
    for (const [source, entries] of sourceMap.entries()) {
      // Check for multiple failed logins
      if (source === "auth" && 
          entries.filter(e => e.action === "login" && e.data?.status === "failed").length >= this.thresholds.multiple_failures) {
        patterns.push("auth:login:failed:multiple");
      }
      
      // Check for malformed database queries
      if (source === "database" && 
          entries.some(e => e.action === "query" && (e.data?.sql?.includes("--") || e.data?.sql?.includes("1=1")))) {
        patterns.push("database:query:malformed");
      }
      
      // Check for unusual network traffic
      if (source === "network" && 
          entries.some(e => e.data?.bytes > this.thresholds.traffic_volume)) {
        patterns.push("network:traffic:unusual_volume");
      }
      
      // Check for unusual destinations
      if (source === "network" && 
          entries.some(e => e.data?.destination && !e.data.destination.match(/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|127\.0\.0\.1)/))) {
        patterns.push("network:traffic:unusual_destination");
      }
      
      // API malformed requests
      if (source === "api" && 
          entries.some(e => e.action === "request" && e.data?.params?.some((p: string) => p.includes("<script>")))) {
        patterns.push("api:request:malformed");
      }
      
      // Port scanning detection
      if (source === "network" && 
          entries.filter(e => e.action === "connection").length > 20) {
        const targetPorts = new Set(entries.map(e => e.data?.port));
        if (targetPorts.size > 10) {
          patterns.push("network:scan:port_sweep");
        }
      }
      
      // Process execution chains
      if (source === "system" && 
          entries.filter(e => e.action === "process_create").length > 3) {
        patterns.push("system:process:unusual_execution");
      }
      
      // File access patterns
      if (source === "system" && 
          entries.filter(e => e.action === "file_access" && e.data?.path?.includes("sensitive")).length > 0) {
        patterns.push("system:file:unauthorized_access");
      }
    }
    
    return patterns;
  }
  
  private generateRecommendations(pattern: string): string[] {
    switch (pattern) {
      case "database:query:malformed":
        return [
          "Implement input validation to prevent SQL injection",
          "Use prepared statements for database queries",
          "Apply least privilege principle to database accounts",
          "Review database access logs for unauthorized access",
          "Implement web application firewall rules to block SQL injection attempts"
        ];
      case "auth:login:failed:multiple":
        return [
          "Implement account lockout policies",
          "Enable multi-factor authentication",
          "Monitor login attempts from unusual locations",
          "Implement CAPTCHA for login attempts after failures",
          "Review user accounts for signs of compromise"
        ];
      case "network:traffic:unusual_volume":
        return [
          "Implement rate limiting",
          "Configure DDoS protection",
          "Set up traffic analysis alerts",
          "Consider CDN services for traffic absorption",
          "Develop an incident response plan for DDoS scenarios"
        ];
      case "network:traffic:unusual_destination":
        return [
          "Investigate potential data exfiltration",
          "Review firewall rules and egress filtering",
          "Monitor for unauthorized connections",
          "Implement DNS filtering for suspicious domains",
          "Analyze endpoint for signs of compromise"
        ];
      case "api:request:malformed":
        return [
          "Implement API request validation",
          "Use content security policies",
          "Sanitize input parameters",
          "Implement rate limiting for API requests",
          "Review application logs for other suspicious activities"
        ];
      case "network:scan:port_sweep":
        return [
          "Investigate source of port scanning activity",
          "Review firewall rules to limit exposed services",
          "Implement network intrusion detection",
          "Consider port knocking for sensitive services",
          "Monitor for follow-up exploitation attempts"
        ];
      case "system:process:unusual_execution":
        return [
          "Investigate unusual process execution chains",
          "Review endpoint security controls",
          "Implement application whitelisting",
          "Consider endpoint detection and response solutions",
          "Analyze system for signs of compromise"
        ];
      default:
        return [
          "Increase logging detail",
          "Review security policies",
          "Perform regular security audits",
          "Implement defense-in-depth security measures",
          "Update incident response procedures"
        ];
    }
  }
  
  // Provide feedback to improve the model
  public provideFeedback(pattern: string, wasAccurate: boolean): void {
    if (this.knownPatterns.has(pattern)) {
      // Update false positive rate
      const currentRate = this.falsePositiveRates.get(pattern) || 0.1;
      const newRate = wasAccurate 
        ? Math.max(currentRate * 0.9, 0.01)  // Reduce false positive rate if accurate
        : Math.min(currentRate * 1.2, 0.5);  // Increase if not accurate
      
      this.falsePositiveRates.set(pattern, newRate);
      
      // Update confidence level
      const currentConfidence = this.knownPatterns.get(pattern) || 0.8;
      const newConfidence = wasAccurate 
        ? Math.min(currentConfidence * 1.05, 0.99)  // Increase confidence if accurate
        : Math.max(currentConfidence * 0.95, 0.6);  // Decrease if not accurate
      
      this.knownPatterns.set(pattern, newConfidence);
    }
  }
  
  // Switch detection model type
  public setDetectionModel(model: DetectionModel): void {
    this.currentModel = model;
    console.log(`Detection model switched to: ${model}`);
  }
}

// Export a singleton instance of the model
export const aiDetectionModel = new AnomalyDetectionModel();

// Generate simulated log entries for testing
export function generateSimulatedLogs(attackType: string, count: number = 10): LogEntry[] {
  const logs: LogEntry[] = [];
  const now = Date.now();
  
  switch (attackType) {
    case "SQL":
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "database",
          action: "query",
          target: "user_table",
          severity: i % 3 === 0 ? "high" : "medium",
          data: { 
            sql: i % 3 === 0 ? "SELECT * FROM users WHERE username='admin' --' AND password='anything'" : "SELECT * FROM users",
            status: i % 3 === 0 ? "error" : "success",
            client_ip: "192.168.1." + (i % 10 + 1),
            query_time: Math.floor(Math.random() * 100) + 20
          }
        });
      }
      break;
      
    case "Brute":
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "auth",
          action: "login",
          target: "admin",
          severity: "medium",
          data: { 
            status: "failed",
            reason: "invalid_password",
            ip: "192.168.1." + (i % 10 + 1),
            attempt_number: i + 1,
            user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          }
        });
      }
      break;
      
    case "DDoS":
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 200,
          source: "network",
          action: "traffic",
          target: "web_server",
          severity: "critical",
          data: { 
            bytes: 250000 + Math.floor(Math.random() * 1000000),
            packets: 1000 + Math.floor(Math.random() * 10000),
            protocol: i % 2 === 0 ? "TCP" : "UDP",
            source_ips: [`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`],
            destination_port: 80
          }
        });
      }
      break;
      
    case "APT":
      const stages = [
        { source: "network", action: "connection", severity: "low", data: { port: 443, protocol: "HTTPS" } },
        { source: "system", action: "process_create", severity: "medium", data: { process: "powershell.exe", args: "-enc Base64EncodedCommand" } },
        { source: "system", action: "file_write", severity: "medium", data: { path: "C:\\Windows\\Temp\\payload.dll" } },
        { source: "system", action: "registry_modification", severity: "high", data: { key: "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" } },
        { source: "network", action: "connection", severity: "high", data: { destination: "command-control-server.com", port: 8443 } }
      ];
      
      for (let i = 0; i < count; i++) {
        const stageIndex = Math.min(i, stages.length - 1);
        const stage = stages[stageIndex];
        
        logs.push({
          timestamp: now - (count - i) * 5000,
          source: stage.source,
          action: stage.action,
          target: "workstation-" + (Math.floor(i / 2) % 5 + 1),
          severity: stage.severity as any,
          data: { ...stage.data, timestamp_local: new Date(now - (count - i) * 5000).toISOString() }
        });
      }
      break;
      
    case "Ransomware":
      const ransomwareStages = [
        { source: "email", action: "attachment_open", severity: "medium", data: { filename: "invoice.doc", has_macro: true } },
        { source: "system", action: "process_create", severity: "high", data: { process: "cmd.exe", parent: "WINWORD.EXE" } },
        { source: "system", action: "file_write", severity: "high", data: { path: "C:\\Users\\Admin\\AppData\\Local\\Temp\\payload.exe" } },
        { source: "system", action: "process_create", severity: "critical", data: { process: "vssadmin.exe", args: "delete shadows /all /quiet" } },
        { source: "system", action: "file_encryption", severity: "critical", data: { files_affected: 1000, extension: ".encrypted" } }
      ];
      
      for (let i = 0; i < count; i++) {
        const stageIndex = Math.min(i, ransomwareStages.length - 1);
        const stage = ransomwareStages[stageIndex];
        
        logs.push({
          timestamp: now - (count - i) * 3000,
          source: stage.source,
          action: stage.action,
          target: "user-workstation",
          severity: stage.severity as any,
          data: { ...stage.data, timestamp_local: new Date(now - (count - i) * 3000).toISOString() }
        });
      }
      break;
      
    default:
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "system",
          action: "event",
          severity: "low",
          data: { 
            type: "unknown",
            severity: "medium",
            details: "Unclassified system activity"
          }
        });
      }
  }
  
  return logs;
}
