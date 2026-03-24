export type SystemState = 'idle' | 'booting' | 'parsing' | 'simulating' | 'reporting';

export interface LogEntry {
  id: string;
  timestamp: string;
  agent: 'SYSTEM' | 'HUNT' | 'INTEL' | 'RED' | 'BLUE' | 'COMPLY';
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface NodeData {
  id: string;
  label: string;
  type: 'server' | 'user' | 'api' | 'threat' | 'vulnerability';
  status: 'active' | 'compromised' | 'secure' | 'warning';
  metadata?: Record<string, any>;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  filename: string;
  description: string;
}
