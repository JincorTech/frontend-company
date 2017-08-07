import { SagaIterator, delay } from 'redux-saga';
import { takeLatest, takeEvery, call, put, select, fork } from 'redux-saga/effects';
import { get } from '../../utils/api';
import { Action } from '../../utils/actions';

import { search, nextPage, fetchCountries, SearchRequest } from '../../redux/modules/search/search';
import { setOptions } from '../../redux/modules/common/select';
import { optionTransformer } from '../../helpers/common/select';
import { showLoading, hideLoading, resetLoading } from 'react-redux-loading-bar';
import { request } from '../../helpers/search/search';

function* getCountriesIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/dictionary/country');
    const countryOptions = yield call(
      optionTransformer,
      data,
      ({name, id: value}) => ({ value, name })
    );

    yield put(setOptions('select-country', countryOptions));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* getCountriesSaga(): SagaIterator {
  yield takeLatest(
    fetchCountries.REQUEST,
    getCountriesIterator
  );
}

function* getCompaniesIterator({ payload }: Action<SearchRequest>): SagaIterator {
  try {
    yield put(resetLoading());
    yield call(delay, 600);
    yield put(showLoading());
    const searchRequest = yield call(request, payload);
    const { data: companies, meta } = yield call(get, `/company/search?${searchRequest}`);
    yield put(search.success({ companies, meta }));
  } catch (e) {
    yield put(search.failure(e));
  } finally {
    yield put(hideLoading());
  }
}

function* getCompaniesSaga(): SagaIterator {
  yield takeLatest(
    search.REQUEST,
    getCompaniesIterator
  );
}

function* pushCompaniesIterator({ payload }: Action<void>): SagaIterator {
  try {
    const req = yield call(request, payload);
    const { data: companies, meta } = yield call(get, `/company/search?${req}`);
    yield put(nextPage.success({ companies, meta }));
  } catch (e) {
    yield put(nextPage.failure(e));
  }
}

function* pushCompaniesSaga(): SagaIterator {
  yield takeLatest(
    nextPage.REQUEST,
    pushCompaniesIterator
  );
}

export default function*(): SagaIterator {
  yield [
    fork(getCountriesSaga),
    fork(getCompaniesSaga),
    fork(pushCompaniesSaga)
  ];
}
