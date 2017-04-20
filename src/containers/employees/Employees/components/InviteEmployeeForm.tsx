import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import { inviteEmployees } from '../../../../redux/modules/employees/employees'

import Button from '../../../../components/common/Button'
import EmailTextarea from '../../../common/EmailTextarea'


export type Props = DispatchProps & StateProps & ComponentProps

export type ComponentProps = {
  spinner: boolean
}

export type DispatchProps = {
  inviteEmployees: () => void
}

export type StateProps = {
  textareaValid: boolean
}

class InviteEmployeeForm extends Component<Props, {}> {
  public render() {
    const { inviteEmployees, textareaValid, spinner } = this.props

    return (
      <div styleName="invite-employee-form">
        <div styleName="invite-input">
          <EmailTextarea placeholder="Email через запятую"/>
        </div>

        <Button
          styleName="invite-button"
          type="button"
          spinner={spinner}
          disabled={!textareaValid}
          onClick={inviteEmployees}>
          Пригласить
        </Button>
      </div>
    )
  }
}

const StyledComponent = CSSModules(InviteEmployeeForm, require('../styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({ textareaValid : state.common.emailTextarea.valid }),
  { inviteEmployees }
)(StyledComponent)