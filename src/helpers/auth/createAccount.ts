import { FormFields } from '../../containers/auth/CreateAccountForm'
import { required, email as emailValidator, password as passwordValidator } from '../../utils/validators'

export type ErrorMessages = {
  lastName?: string
  firstName?: string
  position?: string
  email?: string
  password?: string
  verificationId?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
    lastName: '',
    firstName: '',
    position: '',
    email: '',
    password: '',
    verificationId: ''
}

/**
 * Redux form sync validation
 * @param values - form fields
 */
export function validate(values: FormFields): ErrorMessages {
    const { firstName, lastName, position, email, password } = values

    const errors: ErrorMessages = {
        firstName: required(firstName),
        lastName: required(lastName),
        position: required(position),
        email: emailValidator(email),
        password: passwordValidator(password)
    }

    return errors
}