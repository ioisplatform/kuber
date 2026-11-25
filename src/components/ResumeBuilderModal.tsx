import React, { useState } from 'react';
import { KuberUser } from '../types';
import { X, Sparkles, Download, Printer, Check, User, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ResumeBuilderModalProps {
  user: KuberUser;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeBuilderModal: React.FC<ResumeBuilderModalProps> = ({ user, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const [resumeData, setResumeData] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    email: user.email || '',
    address: 'Patna, Bihar',
    targetRole: 'Indian Railway / SSC Exam Aspirant & Technical Trainee',
    summary:
      'Dedicated and disciplined aspirant with strong analytical skills, proficient in quantitative aptitude, basic computer applications (MS Office), and general science. Seeking to contribute effectively in Indian Railways or public sector administration.',
    education: [
      { degree: '10th Matriculation', board: 'BSEB Patna', year: '2019', percentage: '78%' },
      { degree: '12th Intermediate (Science)', board: 'BSEB Patna', year: '2021', percentage: '74%' },
      { degree: 'Graduation / ITI Diploma', board: 'Patna University', year: '2024', percentage: '72%' }
    ],
    technicalSkills: 'Basic Computer Operations, MS Word & Excel, Hindi & English Typing (35 WPM), Aptitude Calculation',
    languages: 'Hindi (Native), English (Working/Proficient), Bhojpuri',
    achievements: `Enrolled in KUBER Education Platform (ID: ${user.kuberId}), Consistently scored top 10% in Railway Group D Mock Tests.`
  });

  const [generating, setGenerating] = useState(false);

  const handleAIEnhance = () => {
    setGenerating(true);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: `Result-driven and goal-oriented ${prev.targetRole} with accredited identity verification under KUBER Education (ID: ${user.kuberId}). Demonstrates exceptional problem-solving capability in high-pressure examinations, rigorous quantitative aptitude, and disciplined work ethics. Ready for immediate deployment in technical and administrative duties.`,
        technicalSkills: `${prev.technicalSkills}, Speed Math Techniques, Office Automation, Data Verification`
      }));
      setGenerating(false);
      setActiveTab('preview');
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto" id="kuber-resume-builder-modal">
      <div className="bg-[#111111] border-2 border-[#D4AF37] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1A1608] via-[#121212] to-[#1A1608] px-6 py-4 border-b border-[#332A10] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-[#F5D77F]">
                KUBER AI RESUME & BIODATA BUILDER
              </h3>
              <p className="text-xs text-zinc-400">
                Customized for Indian Railway, SSC, Police & Defense applications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
            >
              {activeTab === 'form' ? 'View Live Preview' : 'Edit Details'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'form' ? (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
                <span>
                  💡 <strong>Smart AI Tip:</strong> Your KUBER Student ID ({user.kuberId}) is pre-linked for verifiable student credentials.
                </span>
                <button
                  onClick={handleAIEnhance}
                  disabled={generating}
                  className="px-3 py-1 rounded bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold text-xs hover:opacity-90 flex items-center gap-1 shrink-0 ml-3"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  {generating ? 'Polishing with AI...' : 'One-Click AI Polish'}
                </button>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Target Role / Designation</label>
                  <input
                    type="text"
                    value={resumeData.targetRole}
                    onChange={(e) => setResumeData({ ...resumeData, targetRole: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Location / Address</label>
                  <input
                    type="text"
                    value={resumeData.address}
                    onChange={(e) => setResumeData({ ...resumeData, address: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Career Objective & Summary</label>
                <textarea
                  rows={3}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Technical Skills & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Skills & Tools</label>
                  <input
                    type="text"
                    value={resumeData.technicalSkills}
                    onChange={(e) => setResumeData({ ...resumeData, technicalSkills: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">Known Languages</label>
                  <input
                    type="text"
                    value={resumeData.languages}
                    onChange={(e) => setResumeData({ ...resumeData, languages: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Certifications & Achievements</label>
                <textarea
                  rows={2}
                  value={resumeData.achievements}
                  onChange={(e) => setResumeData({ ...resumeData, achievements: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>
          ) : (
            /* Live Resume Print Preview */
            <div
              id="printable-cv-area"
              className="bg-white text-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-300 max-w-2xl mx-auto text-sm leading-relaxed"
            >
              {/* CV Header */}
              <div className="border-b-2 border-zinc-800 pb-4 text-center">
                <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
                  {resumeData.fullName}
                </h1>
                <p className="text-zinc-600 font-medium text-xs mt-0.5">
                  {resumeData.targetRole}
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-zinc-700 mt-2">
                  <span>📱 {resumeData.phone}</span>
                  <span>✉️ {resumeData.email}</span>
                  <span>📍 {resumeData.address}</span>
                  <span className="font-bold text-amber-800">
                    ID: {user.kuberId}
                  </span>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-700" /> Professional Summary
                </h2>
                <p className="text-xs text-zinc-800 text-justify">
                  {resumeData.summary}
                </p>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-700" /> Academic Credentials
                </h2>
                <div className="space-y-1.5 text-xs">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-800">
                      <div>
                        <strong>{edu.degree}</strong> — {edu.board}
                      </div>
                      <div className="text-zinc-600">
                        {edu.year} ({edu.percentage})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-700" /> Key Skills & Competencies
                </h2>
                <p className="text-xs text-zinc-800">
                  {resumeData.technicalSkills}
                </p>
                <p className="text-xs text-zinc-700 mt-1">
                  <strong>Languages:</strong> {resumeData.languages}
                </p>
              </div>

              {/* Verification & Certification */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-zinc-700" /> Official Identification & Achievements
                </h2>
                <p className="text-xs text-zinc-800">
                  {resumeData.achievements}
                </p>
              </div>

              {/* Declaration */}
              <div className="mt-6 pt-3 border-t border-zinc-300 flex justify-between items-end text-[11px] text-zinc-600">
                <div>
                  <p>I hereby declare that all information given above is true to the best of my knowledge.</p>
                  <p className="mt-1 font-semibold">Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-right font-bold text-zinc-900">
                  {resumeData.fullName}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#171717] px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => setActiveTab(activeTab === 'form' ? 'preview' : 'form')}
            className="text-xs text-zinc-400 hover:text-white"
          >
            {activeTab === 'form' ? 'Preview Resume' : '← Back to Editor'}
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-90 flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-3.5 h-3.5 text-black" /> Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
