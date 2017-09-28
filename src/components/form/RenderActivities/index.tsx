import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { WrappedFieldProps, WrappedFieldArrayProps, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { required } from '../../../utils/validators';

import AddInput from '../../profile/AddButton';
import RenderActivity from '../RenderActivity';

/**
 * Render activity field array
 */
export type Props = ComponentProps & WrappedFieldArrayProps<string>;

export type ComponentProps = {
  t: Function
};

const RenderActivities: SFC<Props> = (props) => {
  const { t, fields } = props;

  return (
    <div styleName="activity-list">
      {fields.map((field, i) => (
        <div styleName="group" key={i}>
          <Field
            index={i}
            name={field}
            component={RenderActivity}
            validate={required()}
            styleName="activity-field"
            placeholder={i > 0 ? t('additionalActivityField') : t('mainActivityField')}/>
            <a styleName="activity-remove" onClick={() => fields.remove(i)}>{t('remove')}</a>
        </div>
      ))}
      {fields.length < 3 && <AddInput children={t('addBranch')} onClick={() => fields.push('')}/>}
    </div>
  );
};

/**
 * Decorator
 */
export default translate('form')(CSSModules(RenderActivities, require('./styles.css')));
