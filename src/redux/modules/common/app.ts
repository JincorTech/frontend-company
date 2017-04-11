import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'
import { isAuth } from '../../../utils/auth'
/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  authorized: boolean
  sidebarOpen: boolean
  token: string
}

/**
 * Constants
 */
export const SET_AUTH_STATE = 'common/app/SET_AUTH_STATE'
export const OPEN_SIDEBAR   = 'common/app/OPEN_SIDEBAR'
export const CLOSE_SIDEBAR  = 'common/app/CLOSE_SIDEBAR'

/**
 * Action creators
 */
export const setAuthState = createAction<boolean>(SET_AUTH_STATE)
export const openSidebar  = createAction<void>(OPEN_SIDEBAR)
export const closeSidebar = createAction<void>(CLOSE_SIDEBAR)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  authorized: isAuth(),
  sidebarOpen: false,
  token: ''
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
  )
}, initialState)