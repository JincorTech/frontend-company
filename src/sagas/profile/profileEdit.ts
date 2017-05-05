import { SagaIterator } from 'redux-saga'
import { takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import { put as putFunc, get } from '../../utils/api'
import { Action } from '../../utils/actions'

import { req, profileFormFields } from '../../helpers/profile/profileEdit'
import { updateProfile, updateCities, FETCH_PROFILE, UPDATE_CITIES } from '../../redux/modules/profile/profileEdit'
import { setOptions } from '../../redux/modules/common/select'
import { optionTransformer } from '../../helpers/common/select'


const getState = state => state.profile.profileView.company

function* getProfileIterator(): SagaIterator {
  try {
    const [countries, types, { data: profile }] = yield [
      call(get, '/dictionary/country'),
      call(get, '/company/types'),
      call(get, '/company/my')
    ]

    const formFields = yield call(profileFormFields, profile)
    yield put(initialize('profileEdit', {...formFields, activityTypes: ['0af14e0f-fc36-4298-9f7c-f465671d090a']}, false))

    const countryOptions = yield call(
      optionTransformer,
      countries.data,
      ({name, id: value }) => ({ value, name })
    )

    const typeOptions = yield call(
      optionTransformer,
      types.data,
      ({name, id: value }) => ({ value, name })
    )

    const { id } = profile.profile.formattedAddress.country

    yield put(updateCities(id))
    yield put(setOptions('select-country', countryOptions))
    yield put(setOptions('select-company-type', typeOptions))
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