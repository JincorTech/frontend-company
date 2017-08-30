import { createReducer, createAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  open: boolean
  msg: string
};

/**
 * Constants
 */
export const EMIT_ALERT = 'common/alert/EMIT_ALERT';
export const CLOSE_ALERT = 'common/alert/CLOSE_ALERT';

/**
 * Action Creators
 */
export const emitAlert = createAction<string>(EMIT_ALERT);
export const closeAlert = createAction<void>(CLOSE_ALERT);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  open: false,
  msg: ''
});

export default createReducer<State>({
  [EMIT_ALERT]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      open: true,
      msg: payload
    })
  ),

  [CLOSE_ALERT]: (state: State): State => (
    state.merge({ open: false })
  )
}, initialState);
