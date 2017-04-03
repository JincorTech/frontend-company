import { FormFields } from '../../containers/auth/LoginForm'
import { email as emailValidator, password as passwordValidator } from '../../utils/validators'

export type ErrorMessages = {
  email?: string
  password?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    email: '',
    password: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMessages {
    const { email, password } = values

    const errors: ErrorMessages = {
        email: emailValidator(email),
        password: passwordValidator(password)
    }

    return errors
}