import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { registerEmployee, StateMap as StateProps } from '../../../redux/modules/auth/registerEmployee'

import RegisterEmployeeForm from '../../../components/auth/RegisterEmployeeForm'

/**
 * Types
 */
export type Props = StateProps & ComponentProps

export type ComponentProps = {
  verificationId: string
  companyName: string
  pin: string
  email: string
}

/**
 * Component
 */
export const RegisterEmployee: SFC<Props> = ({ companyName, ...props }) => {
  return (
    <div styleName="register-employee">
      <p styleName="title">Приглашение от компании {companyName}</p>

      <RegisterEmployeeForm
        {...props}
        onSubmit={registerEmployee}/>
    </div>
  )
}

const StyledComponent = CSSModules(RegisterEmployee, require('./styles.css'))

export default connect<StateProps, {}, {}>(
  (state) => state.auth.registerEmployee
)(StyledComponent)
