import React, { useState } from 'react';
import { Search, Loader2, Download, Image as ImageIcon, FileText } from 'lucide-react';
import { analyzeSentence } from '../services/geminiService';
import { SyntaxNode } from '../types';
import TreeVisualization from './TreeVisualization';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

interface SyntaxAnalyzerProps {
  sentence: string;
  setSentence: (s: string) => void;
  data: SyntaxNode[] | null;
  setData: (d: SyntaxNode[] | null) => void;
}

export default function SyntaxAnalyzer({ sentence, setSentence, data, setData }: SyntaxAnalyzerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSentence(sentence);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Error al analizar la oración.');
    } finally {
      setLoading(false);
    }
  };

  const exportAsPNG = async () => {
    const node = document.getElementById('tree-container');
    if (!node) return;
    try {
      const dataUrl = await htmlToImage.toPng(node, { 
        backgroundColor: '#ffffff',
        pixelRatio: 3 // Aumenta la resolución 3x
      });
      const link = document.createElement('a');
      link.download = 'arbol-sintactico.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting PNG', err);
    }
  };

  const exportAsSVG = async () => {
    const node = document.getElementById('tree-container');
    if (!node) return;
    try {
      const dataUrl = await htmlToImage.toSvg(node, { 
        backgroundColor: '#ffffff' 
      });
      const link = document.createElement('a');
      link.download = 'arbol-sintactico.svg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting SVG', err);
    }
  };

  const exportAsPDF = async () => {
    const node = document.getElementById('tree-container');
    if (!node) return;
    try {
      const dataUrl = await htmlToImage.toPng(node, { 
        backgroundColor: '#ffffff',
        pixelRatio: 3 // Aumenta la resolución 3x para el PDF
      });
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [node.clientWidth, node.clientHeight]
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, node.clientWidth, node.clientHeight);
      pdf.save('arbol-sintactico.pdf');
    } catch (err) {
      console.error('Error exporting PDF', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-serif text-zinc-900 tracking-tight">Análisis Sintáctico</h2>
        <p className="text-zinc-600">
          Ingresa una oración para generar su árbol generativo y realizar un micro-análisis morfológico.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="relative flex items-center w-full">
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Ej: El abejorro digital vuela rápidamente sobre las flores."
          className="w-full pl-4 pr-14 py-4 rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
        />
        <button
          type="submit"
          disabled={loading || !sentence.trim()}
          className="absolute right-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-zinc-900">Árbol Generativo</h3>
            <div className="flex gap-2">
              <button onClick={exportAsPNG} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                <ImageIcon className="w-4 h-4" /> PNG
              </button>
              <button onClick={exportAsSVG} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                <ImageIcon className="w-4 h-4" /> SVG
              </button>
              <button onClick={exportAsPDF} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                <FileText className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
          <TreeVisualization data={data} />
        </div>
      )}
    </div>
  );
}
