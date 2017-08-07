import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, FormProps, Field, SubmitHandler } from 'redux-form';
import { connect } from 'react-redux';

import { fetchDict } from '../../../redux/modules/auth/signUp';
import { ActionCreator } from '../../../utils/actions';
import { required, minLength, maxLength } from '../../../utils/validators';

import Form from '../../../components/form/Form';
import Button from '../../../components/common/Button';
import RenderInput from '../../../components/form/RenderInput';
import RenderSelect from '../../../components/form/RenderSelect';

/**
 * Types
 */
export type Props = ReduxFormProps & DispatchProps;

export type DispatchProps = {
  fetchCountriesAndTypes: ActionCreator<void>
};

export type ReduxFormProps = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  spinner: boolean
};

export type FormFields = {
  countryId: string
  companyType: string
  legalName: string
};

/**
 * Component
 */
class CreateCompanyForm extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchCountriesAndTypes();
  }

  public render(): JSX.Element {
    const {
      spinner,
      handleSubmit,
      invalid,
      error
    } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-company"
        title="Регистрация компании"
        hint="Чтобы начать совместную работу со своими коллегами, нужно добавить свою компанию">

        <Field
          filter
          component={RenderSelect}
          name="countryId"
          modalId="select-country"
          placeholder="Страна"
          validate={required()}/>

        <Field
          component={RenderSelect}
          name="companyType"
          modalId="select-company-type"
          placeholder="Тип компании"
          validate={required()}/>

        <Field
          component={RenderInput}
          name="legalName"
          type="text"
          placeholder="Название компании"
          validate={[
            required(),
            minLength(3),
            maxLength(60)
          ]}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Добавить</Button>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CreateCompanyForm, require('./styles.css'));

const FormComponent = reduxForm<FormFields, ComponentProps>({
  form: 'company',
  initialValues: {
    countryId: '',
    companyType: '',
    legalName: ''
  }
})(StyledComponent);

export default connect<{}, DispatchProps, ReduxFormProps>(
  () => ({}),
  { fetchCountriesAndTypes: fetchDict }
)(FormComponent);
