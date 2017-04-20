import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import { ActivityLeaf as LeafProps } from '../../../../redux/modules/common/activityTypes'


export type Props = LeafProps & {
  onSelect: (option: {name: string, value: string}) => void
  selectValue: (id: string) => void
  modalId: string
}


const ActivityLeaf: SFC<Props> = (props) => {
  const { id, name, visible, selectValue } = props
  const handleClick = () => {
    selectValue(id)
  }

  return visible && <div
      styleName="activity-leaf"
      onClick={handleClick}>
      <div styleName="activity-name">{name}</div>
    </div>
}


export default CSSModules(ActivityLeaf, require('../styles.css'))