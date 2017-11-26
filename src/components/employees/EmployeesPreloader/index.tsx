import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

const EmployeesPreloader: SFC<{}> = () => (
  <div styleName="container">
    <div styleName="invite-employee">
      <div styleName="invite-input"/>
      <div styleName="invite-button"/>
    </div>

    <div styleName="employee">
      <div styleName="avatar"/>

      <div styleName="info">
        <div styleName="name"/>
        <div styleName="position"/>
      </div>
    </div>

    <div styleName="employee">
      <div styleName="avatar"/>

      <div styleName="info">
        <div styleName="name"/>
        <div styleName="position"/>
      </div>
    </div>

    <div styleName="employee">
      <div styleName="avatar"/>

      <div styleName="info">
        <div styleName="name"/>
        <div styleName="position"/>
      </div>
    </div>
  </div>
);

export default CSSModules(EmployeesPreloader, require('./styles.css'));
