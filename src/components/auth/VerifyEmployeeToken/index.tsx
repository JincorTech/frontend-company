import * as React from 'react';
import { SFC, Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { ComponentDecorator, ComponentClass } from 'react-redux';
import * as jwtDecode from 'jwt-decode';

import { Props as EmployeeProps, ComponentProps } from '../../../containers/auth/RegisterEmployee';

export type Props = RouteComponentProps<{}, {}>;

const VerifyEmployeeToken = (ChildComponent: any): any => (props: Props) => {
  const { location, router } = props;
  const { token } = location.query;
  let decoded = null;

  try {
    decoded = jwtDecode(token);
  } catch (e) {
    router.replace('/cmp/auth/signin');
  }

  return decoded && <ChildComponent {...decoded}/>;
};

export default VerifyEmployeeToken;
