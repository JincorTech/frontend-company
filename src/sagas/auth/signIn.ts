import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import { Action } from '../../utils/actions'
import { push } from 'react-router-redux'

import { get, post } from '../../utils/api'
import { setToken } from '../../utils/auth'

import {
  fetchCompanies,
  fetchLogin,
  showCompanyList,
  resetState,
  SELECT_COMPANY,
  FETCH_LOGIN,
  LoginData
} from '../../redux/modules/auth/signIn'

import { emitAlert } from '../../redux/modules/common/alert'
import { login } from '../../redux/modules/app/app'
import { FormFields as LoginFields } from '../../components/auth/LoginForm'


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
      yield put(emitAlert('Не удается войти. Пожалуйста, проверьте правильность написания логина и пароля.'))
    }

    if (companyCount === 1) {
      const companyId = companies[0].id
      yield put(fetchLogin({ email, password, companyId }))
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
    const { data: { token }} = yield call(post, '/employee/login', action.payload)

    yield put(login(token))
    yield put(push('/app/profile'))
  } catch (e) {
    // yield put(fetchLogin.failure(new SubmissionError(e)))
  }
}

export function* loginSaga(): SagaIterator {
  yield takeLatest(
    FETCH_LOGIN,
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

  yield put(fetchLogin({ ...employee, companyId }))
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
    yield put(resetState())
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