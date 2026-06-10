/** Approved leadership portrait — served from public/assets/team/ */
export const LEADERSHIP_PORTRAIT_PATH = "/assets/team/burcu-simsek.jpg" as const;

export function isValidExternalUrl(value: string | undefined | null): value is string {
  if (!value || !value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
