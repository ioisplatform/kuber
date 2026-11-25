import React, { useState } from 'react';
import { RAILWAY_101_QUESTIONS, MOCK_PAPERS_LIST, RailwayQuestion } from '../data/studyMaterials';
import { X, BookOpen, Download, CheckCircle, HelpCircle, FileText, Search, Filter } from 'lucide-react';

interface StudyMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'questions' | 'papers';
  plan: '29' | '99';
}

export const StudyMaterialModal: React.FC<StudyMaterialModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'questions',
  plan,
}) => {
  const [tab, setTab] = useState<'questions' | 'papers'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const toggleAnswer = (id: number) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = RAILWAY_101_QUESTIONS.filter((q) => {
    const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.hindiQuestion.includes(searchQuery) ||
      q.repeatedIn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownloadFile = (fileName: string) => {
    // Generate sample clean PDF/text file download for the requested paper
    const content = `KUBER EDUCATION PLATFORM - OFFICIAL STUDY PASS\nDocument: ${fileName}\nAuthorized for KUBER Enrolled Student\nPatna, Bihar\n\n===============================\n` +
      filteredQuestions.map((q, i) => `${i + 1}. ${q.question}\n   (${q.hindiQuestion})\n   Repeated In: ${q.repeatedIn}\n   Answer: ${q.correctAnswer}\n   Explanation: ${q.explanation}\n`).join('\n-------------------------------\n');
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto" id="kuber-study-materials-modal">
      <div className="bg-[#111111] border-2 border-[#D4AF37] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1608] via-[#121212] to-[#1A1608] px-6 py-4 border-b border-[#332A10] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-[#F5D77F]">
                KUBER EXAM REPOSITORY & VAULT
              </h3>
              <p className="text-xs text-zinc-400">
                {plan === '29' ? 'Gyan Dhan: 101 Railway High-Frequency Repeat Questions' : 'Rozgar Dhan: 101 Qs + 50 Full Mock Papers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {plan === '99' && (
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 text-xs">
                <button
                  onClick={() => setTab('questions')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    tab === 'questions' ? 'bg-[#D4AF37] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  101 Repeat Qs
                </button>
                <button
                  onClick={() => setTab('papers')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    tab === 'papers' ? 'bg-[#D4AF37] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  50 Mock Papers
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'questions' ? (
            <div>
              {/* Filter and Download Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search railway questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {['All', 'Railway GK', 'General Science', 'Static GK', 'Reasoning & Math'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedCategory === cat
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Download PDF button */}
                <button
                  onClick={() => handleDownloadFile('KUBER_101_Railway_Repeat_Questions.pdf')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-95 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-black" /> Download 101 Qs PDF
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const isRevealed = !!revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                          Repeated in: <strong className="text-zinc-200">{q.repeatedIn}</strong>
                        </span>
                      </div>

                      {/* Question Text */}
                      <h4 className="text-sm font-semibold text-white">
                        {q.id}. {q.question}
                      </h4>
                      <p className="text-xs text-amber-200/80 mt-0.5">
                        ({q.hindiQuestion})
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = opt === q.correctAnswer;
                          return (
                            <div
                              key={oIdx}
                              className={`px-3 py-2 rounded-lg text-xs border transition-colors ${
                                isRevealed && isCorrect
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300'
                              }`}
                            >
                              <span className="text-zinc-500 mr-2 font-mono">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </div>
                          );
                        })}
                      </div>

                      {/* Answer Reveal Button */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          {isRevealed ? 'Hide Answer & Explanation' : 'View Correct Answer & Trick'}
                        </button>

                        {isRevealed && (
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Correct: {q.correctAnswer}
                          </span>
                        )}
                      </div>

                      {/* Explanation */}
                      {isRevealed && (
                        <div className="mt-2 p-3 rounded-lg bg-[#14120B] border border-[#D4AF37]/30 text-xs text-amber-100/90 leading-relaxed">
                          💡 <strong>Official Solution & Notes:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 50 Mock Papers Tab */
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
                <div>
                  <h4 className="font-royal text-base font-bold text-white">
                    50 Full-Length Exam Mock Papers Vault
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Latest patterns with OMR practice sheets and verified answer keys
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadFile('KUBER_All_50_Mock_Papers_Bundle.pdf')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-95 flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-black" /> Download All 50 Papers ZIP
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_PAPERS_LIST.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {paper.exam}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {paper.duration} • {paper.marks} Marks
                        </span>
                      </div>

                      <h5 className="font-semibold text-sm text-white mt-2">
                        {paper.title}
                      </h5>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
                        <span>📝 {paper.totalQuestions} Questions</span>
                        <span>⚡ {paper.difficulty}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {paper.downloadFileName}
                      </span>
                      <button
                        onClick={() => handleDownloadFile(paper.downloadFileName)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download Paper
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
