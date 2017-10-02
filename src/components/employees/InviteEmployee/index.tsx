import * as React from 'react';
import { SFC } from 'react';
import { connect } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import { inviteEmployees } from '../../../redux/modules/employees/employees';

import Button from '../../../components/common/Button';
import EmailTextarea from '../../../containers/common/EmailTextarea';

export type Props = DispatchProps & StateProps & ComponentProps;

export type ComponentProps = {
  spinner: boolean,
  t?: any
};

export type DispatchProps = {
  inviteEmployees: () => void
};

export type StateProps = {
  textareaValid: boolean
};

const InviteEmployee: SFC<Props> = (props) => {
  const { t, inviteEmployees, textareaValid, spinner } = props;

  return (
    <div styleName="invite-employee">
      <div styleName="invite-input">
        <EmailTextarea
          placeholder={t('emailsPlaceholder')}/>
      </div>

      <Button
        styleName="invite-button"
        type="button"
        spinner={spinner}
        disabled={!textareaValid}
        onClick={inviteEmployees}>
        {t('invite')}
      </Button>
    </div>
  );
};

const StyledComponent = CSSModules(InviteEmployee, require('./styles.css'));
const TranslatedComponent = translate('employees')(StyledComponent);

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({ textareaValid : state.common.emailTextarea.valid }),
  { inviteEmployees }
)(TranslatedComponent);
