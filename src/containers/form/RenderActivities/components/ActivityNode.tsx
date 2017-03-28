import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import { ActivityNode as NodeProps } from '../../../../redux/modules/profile/activityTypes'

import ActivityType from './ActivityType'
import Icon from '../../../../components/common/Icon'

/**
 * Types
 */
export type Props = NodeProps & {
  openNode: (id: string) => void
  closeNode: (id: string) => void
}

/**
 * Component
 */
const ActivityNode: SFC<Props> = (props) => {
  const { id, name, open, visible, childrenIds, openNode, closeNode } = props

  const handleClick = () => {
    console.log(id)
    if (open) {
      closeNode(id)
    } else {
      openNode(id)
    }
  }

  return (
    visible && <div styleName="activity-node">
      <div
        styleName="activity-leaf"
        title={name}
        onClick={handleClick}>
        <div styleName="activity-name">
          {name}
          {open && <Icon styleName="caret" name="sort-down"/>}
        </div>
      </div>

      {open && <div styleName="children">
        {childrenIds.map((activityId, i) => <ActivityType key={i} activityId={activityId}/>)}
      </div>}
    </div>
  )
}

/**
 * Decorators
 */
export default CSSModules(ActivityNode, require('../styles.css'))