import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import * as isEqual from 'shallowequal'

import { fetchActivities } from '../../../redux/modules/common/activityTypes'
import { search, fetchCountries, nextPage, StateMap as StateProps, SearchRequest } from '../../../redux/modules/search/search'
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
}

export type DispatchProps = {
  fetchActivities: () => void
  fetchCountries: () => void
  search: (req: SearchRequest) => void
  handleCountryChange: (e: any) => void
  openCompanyCard: (company: CompanyProps) => void
  nextPage: (req: SearchRequest) => void
}


class Search extends Component<Props, ComponentProps> {
  constructor(props) {
    super(props)

    this.state = {
      request: this.props.request || '',
      country: this.props.country || '',
      activity: this.props.activity || ''
    }

    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleActivityChange = this.handleActivityChange.bind(this)
    this.handleRequestChange = this.handleRequestChange.bind(this)
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

  private renderWaypoint(): JSX.Element {
    const { companies, isLoading, meta } = this.props
    const { pagination: { perPage, currentPage, lastPage } } = meta

    if (!isLoading && companies.length >= perPage && currentPage < lastPage) {
      return <Waypoint onEnter={() => this.pushCompanies()} scrollableAncestor={window}/>
    }
  }

  private pushCompanies(): void {
    const { nextPage, meta, page } = this.props
    const { pagination: { perPage } } = meta
    const { request, country, activity } = this.state

    nextPage({ request, country, activity, perPage, page: page + 1 })
  }

  public componentWillUpdate(nextProps, nextState): void {
    if (!isEqual(this.state, nextState)) {
      const { search, meta, page } = this.props
      const { pagination: { perPage } } = meta
      const { request, country, activity } = nextState

      search({ request, country, activity, perPage, page })
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

        {this.renderWaypoint()}
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
  { fetchActivities, fetchCountries, search, nextPage, openCompanyCard }
)(StyledComponent)
