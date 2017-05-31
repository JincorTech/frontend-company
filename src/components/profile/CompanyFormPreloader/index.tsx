import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import InfoItem from '../InfoItem'


const CompanyFormPreloader: SFC<{}> = () => (
  <div styleName="company-profile-preloader">
    <div styleName="logo" />

    <div styleName="info">
      <div styleName="name" />

      <div styleName="region">
        <div styleName="country"/>
        <div styleName="city"/>
      </div>

      <InfoItem title="Тип компании">
        <div styleName="type"/>
      </InfoItem>

      <InfoItem title="Описание компании">
        <div styleName="description"/>
      </InfoItem>

      <InfoItem title="Сферы деятельности">
        <div styleName="input"/>
        <div styleName="add-input"/>
      </InfoItem>

      <InfoItem title="Ссылки">
        <div styleName="input"/>
        <div styleName="add-input"/>
      </InfoItem>
    </div>
  </div>
)

export default CSSModules(CompanyFormPreloader, require('./styles.css'))