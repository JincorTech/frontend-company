import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import * as isEqual from 'shallowequal'

import { fetchActivities } from '../../../redux/modules/common/activityTypes'
import { search, fetchCountries, StateMap as StateProps, SearchRequest } from '../../../redux/modules/search/search'
import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { Company as CompanyProps } from '../../../redux/modules/profile/profileView'

import * as Waypoint from 'react-waypoint'
import ProgressBar from 'react-redux-loading-bar'
import CompanyCard from '../../../components/search/CompanyCard'
import Select from '../../common/Select'
import ActivityTypes from '../../common/ActivityTypes'
import SelectDropdown from '../../../components/common/SelectDropdown'


export type Props = ComponentProps & DispatchProps & StateProps & {
  loadingBar: number
}

export type ComponentProps = {
  request: string
  activity: string
  country: string
  page: number
}

export type DispatchProps = {
  fetchActivities: () => void
  fetchCountries: () => void
  search: (req: SearchRequest) => void
  handleCountryChange: (e: any) => void
  openCompanyCard: (company: CompanyProps) => void
}


class Search extends Component<Props, ComponentProps> {
  constructor(props) {
    super(props)

    this.state = {
      request: this.props.request || '',
      country: this.props.country || '',
      activity: this.props.activity || '',
      page: 0
    }

    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleActivityChange = this.handleActivityChange.bind(this)
    this.handleRequestChange = this.handleRequestChange.bind(this)
    // this.pushCompanies = this.pushCompanies.bind(this)
  }

  public componentWillMount(): void {
    const { fetchActivities, fetchCountries } = this.props

    fetchActivities()
    fetchCountries()
  }

  private handleCountryChange(country: string): void {
    this.setState({ country })
  }

  private handleActivityChange(activity: string): void {
    this.setState({ activity })
  }

  private handleRequestChange({ target: { value: request } }): void {
    this.setState({ request })
  }

  // private pushCompanies(): void {
  //   this.setState({ page: this.state.page + this.props.meta.pagination.perPage })
  //   console.log(`fetch request blah blah ${this.state.page + this.props.meta.pagination.perPage}`)
  // }

  public componentWillUpdate(nextProps, nextState): void {
    if (!isEqual(this.state, nextState) && nextState.request.length > 2) {
      const { search } = this.props
      const { request, country, activity } = nextState

      search({ request, country, activity })
    }
  }

  public render(): JSX.Element {
    const { companies, openCompanyCard, loadingBar } = this.props

    return (
      <div>
        <div styleName="search">
          <div styleName="search-field-wrapper">
            <input
              type="text"
              styleName="search-field"
              placeholder="Поиск компаний"
              value={this.state.request}
              onChange={this.handleRequestChange}/>
              {!!loadingBar
                && <ProgressBar
                  style={{
                    backgroundColor: '#0070e0',
                    height: '2px',
                    bottom: '0px',
                    transition: 'transform 500ms linear'
                  }}/>
              }
          </div>

          <div styleName="filters">
            <div styleName="filter">
              <Select
                modalId="select-country"
                filter
                title="Выбрать страну"
                options={[]}
                button={<SelectDropdown/>}
                optionValue={this.state.country}
                onChange={this.handleCountryChange}
                onBlur={() => {}}
                placeholder="Все страны"/>
            </div>
            <div styleName="filter">
              <ActivityTypes
                name="select-activity-type"
                button={<SelectDropdown/>}
                title="Выбрать отрасль"
                onActivitySelect={this.handleActivityChange}
                activityValue={this.state.activity}
                placeholder="Все отрасли"/>
            </div>
          </div>
        </div>
        <div styleName="result">
          {companies.map((company) =>
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() =>
                openCompanyCard(company)}/>
          )}
        </div>

        {/*<Waypoint onEnter={this.pushCompanies}/>*/}
      </div>
    )
  }
}


const StyledComponent = CSSModules(Search, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => ({
    loadingBar: state.loadingBar,
    ...state.search.search
  }),
  { fetchActivities, fetchCountries, search, openCompanyCard }
)(StyledComponent)
