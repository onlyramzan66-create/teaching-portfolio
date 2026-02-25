export const SUBSCRIBER_LOCAL_KEY = "subscriber_opted_in";
export const EXIT_MODAL_DISMISSED_KEY = "subscriber_exit_modal_dismissed";

export function getSubscriberOptIn() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SUBSCRIBER_LOCAL_KEY) === "1";
}

export function markSubscriberOptIn() {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUBSCRIBER_LOCAL_KEY, "1");
}

export function dismissExitModalForToday() {
  if (typeof window === "undefined") return;
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem(EXIT_MODAL_DISMISSED_KEY, String(expiresAt));
}

export function canShowExitModal() {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(EXIT_MODAL_DISMISSED_KEY);
  if (!raw) return true;
  const expiresAt = Number(raw);
  if (!Number.isFinite(expiresAt)) return true;
  return Date.now() > expiresAt;
}