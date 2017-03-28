import * as React from 'react'
import { SFC } from 'react'
import { connect } from 'react-redux'

import { openNode, closeNode, selectValue, ActivityMap } from '../../../../redux/modules/profile/activityTypes'

import ActivityLeaf from './ActivityLeaf'
import ActivityNode from './ActivityNode'

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {
  activityId: string
}

export type StateProps = {
  activityMap: ActivityMap
}

export type DispatchProps = {
  openNode: (activityId: string) => void
  closeNode: (activityId: string) => void
  selectValue: (activityId: string) => void
  onSelect: (option: { value: string, name: string }) => void
}

/**
 * Component
 */
const ActivityType: SFC<Props> = (props) => {
  const {
    activityId,
    activityMap,
    selectValue,
    onSelect,
    openNode,
    closeNode
  } = props
  const activity = activityMap[activityId]

  return activity.type === 'node'
    ? <ActivityNode
        openNode={openNode}
        closeNode={closeNode}
        {...activity}/>
    : <ActivityLeaf
        selectValue={selectValue}
        onSelect={onSelect}
        {...activity}/>
}

/**
 * Decorators
 */
export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({
    activityMap: state.profile.activityTypes.activityMap
  }),
  { openNode, closeNode, selectValue }
)(ActivityType)