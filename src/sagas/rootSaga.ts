import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { formActionSaga } from 'redux-form-saga'

import activityTypeSaga from './profile/activityTypes'
import signUpSaga from './auth/signUp'
import signInSaga from './auth/signIn'
import createCompanySaga from './auth/createCompany'
import emailTextareaSaga from './common/emailTextarea'

export default function* (): SagaIterator {
  yield [
    fork(formActionSaga),
    fork(activityTypeSaga),
    fork(signInSaga),
    fork(signUpSaga),
    fork(createCompanySaga),
    fork(emailTextareaSaga)
  ]
}
