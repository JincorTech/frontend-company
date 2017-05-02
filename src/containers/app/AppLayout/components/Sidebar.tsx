import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import { Link } from 'react-router'
import Icon from '../../../../components/common/Icon'

const { link, active } = require('../styles.css')

export type SidebarProps = HTMLProps<HTMLDivElement> & {
  open?: boolean
  onClose: () => void
}

const Sidebar: SFC<SidebarProps> = ({open, onClose, ...divProps}) => {
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