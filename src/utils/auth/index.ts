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
    const decoded = jwtDecode(token);
    return decoded.login.split(':')[1];
  }

  return null;
}

export function isAuth(): boolean {
  const token = getToken();

  if (token) {
    const decoded = jwtDecode(token);
    const expireDate = parseInt(decoded.exp, 10);

    return Date.now() < expireDate * 1000;
  } else {
    return false;
  }
}

export function isAdmin(): boolean {
  const token = getToken();

  if (token) {
    const decoded = jwtDecode(token);

    return decoded.scope === 'company-admin';
  } else {
    return false;
  }
}

export function removeToken(): void {
  localStorage.removeItem('token');
}

// sign up

export type User = {
  verificationId: string
  firstName: string
  lastName: string
  position: string
  password: string
};

export const setUser = (user: User): void => {
  const keys = Object.keys(user);

  keys.forEach((key) => {
    localStorage.setItem(key, user[key]);
  });
};

export const getUser = (): User => {
  const verificationId = localStorage.getItem('verificationId');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const position = localStorage.getItem('position');
  const password = localStorage.getItem('password');

  return { verificationId, firstName, lastName, position, password };
};

export const removeUser = (): void => {
  localStorage.removeItem('verificationId');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('position');
  localStorage.removeItem('password');
};
