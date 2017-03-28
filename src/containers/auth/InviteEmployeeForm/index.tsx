import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'
import { ActionCreator } from '../../../utils/actions'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import EmailTextarea from '../../../containers/common/EmailTextarea'


export type Props = {
  onSubmit: (value: string[]) => void
  onChange: (value: string[]) => void
  emails: string[]
}


class InviteEmployeeForm extends Component<Props, {}> {
  public render() {
    const { emails, onChange, onSubmit } = this.props

    return(
      <Form
        styleName="invite-employee-form"
        title="Пригласите сотрудников"
        hint="Чтобы начать совместную работу со своими коллегами, пригласите их через электронную почту">

        <EmailTextarea
          placeholder="Введите email"/>

        <Button
          onClick={() => onSubmit(emails)}
          disabled={emails.length === 0}>
          Пригласить
        </Button>
      </Form>
    )
  }
}

export default CSSModules(InviteEmployeeForm, require('./styles.css'))
