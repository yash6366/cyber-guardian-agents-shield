
import { v4 as uuidv4 } from 'uuid';
// Based on MITRE ATT&CK framework techniques
export const attackScenarios = [
    {
        id: uuidv4(),
        name: 'SQL Injection Campaign',
        description: 'A sophisticated SQL injection attack targeting the database server to extract sensitive information.',
        complexity: 'Medium',
        targetSystems: [
            'Database'
        ],
        steps: [
            {
                id: uuidv4(),
                name: 'Reconnaissance',
                description: 'Attacker scans for web forms and input fields connected to databases',
                technique: 'T1595',
                duration: 3000,
                detectionDifficulty: 4
            },
            {
                id: uuidv4(),
                name: 'Vulnerability Scanning',
                description: 'Attacker identifies potential SQL injection points',
                technique: 'T1590',
                duration: 2500,
                detectionDifficulty: 5,
                prerequisites: [
                    'Reconnaissance'
                ]
            },
            {
                id: uuidv4(),
                name: 'Exploit SQL Injection',
                description: 'Attacker inserts malicious SQL commands into input fields',
                technique: 'T1190',
                targetComponent: 'Database',
                duration: 2000,
                detectionDifficulty: 7,
                prerequisites: [
                    'Vulnerability Scanning'
                ]
            },
            {
                id: uuidv4(),
                name: 'Data Exfiltration',
                description: 'Attacker extracts sensitive data from database',
                technique: 'T1030',
                targetComponent: 'Database',
                duration: 4000,
                detectionDifficulty: 8,
                prerequisites: [
                    'Exploit SQL Injection'
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Advanced Persistent Threat',
        description: 'A multi-stage attack that establishes persistent access to the network and moves laterally.',
        complexity: 'Critical',
        targetSystems: [
            'Web Server',
            'Auth Server',
            'API Gateway'
        ],
        steps: [
            {
                id: uuidv4(),
                name: 'Phishing Campaign',
                description: 'Targeted phishing emails sent to employees',
                technique: 'T1566',
                duration: 3000,
                detectionDifficulty: 6
            },
            {
                id: uuidv4(),
                name: 'Initial Access',
                description: 'Exploitation of vulnerable web application',
                technique: 'T1190',
                targetComponent: 'Web Server',
                duration: 2500,
                detectionDifficulty: 7,
                prerequisites: [
                    'Phishing Campaign'
                ]
            },
            {
                id: uuidv4(),
                name: 'Credential Access',
                description: 'Attacker steals authentication credentials',
                technique: 'T1110',
                targetComponent: 'Auth Server',
                duration: 3500,
                detectionDifficulty: 8,
                prerequisites: [
                    'Initial Access'
                ]
            },
            {
                id: uuidv4(),
                name: 'Lateral Movement',
                description: 'Attacker moves laterally to other systems',
                technique: 'T1021',
                duration: 4000,
                detectionDifficulty: 9,
                prerequisites: [
                    'Credential Access'
                ]
            },
            {
                id: uuidv4(),
                name: 'Data Collection',
                description: 'Attacker harvests sensitive information',
                technique: 'T1119',
                targetComponent: 'API Gateway',
                duration: 5000,
                detectionDifficulty: 8,
                prerequisites: [
                    'Lateral Movement'
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'DDoS Attack',
        description: 'Distributed Denial of Service attack targeting network infrastructure',
        complexity: 'High',
        targetSystems: [
            'Web Server',
            'CDN'
        ],
        steps: [
            {
                id: uuidv4(),
                name: 'Botnet Preparation',
                description: 'Attacker prepares network of compromised systems',
                technique: 'T1498',
                duration: 2000,
                detectionDifficulty: 5
            },
            {
                id: uuidv4(),
                name: 'Resource Exhaustion',
                description: 'Massive traffic sent to exhaust server resources',
                technique: 'T1499',
                targetComponent: 'CDN',
                duration: 3000,
                detectionDifficulty: 6,
                prerequisites: [
                    'Botnet Preparation'
                ]
            },
            {
                id: uuidv4(),
                name: 'Service Disruption',
                description: 'Services become unavailable due to overwhelming traffic',
                technique: 'T1498',
                targetComponent: 'Web Server',
                duration: 4000,
                detectionDifficulty: 7,
                prerequisites: [
                    'Resource Exhaustion'
                ]
            }
        ]
    }
];

export function getRandomAttackScenario() {
    return attackScenarios[Math.floor(Math.random() * attackScenarios.length)];
}

export function getScenarioByName(name) {
    return attackScenarios.find((scenario) => scenario.name.includes(name));
}
