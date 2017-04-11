import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import {
  openSidebar, closeSidebar, StateMap as StateProps
} from '../../../redux/modules/common/app'
import { openProfileCard } from '../../../redux/modules/common/profileCard'

import Logo from '../../../components/common/Logo'
import Toggle from './components/Toggle'
import UserAvatar from './components/UserAvatar'
import Sidebar from './components/Sidebar'
import ProfileCard from '../ProfileCard'


/**
 * Types
 */
export type Props = StateProps & DispatchProps

export type DispatchProps = {
  openSidebar: () => void
  closeSidebar: () => void,
  openProfileCard: () => void,
  closeProfileCard: () => void,
  changeView: () => void
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
const AppLayout: SFC<Props> = (props) => {
  const {
    sidebarOpen,
    children,
    openSidebar,
    closeSidebar,
    openProfileCard
  } = props

  return (
    <div styleName="app">
      <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

      <header styleName="header">
        <Toggle onClick={openSidebar}/>

        <div styleName="container">
          <Logo styleName="logo"  to="/"/>
          <span styleName="module-name">Profile</span>

          <UserAvatar styleName="pull-right" onClick={openProfileCard}/>
        </div>
      </header>

      <section>
        <div styleName="container">
          {children}
        </div>
      </section>

      <ProfileCard profile={profileMock}/>
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(AppLayout, require('./styles.css'))

export default connect<StateProps, DispatchProps, {}>(
  state => state.common.app,
  { openSidebar, closeSidebar, openProfileCard }
)(StyledComponent)