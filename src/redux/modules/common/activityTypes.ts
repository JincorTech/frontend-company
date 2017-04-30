import { createReducer, createAction, createMetaAction, createAsyncAction, Action, ActionMeta } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'


export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  [activityTypeName: string]: ActivityTypeState
}

export type ActivityTypeState = {
  name: string
  open: boolean
  selectedActivityId: string
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

export type NormalizedActivities = {
  activities: string[]
  activitiesMap: ActivityMap
}


export const REGISTER_AT =      'common/activityTypes/REGISTER_AT'
export const REMOVE_AT =        'common/activityTypes/REMOVE_SELECT'
export const OPEN_AT =          'common/activityTypes/OPEN_AT'
export const CLOSE_AT =         'common/activityTypes/CLOSE_AT'
export const FETCH_ACTIVITIES = 'common/activityTypes/FETCH_ACTIVITIES'
export const SET_NODES =        'common/activityTypes/SET_NODES'
export const SET_NORMALIZED =   'common/activityTypes/SET_NORMALIZED'
export const OPEN_NODE =        'common/activityTypes/OPEN_NODE'
export const CLOSE_NODE =       'common/activityTypes/CLOSE_NODE'
export const SELECT_VALUE =     'common/activityTypes/SELECT_VALUE'

export const registerAT =       createAction<string>(REGISTER_AT)
export const removeAT =         createAction<string>(REMOVE_AT)
export const openAT =           createMetaAction<string, string>(OPEN_AT)
export const closeAT =          createMetaAction<string, string>(CLOSE_AT)
export const fetchActivities =  createAsyncAction<void, any>(FETCH_ACTIVITIES)
export const setNodes =         createMetaAction<string, any>(SET_NODES)
export const setNormalized =    createMetaAction<string, any>(SET_NORMALIZED)
export const openNode =         createMetaAction<string, void>(OPEN_NODE)
export const closeNode =        createMetaAction<string, string>(CLOSE_NODE)
export const selectValue =      createMetaAction<string, void>(SELECT_VALUE)


const initialState: State = from<StateMap>({})

export default createReducer<State>({
  [REGISTER_AT]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      [payload]: {
        name: payload,
        open: false,
        selectedActivityId: null,
        rootNodes: [],
        activityMap: {}
      }
    })
  ),

  [REMOVE_AT]: (state: State, { payload }: Action<string>): State => (
    state.without(payload) as State
  ),

  [OPEN_AT]: (state: State, { meta }: ActionMeta<string, string>): State => (
    state.merge({
      [meta]: { open: true }
    }, { deep: true })
  ),

  [CLOSE_AT]: (state: State, { meta }: ActionMeta<string, string>): State => (
    state.merge({
      [meta]: { open: false }
    }, { deep: true })
  ),

  [SET_NORMALIZED]: (state: State, { payload, meta }: ActionMeta<string, NormalizedActivities>): State => (
    state.merge({
      [meta]: payload
    }, { deep: true })
  ),

  [SELECT_VALUE]: (state: State, { payload, meta }: ActionMeta<string, string>): State => (
    state.merge({
      [meta]: { selectedActivityId: payload }
    }, { deep: true })
  )
}, initialState)