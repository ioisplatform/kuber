export const LIVE_PORTAL_URL = 'https://ioisplatform.github.io/kuber';

export function buildReferralUrl(kuberId: string): string {
  const cleanId = kuberId.trim().toUpperCase();
  return `${LIVE_PORTAL_URL}/?ref=${encodeURIComponent(cleanId)}`;
}

export function buildVerifyUrl(kuberId: string): string {
  const cleanId = kuberId.trim().toUpperCase();
  return `${LIVE_PORTAL_URL}/?page=verify&id=${encodeURIComponent(cleanId)}`;
}

export function getPortalHomeUrl(): string {
  return `${LIVE_PORTAL_URL}/`;
}
