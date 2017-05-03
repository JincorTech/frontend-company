import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../common/Icon'

export type Props = HTMLProps<HTMLDivElement>

const AddButton: SFC<Props> = (props) => {
  return (
    <div styleName="add-input" {...props}>
      <Icon styleName="add-icon"  name="plus"/>
      <span styleName="add-link">добавить отрасль</span>
    </div>
  )
}

export default CSSModules(AddButton, require('./styles.css'))