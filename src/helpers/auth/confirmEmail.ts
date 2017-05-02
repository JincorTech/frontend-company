import { FormFields } from '../../containers/auth/ConfirmEmailForm'
import createValidate from '../../utils/validate'
import { length, number } from '../../utils/validators'

export type ErrorMassages = {
  verificationCode?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
  verificationCode: '',
  verificationId: ''
}

/**
 * Redux form sync validation
 */
export const validate = createValidate({
  verificationCode: [number(), length(6)]
})