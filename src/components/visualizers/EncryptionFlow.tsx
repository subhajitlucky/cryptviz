import React, { useState } from 'react';
import { generateKeyPair } from '../../utils/crypto';
import type { KeyPair } from '../../utils/crypto';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, Lock, Unlock, PenTool, ArrowRight, FileText, RefreshCw, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// --- Components ---

const KeyIcon = ({ type, owner, color }: { type: 'public' | 'private', owner: string, color: string }) => (
    <div className={clsx("flex flex-col items-center gap-1", color)}>
        <div className={clsx("p-2 rounded-lg border-2 bg-white dark:bg-slate-900 shadow-sm", color.replace('text-', 'border-'))}>
            {type === 'private' ? <Key className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
        </div>
        <span className="text-[10px] font-black uppercase">{owner} {type === 'private' ? 'Priv' : 'Pub'}</span>
    </div>
);

export const EncryptionFlow: React.FC = () => {
  const [aliceKeys, setAliceKeys] = useState<KeyPair | null>(null);
  const [bobKeys, setBobKeys] = useState<KeyPair | null>(null);
  
  // 0: Setup, 1: Sign, 2: Encrypt, 3: Transmit, 4: Decrypt, 5: Verify
  const [step, setStep] = useState(0);

  const handleGenKeys = async (actor: 'alice' | 'bob') => {
      const k = await generateKeyPair();
      if (actor === 'alice') setAliceKeys(k);
      else setBobKeys(k);
  };

  const nextStep = () => {
      setStep(prev => (prev + 1) % 6);
  };

  const reset = () => {
      setStep(0);
  };

  // Helper to check if keys are ready
  const ready = aliceKeys && bobKeys;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      
      {/* 1. SETUP PHASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ALICE */}
          <div className={clsx(
              "p-6 rounded-3xl border-2 transition-all duration-500",
              step <= 2 ? "bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900 shadow-xl" : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50"
          )}>
              <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center text-rose-600">
                          <User className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">Alice</h3>
                          <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Sender</div>
                      </div>
                  </div>
                  {!aliceKeys && <button onClick={() => handleGenKeys('alice')} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold">Create Identity</button>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center opacity-100">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Signer</div>
                      {aliceKeys ? <KeyIcon type="private" owner="Alice" color="text-rose-500" /> : <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Verifier</div>
                      {aliceKeys ? <KeyIcon type="public" owner="Alice" color="text-rose-500" /> : <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />}
                  </div>
              </div>
          </div>

          {/* BOB */}
          <div className={clsx(
              "p-6 rounded-3xl border-2 transition-all duration-500",
              step >= 3 ? "bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900 shadow-xl" : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50"
          )}>
              <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                          <User className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">Bob</h3>
                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Receiver</div>
                      </div>
                  </div>
                  {!bobKeys && <button onClick={() => handleGenKeys('bob')} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold">Create Identity</button>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Decrypter</div>
                      {bobKeys ? <KeyIcon type="private" owner="Bob" color="text-emerald-500" /> : <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Encrypter</div>
                      {bobKeys ? <KeyIcon type="public" owner="Bob" color="text-emerald-500" /> : <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />}
                  </div>
              </div>
          </div>
      </div>

      {/* 2. THE STAGE */}
      <div className="relative bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Step Indicator */}
          <div className="absolute top-6 left-0 w-full flex justify-center">
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full shadow-sm flex items-center gap-3">
                  <span className={clsx("text-[10px] font-bold uppercase", step === 1 ? "text-rose-600" : "text-slate-300")}>1. Sign</span>
                  <ArrowRight className="w-3 h-3 text-slate-300" />
                  <span className={clsx("text-[10px] font-bold uppercase", step === 2 ? "text-emerald-600" : "text-slate-300")}>2. Encrypt</span>
                  <ArrowRight className="w-3 h-3 text-slate-300" />
                  <span className={clsx("text-[10px] font-bold uppercase", step === 3 ? "text-indigo-600" : "text-slate-300")}>3. Send</span>
                  <ArrowRight className="w-3 h-3 text-slate-300" />
                  <span className={clsx("text-[10px] font-bold uppercase", step === 4 ? "text-emerald-600" : "text-slate-300")}>4. Decrypt</span>
                  <ArrowRight className="w-3 h-3 text-slate-300" />
                  <span className={clsx("text-[10px] font-bold uppercase", step === 5 ? "text-rose-600" : "text-slate-300")}>5. Verify</span>
              </div>
          </div>

          {/* MAIN ANIMATION CONTAINER */}
          <div className="relative z-10 w-full flex items-center justify-center h-64">
              
              {/* THE DATA PACKET */}
              <AnimatePresence>
                  <motion.div
                    className="relative"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ 
                        x: step === 3 ? 200 : step > 3 ? 0 : 0, 
                        opacity: 1,
                        scale: step === 3 ? 0.8 : 1
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                        {/* Outer Box (Encryption Layer) */}
                        <motion.div 
                            className={clsx(
                                "w-64 h-48 rounded-2xl border-4 flex items-center justify-center relative transition-colors duration-500",
                                step >= 2 && step <= 4 
                                    ? "bg-slate-800 border-emerald-500 shadow-2xl" 
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                            )}
                        >
                            {/* Inner Document (Message) */}
                            {!(step >= 2 && step <= 4) && (
                                <div className="flex flex-col items-center gap-2">
                                    <FileText className="w-12 h-12 text-slate-300" />
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">"Secret Plans"</div>
                                        <div className="text-[10px] text-slate-400">confidential.pdf</div>
                                    </div>
                                </div>
                            )}

                            {/* SIGNATURE STAMP (Alice's Seal) */}
                            {step >= 1 && (
                                <motion.div 
                                    initial={{ scale: 2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute bottom-4 right-4"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-rose-600 border-2 border-rose-400 text-white flex items-center justify-center shadow-lg">
                                            <PenTool className="w-5 h-5" />
                                        </div>
                                        {step === 1 && (
                                            <motion.div initial={{y:5, opacity:0}} animate={{y:0, opacity:1}} className="absolute top-12 whitespace-nowrap bg-rose-100 text-rose-700 text-[9px] font-bold px-2 py-1 rounded shadow-sm">
                                                Signed by Alice
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* ENCRYPTION LOCK (Bob's Lock) */}
                            {step >= 2 && step <= 4 && (
                                <motion.div 
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 rounded-xl z-20 backdrop-blur-sm"
                                >
                                    <Lock className="w-16 h-16 text-emerald-500 mb-2" />
                                    <div className="text-white text-xs font-black uppercase tracking-widest">Locked for Bob</div>
                                    {step === 2 && (
                                        <motion.div initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="mt-2 bg-emerald-900/50 text-emerald-400 text-[9px] font-bold px-3 py-1 rounded border border-emerald-500/30">
                                            Only Bob can open
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/* VERIFICATION CHECK */}
                            {step === 5 && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: -10 }}
                                    className="absolute top-4 left-4 border-4 border-emerald-500 text-emerald-500 px-4 py-2 rounded-xl text-xl font-black uppercase tracking-tighter opacity-80"
                                >
                                    Verified
                                </motion.div>
                            )}

                        </motion.div>
                  </motion.div>
              </AnimatePresence>

              {/* ACTION: KEYS FLYING IN */}
              <AnimatePresence>
                  {step === 1 && (
                      <motion.div 
                        initial={{ x: -300, y: 0, opacity: 0 }} animate={{ x: -140, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                        className="absolute left-1/2 ml-[-100px] z-30 pointer-events-none"
                      >
                          <KeyIcon type="private" owner="Alice" color="text-rose-500" />
                      </motion.div>
                  )}
                  {step === 2 && (
                      <motion.div 
                        initial={{ x: 300, y: 0, opacity: 0 }} animate={{ x: 140, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
                        className="absolute left-1/2 ml-[-100px] z-30 pointer-events-none"
                      >
                          <KeyIcon type="public" owner="Bob" color="text-emerald-500" />
                      </motion.div>
                  )}
                  {step === 4 && (
                      <motion.div 
                        initial={{ x: 300, y: 0, opacity: 0 }} animate={{ x: 140, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
                        className="absolute left-1/2 ml-[-100px] z-30 pointer-events-none"
                      >
                          <KeyIcon type="private" owner="Bob" color="text-emerald-500" />
                      </motion.div>
                  )}
                  {step === 5 && (
                      <motion.div 
                        initial={{ x: -300, y: 0, opacity: 0 }} animate={{ x: -140, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                        className="absolute left-1/2 ml-[-100px] z-30 pointer-events-none"
                      >
                          <KeyIcon type="public" owner="Alice" color="text-rose-500" />
                      </motion.div>
                  )}
              </AnimatePresence>

          </div>

          {/* 3. EXPLANATION & CONTROL */}
          <div className="w-full max-w-md mx-auto mt-8 text-center">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 mb-6 min-h-[100px] flex items-center justify-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step === 0 && "Alice wants to send a secret document to Bob. She also wants to prove it's from her."}
                      {step === 1 && "Alice signs the document with her PRIVATE Key. This creates a unique 'wax seal' that proves origin."}
                      {step === 2 && "Alice encrypts the result with Bob's PUBLIC Key. Now it's a locked box only Bob can open."}
                      {step === 3 && "The encrypted package travels safely over the public internet. Hackers see only gibberish."}
                      {step === 4 && "Bob receives the package. He uses his PRIVATE Key to unlock the encryption."}
                      {step === 5 && "Bob sees the document and Alice's seal. He checks the seal with Alice's PUBLIC Key. It matches!"}
                  </p>
              </div>

              {!ready ? (
                  <div className="text-rose-500 text-xs font-bold animate-pulse">
                      Please generate identity keys for both Alice and Bob above.
                  </div>
              ) : (
                  <div className="flex justify-center gap-4">
                      {step < 5 ? (
                          <button onClick={nextStep} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2">
                              Next Step <ChevronRight className="w-4 h-4" />
                          </button>
                      ) : (
                          <button onClick={reset} className="px-8 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700">
                              <RefreshCw className="w-4 h-4" /> Reset Simulation
                          </button>
                      )}
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};