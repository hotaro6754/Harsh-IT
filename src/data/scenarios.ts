import type { Scenario } from '../types/console';

export const SCENARIOS: Scenario[] = [
  {
    id: 'ransomware',
    title: 'Ransomware Incident',
    filename: 'ransomware_report_q4.pdf',
    description: 'Project encryption trajectories and identify initial access vectors for recent Ryuk variant.'
  },
  {
    id: 'login-anomaly',
    title: 'Suspicious Login',
    filename: 'auth_logs_anomaly.pdf',
    description: 'Analyze brute-force patterns across distributed endpoints and predict lateral movement targets.'
  },
  {
    id: 'data-leak',
    title: 'Data Leak Investigation',
    filename: 'exfil_analysis.pdf',
    description: 'Map sensitive data flows and identify unauthorized API egress points in the staging environment.'
  }
];
