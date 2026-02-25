import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import allQuestions from '../data/questions.json';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const getRandomQuestions = (pool: Question[], count: number) => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>(() => getRandomQuestions(allQuestions, 10));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetQuiz = () => {
    setQuestions(getRandomQuestions(allQuestions, 10));
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-2xl mx-auto text-center py-12">
        <Brain className="w-16 h-16 text-indigo-500 mb-4" />
        <h2 className="text-4xl font-serif text-zinc-900 tracking-tight">¡Laboratorio Completado!</h2>
        <p className="text-xl text-zinc-600">
          Tu puntuación: <span className="font-bold text-indigo-600">{score}</span> de {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors mt-4 shadow-sm"
        >
          <RefreshCw className="w-5 h-5" /> Repetir Evaluación
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-serif text-zinc-900 tracking-tight flex items-center gap-3">
          <Brain className="w-8 h-8 text-indigo-500" /> Laboratorio de Práctica
        </h2>
        <p className="text-zinc-600">
          Evalúa tus conocimientos sintácticos y morfológicos. Pregunta {currentQuestion + 1} de {questions.length}.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
        <h3 className="text-xl font-medium text-zinc-900 mb-8 leading-relaxed">
          {q.question}
        </h3>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            let btnClass = "w-full text-left px-6 py-4 rounded-xl border transition-all font-medium flex justify-between items-center ";
            
            if (!showResult) {
              btnClass += "border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50 text-zinc-700";
            } else {
              if (idx === q.answer) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-700";
              } else {
                btnClass += "border-zinc-200 text-zinc-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={showResult}
                className={btnClass}
              >
                {opt}
                {showResult && idx === q.answer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {showResult && idx === selectedOption && idx !== q.answer && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 flex justify-end animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Siguiente Pregunta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
