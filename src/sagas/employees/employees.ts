import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get, post, put as putFunc, del } from '../../utils/api';

import { isEmail } from '../../helpers/common/emailTextarea';

import {
  fetchEmployees,
  inviteEmployees,
  makeAdmin, unmakeAdmin, deleteEmployee,
  closeConfirmAdminPopup, closeConfirmRmAdminPopup, closeConfirmDeletePopup
} from '../../redux/modules/employees/employees';
import { updateProfile } from '../../redux/modules/app/profileCard';
import { resetTextarea } from '../../redux/modules/common/emailTextarea';

function* fetchEmployeesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/colleagues');
    yield put(fetchEmployees.success(data));
  } catch (e) {
    yield put(fetchEmployees.failure(e));
  }
}

function* fetchEmployeesSaga(): SagaIterator {
  yield [
    takeLatest(
      fetchEmployees.REQUEST,
      fetchEmployeesIterator
    ),
    takeLatest(
      updateProfile.SUCCESS,
      fetchEmployeesIterator
    )
  ];
}

const getTextareaState = state => state.common.emailTextarea;

function* inviteEmployeesIterator(): SagaIterator {
  const { value, emails: selectedEmails } = yield select(getTextareaState);
  const emails = isEmail(value) ? [...selectedEmails, value] : selectedEmails;

  try {
    yield call(post, 'company/invite', { emails });
    yield put(inviteEmployees.success());
    yield put(resetTextarea());
    yield put(fetchEmployees());
  } catch (e) {
    yield put(inviteEmployees.failure(e));
  }
}

export function* inviteEmployeesSaga(): SagaIterator {
  yield takeLatest(
    inviteEmployees.REQUEST,
    inviteEmployeesIterator
  );
}

function* makeAdminIterator({ payload }: Action<string>): SagaIterator {
  const body = { id: payload, value: true };

  try {
    yield call(putFunc, '/employee/admin', body);
    yield put(makeAdmin.success());
    yield put(closeConfirmAdminPopup());
    yield put(fetchEmployees());
  } catch (e) {
    yield put(makeAdmin.failure(e));
  }
}

function* makeAdminSaga(): SagaIterator {
  yield takeLatest(
    makeAdmin.REQUEST,
    makeAdminIterator
  );
}

function* unmakeAdminIterator({ payload }: Action<string>): SagaIterator {
  const body = { id: payload, value: false };

  try {
    yield call(putFunc, '/employee/admin', body);
    yield put(unmakeAdmin.success());
    yield put(closeConfirmRmAdminPopup());
    yield put(fetchEmployees());
  } catch (e) {
    yield put(unmakeAdmin.failure());
  }
}

function* unmakeAdminSaga(): SagaIterator {
  yield takeLatest(
    unmakeAdmin.REQUEST,
    unmakeAdminIterator
  );
}

function* deleteEmployeeIterator({ payload }: Action<string>): SagaIterator {
  try {
    yield call(del, `/employee/${payload}`);
    yield put(deleteEmployee.success());
    yield put(closeConfirmDeletePopup());
    yield put(fetchEmployees());
  } catch (e) {
    yield put(deleteEmployee.failure(e));
  }
}

function* deleteEmployeeSaga(): SagaIterator {
  yield takeLatest(
    deleteEmployee.REQUEST,
    deleteEmployeeIterator
  );
}

export default function*(): SagaIterator {
  yield [
    fork(fetchEmployeesSaga),
    fork(inviteEmployeesSaga),
    fork(makeAdminSaga),
    fork(unmakeAdminSaga),
    fork(deleteEmployeeSaga)
  ];
}
