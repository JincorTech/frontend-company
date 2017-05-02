import { FormFields } from '../../containers/auth/LoginForm'
import createValidation from '../../utils/validate'
import { email, password } from '../../utils/validators'

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
 */
export const validate = createValidation({
  email:    email(),
  password: password()
})