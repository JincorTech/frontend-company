import * as React from 'react'
import { SFC } from 'react'
import { connect } from 'react-redux'

import { ActivityMap } from '../../../../redux/modules/common/activityTypes'

import ActivityLeaf from './ActivityLeaf'
import ActivityNode from './ActivityNode'


export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {
  activityId: string
  modalId: string
  openNode: (activityId: string) => void
  closeNode: (activityId: string) => void
  selectValue: (activityId: string) => void
}

export type StateProps = {
  activityMap: ActivityMap
}

export type DispatchProps = {
  onSelect: (option: { value: string, name: string }) => void
}


const ActivityType: SFC<Props> = (props) => {
  const {
    activityId,
    activityMap,
    selectValue,
    onSelect,
    openNode,
    closeNode,
    modalId
  } = props
  const activity = activityMap[activityId]

  return activity.type === 'node'
    ? <ActivityNode
      openNode={openNode}
      closeNode={closeNode}
      selectValue={selectValue}
      modalId={modalId}
      {...activity}/>
    : <ActivityLeaf
      selectValue={selectValue}
      onSelect={onSelect}
      modalId={modalId}
      {...activity}/>
}


export default connect<StateProps, DispatchProps, ComponentProps>(
  ({ common: { activityTypes }}, { modalId }) => ({
    activityMap: activityTypes[modalId].activityMap
  })
)(ActivityType)