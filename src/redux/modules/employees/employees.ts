import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>

export type StateObj = {
  employeesList: Employee[],
  confirmDelete: ConfirmPopup,
  confirmAdmin: ConfirmPopup,
  employeeCard: EmployeeCard
}

export type Employee = {
  id: string,
  status: string,
  admin?: boolean,
  avatar?: string,
  email: string,
  fullName?: string,
  position?: string,
  invitedAt?: string,
  deletedAt?: string,
  companyName?: string,
  companyLogo?: string
}

export type ConfirmPopup = {
  open: boolean,
  userId: string
}

export type EmployeeCard = {
  open: boolean,
  id: string,
  avatar: string,
  fullName: string,
  position: string,
  companyName: string,
  companyLogo: string
}

/**
 * Action types
 */
export const OPEN_CONFIRM_DELETE_POPUP = 'jincor/employees/employees/OPEN_CONFIRM_DELETE_POPUP'
export const CLOSE_CONFIRM_DELETE_POPUP = 'jincor/employees/confirmDeletePopup/CLOSE_CONFIRM_DELETE_POPUP'
export const OPEN_CONFIRM_ADMIN_POPUP = 'jincor/employees/employees/OPEN_CONFIRM_ADMIN_POPUP'
export const CLOSE_CONFIRM_ADMIN_POPUP = 'jincor/employees/employees/CLOSE_CONFIRM_ADMIN_POPUP'
export const OPEN_EMPLOYEE_CARD = 'jincor/employees/employees/OPEN_EMPLOYEE_CARD'
export const CLOSE_EMPLOYEE_CARD = 'jincor/employees/employees/CLOSE_EMPLOYEE_CARD'

/**
 * Action creators
 */
export const openConfirmDeletePopup = createAction<void>(OPEN_CONFIRM_DELETE_POPUP)
export const closeConfirmDeletePopup = createAction<void>(CLOSE_CONFIRM_DELETE_POPUP)
export const openConfirmAdminPopup = createAction<void>(OPEN_CONFIRM_ADMIN_POPUP)
export const closeConfirmAdminPopup = createAction<void>(CLOSE_CONFIRM_ADMIN_POPUP)
export const openEmployeeCard = createAction<EmployeeCard>(OPEN_EMPLOYEE_CARD)
export const closeEmployeeCard = createAction<void>(CLOSE_EMPLOYEE_CARD)

/**
 * Reducer
 */
const initialState: State = from<StateObj>({
  employeesList: [
    {
      id: '550e8400-e29b-41d4-a716-4466554300001',
      status: 'active',
      admin: false,
      avatar: 'http://imgur.com/QKHJ3Zs.png',
      email: 'lm@chvrches.com',
      fullName: 'Lauren Mayberry',
      position: 'Lead Singer',
      companyName: 'CHVRCHES',
      companyLogo: 'https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png'
    },
    {
      id: '550e8400-e29b-41d4-a716-446455440000',
      status: 'active',
      admin: true,
      avatar: 'http://i.imgur.com/PGjZg23.png',
      email: 'jf@johnfrusciante.com',
      fullName: 'John Frusciante',
      position: 'ex Red Hot Chili Peppers Guitarist',
      companyName: 'RCHP',
      companyLogo: 'https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png'
    },
    {
      id: '550e8400-e29b-41d4-a716-456655440000',
      status: 'active',
      admin: false,
      avatar: 'http://i.imgur.com/FaccapW.png',
      email: 'john@wick.me',
      fullName: 'John Wick',
      position: 'Professional killer | Baba Yaga',
      companyName: 'Russian Mafia',
      companyLogo: 'https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png'
    },
    {
      id: '94849893849843',
      status: 'invited',
      email: 'johnlennon@beatles.co.uk',
      invitedAt: '28.03.17'
    },
    {
      id: '129390904949493',
      status: 'invited',
      email: 'paulmccartney@beatles.co.uk',
      invitedAt: '28.03.17'
    },
    {
      id: '123390404090293',
      status: 'invited',
      email: 'georgeharrison@beatles.co.uk',
      invitedAt: '27.03.17'
    },
    {
      id: '02030309494904',
      status: 'invited',
      email: 'ringostarr@beatles.co.uk',
      invitedAt: '26.03.17'
    },
    {
      id: '192993904957',
      status: 'deleted',
      avatar: 'http://pn.ispirt.in/wp-content/uploads/userphoto/157.jpg',
      email: 'man@example.com',
      fullName: 'John Doe',
      position: 'ex Office Manager',
      deletedAt: '26.03.17'
    },
    {
      id: '192934342337',
      status: 'deleted',
      avatar: 'http://carlook.net/data/users_photos/0/922/cl-user-922_th.jpeg?2055',
      email: 'man2@example.com',
      fullName: 'Jane Doe',
      position: 'ex jQuery Developer',
      deletedAt: '28.03.17'
    }
  ],
  confirmDelete: {
    open: false,
    userId: ''
  },
  confirmAdmin: {
    open: false,
    userId: ''
  },
  employeeCard: {
    open: false,
    id: '',
    avatar: '',
    fullName: '',
    position: '',
    companyName: '',
    companyLogo: ''
  }
})

export default createReducer<State>({
  [OPEN_CONFIRM_DELETE_POPUP]: (state: State): State => (
    state.merge({ confirmDelete: { open: true } })
  ),

  [CLOSE_CONFIRM_DELETE_POPUP]: (state: State): State => (
    state.merge({ confirmDelete: { open: false } })
  ),

  [OPEN_CONFIRM_ADMIN_POPUP]: (state: State): State => (
    state.merge({ confirmAdmin: { open: true } })
  ),

  [CLOSE_CONFIRM_ADMIN_POPUP]: (state: State): State => (
    state.merge({ confirmAdmin: { open: false } })
  ),

  [OPEN_EMPLOYEE_CARD]: (state: State, { payload }: Action<EmployeeCard>): State => (
    state.merge({ employeeCard: { open: true, ...payload } })
  ),

  [CLOSE_EMPLOYEE_CARD]: (state: State): State => (
    state.merge({ employeeCard: { open: false } })
  )
}, initialState)
