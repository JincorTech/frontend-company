import { createReducer, createAction, createSubmitAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { Company } from '../../../components/auth/CompanyList'
import { FormFields as RestoreFields } from '../../../containers/auth/RequestPasswordForm'
import { FormFields as ConfirmFields } from '../../../containers/auth/ConfirmPasswordForm'
import { FormFields as NewPasswordFields } from '../../../containers/auth/NewPasswordForm'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  step: Step
  spinner: boolean
  verificationId: string
  companyId: string
  companies: Company[]
}

export type Step = 'email' | 'confirm' | 'companies' | 'new'

/**
 * Constants
 */
export const RESTORE_PASSWORD = 'auth/restorePassword/RESTORE_PASSWORD'
export const CONFIRM_EMAIL    = 'auth/restorePassword/CONFIRM_EMAIL'
export const SELECT_COMPANY   = 'auth/restorePassword/SELECT_COMPANY'
export const NEW_PASSWORD     = 'auth/restorePassword/SET_NEW_PASSWORD'

/**
 * Action Creators
 */
export const restorePassword  = createSubmitAction<RestoreFields, string>(RESTORE_PASSWORD)
export const confirmEmail     = createSubmitAction<ConfirmFields, Company[]>(CONFIRM_EMAIL)
export const selectCompany    = createAction<string>(SELECT_COMPANY)
export const setNewPassword   = createSubmitAction<NewPasswordFields, void>(NEW_PASSWORD)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  step: 'email',
  spinner: false,
  companyId: '',
  verificationId: '',
  companies: []
})

export default createReducer<State>({
  [restorePassword.REQUEST]: (state: State): State => (
    state.merge({
      spinner: true
    })
  ),

  [restorePassword.SUCCESS]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      spinner: false,
      verificationId: payload,
      step: 'confirm'
    })
  ),

  [confirmEmail.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [confirmEmail.SUCCESS]: (state: State, { payload }: Action<Company[]>): State => (
    state.merge({
      spinner: false,
      companies: payload,
      step: 'companies'
    })
  ),

  [SELECT_COMPANY]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      companyId: payload,
      step: 'new'
    })
  ),

  [setNewPassword.REQUEST]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      spinner: true
    })
  ),

  [setNewPassword.SUCCESS]: (state: State): State => (
    state.merge({
      spinner: false
    })
  )
}, initialState)