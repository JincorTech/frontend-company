import { SagaIterator, delay } from 'redux-saga'
import { takeLatest, takeEvery, call, put, select, fork } from 'redux-saga/effects'
import { get } from '../../utils/api'
import { Action } from '../../utils/actions'

import { search, fetchCountries, SearchRequest } from '../../redux/modules/search/search'
import { setOptions } from '../../redux/modules/common/select'
import { optionTransformer } from '../../helpers/common/select'
import { showLoading, hideLoading, resetLoading } from 'react-redux-loading-bar'


function* getCountriesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/dictionary/country')
    const countryOptions = yield call(
      optionTransformer,
      data,
      ({name, id: value}) => ({ value, name })
    )

    yield put(setOptions('select-country', countryOptions))
  } catch (e) {
    yield call(console.log, e)
  }
}

function* getCountriesSaga(): SagaIterator {
  yield takeLatest(
    fetchCountries.REQUEST,
    getCountriesIterator
  )
}



function* getCompaniesIterator({ payload }: Action<SearchRequest>): SagaIterator {
  try {
    yield put(resetLoading())
    yield call(delay, 1000)
    yield put(showLoading())
    yield call(console.log, payload)
    yield call(get, '/company/my')
    yield put(search.success())
  } catch (e) {
    yield put(search.failure(e))
  } finally {
    yield put(hideLoading())
  }
}


function* getCompaniesSaga(): SagaIterator {
  yield takeLatest(
    search.REQUEST,
    getCompaniesIterator
  )
}


export default function* (): SagaIterator {
  yield [
    fork(getCountriesSaga),
    fork(getCompaniesSaga)
  ]
}
