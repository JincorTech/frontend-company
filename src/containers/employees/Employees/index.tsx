import * as React from 'react'
import { Component, MouseEvent } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import InviteEmployeeForm from './components/InviteEmployeeForm'
import Scrollbar from '../../../components/common/Scrollbar'
import ActiveEmployee from '../../../components/employees/ActiveEmployee'
import InvitedEmployee from '../../../components/employees/InvitedEmployee'
import DeletedEmployee from '../../../components/employees/DeletedEmployee'
import ConfirmPopup from '../../../components/common/ConfirmPopup'
import EmployeeCard from '../../../components/employees/EmployeeCard'

import {
  openConfirmDeletePopup, closeConfirmDeletePopup,
  openConfirmAdminPopup, closeConfirmAdminPopup,
  openConfirmRmAdminPopup, closeConfirmRmAdminPopup,
  openEmployeeCard, closeEmployeeCard,
  fetchEmployees, makeAdmin, unmakeAdmin, deleteEmployee
} from '../../../redux/modules/employees/employees'

import {
  activeEmployeesSelector,
  invitedEmployeesSelector,
  deletedEmployeesSelector
} from '../../../selectors/employees/employees'

import { ConfirmPopup as ConfirmPopupProps } from '../../../redux/modules/employees/employees'
import { Props as EmployeeCardProps } from '../../../components/employees/EmployeeCard'
import {
  ActiveEmployee as ActiveEmployeeProps,
  InvitedEmployee as InvitedEmployeeProps,
  DeletedEmployee as DeletedEmployeeProps
} from '../../../redux/modules/employees/employees'
import { UserCompany as UserCompanyProps } from '../../../redux/modules/app/app'


export type Props = DispatchProps & ComponentProps & StateProps

export type ComponentProps = {
  employees: {
    spinner: boolean
  },
  company: UserCompanyProps,
  activeEmployees: ActiveEmployeeProps[],
  invitedEmployees: InvitedEmployeeProps[],
  deletedEmployees: DeletedEmployeeProps[],
  confirmDelete: ConfirmPopupProps,
  confirmAdmin: ConfirmPopupProps,
  confirmRmAdmin: ConfirmPopupProps,
  employeeCard: EmployeeCardProps
}

export type StateProps = {}

export type DispatchProps = {
  openConfirmDeletePopup: (id: string) => void,
  closeConfirmDeletePopup: () => void,
  openConfirmAdminPopup: (id: string) => void,
  closeConfirmAdminPopup: () => void,
  openConfirmRmAdminPopup: (id: string) => void,
  closeConfirmRmAdminPopup: () => void,
  openEmployeeCard: (employee: ActiveEmployeeProps) => void,
  closeEmployeeCard: () => void,
  fetchEmployees: () => void,
  inviteEmployees: () => void,
  makeAdmin: () => void,
  unmakeAdmin: () => void,
  deleteEmployee: () => void
}


class Employees extends Component<Props, StateProps> {
  constructor(props) {
    super(props)

    this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
    this.onMakeAdmin = this.onMakeAdmin.bind(this)
    this.onUnmakeAdmin = this.onUnmakeAdmin.bind(this)
    this.onOpenProfile = this.onOpenProfile.bind(this)
  }

  public componentDidMount(): void {
    this.props.fetchEmployees()
  }

  private onDeleteEmployee(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmDeletePopup(id)
    e.stopPropagation()
  }

  private onMakeAdmin(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmAdminPopup(id)
    e.stopPropagation()
  }

  private onUnmakeAdmin(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmRmAdminPopup(id)
    e.stopPropagation()
  }

  private onOpenProfile(employee: ActiveEmployeeProps): void {
    this.props.openEmployeeCard(employee)
  }

  public render(): JSX.Element {
    const {
      employees,
      activeEmployees,
      invitedEmployees,
      deletedEmployees,
      company,
      confirmDelete,
      confirmAdmin,
      confirmRmAdmin,
      employeeCard,
      closeConfirmDeletePopup,
      closeConfirmAdminPopup,
      closeConfirmRmAdminPopup,
      closeEmployeeCard,
      makeAdmin,
      unmakeAdmin,
      deleteEmployee
    } = this.props

    return (
      <div styleName="container">
        <InviteEmployeeForm spinner={employees.spinner}/>

        <Scrollbar height="calc(100vh - 227px)">
          {activeEmployees.length > 0 &&
            <div styleName="list">
              {activeEmployees.map(employee => (
                <ActiveEmployee
                  key={`active-employee-${employee.id}`}
                  onDelete={this.onDeleteEmployee}
                  onMakeAdmin={this.onMakeAdmin}
                  onUnmakeAdmin={this.onUnmakeAdmin}
                  onOpenProfile={this.onOpenProfile}
                  employee={employee}/>))}
            </div>
          }

          {invitedEmployees.length > 0 &&
            <div styleName="list">
              {invitedEmployees.map(employee => (
                <InvitedEmployee
                  key={`invited-employee-${employee.id}`}
                  employee={employee}/>))}
            </div>
          }

          {deletedEmployees.length > 0 &&
            <div styleName="list">
              {deletedEmployees.map(employee => (
                <DeletedEmployee
                  key={`deleted-employee-${employee.id}`}
                  employee={employee}/>))}
            </div>
          }
        </Scrollbar>

        <ConfirmPopup
          modalId="remove-employee"
          userId={confirmDelete.userId}
          open={confirmDelete.open}
          onClose={closeConfirmDeletePopup}
          onConfirm={deleteEmployee}
          title="Вы уверены, что хотите удалить этого сотрудника?"/>

        <ConfirmPopup
          modalId="make-admin"
          userId={confirmAdmin.userId}
          open={confirmAdmin.open}
          onClose={closeConfirmAdminPopup}
          onConfirm={makeAdmin}
          title="Вы уверены, что хотите назначить этого сотрудника администратором?"/>

        <ConfirmPopup
          modalId="unmake-admin"
          userId={confirmRmAdmin.userId}
          open={confirmRmAdmin.open}
          onClose={closeConfirmRmAdminPopup}
          onConfirm={unmakeAdmin}
          title="Вы уверены, что хотите лишить данного пользователя прав администратора?"/>

        <EmployeeCard
          modalId="employee-card"
          open={employeeCard.open}
          onClose={closeEmployeeCard}
          company={company}
          employee={employeeCard.employee}/>
      </div>
    )
  }
}

const StyledComponent = CSSModules(Employees, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  state => ({
    ...state.employees.employees,
    company: state.common.app.user.company,
    activeEmployees: activeEmployeesSelector(state.employees.employees),
    invitedEmployees: invitedEmployeesSelector(state.employees.employees),
    deletedEmployees: deletedEmployeesSelector(state.employees.employees)
  }),
  {
    openConfirmDeletePopup, closeConfirmDeletePopup,
    openConfirmAdminPopup, closeConfirmAdminPopup,
    openConfirmRmAdminPopup, closeConfirmRmAdminPopup,
    openEmployeeCard, closeEmployeeCard,
    fetchEmployees, makeAdmin, unmakeAdmin, deleteEmployee
  }
)(StyledComponent)
