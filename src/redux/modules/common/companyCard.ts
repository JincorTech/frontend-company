import { createReducer, createAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

import { Company } from '../profile/profileView';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  open: boolean
  company: Company
};

/**
 * Action types
 */
export const OPEN_CARD = 'common/companyCard/OPEN_CARD';
export const CLOSE_CARD = 'common/companyCard/CLOSE_CARD';

/**
 * Action creators
 */
export const openCompanyCard = createAction<Company>(OPEN_CARD);
export const closeCompanyCard = createAction<void>(CLOSE_CARD);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  open: false,
  company: {
    id: '',
    legalName: '',
    employeesCount: 0,
    profile: {
      brandName: {},
      picture: '',
      links: [],
      email: '',
      phone: '',
      description: '',
      address: {
        country: {
          id: '',
          name: ''
        },
        city: {
          name: '',
          id: ''
        },
        formattedAddress: ''
      }
    },
    economicalActivityTypes: [],
    companyType: {
      id: '',
      name: '',
      code: ''
    }
  }
});

export default createReducer<State>({
  [OPEN_CARD]: (state: State, { payload: company }: Action<Company>): State => (
    state.merge({ open: true, company })
  ),

  [CLOSE_CARD]: (state: State): State => (
    state.merge({ open: false, company: initialState.company })
  )
}, initialState);
