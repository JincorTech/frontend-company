/**const body = {
  legalName: "Jincor",
  profile: {
    brandName: {
      en: "My english brand name",
      ru: "Мое русское брендовое имя!"
    },
    links: [
      {
        name: "facebook",
        value: "http://facebook.com"
      },
      {
        name: 'instagram',
        value: 'http://instagram.com'
      }
    ],
    email: "admin@jincor.com",
    phone: "+7 999 229 39 33",
    address: {
      country: "48250cc0-4e7f-4d23-a001-7cbf6e74f3b6",
      city: null,
      formattedAddress: "Пироговый переулок, 5, оф. 15"
    },
    economicalActivityTypes: [
      "4fd8a48e-61c9-4807-a594-a7e0898fde9f",
      "8ae67a40-295d-44e3-84b8-16bf4411cf48",
      "78dec4f3-93b3-45d9-8b5d-09c382e21bc9"
    ],
    companyType: "cc5f7c5f-60c7-4afc-afa6-bb3b6206d21d",
    picture: null
  }
}*/
import { Company } from '../../redux/modules/profile/profileView'
import { FormFields } from '../../containers/profile/ProfileEdit'


export function req(payload) {
  const { name: legalName, email, phone, description, activityTypes: economicalActivityTypes, socialLinks, upload: picture } = payload
  const links = socialLinks.map(link => ({ name: '', value: link })) // TODO name should be NULL

  return {
    legalName,
    profile: {
      picture,
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
    upload,
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