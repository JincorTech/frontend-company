import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import { required, minLength, maxLength } from '../../../utils/validators';

import Button from '../../common/Button';
import RenderInput from '../../form/RenderInput';
import RenderImageUpload from '../../form/RenderImageUpload';

/**
 * Types
 */

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onMount: () => void
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  onCancel: () => void
  avatar: string
  spinner: boolean,
  t: any
};

export type FormFields = {
  avatar: string
  firstName: string
  lastName: string
  position: string
};

/**
 * Component
 */

class CardUpdateProfile extends Component<Props, {}> {
  public componentWillMount(): void {
    this.props.onMount();
  }

  private renderBlackout(): JSX.Element {
    const { avatar } = this.props;

    const blackout = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundImage: avatar
        ? `linear-gradient(to bottom,
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.15) 32%,
          rgba(0, 0, 0, 0.15) 66%,
          rgba(0, 0, 0, 0.4))`
        : 'rgba(0, 0, 0, .2)'
    };

    const camera = {
      top: '20px',
      left: '20px',
      right: 'auto',
      bottom: 'auto'
    };

    return (
      <div style={blackout}>
        <div styleName="camera" style={camera}/>
      </div>
    );
  }

  public render(): JSX.Element {
    const { t, invalid, handleSubmit, onCancel, avatar, spinner } = this.props;

    const NameMaxLength = 36;
    const PositionMinLength = 2;
    const PositionMaxLength = 60;

    return (
      <div styleName="edit-profile">
        <form
          onSubmit={handleSubmit}
          styleName="profile-bottom-form">

          <div styleName="avatar-upload">
            <Field
              src={avatar}
              component={RenderImageUpload}
              overlay={this.renderBlackout()}
              styleName="upload-field"
              name="avatar"
              width={325}
              height={325}/>
          </div>

          <Field
            component={RenderInput}
            validate={[
              required(t('fieldCantBeEmpty')),
              maxLength(36, t('maxSymbols', { count: NameMaxLength }))
            ]}
            name="firstName"
            type="text"
            placeholder={t('firstName')}/>

          <Field
            component={RenderInput}
            validate={[
              required(t('fieldCantBeEmpty')),
              maxLength(36, t('maxSymbols', { count: NameMaxLength }))
            ]}
            name="lastName"
            type="text"
            placeholder={t('lastName')}/>

          <Field
            component={RenderInput}
            validate={[
              required(),
              minLength(2, t('minSymbols', { count: PositionMinLength })),
              maxLength(60, t('maxSymbols', { count: PositionMaxLength }))
            ]}
            name="position"
            type="text"
            placeholder={t('position')}/>

          <div styleName="form-buttons">
            <Button type="button" styleName="form-cancel-button" onClick={onCancel}>{t('cancel')}</Button>
            <Button type="submit" styleName="form-submit-button" disabled={invalid} spinner={spinner}>{t('save')}</Button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Export
 */

const StyledComponent = translate('app')(CSSModules(CardUpdateProfile, require('./styles.css')));

export default reduxForm<FormFields, ComponentProps>({
  form: 'cardUpdateProfile'
})(StyledComponent);
