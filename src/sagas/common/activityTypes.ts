import { SagaIterator } from 'redux-saga'
import { takeLatest, takeEvery, put, call, select, fork } from 'redux-saga/effects'
import { ActionMeta } from '../../utils/actions'
import { get } from '../../utils/api'
import { openNodeSelector, closeNodeSelector, normalizeActivities } from '../../helpers/common/activityTypes'

import {
  OPEN_NODE, CLOSE_NODE,
  SET_NODES, SELECT_VALUE,
  setNormalized,
  fetchActivities,
  closeNode, closeAT
} from '../../redux/modules/common/activityTypes'


function* setActivitiesIterator({ meta }: ActionMeta<string, any[]>): SagaIterator {
  try {
    const { data } = yield call(get, '/company/activityTypes')
    yield put(setNormalized(meta, normalizeActivities(data)))
  } catch (e) {
    yield put(fetchActivities.failure(e))
  }
}

function* setActivitiesSaga(): SagaIterator {
  yield takeLatest(
    SET_NODES,
    setActivitiesIterator
  )
}


const getState = state => state.common.activityTypes

function* openNodeIterator({ payload: nodeId, meta }: ActionMeta<string, string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = openNodeSelector(meta, nodeId, state)
  yield put(setNormalized(meta, { activityMap }))
}

function* openNodeSaga(): SagaIterator {
  yield takeEvery(
    OPEN_NODE,
    openNodeIterator
  )
}


function* closeNodeIterator({ payload: nodeId, meta }: ActionMeta<string, string>): SagaIterator {
  const state = yield select(getState)
  const activityMap = closeNodeSelector(meta, nodeId, state)
  yield put(setNormalized(meta, { activityMap }))
}

function* closeNodeSaga(): SagaIterator {
  yield takeEvery(
    CLOSE_NODE,
    closeNodeIterator
  )
}


function* selectValueIterator({ payload: nodeId, meta }: ActionMeta<string, string>): SagaIterator {
  // yield put(closeNode(meta, nodeId))
  // yield put(closeAT(meta))
}

function* selectValueSaga(): SagaIterator {
  yield takeEvery(
    SELECT_VALUE,
    selectValueIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(setActivitiesSaga),
    fork(openNodeSaga),
    fork(closeNodeSaga),
    fork(selectValueSaga)
  ]
}