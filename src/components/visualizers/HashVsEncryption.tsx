import React, { useState, useEffect } from 'react';
import { sha256 } from '../../utils/crypto';
import { motion } from 'framer-motion';
import { Hash, Lock, Unlock, ArrowRight, Undo2, CheckCircle } from 'lucide-react';

export const HashVsEncryption: React.FC = () => {
  const [input, setInput] = useState('Secret');
  const [hash, setHash] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  useEffect(() => {
    const update = async () => {
      const h = await sha256(input);
      setHash(h.substring(0, 16));
      
      const enc = btoa(input).split('').reverse().join('');
      setEncrypted(enc);
      setDecrypted('');
    };
    update();
  }, [input]);

  const handleDecrypt = () => {
      setDecrypted(input);
  };

  return (
    <div className="w-full space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* HASHING SIDE */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg">
                    <Hash className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Hashing (One-Way)</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Input</label>
                    <input 
                        value={input} onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-slate-900 dark:text-slate-100"
                    />
                </div>

                <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Output (Fingerprint)</label>
                    <div className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-2 border-brand-200 dark:border-brand-900 rounded-lg font-mono text-sm text-brand-700 dark:text-brand-400 break-all">
                        {hash}...
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center opacity-60">
                    <Undo2 className="w-8 h-8 text-rose-500 mb-2" />
                    <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest text-center">Impossible to reverse</p>
                    <p className="text-xs text-slate-500 text-center mt-1">You cannot get "{input}" back from the hash.</p>
                </div>
            </div>
        </div>

        {/* ENCRYPTION SIDE */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Encryption (Two-Way)</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Input</label>
                    <div className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm text-slate-400">
                        {input}
                    </div>
                </div>

                <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Output (Scrambled)</label>
                    <div className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900 rounded-lg font-mono text-sm text-indigo-700 dark:text-indigo-400 break-all">
                        {encrypted}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center">
                    {!decrypted ? (
                        <button 
                            onClick={handleDecrypt}
                            className="flex flex-col items-center group"
                        >
                            <Unlock className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-center">Click to Reverse</p>
                            <p className="text-xs text-slate-500 text-center mt-1">Using the key, we can get "{input}" back.</p>
                        </button>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                            <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                            <div className="px-4 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-bold text-sm">
                                Reverted: {decrypted}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};