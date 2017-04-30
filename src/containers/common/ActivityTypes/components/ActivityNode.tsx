import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import { ActivityNode as NodeProps } from '../../../../redux/modules/common/activityTypes'

import ActivityType from './ActivityType'
import Icon from '../../../../components/common/Icon'


export type Props = NodeProps & {
  openNode: (id: string) => void
  closeNode: (id: string) => void
  selectValue: (activityId: string) => void
  modalId: string
}


const ActivityNode: SFC<Props> = (props) => {
  const { id, name, open, visible, childrenIds, openNode, closeNode, selectValue, modalId } = props

  const handleClick = () => {
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
        {childrenIds.map((activityId, i) =>
          <ActivityType
            key={i}
            activityId={activityId}
            modalId={modalId}
            openNode={openNode}
            closeNode={closeNode}
            selectValue={selectValue}/>)}
      </div>}
    </div>
  )
}


export default CSSModules(ActivityNode, require('../styles.css'))