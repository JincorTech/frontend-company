import { FormFields } from '../../containers/auth/RequestPasswordForm'
import { email as emailValidator } from '../../utils/validators'

export type ErrorMassages = {
  email?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    email: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMassages {
    const { email } = values

    const errors: ErrorMassages = {
        email: emailValidator(email)
    }

    return errors
}