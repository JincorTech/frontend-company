import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { WrappedFieldProps } from 'redux-form';
import { translate } from 'react-i18next';

import FieldError from '../../common/FieldError';
import Input from '../../../components/common/Input';

export type InputProps = WrappedFieldProps<any> & {
  placeholder?: string
  onRemove: () => void,
  t: any
};

const RenderLinkInput: SFC<InputProps> = (props) => {
  const { t, placeholder, input, meta, onRemove } = props;
  const { invalid, touched, active, dirty } = meta;
  const hasError = touched && !active && invalid && dirty;

  return <div styleName="social-input">
      <FieldError meta={meta}>
        <Input styleName="input"
          invalid={hasError}
          placeholder={placeholder}
          {...input}/>
      </FieldError>

      <a styleName="remove" children={t('remove')} onClick={onRemove}/>
    </div>;
};

export default translate('form')(CSSModules(RenderLinkInput, require('./styles.css')));
