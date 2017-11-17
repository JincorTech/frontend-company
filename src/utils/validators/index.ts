import { t } from 'i18next';

export type Validator = (value: string) => string;

export function required(msg?: string): Validator {
  return (value: string): string => !(!value)
    ? ''
    : msg || t('validate:required');
}

export function minLength(limit: number, msg?: string): Validator {
  return (value: string): string => limit && value && value.length >= limit
    ? ''
    : msg || t('validate:minLength', { limit: limit });
}

export function maxLength(limit: number, msg?: string): Validator {
  return (value: string): string => limit && value && value.length <= limit
    ? ''
    : msg || t('validate:maxLength', { limit: limit });
}

export function length(prop: number, msg?: string): Validator {
  return (value: string): string => value && prop && value.length === prop
    ? ''
    : msg || t('validate:length', { length: prop });
}

const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export function email(msg?: string): Validator {
  return (value: string): string => value && EMAIL_REGEXP.test(value)
    ? ''
    : msg || t('validate:invalidEmail');
}

const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

export function password(msg?: string): Validator {
  return (value: string): string => value && PASSWORD_REGEXP.test(value)
    ? ''
    : msg || t('validate:incorrectPassword');
}

const NUMBER_REGEXP = /^\d+$/;

export function number(msg?: string): Validator {
  return (value: string): string => value && NUMBER_REGEXP.test(value)
    ? ''
    : msg || t('validate:notNumber');
}
