import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TerminalSquare, Share2, FileText, ChevronRight, Activity, AlertCircle, CheckCircle2, MoreHorizontal, Download, Search, AlertTriangle, Lock, Eye, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SCENARIOS } from '../data/scenarios';
import type { LogEntry, SystemState, Scenario } from '../types/console';
import { getScenarioSteps } from '../utils/simulation';
import DynamicGraph from '../components/DynamicGraph';

const ConsolePage = () => {
  const { theme } = useTheme();
  const [systemState, setSystemState] = useState<SystemState>('booting');
  const [bootProgress, setBootProgress] = useState(0);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Real-time Stats
  const [stats, setStats] = useState({ nodes: 0, threatScore: 0, consensus: 100 });

  // Boot logic
  useEffect(() => {
    if (systemState === 'booting') {
      const timer = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setSystemState('idle');
              addLog('SYSTEM', 'Kernel ready for input.', 'success');
              addLog('SYSTEM', 'Autonomous aliveness check: All agents online.', 'info');
            }, 800);
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [systemState]);

  // Scroll to bottom of logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = useCallback((agent: LogEntry['agent'], message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      agent,
      message,
      type
    };
    setLogs(prev => [...prev.slice(-49), newLog]);
  }, []);

  const runSimulationSteps = async (scenarioId: string) => {
    const steps = getScenarioSteps(scenarioId);
    let currentStepIndex = 0;

    const executeNextStep = () => {
      if (currentStepIndex >= steps.length) {
        setSystemState('reporting');
        addLog('SYSTEM', 'Intelligence report generation complete.', 'success');
        return;
      }

      const step = steps[currentStepIndex];

      setTimeout(() => {
        addLog(step.agent, step.message, step.type);
        if (step.statusUpdate) {
          setStats(prev => ({
            ...prev,
            nodes: step.statusUpdate?.nodes ?? prev.nodes,
            threatScore: step.statusUpdate?.threatScore ?? prev.threatScore
          }));
        }
        currentStepIndex++;
        executeNextStep();
      }, step.delay);
    };

    executeNextStep();
  };

  const startSimulation = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setSystemState('parsing');
    setLogs([]);
    setStats({ nodes: 5, threatScore: 0, consensus: 100 });
    addLog('SYSTEM', `Loading reality seed: ${scenario.filename}`, 'info');

    // Switch to Simulating after parsing
    setTimeout(() => {
      setSystemState('simulating');
      runSimulationSteps(scenario.id);
    }, 2500);
  };

  if (systemState === 'booting') {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center text-accent p-6 font-mono overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative"
        >
          <div className="flex items-center gap-4 mb-8">
             <div className="relative">
                <Shield className="w-12 h-12 animate-pulse" />
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
             </div>
             <div>
                <div className="text-2xl font-black tracking-tighter text-white">AEGIS CORE</div>
                <div className="text-[10px] font-bold tracking-[0.2em] opacity-50 uppercase text-accent">Autonomous Intelligence OS</div>
             </div>
          </div>

          <div className="space-y-1 mb-8 text-[10px] font-bold uppercase tracking-widest opacity-40 h-24 overflow-hidden">
            <div className="animate-pulse">{'>'} Initializing kernel modules...</div>
            {bootProgress > 20 && <div>{'>'} Loading security protocols... [OK]</div>}
            {bootProgress > 40 && <div>{'>'} Calibrating agent swarm... [OK]</div>}
            {bootProgress > 60 && <div>{'>'} Establishing neural mesh... [OK]</div>}
            {bootProgress > 80 && <div>{'>'} Loading graph SSOT... [OK]</div>}
            {bootProgress >= 100 && <div>{'>'} SYSTEM READINESS: 100%</div>}
          </div>

          <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent glow-accent"
              initial={{ width: 0 }}
              animate={{ width: `${bootProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="text-accent">Initializing System</span>
            <span className="opacity-50 text-white">v2.1.0-STABLE</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col overflow-hidden bg-background-light dark:bg-background text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 ${theme}`}>
      {/* OS Header */}
      <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0 bg-white/40 dark:bg-black/40 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded shadow-lg shadow-accent/20 flex items-center justify-center">
              <Shield className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-sm tracking-tight">AEGIS</span>
          </div>

          <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="flex items-center gap-5">
            <StatusIndicator label="Network" status="Secure" />
            <StatusIndicator label="Agents" status="Online" color="text-accent" />
            <StatusIndicator label="Uptime" status="99.99%" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Live Connection
          </div>
          <a href="/" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500">
             <MoreHorizontal size={18} />
          </a>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Workflow Engine */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 p-4 bg-gray-50/30 dark:bg-black/10">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-3">
            Workflow Process
          </div>
          <div className="space-y-1">
            <WorkflowStep number="01" title="Data Ingestion" active={systemState === 'parsing'} done={systemState !== 'idle' && systemState !== 'parsing'} />
            <WorkflowStep number="02" title="Graph Mapping" active={systemState === 'simulating'} done={systemState === 'reporting'} />
            <WorkflowStep number="03" title="Agent Activation" active={systemState === 'simulating'} />
            <WorkflowStep number="04" title="Simulation" active={systemState === 'simulating'} />
            <WorkflowStep number="05" title="Intelligence Report" active={systemState === 'reporting'} />
          </div>

          <div className="mt-auto p-5 rounded-2xl bg-accent/5 border border-accent/10 glow-accent overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
               <Activity size={40} />
            </div>
            <div className="flex items-center gap-2 text-accent mb-3">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">System Load</span>
            </div>
            <div className="text-3xl font-black mb-1">0.8<span className="text-sm opacity-50 ml-1">ms</span></div>
            <div className="text-[10px] text-gray-500 font-bold">Lateny — [OPTIMIZED]</div>
          </div>
        </div>

        {/* Center - Central Intelligence Layer (Graph Area) */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="flex-1 flex relative overflow-hidden">
             <AnimatePresence mode="wait">
                {systemState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex items-center justify-center text-center p-8"
                  >
                    <div>
                      <div className="relative mb-6 inline-block">
                         <Share2 className="w-20 h-20 text-accent/20 animate-pulse-slow" />
                         <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                      </div>
                      <h2 className="text-2xl font-black mb-3 text-gray-900 dark:text-white">Awaiting Seed Extraction</h2>
                      <p className="text-gray-500 max-w-sm mx-auto font-medium">
                        The AEGIS OS is idle. Select a reality seed from the right panel to begin
                        the autonomous intelligence parsing flow.
                      </p>
                    </div>
                  </motion.div>
                )}

                {systemState === 'parsing' && (
                  <motion.div
                    key="parsing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-center p-8"
                  >
                    <div>
                      <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 mx-auto relative overflow-hidden shadow-inner shadow-accent/20">
                         <motion.div
                            className="absolute inset-0 bg-accent/10"
                            initial={{ top: '100%' }}
                            animate={{ top: '0%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                         />
                         <Search className="text-accent w-10 h-10 relative z-10" />
                      </div>
                      <h3 className="text-xl font-black mb-2 uppercase tracking-widest text-gray-900 dark:text-white">Parsing Intelligence Flow</h3>
                      <p className="text-sm text-gray-500 font-bold opacity-70">Extracting entities and identifying lateral movement vectors...</p>
                    </div>
                  </motion.div>
                )}

                {(systemState === 'simulating' || systemState === 'reporting') && (
                   <motion.div
                      key="active-graph"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0"
                   >
                      <DynamicGraph systemState={systemState} scenarioId={activeScenario?.id} />
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Intelligence Report Modal Overlay */}
             <AnimatePresence>
                {systemState === 'reporting' && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-background-light/50 dark:bg-background/50 backdrop-blur-sm z-40 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="max-w-4xl w-full p-8 rounded-[2.5rem] bg-white dark:bg-card border-2 border-accent/30 shadow-2xl relative overflow-hidden my-auto"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                          <Shield size={300} />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/40">
                                <CheckCircle2 className="text-white w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">Intelligence Report</h3>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Projection v2.1 — SUCCESS</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                             <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest">
                                ID: ${activeScenario?.id?.toUpperCase()}
                             </div>
                             <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                Status: Neutralized
                             </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                          <ReportMetricCard
                             icon={<AlertTriangle className="text-red-500" />}
                             label="Alert Noise Reduction"
                             value="↓ 82%"
                             subtext="Compared to legacy SIEM"
                          />
                          <ReportMetricCard
                             icon={<Zap className="text-yellow-500" />}
                             label="Response Velocity"
                             value="↑ 94%"
                             subtext="Autonomous mitigation"
                          />
                          <ReportMetricCard
                             icon={<Shield className="text-accent" />}
                             label="Detection Fidelity"
                             value="99.8%"
                             subtext="Zero false positives"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <Eye size={12} />
                                Intelligence Insights
                              </h4>
                              <div className="space-y-4">
                                 <InsightItem
                                    text={activeScenario?.id === 'ransomware' ? "Lateral movement detected via SMBv1. Origin: Subnet-B / Terminal-14." :
                                          activeScenario?.id === 'login-anomaly' ? "Distributed credential stuffing detected across 14 geographic zones." :
                                          "Staging API egress pattern matches data exfiltration profile X-91."}
                                 />
                                 <InsightItem
                                    text={activeScenario?.id === 'ransomware' ? "Shadow copies deleted by adversary. Recovery procedures simulated." :
                                          activeScenario?.id === 'login-anomaly' ? "High-privilege account 'admin_root' target identified in pre-stage." :
                                          "Lateral pivot attempted from Staging to Production Database. Blocked."}
                                 />
                              </div>
                           </div>
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <Lock size={12} />
                                Autonomous Actions
                              </h4>
                              <div className="space-y-3">
                                 <ActionBadge text="Dynamic Micro-segmentation" />
                                 <ActionBadge text="API Access Key Rotation" />
                                 <ActionBadge text="Global MFA Enforcement" />
                                 <ActionBadge text="Zero-Trust Policy Update" />
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="flex-1 py-5 bg-accent hover:bg-accent/90 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 glow-accent shadow-xl shadow-accent/30 group">
                              <Download size={20} />
                              EXPORT DECISION REPORT
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                              onClick={() => {
                                setSystemState('idle');
                                setActiveScenario(null);
                                setStats({ nodes: 0, threatScore: 0, consensus: 100 });
                              }}
                              className="px-8 py-5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-2xl font-black transition-all text-gray-600 dark:text-gray-400"
                          >
                              NEW SIMULATION
                          </button>
                        </div>
                    </motion.div>
                  </div>
                )}
             </AnimatePresence>
          </div>

          {/* Bottom Feed - Unified Command Feed */}
          <div className="h-72 border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-black/20 backdrop-blur-xl flex flex-col shrink-0">
            <div className="h-10 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between">
               <div className="flex items-center gap-3">
                  <TerminalSquare className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Unified Command Feed</span>
               </div>
               <div className="flex gap-6">
                  <AgentStatusDot label="HUNT" active={systemState !== 'idle'} />
                  <AgentStatusDot label="INTEL" active={systemState !== 'idle'} />
                  <AgentStatusDot label="RED" active={systemState === 'simulating'} />
                  <AgentStatusDot label="BLUE" active={systemState === 'simulating'} />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 font-mono text-[11px] space-y-2 selection:bg-accent/30">
              {logs.map(log => (
                <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-gray-400 dark:text-gray-600 shrink-0">[${log.timestamp}]</span>
                  <span className={`font-bold uppercase w-14 shrink-0 ${
                    log.agent === 'SYSTEM' ? 'text-gray-500' :
                    log.agent === 'HUNT' ? 'text-green-500' :
                    log.agent === 'INTEL' ? 'text-blue-500' :
                    log.agent === 'RED' ? 'text-red-500' :
                    'text-accent'
                  }`}>
                    ${log.agent}:
                  </span>
                  <span className={`flex-1 ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div className="flex gap-3 text-accent items-center">
                 <span className="w-2 h-4 bg-accent animate-matrix-blink shadow-[0_0_8px_rgba(79,156,249,0.8)]" />
              </div>
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Selection */}
        <div className="w-80 border-l border-gray-200 dark:border-gray-800 flex flex-col shrink-0 p-6 bg-gray-50/30 dark:bg-black/10 overflow-y-auto overflow-x-hidden">
           <div className="mb-10">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-2">
                Intelligence Parsing Flow
              </div>
              <div className="space-y-4">
                 {SCENARIOS.map(scenario => (
                    <SeedCard
                       key={scenario.id}
                       title={scenario.title}
                       filename={scenario.filename}
                       description={scenario.description}
                       icon={
                         scenario.id === 'ransomware' ? <AlertCircle className="text-red-500" /> :
                         scenario.id === 'login-anomaly' ? <Activity className="text-yellow-500" /> :
                         <Share2 className="text-blue-500" />
                       }
                       active={activeScenario?.id === scenario.id}
                       disabled={systemState !== 'idle'}
                       onClick={() => startSimulation(scenario)}
                    />
                 ))}
              </div>
           </div>

           <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-2">
                System Intelligence
              </div>
              <div className="space-y-4">
                 <StatRow label="Active Nodes" value={stats.nodes.toString()} />
                 <StatRow
                    label="Threat Score"
                    value={stats.threatScore.toFixed(1)}
                    color={stats.threatScore > 50 ? 'text-red-500' : stats.threatScore > 20 ? 'text-yellow-500' : 'text-green-500'}
                  />
                 <StatRow label="Agent Consensus" value="${stats.consensus}%" />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const StatusIndicator = ({ label, status, color = "text-gray-500" }: { label: string, status: string, color?: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}:</span>
    <span className={`text-[10px] font-bold uppercase tracking-widest ${color}`}>{status}</span>
  </div>
);

const WorkflowStep = ({ number, title, active = false, done = false }: { number: string, title: string, active?: boolean, done?: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
    active ? 'bg-accent/10 text-accent glow-accent' :
    done ? 'text-green-500 opacity-80' :
    'text-gray-500 opacity-40 hover:opacity-100 hover:bg-white/5'
  }`}>
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
      active ? 'border-accent/30 bg-accent/20' :
      done ? 'border-green-500/30 bg-green-500/10' :
      'border-gray-200 dark:border-gray-800'
    }`}>
      {done ? <CheckCircle2 size={12} /> : number}
    </div>
    <span className="text-xs font-black tracking-tight">{title}</span>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse ml-auto" />}
  </div>
);

const SeedCard = ({ title, filename, description, icon, active, disabled, onClick }: { title: string, filename: string, description: string, icon: React.ReactNode, active?: boolean, disabled?: boolean, onClick: () => void }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`w-full p-5 rounded-3xl border text-left transition-all duration-300 group shadow-sm ${
      active ? 'border-accent bg-accent/5 glow-accent' :
      disabled ? 'border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed' :
      'border-gray-200 dark:border-gray-800 bg-white dark:bg-card hover:border-accent/30 hover:shadow-xl'
    }`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/10 flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-black truncate leading-tight mb-1">{title}</div>
        <div className="text-[10px] text-gray-500 flex items-center gap-1 font-bold">
          <FileText size={10} />
          {filename}
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">{description}</p>
    <div className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
      active ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-gray-100 dark:bg-white/5 group-hover:bg-accent group-hover:text-white'
    }`}>
      {active ? 'Simulation Active' : 'Run Simulation'}
      {!active && <ChevronRight size={12} />}
    </div>
  </button>
);

const StatRow = ({ label, value, color = "" }: { label: string, value: string, color?: string }) => (
  <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-black/20 flex justify-between items-center shadow-inner">
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
    <span className={`text-sm font-black tracking-tight ${color}`}>{value}</span>
  </div>
);

const ReportMetricCard = ({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext: string }) => (
  <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group hover:border-accent/30 transition-colors">
    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
       {icon}
    </div>
    <div className="text-3xl font-black mb-2 text-gray-900 dark:text-white">{value}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</div>
    <div className="text-[9px] font-bold text-gray-500 uppercase">{subtext}</div>
  </div>
);

const InsightItem = ({ text }: { text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{text}</p>
  </div>
);

const ActionBadge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest w-full">
     <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
     {text}
  </div>
);

const AgentStatusDot = ({ label, active = false }: { label: string, active?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${active ? 'bg-accent animate-pulse shadow-[0_0_8px_rgba(79,156,249,0.8)]' : 'bg-gray-700'}`} />
    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${active ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default ConsolePage;
