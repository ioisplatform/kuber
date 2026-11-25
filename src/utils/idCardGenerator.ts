import { KuberUser } from '../types';
import { generateQRCodeDataUri } from './qr';

/**
 * Draws a royal, ultra-crisp Black & Gold KUBER Student ID Card (Front or Back)
 * on an HTML5 Canvas and downloads or returns it as a data URL.
 */
export async function generateIdCardCanvas(
  user: KuberUser,
  side: 'front' | 'back' = 'front'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 625;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Common background: Deep Obsidian Radial Gradient
  const bgGrad = ctx.createRadialGradient(500, 312, 50, 500, 312, 600);
  bgGrad.addColorStop(0, '#181818');
  bgGrad.addColorStop(0.6, '#0E0E0E');
  bgGrad.addColorStop(1, '#050505');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1000, 625);

  // Royal Double Border with Gold Inset
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, 964, 589);

  ctx.strokeStyle = '#66500F';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, 944, 569);

  // Corner Ornaments
  const cornerSize = 25;
  ctx.strokeStyle = '#FFF2B2';
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(18, 18 + cornerSize);
  ctx.lineTo(18, 18);
  ctx.lineTo(18 + cornerSize, 18);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(982 - cornerSize, 18);
  ctx.lineTo(982, 18);
  ctx.lineTo(982, 18 + cornerSize);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(18, 607 - cornerSize);
  ctx.lineTo(18, 607);
  ctx.lineTo(18 + cornerSize, 607);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(982 - cornerSize, 607);
  ctx.lineTo(982, 607);
  ctx.lineTo(982, 607 - cornerSize);
  ctx.stroke();

  if (side === 'front') {
    // ----------------- FRONT SIDE -----------------
    // Header Ribbon (Gold Foil Gradient)
    const headerGrad = ctx.createLinearGradient(40, 40, 960, 120);
    headerGrad.addColorStop(0, '#B38714');
    headerGrad.addColorStop(0.3, '#FFDF73');
    headerGrad.addColorStop(0.7, '#D4AF37');
    headerGrad.addColorStop(1, '#8A660B');
    ctx.fillStyle = headerGrad;
    ctx.fillRect(40, 36, 920, 84);

    // Top Header Typography
    ctx.fillStyle = '#0A0A0A';
    ctx.font = '900 36px Cinzel, serif, "Times New Roman"';
    ctx.textAlign = 'center';
    ctx.fillText('KUBER', 500, 74);

    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('KNOWLEDGE UNIVERSE FOR BUSINESS, EARNING & REWARDS', 500, 98);

    // Student Photo (Left Column)
    const photoX = 65;
    const photoY = 150;
    const photoW = 210;
    const photoH = 250;

    // Photo Gold Frame
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);

    try {
      const photoImg = new Image();
      photoImg.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        photoImg.onload = () => resolve(true);
        photoImg.onerror = () => resolve(false);
        photoImg.src =
          user.photoUrl ||
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23222" width="200" height="200"/><text fill="%23D4AF37" x="50%" y="50%" text-anchor="middle" font-size="20">STUDENT</text></svg>';
      });
      ctx.drawImage(photoImg, photoX, photoY, photoW, photoH);
    } catch (err) {
      console.warn('Canvas photo draw fallback:', err);
      ctx.fillStyle = '#333';
      ctx.fillRect(photoX, photoY, photoW, photoH);
    }

    // Student Credentials & Details
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(user.fullName.toUpperCase(), 310, 185);

    ctx.fillStyle = '#A3A3A3';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('REGISTERED SCHOLAR & CAREER ASPIRANT', 310, 210);

    // Separator Line
    ctx.strokeStyle = '#332B14';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(310, 225);
    ctx.lineTo(720, 225);
    ctx.stroke();

    // Highlight Box for KUBER ID
    ctx.fillStyle = '#17140B';
    ctx.fillRect(310, 240, 410, 75);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(310, 240, 410, 75);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PERMANENT KUBER ID (NON-EDITABLE REGISTRY KEY)', 325, 265);

    ctx.fillStyle = '#FFF2B2';
    ctx.font = '900 32px "Space Mono", monospace';
    ctx.fillText(user.kuberId, 325, 303);

    // Detail Grid
    const planName =
      user.plan === '199'
        ? 'MAHA DHAN (₹199 - VIP)'
        : user.plan === '99'
        ? 'ROZGAR DHAN (₹99)'
        : 'GYAN DHAN (₹29)';

    const details = [
      { label: 'PLAN ENROLLED:', value: planName },
      { label: 'JOIN NUMBER:', value: `#${user.joinNumber}` },
      {
        label: 'JOIN DATE:',
        value: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : '2025',
      },
      { label: 'PASS VALIDITY:', value: 'LIFETIME ACCESS' },
    ];

    let currentY = 345;
    details.forEach((item, index) => {
      const xPos = index % 2 === 0 ? 310 : 530;
      if (index % 2 === 0 && index > 0) currentY += 45;

      ctx.fillStyle = '#8E8E93';
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(item.label, xPos, currentY);

      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(item.value, xPos, currentY + 20);
    });

    // Right Column: Verification QR Code
    const qrX = 760;
    const qrY = 160;
    const qrSize = 175;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);

    const verifyUrl = `${window.location.origin}/?page=verify&id=${user.kuberId}`;
    const qrUri = generateQRCodeDataUri(verifyUrl, qrSize);
    const qrImg = new Image();
    await new Promise((resolve) => {
      qrImg.onload = () => resolve(true);
      qrImg.onerror = () => resolve(false);
      qrImg.src = qrUri;
    });
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Scan to verify caption
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN TO VERIFY ID', qrX + qrSize / 2, qrY + qrSize + 24);

    // Status Badge
    const statusColor =
      user.status === 'approved'
        ? '#22C55E'
        : user.status === 'pending'
        ? '#EAB308'
        : '#EF4444';
    const statusText =
      user.status === 'approved'
        ? '✓ OFFICIALLY VERIFIED'
        : user.status === 'pending'
        ? '⏳ PENDING APPROVAL'
        : 'REJECTED';

    ctx.fillStyle = '#171717';
    ctx.fillRect(qrX - 10, qrY + qrSize + 36, qrSize + 20, 32);
    ctx.strokeStyle = statusColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(qrX - 10, qrY + qrSize + 36, qrSize + 20, 32);

    ctx.fillStyle = statusColor;
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(statusText, qrX + qrSize / 2, qrY + qrSize + 57);

    // Bottom Bar
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#4A3B12';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 520);
    ctx.lineTo(960, 520);
    ctx.stroke();

    ctx.fillStyle = '#888888';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'Official student identity pass for Railway, SSC & Govt study hubs. Non-transferable & strictly non-editable.',
      50,
      555
    );
    ctx.fillText(
      'KUBER Dhan ke Devta • Patna (Bihar) Central Cell • Verification: kuber.edu.in/verify',
      50,
      575
    );

    // Director Signature Block
    ctx.textAlign = 'right';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 14px "Cinzel", serif';
    ctx.fillText('DIRECTOR OF ACADEMICS', 950, 555);
    ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#A3A3A3';
    ctx.fillText('KUBER Educational Foundation', 950, 575);
  } else {
    // ----------------- BACK SIDE -----------------
    // Header Ribbon (Gold Foil Gradient)
    const headerGrad = ctx.createLinearGradient(40, 40, 960, 110);
    headerGrad.addColorStop(0, '#B38714');
    headerGrad.addColorStop(0.3, '#FFDF73');
    headerGrad.addColorStop(0.7, '#D4AF37');
    headerGrad.addColorStop(1, '#8A660B');
    ctx.fillStyle = headerGrad;
    ctx.fillRect(40, 36, 920, 80);

    // Back Header
    ctx.fillStyle = '#0A0A0A';
    ctx.font = '900 28px Cinzel, serif, "Times New Roman"';
    ctx.textAlign = 'center';
    ctx.fillText('KUBER - KNOWLEDGE UNIVERSE FOR BUSINESS, EARNING & REWARDS', 500, 72);

    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('धन के देवता • EVERY INDIAN TRUSTS + REMEMBERS', 500, 96);

    // Content Body: Rules & Terms
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFDF73';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('TERMS OF MEMBERSHIP & IDENTITY PROTOCOL:', 60, 150);

    const rules = [
      '1. This KUBER Identity Pass is permanent, non-transferable, and authenticated in the National Student Registry.',
      `2. Non-editable unique student key [${user.kuberId}] cannot be forged, duplicated, or altered.`,
      '3. Instant real-time validity can be confirmed 24/7 by scanning the QR code on the front.',
      '4. Grants lifetime access to exam repeat question vaults, AI resume builders, and scholarship mock tests.',
      '5. Student affiliate rewards and payouts are settled directly to official UPI under program guidelines.',
    ];

    let ruleY = 185;
    ctx.fillStyle = '#D1D5DB';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    rules.forEach((rule) => {
      ctx.fillText(rule, 60, ruleY);
      ruleY += 32;
    });

    // Inset Box: Office & Helpline Contacts
    ctx.fillStyle = '#141414';
    ctx.fillRect(60, 355, 540, 140);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 355, 540, 140);

    ctx.fillStyle = '#FFDF73';
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PATNA CENTRAL HEADQUARTERS & GRIEVANCE CELL:', 80, 385);

    ctx.fillStyle = '#E5E7EB';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('• Address: Kankarbagh Main Rd, Opp. Rajendra Nagar Terminal, Patna, Bihar — 800020', 80, 412);
    ctx.fillText('• Student Helpline & WhatsApp: +91 94701 XXXXX (10 AM - 7 PM IST)', 80, 435);
    ctx.fillText('• Official Support Desk: support@kuber.edu.in', 80, 458);
    ctx.fillText('• Official UPI Account: 8877490845@spicepay (Payee: Vikas Kumar - VERIFIED)', 80, 480);

    // Right Side: Seal & Barcode Graphic
    ctx.fillStyle = '#111111';
    ctx.fillRect(630, 355, 310, 140);
    ctx.strokeStyle = '#44340E';
    ctx.lineWidth = 1;
    ctx.strokeRect(630, 355, 310, 140);

    // Gold Holographic Seal Mock
    ctx.beginPath();
    ctx.arc(710, 425, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#2A2008';
    ctx.fill();
    ctx.strokeStyle = '#FFDF73';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFDF73';
    ctx.font = 'bold 10px "Cinzel", serif';
    ctx.fillText('KUBER', 710, 415);
    ctx.fillText('OFFICIAL', 710, 427);
    ctx.fillText('SEAL', 710, 439);

    // Barcode Mock
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(780, 385, 140, 50);
    ctx.fillStyle = '#000000';
    for (let bx = 788; bx < 912; bx += 4) {
      if ((bx % 7 !== 0 && bx % 9 !== 0) || bx % 5 === 0) {
        ctx.fillRect(bx, 390, 2.5, 40);
      }
    }
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '10px monospace';
    ctx.fillText(user.kuberId, 850, 452);

    // Bottom Gold Line & Footer
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#4A3B12';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 520);
    ctx.lineTo(960, 520);
    ctx.stroke();

    ctx.fillStyle = '#888888';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'KUBER — Knowledge Universe for Business, Earning & Rewards. Bihar & National Academic Registry.',
      50,
      555
    );
    ctx.fillText(
      'If found lost, please return to any Indian Railways information counter or send to Patna Cell.',
      50,
      575
    );

    ctx.textAlign = 'right';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 14px "Cinzel", serif';
    ctx.fillText('CONTROLLER OF EXAMINATIONS', 950, 555);
    ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#A3A3A3';
    ctx.fillText('KUBER National Academic Board', 950, 575);
  }

  return canvas.toDataURL('image/png');
}

/**
 * Initiates download of the generated ID card PNG (Front, Back, or Both)
 */
export async function downloadIdCard(
  user: KuberUser,
  side: 'front' | 'back' = 'front'
): Promise<void> {
  const dataUrl = await generateIdCardCanvas(user, side);
  const link = document.createElement('a');
  link.download = `KUBER_ID_${user.kuberId}_${side.toUpperCase()}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
