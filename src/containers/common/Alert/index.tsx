import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import { closeAlert, StateMap as StateProps} from '../../../redux/modules/common/alert';

import Icon from '../../../components/common/Icon';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  closeAlert: () => void
};

/**
 * Component
 */
const Alert: SFC<Props> = ({msg, closeAlert, open}) => (
  <div styleName={open ? 'open' : 'close'} >
    {msg}

    <Icon
      name="close-alert"
      styleName="close-icon"
      onClick={closeAlert}/>
  </div>
);

/**
 * Decorators
 */
const StyledComponent = CSSModules(Alert, require('./styles.css'));
export default connect<StateProps, DispatchProps, {}>(
  (state) => state.common.alert,
  { closeAlert }
)(StyledComponent);
