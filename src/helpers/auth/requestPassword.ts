import { FormFields } from '../../containers/auth/RequestPasswordForm'
import createValidation from '../../utils/validate'
import { email } from '../../utils/validators'

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
 */
export const validate = createValidation({
  email: email()
})