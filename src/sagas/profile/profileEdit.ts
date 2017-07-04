import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import { push } from 'react-router-redux'
import { put as putFunc, get } from '../../utils/api'
import { Action } from '../../utils/actions'

import { req, profileFormFields } from '../../helpers/profile/profileEdit'
import {
  updateProfile,
  updateCities,
  hidePreloader,
  setLogo
} from '../../redux/modules/profile/profileEdit'
import { FETCH_PROFILE, UPDATE_CITIES } from '../../redux/modules/profile/profileEdit'
import { setOptions } from '../../redux/modules/common/select'
import { optionTransformer } from '../../helpers/common/select'


const getState = (state) => state.profile.profileView.company
const transformFunc = ({name, id: value }) => ({ value, name })

function* getProfileIterator(): SagaIterator {
  try {
    const [countries, types, { data: profile }] = yield [
      call(get, '/dictionary/country'),
      call(get, '/company/types'),
      call(get, '/company/my')
    ]

    const { id: countryId } = profile.profile.address.country
    const { picture: src } = profile.profile

    const cities = yield call(get, `/dictionary/city?country=${countryId}`)

    const formFields     = yield call(profileFormFields, profile)
    const cityOptions    = yield call(optionTransformer, cities.data, transformFunc)
    const countryOptions = yield call(optionTransformer, countries.data, transformFunc)
    const typeOptions    = yield call(optionTransformer, types.data, transformFunc)

    yield put(initialize('profileEdit', formFields, false))
    yield put(setLogo(src))
    yield put(setOptions('select-city', cityOptions))
    yield put(setOptions('select-country', countryOptions))
    yield put(setOptions('select-company-type', typeOptions))
    yield put(hidePreloader())
  } catch (e) {
    yield call(console.log, e)
  }
}

function* getProfileSaga(): SagaIterator {
  yield takeLatest(
    FETCH_PROFILE,
    getProfileIterator
  )
}

function* updateCitiesIterator({ payload: countryId }: Action<string>): SagaIterator {
  try {
    const { data: cities } = yield call(get, `/dictionary/city?country=${countryId}`)

    const cityOptions = yield call(
      optionTransformer,
      cities,
      ({name, id: value }) => ({ value, name })
    )

    yield put(setOptions('select-city', cityOptions))
  } catch (e) {
    yield call(console.log, e)
  }
}

function* updateCitiesSaga(): SagaIterator {
  yield takeLatest(
    UPDATE_CITIES,
    updateCitiesIterator
  )
}

/**
 * Update profile saga
 */
function* updateProfileIterator({ payload }): SagaIterator {
  try {
    const state = yield select(getState)
    yield call(putFunc, '/company/my', req(payload))
    yield put(updateProfile.success())
    yield put(push('/cmp/app/profile'))
  } catch (e) {
    yield put(updateProfile.failure(e))
  }
}

function* updateProfileSaga(): SagaIterator {
  yield takeLatest(
    updateProfile.REQUEST,
    updateProfileIterator
  )
}

/**
 * Profile edit saga
 */
export default function* (): SagaIterator {
  yield [
    fork(updateProfileSaga),
    fork(getProfileSaga),
    fork(updateCitiesSaga)
  ]
}