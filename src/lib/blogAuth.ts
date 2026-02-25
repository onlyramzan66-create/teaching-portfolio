export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

const STORAGE_KEY = 'blog_admin_auth';
export const BLOG_AUTH_CHANGED_EVENT = "blog-auth-changed";

export function saveAuth(auth: AuthResponse) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  window.dispatchEvent(new Event(BLOG_AUTH_CHANGED_EVENT));
}

export function getAuth(): AuthResponse | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthResponse;
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(BLOG_AUTH_CHANGED_EVENT));
}
