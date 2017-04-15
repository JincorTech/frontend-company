import * as React from 'react'
import { Component } from 'react'
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
  openEmployeeCard, closeEmployeeCard,
  fetchEmployees
} from '../../../redux/modules/employees/employees'

import {
  activeEmployeesSelector,
  invitedEmployeesSelector,
  deletedEmployeesSelector
} from '../../../selectors/employees/employees'

import { ConfirmPopup as ConfirmPopupProps } from '../../../redux/modules/employees/employees'
import { Props as EmployeeCardProps } from '../../../components/employees/EmployeeCard'
import { ActiveEmployee as ActiveEmployeeProps } from '../../../redux/modules/employees/employees'
import { InvitedEmployee as InvitedEmployeeProps } from '../../../redux/modules/employees/employees'
import { DeletedEmployeeProps } from '../../../components/employees/DeletedEmployee'
import { UserCompany as UserCompanyProps } from '../../../redux/modules/common/app'


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
  employeeCard: EmployeeCardProps
}

export type StateProps = {}

export type DispatchProps = {
  openConfirmDeletePopup: () => void,
  closeConfirmDeletePopup: () => void,
  openConfirmAdminPopup: () => void,
  closeConfirmAdminPopup: () => void,
  openEmployeeCard: (employee) => void,
  closeEmployeeCard: () => void,
  fetchEmployees: () => void,
  inviteEmployees: () => void
}


class Employees extends Component<Props, StateProps> {
  constructor(props) {
    super(props)

    this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
    this.onMakeAdmin = this.onMakeAdmin.bind(this)
    this.onOpenProfile = this.onOpenProfile.bind(this)
  }

  public componentDidMount(): void {
    this.props.fetchEmployees()
  }

  private onDeleteEmployee(e): void {
    this.props.openConfirmDeletePopup()
    e.stopPropagation()
  }

  private onMakeAdmin(e): void {
    this.props.openConfirmAdminPopup()
    e.stopPropagation()
  }

  private onOpenProfile(employee): void {
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
      employeeCard,
      closeConfirmDeletePopup,
      closeConfirmAdminPopup,
      closeEmployeeCard
    }: Props = this.props

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
                  onOpenProfile={this.onOpenProfile}
                  employee={employee}/>))}
            </div>
          }

          {invitedEmployees.length > 0 &&
            <div styleName="list">
              {invitedEmployees.map((employee, i) => (
                <InvitedEmployee
                  key={`invited-employee-${i}`}
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
          open={confirmDelete.open}
          onClose={closeConfirmDeletePopup}
          title="Вы уверены, что хотите удалить этого сотрудника?"/>

        <ConfirmPopup
          modalId="make-admin"
          open={confirmAdmin.open}
          onClose={closeConfirmAdminPopup}
          title="Вы уверены, что хотите назначить этого сотрудника администратором?"/>

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
    openEmployeeCard, closeEmployeeCard,
    fetchEmployees
  }
)(StyledComponent)
