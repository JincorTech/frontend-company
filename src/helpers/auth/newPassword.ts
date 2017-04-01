import { FormFields } from '../../containers/auth/NewPasswordForm'
import { password as passwordValidator } from '../../utils/validators'

export type ErrorMassages = {
  password?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    password: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMassages {
    const { password } = values

    const errors: ErrorMassages = {
        password: passwordValidator(password)
    }

    return errors
}