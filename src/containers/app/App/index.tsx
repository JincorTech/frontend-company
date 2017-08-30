import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import { checkAuth, StateMap as StateProps } from '../../../redux/modules/app/app';
import Notification from '../../../components/common/Notification';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  checkAuth: () => void
};

/**
 * Component
 */
class App extends Component<Props, StateProps> {
  public componentWillMount(): void {
    this.props.checkAuth();
  }

  render() {
    return (
      <div styleName="app">
        {this.props.children}
        <Notification/>
      </div>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(App, require('./styles.css'));

export default connect<StateProps, DispatchProps, {}>(
  state => state.app.app,
  { checkAuth }
)(StyledComponent);
