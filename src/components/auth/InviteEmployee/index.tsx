import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';
import { routes } from '../../../routes';

import { inviteEmployee } from '../../../redux/modules/auth/signUp';
import { resetTextarea } from '../../../redux/modules/common/emailTextarea';

import Form from '../../../components/form/Form';
import Button from '../../../components/common/Button';
import Link from '../../../components/common/Link';
import EmailTextarea from '../../../containers/common/EmailTextarea';

/**
 * Types
 */
export type Props = DispatchProps & StateProps & ComponentProps;

export type ComponentProps = {
  spinner: boolean,
  t?: any
};

export type DispatchProps = {
  inviteEmployee: () => void
  resetTextarea: () => void
};

export type StateProps = {
  textareaValid: boolean
};

/**
 * Component
 */
class InviteEmployee extends Component<Props, {}> {
  public componentWillUnmount(): void {
    this.props.resetTextarea();
  }

  public render(): JSX.Element {
    const { t, inviteEmployee, textareaValid, spinner } = this.props;

    return (
      <Form
        styleName="invite-employee-form"
        title={t('inviteEmployees')}
        hint={t('inviteEmployeesHint')}>

        <EmailTextarea
          placeholder={t('enterEmail')}/>

        <Button
          type="button"
          spinner={spinner}
          disabled={!textareaValid}
          onClick={inviteEmployee}>
          {t('invite')}
        </Button>

        <Link
          styleName="skip"
          to={routes.profile}
          children={t('skip')}/>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(InviteEmployee, require('./styles.css'));
const TranslatedComponent = translate('auth')(StyledComponent);

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({ textareaValid : state.common.emailTextarea.valid }),
  { inviteEmployee, resetTextarea }
)(TranslatedComponent);
