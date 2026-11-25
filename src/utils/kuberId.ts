import { PlanType } from '../types';

/**
 * Extracts student initials: First letter of First Name + First letter of Last Name.
 * Example: 'Rahul Kumar' -> 'RK', 'Aryan Kumar' -> 'AK'
 */
export function extractInitials(fullName: string): string {
  const clean = fullName.trim().toUpperCase().replace(/[^A-Z\s]/g, '');
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return 'ST'; // Student Default
  }

  if (parts.length === 1) {
    const single = parts[0];
    if (single.length >= 2) {
      return single.slice(0, 2);
    }
    return `${single}X`;
  }

  const firstLetter = parts[0][0];
  const lastLetter = parts[parts.length - 1][0];
  return `${firstLetter}${lastLetter}`;
}

/**
 * Formats join number with leading zero (01, 02... 15, 99, 100...)
 */
export function formatJoinNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Constructs the permanent, non-editable KUBER ID:
 * Format: KUBER[PLAN][INITIALS][JOIN_NO]
 * E.g., KUBER29RK01, KUBER99AK15, KUBER199VK01
 */
export function constructKuberId(plan: PlanType, fullName: string, joinNumber: number): string {
  const initials = extractInitials(fullName);
  const formattedCount = formatJoinNumber(joinNumber);
  return `KUBER${plan}${initials}${formattedCount}`;
}

/**
 * Validates a KUBER ID format
 * Supports both new locked format KUBER29RK01 and legacy KB29RK01
 */
export function isValidKuberId(id: string): boolean {
  if (!id) return false;
  const clean = id.trim().toUpperCase();
  const regex = /^(KUBER|KB)(29|99|199)[A-Z]{2}[0-9]+$/;
  return regex.test(clean);
}

/**
 * Parses components of a KUBER ID
 */
export function parseKuberId(id: string): { plan: PlanType; initials: string; joinNumber: number; brandPrefix: string } | null {
  if (!isValidKuberId(id)) return null;
  const clean = id.trim().toUpperCase();
  const match = clean.match(/^(KUBER|KB)(29|99|199)([A-Z]{2})([0-9]+)$/);
  if (!match) return null;

  const brandPrefix = match[1];
  const plan = match[2] as PlanType;
  const initials = match[3];
  const joinNumber = parseInt(match[4], 10);

  return { plan, initials, joinNumber, brandPrefix };
}
