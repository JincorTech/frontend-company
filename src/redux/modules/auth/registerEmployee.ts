import { createSubmitAction, createReducer } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { FormFields as EmployeeFields } from '../../../components/auth/RegisterEmployeeForm'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  spinner: boolean
}

/**
 * Action types
 */
export const REGISTER_EMPLOYEE = 'auth/registerEmployee/REGISTER_EMPLOYEE'

/**
 * Action creators
 */
export const registerEmployee = createSubmitAction<EmployeeFields, void>(REGISTER_EMPLOYEE)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  spinner: false
})

export default createReducer<State>({
  [registerEmployee.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [registerEmployee.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  ),

  [registerEmployee.FAILURE]: (state: State): State => (
    state.merge({ spinner: false })
  )
}, initialState)