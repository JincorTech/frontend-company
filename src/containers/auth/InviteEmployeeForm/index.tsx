import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import { inviteEmployee } from '../../../redux/modules/auth/signUp'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import Link from '../../../components/common/Link'
import EmailTextarea from '../../../containers/common/EmailTextarea'

/**
 * Types
 */
export type Props = DispatchProps & StateProps & ComponentProps

export type ComponentProps = {
  spinner: boolean
}

export type DispatchProps = {
  inviteEmployee: () => void
}

export type StateProps = {
  textareaValid: boolean
}

/**
 * Component
 */
class InviteEmployeeForm extends Component<Props, {}> {
  public render() {
    const { inviteEmployee, textareaValid, spinner } = this.props

    return(
      <Form
        styleName="invite-employee-form"
        title="Пригласите сотрудников"
        hint="Чтобы начать совместную работу со своими коллегами, пригласите их через электронную почту">

        <EmailTextarea
          placeholder="Введите email"/>

        <Button
          type="button"
          spinner={spinner}
          disabled={!textareaValid}
          onClick={inviteEmployee}>
          Пригласить
        </Button>

        <Link
          styleName="skip"
          to="/app/profile"
          children="Пропустить"/>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(InviteEmployeeForm, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({ textareaValid : state.common.emailTextarea.valid }),
  { inviteEmployee }
)(StyledComponent)
