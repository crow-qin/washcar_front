const TOKEN = 'token';

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN) || '';
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}

export function clearCookies() {
  removeToken();
}