import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, select, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { routes } from '../../routes';

import { Action } from '../../utils/actions';
import { post, put as putFunc, get } from '../../utils/api';
import { notify } from '../../utils/notifications';
import { restorePassword, confirmEmail, setNewPassword, resetState } from '../../redux/modules/auth/restorePassword';
import { login } from '../../redux/modules/app/app';

import { FormFields as RestoreFields } from '../../components/auth/RequestPasswordForm';
import { FormFields as ConfirmFields } from '../../components/auth/ConfirmPasswordForm';
import { FormFields as NewPasswordFields } from '../../components/auth/RequestPasswordForm';

const getState = (state) => state.auth.restorePassword;

/**
 * Request restore password
 */
function* restorePasswordIterator({ payload }: Action<RestoreFields>): SagaIterator {
  try {
    const { data } = yield call(post, '/employee/restorePassword', payload);
    yield put(restorePassword.success(data.id));
  } catch (e) {
    yield put(restorePassword.failure(new SubmissionError(e)));
    yield put(notify('error', 'Oops', e.message));
  }
}

export function* restorePasswordSaga(): SagaIterator {
  yield takeLatest(
    restorePassword.REQUEST,
    restorePasswordIterator
  );
}

/**
 * Confirm email
 */
function* confirmEmailIterator({ payload }: Action<ConfirmFields>): SagaIterator {
  const { verificationId } = yield select(getState);
  const body = { verificationId, ...payload };

  try {
    const { data } = yield call(post, '/employee/verifyEmail', body);
    const { data: companies } = yield call(get, `/employee/companies?verificationId=${verificationId}`);
    yield put(confirmEmail.success(companies));
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError(e)));
    yield put(notify('error', 'Oops', e.message));
  }
}

export function* confirmEmailSaga(): SagaIterator {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  );
}

/**
 * Restore password
 */
function* newPasswordIterator({ payload }: Action<NewPasswordFields>): SagaIterator {
  const { companyId, verificationId } = yield select(getState);
  const body = { ...payload, companyId, verificationId};

  try {
    const { data } = yield call(putFunc, '/employee/changePassword', body);

    yield put(setNewPassword.success());
    yield put(login(data.token));
    yield put(push(routes.profile));
  } catch (e) {
    yield put(setNewPassword.failure(new SubmissionError(e)));
    yield put(notify('error', 'Oops', e.message));
  }
}

export function* newPasswordSaga(): SagaIterator {
  yield takeLatest(
    setNewPassword.REQUEST,
    newPasswordIterator
  );
}

/**
 * Reset Form
 */
function* resetSignInIterator({ payload }: Action<any>) {
  const { pathname } = payload;

  if (pathname === '/cmp/auth/password') {
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
 * Restore password saga
 */
export default function*(): SagaIterator {
  yield [
    fork(restorePasswordSaga),
    fork(confirmEmailSaga),
    fork(newPasswordSaga),
    fork(resetSignInSaga)
  ];
}
