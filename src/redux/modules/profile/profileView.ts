import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'


/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  company: Company
}

// User company
export type Company = {
  id: string
  legalName: string
  profile: Profile,
  economicalActivityTypes: ActivityType[]
  companyType: CompanyType
}

export type Profile = {
  brandName: {
    [locale: string]: string
  }
  picture: string
  links: Links[]
  email: string
  phone: string
  description: string
  formattedAddress: FormattedAddress
}

export type ActivityType = {
  id: string
  name: string
  code: string
}

export type CompanyType = {
  id: string
  name: string
  code: string
}

export type FormattedAddress = {
  country: {
    id: string
    name: string
  }
  city: string
  formattedAddress: string
}

export type Links = {
  name: string
  value: string
  iconUrl?: string
}

/**
 * Actions
 */
export const FETCH_COMPANY  = 'profile/profile/FETCH_COMPANY'

/**
 * Action creators
 */
export const fetchCompany = createAsyncAction<string, Company>(FETCH_COMPANY)

/**
 * Reducer
 */
const initialState = from<StateMap>({
  company: {
    id: '',
    legalName: '',
    profile: {
      brandName: {},
      picture: '',
      links: [],
      email: '',
      phone: '',
      description: '',
      formattedAddress: {
        country: {
          id: '',
          name: ''
        },
        city: '',
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
})

export default createReducer<State>({
  [fetchCompany.SUCCESS]: (state: State, { payload: company }: Action<Company>): State => (
    state.merge({ company })
  )
}, initialState)