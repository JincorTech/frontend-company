import { createReducer, createAction } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  open: boolean
}

/**
 * Constants
 */
export const OPEN_POPUP = 'jincor/form/renderSelect/OPEN_POPUP'
export const CLOSE_POPUP = 'jincor/form/rederSelect/CLOSE_POPUP'


/**
 * Action Creators
*/
export const openPopup = createAction<void>(OPEN_POPUP)
export const closePopup = createAction<void>(CLOSE_POPUP)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  open: false
})

export default createReducer<State>({
  [OPEN_POPUP]: (state: State): State => state.merge({ open: true }),

  [CLOSE_POPUP]: (state: State): State => state.merge({ open: false })
}, initialState)