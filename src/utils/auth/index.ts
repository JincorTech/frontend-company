import * as jwtDecode from 'jwt-decode';

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string {
  return localStorage.getItem('token') || '';
}

export function getEmail(): string {
  const token = getToken();

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.login.split(':')[1];
    } catch (e) {
      removeToken();
      return '';
    }
  }

  return null;
}

export function isAuth(): boolean {
  const token = getToken();

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const expireDate = parseInt(decoded.exp, 10);

      const isValid = Date.now() < expireDate * 1000;
      if (!isValid) {
        removeToken();
      }

      return isValid;
    } catch (e) {
      removeToken();
      return false;
    }
  } else {
    return false;
  }
}

export function isAdmin(): boolean {
  const token = getToken();

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.scope === 'company-admin';
    } catch (e) {
      removeToken();
      return false;
    }
  } else {
    return false;
  }
}

export function removeToken(): void {
  localStorage.removeItem('token');
}
