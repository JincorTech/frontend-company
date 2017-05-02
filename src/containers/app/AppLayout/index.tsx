import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import {
  openSidebar,
  closeSidebar,
  fetchUser,
  StateMap as StateProps
} from '../../../redux/modules/app/appLayout'

import { openProfileCard } from '../../../redux/modules/common/profileCard'

import Logo from '../../../components/common/Logo'
import Toggle from './components/Toggle'
import UserAvatar from './components/UserAvatar'
import Sidebar from './components/Sidebar'
import ProfileCard from '../../common/ProfileCard'


/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {}

export type DispatchProps = {
  openSidebar: () => void
  closeSidebar: () => void
  openProfileCard: () => void
  closeProfileCard: () => void
  changeView: () => void
  fetchUser: () => void
}

/**
 * Data mock
 */
const profileMock = {
  id: 'uuid4',
  avatar: 'http://imgur.com/QKHJ3Zs.png',
  fullName: 'Lauren Mayberry',
  position: 'Singer',
  companyName: 'CHVRCHES',
  companyLogo: 'https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png'
}

/**
 * Component
 */
class AppLayout extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchUser()
  }

  render() {
    const { sidebarOpen, children, openSidebar, closeSidebar, openProfileCard, user } = this.props
    const { id, profile, contacts, company } = user
    return (
      <div styleName="app-layout">
        <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

        <header styleName="header">
          <Toggle onClick={openSidebar}/>

          <div styleName="container">
            <Logo styleName="logo"  to="/"/>
            <span styleName="module-name">Profile</span>

            <UserAvatar
              styleName="pull-right"
              onClick={openProfileCard}
              src={profile.avatar}
              alt={profile.name}
              id={id}
              name={profile.name}/>
          </div>
        </header>

        <section>
          <div styleName="container">
            {children}
          </div>
        </section>

        <ProfileCard user={user}/>
      </div>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(AppLayout, require('./styles.css'))

export default connect<StateProps, DispatchProps, {}>(
  state => state.app.appLayout,
  {
    openSidebar,
    closeSidebar,
    openProfileCard,
    fetchUser
  }
)(StyledComponent)