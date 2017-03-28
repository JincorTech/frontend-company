import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import ProgressBar from '../../../components/auth/ProgressBar'
import CreateCompanyForm from '../CreateCompanyForm'
import CreateAccountForm from '../CreateAccountForm'
import ConfirmEmailForm from '../ConfirmEmailForm'
import InviteEmployeeForm from '../InviteEmployeeForm'


export type Props = HTMLProps<HTMLDivElement>

const SignUp: SFC<Props> = (props) => {
  const renderForm = (step: string) => {
    switch (step) {
      case 'company':
        return <CreateCompanyForm onSubmit={() => {}}/>
      case 'account':
        return <CreateAccountForm verificationId="s" onSubmit={() => {}}/>
      case 'email':
        return <ConfirmEmailForm verificationId="s" onSubmit={() => {}}/>
      case 'employee':
        return <InviteEmployeeForm emails={[]} onSubmit={null} onChange={null} />
    }
  }

  return (
    <div styleName="signup">
      <ProgressBar currentStep={1}/>
      {renderForm('employee')}
    </div>
  )
}

export default CSSModules(SignUp, require('./styles.css'))