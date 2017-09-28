import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { routes } from '../../../routes';
import { Link } from 'react-router';
import { translate } from 'react-i18next';

import { Company } from '../../../redux/modules/profile/profileView';
import { AuthProps } from '../../../redux/modules/app/app';

import CompanyLogo from '../../../components/profile/CompanyLogo';
import InfoItem from '../../../components/profile/InfoItem';
import SocialLink, { LinkProps } from '../../../components/profile/SocialLink';
import ContactItem from '../../../components/profile/ContactItem';
import Text from '../../../components/profile/Text';

export type Props = {
  company: Company
  auth: AuthProps
  openCompanyCard: (company: Company) => void,
  t: Function
};

const CompanyInfo: SFC<Props> = (props) => {
  const { t, company, auth, openCompanyCard } = props;

  const { legalName, employeesCount, profile, economicalActivityTypes, companyType } = company;
  const { picture, links, email, phone, address, description } = profile;

  const city = address.city ? address.city.name : '';
  const country = address.country ? address.country.name : '';

  return (
    <div styleName="company-profile">
      <div styleName="company-logo">
        <CompanyLogo src={picture} />
      </div>

      <div styleName="company-info">
        <h1 styleName="company-name">{legalName}</h1>

        <InfoItem title={t('region')}>
          <p styleName="value">{city ? `${country}, ${city}` : country}</p>
        </InfoItem>

        <InfoItem title={t('companyType')}>
          <p styleName="value">{companyType.name}</p>
        </InfoItem>

        <InfoItem title={t('companyDescription')}>
          {description
            ? <Text styleName="company-desc" value={description}/>
            : <div styleName="empty-value">{t('empty')}</div>
          }
        </InfoItem>

        <InfoItem title={t('activityAreas')}>
          {economicalActivityTypes.length
            ? <ul styleName="activities">
              {economicalActivityTypes.map((activity, i) => <li styleName="activity" key={i}>{activity.name}</li>)}
            </ul>
            : <div styleName="empty-value">{t('empty')}</div>}
        </InfoItem>

        <div styleName="contacts-block">
          <InfoItem styleName="social" title={t('links')}>
            {links.length
              ? <ul styleName="social-links">
                {links.map((social, i) => <SocialLink {...social} key={i}/>)}
              </ul>
              : <div styleName="empty-value">{t('empty')}</div>}
          </InfoItem>

          <InfoItem styleName="contacts" title={t('contacts')}>
            {phone && <ContactItem type="phone" value={phone}/>}
            {email && <ContactItem type="email" value={email}/>}
            {email || phone ? '' : <div styleName="empty-value">{t('empty')}</div>}
          </InfoItem>
        </div>
      </div>

      <div styleName="controls-block">
        {auth.admin && <Link to={routes.profileEdit} styleName="edit-button">{t('edit')}</Link>}

        <a
          onClick={() => openCompanyCard(company)}
          styleName="company-link"
          children={t('viewAsCard')}/>

        <Link to={routes.employees} styleName="company-link">{t('employees')} ({employeesCount})</Link>
      </div>
    </div>
  );
};

export default translate('profile')(CSSModules(CompanyInfo, require('./styles.css')));
