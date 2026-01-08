import React, { useState } from 'react';
import { HashDemo } from '../components/visualizers/HashDemo';
import { SignVerifyVisualizer } from '../components/visualizers/SignVerifyVisualizer';
import { EncryptionFlow } from '../components/visualizers/EncryptionFlow';
import { BlockchainDemo } from '../components/visualizers/BlockchainDemo';
import clsx from 'clsx';
import { Hash, PenTool, Lock, Link2 } from 'lucide-react';

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hashing' | 'transaction' | 'encryption' | 'blockchain'>('hashing');

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Cryptography Playground</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Experiment with cryptographic primitives in a safe sandbox.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('hashing')}
          className={clsx(
            "px-6 py-3 rounded-t-lg font-bold flex items-center gap-2 transition-all",
            activeTab === 'hashing' 
              ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px]" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          )}
        >
          <Hash className="w-4 h-4" /> Hashing Engine
        </button>
        <button
          onClick={() => setActiveTab('transaction')}
          className={clsx(
            "px-6 py-3 rounded-t-lg font-bold flex items-center gap-2 transition-all",
            activeTab === 'transaction' 
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px]" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          )}
        >
          <PenTool className="w-4 h-4" /> Transaction Flow (Signing)
        </button>
        <button
          onClick={() => setActiveTab('encryption')}
          className={clsx(
            "px-6 py-3 rounded-t-lg font-bold flex items-center gap-2 transition-all",
            activeTab === 'encryption' 
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px]" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          )}
        >
          <Lock className="w-4 h-4" /> Secure Messaging (Encryption)
        </button>
        <button
          onClick={() => setActiveTab('blockchain')}
          className={clsx(
            "px-6 py-3 rounded-t-lg font-bold flex items-center gap-2 transition-all",
            activeTab === 'blockchain' 
              ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px]" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          )}
        >
          <Link2 className="w-4 h-4" /> Blockchain Ledger
        </button>
      </div>
      
      {/* Content Area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-xl rounded-tr-xl p-6 md:p-8 min-h-[500px] shadow-sm">
        {activeTab === 'hashing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SHA-256 Hashing</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Type in the box below to see how even a single character change completely transforms the hash. This is the foundation of data integrity.
              </p>
            </div>
            <HashDemo />
          </div>
        )}

        {activeTab === 'transaction' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Digital Signature Transaction</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Simulate a secure value transfer. See how Alice uses her <span className="text-rose-600 dark:text-rose-400 font-bold">Private Key</span> to sign, and how Bob uses Alice's <span className="text-emerald-600 dark:text-emerald-400 font-bold">Public Key</span> to verify without knowing her secrets.
              </p>
            </div>
            <SignVerifyVisualizer />
          </div>
        )}

        {activeTab === 'encryption' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">End-to-End Encryption (ECDH)</h2>
              <p className="text-slate-600 dark:text-slate-400">
                How do two people share a secret key over the internet safely? Observe how Alice and Bob derive the <strong>Same Shared Secret</strong> using their own Private Key and the other person's Public Key.
              </p>
            </div>
            <EncryptionFlow />
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Immutable Blockchain Ledger</h2>
              <p className="text-slate-600 dark:text-slate-400">
                See why blockchains are "immutable". Every block contains the <strong>Hash of the previous block</strong>. If you try to change history (edit an old block), the math breaks the entire future chain.
              </p>
            </div>
            <BlockchainDemo />
          </div>
        )}
      </div>
    </div>
  );
};
