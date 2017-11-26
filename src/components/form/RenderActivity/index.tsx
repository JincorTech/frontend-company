import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { InjectedCSSModuleProps } from 'react-css-modules';
import { WrappedFieldProps } from 'redux-form';
import { translate } from 'react-i18next';

import FieldError from '../../common/FieldError';
import ActivityTypes from '../../../containers/common/ActivityTypes';
import SelectInput from '../../common/SelectInput';

/**
 * Render activity field
 */
export type Props = WrappedFieldProps<any> & InjectedCSSModuleProps & {
  open: boolean
  index: number
  placeholder: string
  openPopup: () => void
  closePopup: () => void
  onActivitySelect: (activityId: string) => void,
  t: Function
};

export const RenderActivity: SFC<Props> = (props) => {
  const {
    t,
    placeholder,
    input,
    meta,
    index,
    styles,
    open,
    openPopup,
    closePopup,
    ...inputProps
  } = props;

  const { value, onChange } = input;
  const button = <SelectInput className={styles['select-input']}/>;

  return (
    <div styleName="render-activity">
      <FieldError meta={meta}>
        <ActivityTypes
          button={button}
          title={t('mainActivityField')}
          name={`profile-edit-at-${index}`}
          onActivitySelect={(id: any) => onChange(id)}
          activityValue={value}
          placeholder={placeholder}
          {...inputProps}/>
      </FieldError>
    </div>
  );
};

const StyledComponent = CSSModules(RenderActivity, require('./styles.css'));
const TranslatedComponent = translate('form')(StyledComponent);

export default TranslatedComponent;
