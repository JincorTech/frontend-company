import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'

import { fetchUser } from '../../redux/modules/common/app'


function* fetchUserIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/me')
    yield put(fetchUser.success(data))
  } catch (e) {
    yield put(fetchUser.failure(e))
  }
}

function* fetchUserSaga(): SagaIterator {
  yield takeLatest(
    fetchUser.REQUEST,
    fetchUserIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(fetchUserSaga)
  ]
}