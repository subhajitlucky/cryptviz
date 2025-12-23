import React, { useState, useRef } from 'react';
import { generateKeyPair, signMessage, verifySignature } from '../../utils/crypto';
import type { KeyPair } from '../../utils/crypto';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, PenTool, ShieldCheck, ArrowRight, Unlock, FileText, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

// --- Components ---

const ActorCard = ({ name, isSelf, keys, onGenKeys }: { name: string, isSelf: boolean, keys: KeyPair | null, onGenKeys: () => void }) => (
  <div className={clsx(
    "p-6 rounded-2xl border-2 transition-colors relative",
    isSelf 
      ? "bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900" 
      : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
  )}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={clsx("p-2 rounded-full", isSelf ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500")}>
          <User className="w-5 h-5" />
        </div>
        <div>
           <h3 className="font-bold text-lg text-slate-900 dark:text-white">{name}</h3>
           <span className="text-xs text-slate-500 uppercase font-bold">{isSelf ? "Sender" : "Receiver"}</span>
        </div>
      </div>
      {isSelf && (
          <button onClick={onGenKeys} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">
              {keys ? 'Reset Identity' : 'Create Wallet'}
          </button>
      )}
    </div>

    {/* Key Display */}
    {keys ? (
        <div className="space-y-3">
            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded border border-rose-100 dark:border-rose-900/30 relative group">
                <div className="flex items-center gap-2 mb-1">
                    <Key className="w-3 h-3 text-rose-500" />
                    <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Private Key (Signing)</span>
                </div>
                <div className="font-mono text-[10px] text-rose-800 dark:text-rose-300 break-all truncate group-hover:whitespace-normal group-hover:absolute group-hover:z-50 group-hover:bg-rose-50 dark:group-hover:bg-slate-900 group-hover:p-2 group-hover:shadow-xl group-hover:border-rose-200 group-hover:w-full group-hover:left-0">
                    {keys.privateKeyHex}
                </div>
            </div>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/30 relative group">
                 <div className="flex items-center gap-2 mb-1">
                    <Unlock className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Public Key (Verifying)</span>
                </div>
                <div className="font-mono text-[10px] text-emerald-800 dark:text-emerald-300 break-all truncate group-hover:whitespace-normal group-hover:absolute group-hover:z-50 group-hover:bg-emerald-50 dark:group-hover:bg-slate-900 group-hover:p-2 group-hover:shadow-xl group-hover:border-emerald-200 group-hover:w-full group-hover:left-0">
                    {keys.publicKeyHex}
                </div>
            </div>
        </div>
    ) : (
        <div className="h-24 flex items-center justify-center text-slate-400 text-xs italic border-2 border-dashed border-slate-200 dark:border-slate-800 rounded">
            No keys generated
        </div>
    )}
  </div>
);

// --- Main Visualizer ---

export const TransactionFlow: React.FC = () => {
  const [aliceKeys, setAliceKeys] = useState<KeyPair | null>(null);
  const [message, setMessage] = useState("Pay Bob 50 BTC");
  const [signature, setSignature] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [step, setStep] = useState(1); // 1: Setup, 2: Sign, 3: Verify

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGenKeys = async () => {
      const k = await generateKeyPair();
      setAliceKeys(k);
      setSignature(null);
      setVerifyResult(null);
      setStep(2);
  };

  const handleSign = async () => {
      if (!aliceKeys) return;
      setIsSigning(true);
      
      setTimeout(async () => {
          const sig = await signMessage(message, aliceKeys.privateKey);
          setSignature(sig);
          setIsSigning(false);
          setStep(3);
      }, 1500); // Animation delay
  };

  const handleVerify = async () => {
      if (!aliceKeys || !signature) return;
      setIsVerifying(true);
      setTimeout(async () => {
          const isValid = await verifySignature(message, signature, aliceKeys.publicKey);
          setVerifyResult(isValid);
          setIsVerifying(false);
      }, 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8" ref={containerRef}>
      
      {/* Introduction Note */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
         <strong>Scenario:</strong> Alice wants to send money to Bob. She needs to prove the transaction is really from her without giving Bob her password (Private Key).
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          
          {/* Connecting Arrow (Desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-700">
                <ArrowRight className="w-6 h-6 text-slate-400" />
              </div>
          </div>

          {/* ALICE (SENDER) */}
          <div className="space-y-6">
              <ActorCard name="Alice" isSelf={true} keys={aliceKeys} onGenKeys={handleGenKeys} />
              
              <div className={clsx("transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-50 blur-sm pointer-events-none")}>
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-indigo-500" />
                        Step 1: Signing
                    </h4>

                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message (Transaction)</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-20 p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-sm resize-none mb-4 focus:ring-2 focus:ring-indigo-500"
                    />

                    <button 
                        onClick={handleSign}
                        disabled={isSigning || !!signature}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSigning ? (
                            <><RefreshCw className="w-4 h-4 animate-spin" /> Signing...</>
                        ) : signature ? (
                            <><CheckCircle className="w-4 h-4" /> Signed</>
                        ) : (
                            <><PenTool className="w-4 h-4" /> Sign with Private Key</>
                        )}
                    </button>

                    {/* Animation Layer for Signing */}
                    <AnimatePresence>
                        {isSigning && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="w-8 h-8 text-slate-400" />
                                        <span className="text-[10px] font-bold">Message</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-300">+</span>
                                    <div className="flex flex-col items-center gap-2">
                                        <Key className="w-8 h-8 text-rose-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-rose-500">Priv Key</span>
                                    </div>
                                </div>
                                <div className="w-12 h-1 bg-slate-200 rounded overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-indigo-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 font-mono">Calculating Hash...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </div>
              </div>
          </div>

          {/* BOB (RECEIVER) */}
          <div className="space-y-6">
               {/* Bob doesn't generate keys in this flow, he just receives */}
              <div className="p-6 rounded-2xl border-2 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Bob</h3>
                        <span className="text-xs text-slate-500 uppercase font-bold">Receiver</span>
                    </div>
                </div>
                <div className="text-xs text-slate-500 italic">
                    Bob automatically has a copy of Alice's <strong>Public Key</strong> because it's public on the network.
                </div>
              </div>

              <div className={clsx("transition-all duration-500", signature ? "opacity-100" : "opacity-50 blur-sm pointer-events-none")}>
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Step 2: Verification
                    </h4>
                    
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 mb-4">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Received Signature</div>
                        <div className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 break-all h-12 overflow-hidden">
                            {signature || "Waiting for Alice..."}
                        </div>
                    </div>

                    <button 
                        onClick={handleVerify}
                        className={clsx(
                            "w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                            verifyResult === true ? "bg-emerald-600 text-white" :
                            verifyResult === false ? "bg-rose-600 text-white" :
                            "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                        )}
                    >
                        {isVerifying ? (
                            <><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</>
                        ) : verifyResult === true ? (
                            <><CheckCircle className="w-4 h-4" /> Valid Signature</>
                        ) : verifyResult === false ? (
                            <><XCircle className="w-4 h-4" /> Invalid Signature</>
                        ) : (
                            <><ShieldCheck className="w-4 h-4" /> Verify with Public Key</>
                        )}
                    </button>

                    {/* Animation Layer for Verification */}
                    <AnimatePresence>
                        {isVerifying && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="w-8 h-8 text-slate-400" />
                                        <span className="text-[10px] font-bold">Msg</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-300">+</span>
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="w-8 h-8 text-indigo-500" />
                                        <span className="text-[10px] font-bold text-indigo-500">Sig</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-300">vs</span>
                                    <div className="flex flex-col items-center gap-2">
                                        <Unlock className="w-8 h-8 text-emerald-500 animate-bounce" />
                                        <span className="text-[10px] font-bold text-emerald-500">Pub Key</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 font-mono">Checking mathematics...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </div>
              </div>
          </div>

      </div>
    </div>
  );
};