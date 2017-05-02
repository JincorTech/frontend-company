import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, FormProps, Field, SubmitHandler } from 'redux-form'
import { connect } from 'react-redux'

import { fetchCountries, fetchCompanyTypes } from '../../../redux/modules/auth/createCompany'
import { companyTypeOptionSelector, countryOptionSelector } from '../../../selectors/auth/createCompany'
import { ActionCreator } from '../../../utils/actions'
import { CompanyType, Country } from '../../../redux/modules/auth/createCompany'
import { initialValues, validate } from '../../../helpers/auth/createCompany'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'
import RenderSelect from '../../../containers/form/RenderSelect'

/**
 * Types
 */
export type Props = ReduxFormProps & StateProps & DispatchProps

export type StateProps = {
  countries: Option[]
  companyTypes: Option[]
}

export type DispatchProps = {
  fetchCompanyTypes: ActionCreator<void>
  fetchCountries: ActionCreator<void>
}

export type ReduxFormProps = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  spinner: boolean
}

export type FormFields = {
  countryId: string
  companyType: string
  legalName: string
}

export type Option = {
  value: string
  name: string
}

/**
 * Component
 */
class CreateCompanyForm extends Component<Props, {}> {
  public componentDidMount(): void {
    const { fetchCountries, fetchCompanyTypes } = this.props

    fetchCompanyTypes()
    fetchCountries()
  }

  public render(): JSX.Element {
    const {
      spinner,
      countries,
      companyTypes,
      handleSubmit,
      invalid,
      error
    } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-company"
        title="Регистрация компании"
        hint="Чтобы начать совместную работу со своими коллегами, нужно добавить свою компанию">

        <Field
          component={RenderSelect}
          name="countryId"
          modalId="select-country"
          filter
          options={countries}
          placeholder="Страна"/>

        <Field
          component={RenderSelect}
          name="companyType"
          modalId="select-company-type"
          options={companyTypes}
          placeholder="Тип компании"/>

        <Field
          component={RenderInput}
          name="legalName"
          type="text"
          placeholder="Название компании"/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Добавить</Button>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CreateCompanyForm, require('./styles.css'))

const FormComponent = reduxForm<FormFields, ComponentProps>({
  form: 'company',
  initialValues,
  validate
})(StyledComponent)

export default connect<StateProps, DispatchProps, ReduxFormProps>(
  ({ auth: { createCompany }}) => ({
    countries: countryOptionSelector(createCompany),
    companyTypes: companyTypeOptionSelector(createCompany)
  }),
  { fetchCountries, fetchCompanyTypes }
)(FormComponent)