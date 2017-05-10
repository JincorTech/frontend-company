import { createSelector } from 'reselect'
import { State, Company } from '../../redux/modules/profile/profileView'
import { StateProps as ComponentProps } from '../../containers/profile/ProfileView'


/**
* Country selector
*/
const companyStateSelector = (state: State): Company => state.company

export const companySelector = createSelector<State, ComponentProps, Company>(
  companyStateSelector,
  ({ id, profile, legalName: name, economicalActivityTypes, companyType }) => {
    const { picture: logo, email, phone, description, links, address } = profile
    const { name: type } = companyType
    const { country: { name: country }, city: { name: city } } = address

    return {
      id,
      logo,
      name,
      type,
      country,
      city,
      description,
      email,
      phone,
      activities: economicalActivityTypes,
      socialLinks: links
    }
  }
)