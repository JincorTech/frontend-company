import { FormFields } from '../../containers/common/ProfileCard/components/ChangePassword'
import { required, password as passwordValidator } from '../../utils/validators'

export type ErrorMessages = {
  oldPassword?: string,
  password?: string
}


export const initialValues: FormFields = {
  oldPassword: '',
  password: ''
}


export const validate = (values: FormFields): ErrorMessages => {
  const { oldPassword, password } = values

  const errors: ErrorMessages = {
    oldPassword: passwordValidator(oldPassword),
    password: passwordValidator(password)
  }

  return errors
}