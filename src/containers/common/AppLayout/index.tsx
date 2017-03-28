import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import Logo from '../../../components/common/Logo'
import Toggle from './components/Toggle'
import UserAvatar from './components/UserAvatar'
import Sidebar from './components/Sidebar'


const AppLayout: SFC<{}> = ({children}) => {
  return (
    <div styleName="app">
      <Sidebar onClose={null}/>

      <header styleName="header">
        <Toggle />

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

export default CSSModules(AppLayout, require('./styles.css'))