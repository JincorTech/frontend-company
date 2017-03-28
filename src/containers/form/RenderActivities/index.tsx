import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps, WrappedFieldArrayProps, Field } from 'redux-form'
import { connect } from 'react-redux'

import {
  addActivityField,
  removeActivityField,
  openActivityPopup,
  closeActivityPopup,
  ActivityField
} from '../../../redux/modules/profile/profileEdit'

import ActivityTypes from './components/ActivityTypes'
import AddInput from './components/AddInput'
import Error from '../../../components/form/Error'


/**
 * Render activity field
 */
export type Props = WrappedFieldProps<any> & {
  open: boolean
  placeholder: string
  openPopup: () => void
  closePopup: () => void
}

export const RenderActivity: SFC<Props> = (props) => {
  const { open, placeholder, openPopup, closePopup, input, meta } = props
  const { invalid, touched, active, dirty, error } = meta
  const { value, onChange } = input
  const hasError = touched && !active && invalid && dirty

  return (
    <div>
      {hasError && <Error msg={error}/>}

      <ActivityTypes
        open={open}
        invalid={hasError}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        openPopup={openPopup}
        closePopup={closePopup}/>
    </div>
  )
}


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
    activityFields,
    addActivityField,
    removeActivityField,
    openActivityPopup,
    closeActivityPopup
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
    <div>
      {fields.map((field, i) => (
        <div key={i}>
          <Field
            name={field}
            open={activityFields[i].visible}
            closePopup={closeActivityPopup}
            openPopup={openActivityPopup}
            component={RenderActivity}/>

          <a onClick={() => handleRemove(i)}>Удалить</a>
        </div>
      ))}
      <AddInput onClick={handleAdd}/>
    </div>
  )
}

/**
 * Decorator
 */
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
)(RenderActivities)