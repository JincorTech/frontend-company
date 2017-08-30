import { SagaIterator } from 'redux-saga';
import { takeLatest, takeEvery, call, put, select, fork } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import { Action } from '../../utils/actions';
import { get, put as putFunc } from '../../utils/api';
import { notify } from '../../utils/notifications';

import {
  changePassword, updateProfile,
  changeView, closeProfileCard,
  LOGOUT, FETCH_PROFILE, setAvatar,
  OPEN_PROFILE_CARD
} from '../../redux/modules/app/profileCard';
import { fetchUser } from '../../redux/modules/app/appLayout';
import { logout } from '../../redux/modules/app/app';

import { PasswordFields, ProfileFields } from '../../redux/modules/app/profileCard';

const getUserState = state => state.app.appLayout.user.profile;

function* getProfileIterator(): SagaIterator {
  try {
    const { avatar, firstName, lastName, position } = yield select(getUserState);

    yield put(initialize('cardUpdateProfile', { avatar: '', firstName, lastName, position }, false));
    yield put(setAvatar(avatar));
  } catch (e) {
    yield call(console.log, e);
    yield put(notify('error', 'Oops', e.message));
  }
}

function* getProfileSaga(): SagaIterator {
  yield takeLatest(
    FETCH_PROFILE,
    getProfileIterator
  );
}

const getCompanyState = state => state.app.appLayout.user.company;

function* changePasswordIterator({ payload }: Action<PasswordFields>): SagaIterator {
  const { id } = yield select(getCompanyState);
  const body = { companyId: id, ...payload };

  try {
    yield call(putFunc, '/employee/changePassword', body);
    yield put(changePassword.success());
    yield put(changeView('buttons'));
  } catch (e) {
    yield put(changePassword.failure());
    yield put(notify('error', 'Oops', e.message));
  }
}

function* changePasswordSaga(): SagaIterator {
  yield takeLatest(
    changePassword.REQUEST,
    changePasswordIterator
  );
}

function* updateProfileIterator({ payload }: Action<ProfileFields>): SagaIterator {
  const body = { profile: { ...payload } };

  try {
    yield call(putFunc, '/employee/me', body);
    yield put(updateProfile.success());
    yield put(fetchUser());
    yield put(changeView('buttons'));
  } catch (e) {
    yield put(updateProfile.failure(e));
    yield put(notify('error', 'Oops', e.message));
  }
}

function* updateProfileSaga(): SagaIterator {
  yield takeLatest(
    updateProfile.REQUEST,
    updateProfileIterator
  );
}

function* logoutIterator(): SagaIterator {
  yield put(logout());
  yield put(closeProfileCard());
}

function* logoutSaga(): SagaIterator {
  yield takeEvery(
    LOGOUT,
    logoutIterator
  );
}

function* fetchUserIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/me');
    yield put(fetchUser.success(data));
  } catch (e) {
    yield put(fetchUser.failure(e));
    yield put(notify('error', 'Oops', e.message));
  }
}

function* fetchUserSaga(): SagaIterator {
  yield takeLatest(
    OPEN_PROFILE_CARD,
    fetchUserIterator
  );
}

export default function*(): SagaIterator {
  yield [
    fork(changePasswordSaga),
    fork(getProfileSaga),
    fork(updateProfileSaga),
    fork(logoutSaga),
    fork(fetchUserSaga)
  ];
}
