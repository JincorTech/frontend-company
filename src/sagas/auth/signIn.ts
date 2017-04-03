import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import { Action } from '../../utils/actions'
import { push } from 'react-router-redux'

import { get, post } from '../../utils/api'
import { setToken } from '../../utils/auth'

import {
  fetchCompanies,
  login,
  showCompanyList,
  SELECT_COMPANY,
  RESET_SIGN_IN
} from '../../redux/modules/auth/signIn'

import { FormFields as LoginFields } from '../../containers/auth/LoginForm'
import { LoginData } from '../../redux/modules/auth/signIn'


/**
 * Request employee's companies
 */
function* employeeCompaniesIterator(action: Action<LoginFields>): SagaIterator {
  const { email, password } = action.payload
  const params = `email=${email}&password=${password}`

  try {
    const { data: companies } = yield call(get, `/employee/companies?${params}`)
    yield put(fetchCompanies.success(companies))

    const companyCount = companies.length

    if (companyCount === 0) {
      const error = new SubmissionError<LoginFields>({ email: '', password: '' })
      yield put(fetchCompanies.failure(error))
    }

    if (companyCount === 1) {
      const companyId = companies[0].id
      yield put(login({ email, password, companyId }))
    }

    if (companyCount > 1) {
      yield put(showCompanyList())
    }
  } catch (e) {
    yield put({ type: fetchCompanies.FAILURE, payload: new SubmissionError(e) })
  }
}

export function* employeeCompaniesSaga(): SagaIterator {
  yield takeLatest(
    fetchCompanies.REQUEST,
    employeeCompaniesIterator
  )
}

/**
 * Login
 */
function* loginSagaIterator(action: Action<LoginData>): SagaIterator {
  try {
    const { data } = yield call(post, '/employee/login', action.payload)

    yield put(login.success(data))
    yield call(setToken, data)
    yield put(push('/app/profile'))
  } catch (e) {
    yield put(login.failure(new SubmissionError(e)))
  }
}

export function* loginSaga(): SagaIterator {
  yield takeLatest(
    login.REQUEST,
    loginSagaIterator
  )
}

/**
 * Select Company
 */
const getSignInState = (state) => state.auth.signIn

function* loginCompanyIterator(action: Action<string>): SagaIterator {
  const { payload: companyId } = action
  const { employee } = yield select(getSignInState)
  yield put(login({ ...employee, companyId }))
}

export function* loginCompanySaga(): SagaIterator {
  yield takeLatest(
    SELECT_COMPANY,
    loginCompanyIterator
  )
}

/**
 * Reset Form
 */
function* resetSignInIterator(action: Action<any>) {
  const { pathname } = action.payload

  if (pathname === '/auth/signin') {
    yield put({ type: RESET_SIGN_IN })
  }
}

export function* resetSignInSaga() {
  yield takeLatest(
    '@@router/LOCATION_CHANGE',
    resetSignInIterator
  )
}

/**
 * SignIn Saga
 */
export default function* (): SagaIterator {
  yield [
    fork(resetSignInSaga),
    fork(employeeCompaniesSaga),
    fork(loginCompanySaga),
    fork(loginSaga)
  ]
}