import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import * as CSSModules from 'react-css-modules';

import {
  openConfirmDeletePopup,
  closeConfirmDeletePopup,
  openConfirmAdminPopup,
  closeConfirmAdminPopup,
  openConfirmRmAdminPopup,
  closeConfirmRmAdminPopup,
  openEmployeeCard,
  closeEmployeeCard,
  fetchEmployees,
  resetState,
  makeAdmin,
  unmakeAdmin,
  deleteEmployee
} from '../../../redux/modules/employees/employees';
import { openProfileCard } from '../../../redux/modules/app/profileCard';

import { ConfirmPopup as ConfirmPopupProps } from '../../../redux/modules/employees/employees';
import { Props as EmployeeCardProps } from '../../../components/employees/EmployeeCard';
import {
  Self as SelfProps,
  ActiveEmployee as ActiveEmployeeProps,
  InvitedEmployee as InvitedEmployeeProps,
  DeletedEmployee as DeletedEmployeeProps
} from '../../../redux/modules/employees/employees';
import { UserCompany as UserCompanyProps } from '../../../redux/modules/app/appLayout';
import { StateMap as AuthProps } from '../../../redux/modules/app/app';

import { activeSortSelector } from '../../../selectors/employees/employees';

import EmployeesView from '../../../components/employees/EmployeesView';
import EmployeesPreloader from '../../../components/employees/EmployeesPreloader';

/**
 * Types
 */

export type Props = DispatchProps & StateProps;

export type StateProps = {
  preloader: boolean
  spinner: boolean
  self: SelfProps
  active: ActiveEmployeeProps[]
  invited: InvitedEmployeeProps[]
  deleted: DeletedEmployeeProps[]
  confirmDelete: ConfirmPopupProps
  confirmAdmin: ConfirmPopupProps
  confirmRmAdmin: ConfirmPopupProps
  employeeCard: EmployeeCardProps
  company: UserCompanyProps
  auth: AuthProps
};

export type DispatchProps = {
  openConfirmDeletePopup: (id: string) => void
  closeConfirmDeletePopup: () => void
  openConfirmAdminPopup: (id: string) => void
  closeConfirmAdminPopup: () => void
  openConfirmRmAdminPopup: (id: string) => void
  closeConfirmRmAdminPopup: () => void
  openEmployeeCard: (employee: ActiveEmployeeProps) => void
  closeEmployeeCard: () => void
  fetchEmployees: () => void
  openProfileCard: () => void
  resetEmployees: () => void
  inviteEmployees: () => void
  makeAdmin: () => void
  unmakeAdmin: () => void
  deleteEmployee: () => void
  resetState: () => void
};

/**
 * Component
 */

class Employees extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchEmployees();
  }

  public componentWillUnmount(): void {
    this.props.resetState();
  }

  public render(): JSX.Element {
    const { preloader } = this.props;

    return preloader
      ? <EmployeesPreloader/>
      : <EmployeesView {...this.props}/>;
  }
}

/**
 * Export
 */

const StyledComponent = CSSModules(Employees, require('./styles.css'));

export default connect<StateProps, DispatchProps, {}>(
  (state) => ({
    ...state.employees.employees,
    auth: state.app.app,
    company: state.app.appLayout.user.company,
    active: activeSortSelector(state.employees.employees)
  }),
  {
    openConfirmDeletePopup,
    closeConfirmDeletePopup,
    openConfirmAdminPopup,
    closeConfirmAdminPopup,
    openConfirmRmAdminPopup,
    closeConfirmRmAdminPopup,
    openProfileCard,
    openEmployeeCard,
    closeEmployeeCard,
    fetchEmployees,
    makeAdmin,
    unmakeAdmin,
    deleteEmployee,
    resetState
  }
)(StyledComponent);
