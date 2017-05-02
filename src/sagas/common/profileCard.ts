import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { Action } from '../../utils/actions'

import { put as putFunc } from '../../utils/api'
import { changePassword, updateProfile, changeView } from '../../redux/modules/common/profileCard'
import { fetchUser } from '../../redux/modules/app/appLayout'

import { PasswordFields, ProfileFields } from '../../redux/modules/common/profileCard'


const getCompanyState = state => state.common.app.user.company

function* changePasswordIterator({ payload }: Action<PasswordFields>): SagaIterator {
  const { id } = yield select(getCompanyState)
  const body = { companyId: id, ...payload }

  try {
    const { data } = yield call(putFunc, '/employee/changePassword', body)
    yield call(console.log, 'psswrd changed! YAY!')
  } catch (e) {
    yield call(console.log, 'pssword change FAIL!')
  }
}

function* changePasswordSaga(): SagaIterator {
  yield takeLatest(
    changePassword.REQUEST,
    changePasswordIterator
  )
}


function* updateProfileIterator({ payload }: Action<ProfileFields>): SagaIterator {
  const body = { profile: { ...payload } }

  try {
    const { data } = yield call(putFunc, '/employee/me', body)
    yield put(fetchUser())
    yield put(changeView('buttons'))
  } catch (e) {
    yield call(console.log, 'profile update FAIL!')
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
    fork(changePasswordSaga),
    fork(updateProfileSaga)
  ]
}