import type { LogEntry } from '../types/console';

export interface SimulationStep {
  agent: LogEntry['agent'];
  message: string;
  delay: number;
  type?: LogEntry['type'];
  statusUpdate?: {
    nodes?: number;
    threatScore?: number;
  };
}

export const getScenarioSteps = (scenarioId: string): SimulationStep[] => {
  const commonHeader: SimulationStep[] = [
    { agent: 'INTEL', message: 'Reality seed extraction initiated...', delay: 500 },
    { agent: 'INTEL', message: 'Parsing PDF metadata and structural elements...', delay: 1200 },
    { agent: 'SYSTEM', message: 'Memory injection: Group persona data loaded.', delay: 2000 },
  ];

  const scenarios: Record<string, SimulationStep[]> = {
    ransomware: [
      ...commonHeader,
      { agent: 'HUNT', message: 'Analyzing encryption entropy patterns.', delay: 1000, statusUpdate: { nodes: 12 } },
      { agent: 'RED', message: 'Simulating Ryuk lateral movement via SMB.', delay: 2500, statusUpdate: { threatScore: 45 } },
      { agent: 'HUNT', message: 'Vulnerability detected: Unpatched CVE-2020-0796 on Subnet-B.', delay: 1500, type: 'error' },
      { agent: 'BLUE', message: 'Deploying autonomous patch and firewall rule #441.', delay: 2000, type: 'success', statusUpdate: { threatScore: 12 } },
      { agent: 'COMPLY', message: 'Incident log stored for SOC2 Audit-Trail.', delay: 1000 },
    ],
    'login-anomaly': [
      ...commonHeader,
      { agent: 'HUNT', message: 'Scanning authentication logs for geo-distributed anomalies.', delay: 1000, statusUpdate: { nodes: 85 } },
      { agent: 'INTEL', message: 'IP 185.12.4.1 correlated with known adversarial C2.', delay: 2000, type: 'warning', statusUpdate: { threatScore: 68 } },
      { agent: 'RED', message: 'Simulating brute-force trajectory on High-Privilege accounts.', delay: 1500 },
      { agent: 'BLUE', message: 'Enforcing global MFA challenge and rotating session tokens.', delay: 2500, type: 'success', statusUpdate: { threatScore: 5 } },
      { agent: 'COMPLY', message: 'Access Control drift corrected. Score: 100%', delay: 1200, statusUpdate: { nodes: 124 } },
    ],
    'data-leak': [
      ...commonHeader,
      { agent: 'INTEL', message: 'Monitoring staging environment egress traffic.', delay: 1000, statusUpdate: { nodes: 42 } },
      { agent: 'HUNT', message: 'Large data blob detected leaving API endpoint /v1/export.', delay: 2000, type: 'warning', statusUpdate: { threatScore: 72 } },
      { agent: 'RED', message: 'Simulating staging-to-production lateral pivot.', delay: 1800 },
      { agent: 'BLUE', message: 'Kill-switch activated for affected API keys. Traffic rerouted.', delay: 2200, type: 'success', statusUpdate: { threatScore: 8 } },
      { agent: 'COMPLY', message: 'Data protection policy audit completed.', delay: 1500 },
    ],
  };

  return scenarios[scenarioId] || [];
};
