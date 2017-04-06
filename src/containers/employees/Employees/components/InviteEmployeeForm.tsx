import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'

import Button from '../../../../components/common/Button'
import EmailTextarea from '../../../common/EmailTextarea'


export type Props = ComponentProps & DispatchProps & StateProps

export type ComponentProps = {
  spinner: boolean
}

export type DispatchProps = {
  inviteEmployee: () => void
}

export type StateProps = {
  textareaValid: boolean
}

class InviteEmployeeForm extends Component<Props, {}> {
  public render() {
    const { inviteEmployee, textareaValid, spinner } = this.props

    return (
      <form styleName="invite-employee-form">
        <div styleName="invite-input">
          <EmailTextarea placeholder="Email через запятую"/>
        </div>

        <Button
          styleName="invite-button"
          type="button"
          spinner={spinner}
          disabled={!textareaValid}
          onClick={inviteEmployee}>
          Пригласить
        </Button>
      </form>
    )
  }
}

export default CSSModules(InviteEmployeeForm, require('../styles.css'))
