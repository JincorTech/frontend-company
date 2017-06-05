import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork } from 'redux-saga/effects'

import { Action } from '../../utils/actions'
import { post } from '../../utils/api'
import { FormFields } from '../../components/auth/RegisterEmployeeForm'
import { registerEmployee } from '../../redux/modules/auth/registerEmployee'
import { login } from '../../redux/modules/app/app'

/**
 * Register Employee
 */
function* registerEmployeeIterator({ payload: employee }: Action<FormFields>): SagaIterator {
  const {
    firstName,
    lastName,
    password,
    position,
    verificationId
  } = employee

  try {
    const reqData = { firstName, lastName, password, position, verificationId }
    const { data: { token }} = yield call(post, '/employee/register', reqData)

    yield put(login(token))
    yield put(registerEmployee.success())
  } catch (e) {
    yield put(registerEmployee.failure())
  }
}

export function* registerEmployeeSaga() {
  yield takeLatest(
    registerEmployee.REQUEST,
    registerEmployeeIterator
  )
}

/**
 * Register Employee Saga
 */
export default function* () {
  yield [
    fork(registerEmployeeSaga)
  ]
}