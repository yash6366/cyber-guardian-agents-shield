import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Database,
  MapPin,
  Clock,
  Users,
  Target,
  Zap
} from "lucide-react";

interface ThreatIntelData {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  source: string;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  iocs: {
    type: 'ip' | 'domain' | 'hash' | 'url';
    value: string;
    malicious: boolean;
  }[];
  geolocation: {
    country: string;
    region: string;
    coordinates: [number, number];
  };
  attackVectors: string[];
  mitreAttack: string[];
  description: string;
}

const ThreatIntelligence = () => {
  const [threatData, setThreatData] = useState<ThreatIntelData[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatIntelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading threat intelligence data
    setTimeout(() => {
      setThreatData(generateMockThreatData());
      setLoading(false);
    }, 1500);
  }, []);

  const generateMockThreatData = (): ThreatIntelData[] => {
    return [
      {
        id: '1',
        title: 'APT29 Infrastructure Expansion',
        severity: 'Critical',
        category: 'Advanced Persistent Threat',
        source: 'MISP Feed',
        confidence: 95,
        firstSeen: '2024-01-15T08:30:00Z',
        lastSeen: '2024-01-20T14:22:00Z',
        iocs: [
          { type: 'ip', value: '185.220.101.42', malicious: true },
          { type: 'domain', value: 'secure-update-ms.com', malicious: true },
          { type: 'hash', value: 'a1b2c3d4e5f6...', malicious: true }
        ],
        geolocation: {
          country: 'Russia',
          region: 'Moscow',
          coordinates: [55.7558, 37.6176]
        },
        attackVectors: ['Spear Phishing', 'Supply Chain', 'Zero-day Exploits'],
        mitreAttack: ['T1566.001', 'T1195.002', 'T1068'],
        description: 'APT29 has expanded their infrastructure with new C2 servers and phishing domains targeting government and healthcare sectors.'
      },
      {
        id: '2',
        title: 'Emotet Banking Trojan Resurgence',
        severity: 'High',
        category: 'Malware',
        source: 'Commercial Feed',
        confidence: 88,
        firstSeen: '2024-01-18T12:15:00Z',
        lastSeen: '2024-01-20T16:45:00Z',
        iocs: [
          { type: 'ip', value: '192.168.100.50', malicious: true },
          { type: 'domain', value: 'banking-security-update.net', malicious: true }
        ],
        geolocation: {
          country: 'Germany',
          region: 'Berlin',
          coordinates: [52.5200, 13.4050]
        },
        attackVectors: ['Email Attachments', 'Malicious Links'],
        mitreAttack: ['T1566.001', 'T1204.002'],
        description: 'New Emotet variant detected with enhanced evasion techniques targeting financial institutions.'
      },
      {
        id: '3',
        title: 'Ransomware-as-a-Service Operation',
        severity: 'High',
        category: 'Ransomware',
        source: 'Dark Web Intelligence',
        confidence: 82,
        firstSeen: '2024-01-19T09:20:00Z',
        lastSeen: '2024-01-20T11:30:00Z',
        iocs: [
          { type: 'domain', value: 'payment-portal-secure.onion', malicious: true },
          { type: 'hash', value: 'f7e8d9c6b5a4...', malicious: true }
        ],
        geolocation: {
          country: 'Unknown',
          region: 'Tor Network',
          coordinates: [0, 0]
        },
        attackVectors: ['RDP Brute Force', 'Vulnerability Exploitation'],
        mitreAttack: ['T1110.001', 'T1190'],
        description: 'New RaaS operation offering advanced encryption and data exfiltration capabilities.'
      }
    ];
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
            <Globe className="w-6 h-6 text-blue-500" />
            Threat Intelligence
          </h2>
          <p className="text-gray-400">Real-time threat intelligence and indicators of compromise</p>
        </div>
        <Button className="flex items-center gap-2">
          <Database className="w-4 h-4" />
          Update Feeds
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="iocs">IOCs</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Threats</p>
                  <p className="text-2xl font-bold text-red-400">247</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">IOCs Today</p>
                  <p className="text-2xl font-bold text-orange-400">1,432</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Threat Actors</p>
                  <p className="text-2xl font-bold text-yellow-400">89</p>
                </div>
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Feed Sources</p>
                  <p className="text-2xl font-bold text-green-400">12</p>
                </div>
                <Database className="w-8 h-8 text-green-500" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Recent Threats
              </h3>
              <div className="space-y-4">
                {threatData.map((threat) => (
                  <div 
                    key={threat.id}
                    className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedThreat(threat)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{threat.title}</h4>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{threat.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {threat.geolocation.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(threat.lastSeen).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {threat.confidence}% confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedThreat && (
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Threat Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedThreat.title}</h4>
                    <p className="text-sm text-gray-400">{selectedThreat.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Severity</p>
                      <Badge className={getSeverityColor(selectedThreat.severity)}>
                        {selectedThreat.severity}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Confidence</p>
                      <p className="text-sm">{selectedThreat.confidence}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">Attack Vectors</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedThreat.attackVectors.map((vector, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {vector}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">MITRE ATT&CK</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedThreat.mitreAttack.map((technique, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">Indicators of Compromise</p>
                    <div className="space-y-2">
                      {selectedThreat.iocs.map((ioc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                          <div>
                            <span className="text-xs text-gray-400 uppercase">{ioc.type}</span>
                            <p className="text-sm font-mono">{ioc.value}</p>
                          </div>
                          <Badge className={ioc.malicious ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}>
                            {ioc.malicious ? 'Malicious' : 'Suspicious'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="iocs">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Indicators of Compromise</h3>
            <div className="space-y-4">
              {threatData.flatMap(threat => threat.iocs).map((ioc, index) => (
                <div key={index} className="flex items-center justify-between border border-gray-700 rounded p-3">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {ioc.type.toUpperCase()}
                    </Badge>
                    <span className="font-mono text-sm">{ioc.value}</span>
                  </div>
                  <Badge className={ioc.malicious ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}>
                    {ioc.malicious ? 'Confirmed Malicious' : 'Suspicious'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2">Operation SolarStorm 2.0</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Sophisticated supply chain attack targeting software vendors and their customers.
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <Badge className="bg-red-900/30 text-red-400">Critical</Badge>
                  <span>First seen: Jan 15, 2024</span>
                  <span>Targets: 47 organizations</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="attribution">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Threat Actor Attribution</h3>
            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">APT29 (Cozy Bear)</h4>
                  <Badge className="bg-red-900/30 text-red-400">Nation State</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Russian state-sponsored group known for sophisticated cyber espionage operations.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Origin:</span> Russia (SVR)
                  </div>
                  <div>
                    <span className="text-gray-400">Active Since:</span> 2008
                  </div>
                  <div>
                    <span className="text-gray-400">Primary Targets:</span> Government, Healthcare
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence:</span> High (95%)
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreatIntelligence;