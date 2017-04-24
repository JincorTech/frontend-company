import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Link from '../../../../components/common/Link'
import Icon from '../../../../components/common/Icon'


export type SidebarProps = HTMLProps<HTMLDivElement> & {
  open?: boolean
  onClose: () => void
}

const Sidebar: SFC<SidebarProps> = ({open, onClose, ...divProps}) => {
  return (
    <aside styleName={open ? 'open' : 'close'} {...divProps}>
      <Icon styleName="close-icon" name="close" onClick={onClose}/>

      <nav>
        <Link styleName="sidebar-item" to="/">Мессенджер</Link>
        <Link styleName="sidebar-item" to="/">Моя компания</Link>
        <Link styleName="sidebar-item" to="/">Избранное</Link>
        <Link styleName="sidebar-item" to="/">Поиск</Link>
      </nav>
    </aside>
  )
}

export default CSSModules(Sidebar, require('../styles.css'))