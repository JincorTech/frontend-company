import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'
import { openCompanyCard, closeCompanyCard, flipCompanyCard } from '../../../redux/modules/common/companyCard'

import { SocialLinkProps } from '../../../components/profile/SocialLink'
import Popup from '../../../components/common/Popup'
import CompanyCardFront, { CardFrontProps, ActivityType } from './components/FrontSide'
import CompanyCardBack, { CardBackProps } from './components/BackSide'

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = HTMLProps<HTMLDivElement> & {
  company: CompanyInfo
}

export type CompanyInfo = {
  logo: string
  name: string
  type: string
  region: string
  email: string
  phone: string
  activities: ActivityType[]
  socialLinks: SocialLinkProps[]
  description: string
}

export type StateProps = {
  open: boolean
  flipped: boolean
  descCollapsed: boolean
}

export type DispatchProps = {
  openCompanyCard: () => void
  closeCompanyCard: () => void
  flipCompanyCard: (value: boolean) => void
  collapseDescription: (value: boolean) => void
}

/**
 * CompanyCard
 */
const CompanyCard: SFC<Props> = (props) => {
  const {
    open,
    company,
    flipped,
    descCollapsed,
    openCompanyCard,
    closeCompanyCard,
    flipCompanyCard,
    collapseDescription
  } = props

  const {
    logo,
    name,
    region,
    description,
    email,
    phone,
    activities,
    socialLinks,
  } = company

  return (
   <div styleName={open ? 'open' : 'close'}>
      <Popup open={open} styleName="popup" onClose={closeCompanyCard}>
        <div styleName={flipped ? 'flipper-flipped' : 'flipper'}>
          <CompanyCardFront
            styleName="front"
            logo={logo}
            name={name}
            region={region}
            activities={activities}
            socialLinks={socialLinks}
            email={email}
            phone={phone}
            onFlip={() => flipCompanyCard(!flipped)}/>

          <CompanyCardBack
            styleName="back"
            description={description}
            collapsed={descCollapsed}
            socialLinks={socialLinks}
            onCollapse={() => collapseDescription(!descCollapsed)}
            onFlip={() => flipCompanyCard(!flipped)}/>
        </div>
      </Popup>
    </div>
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