import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Users, 
  Activity,
  CheckCircle,
  XCircle,
  Eye,
  Zap,
  TrendingUp,
  BarChart3,
  Globe
} from "lucide-react";

interface SecurityAlert {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Investigating' | 'Contained' | 'Resolved' | 'False Positive';
  assignee?: string;
  source: string;
  timestamp: string;
  description: string;
  affectedAssets: string[];
  mitreAttack?: string[];
  playbook?: string;
  sla: {
    timeToAcknowledge: number; // minutes
    timeToResolve: number; // hours
    acknowledged: boolean;
    acknowledgedAt?: string;
  };
}

interface SOCMetrics {
  alertsToday: number;
  alertsResolved: number;
  meanTimeToDetect: number; // minutes
  meanTimeToRespond: number; // minutes
  falsePositiveRate: number; // percentage
  analystWorkload: number; // alerts per analyst
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  uptime: number; // percentage
}

const SecurityOperationsCenter = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [metrics, setMetrics] = useState<SOCMetrics | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading SOC data
    setTimeout(() => {
      setAlerts(generateMockAlerts());
      setMetrics(generateMockMetrics());
      setLoading(false);
    }, 1000);
  }, []);

  const generateMockAlerts = (): SecurityAlert[] => {
    return [
      {
        id: '1',
        title: 'Suspicious PowerShell Execution',
        severity: 'High',
        status: 'Investigating',
        assignee: 'Sarah Chen',
        source: 'EDR',
        timestamp: '2024-01-20T14:30:00Z',
        description: 'Encoded PowerShell command detected on workstation WS-001 attempting to download external payload.',
        affectedAssets: ['WS-001', 'Domain Controller'],
        mitreAttack: ['T1059.001', 'T1105'],
        playbook: 'Malicious PowerShell Response',
        sla: {
          timeToAcknowledge: 15,
          timeToResolve: 4,
          acknowledged: true,
          acknowledgedAt: '2024-01-20T14:32:00Z'
        }
      },
      {
        id: '2',
        title: 'Multiple Failed Login Attempts',
        severity: 'Medium',
        status: 'New',
        source: 'SIEM',
        timestamp: '2024-01-20T14:25:00Z',
        description: 'Brute force attack detected against admin accounts from external IP 203.0.113.42.',
        affectedAssets: ['Authentication Server', 'VPN Gateway'],
        mitreAttack: ['T1110.001'],
        playbook: 'Brute Force Response',
        sla: {
          timeToAcknowledge: 30,
          timeToResolve: 2,
          acknowledged: false
        }
      },
      {
        id: '3',
        title: 'Unusual Data Exfiltration',
        severity: 'Critical',
        status: 'Contained',
        assignee: 'Mike Rodriguez',
        source: 'DLP',
        timestamp: '2024-01-20T13:45:00Z',
        description: 'Large volume of sensitive data transferred to external cloud storage service.',
        affectedAssets: ['File Server', 'Database Server'],
        mitreAttack: ['T1041', 'T1567.002'],
        playbook: 'Data Exfiltration Response',
        sla: {
          timeToAcknowledge: 5,
          timeToResolve: 1,
          acknowledged: true,
          acknowledgedAt: '2024-01-20T13:47:00Z'
        }
      },
      {
        id: '4',
        title: 'Malware Detection',
        severity: 'High',
        status: 'Resolved',
        assignee: 'Alex Thompson',
        source: 'Antivirus',
        timestamp: '2024-01-20T12:15:00Z',
        description: 'Trojan.Win32.Agent detected and quarantined on user workstation.',
        affectedAssets: ['WS-042'],
        mitreAttack: ['T1204.002'],
        playbook: 'Malware Incident Response',
        sla: {
          timeToAcknowledge: 10,
          timeToResolve: 3,
          acknowledged: true,
          acknowledgedAt: '2024-01-20T12:17:00Z'
        }
      }
    ];
  };

  const generateMockMetrics = (): SOCMetrics => {
    return {
      alertsToday: 247,
      alertsResolved: 189,
      meanTimeToDetect: 12,
      meanTimeToRespond: 28,
      falsePositiveRate: 15.2,
      analystWorkload: 31,
      threatLevel: 'Medium',
      uptime: 99.7
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-900/30 text-red-400 border-red-600/40';
      case 'High': return 'bg-orange-900/30 text-orange-400 border-orange-600/40';
      case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-600/40';
      case 'Low': return 'bg-blue-900/30 text-blue-400 border-blue-600/40';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-600/40';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-900/30 text-blue-400';
      case 'Investigating': return 'bg-yellow-900/30 text-yellow-400';
      case 'Contained': return 'bg-orange-900/30 text-orange-400';
      case 'Resolved': return 'bg-green-900/30 text-green-400';
      case 'False Positive': return 'bg-gray-900/30 text-gray-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <AlertTriangle className="w-4 h-4" />;
      case 'Investigating': return <Eye className="w-4 h-4" />;
      case 'Contained': return <Shield className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      case 'False Positive': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            sla: { 
              ...alert.sla, 
              acknowledged: true, 
              acknowledgedAt: new Date().toISOString() 
            } 
          }
        : alert
    ));
  };

  const updateAlertStatus = (alertId: string, newStatus: SecurityAlert['status']) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            Security Operations Center
          </h2>
          <p className="text-gray-400">24/7 security monitoring and incident response</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${metrics?.threatLevel === 'Critical' ? 'bg-red-900/30 text-red-400' : 
                            metrics?.threatLevel === 'High' ? 'bg-orange-900/30 text-orange-400' :
                            metrics?.threatLevel === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-green-900/30 text-green-400'}`}>
            Threat Level: {metrics?.threatLevel}
          </Badge>
        </div>
      </div>

      {/* SOC Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Alerts Today</p>
              <p className="text-2xl font-bold">{metrics?.alertsToday}</p>
              <p className="text-xs text-green-400">+12% from yesterday</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">MTTD</p>
              <p className="text-2xl font-bold">{metrics?.meanTimeToDetect}m</p>
              <p className="text-xs text-green-400">-3m from last week</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">MTTR</p>
              <p className="text-2xl font-bold">{metrics?.meanTimeToRespond}m</p>
              <p className="text-xs text-red-400">+5m from last week</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">SOC Uptime</p>
              <p className="text-2xl font-bold">{metrics?.uptime}%</p>
              <p className="text-xs text-green-400">Target: 99.9%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="metrics">Performance</TabsTrigger>
          <TabsTrigger value="analysts">Analysts</TabsTrigger>
          <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Security Alerts Queue
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700/30 ${
                      selectedAlert?.id === alert.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {getStatusIcon(alert.status)}
                          <span className="ml-1">{alert.status}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">{alert.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{alert.source}</span>
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    
                    {!alert.sla.acknowledged && (
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            acknowledgeAlert(alert.id);
                          }}
                          className="text-xs"
                        >
                          Acknowledge
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {selectedAlert && (
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Alert Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedAlert.title}</h4>
                    <p className="text-sm text-gray-400">{selectedAlert.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Severity</p>
                      <Badge className={getSeverityColor(selectedAlert.severity)}>
                        {selectedAlert.severity}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Status</p>
                      <Badge className={getStatusColor(selectedAlert.status)}>
                        {selectedAlert.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">Affected Assets</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlert.affectedAssets.map((asset, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedAlert.mitreAttack && (
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-2">MITRE ATT&CK</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlert.mitreAttack.map((technique, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">SLA Status</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Time to Acknowledge</span>
                        <span className={selectedAlert.sla.acknowledged ? 'text-green-400' : 'text-red-400'}>
                          {selectedAlert.sla.acknowledged ? 'Met' : `${selectedAlert.sla.timeToAcknowledge}m remaining`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time to Resolve</span>
                        <span>{selectedAlert.sla.timeToResolve}h target</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateAlertStatus(selectedAlert.id, 'Investigating')}
                      disabled={selectedAlert.status === 'Investigating'}
                    >
                      Investigate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateAlertStatus(selectedAlert.id, 'False Positive')}
                    >
                      Mark False Positive
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Alert Resolution Rate</span>
                    <span className="text-sm font-medium">
                      {metrics && Math.round((metrics.alertsResolved / metrics.alertsToday) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={metrics ? (metrics.alertsResolved / metrics.alertsToday) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">False Positive Rate</span>
                    <span className="text-sm font-medium">{metrics?.falsePositiveRate}%</span>
                  </div>
                  <Progress value={metrics?.falsePositiveRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">SOC Uptime</span>
                    <span className="text-sm font-medium">{metrics?.uptime}%</span>
                  </div>
                  <Progress value={metrics?.uptime} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Trend Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Alert Volume Trend</span>
                  <span className="text-sm text-green-400">↗ +12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Detection Accuracy</span>
                  <span className="text-sm text-green-400">↗ +5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm text-red-400">↗ +8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Analyst Efficiency</span>
                  <span className="text-sm text-green-400">↗ +3%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysts">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              SOC Analysts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    SC
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Chen</h4>
                    <p className="text-sm text-gray-400">Senior Analyst</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Alerts:</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolved Today:</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-900/30 text-green-400">Online</Badge>
                  </div>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    MR
                  </div>
                  <div>
                    <h4 className="font-medium">Mike Rodriguez</h4>
                    <p className="text-sm text-gray-400">Analyst</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Alerts:</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolved Today:</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-900/30 text-green-400">Online</Badge>
                  </div>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                    AT
                  </div>
                  <div>
                    <h4 className="font-medium">Alex Thompson</h4>
                    <p className="text-sm text-gray-400">Junior Analyst</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Alerts:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolved Today:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-yellow-900/30 text-yellow-400">Break</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="playbooks">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Response Playbooks
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Malware Incident Response</h4>
                  <Badge className="bg-blue-900/30 text-blue-400">Active</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Standard operating procedure for malware detection and containment.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Last Updated: Jan 15, 2024</span>
                  <span>Used: 47 times this month</span>
                  <span>Success Rate: 94%</span>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Data Exfiltration Response</h4>
                  <Badge className="bg-blue-900/30 text-blue-400">Active</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Procedures for responding to suspected data theft incidents.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Last Updated: Jan 10, 2024</span>
                  <span>Used: 12 times this month</span>
                  <span>Success Rate: 89%</span>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Brute Force Response</h4>
                  <Badge className="bg-blue-900/30 text-blue-400">Active</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Response procedures for credential brute force attacks.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Last Updated: Jan 8, 2024</span>
                  <span>Used: 31 times this month</span>
                  <span>Success Rate: 97%</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityOperationsCenter;