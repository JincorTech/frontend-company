import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import { Scrollbars } from 'react-custom-scrollbars'


type Props = HTMLProps<HTMLDivElement> & {
  height?: string
}

const Scrollbar: SFC<Props> = ({ height = '100vh', ...props }) => (
  <Scrollbars
  style={{ height }}
  renderThumbVertical={renderThumb}>
    <div styleName="wrapper">
      {props.children}
    </div>
  </Scrollbars>
)

const renderThumb = () => <div style={{ width: '5px', backgroundColor: '#cdcecf', borderRadius: '2px' }}/>

export default CSSModules(Scrollbar, require('./styles.css'))
