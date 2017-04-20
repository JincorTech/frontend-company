import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'
import { removeToken } from '../../utils/auth'
import { push } from 'react-router-redux'

import { fetchUser, logout, LOGOUT } from '../../redux/modules/common/app'


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


function* logoutIterator(): SagaIterator {
  yield call(removeToken)
  yield put(push('/auth/signin'))
}

function* logoutSaga(): SagaIterator {
  yield takeLatest(
    LOGOUT,
    logoutIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(fetchUserSaga),
    fork(logoutSaga)
  ]
}