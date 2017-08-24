import * as React from 'react';
import { Component, HTMLProps } from 'react';
import * as Notifications from 'react-notification-system-redux';
import { render, unmountComponentAtNode } from 'react-dom';

// TODO don't forget about dat
import { Provider, connect } from 'react-redux';
import store from '../../../redux/store';

import style from './style';
const { notification } = require('./styles.css');

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & ComponentProps;

export type ComponentProps = {
  notifications: any
};

/**
 * Component
 */
class Notification extends Component<Props, {}> {
  private portal: HTMLDivElement;

  /**
   * Create portal element
   */
  public componentDidMount(): void {
    this.portal = document.createElement('div');
    this.portal.id = 'notifications';

    document.body.appendChild(this.portal);

    this.renderNotification();
  }

  /**
   * Remove portal element
   */
  public componentWillUnmount(): void {
    unmountComponentAtNode(this.portal);
    document.body.removeChild(this.portal);
  }

  private componentDidUpdate(): void {
    this.renderNotification();
  }

  private renderNotification(): void {
    const { notifications } = this.props;

    render (
      <Provider store={store}>
        <div className={ notification }>
          <Notifications style={style} notifications={notifications}/>
        </div>
      </Provider>,
      document.getElementById('notifications')
    );
  }

  /**
   * Stop render
   */
  public render(): JSX.Element {
    return null;
  }
}

export default connect(
  (state) => ({
    notifications: state.notifications
  })
)(Notification);
