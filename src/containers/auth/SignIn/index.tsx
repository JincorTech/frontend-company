import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import LogInForm from '../LoginForm'
import CompanyList from '../../../components/auth/CompanyList'

export type SignInProps = HTMLProps<HTMLDivElement>

const SignUp: SFC<SignInProps> = (props) => {
  const renderStep = (step: string) => {
    switch (step) {
      case 'login':
        return <LogInForm passwordVisible={false} onSubmit={null} onChangePasswordVibility={null}/>
      case 'companies':
        return <CompanyList companies={[
          {
            id: 'string',
            legalName: 'string',
            country: 'string',
            formattedAddress: 'string',
            type: 'string'
          },
          {
            id: 'string',
            legalName: 'string',
            country: 'string',
            formattedAddress: 'string',
            type: 'string'
          },
          {
            id: 'string',
            legalName: 'string',
            country: 'string',
            formattedAddress: 'string',
            type: 'string'
          }
        ]} onSelect={null}/>
    }
  }

  return (
    <div styleName="signin">
      {renderStep('companies')}
    </div>
  )
}

export default CSSModules(SignUp, require('./styles.css'))