import * as React from 'react'
import { Component, SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Scrollbars from 'react-custom-scrollbars'

import {
  registerAT, removeAT,
  openAT, closeAT,
  setNodes, selectValue,
  ActivityTypeState,
  openNode, closeNode
} from '../../../redux/modules/common/activityTypes'

import Popup from '../../../components/common/Popup'
import ActivityType from './components/ActivityType'
import SelectInput from '../../../components/common/SelectInput'
import { SelectInputProps } from '../../../components/common/SelectDropdown'


export type Props = ComponentProps & DispatchProps & StateProps

export type ComponentProps = {
  modalId: string
  Button?: SFC<SelectInputProps>
  activityValue: string
  title: string
  placeholder?: string
  invalid?: string
}

export type DispatchProps = {
  actions: {
    registerAT: () => void
    removeAT: () => void
    openAT: () => void
    closeAT: () => void
    setNodes: () => void
    openNode: () => void
    closeNode: () => void
    selectValue: () => void
  }
}

export type StateProps = {
  activityTypes: ActivityTypeState
}


class ActivityTypes extends Component<Props, {}> {
  public static defaultProps: any = {
    activityTypes: {
      name: '',
      open: false,
      selectedActivity: null,
      activities: [],
      activitiesMap: {}
    }
  }

  public componentWillMount(): void {
    const { modalId, actions } = this.props

    if (!modalId) throw new Error('modalId required')

    actions.registerAT()
    actions.setNodes()
  }

  public componentWillUnmount(): void {
    this.props.actions.removeAT()
  }

  public render(): JSX.Element {
    const { modalId, actions, activityTypes, Button, title, placeholder, invalid, activityValue, ...inputProps } = this.props
    const { open, rootNodes } = activityTypes
    const { openAT, closeAT, openNode, closeNode, selectValue } = actions

    return (
      <div>
        {
          Button
            ? <Button value={title} placeholder={placeholder} onClick={openAT} {...inputProps}/>
            : <SelectInput value={title} placeholder={placeholder} onClick={openAT} {...inputProps}/>
        }

        <Popup styleName="activity-popup" modalId={modalId} open={open} onClose={closeAT}>
          <h1 styleName="activity-title">Основная сфера деятельности</h1>

          <Scrollbars autoHide autoHeight autoHeightMax={537}>
            <div styleName="activity-types">
              {rootNodes.map((id, i) =>
                <ActivityType
                  key={i}
                  activityId={id}
                  modalId={modalId}
                  openNode={openNode}
                  closeNode={closeNode}
                  selectValue={selectValue}/>)}
            </div>
          </Scrollbars>
        </Popup>
      </div>
    )
  }
}


const StyledComponent = CSSModules(ActivityTypes, require('./styles.css'))

const defaultActivityTypes = {
  name: '',
  open: false,
  selectedActivityId: null,
  rootNodes: [],
  activityMap: {}
}

const mapStateToProps = ({ common: { activityTypes }}, { modalId }: Props): StateProps => {
  const activityTypesState = activityTypes[modalId] || defaultActivityTypes
  const activities = activityTypesState.activities
  return {
    activityTypes: {...activityTypesState, activities}
  }
}

const mapDispatchToProps = (dispatch, { modalId }: Props): DispatchProps => ({
  actions: bindActionCreators({
    registerAT: registerAT.bind(null, modalId),
    removeAT: removeAT.bind(null, modalId),
    openAT: openAT.bind(null, modalId),
    closeAT: closeAT.bind(null, modalId),
    setNodes: setNodes.bind(null, modalId),
    openNode: openNode.bind(null, modalId),
    closeNode: closeNode.bind(null, modalId),
    selectValue: selectValue.bind(null, modalId)
  }, dispatch)
})

export default connect<StateProps, DispatchProps, ComponentProps>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent)