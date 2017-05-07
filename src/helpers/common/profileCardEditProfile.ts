import { ProfileFields } from '../../redux/modules/app/profileCard'


export function profileCardFormFields(profile): ProfileFields {
  return { ...profile, avatar: '' }
}