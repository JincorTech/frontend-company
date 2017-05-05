import { SagaIterator } from 'redux-saga'
import { takeLatest, takeEvery, put, call, select, fork } from 'redux-saga/effects'
import { Action, ActionMeta } from '../../utils/actions'
import { get } from '../../utils/api'

import {
  OPEN_NODE,
  CLOSE_NODE,
  SELECT_VALUE,
  UNREGISTER_SELECT
} from '../../redux/modules/common/activityTypes'

import {
  openNodeSelector,
  closeNodeSelector,
  normalizeActivities,
  closeAllNodes
} from '../../helpers/common/activityTypes'

import {
  setNodes,
  fetchActivities,
  closeNode,
  disableLeaf,
  activateLeaf,
  setSelectValue,
  closeSelect,
  removeSelect,
  Meta
} from '../../redux/modules/common/activityTypes'


const getState = state => state.common.activityTypes

/**
 * Fetch Activities Saga
 */
function* fetchActivitiesIterator(): SagaIterator {
  try {
    const { data: activities } = yield call(get, '/company/activityTypes')

    const normalized = yield call(normalizeActivities, activities)
    yield put(fetchActivities.success(normalized))
  } catch (e) {
    yield put(fetchActivities.failure(e))
  }
}

function* fetchActivitiesSaga(): SagaIterator {
  yield takeLatest(
    fetchActivities.REQUEST,
    fetchActivitiesIterator
  )
}

/**
 * Open Node Saga
 */
function* openNodeIterator({ payload: nodeId }: Action<string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = yield call(openNodeSelector, nodeId, state)

  yield put(setNodes(activityMap))
}

function* openNodeSaga(): SagaIterator {
  yield takeEvery(
    OPEN_NODE,
    openNodeIterator
  )
}

/**
 * Close Node Saga
 */
function* closeNodeIterator({ payload: nodeId }: Action<string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = yield call(closeNodeSelector, nodeId, state)

  yield put(setNodes(activityMap))
}

function* closeNodeSaga(): SagaIterator {
  yield takeEvery(
    CLOSE_NODE,
    closeNodeIterator
  )
}

/**
 * Select Value Saga
 */
function* selectValueIterator({ payload: leafId, meta }: ActionMeta<Meta, string>): SagaIterator {
  const state = yield select(getState)
  const nodes = yield call(closeAllNodes, state)
  const { selectedActivity } = state.selectMap[meta.name]

  if (selectedActivity) {
    yield put(activateLeaf(selectedActivity))
  }
  yield put(setNodes(nodes))
  yield put(disableLeaf(leafId))
  yield put(setSelectValue(meta, leafId))
  yield put(closeSelect(meta))
}

function* selectValueSaga(): SagaIterator {
  yield takeEvery(
    SELECT_VALUE,
    selectValueIterator
  )
}

/**
 * Unregister Select Saga
 */
function* unregisterSelectIterator({ payload: selectId }: Action<string>): SagaIterator {
  const { selectMap } = yield select(getState)
  const { selectedActivity: leafId } = selectMap[selectId]

  yield put(activateLeaf(leafId))
  yield put(removeSelect(selectId))
}

function* unregisterSelectSaga(): SagaIterator {
  yield takeEvery(
    UNREGISTER_SELECT,
    unregisterSelectIterator
  )
}

/**
 * Activity Types Saga
 */
export default function* (): SagaIterator {
  yield [
    fork(fetchActivitiesSaga),
    fork(openNodeSaga),
    fork(closeNodeSaga),
    fork(selectValueSaga),
    fork(unregisterSelectSaga)
  ]
}