import React from 'react';
import { Lock, Hash, Shield, Terminal, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-100/40 via-white/0 to-white/0 dark:from-brand-900/20 dark:via-slate-950/0 dark:to-slate-950/0 animate-pulse-slow" />
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative group p-8 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-sm overflow-hidden hover:border-brand-500/50 transition-colors duration-500 shadow-sm hover:shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-6 group-hover:bg-brand-500/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  </motion.div>
);

export const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundGrid />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 backdrop-blur-md text-slate-600 dark:text-slate-300 text-sm font-medium mb-8 hover:border-brand-500/50 transition-colors cursor-default shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>v1.0 Simulation Engine Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white"
        >
          Cryptography
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 dark:from-brand-300 dark:via-brand-400 dark:to-indigo-400">
             Visualized.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Stop memorizing formulas. Start visualizing the mechanics of modern security.
          Interactive simulations for <span className="text-slate-900 dark:text-slate-200 font-medium">Hashing</span>, <span className="text-slate-900 dark:text-slate-200 font-medium">Signatures</span>, and <span className="text-slate-900 dark:text-slate-200 font-medium">Blockchain</span>.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/learn" className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-2 shadow-sm shadow-indigo-500/10 hover:shadow-md">
            <span>Start Learning Path</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/playground" className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-2 shadow-sm">
            <Terminal className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            <span>Open Sandbox</span>
          </Link>
        </motion.div>

        {/* Abstract Visual Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-20 left-10 opacity-20 hidden lg:block pointer-events-none">
          <Hash className="w-32 h-32 text-brand-500 rotate-12" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 opacity-20 hidden lg:block pointer-events-none">
          <Shield className="w-40 h-40 text-indigo-500 -rotate-12" />
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            delay={0.2}
            icon={Hash}
            title="Interactive Hashing"
            desc="Type in real-time and watch how the Avalanche Effect transforms your data into a unique digital fingerprint using SHA-256."
          />
          <FeatureCard 
            delay={0.4}
            icon={Shield}
            title="Digital Signatures"
            desc="Generate real ECDSA key pairs. Sign messages, tamper with them, and verify the cryptographic proof of authenticity."
          />
          <FeatureCard 
            delay={0.6}
            icon={Lock}
            title="Secure by Design"
            desc="Learn the primitives that power Bitcoin, Ethereum, and HTTPS. Understand why math is harder to break than trust."
          />
        </div>
      </section>

    </div>
  );
};
