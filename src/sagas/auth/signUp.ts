import { Action } from '../../utils/actions';
import { SagaIterator } from 'redux-saga';
import { SubmissionError } from 'redux-form';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { get, post } from '../../utils/api';
import { setUser, getUser, removeUser } from '../../utils/auth';
import { push } from 'react-router-redux';
import { routes } from '../../routes';

import { isEmail } from '../../helpers/common/emailTextarea';
import { optionTransformer } from '../../helpers/common/select';

import {
  fetchDict,
  createCompany,
  verifyEmail,
  setUserInfo,
  confirmEmail,
  inviteEmployee,
  accountCreated,
  resetState,
  signupEmail
} from '../../redux/modules/auth/signUp';
import { login } from '../../redux/modules/app/app';
import { setOptions } from '../../redux/modules/common/select';

import { FormFields as CompanyFields } from '../../components/auth/CreateCompanyForm';
import { FormFields as AccountFields } from '../../components/auth/CreateAccountForm';
import { FormFields as ConfirmFields } from '../../components/auth/ConfirmEmailForm';

const transformFunc = ({name, id: value }) => ({ value, name });

/**
 * Fetch countries saga
 */
export function* fetchCountriesAndTypesIterator(): SagaIterator {
  try {
    const [countries, types] = yield [
      call(get, '/dictionary/country'),
      call(get, '/company/types')
    ];

    const countryOptions = yield call(optionTransformer, countries.data, transformFunc);
    const typeOptions = yield call(optionTransformer, types.data, transformFunc);

    yield put(setOptions('select-country', countryOptions));
    yield put(setOptions('select-company-type', typeOptions));
  } catch (e) {
    yield put(fetchDict.failure(e));
  }
}

export function* fetchCountriesAndTypesSaga(): SagaIterator {
  yield takeLatest(
    fetchDict.REQUEST,
    fetchCountriesAndTypesIterator
  );
}

/**
 * Create company
 */
function* createCompanyIterator({ payload }: Action<CompanyFields>): SagaIterator {
  const {
    countryId,
    companyType,
    legalName
  } = payload;

  try {
    const { data } = yield call(post, '/company', { countryId, companyType, legalName });
    const { id: verificationId, companyId: id } = data;

    yield put(createCompany.success({ id, verificationId }));
  } catch (e) {
    yield put(createCompany.failure(new SubmissionError(e.errors)));
  }
}

export function* createCompanySaga(): SagaIterator {
  yield takeLatest(
    createCompany.REQUEST,
    createCompanyIterator
  );
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
  } = payload;
  const employee = { firstName, lastName, position, password };

  try {
    yield call(get, `/employee/verifyEmail?verificationId=${verificationId}&email=${email}`);

    yield call(setUser, { verificationId, ...employee });
    yield put(setUserInfo(employee));
    yield put(verifyEmail.success());
  } catch (e) {
    yield put(verifyEmail.failure(new SubmissionError(e.errors)));
  }
}

export function* verifyEmailSaga(): SagaIterator {
  yield takeLatest(
    verifyEmail.REQUEST,
    verifyEmailRequestSaga
  );
}

/**
 * Confirm email
 */
const getState = (state) => state.auth.signUp;

function* confirmEmailIterator({ payload }: Action<ConfirmFields>): SagaIterator {
  const { employee, company: { verificationId }} = yield select(getState);
  const employeeData = { ...employee, verificationId };

  try {
    yield call(post, '/employee/verifyEmail', payload);
    yield put(confirmEmail.success());

    const { data } = yield call(post, '/employee/register', employeeData);

    yield put(login(data.token));
    yield put(accountCreated());
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError(e.errors)));
  }
}

export function* confirmEmailSaga() {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  );
}

/**
 * Sign up from email
 */
function* signupEmailIterator({ payload }: Action<ConfirmFields>): SagaIterator {
  try {
    const user = yield call(getUser);
    yield call(post, '/employee/verifyEmail', payload);
    const { data } = yield call(post, '/employee/register', user);
    yield put(login(data.token));
    yield call(removeUser);
  } catch (e) {
    yield put(signupEmail.failure(e));
    yield put(push(routes.signIn));
  }
}

function* signupEmailSaga(): SagaIterator {
  yield takeLatest(
    signupEmail.REQUEST,
    signupEmailIterator
  );
}

/**
 * Invite employees
 */
const getTextareaState = (state) => state.common.emailTextarea;

function* inviteEmployeeIterator(action: Action<string[]>): SagaIterator {
  const { value, emails: selectedEmails } = yield select(getTextareaState);
  const emails = isEmail(value) ? [...selectedEmails, value] : selectedEmails;

  try {
    yield call(post, 'company/invite', { emails });

    yield put(inviteEmployee.success());
    yield put(push(routes.profile));
  } catch (e) {
    yield put(inviteEmployee.failure(e));
  }
}

export function* inviteEmployeeSaga(): SagaIterator {
  yield takeLatest(
    inviteEmployee.REQUEST,
    inviteEmployeeIterator
  );
}

/**
 * Reset Form
 */
function* resetSignInIterator(action: Action<any>) {
  const { pathname } = action.payload;

  if (pathname === routes.signUp) {
    yield put(resetState());
  }
}

export function* resetSignInSaga() {
  yield takeLatest(
    '@@router/LOCATION_CHANGE',
    resetSignInIterator
  );
}

/**
 * SignUp Saga
 */
export default function*(): SagaIterator {
  yield [
    fork(createCompanySaga),
    fork(verifyEmailSaga),
    fork(confirmEmailSaga),
    fork(signupEmailSaga),
    fork(inviteEmployeeSaga),
    fork(resetSignInSaga),
    fork(fetchCountriesAndTypesSaga)
  ];
}
