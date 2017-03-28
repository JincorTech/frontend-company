import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import ProfileView from '../ProfileView'
import ProfileEdit from '../ProfileEdit'


type ProfileProps = HTMLProps<HTMLDivElement>

const Profile: SFC<ProfileProps> = (props) => {
  return (
    <div styleName="profile">
      <ProfileEdit
        logo={null}
        name="Альфа-Банк"
        type="Частная компания"
        region="Россия, Москва"
        description="Альфа-Банк, основанный в 1990 году, является универсальным банком, осуществляющим все основные виды банковских операций, представленных на рынке финансовых услуг, включая обслуживание частных, представленных на рынке финансовых услуг, включая обслуживание частных"
        email="alfa@bank.ru"
        phone="8-916-777-77-77"
        activities={[{id: '1', name: 'Банковская сфера'}, {id: '0', name: 'Маркетинг'}]}
        socialLinks={[{iconUrl: null, url: '', name: 'Facebook'}, {iconUrl: null,  url: '', name: 'Twitter'}]}/>
    </div>
  )
}

export default CSSModules(Profile, require('./styles.css'))
