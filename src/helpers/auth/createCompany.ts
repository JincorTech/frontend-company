import { FormFields } from '../../containers/auth/CreateCompanyForm'
import createValidation from '../../utils/validate'
import { required, minLength } from '../../utils/validators'

export type ErrorMessages = {
  countryId?: string
  companyType?: string
  legalName?: string
}

/**
 * Form initialValues
 */
export const initialValues: FormFields = {
  countryId: '',
  companyType: '',
  legalName: ''
}

/**
 * Redux form sync validation
 */
export const validate = createValidation({
  countryId:   required(),
  companyType: required(),
  legalName:    minLength(3),
})