import { from, ImmutableObject } from 'seamless-immutable'

import {
  createReducer,
  createSubmitAction,
  createAction,
  createAsyncAction,
  Action
} from '../../../utils/actions'

import { FormFields as CompanyFields } from '../../../components/auth/CreateCompanyForm'
import { FormFields as AccountFields } from '../../../components/auth/CreateAccountForm'
import { FormFields as ConfirmFields } from '../../../components/auth/ConfirmEmailForm'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  spinner: boolean
  step: Step
  stepIndex: StepIndex
  company: Company
  employee: Employee
}

export type Step = 'company' | 'account' | 'email' | 'employee'

export type StepIndex = 1 | 2 | 3

export type Employee = {
  firstName: string
  lastName: string
  password: string
  position: string
}

export type Company = {
  id: string
  verificationId: string
}

/**
 * Action types
 */
export const CREATE_COMPANY   = 'auth/signUp/CREATE_COMPANY'
export const SET_USER_INFO    = 'auth/signUp/SET_USER_INFO'
export const VERIFY_EMAIL     = 'auth/signUp/VERIFY_EMAIL'
export const CONFIRM_EMAIL    = 'auth/signUp/CONFIRM_EMAIL'
export const ACCOUNT_CREATED  = 'auth/signUp/CREATE_ACCOUNT_SUCCESS'
export const INVITE_EMPLOYEE  = 'auth/signUp/EMPLOYEE'
export const RESET_STATE      = 'auth/signUp/RESET_STATE'
export const FETCH_DICT       = 'jincor/auth/signUp/FETCH_DICT'

/**
 * Actions creators
 */
export const fetchDict      = createAsyncAction<void, void>(FETCH_DICT)
export const createCompany  = createSubmitAction<CompanyFields, Company>(CREATE_COMPANY)
export const setUserInfo    = createAction<Employee>(SET_USER_INFO)
export const verifyEmail    = createSubmitAction<AccountFields, void>(VERIFY_EMAIL)
export const confirmEmail   = createSubmitAction<ConfirmFields, void>(CONFIRM_EMAIL)
export const accountCreated = createAction<void>(ACCOUNT_CREATED)
export const inviteEmployee = createAsyncAction<void, void>(INVITE_EMPLOYEE)
export const resetState     = createAction<void>(RESET_STATE)


/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  spinner: false,
  step: 'company',
  stepIndex: 1,
  company: {
    id: '',
    verificationId: ''
  },
  employee: {
    firstName: '',
    lastName: '',
    password: '',
    position: ''
  }
})

export default createReducer<State>({
  [createCompany.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [createCompany.SUCCESS]: (state: State, { payload }: Action<Company>): State => (
    state.merge({
      company: payload,
      step: 'account',
      stepIndex: 2,
      spinner: false
    })
  ),

  [verifyEmail.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [SET_USER_INFO]: (state: State, { payload }: Action<Employee>): State => (
    state.merge({
      employee: payload
    })
  ),

  [verifyEmail.SUCCESS]: (state: State): State => (
    state.merge({
      step: 'email',
      spinner: false
    })
  ),

  [confirmEmail.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [ACCOUNT_CREATED]: (state: State): State => (
    state.merge({
      step: 'employee',
      stepIndex: 3,
      spinner: false
    })
  ),

  [inviteEmployee.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [inviteEmployee.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge(initialState)
  )
}, initialState)