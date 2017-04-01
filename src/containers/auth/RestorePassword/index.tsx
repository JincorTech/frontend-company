import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import {
  restorePassword,
  confirmEmail,
  setNewPassword,
  selectCompany,
  StateMap as StateProps,
  Step
} from '../../../redux/modules/auth/restorePassword'

import RequestPasswordForm from '../RequestPasswordForm'
import ConfirmPasswordForm from '../ConfirmPasswordForm'
import NewPasswordForm from '../NewPasswordForm'
import CompanyList from '../../../components/auth/CompanyList'

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = HTMLProps<HTMLDivElement>

export type DispatchProps = {
  selectCompany: (companyId: string) => void
}

/**
 * Component
 */
const RestorePassword: SFC<Props> = (props) => {
  const { spinner, selectCompany, step, companies } = props

  const renderStep = (step: Step): JSX.Element => {
    switch (step) {
      case 'email':
        return <RequestPasswordForm spinner={spinner} onSubmit={restorePassword}/>
      case 'confirm':
        return <ConfirmPasswordForm spinner={spinner} onSubmit={confirmEmail}/>
      case 'companies':
        return <CompanyList companies={companies} onSelect={selectCompany}/>
      case 'new':
        return <NewPasswordForm spinner={spinner}  onSubmit={setNewPassword}/>
    }
  }

  return (
    <div styleName="restore-password">
      {renderStep(step)}
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(RestorePassword, require('./styles.css'))
export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.auth.restorePassword,
  { selectCompany }
)(StyledComponent)