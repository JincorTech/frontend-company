import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import RequestPasswordForm from '../RequestPasswordForm'
import ConfirmPasswordForm from '../ConfirmPasswordForm'
import NewPasswordForm from '../NewPasswordForm'
import CompanyList from '../../../components/auth/CompanyList'

export type SignInProps = HTMLProps<HTMLDivElement>

const SignUp: SFC<SignInProps> = (props) => {
  const renderStep = (step: string) => {
    switch (step) {
      case 'requestEmail':
        return <RequestPasswordForm onSubmit={null}/>
      case 'confirmEmail':
        return <ConfirmPasswordForm onSubmit={null}/>
      case 'companies':
        return <CompanyList companies={[]} onSelect={null}/>
      case 'newPassword':
        return <NewPasswordForm passwordVisible={false} onSubmit={null} onChangePasswordVisibility={null}/>
    }
  }

  return (
    <div styleName="restore-password">
      {renderStep('newPassword')}
    </div>
  )
}

export default CSSModules(SignUp, require('./styles.css'))