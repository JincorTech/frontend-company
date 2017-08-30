import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  preloader: boolean
  company: Company
};

// User company
export type Company = {
  id: string
  legalName: string
  employeesCount: number
  profile: Profile
  economicalActivityTypes: ActivityType[]
  companyType: CompanyType
};

export type Profile = {
  brandName: {
    [locale: string]: string
  }
  picture: string
  links: Link[]
  email: string
  phone: string
  description: string
  address: Address
};

export type ActivityType = {
  id: string
  name: string
  code: string
};

export type CompanyType = {
  id: string
  name: string
  code: string
};

export type Address = {
  country: {
    id: string
    name: string
  }
  city: {
    id: string
    name: string
  }
  formattedAddress: string
};

export type Link = {
  name: string
  value: string
  iconUrl?: string
};

/**
 * Actions
 */
export const FETCH_COMPANY = 'profile/profile/FETCH_COMPANY';
export const RESET_STATE = 'profile/profile/RESET_PROFILE_VIEW_STATE';

/**
 * Action creators
 */
export const fetchCompany = createAsyncAction<string, Company>(FETCH_COMPANY);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState = from<StateMap>({
  preloader: true,
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
  [fetchCompany.REQUEST]: (state: State): State => (
    state.merge({ preloader: true })
  ),

  [fetchCompany.SUCCESS]: (state: State, { payload: company }: Action<Company>): State => (
    state.merge({ preloader: false, company })
  ),

  [fetchCompany.FAILURE]: (state: State): State => (
    state.merge({ preloader: false })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge(initialState)
  )
}, initialState);
