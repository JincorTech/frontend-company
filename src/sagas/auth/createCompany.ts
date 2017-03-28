import { SagaIterator } from 'redux-saga'
import { takeLatest, put, call, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'

import { fetchCountries, fetchCompanyTypes } from '../../redux/modules/auth/createCompany'


/**
 * Fetch countries saga
 */
export function* fetchCountriesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/dictionary/country')
    yield put(fetchCountries.success(data))
  } catch (e) {
    yield put(fetchCountries.failure(e))
  }
}

export function* fetchCountriesSaga(): SagaIterator {
  yield takeLatest(
    fetchCountries.REQUEST,
    fetchCountriesIterator
  )
}


/**
 * Fetch company types saga
 */
export function* fetchTypesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/company/types')
    yield put(fetchCompanyTypes.success(data))
  } catch (e) {
    yield put(fetchCompanyTypes.failure(e))
  }
}

export function* fetchTypesSaga(): SagaIterator {
  yield takeLatest(
    fetchCompanyTypes.REQUEST,
    fetchTypesIterator
  )
}


/**
 * Create company saga
 */
export default function* (): SagaIterator {
  yield [
    fork(fetchCountriesSaga),
    fork(fetchTypesSaga)
  ]
}