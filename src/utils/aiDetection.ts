
// AI-based detection system inspired by AI-Hunter and DeepLog
export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number;
  detectedPattern?: string;
  associatedTechnique?: string;
  recommendations: string[];
}

export interface LogEntry {
  timestamp: number;
  source: string;
  action: string;
  target?: string;
  data?: any;
}

// Simulated ML model for detecting anomalies
class AnomalyDetectionModel {
  private knownPatterns: Map<string, number>;
  private thresholds: { [key: string]: number };
  private techniques: Map<string, string[]>;
  
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
    ]);
    
    this.thresholds = {
      "confidence": 0.65,
      "multiple_failures": 3,
      "traffic_volume": 100000,
    };
    
    this.techniques = new Map([
      ["database:query:malformed", ["T1190", "SQL Injection"]],
      ["auth:login:failed:multiple", ["T1110", "Brute Force"]],
      ["network:traffic:unusual_destination", ["T1048", "Exfiltration"]],
      ["network:traffic:unusual_volume", ["T1498", "DDoS"]],
      ["system:process:unusual_execution", ["T1059", "Command Execution"]],
      ["api:request:malformed", ["T1190", "Injection"]],
      ["system:file:unauthorized_access", ["T1083", "File Access"]],
    ]);
  }
  
  public detectAnomaly(logEntries: LogEntry[]): AnomalyDetectionResult {
    if (logEntries.length === 0) {
      return {
        isAnomaly: false,
        confidence: 0,
        recommendations: ["No log entries to analyze"]
      };
    }
    
    // Extract patterns from log entries
    const patterns = this.extractPatterns(logEntries);
    
    // Find the highest confidence match
    let highestConfidence = 0;
    let detectedPattern = "";
    let associatedTechnique = "";
    
    for (const pattern of patterns) {
      if (this.knownPatterns.has(pattern)) {
        const confidence = this.knownPatterns.get(pattern) || 0;
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          detectedPattern = pattern;
          associatedTechnique = this.techniques.get(pattern)?.[0] || "";
        }
      }
    }
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(detectedPattern);
    
    return {
      isAnomaly: highestConfidence > this.thresholds.confidence,
      confidence: highestConfidence,
      detectedPattern: detectedPattern || undefined,
      associatedTechnique: associatedTechnique || undefined,
      recommendations
    };
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
    }
    
    return patterns;
  }
  
  private generateRecommendations(pattern: string): string[] {
    switch (pattern) {
      case "database:query:malformed":
        return [
          "Implement input validation to prevent SQL injection",
          "Use prepared statements for database queries",
          "Apply least privilege principle to database accounts"
        ];
      case "auth:login:failed:multiple":
        return [
          "Implement account lockout policies",
          "Enable multi-factor authentication",
          "Monitor login attempts from unusual locations"
        ];
      case "network:traffic:unusual_volume":
        return [
          "Implement rate limiting",
          "Configure DDoS protection",
          "Set up traffic analysis alerts"
        ];
      case "network:traffic:unusual_destination":
        return [
          "Investigate potential data exfiltration",
          "Review firewall rules and egress filtering",
          "Monitor for unauthorized connections"
        ];
      case "api:request:malformed":
        return [
          "Implement API request validation",
          "Use content security policies",
          "Sanitize input parameters"
        ];
      default:
        return [
          "Increase logging detail",
          "Review security policies",
          "Perform regular security audits"
        ];
    }
  }
}

// Export a singleton instance of the model
export const aiDetectionModel = new AnomalyDetectionModel();

// Generate simulated log entries for testing
export function generateSimulatedLogs(attackType: string, count: number = 10): LogEntry[] {
  const logs: LogEntry[] = [];
  const now = Date.now();
  
  switch (attackType) {
    case "SQL Injection":
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "database",
          action: "query",
          target: "user_table",
          data: { 
            sql: i % 3 === 0 ? "SELECT * FROM users WHERE username='admin' --' AND password='anything'" : "SELECT * FROM users",
            status: i % 3 === 0 ? "error" : "success"
          }
        });
      }
      break;
      
    case "Brute Force":
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "auth",
          action: "login",
          target: "admin",
          data: { 
            status: "failed",
            reason: "invalid_password",
            ip: "192.168.1." + (i % 10 + 1)
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
          data: { 
            bytes: 250000 + Math.floor(Math.random() * 1000000),
            packets: 1000 + Math.floor(Math.random() * 10000),
            protocol: i % 2 === 0 ? "TCP" : "UDP"
          }
        });
      }
      break;
      
    default:
      for (let i = 0; i < count; i++) {
        logs.push({
          timestamp: now - (count - i) * 1000,
          source: "system",
          action: "event",
          data: { 
            type: "unknown",
            severity: "medium"
          }
        });
      }
  }
  
  return logs;
}
