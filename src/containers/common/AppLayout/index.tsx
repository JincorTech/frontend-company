import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { openSidebar, closeSidebar, StateMap as StateProps } from '../../../redux/modules/common/app'

import Logo from '../../../components/common/Logo'
import Toggle from './components/Toggle'
import UserAvatar from './components/UserAvatar'
import Sidebar from './components/Sidebar'


/**
 * Types
 */
export type Props = StateProps & DispatchProps

export type DispatchProps = {
  openSidebar: () => void
  closeSidebar: () => void
}

/**
 * Component
 */
const AppLayout: SFC<Props> = (props) => {
  const { sidebarOpen, children, openSidebar, closeSidebar } = props
  return (
    <div styleName="app">
      <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

      <header styleName="header">
        <Toggle onClick={openSidebar}/>

        <div styleName="container">
          <Logo styleName="logo"  to="/"/>
          <span styleName="module-name">Profile</span>

          <UserAvatar styleName="pull-right"/>
        </div>
      </header>

      <section>
        <div styleName="container">
          {children}
        </div>
      </section>
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(AppLayout, require('./styles.css'))
export default connect<StateProps, DispatchProps, {}>(
  (state) => state.common.app,
  { openSidebar, closeSidebar }
)(StyledComponent)