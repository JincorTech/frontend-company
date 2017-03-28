import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'
import { createAsyncAction } from '../../../utils/actions'


/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>

export type StateObj = {
  rootNodes: string[]
  activityMap: ActivityMap
}

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

/**
 * Actions
 */
export const OPEN_NODE = 'jincor/profile/activityTypes/OPEN_ACTIVITY_NODES'
export const CLOSE_NODE = 'jincor/profile/activityTypes/CLOSE_ACTIVITY_NODE'
export const SET_NODES = 'jincor/profile/activityTypes/SET_NODES'
export const SELECT_VALUE = 'jincor/profile/activityTypes/SELECT_ACTIVITY_VALUE'
export const REMOVE_VALUE = 'jincor/profile/activityTypes/REMOVE_ACTIVITY_VALUE'
export const REQUEST_ACTIVITY_TYPES = 'jincor/profile/activityTypes/REQUEST_ACTIVITY_TYPES'

/**
 * Create Actions
 */
export const openNode = createAction<string>(OPEN_NODE)
export const closeNode = createAction<string>(CLOSE_NODE)
export const selectValue = createAction<string>(SELECT_VALUE)
export const removeValue = createAction<string>(REMOVE_VALUE)
export const setNodes = createAction<ActivityMap>(SET_NODES)
export const requestActivities = createAsyncAction<void, StateObj>(REQUEST_ACTIVITY_TYPES)

/**
 * Reducer
 */
const initialState: State = from<StateObj>({
  rootNodes: [],
  activityMap: {}
})

export default createReducer<State>({
  [SET_NODES]: (state: State, action: Action<ActivityMap>): State => (
    state.merge({ activityMap: action.payload }, { deep: true })
  ),

  [requestActivities.SUCCESS]: (state: State, action: Action<State>): State => (
    state.merge(action.payload, { deep: true })
  )
}, initialState)