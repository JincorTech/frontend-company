import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import InfoItem from '../InfoItem';

export type Props = {
  t: Function
};

const CompanyInfoPreloader: SFC<Props> = ({ t }) => (
  <div styleName="company-profile-preloader">
    <div styleName="logo" />

    <div styleName="info">
      <div styleName="name" />

      <InfoItem title={t('region')}>
        <div styleName="region"/>
      </InfoItem>

      <InfoItem title={t('companyType')}>
        <div styleName="type"/>
      </InfoItem>

      <InfoItem title={t('companyDescription')}>
        <div styleName="description"/>
        <div styleName="description"/>
        <div styleName="description"/>
      </InfoItem>

      <InfoItem title={t('activityAreas')}>
        <div styleName="activity"/>
        <div styleName="activity"/>
      </InfoItem>

      <div styleName="contacts-block">
        <InfoItem styleName="social" title={t('links')}>
          <div styleName="social-link">
            <div styleName="social-icon"/>
            <div styleName="social-desc"/>
          </div>

          <div styleName="social-link">
            <div styleName="social-icon"/>
            <div styleName="social-desc"/>
          </div>

          <div styleName="social-link">
            <div styleName="social-icon"/>
            <div styleName="social-desc"/>
          </div>
        </InfoItem>

        <InfoItem styleName="contacts" title={t('contacts')}>
          <div styleName="contact">
            <div styleName="contact-icon"/>
            <div styleName="contact-desc"/>
          </div>

          <div styleName="contact">
            <div styleName="contact-icon"/>
            <div styleName="contact-desc"/>
          </div>
        </InfoItem>
      </div>
    </div>
  </div>
);

export default translate('profile')(CSSModules(CompanyInfoPreloader, require('./styles.css')));
