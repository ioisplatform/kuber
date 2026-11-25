import React, { useState } from 'react';
import { AI_PROMPTS_LIST, INTERVIEW_VIDEOS_LIST, AIPromptItem, InterviewVideo } from '../data/studyMaterials';
import { X, Sparkles, Video, Copy, Check, Play, Search, ShieldCheck } from 'lucide-react';

interface PromptsAndVideosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'prompts' | 'videos';
}

export const PromptsAndVideosModal: React.FC<PromptsAndVideosModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'prompts',
}) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'videos'>(initialTab);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [promptCategory, setPromptCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState<InterviewVideo | null>(INTERVIEW_VIDEOS_LIST[0]);

  if (!isOpen) return null;

  const copyPrompt = (prompt: AIPromptItem) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = AI_PROMPTS_LIST.filter((p) => {
    const matchCat = promptCategory === 'All' || p.category === promptCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.promptText.toLowerCase().includes(search.toLowerCase()) ||
      p.useCase.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto" id="kuber-prompts-videos-modal">
      <div className="bg-[#111111] border-2 border-[#D4AF37] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1608] via-[#121212] to-[#1A1608] px-6 py-4 border-b border-[#332A10] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {activeTab === 'prompts' ? <Sparkles className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-[#F5D77F]">
                ROZGAR DHAN EXCLUSIVE SUITE
              </h3>
              <p className="text-xs text-zinc-400">
                100+ High-Yield AI Prompts & Curated Interview Masterclasses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 text-xs">
              <button
                onClick={() => setActiveTab('prompts')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'prompts' ? 'bg-[#D4AF37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> 100 AI Prompts
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'videos' ? 'bg-[#D4AF37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Interview Videos
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'prompts' ? (
            <div>
              {/* Filter and instructions */}
              <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/20 to-zinc-900 border border-amber-500/30 text-xs text-amber-200">
                🤖 <strong>How to Use:</strong> Click <em>"Copy Prompt"</em> on any topic, paste it into ChatGPT, Google Gemini, or Claude, and get instant shortcuts, mnemonic stories, and step-by-step exam solutions!
              </div>

              {/* Search & Categories */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search prompts (e.g., speed math, GK)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {['All', 'Math Shortcuts', 'GK Mnemonics', 'Mock Interviewer', 'English & Reasoning'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPromptCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        promptCategory === cat
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPrompts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">Prompt #{p.id}</span>
                      </div>

                      <h4 className="font-semibold text-sm text-white mt-2">
                        {p.title}
                      </h4>

                      <div className="mt-2 p-2.5 rounded-lg bg-black/60 border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed max-h-24 overflow-y-auto">
                        "{p.promptText}"
                      </div>

                      <p className="text-[11px] text-zinc-400 mt-2 italic">
                        🎯 {p.useCase}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-end">
                      <button
                        onClick={() => copyPrompt(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          copiedId === p.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-90'
                        }`}
                      >
                        {copiedId === p.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-black" /> Copy AI Prompt
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Interview & Medical Videos Tab */
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Active Video Player & Details */}
              <div className="sm:col-span-8 flex flex-col">
                {activeVideo && (
                  <div>
                    {/* Video Player Box */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-lg flex items-center justify-center">
                      {/* Simulated high quality player */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none"></div>
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                        alt={activeVideo.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute z-20 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg shadow-amber-500/40 hover:scale-105 cursor-pointer transition-transform">
                          <Play className="w-7 h-7 fill-black ml-1" />
                        </div>
                        <span className="text-xs font-semibold text-white mt-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                          Click to Stream HD Masterclass ({activeVideo.duration})
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-4">
                      {activeVideo.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                      <span className="text-amber-400 font-semibold">🎙️ {activeVideo.speaker}</span>
                      <span>•</span>
                      <span>⏱️ {activeVideo.duration}</span>
                      <span>•</span>
                      <span>📂 {activeVideo.topic}</span>
                    </div>

                    {/* Key Takeaways */}
                    <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Crucial Exam Checklist & Rules Covered:
                      </h5>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {activeVideo.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Playlist of Videos */}
              <div className="sm:col-span-4 space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                  Masterclass Playlist (3 Lessons)
                </h4>
                {INTERVIEW_VIDEOS_LIST.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activeVideo?.id === vid.id
                        ? 'bg-amber-950/30 border-[#D4AF37] shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="font-mono">{vid.duration}</span>
                      <span className="text-amber-400 font-semibold">RRB / SSC Verified</span>
                    </div>
                    <h5 className="text-xs font-bold text-white mt-1 line-clamp-2">
                      {vid.title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 mt-1">{vid.speaker}</p>
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
