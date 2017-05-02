import { FormFields } from '../../containers/common/ProfileCard/components/ProfileEdit'
import createValidatation from '../../utils/validate'
import { required } from '../../utils/validators'


export type ErrorMessages = {
  firstName?: string,
  lastName?: string,
  position?: string
}

export const initialValues: FormFields = {
  avatar: '',
  firstName: '',
  lastName: '',
  position: ''
}

export const validate = createValidatation({
  firstName: required(),
  lastName: required(),
  position: required()
})