import * as React from 'react'
import { Component, cloneElement } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Scrollbars from 'react-custom-scrollbars'

import {
  registerSelect,
  removeSelect,
  unregisterSelect,
  openSelect,
  closeSelect,
  selectValue,
  openNode,
  closeNode
} from '../../../redux/modules/common/activityTypes'

import {
  ActivityMap,
  SelectState,
  ActivityLeaf,
  ActivityNode,
  selectInitialState
} from '../../../redux/modules/common/activityTypes'

import Icon from '../../../components/common/Icon'
import Popup from '../../../components/common/Popup'
import SelectInput from '../../../components/common/SelectInput'

/**
 * Types
 */
export type Props = ComponentProps & DispatchProps & StateProps

export type ComponentProps = {
  name: string
  activityValue: string
  title: string
  button?: JSX.Element
  placeholder?: string
  invalid?: string
  defaultOption?: string
  onActivitySelect: (activityId: string) => void
}

export type DispatchProps = {
  actions: {
    registerSelect: (name: string) => void
    unregisterSelect: (name: string) => void
    removeSelect: (name: string) => void
    openSelect: () => void
    closeSelect: () => void
    selectValue: (activityId: string) => void
    openNode: (activityId: string) => void
    closeNode: (activityIs: string) => void
  }
}

export type StateProps = {
  rootNodes: string[]
  activityMap: ActivityMap
  select: SelectState
}

/**
 * Component
 */
class ActivityTypes extends Component<Props, {}> {
  constructor(props) {
    super(props)

    this.renderActivityType = this.renderActivityType.bind(this)
    this.renderActivityLeaf = this.renderActivityLeaf.bind(this)
    this.renderActivityNode = this.renderActivityNode.bind(this)
    this.renderDefaultLeaf  = this.renderDefaultLeaf.bind(this)
  }

  public componentWillMount(): void {
    const { name, activityValue, actions } = this.props

    if (name) {
      actions.registerSelect(name)
    } else {
      throw new Error('name required')
    }

    if (activityValue) {
      actions.selectValue(activityValue)
    }
  }

  public componentWillUnmount(): void {
    const { name, actions } = this.props

    actions.unregisterSelect(name)
  }

  public componentWillReceiveProps({ activityValue: nextActivityValue }: Props): void {
    const { activityValue, actions } = this.props

    if (nextActivityValue !== activityValue) {
      actions.selectValue(nextActivityValue)
    }
  }

  private renderActivityType(activityId: string): JSX.Element {
    const { activityMap } = this.props
    const activity = activityMap[activityId]

    return activity.type === 'node'
      ? this.renderActivityNode(activity)
      : this.renderActivityLeaf(activity)
  }

  private renderActivityNode(activity: ActivityNode): JSX.Element {
    const { id, name, visible, childrenIds, open } = activity
    const { activityMap, actions: { openNode, closeNode }} = this.props

    return visible && <div key={id} styleName="activity-node">
      <div
        styleName="activity-leaf"
        title={name}
        onClick={() => open ? closeNode(id) : openNode(id) }>
        <div styleName="activity-name">
          {name}
          {open && <Icon styleName="caret" name="sort-down"/>}
        </div>
      </div>

      {open && <div styleName="children">
        {childrenIds.map((activityId) => this.renderActivityType(activityId))}
      </div>}
    </div>
  }

  private renderActivityLeaf(activity: ActivityLeaf): JSX.Element {
    const { id, name, visible } = activity
    const { actions: { selectValue }, onActivitySelect } = this.props

    return visible && <div
      key={id}
      styleName="activity-leaf"
      onClick={() => {
        selectValue(id)
        onActivitySelect(id)
      }}>
      <div styleName="activity-name">{name}</div>
    </div>
  }

  private renderDefaultLeaf(): JSX.Element {
    const {
      defaultOption,
      actions: { selectValue },
      onActivitySelect
    } = this.props

    return (
      <div
        styleName="activity-leaf"
        onClick={() => {
          selectValue('')
          onActivitySelect('')
        }}>
        <div styleName="activity-name">{defaultOption}</div>
      </div>
    )
  }

  public render(): JSX.Element {
    const {
      name,
      actions,
      activityMap,
      select,
      button,
      title,
      placeholder,
      rootNodes,
      defaultOption
    } = this.props
    const { openSelect, closeSelect } = actions
    const { open, selectedActivity } = select
    const activity = activityMap[selectedActivity]
    const nameValue = activity ? activity.name : ''

    return (
      <div>
        {
          button
            ? cloneElement(button, {
                value: nameValue,
                placeholder,
                onClick: openSelect
              })
            : <SelectInput
                value={nameValue}
                placeholder={placeholder}
                onClick={openSelect}/>
        }

        <Popup
          styleName="activity-popup"
          open={open}
          modalId={`${name}-activity-type`}
          onClose={closeSelect}>

          <h1 styleName="activity-title">{title}</h1>

          <Scrollbars autoHide autoHeight autoHeightMax={537}>
            <div styleName="activity-types">
              {defaultOption && this.renderDefaultLeaf()}
              {rootNodes.map((id) => this.renderActivityType(id))}
            </div>
          </Scrollbars>
        </Popup>
      </div>
    )
  }
}


const StyledComponent = CSSModules(ActivityTypes, require('./styles.css'))

const mapStateToProps = (state, { name }: Props): StateProps => {
  const { activityMap, selectMap, rootNodes } = state.common.activityTypes
  const select = selectMap[name] || selectInitialState

  return { activityMap, select, rootNodes }
}

const mapDispatchToProps = (dispatch, { name }: Props): DispatchProps => ({
  actions: bindActionCreators({
    openSelect: openSelect.bind(null, { name }),
    closeSelect: closeSelect.bind(null, { name }),
    selectValue: selectValue.bind(null, { name }),
    registerSelect,
    unregisterSelect,
    removeSelect,
    openNode,
    closeNode
  }, dispatch)
})

export default connect<StateProps, DispatchProps, ComponentProps>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent)
