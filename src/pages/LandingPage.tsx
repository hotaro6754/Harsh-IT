import React from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { useTheme } from '../context/ThemeContext';
import { Shield, Brain, Cpu, Activity, Network, FileCheck, Github, Sun, Moon, ArrowRight, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const githubStats = useGitHubStats('hotaro6754/AEGIS');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen selection:bg-accent/30">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-background/70 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center glow-accent"
          >
            <Shield className="text-white w-5 h-5" />
          </motion.div>
          <span className="font-bold text-xl tracking-tight">AEGIS</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold hover:text-accent transition-colors">Features</a>
          <a href="#vision" className="text-sm font-semibold hover:text-accent transition-colors">Vision</a>
          <a href="#roadmap" className="text-sm font-semibold hover:text-accent transition-colors">Roadmap</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a
            href="/console"
            className="hidden sm:block bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full text-sm font-bold transition-all glow-accent shadow-lg shadow-accent/20"
          >
            Launch Console
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[13px] font-bold mb-10"
          >
            <Zap size={14} className="fill-accent" />
            V2.1 PRE-RELEASE: AUTONOMOUS INTELLIGENCE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] dark:text-white text-gray-900"
          >
            PREDICT. PROTECT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-indigo-500">
              PREVAIL.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="h-8 mb-10"
          >
             <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl mx-auto">
                AEGIS is the first <span className="text-gray-900 dark:text-gray-100 font-bold">Autonomous Operating System</span> designed to rehearse threat trajectories before they manifest.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
          >
            <a href="/console" className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent/90 text-white rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 group glow-accent shadow-2xl shadow-accent/40">
              OPEN CONSOLE
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/hotaro6754/AEGIS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-card border border-gray-200 dark:border-gray-800 hover:border-accent/50 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-4 shadow-sm"
            >
              <Github className="w-6 h-6" />
              <div className="text-left leading-none">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Source Code</div>
                <div className="text-base">{githubStats.stars.toLocaleString()} Stars</div>
              </div>
            </a>
          </motion.div>

          {/* Metrics Teaser */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-y border-gray-200 dark:border-gray-800 py-12"
          >
             <MetricItem label="Alert Noise" value="↓ 82%" />
             <MetricItem label="Response Time" value="↓ 94%" />
             <MetricItem label="Detection Accuracy" value="↑ 99.8%" />
             <MetricItem label="Deployment" value="< 5 MIN" />
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Built for the Swarm.</h2>
          <p className="text-gray-500 max-w-xl text-lg font-medium">
            The AEGIS architecture is built from the ground up to support multi-agent orchestration and high-fidelity simulations.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {/* Main Feature - Large */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            icon={<Brain size={40} className="text-accent" />}
            title="The AI Brain"
            description="Our proprietary on-premise LLM fine-tuned specifically for threat intelligence. Unlike traditional models, it understands the nuances of enterprise infrastructure and attack vectors without ever sending your data to the cloud."
            tag="Proprietary Model"
            visual={<div className="mt-8 flex gap-2 overflow-hidden opacity-50"><div className="w-1/3 h-40 bg-accent/20 rounded-t-xl" /><div className="w-1/3 h-60 bg-accent/40 rounded-t-xl" /><div className="w-1/3 h-20 bg-accent/10 rounded-t-xl" /></div>}
          />

          <BentoCard
            icon={<Cpu size={32} className="text-blue-400" />}
            title="Autonomous Agents"
            description="Specially trained agents (HUNT, RED, BLUE) that coordinate to secure your environment."
            tag="Multi-Agent"
          />

          <BentoCard
            icon={<Activity size={32} className="text-emerald-400" />}
            title="Risk Projection"
            description="Predict vulnerabilities by simulating thousands of attack paths every hour."
            tag="Simulation"
          />

          <BentoCard
            icon={<Network size={32} className="text-purple-400" />}
            title="Graph Intelligence"
            description="Visual relationship mapping that identifies hidden lateral movement paths."
            tag="SSOT"
          />

          <BentoCard
            className="md:col-span-2"
            icon={<FileCheck size={32} className="text-orange-400" />}
            title="Continuous Compliance"
            description="AEGIS monitors your infrastructure 24/7 to ensure you remain compliant with SOC2, HIPAA, and ISO standards automatically."
            tag="Automation"
            visual={<div className="absolute right-0 bottom-0 w-1/2 p-6 flex justify-end"><Shield className="w-32 h-32 text-accent/5" /></div>}
          />
        </motion.div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 px-6 relative overflow-hidden bg-gray-50 dark:bg-black/20">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
               <h2 className="text-5xl font-black mb-8 leading-tight">Making Prediction <br />of Anything Possible.</h2>
               <div className="space-y-6 text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  <p>
                    AEGIS is a next-generation AI prediction engine powered by multi-agent technology.
                    We extract seed information from the real world—breaking news, policy drafts, and system logs—to construct a high-fidelity digital mirror.
                  </p>
                  <p>
                    The future is rehearsed in our digital sandbox so that decisions emerge victorious after hundreds of simulations. Whether at the macro level as a decision lab or at the micro level as a creative security sandbox, we bring every "what if" to life.
                  </p>
               </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
               <VisionStat icon={<Globe size={24} />} title="Macro Scale" text="Rehearsal lab for decision makers." />
               <VisionStat icon={<Lock size={24} />} title="Zero Risk" text="Stress-test policies at zero risk." />
               <VisionStat icon={<Cpu size={24} />} title="Creative" text="Sandbox for complex simulations." />
               <VisionStat icon={<Activity size={24} />} title="Real-time" text="Dynamic time-series updates." />
            </div>
         </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-32 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">The AEGIS Roadmap</h2>
            <p className="text-gray-500 font-medium">Our journey to building the ultimate AI Operating System.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <RoadmapStep phase="PHASE 01" title="COMPLY" description="Automated audit preparation and drift detection for Indian SaaS startups." active />
            <RoadmapStep phase="PHASE 02" title="INTEL" description="RAG-powered threat intelligence and real-time NVD feed integration." />
            <RoadmapStep phase="PHASE 03" title="BLUE" description="Autonomous incident response and self-healing infrastructure layers." />
            <RoadmapStep phase="PHASE 04" title="OS" description="The full AEGIS Swarm Intelligence OS for global enterprise defense." />
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto bg-accent rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden glow-accent shadow-2xl shadow-accent/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to project the future?</h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto mb-12">
               Stop reacting to threats. Start predicting them. Launch the AEGIS console now and experience the demo.
            </p>
            <a href="/console" className="inline-flex items-center gap-3 bg-white text-accent hover:bg-white/90 px-10 py-5 rounded-2xl text-xl font-black transition-all">
               LAUNCH CONSOLE
               <ArrowRight className="w-6 h-6" />
            </a>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 opacity-50">
              <Shield className="w-5 h-5" />
              <span className="font-bold">AEGIS OS</span>
           </div>
           <div className="flex gap-8 text-sm font-bold text-gray-500">
              <a href="#" className="hover:text-accent transition-colors">Documentation</a>
              <a href="#" className="hover:text-accent transition-colors">Twitter</a>
              <a href="https://github.com/hotaro6754/AEGIS" className="hover:text-accent transition-colors">GitHub</a>
           </div>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
             © 2025 HARSHITH GANGARAJU. ALL RIGHTS RESERVED.
           </p>
        </div>
      </footer>
    </div>
  );
};

