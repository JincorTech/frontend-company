import { createReducer, createAction, Action, createAsyncAction } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  preloader: boolean
  self: Self
  active: ActiveEmployee[]
  invited: InvitedEmployee[]
  deleted: DeletedEmployee[]
  spinner: boolean
  confirmDelete: ConfirmPopup
  confirmAdmin: ConfirmPopup
  confirmRmAdmin: ConfirmPopup
  employeeCard: EmployeeCard
};

export type Self = {
  id: string
  contacts: {
    email: string
    phone?: string
  }
  meta: {
    registeredAt: string
    status: 'active' | ''
  }
  profile: {
    avatar?: string
    role: string
    name: string
    firstName: string
    lastName: string
    position: string
  }
};

export type ActiveEmployee = {
  id: string
  contacts: {
    email: string
    phone?: string
  }
  meta: {
    registeredAt: string
    status: 'active' | ''
  }
  profile: {
    avatar?: string
    role: string
    name: string
    firstName: string
    lastName: string
    position: string
  }
};

export type InvitedEmployee = {
  id: string
  contacts: {
    email: string
  }
  meta: {
    invitedAt: string
    status: 'invited'
  }
};

export type DeletedEmployee = {
  id: string
  profile: {
    name: string
    firstName: string
    lastName: string
    position: string
    role: string
    avatar?: string
  }
  contacts: {
    email: string
  }
  meta: {
    deletedAt: string
    status: 'deleted'
  }
};

export type EmployeesResponse = {
  self: Self
  active: ActiveEmployee[]
  invited: InvitedEmployee[]
  deleted: DeletedEmployee[]
};

export type ConfirmPopup = {
  open: boolean
  userId: string
};

export type EmployeeCard = {
  open: boolean
  employee: ActiveEmployee
};

/**
 * Action types
 */
export const OPEN_CONFIRM_DELETE_POPUP = 'employees/employees/OPEN_CONFIRM_DELETE_POPUP';
export const CLOSE_CONFIRM_DELETE_POPUP = 'employees/confirmDeletePopup/CLOSE_CONFIRM_DELETE_POPUP';
export const OPEN_CONFIRM_ADMIN_POPUP = 'employees/employees/OPEN_CONFIRM_ADMIN_POPUP';
export const CLOSE_CONFIRM_ADMIN_POPUP = 'employees/employees/CLOSE_CONFIRM_ADMIN_POPUP';
export const OPEN_CONFIRM_RM_ADMIN_POPUP = 'employees/employees/OPEN_CONFIRM_RM_ADMIN_POPUP';
export const CLOSE_CONFIRM_RM_ADMIN_POPUP = 'employees/employees/CLOSE_CONFIRM_RM_ADMIN_POPUP';
export const OPEN_EMPLOYEE_CARD = 'employees/employees/OPEN_EMPLOYEE_CARD';
export const CLOSE_EMPLOYEE_CARD = 'employees/employees/CLOSE_EMPLOYEE_CARD';
export const FETCH_EMPLOYEES = 'employees/employees/FETCH_EMPLOYEES';
export const INVITE_EMPLOYEES = 'employees/employees/INVITE_EMPLOYEES';
export const MAKE_ADMIN = 'employees/employees/MAKE_ADMIN';
export const UNMAKE_ADMIN = 'employees/employees/UNMAKE_ADMIN';
export const DELETE_EMPLOYEE = 'employees/employees/DELETE_EMPLOYEE';
export const RESET_STATE = 'employess/employees/RESET_EMPLOYEES_STATE';

/**
 * Action creators
 */
export const openConfirmDeletePopup = createAction<void>(OPEN_CONFIRM_DELETE_POPUP);
export const closeConfirmDeletePopup = createAction<void>(CLOSE_CONFIRM_DELETE_POPUP);
export const openConfirmAdminPopup = createAction<void>(OPEN_CONFIRM_ADMIN_POPUP);
export const closeConfirmAdminPopup = createAction<void>(CLOSE_CONFIRM_ADMIN_POPUP);
export const openConfirmRmAdminPopup = createAction<void>(OPEN_CONFIRM_RM_ADMIN_POPUP);
export const closeConfirmRmAdminPopup = createAction<void>(CLOSE_CONFIRM_RM_ADMIN_POPUP);
export const openEmployeeCard = createAction<ActiveEmployee>(OPEN_EMPLOYEE_CARD);
export const closeEmployeeCard = createAction<void>(CLOSE_EMPLOYEE_CARD);
export const fetchEmployees = createAsyncAction<void, EmployeesResponse[]>(FETCH_EMPLOYEES);
export const inviteEmployees = createAsyncAction<void, void>(INVITE_EMPLOYEES);
export const makeAdmin = createAsyncAction<void, void>(MAKE_ADMIN);
export const unmakeAdmin = createAsyncAction<void, void>(UNMAKE_ADMIN);
export const deleteEmployee = createAsyncAction<void, void>(DELETE_EMPLOYEE);
export const resetState = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState: State = from<StateObj>({
  preloader: true,
  self: {
    id: '',
    contacts: {
      email: ''
    },
    meta: {
      registeredAt: '',
      status: ''
    },
    profile: {
      avatar: '',
      role: '',
      name: '',
      firstName: '',
      lastName: '',
      position: ''
    }
  },
  active: [],
  invited: [],
  deleted: [],
  spinner: false,
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
        registeredAt: '',
        status: ''
      },
      profile: {
        role: '',
        avatar: '',
        name: '',
        firstName: '',
        lastName: '',
        position: ''
      }
    }
  }
});

export default createReducer<State>({
  [OPEN_CONFIRM_DELETE_POPUP]: (state: State, { payload }: Action<string>): State => (
    state.merge({ confirmDelete: { open: true, userId: payload } })
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
    state.merge({ spinner: true })
  ),

  [inviteEmployees.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  ),

  [fetchEmployees.SUCCESS]: (state: State, { payload }: Action<EmployeesResponse[]>): State => (
    state.merge({ preloader: false, ...payload })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge(initialState)
  )
}, initialState);
