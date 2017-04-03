

export function required(value: string, msg?: string): string {
    return !!value
        ? ''
        : msg || 'required'
}

export function minLength(value: string, limit: number, msg?: string): string {
    return limit && value && value.length >= limit
        ? ''
        : msg || `minLength ${limit}`
}

export function maxLength(value: string, limit: number, msg?: string): string {
    return limit && value && value.length <= limit
        ? ''
        : msg || `minLength ${limit}`
}

export function length(value: string, prop: number, msg?: string): string {
    return value && prop && value.length === prop
        ? ''
        : msg || `length ${prop}`

}

export function email(value: string, msg?: string): string {
    return value && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
    ? ''
    : msg || 'invalid email'
}

export function password(value: string, msg?: string): string {
    return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(value)
    ? ''
    : msg || 'incorrect password'
}

export function number(value: string): string {
  return value && /^\d+$/.test(value)
    ? ''
    : 'not number'
}
