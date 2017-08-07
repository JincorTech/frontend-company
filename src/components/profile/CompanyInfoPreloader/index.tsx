import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

import InfoItem from '../InfoItem';

const CompanyInfoPreloader: SFC<{}> = () => (
  <div styleName="company-profile-preloader">
    <div styleName="logo" />

    <div styleName="info">
      <div styleName="name" />

      <InfoItem title="Регион">
        <div styleName="region"/>
      </InfoItem>

      <InfoItem title="Тип компании">
        <div styleName="type"/>
      </InfoItem>

      <InfoItem title="Описание компании">
        <div styleName="description"/>
        <div styleName="description"/>
        <div styleName="description"/>
      </InfoItem>

      <InfoItem title="Сферы деятельности">
        <div styleName="activity"/>
        <div styleName="activity"/>
      </InfoItem>

      <div styleName="contacts-block">
        <InfoItem styleName="social" title="Ссылки">
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

        <InfoItem styleName="contacts" title="Контакты">
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

export default CSSModules(CompanyInfoPreloader, require('./styles.css'));
