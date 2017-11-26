import { createReducer, createAction, createMetaAction, Action, ActionMeta } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  [selectName: string]: SelectState
};

export type SelectState = {
  name: string
  open: boolean
  selectedOption: string
  options: string[]
  optionsMap: OptionMap
  hasFilter: boolean
  filterValue?: string
};

export type OptionMap = {
  [value: string]: Option
};

export type Option = {
  value: string
  name: string
};

export type NormalizedOptions = {
  options: string[]
  optionsMap: OptionMap
};

/**
 * Constants
 */
export const REGISTER_SELECT = 'common/Select/REGISTER_SELECT';
export const REGISTER_FILTER = 'common/Select/REGISTER_FILTER_SELECT';
export const REMOVE_SELECT = 'common/Select/REMOVE_SELECT';
export const OPEN_SELECT = 'common/Select/OPEN_SELECT';
export const CLOSE_SELECT = 'common/Select/CLOSE_SELECT';
export const SET_OPTIONS = 'common/Select/SET_OPTIONS';
export const SET_NORMALIZED = 'common/Select/SET_NORMALIZED_OPTIONS';
export const SELECT_OPTION = 'common/Select/SELECT_OPTION';
export const SET_OPTION = 'common/Select/SET_OPTION';
export const CHANGE_FILTER = 'common/Select/CHANGE_FILTER';

/**
 * Action Creators
 */
export const registerSelect = createAction<string>(REGISTER_SELECT);
export const registerFilter = createAction<string>(REGISTER_FILTER);
export const removeSelect = createAction<string>(REMOVE_SELECT);
export const setOptions = createMetaAction<string, Option[]>(SET_OPTIONS);
export const setNormalized = createMetaAction<string, NormalizedOptions>(SET_NORMALIZED);
export const openSelect = createMetaAction<string, void>(OPEN_SELECT);
export const closeSelect = createMetaAction<string, void>(CLOSE_SELECT);
export const selectOption = createMetaAction<string, string>(SELECT_OPTION);
export const setOption = createMetaAction<string, string>(SET_OPTION);
export const changeFilter = createMetaAction<string, string>(CHANGE_FILTER);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({});

export default createReducer<State>({
  [REGISTER_SELECT]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      [payload]: {
        name: payload,
        open: false,
        selectedOption: null,
        options: [],
        optionsMap: {},
        hasFilter: false
      }
    })
  ),

  [REGISTER_FILTER]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      [payload]: {
        name: payload,
        open: false,
        selectedOption: null,
        options: [],
        optionsMap: {},
        hasFilter: true,
        filterValue: ''
      }
    })
  ),

  [REMOVE_SELECT]: (state: State, { payload }: Action<string>): State => (
    state.without(payload) as State
  ),

  [OPEN_SELECT]: (state: State, { meta }: ActionMeta<string, void>): State => (
    state.merge({
      [meta]: { open: true }
    }, { deep: true })
  ),

  [CLOSE_SELECT]: (state: State, { meta }: ActionMeta<string, void>): State => (
    state.merge({
      [meta]: { open: false }
    }, { deep: true })
  ),

  [SET_NORMALIZED]: (state: State, { payload, meta }: ActionMeta<string, NormalizedOptions>): State => (
    state.merge({
      [meta]: payload
    }, { deep: true })
  ),

  [SET_OPTION]: (state: State, { payload, meta }: ActionMeta<string, string>): State => (
    state.merge({
      [meta]: { selectedOption: payload }
    }, { deep: true })
  ),

  [CHANGE_FILTER]: (state: State, { payload, meta }: ActionMeta<string, string>): State => (
    state.merge({
      [meta]: { filterValue: payload }
    }, { deep: true })
  )
}, initialState);
