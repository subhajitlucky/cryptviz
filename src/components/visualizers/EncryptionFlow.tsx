import React, { useState } from 'react';
import { generateKeyPair } from '../../utils/crypto';
import type { KeyPair } from '../../utils/crypto';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, Lock, Unlock, PenTool, ArrowRight, FileText, RefreshCw, ChevronRight, Check, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

// --- Components ---

const ActorCard = ({ name, role, keys, onGenKeys, isActive }: { name: string, role: string, keys: KeyPair | null, onGenKeys: () => void, isActive: boolean }) => (
  <div className={clsx(
    "p-4 rounded-xl border-2 transition-all duration-300",
    isActive 
        ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-lg scale-105 z-10" 
        : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60"
  )}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={clsx("p-1.5 rounded-full", isActive ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500")}>
          <User className="w-4 h-4" />
        </div>
        <div>
           <h3 className="font-bold text-sm text-slate-900 dark:text-white">{name}</h3>
           <span className="text-[10px] text-slate-500 uppercase font-bold">{role}</span>
        </div>
      </div>
      <button onClick={onGenKeys} className="text-[10px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-bold transition-colors">
          {keys ? 'Reset' : 'Keys'}
      </button>
    </div>

    {keys && (
        <div className="grid grid-cols-2 gap-2">
            <div className="p-1.5 bg-rose-50 dark:bg-rose-900/20 rounded border border-rose-100 dark:border-rose-900/30">
                <div className="flex items-center gap-1 mb-0.5">
                    <Key className="w-2.5 h-2.5 text-rose-500" />
                    <span className="text-[8px] font-bold text-rose-700 dark:text-rose-400 uppercase">Private</span>
                </div>
                <div className="text-[9px] text-rose-600 dark:text-rose-300 truncate font-mono">{keys.privateKeyHex}</div>
            </div>
            <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/30">
                 <div className="flex items-center gap-1 mb-0.5">
                    <Unlock className="w-2.5 h-2.5 text-emerald-500" />
                    <span className="text-[8px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Public</span>
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-300 truncate font-mono">{keys.publicKeyHex}</div>
            </div>
        </div>
    )}
  </div>
);

// --- Main Visualizer ---

export const EncryptionFlow: React.FC = () => {
  const [aliceKeys, setAliceKeys] = useState<KeyPair | null>(null);
  const [bobKeys, setBobKeys] = useState<KeyPair | null>(null);
  
  // Stages: 0: Draft, 1: Signing, 2: Encrypting, 3: Transmitting, 4: Decrypting, 5: Verifying
  const [stage, setStage] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenKeys = async (actor: 'alice' | 'bob') => {
      const k = await generateKeyPair();
      if (actor === 'alice') setAliceKeys(k);
      else setBobKeys(k);
  };

  const stages = [
    { id: 0, label: "Draft", desc: "Alice writes the raw message." },
    { id: 1, label: "Sign", desc: "Alice uses HER PRIVATE KEY to seal the document." },
    { id: 2, label: "Encrypt", desc: "Alice uses BOB'S PUBLIC KEY to lock the package." },
    { id: 3, label: "Transmit", desc: "The encrypted package is sent over the network." },
    { id: 4, label: "Decrypt", desc: "Bob uses HIS PRIVATE KEY to open the lock." },
    { id: 5, label: "Verify", desc: "Bob uses ALICE'S PUBLIC KEY to check the seal." },
  ];

  const triggerNext = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
          setStage(prev => (prev + 1) % 6);
          setIsAnimating(false);
      }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-4">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-200">The Secure Messaging Pipeline</h4>
                  <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80 leading-relaxed">
                      Combining <strong>Signatures</strong> and <strong>Encryption</strong> creates a tamper-proof, private communication channel.
                  </p>
              </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-4">
              <div className="p-2 bg-emerald-600 rounded-lg text-white font-bold text-xs uppercase">
                  Logic
              </div>
              <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200">User-Specific Ownership</h4>
                  <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 leading-relaxed">
                      Every pair is unique. <strong>What the Public Key locks, only the owner's Private Key can unlock.</strong> What the <strong>Private Key</strong> locks, anyone can verify with that owner's <strong>Public Key</strong>.
                  </p>
              </div>
          </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left: Actors */}
          <div className="lg:col-span-1 space-y-4">
              <ActorCard 
                name="Alice" 
                role="Sender" 
                keys={aliceKeys} 
                onGenKeys={() => handleGenKeys('alice')} 
                isActive={stage <= 2}
              />
              <div className="h-12 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 lg:rotate-0" />
              </div>
              <ActorCard 
                name="Bob" 
                role="Receiver" 
                keys={bobKeys} 
                onGenKeys={() => handleGenKeys('bob')} 
                isActive={stage >= 4}
              />
          </div>

          {/* Center: The Document Visualizer */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm min-h-[500px] flex flex-col relative overflow-hidden transition-colors duration-300">
             
             {/* Progress Bar */}
             <div className="flex justify-between mb-8 relative px-4">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-0 -translate-y-1/2" />
                 {stages.map((s, idx) => (
                     <div key={s.id} className="relative z-10 flex flex-col items-center">
                         <div className={clsx(
                             "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                             stage === idx ? "bg-indigo-600 border-indigo-600 text-white scale-125" :
                             stage > idx ? "bg-emerald-500 border-emerald-500 text-white" :
                             "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400"
                         )}>
                             {stage > idx ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                         </div>
                         <span className={clsx(
                             "text-[10px] font-bold mt-2 uppercase tracking-wider",
                             stage === idx ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                         )}>{s.label}</span>
                     </div>
                 ))}
             </div>

             {/* The Content */}
             <div className="flex-grow flex flex-col items-center justify-center">
                
                {/* Visual Representation of the Package */}
                <div className="relative">
                    
                    {/* THE DOCUMENT (msg.txt) */}
                    <motion.div 
                        animate={{ 
                            scale: stage === 3 ? 0.6 : 1,
                            opacity: (stage === 3) ? 0.5 : 1,
                            filter: stage === 2 || stage === 3 ? "blur(4px)" : "blur(0px)"
                        }}
                        className={clsx(
                            "w-48 h-64 rounded-lg shadow-xl border-2 flex flex-col p-4 transition-colors duration-500",
                            "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                             <FileText className="w-5 h-5 text-slate-400" />
                             <span className="text-[10px] font-bold text-slate-500 font-mono">msg.txt</span>
                        </div>
                        
                        <div className="space-y-3 flex-grow">
                            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-3/4"></div>
                            <div className="pt-4 text-center">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">"Hello Bob!"</p>
                            </div>
                        </div>

                        {/* Signature Seal Visual */}
                        <AnimatePresence>
                            {(stage === 1 || stage === 2 || stage === 5) && (
                                <motion.div 
                                    initial={{ scale: 2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="mt-auto flex flex-col items-center border-t border-rose-100 dark:border-rose-900/50 pt-2"
                                >
                                    <PenTool className="w-5 h-5 text-rose-500 mb-1" />
                                    <div className="text-[8px] font-bold text-rose-600 uppercase tracking-widest">Alice's Seal</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* ENCRYPTION VAULT (Stage 2 & 3) */}
                    <AnimatePresence>
                        {(stage === 2 || stage === 3) && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 1.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 -m-4 bg-slate-900/90 dark:bg-slate-950/90 rounded-2xl border-4 border-emerald-500 flex flex-col items-center justify-center shadow-2xl z-20 backdrop-blur-sm"
                            >
                                <Lock className="w-16 h-16 text-emerald-500 mb-2 animate-pulse" />
                                <div className="text-white font-black text-xl tracking-tighter uppercase">Encrypted</div>
                                <div className="text-emerald-500 text-[10px] font-mono mt-1">Locked with Bob's PubKey</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* TRANSMISSION EFFECT (Stage 3) */}
                    <AnimatePresence>
                        {stage === 3 && (
                            <motion.div 
                                animate={{ x: [0, 10, -10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="absolute top-1/2 left-full ml-8 flex flex-col items-center gap-2"
                            >
                                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Transmitting...</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FINAL VERIFICATION STAMP */}
                    <AnimatePresence>
                        {stage === 5 && (
                            <motion.div 
                                initial={{ scale: 5, opacity: 0, rotate: 20 }}
                                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                            >
                                <div className="border-8 border-emerald-500/50 bg-white/40 backdrop-blur-sm text-emerald-600 px-6 py-3 rounded-2xl font-black text-3xl uppercase tracking-tighter shadow-2xl">
                                    Authentic
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Explanation Text */}
                <div className="mt-12 text-center max-w-md mx-auto">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-2">{stages[stage].label} Phase</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {stages[stage].desc}
                    </p>
                </div>

                {/* Action Trigger */}
                <div className="mt-8 flex flex-col items-center gap-4">
                     {(!aliceKeys || !bobKeys) ? (
                         <p className="text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/30 px-4 py-2 rounded-full border border-rose-200 dark:border-rose-900">
                             Wait! Generate keys for both Alice & Bob first.
                         </p>
                     ) : (
                        <button 
                            onClick={triggerNext}
                            disabled={isAnimating}
                            className={clsx(
                                "group px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-xl",
                                stage === 5 ? "bg-slate-800 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            )}
                        >
                            {isAnimating ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : stage === 5 ? (
                                <RefreshCw className="w-5 h-5" />
                            ) : (
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            )}
                            {stage === 5 ? "Restart Simulation" : `Execute: ${stages[stage].label}`}
                        </button>
                     )}
                </div>
             </div>

          </div>
      </div>
    </div>
  );
};