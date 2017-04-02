import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { fetchCompany, StateMap as StateProps } from '../../../redux/modules/profile/profile'

import ProfileView from '../ProfileView'
import ProfileEdit from '../ProfileEdit'


/**
 * Types 
 */
export type Props = HTMLProps<HTMLDivElement> & StateProps & DispatchProps

export type DispatchProps = {
  fetchCompany: (id: string) => void
}

/**
 * Component 
 */
class Profile extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchCompany('sa')
  }

  public render(): JSX.Element {
    const { editable, company } = this.props

    return (
      <div styleName="profile">
        { !editable
          ? <ProfileView {...company}/>
          : <ProfileEdit {...company}/>}
      </div>
    )
  }
}

/**
 * Dispatch
 */
const StyledComponent = CSSModules(Profile, require('./styles.css'))
export default connect<StateProps, DispatchProps, {}>(
  (state) => state.profile.profile,
  { fetchCompany }
)(StyledComponent)