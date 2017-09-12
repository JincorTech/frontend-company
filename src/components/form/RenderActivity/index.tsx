import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { InjectedCSSModuleProps } from 'react-css-modules';
import { WrappedFieldProps } from 'redux-form';

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
  onActivitySelect: (activityId: string) => void
};

export const RenderActivity: SFC<Props> = (props) => {
  const {
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
          title="Основная сфера деятельности"
          name={`profile-edit-at-${index}`}
          onActivitySelect={(id: any) => onChange(id)}
          activityValue={value}
          placeholder={placeholder}
          {...inputProps}/>
      </FieldError>
    </div>
  );
};

export default CSSModules(RenderActivity, require('./styles.css'));
