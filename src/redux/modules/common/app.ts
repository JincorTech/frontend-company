import { createReducer, createAction, Action, createAsyncAction } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'
import { isAuth } from '../../../utils/auth'


/**
 * Types
 */

export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  authorized: boolean,
  sidebarOpen: boolean,
  token: string,
  user: User
}

export type User = {
  id: string,
  profile: UserProfile,
  contacts: UserContacts,
  company: UserCompany
}

export type UserProfile = {
  name: string,
  position: string,
  avatar?: string
}

export type UserContacts = {
  email: string,
  phone?: string
}

export type UserCompany = {
  id: string,
  legalName: string,
  country: {
    id: string,
    name: string
  },
  formattedAddress: string,
  type: string,
  picture: string
}


/**
 * Constants
 */

export const SET_AUTH_STATE = 'common/app/SET_AUTH_STATE'
export const OPEN_SIDEBAR   = 'common/app/OPEN_SIDEBAR'
export const CLOSE_SIDEBAR  = 'common/app/CLOSE_SIDEBAR'
export const FETCH_USER     = 'common/app/FETCH_USER'


/**
 * Action creators
 */

export const setAuthState = createAction<boolean>(SET_AUTH_STATE)
export const openSidebar  = createAction<void>(OPEN_SIDEBAR)
export const closeSidebar = createAction<void>(CLOSE_SIDEBAR)
export const fetchUser    = createAsyncAction<void, User>(FETCH_USER)


/**
 * Reducer
 */

const initialState: State = from<StateMap>({
  authorized: isAuth(),
  sidebarOpen: false,
  token: '',
  user: {
    id: '',
    profile: {
      name: '',
      position: '',
      avatar: ''
    },
    contacts: {
      email: '',
      phone: ''
    },
    company: {
      id: '',
      legalName: '',
      country: {
        id: '',
        name: ''
      },
      formattedAddress: '',
      type: '',
      picture: ''
    }
  }
})

export default createReducer<State>({
  [SET_AUTH_STATE]: (state: State, { payload }: Action<boolean>): State => (
    state.merge({ authorized: payload })
  ),

  [OPEN_SIDEBAR]: (state: State): State => (
    state.merge({ sidebarOpen: true })
  ),

  [CLOSE_SIDEBAR]: (state: State): State => (
    state.merge({ sidebarOpen: false })
  ),

  [fetchUser.SUCCESS]: (state: State, { payload }: Action<User>): State => (
    state.merge({ user: payload })
  )
}, initialState)