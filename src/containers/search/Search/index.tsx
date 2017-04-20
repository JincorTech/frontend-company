import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import {} from '../../../redux/modules/profile/activityTypes'

import CompanyCard from '../../../components/search/CompanyCard'
import RenderSearch from '../../form/RenderSearch'
import RenderSelect from '../../form/RenderSelect'
// import ActivityTypes from '../../form/RenderActivities/components/ActivityTypes'
import RenderActivityTypes from '../../form/RenderActivityTypes'
import SelectDropdown from '../../../components/common/SelectDropdown'


export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {}

export type StateProps = {}

export type DispatchProps = {}

export type FormFields = {
  search: string
}


class Search extends Component<Props, StateProps> {
  public render(): JSX.Element {
    return (
      <div>
        <div styleName="search">
          <Field
            component={RenderSearch}
            name="search"
            placeholder="Search"
          />

          <div styleName="filters">
            <div styleName="filter">
              <Field
                component={RenderSelect}
                Button={SelectDropdown}
                filter
                modalId="filter1"
                name="filter1"
                placeholder="Все страны"/>
            </div>
            <div styleName="filter">
              <Field
                component={RenderActivityTypes}
                Button={SelectDropdown}
                modalId="filter2"
                name="filter2"
                placeholder="Все отрасли"/>
            </div>
          </div>
        </div>
        <div styleName="result">
          <CompanyCard name="Toyota"/>
          <CompanyCard name="Burger King Burger King"/>
          <CompanyCard name="BMW"/>
          <CompanyCard name="Nokia"/>
          <CompanyCard name="Roket"/>
          <CompanyCard name="HP"/>
          <CompanyCard name="Apple"/>
        </div>
      </div>
    )
  }
}


const StyledComponent = CSSModules(Search, require('./styles.css'))
export default reduxForm<FormFields, ComponentProps>({ form: 'Search' })(StyledComponent)