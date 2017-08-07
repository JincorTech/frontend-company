import {
  createReducer,
  createAction,
  createSubmitAction,
  createAsyncAction,
  Action
} from '../../../utils/actions';

import { from, ImmutableObject } from 'seamless-immutable';

import { FormFields as LoginFields } from '../../../components/auth/LoginForm';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  spinner: boolean
  step: 'login' | 'companies'
  employee: Employee,
  companies: Company[]
};

export type Company = {
  id: string
  legalName: string
  companyType: {
    id: string
    code: string
    name: string
  }
  economicalActivityTypes: any[]
  profile: {
    brandName: string
    email: string
    address: {
      city: string
      country: {
        id: string
        name: string
      }
      formattedAddress: string
    }
    links: any[]
    phone: string
    picture: string
  }
};

export type Employee = {
  email: string
  password: string
};

export type LoginData = {
  email: string
  password: string
  companyId: string
};

/**
 * Constans
 */
export const FETCH_COMPANIES = 'auth/signIn/FETCH_COMPANIES';
export const SHOW_COMPANY_LIST = 'auth/signIn/SHOW_COMPANY_LIST';
export const FETCH_LOGIN = 'auth/signIn/FETCH_LOGIN';
export const SELECT_COMPANY = 'auth/signIn/SELECT_COMPANY';
export const RESET_STATE = 'auth/signIn/RESET_SIGN_IN';

/**
 * Action Creators
 */
export const fetchCompanies = createSubmitAction<LoginFields, void>(FETCH_COMPANIES);
export const showCompanyList = createAction<void>(SHOW_COMPANY_LIST);
export const fetchLogin = createAction<LoginData>(FETCH_LOGIN);
export const selectCompany = createAction<string>(SELECT_COMPANY);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  spinner: false,
  step: 'login',
  employee: {
    email: '',
    password: ''
  },
  companies: []
});

export default createReducer<State>({
  [fetchCompanies.REQUEST]: (state: State, { payload }: Action<LoginFields>): State => (
    state.merge({
      employee: payload,
      spinner: true
    })
  ),

  [fetchCompanies.SUCCESS]: (state: State, { payload }: Action<Company[]>): State => (
    state.merge({
      companies: payload,
      spinner: false
    })
  ),

  [SHOW_COMPANY_LIST]: (state: State): State => (
    state.merge({ step: 'companies' })
  ),

  [RESET_STATE]: (state: State): State => state.merge(initialState)
}, initialState);
