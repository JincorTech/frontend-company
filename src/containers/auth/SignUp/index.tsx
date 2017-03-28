import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { createCompany, verifyEmail, confirmEmail, inviteEmployee, StateMap as StateProps, Step } from '../../../redux/modules/auth/signUp'

import ProgressBar from '../../../components/auth/ProgressBar'
import CreateCompanyForm from '../CreateCompanyForm'
import CreateAccountForm from '../CreateAccountForm'
import ConfirmEmailForm from '../ConfirmEmailForm'
import InviteEmployeeForm from '../InviteEmployeeForm'


export type Props = ComponentProps & StateProps

export type ComponentProps = HTMLProps<HTMLDivElement>


const SignUp: SFC<Props> = (props) => {
  const { step, stepIndex, company: { verificationId } } = props

  const renderForm = (step: Step) => {
    switch (step) {
      case 'company':
        return <CreateCompanyForm onSubmit={createCompany}/>
      case 'account':
        return <CreateAccountForm onSubmit={verifyEmail} verificationId={verificationId}/>
      case 'email':
        return <ConfirmEmailForm onSubmit={confirmEmail} verificationId={verificationId}/>
      case 'employee':
        return <InviteEmployeeForm />
    }
  }

  return (
    <div styleName="signup">
      <ProgressBar currentStep={stepIndex}/>
      {renderForm(step)}
    </div>
  )
}

const StyledComponent = CSSModules(SignUp, require('./styles.css'))
export default connect<StateProps, {}, Props>(
  (state) => state.auth.signUp
)(StyledComponent)