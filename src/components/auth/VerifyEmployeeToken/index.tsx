import * as React from 'react'
import { SFC, Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { ComponentDecorator, ComponentClass } from 'react-redux'
import * as jwtDecode from 'jwt-decode'

import { Props as EmployeeProps, ComponentProps } from '../../../containers/auth/RegisterEmployee'


export type Props = RouteComponentProps<{}, {}>

// TODO: Set types
function VerifyEmployeeToken(RegisterEmployee: any): any {
  return class VerifyToken extends Component<Props, any> {
    public render(): JSX.Element {
      const { location, router } = this.props
      const { token } = location.query
      let decoded = null

      try {
        decoded = jwtDecode(token)
      } catch (e) {
        router.replace('/auth/signin')
      }

      return decoded && <RegisterEmployee {...decoded}/>
    }
  }
}

export default VerifyEmployeeToken