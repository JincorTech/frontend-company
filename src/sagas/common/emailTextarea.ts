import { SagaIterator } from 'redux-saga'
import { takeEvery, put, fork, select } from 'redux-saga/effects'
import { Action } from '../../utils/actions'

import { addEmails, changeValue, removeLastEmail, removeEmail, unselectEmail, HANDLE_EMAIL_REMOVE, VALIDATE_EMAIL, KEY_PRESS } from '../../redux/modules/common/emailTextarea'
import { isValidEmails, getEmails } from '../../helpers/common/emailTextarea'

/**
 * Take email from string or change value 
 */
function* validateEmailIterator({ payload }: Action<string>): SagaIterator {
  if (isValidEmails(payload)) {
    const emails = getEmails(payload)
    const action = addEmails(emails)
    yield put(action)
  } else {
    const action = changeValue(payload)
    yield put(action)
  }
}

export function* validateEmailSaga(): SagaIterator {
  yield takeEvery(
    VALIDATE_EMAIL,
    validateEmailIterator
  )
}

/**
 * Handle backspace
 */
const getState = (state) => state.common.emailTextarea

function* handleBackspaceIterator({ payload: btnKey }: Action<string>): SagaIterator {
  const { selectedEmail, value } = yield select(getState)

  if (btnKey === 'Backspace') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail))
      yield put(unselectEmail())
    } else if (!value) {
      yield put(removeLastEmail())
    }
  }

  if (btnKey === 'Delete') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail))
      yield put(unselectEmail())
    }
  }
}

export function* handleBackspaceSaga(): SagaIterator {
  yield takeEvery(
    HANDLE_EMAIL_REMOVE,
    handleBackspaceIterator
  )
}

/**
 * Email textarea saga
 */
export default function* (): SagaIterator {
  yield [
    fork(validateEmailSaga),
    fork(handleBackspaceSaga)
  ]
}