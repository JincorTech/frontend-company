import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { Field, WrappedFieldArrayProps } from 'redux-form';

import { required } from '../../../utils/validators';

import RenderLinkInput from '../RenderLinkInput';
import AddButton from '../../profile/AddButton';

/**
 * Types
 */
export type Props = WrappedFieldArrayProps<string>;

const RenderLinkInputs: SFC<Props> = (props) => {
  const { fields } = props;

  return (
    <div styleName="link-inputs">
      {fields.map((field, i) => (
        <Field
          key={i}
          name={field}
          placeholder="URL"
          validate={required()}
          component={RenderLinkInput}
          onRemove={() => fields.remove(i)}/>
      ))}
      {fields.length < 4 && <AddButton children="добавить ссылку" onClick={() => fields.push('')}/>}
    </div>
  );
};

/**
 * Decorators
 */
export default CSSModules(RenderLinkInputs, require('./styles.css'));
