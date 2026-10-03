export const AUTH_USER_NAME_STORAGE_KEY = "e-cerapan-user-name";

export function subscribeToAuthUserName(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function getAuthUserNameSnapshot() {
  return localStorage.getItem(AUTH_USER_NAME_STORAGE_KEY) ?? "";
}

export function getServerAuthUserNameSnapshot() {
  return "";
}
