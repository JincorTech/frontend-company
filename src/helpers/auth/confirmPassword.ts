import { FormFields } from '../../containers/auth/ConfirmPasswordForm'
import { length, number } from '../../utils/validators'

export type ErrorMassages = {
  verificationCode?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    verificationCode: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMassages {
    const { verificationCode } = values

    const errors: ErrorMassages = {
        verificationCode: number(verificationCode) || length(verificationCode, 6)
    }

    return errors
}