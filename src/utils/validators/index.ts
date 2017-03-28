/**
 * @function validator
 * @desc validation function
 *
 * @param {string} field - field name
 * @param {any} value - field value
 * @param {any} prop - validation value
 * @param {Object} formFields - all form field values
 * @param {Object} config - validation config
 * @return {boolean} - has error
 */

export function required(value: string): boolean {
    return !!value
}

export function minLength(value: string, limit: number): boolean {
    return limit && value && value.length >= limit
}

export function maxLength(value: string, limit: number): boolean {
    return limit && value && value.length <= limit
}

export function length(value: string, prop: number): boolean {
    return value && prop && value.length === prop
}

export function email(value: string): boolean {
    return value && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
}

export function password(value: string): boolean {
    return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(value)
}
