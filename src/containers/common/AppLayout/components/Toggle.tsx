import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type ToggleProps = HTMLProps<HTMLDivElement>

const MenuToggle: SFC<ToggleProps> = (props) => {
  return (
    <div styleName="menu-toggle" {...props}>
      <span styleName="stripe" />
      <span styleName="stripe" />
      <span styleName="stripe" />
    </div>
  )
}

export default CSSModules(MenuToggle, require('../styles.css'))