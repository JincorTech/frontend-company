import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps, WrappedFieldArrayProps, Field } from 'redux-form'
import { connect } from 'react-redux'

import {
  addActivityField,
  removeActivityField,
  openActivityPopup,
  closeActivityPopup,
  ActivityField
} from '../../../../redux/modules/profile/profileEdit'

import AddInput from './AddInput'
import RenderActivity from './RenderActivity'


/**
 * Render activity field array
 */
export type Option = {
  name: string
  value: string
}

export type ActivitiesProps = WrappedFieldArrayProps<Option> & StateProps & DispatchProps

export type StateProps = {
  activityFields: ActivityField[]
}

export type DispatchProps = {
  openActivityPopup: (index: number) => void
  closeActivityPopup: (index: number) => void
  removeActivityField: (index: number) => void
  addActivityField: () => void
}

const RenderActivities: SFC<ActivitiesProps> = (props) => {
  const {
    fields,
    addActivityField,
    removeActivityField,
  } = props

  const handleAdd = (): void => {
    const option = { name: '', value: '' }

    fields.push(option)
    addActivityField()
  }

  const handleRemove = (index: number): void => {
    fields.remove(index)
    removeActivityField(index)
  }

  return (
    <div styleName="activity-list">
      {fields.map((field, i) => (
        <Field
          key={i}
          index={i}
          name={field}
          component={RenderActivity}
          placeholder={i > 0 ? 'Дополнительная сфера деятельности' : 'Oсновная сфера деятельности'}
          handleRemove={() => handleRemove(i)}/>
      ))}
      {fields.length < 3 && <AddInput onClick={handleAdd}/>}
    </div>
  )
}

/**
 * Decorator
 */
const StyledComponent = CSSModules(RenderActivities, require('../styles.css'))
export default connect<StateProps, DispatchProps, WrappedFieldArrayProps<Option>>(
  (state) => ({
    activityFields: state.profile.profileEdit.activityFields
  }),
  {
    openActivityPopup,
    closeActivityPopup,
    removeActivityField,
    addActivityField
  }
)(StyledComponent)