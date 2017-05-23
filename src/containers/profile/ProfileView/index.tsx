import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { fetchCompany, Company as CompanyProps } from '../../../redux/modules/profile/profileView'

import CompanyLogo from '../../../components/profile/CompanyLogo'
import InfoItem from '../../../components/profile/InfoItem'
import SocialLink, { LinkProps } from '../../../components/profile/SocialLink'
import ContactItem from '../../../components/profile/ContactItem'
import Text from '../../../components/profile/Text'


export type Props = DispatchProps & StateProps

export type StateProps = {
  company: CompanyProps
}

export type DispatchProps = {
  fetchCompany: () => void
  openCompanyCard: (company: CompanyProps) => void
}


class CompanyProfile extends Component<Props, StateProps> {
  private componentDidMount(): void {
    this.props.fetchCompany()
  }

  public render(): JSX.Element {
    const { openCompanyCard, company } = this.props
    const { legalName, profile, economicalActivityTypes, companyType } = company
    const { picture, links, email, phone, address, description } = profile
    const city = address.city ? address.city.name : ''
    const country = address.country ? address.country.name : ''

    return (
      <div styleName="company-profile">
        <div styleName="company-logo">
          <CompanyLogo src={picture} />
        </div>

        <div styleName="company-info">
          <h1 styleName="company-name">{legalName}</h1>

          <InfoItem title="Регион">
            <p styleName="value">{city ? `${country}, ${city}` : country}</p>
          </InfoItem>

          <InfoItem title="Тип компании">
            <p styleName="value">{companyType.name}</p>
          </InfoItem>

          <InfoItem title="Описание компании">
            {description
              ? <Text styleName="company-desc" value={description}/>
              : <div styleName="empty-value">Не заполнено</div>
            }
          </InfoItem>

          <InfoItem title="Сферы деятельности">
            {economicalActivityTypes.length
              ? <ul styleName="activities">
                {economicalActivityTypes.map((activity, i) => <li styleName="activity" key={i}>{activity.name}</li>)}
              </ul>
              : <div styleName="empty-value">Не заполнено</div>}
          </InfoItem>

          <div styleName="contacts-block">
            <InfoItem styleName="social" title="Ссылки">
              {links.length
                ? <ul styleName="social-links">
                  {links.map((social, i) => <SocialLink {...social} key={i}/>)}
                </ul>
                : <div styleName="empty-value">Не заполнено</div>}
            </InfoItem>

            <InfoItem styleName="contacts" title="Контакты">
              {phone && <ContactItem type="phone" value={phone}/>}
              {email && <ContactItem type="email" value={email}/>}
              {email || phone ? '' : <div styleName="empty-value">Не заполнено</div>}
            </InfoItem>
          </div>
        </div>

        <div styleName="controls-block">
          <Link to="/app/profile/edit" styleName="edit-button">Редактировать</Link>

          <a
            onClick={() => openCompanyCard(company)}
            styleName="company-link"
            children="Посмотреть в виде карточки"/>

          <Link to="/app/employees" styleName="company-link">Сотрудники (5)</Link>
        </div>
      </div>
    )
  }
}


const StyledComponent = CSSModules(CompanyProfile, require('./styles.css'))
export default connect<StateProps, DispatchProps, {}>(
  ({ profile: { profileView }}) => profileView,
  { openCompanyCard, fetchCompany }
)(StyledComponent)
