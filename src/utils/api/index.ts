import 'whatwg-fetch';
import { pathCreator, checkHttpStatus, parseJSON, authHeader } from './helpers';
import * as i18n from 'i18next';

/**
 * Fetch wrapper function
 *
 * @param   path    - api endpoint
 * @param   options - fetch options
 * @returns         - promise
 */
function apiFetch(path: string, sign: boolean = true, options: RequestInit = {}): Promise<Response> {
  return fetch(pathCreator(path), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Locale': i18n.language,
      ...authHeader(sign)
    },
    ...options
  })
    .then(checkHttpStatus)
    .then(parseJSON);
}

/**
 * Fetch wrapper for GET requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function get(path: string, sign: boolean = true): Promise<Response> {
  return apiFetch(path, sign, {
    method: 'GET'
  });
}

/**
 * Fetch wrapper for POST requests
 *
 * @param path - endpoint
 * @param body - POST request body
 * @return     - promise
 */
export function post<T>(path: string, body: T, sign: boolean = true): Promise<Response> {
  return apiFetch(path, sign, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

/**
 * Fetch wrapper for PUT requests
 *
 * @param  path - endpoint
 * @param  body - PUT request body
 * @return      - promise
 */
export function put<T>(path: string, body: T, sign: boolean = true): Promise<Response> {
  return apiFetch(path, sign, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

/**
 *  Fetch wrapper for DELETE requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function del(path: string, sign: boolean = true): Promise<Response> {
  return apiFetch(path, sign, {
    method: 'DELETE'
  });
}
