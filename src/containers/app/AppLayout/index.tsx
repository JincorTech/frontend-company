import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  openSidebar,
  closeSidebar,
  fetchUser,
  User
} from '../../../redux/modules/app/appLayout'

import { openProfileCard } from '../../../redux/modules/app/profileCard'

import Logo from '../../../components/common/Logo'
import Toggle from '../../../components/app/Toggle'
import UserAvatar from '../../../components/app/UserAvatar'
import Sidebar from '../../../components/app/Sidebar'
import PageName from '../../../components/app/PageName'
import ProfileCard from '../ProfileCard'
import CompanyCard from '../../common/CompanyCard'


/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps & RouteComponentProps<ComponentProps, {}>

export type ComponentProps = {}

export type StateProps = {
  user: User
  sidebarOpen: boolean
  isAuth: boolean
}

export type DispatchProps = {
  openSidebar: () => void
  closeSidebar: () => void
  openProfileCard: () => void
  closeProfileCard: () => void
  changeView: () => void
  fetchUser: () => void
}


/**
 * Component
 */
class AppLayout extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchUser()
  }

  render() {
    const { sidebarOpen, children,  user, isAuth, location } = this.props
    const { openSidebar, closeSidebar, openProfileCard } = this.props
    const { id, profile, contacts, company } = user

    return (
      <div styleName="app-layout">
        <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

        <header styleName="header">
          <Toggle onClick={openSidebar}/>

          <div styleName="container">
            <div styleName="pull-left">
              {isAuth
                ? <Logo styleName="logo"  to="/app/profile"/>
                : <Logo styleName="logo"  to="/auth/signin"/>}

              <PageName
                styleName="module-name"
                pathname={location.pathname}/>
            </div>

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
        <CompanyCard/>
      </div>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(AppLayout, require('./styles.css'))

export default connect<StateProps, DispatchProps, any>(
  (state) => ({
    ...state.app.appLayout,
    isAuth: state.app.app.authorized
  }),
  {
    openSidebar,
    closeSidebar,
    openProfileCard,
    fetchUser
  }
)(StyledComponent)
