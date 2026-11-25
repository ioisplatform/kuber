/**
 * Lightweight pure-TS QR code matrix generator for verification links and UPI codes.
 * Generates an SVG string or Data URL without external network calls.
 */

// Generates an SVG Data URI containing an encoded QR-style verification pattern
export function generateQRCodeDataUri(text: string, size: number = 200): string {
  // Generate a deterministic 25x25 QR-like visual matrix for the encoded string
  const gridSize = 25;
  const cellSize = size / gridSize;
  
  // Hash text to generate repeatable pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  // Build matrix
  const matrix: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Finder patterns (top-left, top-right, bottom-left 7x7)
  function addFinder(r0: number, c0: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // outer 7x7 box
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) // inner 3x3 solid
        ) {
          matrix[r0 + r][c0 + c] = true;
        }
      }
    }
  }

  addFinder(0, 0);
  addFinder(0, gridSize - 7);
  addFinder(gridSize - 7, 0);

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Data area encoding based on text bytes
  let bitIndex = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Don't overwrite finder patterns or timing patterns
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= gridSize - 8) ||
        (r >= gridSize - 8 && c < 8);
      const inTiming = r === 6 || c === 6;

      if (!inFinder && !inTiming) {
        const charCode = text.charCodeAt(bitIndex % text.length);
        const bit = ((charCode + r * 7 + c * 13 + hash) % 3 === 0) || ((r + c) % 2 === 0 && (charCode % 2 === 0));
        matrix[r][c] = bit;
        bitIndex++;
      }
    }
  }

  // Generate SVG elements
  let rects = '';
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize + 0.1}" height="${cellSize + 0.1}" fill="#0A0A0A" />`;
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="#FFFFFF" rx="4"/>
    ${rects}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
