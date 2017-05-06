import { Company } from '../../redux/modules/profile/profileView'
import { FormFields } from '../../containers/profile/ProfileEdit'


export function req(payload) {
  const { name: legalName, email, phone, description, activityTypes: economicalActivityTypes, socialLinks, upload: picture } = payload
  const links = socialLinks.map(link => ({ name: '', value: link })) // TODO name should be NULL

  const upload = picture === '' ? {} : { picture }

  return {
    legalName,
    profile: {
      ...upload,
      email,
      phone,
      description,
      links,
      economicalActivityTypes
    }
  }
}


export function profileFormFields(company: Company): FormFields {
  const { legalName: name, profile, economicalActivityTypes, companyType: { id: type } } = company
  const { picture: upload, email, phone, description, links, formattedAddress } = profile
  const { country: { id: country }, city } = formattedAddress
  const activityTypes = economicalActivityTypes.map(({ id }) => id)
  const socialLinks = links.map(({ value }) => value)

  return {
    upload: '',
    name,
    country,
    city,
    type,
    description,
    activityTypes,
    socialLinks,
    email,
    phone
  }
}