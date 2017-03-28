import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { Field, WrappedFieldArrayProps } from 'redux-form'

import RenderLinkInput from './components/RenderLinkInput'
import AddInput from './components/AddInput'

export type Props = WrappedFieldArrayProps<string>

const RenderLinkInputs: SFC<Props> = (props) => {
  const { fields } = props

  return (
    <div styleName="link-inputs">
      {fields.map((field, i) => (
        <Field
          key={i}
          name={field}
          component={RenderLinkInput}
          onRemove={() => fields.remove(i)}/>
      ))}
      <AddInput onClick={() => fields.push('')}/>
    </div>
  )
}

export default CSSModules(RenderLinkInputs, require('./styles.css'))
