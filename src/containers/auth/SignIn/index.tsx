import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { SubmitHandler } from 'redux-form'

import LogInForm from '../LoginForm'
import CompanyList from '../../../components/auth/CompanyList'

import { StateMap as StateProps } from '../../../redux/modules/auth/signIn'
import { fetchCompanies, selectCompany } from '../../../redux/modules/auth/signIn'
import { FormFields, ComponentProps } from '../LoginForm'

/**
 * Types
 */
export type SignInProps = HTMLProps<HTMLDivElement> & StateProps & DispatchProps

export type DispatchProps = {
  selectCompany: (companyId: string) => void
}

/**
 * Component
 */
const SignUp: SFC<SignInProps> = (props) => {
  const { selectCompany, companies, spinner } = props

  const renderStep = (step: string) => {
    switch (step) {
      case 'login':
        return <LogInForm spinner={spinner} onSubmit={fetchCompanies}/>
      case 'companies':
        return <CompanyList companies={companies} onSelect={selectCompany}/>
    }
  }

  return (
    <div styleName="signin">
      {renderStep('login')}
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponents = CSSModules(SignUp, require('./styles.css'))

export default connect<StateProps, DispatchProps, {}>(
  (state) => state.auth.signIn,
  { selectCompany }
)(StyledComponents)