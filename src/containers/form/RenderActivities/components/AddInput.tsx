import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../../../components/common/Icon'


export type Props = HTMLProps<HTMLDivElement>

const AddInput: SFC<Props> = (props) => {
  return (
    <div styleName="add-input" {...props}>
      <Icon styleName="add-icon"  name="plus"/>
      <span styleName="add-link">добавить ссылку</span>
    </div>
  )
}

export default CSSModules(AddInput, require('../styles.css'))