const BentoCard = ({ icon, title, description, className = "", tag, visual }: { icon: React.ReactNode, title: string, description: string, className?: string, tag?: string, visual?: React.ReactNode }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -5 }}
    className={`p-8 rounded-3xl bg-white dark:bg-card border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-accent/30 transition-all duration-300 relative overflow-hidden flex flex-col ${className}`}
  >
    {tag && (
      <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-[0.2em] text-accent/50">
        {tag}
      </div>
    )}
    <div className="mb-8">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-black mb-4 dark:text-white text-gray-900">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
        {description}
      </p>
    </div>
    {visual}
  </motion.div>
);

const MetricItem = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-black mb-2 dark:text-white text-gray-900">{value}</div>
    <div className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">{label}</div>
  </div>
);

const VisionStat = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
       {icon}
    </div>
    <h4 className="font-black text-lg mb-2">{title}</h4>
    <p className="text-sm text-gray-500 font-medium">{text}</p>
  </div>
);

const RoadmapStep = ({ phase, title, description, active = false }: { phase: string, title: string, description: string, active?: boolean }) => (
  <div className={`p-8 rounded-2xl border transition-all ${active ? 'border-accent bg-accent/5 glow-accent' : 'border-gray-200 dark:border-gray-800'}`}>
    <div className={`text-[10px] font-black tracking-[0.2em] mb-4 ${active ? 'text-accent' : 'text-gray-400'}`}>{phase}</div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-sm text-gray-500 font-medium leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
