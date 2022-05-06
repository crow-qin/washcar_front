const TOKEN = 'c_token';
const USER = 'c_user';

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN) || '';
}

export function removeItem(keys) {
  if (Array.isArray(keys)) {
    keys.map(key => {
      localStorage.removeItem(key);
    });
  }
}

export function clearCookies() {
  removeItem([TOKEN, USER]);
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER)) || {};
}

export function setUser(val) {
  localStorage.setItem(USER, JSON.stringify(val));
}