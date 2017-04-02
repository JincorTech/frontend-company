import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { formActionSaga } from 'redux-form-saga'

import emailTextareaSaga from './common/emailTextarea'
import signUpSaga from './auth/signUp'
import signInSaga from './auth/signIn'
import restorePasswordSaga from './auth/restorePassword'
import createCompanySaga from './auth/createCompany'
import activityTypeSaga from './profile/activityTypes'
import profileSaga from './profile/profile'


export default function* (): SagaIterator {
  yield [
    fork(formActionSaga),
    fork(activityTypeSaga),
    fork(signInSaga),
    fork(signUpSaga),
    fork(restorePasswordSaga),
    fork(createCompanySaga),
    fork(emailTextareaSaga),
    fork(profileSaga)
  ]
}
