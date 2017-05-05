import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps, WrappedFieldArrayProps, Field } from 'redux-form'
import { connect } from 'react-redux'

import { required } from '../../../utils/validators'

import AddInput from '../../profile/AddButton'
import RenderActivity from '../RenderActivity'


/**
 * Render activity field array
 */
export type Props = WrappedFieldArrayProps<string>


const RenderActivities: SFC<Props> = (props) => {
  const { fields } = props

  return (
    <div styleName="activity-list">
      {fields.map((field, i) => (
        <Field
          key={i}
          index={i}
          name={field}
          component={RenderActivity}
          validate={required()}
          styleName="activity-field"
          placeholder={i > 0 ? 'Дополнительная сфера деятельности' : 'Oсновная сфера деятельности'}
          handleRemove={() => fields.remove(i)}/>
      ))}
      {fields.length < 3 && <AddInput children="добавить отрасль" onClick={() => fields.push('')}/>}
    </div>
  )
}

/**
 * Decorator
 */
export default CSSModules(RenderActivities, require('./styles.css'))