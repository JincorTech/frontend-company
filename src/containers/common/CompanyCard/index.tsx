import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { connect } from 'react-redux';
import * as CSSModules from 'react-css-modules';

import { closeCompanyCard } from '../../../redux/modules/common/companyCard';
import { Company as CompanyProps } from '../../../redux/modules/profile/profileView';

import { LinkProps } from '../../../components/profile/SocialLink';
import Popup from '../../../components/common/FullscreenPopup';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import SocialLink from '../../../components/profile/SocialLink';
import CompanyLogo from '../../../components/profile/CompanyLogo';

import stringCut from '../../../helpers/common/stringCut';

export type Props = StateProps & DispatchProps;

export type StateProps = {
  open: boolean
  company: CompanyProps
};

export type DispatchProps = {
  closeCompanyCard: () => void
};

/**
 * CompanyCard
 */
const CompanyCard: SFC<Props> = props => {
  const { open, company, closeCompanyCard } = props;
  const { legalName, profile, economicalActivityTypes, companyType } = company;
  const { picture, links, email, phone, address, description } = profile;
  const city = address.city ? address.city.name : '';
  const country = address.country ? address.country.name : '';

  return (
    <Popup
      styleName="company-card"
      modalId="company-card"
      open={open}
      onClose={closeCompanyCard}>

      <div styleName="top">
        <div styleName="logo">
          <CompanyLogo src={picture}/>
        </div>
        <div styleName="title">
          <div styleName="inner">
            <div styleName="name">{stringCut(legalName, 30)}</div>
            <span styleName="address">{city ? `${country}, ${city}` : country}</span>
            <div styleName="buttons">
              <Button styleName="transparent-button">Написать</Button>
              <button styleName="bookmark" type="button"><Icon styleName="bookmark-icon" name="bookmark"/></button>
            </div>
          </div>
        </div>
      </div>

      <div styleName={description ? 'bottom' : 'bottom-small'}>
        {description &&
        <div styleName="about">
          <p>{description}</p>
        </div>}

        <div styleName="info">
          <ul styleName="activities">
            <li styleName="item"><div styleName="company-icon"/>{companyType.name}</li>

            {economicalActivityTypes.length
              ? economicalActivityTypes.map((activity, i) =>
                <li styleName="item" key={i}><div styleName="activity-icon"/>{activity.name}</li>)
              : <li styleName="item-empty"><div styleName="activity-icon"/>Отрасли не указаны</li>}

            {phone
              ? <li styleName="item"><div styleName="phone-icon"/>{phone}</li>
              : <li styleName="item-empty"><div styleName="phone-icon"/>Телефон не указан</li>}

            {email
              ? <li styleName="item"><div styleName="email-icon"/>{email}</li>
              : <li styleName="item-empty"><div styleName="email-icon"/>Email не указан</li>}
          </ul>

          <div styleName="socials">
            {Boolean(links.length) &&
            <ul>
              {links.map((social, i) => <SocialLink styleName="social" displayName={false} size={40} {...social} key={i}/>)}
            </ul>}
          </div>
        </div>
      </div>
    </Popup>
  );
};

const StyledComponent = CSSModules(CompanyCard, require('./styles.css'));

export default connect<StateProps, DispatchProps, {}>(
  (state) => state.common.companyCard,
  { closeCompanyCard }
)(StyledComponent);
