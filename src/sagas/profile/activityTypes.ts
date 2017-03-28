import { SagaIterator } from 'redux-saga'
import { takeEvery, takeLatest, put, select, fork, call } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { get } from '../../utils/api'

import { openNodeSelector, closeNodeSelector, normalizeActivities } from '../../helpers/profile/activityTypes'
import { OPEN_NODE, CLOSE_NODE, setNodes, requestActivities } from '../../redux/modules/profile/activityTypes'


const getState = (state) => state.profile.activityTypes

/**
 * Fetch activity types saga
 */
function* fetchActivitiesGenerator(): SagaIterator {
  try {
    const { data } = yield call(get, '/company/activityTypes')
    const state = normalizeActivities(data)
    yield put(requestActivities.success(state))
  } catch (e) {
    yield put(requestActivities.failure(e))
  }
}

export function* fetchActivitiesSaga(): SagaIterator {
  yield takeLatest(
    requestActivities.REQUEST,
    fetchActivitiesGenerator
  )
}

/**
 * Open node saga
 */
function* openNodeGenerator({ payload: nodeId }: Action<string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = openNodeSelector(nodeId, state)
  yield put(setNodes(activityMap))
}

export function* openNodeSaga(): SagaIterator {
  yield takeEvery(
    OPEN_NODE,
    openNodeGenerator
  )
}

/**
 * Close node saga
 */
function* closeNodeGenerator({ payload: nodeId }: Action<string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = closeNodeSelector(nodeId, state)
  yield put(setNodes(activityMap))
}

export function* closeNodeSaga(): SagaIterator {
  yield takeEvery(
    CLOSE_NODE,
    closeNodeGenerator
  )
}

/**
 * Activity types saga
 */
export default function* (): SagaIterator {
  yield [
    fork(openNodeSaga),
    fork(closeNodeSaga),
    fork(fetchActivitiesSaga)
  ]
}