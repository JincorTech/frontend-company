import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import Popup, { Props as PopupProps } from '../Popup';
import Button from '../Button';

export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  ComponentProps &
  DispatchProps;

export type ComponentProps = {
  title: string,
  userId: string,
  t: Function
};

export type DispatchProps = {
  onConfirm: (userId: string) => void
};

const ConfirmPopup: SFC<Props> = ({ t, title, userId, onClose, onConfirm, ...popupProps }) => (
  <Popup styleName="confirm-popup" onClose={onClose} {...popupProps}>
    <h4 styleName="popup-title">{title}</h4>

    <div styleName="popup-body">
      <div styleName="popup-buttons">
        <Button styleName="popup-cancel-button" onClick={() => onClose()}>{t('cancel')}</Button>
        <Button onClick={() => onConfirm(userId)}>{t('confirm')}</Button>
      </div>
    </div>
  </Popup>
);

export default translate('common')(CSSModules(ConfirmPopup, require('./styles.css')));
