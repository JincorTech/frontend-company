import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { SocialLinkProps as SocialLink } from '../../../components/profile/SocialLink'


/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  editable: boolean
  company: Company
}

export type Company = {
  logo: string
  name: string
  type: string
  region: string
  description: string
  email: string
  phone: string
  activities: ActivityType[]
  socialLinks: SocialLink[]
}

export type ActivityType = {
  id: string
  name: string
}


/**
 * Actions
 */
export const EDITABLE       = 'profile/profile/EDITABLE'
export const FETCH_COMPANY  = 'profile/profile/FETCH_COMPANY'

/**
 * Action creators
 */
export const setEditable = createAction<boolean>(EDITABLE)
export const fetchCompany = createAsyncAction<string, Company>(FETCH_COMPANY)

/**
 * Reducer
 */
const initialState = from<StateMap>({
  editable: false,
  company: {
    logo: '',
    name: 'Альфа-Банк',
    type: 'Частная компания',
    region: 'Россия, Москва',
    description: 'Альфа-Банк, основанный в 1990 году, является универсальным банком, осуществляющим все основные виды банковских операций, представленных на рынке финансовых услуг, включая обслуживание частны',
    email: 'contact@alfa-bank.ru',
    phone: '+7 495 002 93 90',
    activities: [{id: 'ss', name: 'Банковская сфера'}],
    socialLinks: [{url: 'sss', name: 'Facebook'}]
  }
})

export default createReducer<State>({
  [EDITABLE]: (state: State, { payload }: Action<boolean>): State => (
    state.merge({ editable: payload })
  ),

  [fetchCompany.SUCCESS]: (state: State, { payload }: Action<Company>): State => (
    state.merge({ company: payload })
  )
}, initialState)