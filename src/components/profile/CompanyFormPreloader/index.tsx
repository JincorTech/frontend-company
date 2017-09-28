import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import InfoItem from '../InfoItem';

export type Props = {
  t: Function
};

const CompanyFormPreloader: SFC<Props> = ({ t }) => (
  <div styleName="company-profile-preloader">
    <div styleName="logo" />

    <div styleName="info">
      <div styleName="name" />

      <div styleName="region">
        <div styleName="country"/>
        <div styleName="city"/>
      </div>

      <InfoItem title={t('companyType')}>
        <div styleName="type"/>
      </InfoItem>

      <InfoItem title={t('companyDescription')}>
        <div styleName="description"/>
      </InfoItem>

      <InfoItem title={t('activityAreas')}>
        <div styleName="input"/>
        <div styleName="add-input"/>
      </InfoItem>

      <InfoItem title={t('links')}>
        <div styleName="input"/>
        <div styleName="add-input"/>
      </InfoItem>
    </div>
  </div>
);

export default translate('profile')(CSSModules(CompanyFormPreloader, require('./styles.css')));
