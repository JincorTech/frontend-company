import * as React from 'react'
import { SFC, Component } from 'react'
import { WrappedFieldProps } from 'redux-form'
import * as CSSModules from 'react-css-modules'

import Password from './components/Password'
import Error from '../Error'

/**
 * Types
 */
export type Props = WrappedFieldProps<any> & {
  placeholder?: string
}

export type State = {
  visible: boolean
}

/**
 * Component
 */
class RenderPassword extends Component<Props, State> {
  public state: State = {
    visible: false
  }

  constructor(props) {
    super(props)

    this.handleChangeVisibility = this.handleChangeVisibility.bind(this)
  }

  private handleChangeVisibility(visible: boolean): void {
    this.setState({ visible })
  }

  public render(): JSX.Element {
    const { visible } = this.state
    const { placeholder, input, meta } = this.props
    const { invalid, touched, active, dirty, error } = meta
    const hasError = invalid && touched && !active && dirty

    return (
      <div styleName="render-password">
        {hasError && <Error styleName="error" msg={error}/>}

        <Password
          invalid={hasError}
          visible={visible}
          placeholder={placeholder}
          onChangeVisibility={this.handleChangeVisibility}
          {...input}/>
      </div>
    )
  }
}

export default CSSModules(RenderPassword, require('./styles.css'))