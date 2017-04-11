import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'

import { fetchCompany } from '../../redux/modules/profile/profile'


/**
 * Fetch my company
 */
function* fetchCompanyIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/company/my')
    yield call(console.log, data)
  } catch (e) {
    yield put(fetchCompany.failure(e))
  }
}

export default function* fetchCompanySaga(): SagaIterator {
  yield takeLatest(
    fetchCompany.REQUEST,
    fetchCompanyIterator
  )
}