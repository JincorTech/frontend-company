import * as React from 'react'
import { Component, HTMLProps } from 'react'
import { connect } from 'react-redux'

import { fetchActivities } from '../../../redux/modules/common/activityTypes'
import { fetchProfile, updateCities, resetState, StateMap as StateProps } from '../../../redux/modules/profile/profileEdit'

import CompanyForm from '../../../components/profile/CompanyForm'
import CompanyFormPreloader from '../../../components/profile/CompanyFormPreloader'

/**
 * Types
 */
export type Props = DispatchProps & StateProps

export type DispatchProps = {
  fetchActivities: () => void
  fetchProfile: () => void
  updateCities: (countryId: string) => void,
  resetState: () => void
}


/**
 * Component
 */
class ProfileEdit extends Component<Props, {}> {
  public componentDidMount(): void {
    const { fetchActivities, fetchProfile } = this.props

    fetchActivities()
    fetchProfile()
  }

  public componentWillUnmount(): void {
    this.props.resetState()
  }

  public render(): JSX.Element {
    const { updateCities, spinner, src, preloader } = this.props

    return <div>
      {preloader && <CompanyFormPreloader/>}
      <CompanyForm
        style={{ display: preloader ? 'none' : 'block' }}
        updateCities={updateCities}
        spinner={spinner}
        logo={src}/>
    </div>
  }
}

/**
 * Decorators
 */
export default connect<StateProps, DispatchProps, {}>(
  (state) => state.profile.profileEdit,
  { fetchActivities, fetchProfile, updateCities, resetState }
)(ProfileEdit)