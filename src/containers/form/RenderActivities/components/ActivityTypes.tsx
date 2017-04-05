import * as React from 'react'
import { SFC, EventHandler, FormEvent } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { openNode, closeNode } from '../../../../redux/modules/profile/activityTypes'

import ActivityType from './ActivityType'
import SelectInput from '../../../../components/common/SelectInput'
import Popup from '../../../../components/common/Popup'


/**
 * Types
 */
export type Props = StateProps & DispatchProps & ComponentProps

export type ComponentProps = {
  open: boolean
  value: Option
  placeholder: string
  invalid: boolean
  onChange: EventHandler<FormEvent<any>>
  openPopup: () => void
  closePopup: () => void
}

export type Option = {
  name: string
  value: string
}

export type StateProps = {
  rootNodes: string[]
}

export type DispatchProps = {
  openNode: (nodeId: string) => void
  closeNode: (nodeId: string) => void
}


/**
 * Component
 */
const ActivityTypes: SFC<Props> = (props) => {
  const { open, invalid, value, placeholder, openPopup, closePopup, rootNodes } = props

  return (
    <div styleName="activity-select">
      <SelectInput
        invalid={invalid}
        value={value && value.name}
        placeholder={placeholder}
        onClick={openPopup}/>

      <Popup modalId="activity-popup" styleName="activity-popup" open={open} onClose={closePopup}>
        <h1 styleName="activity-title">Основная сфера деятельности</h1>

        <Scrollbars autoHide autoHeight autoHeightMax={537}>
          <div styleName="activity-types">
            {rootNodes.map((id, i) => <ActivityType key={i} activityId={id}/>)}
          </div>
        </Scrollbars>
      </Popup>
    </div>
  )
}


/**
 * Decorators
 */
const StyledComponent = CSSModules(ActivityTypes, require('../styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({
    rootNodes: state.profile.activityTypes.rootNodes
  }),
  { openNode, closeNode }
)(StyledComponent)