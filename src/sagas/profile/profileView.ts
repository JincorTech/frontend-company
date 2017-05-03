import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'

import { fetchCompany } from '../../redux/modules/profile/profileView'


/**
 * Fetch my company
 */
function* fetchCompanyIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/company/my')
    yield put(fetchCompany.success(data))
  } catch (e) {
    yield put(fetchCompany.failure(e))
  }
}

function* fetchCompanySaga(): SagaIterator {
  yield takeLatest(
    fetchCompany.REQUEST,
    fetchCompanyIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(fetchCompanySaga)
  ]
}