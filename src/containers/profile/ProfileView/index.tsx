import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { fetchCompany, Company, resetState, State as StateProps } from '../../../redux/modules/profile/profileView'

import CompanyInfo from '../../../components/profile/CompanyInfo'
import CompanyPreloader from '../../../components/profile/CompanyInfoPreloader'


export type Props = DispatchProps & StateProps

export type DispatchProps = {
  fetchCompany: () => void
  openCompanyCard: (company: Company) => void
  resetState: () => void
}


class ProfileView extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchCompany()
  }

  public componentWillUnmount(): void {
    this.props.resetState()
  }

  public render(): JSX.Element {
    const { openCompanyCard, company, preloader } = this.props

    return preloader
      ? <CompanyPreloader/>
      : <CompanyInfo
          openCompanyCard={openCompanyCard}
          company={company}/>
  }
}

export default connect<StateProps, DispatchProps, {}>(
  ({ profile: { profileView }}) => profileView,
  { openCompanyCard, fetchCompany, resetState }
)(ProfileView)
