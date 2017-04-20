import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork, select } from 'redux-saga/effects'
import { Action } from '../../utils/actions'
import { get, post } from '../../utils/api'

import { isEmail } from '../../helpers/common/emailTextarea'

import { fetchEmployees, inviteEmployees } from '../../redux/modules/employees/employees'
import { resetTextarea } from '../../redux/modules/common/emailTextarea'


function* fetchEmployeesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/colleagues')
    yield put(fetchEmployees.success(data))
  } catch (e) {
    yield put(fetchEmployees.failure(e))
  }
}

function* fetchEmployeesSaga(): SagaIterator {
  yield takeLatest(
    fetchEmployees.REQUEST,
    fetchEmployeesIterator
  )
}

const getTextareaState = state => state.common.emailTextarea

function* inviteEmployeesIterator(action: Action<string[]>): SagaIterator {
  const { value, emails: selectedEmails } = yield select(getTextareaState)
  const emails = isEmail(value) ? [...selectedEmails, value] : selectedEmails

  try {
    const { data } = yield call(post, 'company/invite', { emails })
    yield put(inviteEmployees.success())
    yield put(resetTextarea())
    yield put(fetchEmployees())
  } catch (e) {
    yield put(inviteEmployees.failure(e))
  }
}

export function* inviteEmployeesSaga(): SagaIterator {
  yield takeLatest(
    inviteEmployees.REQUEST,
    inviteEmployeesIterator
  )
}

export default function* (): SagaIterator {
  yield [
    fork(fetchEmployeesSaga),
    fork(inviteEmployeesSaga)
  ]
}