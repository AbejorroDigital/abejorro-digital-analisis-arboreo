/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, BookOpen, Brain, Activity } from 'lucide-react';
import SyntaxAnalyzer from './components/SyntaxAnalyzer';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';
import { SyntaxNode } from './types';

type Tab = 'analisis' | 'glosario' | 'laboratorio';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('analisis');
  
  // Lifted state for SyntaxAnalyzer to persist across tab changes
  const [sentence, setSentence] = useState('');
  const [data, setData] = useState<SyntaxNode[] | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl shadow-sm shadow-indigo-500/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-zinc-900">
              Abejorro Digital
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button
                onClick={() => setActiveTab('analisis')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'analisis'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Activity className="w-4 h-4" /> Análisis
              </button>
              <button
                onClick={() => setActiveTab('glosario')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'glosario'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Glosario
              </button>
              <button
                onClick={() => setActiveTab('laboratorio')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'laboratorio'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Brain className="w-4 h-4" /> Laboratorio
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={activeTab === 'analisis' ? 'block' : 'hidden'}>
            <SyntaxAnalyzer 
              sentence={sentence} 
              setSentence={setSentence} 
              data={data} 
              setData={setData} 
            />
          </div>
          {activeTab === 'glosario' && <Glossary />}
          {activeTab === 'laboratorio' && <Quiz />}
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-200 bg-white/80 backdrop-blur-md pb-safe">
        <nav className="flex justify-around p-2">
          <button
            onClick={() => setActiveTab('analisis')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'analisis' ? 'text-indigo-600' : 'text-zinc-500'
            }`}
          >
            <Activity className="w-5 h-5" /> Análisis
          </button>
          <button
            onClick={() => setActiveTab('glosario')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'glosario' ? 'text-indigo-600' : 'text-zinc-500'
            }`}
          >
            <BookOpen className="w-5 h-5" /> Glosario
          </button>
          <button
            onClick={() => setActiveTab('laboratorio')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-colors ${
              activeTab === 'laboratorio' ? 'text-indigo-600' : 'text-zinc-500'
            }`}
          >
            <Brain className="w-5 h-5" /> Laboratorio
          </button>
        </nav>
      </div>
    </div>
  );
}
