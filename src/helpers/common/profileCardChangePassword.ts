import { FormFields } from '../../containers/common/ProfileCard/components/ChangePassword'
import { required, password as passwordValidator } from '../../utils/validators'

export type ErrorMessages = {
  oldPassword?: string,
  newPassword?: string
}


export const initialValues: FormFields = {
  oldPassword: '123',
  newPassword: '123'
}


export const validate = (values: FormFields): ErrorMessages => {
  const { oldPassword, newPassword } = values

  const errors: ErrorMessages = {
    oldPassword: passwordValidator(oldPassword),
    newPassword: passwordValidator(newPassword)
  }

  return errors
}