import React from 'react';
import { KuberUser } from '../types';
import { generateQRCodeDataUri } from '../utils/qr';
import { Award, Download, Printer, CheckCircle2 } from 'lucide-react';

interface CertificateViewProps {
  user: KuberUser;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ user }) => {
  const verifyUrl = `${window.location.origin}/?page=verify&id=${user.kuberId}`;
  const qrUri = generateQRCodeDataUri(verifyUrl, 140);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto my-4" id="kuber-certificate-wrapper">
      {/* Printable Certificate Frame */}
      <div
        id="printable-certificate"
        className="w-full bg-[#0E0E0E] text-white p-8 sm:p-12 rounded-2xl border-4 border-[#D4AF37] relative overflow-hidden shadow-2xl shadow-black"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #17150C 0%, #0A0A0A 100%)',
        }}
      >
        {/* Ornate Gold Border Inner Inset */}
        <div className="absolute inset-3 border border-[#AA820A]/60 pointer-events-none rounded-xl"></div>
        <div className="absolute inset-5 border-2 border-dashed border-[#D4AF37]/30 pointer-events-none rounded-lg"></div>

        {/* Certificate Header */}
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-[#FFDF73] to-[#AA820A] text-black shadow-lg shadow-amber-500/20 mb-3">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-[#F5D77F] tracking-widest uppercase">
            CERTIFICATE OF EXCELLENCE
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold mt-1">
            KUBER EDUCATIONAL FOUNDATION • PATNA, BIHAR
          </p>
          <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3"></div>
        </div>

        {/* Recipient Notice */}
        <div className="text-center my-6 relative z-10">
          <p className="text-sm uppercase tracking-wider text-zinc-400 font-medium">
            This is to certify that
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide my-2 uppercase font-serif underline decoration-[#D4AF37] decoration-2 underline-offset-8">
            {user.fullName}
          </h1>

          <p className="text-xs text-zinc-400 mt-2">
            Holder of Permanent Non-Editable KUBER ID:
          </p>
          <span className="inline-block mt-1 font-mono font-black text-xl text-[#FFDF73] bg-[#1F1908] px-4 py-1.5 rounded-lg border border-[#D4AF37]/50 tracking-widest">
            {user.kuberId}
          </span>
        </div>

        {/* Description of Achievement */}
        <div className="max-w-xl mx-auto text-center text-xs sm:text-sm text-zinc-300 leading-relaxed my-6 relative z-10">
          has successfully enrolled in the <strong className="text-amber-300 font-semibold">ROZGAR DHAN SCHOLARSHIP & CAREER PROGRAM</strong>, completing full assessment on Indian Railway (RRB NTPC/Group D) and SSC Examination syllabus, AI Career Tools mastery, and Job Readiness Training.
        </div>

        {/* Credentials and Signatures Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center pt-8 border-t border-[#332A10] relative z-10 mt-6">
          {/* Issue Date & Certificate ID */}
          <div className="text-center sm:text-left text-xs">
            <span className="text-zinc-500 uppercase font-semibold block text-[10px]">
              Issue Date & Verification
            </span>
            <span className="text-zinc-200 font-bold block mt-1">
              {user.approvedAt
                ? new Date(user.approvedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
                : new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-amber-400 font-mono text-[10px] block mt-0.5">
              Ref: CERT-{user.kuberId}
            </span>
          </div>

          {/* Center QR code */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 p-1 rounded-lg bg-white border border-[#D4AF37] shadow-md">
              <img src={qrUri} alt="Certificate QR" className="w-full h-full object-contain" />
            </div>
            <span className="text-[9px] uppercase font-bold text-[#D4AF37] tracking-wider mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Tamper-Proof QR
            </span>
          </div>

          {/* Official Signatory */}
          <div className="text-center sm:text-right">
            <div className="font-royal text-base text-[#F5D77F] font-bold">
              Dr. B. K. Singh
            </div>
            <div className="text-[11px] text-zinc-400">Head of Academic Board</div>
            <div className="text-[10px] text-zinc-500 font-serif italic">
              KUBER Education, Patna
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-95 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
        >
          <Printer className="w-4 h-4 text-black" /> Print Certificate
        </button>
      </div>
    </div>
  );
};
