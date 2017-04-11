import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import colorFunction from '../../../utils/colorFunction'

import Popup, { Props as PopupProps } from '../../../components/common/Popup'
import Icon from '../../../components/common/Icon'

import ProfileEdit from './components/ProfileEdit'
import ChangePassword from './components/ChangePassword'
import { changeView, closeProfileCard, openProfileCard } from '../../../redux/modules/common/profileCard'


type Props = JSX.IntrinsicAttributes
  & JSX.IntrinsicClassAttributes<any>
  & PopupProps
  & DispatchProps
  & ComponentProps
  & StateProps

export type ComponentProps = {
  profile: ProfileInfo
}

export type ProfileInfo = {
  id: string,
  avatar?: string,
  fullName: string,
  position: string,
  companyName: string,
  companyLogo?: string
}

export type StateProps = {
  open: boolean,
  bottomView: number
}

export type DispatchProps = {
  openProfileCard: () => void,
  closeProfileCard: () => void,
  changeView: (view: number) => void
}

const ProfileCard: SFC<Props> = props => {
  const { profile, open, bottomView, changeView, closeProfileCard } = props
  const { id, avatar, fullName, position, companyName, companyLogo } = profile

  /**
   * TODO
   * BUG: При закрытии карточки профиля все валится.
   */
  // const { color, initials } = colorFunction(fullName, id)

  const renderView = (view: number) => {
    switch (view) {
      case 0:
        return (
          <div styleName="control-buttons">
            <button
              type="button"
              onClick={() => changeView(1)}>
              <Icon name="pencil" styleName="icon"/> Редактировать профиль
            </button>

            <button
              type="button"
              onClick={() => changeView(2)}>
              <Icon name="lock" styleName="icon"/> Изменить пароль
            </button>

            <button type="button">
              <Icon name="logout" styleName="icon"/> Выйти
            </button>
          </div>
        )

      case 1:
        return (
          <div styleName="edit-profile">
            <ProfileEdit
              avatar={avatar}
              onSubmit={() => console.log('fired!')}
              onCancel={() => changeView(0)}/>
          </div>
        )

      case 2:
        return (
          <div styleName="change-password">
            <ChangePassword
              onSubmit={() => console.log('fired!')}
              onCancel={() => changeView(0)}/>
          </div>
        )
    }
  }

  return (
    <Popup
      styleName="profile-card"
      modalId="profile-card-popup"
      open={open}
      onClose={closeProfileCard}>
      <div styleName="top">
        {/*{*/}
          {/*avatar*/}
            {/*? <img styleName="avatar" src={avatar}/>*/}
            {/*: <div styleName="avatar-empty" style={{backgroundColor: color}}>{initials}</div>*/}
        {/*}*/}

        <img styleName="avatar" src={avatar}/>

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
  { openProfileCard, closeProfileCard, changeView }
)(StyledComponent)