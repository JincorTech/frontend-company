import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  open: boolean
  optionFilter: string
  options: Option[]
}

export type Option = {
  value: string
  name: string
}
/**
 * Constants
 */
export const OPEN_POPUP = 'jincor/form/renderFilterSelect/OPEN_POPUP'
export const CLOSE_POPUP = 'jincor/form/rederFilterSelect/CLOSE_POPUP'
export const CHANGE_FILTER = 'jincor/form/renderFilterSelect/CHANGE_FILTER'
export const SET_OPTIONS = 'jincor/form/renderFilterSelect/SET_OPTIONS'

/**
 * Action creators
 */
export const openPopup = createAction<void>(OPEN_POPUP)
export const closePopup = createAction<void>(CLOSE_POPUP)
export const changeFilter = createAction<string>(CHANGE_FILTER)
export const setOptions = createAction<Option[]>(SET_OPTIONS)

/**
 * Reducer
 */
const initialState = from<StateMap>({
  open: false,
  optionFilter: '',
  options: []
})

export default createReducer<State>({
  [OPEN_POPUP]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_POPUP]: (state: State): State => (
    state.merge({ open: false, optionFilter: '' })
  ),

  [CHANGE_FILTER]: (state: State, { payload }: Action<string>): State => (
    state.merge({ optionFilter: payload })
  ),

  [SET_OPTIONS]: (state: State, { payload }: Action<Option[]>): State => (
    state.merge({ options: payload })
  )
}, initialState)