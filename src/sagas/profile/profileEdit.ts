import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { put as putFunc } from '../../utils/api'

import { req } from '../../helpers/profile/profileEdit'

import { updateProfile } from '../../redux/modules/profile/profileEdit'


const getState = state => state.profile.profileView.company

function* updateProfileIterator({ payload }): SagaIterator {
  try {
    const state = yield select(getState)
    yield call(putFunc, '/company/my', req(payload))
  } catch (e) {
    yield put(updateProfile.failure(e))
  }
}

function* updateProfileSaga(): SagaIterator {
  yield takeLatest(
    updateProfile.REQUEST,
    updateProfileIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(updateProfileSaga)
  ]
}