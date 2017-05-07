import { Action } from '../../utils/actions'
import { SagaIterator } from 'redux-saga'
import { SubmissionError } from 'redux-form'
import { takeLatest, call, put, fork, select } from 'redux-saga/effects'
import { get, post } from '../../utils/api'
import { push } from 'react-router-redux'

import { isEmail } from '../../helpers/common/emailTextarea'

import { FormFields as CompanyFields } from '../../containers/auth/CreateCompanyForm'
import { FormFields as AccountFields } from '../../containers/auth/CreateAccountForm'
import { FormFields as ConfirmFields } from '../../containers/auth/ConfirmEmailForm'

import {
  createCompany,
  verifyEmail,
  setUserInfo,
  confirmEmail,
  inviteEmployee,
  accountCreated,
  resetState
} from '../../redux/modules/auth/signUp'

import { login } from '../../redux/modules/app/app'

/**
 * Create company
 */
function* createCompanyIterator({ payload }: Action<CompanyFields>): SagaIterator {
  const {
    countryId,
    companyType,
    legalName
  } = payload

  try {
    const res = yield call(post, '/company', { countryId, companyType, legalName })
    const { id: verificationId, companyId: id } = res.data

    yield put(createCompany.success({ id, verificationId }))
  } catch (e) {
    yield put(createCompany.failure(new SubmissionError(e.errors)))
  }
}

export function* createCompanySaga(): SagaIterator {
  yield takeLatest(
    createCompany.REQUEST,
    createCompanyIterator
  )
}

/**
 * Verify email
 */
function* verifyEmailRequestSaga({ payload }: Action<AccountFields>): SagaIterator {
  const {
    email,
    verificationId,
    firstName,
    lastName,
    position,
    password
  } = payload
  const employee = { firstName, lastName, position, password }

  try {
    yield call(get, `/employee/verifyEmail?verificationId=${verificationId}&email=${email}`)

    yield put(setUserInfo(employee))
    yield put(verifyEmail.success())
  } catch (e) {
    yield put(verifyEmail.failure(new SubmissionError(e.errors)))
  }
}

export function* verifyEmailSaga(): SagaIterator {
  yield takeLatest(
    verifyEmail.REQUEST,
    verifyEmailRequestSaga
  )
}

/**
 * Confirm email
 */
const getState = (state) => state.auth.signUp

function* confirmEmailIterator({ payload }: Action<ConfirmFields>): SagaIterator {
  const { employee, company: { verificationId }} = yield select(getState)
  const employeeData = { ...employee, verificationId }

  try {
    yield call(post, '/employee/verifyEmail', payload)
    yield put(confirmEmail.success())

    const { data } = yield call(post, '/employee/register', employeeData)

    yield put(login(data.token))
    yield put(accountCreated())
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError(e.errors)))
  }
}

export function* confirmEmailSaga() {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  )
}

/**
 * Invite employees
 */
const getTextareaState = (state) => state.common.emailTextarea

function* inviteEmployeeIterator(action: Action<string[]>): SagaIterator {
  const { value, emails: selectedEmails } = yield select(getTextareaState)
  const emails = isEmail(value) ? [...selectedEmails, value] : selectedEmails

  try {
    const { data } = yield call(post, 'company/invite', { emails })

    yield put(inviteEmployee.success())
    yield put(push('/app/profile'))
  } catch (e) {
    yield put(inviteEmployee.failure(e))
  }
}

export function* inviteEmployeeSaga(): SagaIterator {
  yield takeLatest(
    inviteEmployee.REQUEST,
    inviteEmployeeIterator
  )
}

/**
 * Reset Form
 */
function* resetSignInIterator(action: Action<any>) {
  const { pathname } = action.payload

  if (pathname === '/auth/signup') {
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
 * SignUp Saga
 */
export default function* (): SagaIterator {
  yield [
    fork(createCompanySaga),
    fork(verifyEmailSaga),
    fork(confirmEmailSaga),
    fork(inviteEmployeeSaga),
    fork(resetSignInSaga)
  ]
}