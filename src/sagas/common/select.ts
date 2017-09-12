import { SagaIterator } from 'redux-saga';
import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { ActionMeta } from '../../utils/actions';

import {
  SET_OPTIONS,
  SELECT_OPTION,
  setNormalized,
  setOption,
  closeSelect,
  Option,
  NormalizedOptions
} from '../../redux/modules/common/select';

import { normalizeOptions } from '../../helpers/common/select';

/**
 * Normalize options
 */
function* setOptionsIterator({ payload, meta }: ActionMeta<string, Option[]>): SagaIterator {
  const normalized: NormalizedOptions = yield call(normalizeOptions, payload);
  yield put(setNormalized(meta, normalized));
}

export function* setOptionsSaga(): SagaIterator {
  yield takeLatest(
    SET_OPTIONS,
    setOptionsIterator
  );
}

/**
 * Select option
 */
function* selectOptionIterator({ payload, meta }: ActionMeta<string, string>): SagaIterator {
  yield put(setOption(meta, payload));
  yield put(closeSelect(meta));
}

export function* selectOptionSaga(): SagaIterator {
  yield takeLatest(
    SELECT_OPTION,
    selectOptionIterator
  );
}

/**
 * Select Saga
 */
export default function*(): SagaIterator {
  yield [
    fork(setOptionsSaga),
    fork(selectOptionSaga)
  ];
}
