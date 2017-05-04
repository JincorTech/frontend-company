import {
  createReducer,
  createMetaAction,
  createAction,
  createAsyncAction,
  Action,
  ActionMeta
} from '../../../utils/actions'

import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  rootNodes: string[]
  activityMap: ActivityMap
  selectMap: SelectMap
}

// ActivityMap
export type ActivityMap = {
  [activityId: string]: ActivityNode | ActivityLeaf
}

export type ActivityNode = {
  type: 'node'
  id: string
  name: string
  open: boolean
  visible: boolean
  parentId: string
  childrenIds: string[]
}

export type ActivityLeaf = {
  type: 'leaf'
  id: string
  name: string
  visible: boolean
  selected: boolean
  parentId: string
}

// SelectMap
export type SelectMap = {
  [selectId: string]: SelectState
}

export type SelectState = {
  open: boolean
  selectedActivity: string
}

export type Meta = {
  name: string
}

export type NormalizedActivities = {
  rootNodes: string[]
  activityMap: ActivityMap
}

/**
 * Actions
 */
export const FETCH_ACTIVITIES = 'common/activityTypes/FETCH_ACTIVITIES'
export const SET_NODES        = 'common/activityTypes/SET_NODES'
export const OPEN_NODE        = 'common/activityTypes/OPEN_NODE'
export const CLOSE_NODE       = 'common/activityTypes/CLOSE_NODE'
export const DISABLE_LEAF     = 'common/activityTypes/DISABLE_LEAF'
export const ACTIVATE_LEAF    = 'common/activityTypes/ACTIVATE_LEAF'

export const REGISTER_SELECT      = 'common/activityTypes/REGISTER_ACTIVTY_SELECT'
export const UNREGISTER_SELECT    = 'common/activityTypes/UNREGISTER_SELECT'
export const REMOVE_SELECT        = 'common/activityTypes/REMOVE_ACTIVITY_SELECT'
export const SELECT_VALUE         = 'common/activityTypes/SELECT_VALUE'
export const OPEN_SELECT          = 'common/activityTypes/OPEN_ACTIVITY_SELECT'
export const CLOSE_SELECT         = 'common/activityTypes/CLOSE_ACTIVITY_SELECT'
export const SET_SELECT_VALUE     = 'common/activityTypes/SET_SELECT_VALUE'

/**
 * Action creators
 */
export const fetchActivities = createAsyncAction<void, NormalizedActivities>(FETCH_ACTIVITIES)
export const setNodes        = createAction<NormalizedActivities>(SET_NODES)
export const openNode        = createAction<string>(OPEN_NODE)
export const closeNode       = createAction<string>(CLOSE_NODE)
export const disableLeaf     = createAction<string>(DISABLE_LEAF)
export const activateLeaf    = createAction<string>(ACTIVATE_LEAF)

export const registerSelect   = createAction<string>(REGISTER_SELECT)
export const unregisterSelect = createAction<string>(UNREGISTER_SELECT)
export const removeSelect     = createAction<string>(REMOVE_SELECT)
export const selectValue      = createMetaAction<Meta, string>(SELECT_VALUE)
export const openSelect       = createMetaAction<Meta, void>(OPEN_SELECT)
export const closeSelect      = createMetaAction<Meta, void>(CLOSE_SELECT)
export const setSelectValue   = createMetaAction<Meta, string>(SET_SELECT_VALUE)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  rootNodes: [],
  activityMap: {},
  selectMap: {}
})

export const selectInitialState: SelectState = {
  open: false,
  selectedActivity: ''
}


export default createReducer<State>({
  [fetchActivities.SUCCESS]: (state: State, { payload }: Action<NormalizedActivities>): State => (
    state.merge(payload, { deep: true })
  ),

  [SET_NODES]: (state: State, { payload: activityMap }: Action<ActivityMap>): State => (
    state.merge({ activityMap }, { deep: true })
  ),

  [DISABLE_LEAF]: (state: State, { payload: leafId }: Action<string>): State => (
    state.merge({
      activityMap: {
        [leafId]: {
          visible: false,
          selected: true
        }
      }
    }, { deep: true })
  ),

  [ACTIVATE_LEAF]: (state: State, { payload: leafId }: Action<string>): State => (
    state.merge({
      activityMap: {
        [leafId]: {
          visible: true,
          selected: false
        }
      }
    }, { deep: true })
  ),

  [REGISTER_SELECT]: (state: State, { payload: selectId }: Action<string>): State => (
    state.merge({
      selectMap: {
        [selectId]: selectInitialState
      }
    }, { deep: true })
  ),

  [REMOVE_SELECT]: (state: State, { payload: selectId }: Action<string>): State => (
    state.merge({
      selectMap: (state.selectMap as any).without(selectId)
    })
  ),

  [OPEN_SELECT]: (state: State, { meta: { name: selectId }}: ActionMeta<Meta, void>): State => (
    state.merge({
      selectMap: {
        [selectId]: { open: true }
      }
    }, { deep: true })
  ),

  [CLOSE_SELECT]: (state: State, { meta: { name: selectId }}: ActionMeta<Meta, void>): State => (
    state.merge({
      selectMap: {
        [selectId]: { open: false }
      }
    }, { deep: true })
  ),

  [SET_SELECT_VALUE]: (state: State, { meta: { name: selectId }, payload: selectedActivity}: ActionMeta<Meta, string>): State => (
    state.merge({
      selectMap: {
        [selectId]: { selectedActivity }
      }
    }, { deep: true })
  )
}, initialState)