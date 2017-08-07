import { SagaIterator } from 'redux-saga';
import { takeEvery, put, fork, select, call } from 'redux-saga/effects';
import { Action } from '../../utils/actions';

import {
  addEmails,
  changeValue,
  removeLastEmail,
  removeEmail,
  unselectEmail,
  setValidateState,
  validateEmail,
  HANDLE_EMAIL_REMOVE,
  VALIDATE_EMAIL, KEY_PRESS
} from '../../redux/modules/common/emailTextarea';

import { canGetEmails, getEmails, isEmail } from '../../helpers/common/emailTextarea';

const getState = (state) => state.common.emailTextarea;

/**
 * Take email from string or change value
 */
function* validateEmailIterator({ payload }: Action<string>): SagaIterator {
  const { valid, emails } = yield select(getState);

  if (!valid && (isEmail(payload) || emails.length)) {
    yield put(setValidateState(true));
  }

  if (valid && !(isEmail(payload) || emails.length)) {
    yield put(setValidateState(false));
  }

  if (canGetEmails(payload)) {
    const emails = yield call(getEmails, payload);

    yield put(addEmails(emails));
    yield put(changeValue(''));
  } else {
    yield put(changeValue(payload));
  }
}

export function* validateEmailSaga(): SagaIterator {
  yield takeEvery(
    VALIDATE_EMAIL,
    validateEmailIterator
  );
}

/**
 * Handle backspace
 */
function* handleBackspaceIterator({ payload: btnKey }: Action<string>): SagaIterator {
  const { selectedEmail, value } = yield select(getState);

  if (btnKey === 'Backspace') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail));
      yield put(unselectEmail());
    } else if (!value) {
      yield put(removeLastEmail());
    }
  }

  if (btnKey === 'Delete') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail));
      yield put(unselectEmail());
    }
  }

  yield put(validateEmail(value));
}

export function* handleBackspaceSaga(): SagaIterator {
  yield takeEvery(
    HANDLE_EMAIL_REMOVE,
    handleBackspaceIterator
  );
}

/**
 * Email textarea saga
 */
export default function*(): SagaIterator {
  yield [
    fork(validateEmailSaga),
    fork(handleBackspaceSaga)
  ];
}
