/** Approved leadership portrait paths — first existing asset wins at runtime */
export const LEADERSHIP_PORTRAIT_CANDIDATES = [
  "/assets/team/burcu-simsek.jpg",
  "/assets/team/burcu-simsek.png",
] as const;

export function isValidExternalUrl(value: string | undefined | null): value is string {
  if (!value || !value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
