import { createSelector } from 'reselect'
import { State, Company } from '../../redux/modules/profile/profileView'
import { StateProps as ComponentProps } from '../../containers/profile/ProfileView'


/**
* Country selector
*/
const companyStateSelector = (state: State): Company => state.company

export const companySelector = createSelector<State, ComponentProps, Company>(
  companyStateSelector,
  ({ id, profile, economicalActivityTypes, companyType }) => {
    const { picture: logo, email, phone, description, links, formattedAddress } = profile
    const { name: type } = companyType
    const { country: { name: country }, city } = formattedAddress

    return {
      id,
      logo,
      name,
      type,
      region: `${country}, ${city}`,
      description,
      email,
      phone,
      activities: economicalActivityTypes,
      socialLinks: links
    }
  }
)