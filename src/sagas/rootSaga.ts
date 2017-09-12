import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';
import appLayoutSaga from './app/appLayout';
import profileCardSaga from './app/profileCard';
import emailTextareaSaga from './common/emailTextarea';
import selectSaga from './common/select';
import activityTypesSaga from './common/activityTypes';
import signUpSaga from './auth/signUp';
import signInSaga from './auth/signIn';
import restorePasswordSaga from './auth/restorePassword';
import registerEmployee from './auth/registerEmployee';
import profileSaga from './profile/profileView';
import profileEditSaga from './profile/profileEdit';
import employeesSaga from './employees/employees';
import searchSaga from './search/search';

export default function*(): SagaIterator {
  yield [
    fork(appSaga),
    fork(appLayoutSaga),
    fork(formActionSaga),
    fork(activityTypesSaga),
    fork(signInSaga),
    fork(signUpSaga),
    fork(restorePasswordSaga),
    fork(registerEmployee),
    fork(emailTextareaSaga),
    fork(profileSaga),
    fork(profileEditSaga),
    fork(selectSaga),
    fork(employeesSaga),
    fork(profileCardSaga),
    fork(searchSaga)
  ];
}
