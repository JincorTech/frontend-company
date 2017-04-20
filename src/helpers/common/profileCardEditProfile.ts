import { FormFields } from '../../containers/common/ProfileCard/components/ProfileEdit'
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


export const validate = (values: FormFields): ErrorMessages => {
  const { firstName, lastName, position } = values

  const errors: ErrorMessages = {
    firstName: required(firstName),
    lastName: required(lastName),
    position: required(position)
  }

  return errors
}