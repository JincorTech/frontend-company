import { createAsyncAction, createAction, createReducer, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  spinner: boolean
};

/**
 * Action types
 */

export const INVITE_EMPLOYEES = 'auth/inviteEmployees/INVITE_EMPLOYEES';

/**
 * Action creators
 */

export const inviteEmployees = createAsyncAction<void, void>(INVITE_EMPLOYEES);

/**
 * Reducer
 */

const initialState: State = from<StateMap>({
  spinner: false
});

export default createReducer<State>({
  [inviteEmployees.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [inviteEmployees.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  ),

  [inviteEmployees.FAILURE]: (state: State): State => (
    state.merge({ spinner: false })
  )
}, initialState);
