import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TOPICS } from '../data/topics';
import { ArrowRight } from 'lucide-react';

export const Learn: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Learning Path</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Master the fundamentals of cryptography step-by-step. Start from the beginning or jump to a specific concept.
        </p>
      </motion.div>
      
      <div className="grid gap-4">
        {TOPICS.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/learn/${topic.id}`}
                className="group flex items-center p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <div className="p-4 bg-slate-100 dark:bg-slate-950 rounded-lg group-hover:scale-110 transition-transform mr-6">
                  <Icon className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                    {index + 1}. {topic.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{topic.description}</p>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  <ArrowRight className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};