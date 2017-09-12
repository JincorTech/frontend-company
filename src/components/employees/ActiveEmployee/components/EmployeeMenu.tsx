import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

const EmployeeMenu: SFC<{}> = ({ children }) => (
  <div styleName="settings">
    <div styleName="button">
      <div styleName="menu">
        {children}
      </div>
    </div>
  </div>
);

export default CSSModules(EmployeeMenu, require('../styles.css'));
