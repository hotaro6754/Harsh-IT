import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Server, Users, Shield, Zap, AlertTriangle, Cpu } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'server' | 'user' | 'api' | 'threat' | 'vulnerability';
  label: string;
  status: 'active' | 'compromised' | 'secure' | 'warning';
}

interface Edge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  status: 'normal' | 'threat';
}

interface DynamicGraphProps {
  systemState: 'idle' | 'parsing' | 'simulating' | 'reporting';
  scenarioId?: string;
}

const DynamicGraph: React.FC<DynamicGraphProps> = ({ systemState, scenarioId }) => {
  const nodes: Node[] = useMemo(() => {
    const baseNodes: Node[] = [
      { id: 'gw', x: 50, y: 50, type: 'server', label: 'Gateway', status: 'active' },
      { id: 'db', x: 20, y: 80, type: 'server', label: 'Database', status: 'secure' },
      { id: 'app', x: 80, y: 80, type: 'server', label: 'App Server', status: 'active' },
      { id: 'user1', x: 10, y: 20, type: 'user', label: 'Admin', status: 'active' },
      { id: 'user2', x: 90, y: 20, type: 'user', label: 'DevOps', status: 'active' },
    ];

    if (systemState === 'idle') return baseNodes;

    if (scenarioId === 'ransomware') {
       return [
         ...baseNodes.map(n => n.id === 'db' ? { ...n, status: 'warning' as const } : n),
         { id: 'threat1', x: 50, y: 85, type: 'threat', label: 'Ryuk.exe', status: 'compromised' as const },
       ];
    }

    if (scenarioId === 'login-anomaly') {
       return [
         ...baseNodes.map(n => n.id === 'user1' ? { ...n, status: 'compromised' as const } : n),
         { id: 'v1', x: 30, y: 30, type: 'vulnerability', label: 'Brute Force', status: 'warning' as const },
       ];
    }

    if (scenarioId === 'data-leak') {
       return [
         ...baseNodes.map(n => n.id === 'gw' ? { ...n, status: 'warning' as const } : n),
         { id: 'api1', x: 70, y: 40, type: 'api', label: '/v1/export', status: 'compromised' as const },
       ];
    }

    return baseNodes;
  }, [systemState, scenarioId]);

  const edges: Edge[] = useMemo(() => {
    const baseEdges: Edge[] = [
      { id: 'e1', source: 'gw', target: 'app', status: 'normal' },
      { id: 'e2', source: 'app', target: 'db', status: 'normal' },
      { id: 'e3', source: 'user1', target: 'gw', status: 'normal' },
      { id: 'e4', source: 'user2', target: 'gw', status: 'normal' },
    ];

    if (systemState === 'simulating' || systemState === 'reporting') {
      if (scenarioId === 'ransomware') {
        return [
          ...baseEdges,
          { id: 'e-threat', source: 'threat1', target: 'db', animated: true, status: 'threat' as const }
        ];
      }
      if (scenarioId === 'login-anomaly') {
        return [
          ...baseEdges,
          { id: 'e-threat', source: 'v1', target: 'user1', animated: true, status: 'threat' as const }
        ];
      }
    }

    return baseEdges;
  }, [systemState, scenarioId]);

  const getNodeIcon = (type: Node['type'], status: Node['status']) => {
    const colorClass = status === 'compromised' ? 'text-red-500' : status === 'warning' ? 'text-yellow-500' : 'text-accent';
    switch (type) {
      case 'server': return <Server className={colorClass} size={20} />;
      case 'user': return <Users className={colorClass} size={20} />;
      case 'api': return <Zap className={colorClass} size={20} />;
      case 'threat': return <AlertTriangle className={colorClass} size={20} />;
      case 'vulnerability': return <Cpu className={colorClass} size={20} />;
      default: return <Shield className={colorClass} size={20} />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-12">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-gray-300 dark:text-gray-700" />
          </marker>
        </defs>
        {edges.map(edge => {
          const source = nodes.find(n => n.id === edge.source);
          const target = nodes.find(n => n.id === edge.target);
          if (!source || !target) return null;

          return (
            <motion.line
              key={edge.id}
              x1={`${source.x}%`}
              y1={`${source.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="currentColor"
              strokeWidth={edge.status === 'threat' ? 2 : 1}
              className={`${edge.status === 'threat' ? 'text-red-500/50' : 'text-gray-200 dark:text-gray-800'} ${edge.animated ? 'stroke-[3]' : ''}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                strokeDasharray: edge.animated ? "5,5" : "none",
                strokeDashoffset: edge.animated ? [0, -20] : 0
              }}
              transition={{
                pathLength: { duration: 1 },
                opacity: { duration: 0.5 },
                strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" }
              }}
            />
          );
        })}
      </svg>

      {nodes.map(node => (
        <motion.div
          key={node.id}
          layoutId={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute cursor-pointer group"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-card border-2 flex items-center justify-center transition-all duration-300 relative ${
            node.status === 'compromised' ? 'border-red-500 glow-red shadow-lg shadow-red-500/20' :
            node.status === 'warning' ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' :
            'border-gray-100 dark:border-gray-800 group-hover:border-accent shadow-sm'
          }`}>
             {node.status === 'compromised' && (
                <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-2xl" />
             )}
             {getNodeIcon(node.type, node.status)}
          </div>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
               {node.label}
            </div>
          </div>

          {/* Tooltip on Hover */}
          <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl shadow-2xl min-w-[140px]">
                <div className="text-[10px] font-black uppercase text-accent mb-1">{node.type}</div>
                <div className="text-xs font-bold mb-2">{node.label}</div>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'active' || node.status === 'secure' ? 'bg-green-500' :
                      node.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                   }`} />
                   <span className="text-[10px] font-bold uppercase">{node.status}</span>
                </div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DynamicGraph;
