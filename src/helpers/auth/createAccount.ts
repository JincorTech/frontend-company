import { FormFields } from '../../containers/auth/CreateAccountForm'
import createValidation from '../../utils/validate'
import { required, email, password } from '../../utils/validators'

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
 */
export const validate = createValidation({
  firstName: required(),
  lastName:  required(),
  position:  required(),
  email:     email(),
  password:  password()
})