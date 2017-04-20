import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import { getBackgroundColor, getInitials } from '../../../utils/colorFunction'

import Popup, { Props as PopupProps } from '../../../components/common/Popup'
import Icon from '../../../components/common/Icon'

import ProfileEdit from './components/ProfileEdit'
import ChangePassword from './components/ChangePassword'
import {
  changeView,
  closeProfileCard,
  openProfileCard,
  changePassword,
  updateProfile
} from '../../../redux/modules/common/profileCard'
import { logout } from '../../../redux/modules/common/app'
import { User as UserProps } from '../../../redux/modules/common/app'
import { BottomView as BottomViewProps } from '../../../redux/modules/common/profileCard'


type Props = JSX.IntrinsicAttributes
  & JSX.IntrinsicClassAttributes<any>
  & PopupProps
  & DispatchProps
  & ComponentProps
  & StateProps

export type ComponentProps = {
  user: UserProps
}

export type StateProps = {
  open: boolean,
  bottomView: BottomViewProps
}

export type DispatchProps = {
  openProfileCard: () => void,
  closeProfileCard: () => void,
  changeView: (view: BottomViewProps) => void,
  logout: () => void
}

const ProfileCard: SFC<Props> = props => {
  const { user, open, bottomView, changeView, closeProfileCard, logout } = props
  const { id, profile, company } = user
  const backgroundColor = getBackgroundColor(id)
  const initials = getInitials(profile.name)

  const renderView = (view: BottomViewProps) => {
    switch (view) {
      case 'buttons':
        return (
          <div styleName="control-buttons">
            <button
              type="button"
              onClick={() => changeView('profile-form')}>
              <Icon name="pencil" styleName="icon"/> Редактировать профиль
            </button>

            <button
              type="button"
              onClick={() => changeView('password-form')}>
              <Icon name="lock" styleName="icon"/> Изменить пароль
            </button>

            <button
              type="button"
              onClick={() => logout()}>
              <Icon name="logout" styleName="icon"/> Выйти
            </button>
          </div>
        )

      case 'profile-form':
        return (
          <div styleName="edit-profile">
            <ProfileEdit
              avatar={profile.avatar}
              onSubmit={updateProfile}
              onCancel={() => changeView('buttons')}/>
          </div>
        )

      case 'password-form':
        return (
          <div styleName="change-password">
            <ChangePassword
              onSubmit={changePassword}
              onCancel={() => changeView('buttons')}/>
          </div>
        )
    }
  }

  return (
    <Popup
      styleName={ profile.avatar ? 'profile-card' : 'profile-card-avatar-empty' }
      modalId="profile-card-popup"
      open={open}
      onClose={closeProfileCard}>
      <div styleName="top">
        {
          profile.avatar
            ? <img styleName="avatar" src={profile.avatar}/>
            : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
        }

        <div styleName="company">
          <div styleName="company-name">{company.legalName}</div>
          <div styleName={ company.picture ? 'company-logo' : 'company-logo-empty' }>
            <img src={company.picture}/>
          </div>
        </div>

        <div styleName="info">
          <div styleName="full-name">{profile.name}</div>
          <div styleName="position">{profile.position}</div>
        </div>
      </div>

      <div styleName="bottom">
        {renderView(bottomView)}
      </div>

      {/*<div styleName="profile-card-error">*/}
        {/*<div styleName="deleteme">temporary mock</div>*/}
      {/*</div>*/}
    </Popup>
  )
}

const StyledComponent = CSSModules(ProfileCard, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  state => state.common.profileCard,
  { openProfileCard, closeProfileCard, changeView, logout }
)(StyledComponent)