import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import { ActivityLeaf as LeafProps } from '../../../../redux/modules/profile/activityTypes'

/**
 * Types
 */
export type Props = LeafProps & {
  onSelect: (option: {name: string, value: string}) => void
  selectValue: (id: string) => void
}

/**
 * Component
 */
const ActivityLeaf: SFC<Props> = (props) => {
  const { id, name, visible, onSelect, selectValue } = props
  const handleClick = () => {
    onSelect({name, value: id})
    selectValue(id)
  }

  return visible && <div
    styleName="activity-leaf"
    onClick={handleClick}>
      <div styleName="activity-name">{name}</div>
    </div>
}

/**
 * Decorators
 */
export default CSSModules(ActivityLeaf, require('../styles.css'))