import { FormFields } from '../../containers/common/ProfileCard/components/ChangePassword'
import createValidatation from '../../utils/validate'
import { required, password } from '../../utils/validators'


export type ErrorMessages = {
  oldPassword?: string,
  password?: string
}

export const initialValues: FormFields = {
  oldPassword: '',
  password: ''
}


export const validate = createValidatation({
  oldPassword: password(),
  password: password()
})