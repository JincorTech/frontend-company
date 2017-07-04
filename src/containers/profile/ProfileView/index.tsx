import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { fetchCompany, Company as CompanyProps, resetState } from '../../../redux/modules/profile/profileView'
import { AuthProps } from '../../../redux/modules/app/app'

import CompanyInfo from '../../../components/profile/CompanyInfo'
import CompanyPreloader from '../../../components/profile/CompanyInfoPreloader'


export type Props = DispatchProps & StateProps

export type StateProps = {
  preloader: boolean
  company: CompanyProps
  auth: AuthProps
}

export type DispatchProps = {
  fetchCompany: () => void
  openCompanyCard: (company: CompanyProps) => void
  resetState: () => void
}


class ProfileView extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchCompany()
  }

  public componentWillUnmount(): void {
    this.props.resetState()
  }

  public render(): JSX.Element {
    const { openCompanyCard, company, auth, preloader } = this.props

    return preloader
      ? <CompanyPreloader/>
      : <CompanyInfo
          openCompanyCard={openCompanyCard}
          company={company}
          auth={auth}/>
  }
}

export default connect<StateProps, DispatchProps, {}>(
  (state) => ({
    ...state.profile.profileView,
    auth: state.app.app
  }),
  { openCompanyCard, fetchCompany, resetState }
)(ProfileView)
