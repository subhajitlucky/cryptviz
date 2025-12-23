import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Shield, Terminal, BookOpen, Home } from 'lucide-react';
import clsx from 'clsx';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/playground', label: 'Playground', icon: Terminal },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-brand-600/10 dark:bg-brand-500/10 rounded-lg group-hover:bg-brand-600/20 dark:group-hover:bg-brand-500/20 transition-colors">
              <Shield className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100">
              Crypt<span className="text-brand-600 dark:text-brand-400">Viz</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2',
                      isActive
                        ? 'bg-brand-600/10 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Background Grid Pattern - Fixed visibility for light mode */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-20 pointer-events-none" 
             style={{
               backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
               backgroundSize: '32px 32px'
             }} 
        />
        
        <div className="relative z-10 flex-grow flex flex-col">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Branding Column */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 group mb-4">
                <div className="p-1.5 bg-brand-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
                  Crypt<span className="text-brand-600 dark:text-brand-400">Viz</span>
                </span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                An interactive playground designed to make cryptography intuitive. 
                Visualize the mechanics of the secure web, from simple hashes to 
                complex blockchain systems.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources/Legal */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>Educational Use Only</li>
                <li>Simulated Crypto</li>
                <li>MIT License</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              &copy; 2025 CryptViz. Built for educational excellence.
            </p>
            <div className="bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/30">
              <p className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-tighter">
                Disclaimer: Do not use for real security
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};