import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { RouteComponentProps, RouteComponent } from 'react-router'

import { registerEmployee, StateMap as StateProps } from '../../../redux/modules/auth/registerEmployee'

import RegisterEmployeeForm from '../RegisterEmployeeForm'

/**
 * Types
 */
export type Props = StateProps & ComponentProps

export type RouteParams = {
  verificationId: string
}

export type ComponentProps = RouteComponentProps<StateProps, RouteParams>

/**
 * Component
 */
const RegisterEmployee: SFC<Props> = ({ spinner, params: { verificationId }}) => {
  return (
    <div styleName="register-employee">
      <p styleName="title">Приглашение от компании Ромашка</p>

      <RegisterEmployeeForm
        spinner={spinner}
        verificationId={verificationId}
        onSubmit={registerEmployee}/>
    </div>
  )
}

const StyledComponent = CSSModules(RegisterEmployee, require('./styles.css'))

export default connect<StateProps, {}, {}>(
  (state) => state.auth.registerEmployee
)(StyledComponent)