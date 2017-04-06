import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import colorFunction from '../../../utils/colorFunction'

import Popup from '../../common/Popup'
import Icon from '../../common/Icon'

import ProfileEdit from './components/ProfileEdit'
import ChangePassword from './components/ChangePassword'


type Props = HTMLProps<HTMLDivElement> & {
  open: boolean,
  id: string,
  avatar?: string,
  fullName: string,
  position: string,
  companyName: string,
  companyLogo?: string
}

const ProfileCard: SFC<Props> = props => {
  const {
    open,
    id,
    avatar,
    fullName,
    position,
    companyName,
    companyLogo
  } = props

  const { color, initials } = colorFunction(fullName, id)

  return (
    <Popup modalId="profile-card" open={open} styleName="profile-card">
      <div styleName="top">
        {
          avatar
            ? <img styleName="avatar" src={avatar}/>
            : <div styleName="avatar-empty" style={{backgroundColor: color}}>{initials}</div>
        }

        <button styleName="change-avatar" type="button"><Icon name="camera"/></button>

        <div styleName="company">
          <div styleName="company-name">{companyName}</div>
          <div styleName="company-logo">
            <img src={companyLogo}/>
          </div>
        </div>

        <div styleName="info">
          <div styleName="full-name">{fullName}</div>
          <div styleName="position">{position}</div>
        </div>
      </div>

      <div styleName="bottom">
        <div styleName="control-buttons">
          <button type="button"><Icon name="pencil" styleName="icon"/> Редактировать профиль</button>
          <button type="button"><Icon name="lock" styleName="icon"/> Изменить пароль</button>
          <button type="button"><Icon name="logout" styleName="icon"/> Выйти</button>
        </div>

        <div styleName="edit-profile">
          <ProfileEdit onSubmit={ () => { console.log('profile edit form submit') } }/>
        </div>

        <div styleName="change-password">
          <ChangePassword onSubmit={ () => { console.log('change password form submit') } }/>
        </div>
      </div>

      <div styleName="profile-card-error">
        <div styleName="deleteme">temporary mock</div>
      </div>
    </Popup>
  )
}

export default CSSModules(ProfileCard, require('./styles.css'))
