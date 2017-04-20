import { createReducer, createAction, Action, createAsyncAction } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { EmployeeCardState } from '../../../components/employees/EmployeeCard'

/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>

export type StateObj = {
  employees: {
    spinner: boolean,
    list: Employee[]
  },
  confirmDelete: ConfirmPopup,
  confirmAdmin: ConfirmPopup,
  confirmRmAdmin: ConfirmPopup,
  employeeCard: EmployeeCardState
}

export type Employee = ActiveEmployee | InvitedEmployee | DeletedEmployee

export type ActiveEmployee = {
  id: string,
  contacts: {
    email: string,
    phone?: string
  },
  meta: {
    registered_at: string,
    status: 'active' | ''
  },
  profile: {
    avatar?: string,
    role: string,
    name: string,
    position: string
  }
}

export type InvitedEmployee = {
  id: string,
  contacts: {
    email: string
  },
  meta: {
    invited_at: string
    status: 'invited'
  }
}

export type DeletedEmployee = {
  id: string,
  contacts: {
    email: string
  },
  meta: {
    deleted_at: string
    status: 'deleted'
  }
}

export type ConfirmPopup = {
  open: boolean,
  userId: string
}

/**
 * Action types
 */
export const OPEN_CONFIRM_DELETE_POPUP = 'employees/employees/OPEN_CONFIRM_DELETE_POPUP'
export const CLOSE_CONFIRM_DELETE_POPUP = 'employees/confirmDeletePopup/CLOSE_CONFIRM_DELETE_POPUP'
export const OPEN_CONFIRM_ADMIN_POPUP = 'employees/employees/OPEN_CONFIRM_ADMIN_POPUP'
export const CLOSE_CONFIRM_ADMIN_POPUP = 'employees/employees/CLOSE_CONFIRM_ADMIN_POPUP'
export const OPEN_CONFIRM_RM_ADMIN_POPUP = 'employees/employees/OPEN_CONFIRM_RM_ADMIN_POPUP'
export const CLOSE_CONFIRM_RM_ADMIN_POPUP = 'employees/employees/CLOSE_CONFIRM_RM_ADMIN_POPUP'
export const OPEN_EMPLOYEE_CARD = 'employees/employees/OPEN_EMPLOYEE_CARD'
export const CLOSE_EMPLOYEE_CARD = 'employees/employees/CLOSE_EMPLOYEE_CARD'
export const FETCH_EMPLOYEES = 'employees/employees/FETCH_EMPLOYEES'
export const INVITE_EMPLOYEES = 'employees/employees/INVITE_EMPLOYEES'
export const MAKE_ADMIN = 'employees/employees/MAKE_ADMIN'
export const UNMAKE_ADMIN = 'employees/employees/UNMAKE_ADMIN'

/**
 * Action creators
 */
export const openConfirmDeletePopup = createAction<void>(OPEN_CONFIRM_DELETE_POPUP)
export const closeConfirmDeletePopup = createAction<void>(CLOSE_CONFIRM_DELETE_POPUP)
export const openConfirmAdminPopup = createAction<void>(OPEN_CONFIRM_ADMIN_POPUP)
export const closeConfirmAdminPopup = createAction<void>(CLOSE_CONFIRM_ADMIN_POPUP)
export const openConfirmRmAdminPopup = createAction<void>(OPEN_CONFIRM_RM_ADMIN_POPUP)
export const closeConfirmRmAdminPopup = createAction<void>(CLOSE_CONFIRM_RM_ADMIN_POPUP)
export const openEmployeeCard = createAction<ActiveEmployee>(OPEN_EMPLOYEE_CARD)
export const closeEmployeeCard = createAction<void>(CLOSE_EMPLOYEE_CARD)
export const fetchEmployees = createAsyncAction<void, Employee[]>(FETCH_EMPLOYEES)
export const inviteEmployees = createAsyncAction<void, void>(INVITE_EMPLOYEES)
export const makeAdmin = createAsyncAction<void, void>(MAKE_ADMIN)
export const unmakeAdmin = createAsyncAction<void, void>(UNMAKE_ADMIN)

/**
 * Reducer
 */
const initialState: State = from<StateObj>({
  employees: {
    spinner: false,
    list: []
  },
  confirmDelete: {
    open: false,
    userId: ''
  },
  confirmAdmin: {
    open: false,
    userId: ''
  },
  confirmRmAdmin: {
    open: false,
    userId: ''
  },
  employeeCard: {
    open: false,
    employee: {
      id: '',
      contacts: {
        email: '',
        phone: ''
      },
      meta: {
        registered_at: '',
        status: ''
      },
      profile: {
        role: '',
        avatar: '',
        name: '',
        position: ''
      }
    }
  }
})

export default createReducer<State>({
  [OPEN_CONFIRM_DELETE_POPUP]: (state: State): State => (
    state.merge({ confirmDelete: { open: true } })
  ),

  [CLOSE_CONFIRM_DELETE_POPUP]: (state: State): State => (
    state.merge({ confirmDelete: { open: false } })
  ),

  [OPEN_CONFIRM_ADMIN_POPUP]: (state: State, { payload }: Action<string>): State => (
    state.merge({ confirmAdmin: { open: true, userId: payload } })
  ),

  [CLOSE_CONFIRM_ADMIN_POPUP]: (state: State): State => (
    state.merge({ confirmAdmin: { open: false, userId: '' } })
  ),

  [OPEN_CONFIRM_RM_ADMIN_POPUP]: (state: State, { payload }: Action<string>): State => (
    state.merge({ confirmRmAdmin: { open: true, userId: payload } })
  ),

  [CLOSE_CONFIRM_RM_ADMIN_POPUP]: (state: State): State => (
    state.merge({ confirmRmAdmin: { open: false, userId: '' } })
  ),

  [OPEN_EMPLOYEE_CARD]: (state: State, { payload }: Action<ActiveEmployee>): State => (
    state.merge({ employeeCard: { ...state.employeeCard, open: true, employee: payload } })
  ),

  [CLOSE_EMPLOYEE_CARD]: (state: State): State => (
    state.merge({ employeeCard: { ...state.employeeCard, open: false } })
  ),

  [inviteEmployees.REQUEST]: (state: State): State => (
    state.merge({ employees: { ...state.employees, spinner: true } })
  ),

  [inviteEmployees.SUCCESS]: (state: State): State => (
    state.merge({ employees: { ...state.employees, spinner: false } })
  ),

  [fetchEmployees.SUCCESS]: (state: State, { payload }: Action<Employee[]>): State => (
    state.merge({ employees: { ...state.employees, list: payload } })
  )
}, initialState)
