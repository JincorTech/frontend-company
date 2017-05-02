import { FormFields } from '../../containers/auth/NewPasswordForm'
import createValidation from '../../utils/validate'
import { password } from '../../utils/validators'

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
 */
export const validate = createValidation({
  password: password()
})