import { Company } from '../../redux/modules/profile/profileView'
import { FormFields } from '../../containers/profile/ProfileEdit'


export function req(payload) {
  const {
    name: legalName,
    email,
    phone,
    description,
    activityTypes: economicalActivityTypes,
    socialLinks,
    upload: picture,
    city,
    country
  } = payload

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
      economicalActivityTypes,
      address: {
        formattedAddress: '',
        city,
        country
      }
    }
  }
}


export function profileFormFields(company: Company): FormFields {
  const { legalName: name, profile, economicalActivityTypes, companyType: { id: type } } = company
  const { picture: upload, email, phone, description, links, address } = profile
  const { country: { id: country }, city } = address
  const activityTypes = economicalActivityTypes.map(({ id }) => id)
  const socialLinks = links.map(({ value }) => value)

  return {
    upload: '',
    name,
    country,
    city: city ? city.id : '',
    type,
    description,
    activityTypes,
    socialLinks,
    email,
    phone
  }
}