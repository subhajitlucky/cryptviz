import React, { useState, useEffect } from 'react';
import { sha256 } from '../../utils/crypto';
import { motion } from 'framer-motion';
import { Link2, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface BlockData {
  id: number;
  data: string;
  prevHash: string;
  hash: string;
  nonce: number;
}

const Block = ({ 
  block, 
  prevBlock, 
  onChange, 
  isValid 
}: { 
  block: BlockData; 
  prevBlock: BlockData | null; 
  onChange: (id: number, data: string) => void;
  isValid: boolean;
}) => {
  return (
    <div className={clsx(
      "relative p-4 rounded-xl border-2 transition-all duration-300 shadow-sm",
      isValid 
        ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" 
        : "bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="font-bold text-slate-800 dark:text-slate-200">Block #{block.id}</span>
        {isValid ? (
           <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded-full border border-emerald-200 dark:border-transparent">
             <CheckCircle className="w-3 h-3" /> LINKED
           </span>
        ) : (
           <span className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/20 px-2 py-1 rounded-full border border-rose-200 dark:border-transparent">
             <AlertTriangle className="w-3 h-3" /> BROKEN
           </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Data Input */}
        <div>
          <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 block">Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onChange(block.id, e.target.value)}
            className={clsx(
              "w-full h-16 p-2 text-sm rounded border transition-colors font-mono resize-none focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner",
              isValid 
                ? "bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200"
                : "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-200"
            )}
          />
        </div>

        {/* Previous Hash */}
        <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1">
             <Link2 className="w-3 h-3" /> Prev Hash
           </label>
           <div className={clsx(
             "text-[10px] font-mono p-1.5 rounded truncate transition-colors",
             block.id === 1 
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400" // Genesis block
                : isValid 
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-transparent"
                    : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 font-bold border border-rose-100 dark:border-transparent"
           )}>
             {block.prevHash}
           </div>
        </div>

        {/* Current Hash */}
        <div className="space-y-1">
           <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Current Hash</label>
           <div className="text-[10px] font-mono p-1.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 truncate">
             {block.hash}
           </div>
        </div>
      </div>

      {/* Chain Link Visual */}
      {prevBlock && (
        <div className={clsx(
            "absolute top-1/2 -left-8 w-8 h-1 transition-colors duration-300",
            isValid ? "bg-slate-300 dark:bg-slate-700" : "bg-rose-400 dark:bg-rose-600"
        )} />
      )}
    </div>
  );
};

export const BlockchainDemo: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([
    { id: 1, data: 'Genesis Block', prevHash: '0000000000000000', hash: '', nonce: 0 },
    { id: 2, data: 'Tx: Alice -> Bob $50', prevHash: '', hash: '', nonce: 0 },
    { id: 3, data: 'Tx: Bob -> Charlie $20', prevHash: '', hash: '', nonce: 0 },
  ]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleDataChange = async (id: number, newData: string) => {
    setIsCalculating(true);
    const newBlocks = [...blocks];
    const index = id - 1;
    newBlocks[index].data = newData;
    
    for (let i = index; i < newBlocks.length; i++) {
        if (i > 0) newBlocks[i].prevHash = newBlocks[i-1].hash;
        newBlocks[i].hash = await sha256(newBlocks[i].id + newBlocks[i].data + newBlocks[i].prevHash);
    }

    setBlocks(newBlocks);
    setIsCalculating(false);
  };
  
  useEffect(() => {
     handleDataChange(1, 'Genesis Block');
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-sm border border-slate-200 dark:border-slate-800">
         <RefreshCw className={clsx("w-4 h-4", isCalculating && "animate-spin")} />
         <p>
           <strong>The Chain Reaction:</strong> Change the data in <strong>Block #1</strong>. Notice how it changes Block #1's hash, which changes Block #2's <em>Previous Hash</em>, which changes Block #2's hash... all the way to the end.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
         {/* Connecting Line (Desktop) */}
         <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2" />

         {blocks.map((block, index) => (
           <motion.div 
             key={block.id}
             layout
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
           >
             <Block 
               block={block} 
               prevBlock={index > 0 ? blocks[index - 1] : null}
               onChange={handleDataChange}
               isValid={true}
             />
           </motion.div>
         ))}
      </div>
    </div>
  );
};
