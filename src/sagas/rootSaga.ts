import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { formActionSaga } from 'redux-form-saga'


import appSaga from './app/app'
import appLayoutSaga from './app/appLayout'
import profileCardSaga from './app/profileCard'
import emailTextareaSaga from './common/emailTextarea'
import selectSaga from './common/select'
import activityTypesSaga from './common/activityTypes'
import signUpSaga from './auth/signUp'
import signInSaga from './auth/signIn'
import restorePasswordSaga from './auth/restorePassword'
import createCompanySaga from './auth/createCompany'
import profileSaga from './profile/profileView'
import employeesSaga from './employees/employees'


export default function* (): SagaIterator {
  yield [
    fork(appSaga),
    fork(appLayoutSaga),
    fork(formActionSaga),
    fork(activityTypesSaga),
    fork(signInSaga),
    fork(signUpSaga),
    fork(restorePasswordSaga),
    fork(createCompanySaga),
    fork(emailTextareaSaga),
    fork(profileSaga),
    fork(selectSaga),
    fork(employeesSaga),
    fork(profileCardSaga)
  ]
}
