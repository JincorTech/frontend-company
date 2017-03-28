import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  open: boolean
  flipped: boolean
  descCollapsed: boolean
}

/**
 * Action types
 */
export const OPEN_CARD = 'jincor/common/companyCard/OPEN_CARD'
export const CLOSE_CARD = 'jincor/common/companyCard/CLOSE_CARD'
export const FLIP_CARD = 'jincor/common/companyCard/FLIP_CARD'
export const COLLAPSE_DESC = 'jincor/common/companyCard/COLLAPSE_COMPANY_DESC'

/**
 * Action creators
 */
export const openCompanyCard = createAction<void>(OPEN_CARD)
export const closeCompanyCard = createAction<void>(CLOSE_CARD)
export const flipCompanyCard = createAction<boolean>(FLIP_CARD)
export const collapseDescription = createAction<boolean>(COLLAPSE_DESC)

/** 
 * Reducer
 */
const initialState: State = from<StateMap>({
  open: false,
  flipped: false,
  descCollapsed: false
})

export default createReducer<State>({
  [OPEN_CARD]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_CARD]: (state: State): State => (
    state.merge({ open: false })
  ),

  [FLIP_CARD]: (state: State, { payload }: Action<boolean>): State => (
    state.merge({ flipped: payload })
  ),

  [COLLAPSE_DESC]: (state: State, { payload }: Action<boolean>): State => (
    state.merge({ descCollapsed: payload })
  )
}, initialState)