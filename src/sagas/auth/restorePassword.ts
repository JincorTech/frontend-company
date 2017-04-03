import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import { Action } from '../../utils/actions'
import { push } from 'react-router-redux'

import { post, put as putFunc, get } from '../../utils/api'
import { restorePassword, confirmEmail, setNewPassword } from '../../redux/modules/auth/restorePassword'

import { FormFields as RestoreFields } from '../../containers/auth/RequestPasswordForm'
import { FormFields as ConfirmFields } from '../../containers/auth/ConfirmPasswordForm'
import { FormFields as NewPasswordFields } from '../../containers/auth/RequestPasswordForm'


const getState = (state) => state.auth.restorePassword

/**
 * Request restore password
 */
function* restorePasswordIterator({ payload }: Action<RestoreFields>): SagaIterator {
  try {
    const { data } = yield call(post, '/employee/restorePassword', payload)
    yield put(restorePassword.success(data.id))
  } catch (e) {
    yield put(restorePassword.failure(new SubmissionError(e)))
  }
}

export function* restorePasswordSaga(): SagaIterator {
  yield takeLatest(
    restorePassword.REQUEST,
    restorePasswordIterator
  )
}

/**
 * Confirm email
 */
function* confirmEmailIterator({ payload }: Action<ConfirmFields>): SagaIterator {
  const { verificationId } = yield select(getState)
  const body = { verificationId, ...payload }

  try {
    const { data } = yield call(post, '/employee/verifyEmail', body)
    const { data: companies } = yield call(get, `/employee/companies?verificationId=${verificationId}`)
    yield put(confirmEmail.success(companies))
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError(e)))
  }
}

export function* confirmEmailSaga(): SagaIterator {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  )
}

/**
 * Restore password
 */
function* newPasswordIterator({ payload }: Action<NewPasswordFields>): SagaIterator {
  const { companyId, verificationId } = yield select(getState)
  const body = { ...payload, companyId, verificationId}

  try {
    yield call(putFunc, '/employee/changePassword', body)
    yield put(setNewPassword.success())
    yield put(push('/auth/signin'))
  } catch (e) {
    yield put(setNewPassword.failure(new SubmissionError(e)))
  }
}

export function* newPasswordSaga(): SagaIterator {
  yield takeLatest(
    setNewPassword.REQUEST,
    newPasswordIterator
  )
}

/**
 * Restore password saga
 */
export default function* (): SagaIterator {
  yield [
    fork(restorePasswordSaga),
    fork(confirmEmailSaga),
    fork(newPasswordSaga)
  ]
}