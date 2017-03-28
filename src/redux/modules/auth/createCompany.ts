import { createReducer, createAsyncAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  countries: Country[]
  companyTypes: CompanyType[]
}

export type Country = {
  id: string
  name: string
  alpha2: string
  locale: string
}

export type CompanyType = {
  id: string
  name: string
  code: string
}

/**
 * Action types
 */
export const FETCH_COUNTRIES = 'jincor/auth/signUp/FETCH_COUNTRIES'
export const FETCH_COMPANY_TYPES = 'jincor/auth/signUp/FETCH_COMPANY_TYPES'

/**
* Action creators
*/
export const fetchCountries = createAsyncAction<void, Country[]>(FETCH_COUNTRIES)
export const fetchCompanyTypes = createAsyncAction<void, CompanyType[]>(FETCH_COMPANY_TYPES)

/**
* Reducer
*/
const initialState: State = from<StateMap>({
  countries: [],
  companyTypes: []
})

export default createReducer<State>({
  [fetchCountries.SUCCESS]: (state: State, action: Action<Country[]>): State => (
    state.merge({ countries: action.payload })
  ),

  [fetchCompanyTypes.SUCCESS]: (state: State, action: Action<CompanyType[]>): State => (
    state.merge({ companyTypes: action.payload })
  )
}, initialState)
