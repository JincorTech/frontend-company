import { FormFields } from '../../containers/auth/ConfirmPasswordForm'
import createValidation from '../../utils/validate'
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
export const validate = createValidation({
  verificationCode: [number(), length(6)]
})