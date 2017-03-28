import { createReducer, createSubmitAction, createAsyncAction } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  step: Step
  stepIndex: StepIndex
  company: Company
  employee: Employee
}

export type Step = 'company' | 'Account' | 'confirmEmail' | 'inviteEmployee'

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
export const CREATE_COMPANY = 'jincor/auth/signUp/CREATE_COMPANY'
export const VERIFY_EMAIL = 'jincor/auth/signUp/VERIFY_EMAIL'
export const CONFIRM_EMAIL = 'jincor/auth/signUp/CONFIRM_EMAIL'
export const INVITE_EMPLOYEE = 'jincor/auth/signUp/EMPLOYEE'
export const RESET_SIGN_UP = 'jincor/auth/signUp/RESET_SIGN_UP'

/**
 * Actions creators
 */
// export const createCompany = createFormAction<CompanyFormFields>(CREATE_COMPANY)
// export const verifyEmail = createFormAction<AccountFormFields>(VERIFY_EMAIL)
// export const confirmEmail = createFormAction<EmailFormFields>(CONFIRM_EMAIL)
// export const inviteEmployee = createSagaAction<string[]>(INVITE_EMPLOYEE)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
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

}, initialState)