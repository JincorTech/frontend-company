import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { InjectedCSSModuleProps } from 'react-css-modules'

import { Link } from 'react-router'
import Icon from '../../../../components/common/Icon'


export type SidebarProps = HTMLProps<HTMLDivElement> & InjectedCSSModuleProps & {
  open?: boolean
  onClose: () => void
}

const Sidebar: SFC<SidebarProps> = props => {
  const { open, onClose, styles, ...divProps } = props
  const { link, active } = styles

  return (
    <aside styleName={open ? 'sidebar-open' : 'sidebar-close'} {...divProps}>
      <Icon styleName="close-icon" name="close" onClick={onClose}/>

      <nav>
        <Link className={link} activeClassName={active} to="/app/messenger">Мессенджер</Link>
        <Link className={link} activeClassName={active} to="/app/profile">Моя компания</Link>
        <Link className={link} activeClassName={active} to="/app/favorites">Избранное</Link>
        <Link className={link} activeClassName={active} to="/app/search">Поиск</Link>
      </nav>
    </aside>
  )
}

export default CSSModules(Sidebar, require('../styles.css'))