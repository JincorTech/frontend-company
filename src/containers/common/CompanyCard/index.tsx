import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'
import { openCompanyCard, closeCompanyCard, flipCompanyCard } from '../../../redux/modules/common/companyCard'

import { LinkProps } from '../../../components/profile/SocialLink'
import Popup from '../../../components/common/FullscreenPopup'
import Button from '../../../components/common/Button'
import Icon from '../../../components/common/Icon'


export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = HTMLProps<HTMLDivElement> & {
  company: CompanyInfo
}

export type CompanyInfo = {
  logo: string,
  name: string,
  type: string,
  region: string,
  email: string,
  phone: string,
  activities: any,
  socialLinks: LinkProps[],
  description: string
}

export type StateProps = {
  open: boolean
}

export type DispatchProps = {
  openCompanyCard: () => void,
  closeCompanyCard: () => void
}

/**
 * CompanyCard
 */
const CompanyCard: SFC<Props> = props => {
  const { open, company, closeCompanyCard } = props
  const { logo, name, region, description, email, phone, activities, socialLinks } = company

  return (
    <Popup
      styleName="company-card"
      modalId="comapny-card"
      open={open}
      onClose={closeCompanyCard}>

      <div styleName="top">
        <div styleName="logo">
          <img src="http://www.designbolts.com/wp-content/uploads/2016/09/fresh-creative-logo-design-2017-4.jpg"/>
        </div>
        <div styleName="title">
          <div styleName="inner">
            <div styleName="name">Sumitomo Mitsui Finance and Leasing </div>
            <span styleName="address">Moscow, Russian Federation</span>
            <div styleName="buttons">
              <Button styleName="transparent-button">Написать</Button>
              <button styleName="bookmark" type="button"><Icon styleName="icon" name="bookmark"/></button>
            </div>
          </div>
        </div>
      </div>

      <div styleName="bottom">
        <div styleName="about">
          <p>АО «Тинькофф Банк» — российский моноофисный банк, подконтрольный бизнесмену Олегу Тинькову. Ключевые сегменты, в которых работает данное финансовое учреждение, — кредитные карты и вклады частных лиц. С недавних пор Тинькофф банк обслуживает также и юридических лиц. Основная особенность банка на рынке банкинга — дистанционная работа со всеми клиентами с использованием современных каналов связи и через представителей.</p>
        </div>

        <div styleName="info">
          <ul styleName="list">
            <li><Icon styleName="icon" name="company-type"/>Публичная компания</li>
            <li><Icon styleName="icon" name="activity"/>Банковские услуги</li>
            <li><Icon styleName="icon" name="activity"/>Страхование</li>
            <li><Icon styleName="icon" name="activity"/>Инвестиции</li>
            <li><Icon styleName="icon" name="phone"/>+7 495 002 93 90</li>
            <li><Icon styleName="icon" name="email"/>contact@alfa-bank.ru</li>
          </ul>

          <div styleName="socials">
            <a href="javascript:void(0)"><Icon name="social-url"/></a>
            <a href="javascript:void(0)"><Icon name="social-instagram"/></a>
            <a href="javascript:void(0)"><Icon name="social-facebook"/></a>
            <a href="javascript:void(0)"><Icon name="social-twitter"/></a>
          </div>
        </div>
      </div>
    </Popup>
  )
}

const StyledComponent = CSSModules(CompanyCard, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.common.companyCard,
  {
    openCompanyCard,
    closeCompanyCard,
    flipCompanyCard
  }
)(StyledComponent)