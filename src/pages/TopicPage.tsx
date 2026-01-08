import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { TOPICS } from '../data/topics';
import { HashDemo } from '../components/visualizers/HashDemo';
import { SignVerifyDemo } from '../components/visualizers/SignVerifyDemo';
import { BlockchainDemo } from '../components/visualizers/BlockchainDemo';
import { HashVsEncryption } from '../components/visualizers/HashVsEncryption';
import { CaesarCipherDemo } from '../components/visualizers/CaesarCipherDemo';
import { AvalancheDemo } from '../components/visualizers/AvalancheDemo';
import { DigitalSignatureVisualizer } from '../components/visualizers/DigitalSignatureVisualizer';
import { PublicKeyDemo } from '../components/visualizers/PublicKeyDemo';
import { SignVerifyVisualizer } from '../components/visualizers/SignVerifyVisualizer';
import { ArrowLeft, ArrowRight, BookOpen, Activity } from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { topicId } = useParams();
  const topicIndex = TOPICS.findIndex(t => t.id === topicId);
  const topic = TOPICS[topicIndex];
  const nextTopic = TOPICS[topicIndex + 1];
  const prevTopic = TOPICS[topicIndex - 1];

  if (!topic) {
    return <Navigate to="/learn" replace />;
  }

  const renderVisualizer = () => {
    switch (topic.visualizerType) {
      case 'intro':
        return <CaesarCipherDemo />;
      case 'avalanche':
        return <AvalancheDemo />;
      case 'sig-concept':
        return <DigitalSignatureVisualizer />;
      case 'pk-concept':
        return <PublicKeyDemo />;
      case 'sig-vs-ver':
        return <SignVerifyVisualizer />;
      case 'hash-simple':
      case 'hash-props':
        return <HashDemo />;
      case 'signature':
      case 'keys':
        return <SignVerifyDemo />;
      case 'blockchain':
         return <BlockchainDemo />;
      case 'hash-vs-enc':
         return <HashVsEncryption />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-6 md:p-8">
      <Link to="/learn" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Path
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <topic.icon className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{topic.title}</h1>
        </div>
        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          {topic.content.definition}
        </p>
      </div>

      {/* Theory Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
           <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
             <BookOpen className="w-5 h-5" />
             Analogy
           </h3>
           <p className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">"{topic.content.analogy}"</p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-slate-100 dark:border-slate-800/50 h-full">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-200">Key Properties</h3>
          <ul className="space-y-3">
            {topic.content.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visualizer Section - Full Width */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
           <div className="p-1.5 rounded bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
             <Activity className="w-5 h-5" />
           </div>
           <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interactive Demonstration</h3>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-8 shadow-sm">
           {renderVisualizer()}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
        {prevTopic ? (
          <Link to={`/learn/${prevTopic.id}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-slate-500">Previous</div>
              <div className="font-bold text-slate-900 dark:text-slate-100">{prevTopic.title}</div>
            </div>
          </Link>
        ) : <div />}

        {nextTopic ? (
          <Link to={`/learn/${nextTopic.id}`} className="flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
            <div className="text-right">
              <div className="text-xs text-brand-600 dark:text-brand-600">Next</div>
              <div className="font-bold text-slate-900 dark:text-slate-100">{nextTopic.title}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
             <Link to="/playground" className="flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                <div className="text-right">
                  <div className="text-xs text-brand-600 dark:text-brand-600">Finished?</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Go to Playground</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
        )}
      </div>
    </div>
  );
};