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
import ProfileCard from '../../../components/employees/ProfileCard'

import {
  openConfirmDeletePopup, closeConfirmDeletePopup,
  openConfirmAdminPopup, closeConfirmAdminPopup,
  openEmployeeCard, closeEmployeeCard
} from '../../../redux/modules/employees/employees'

import {
  activeEmployeesSelector,
  invitedEmployeesSelector,
  deletedEmployeesSelector
} from '../../../selectors/employees/employees'

import {
  ConfirmPopup as ConfirmPopupProps,
  EmployeeCard as EmployeeCardProps
} from '../../../redux/modules/employees/employees'

import { ActiveEmployeeProps } from '../../../components/employees/ActiveEmployee'
import { InvitedEmployeeProps } from '../../../components/employees/InvitedEmployee'
import { DeletedEmployeeProps } from '../../../components/employees/DeletedEmployee'


export type Props = DispatchProps & ComponentProps & StateProps

export type ComponentProps = {
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
  closeEmployeeCard: () => void
}


class Employees extends Component<Props, StateProps> {
  constructor(props) {
    super(props)

    this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
    this.onMakeAdmin = this.onMakeAdmin.bind(this)
    this.onOpenProfile = this.onOpenProfile.bind(this)
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
      activeEmployees,
      invitedEmployees,
      deletedEmployees,
      confirmDelete,
      confirmAdmin,
      employeeCard,
      closeConfirmDeletePopup,
      closeConfirmAdminPopup,
      closeEmployeeCard
    }: Props = this.props

    return (
      <div styleName="container">
        <InviteEmployeeForm
          textareaValid={true}
          spinner={false}
          inviteEmployee={() => { console.log('invite employees submit') }}/>

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
          id={employeeCard.id}
          companyName={employeeCard.companyName}
          companyLogo={employeeCard.companyLogo}
          avatar={employeeCard.avatar}
          fullName={employeeCard.fullName}
          position={employeeCard.position}/>

        <ProfileCard
          // modalId="profile-card"
          open={false}
          id="uuid4"
          companyName="CHVRCHES"
          companyLogo="https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png"
          avatar="http://imgur.com/QKHJ3Zs.png"
          fullName="Lauren"
          position="Singer"/>
      </div>
    )
  }
}

const StyledComponent = CSSModules(Employees, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  ({ employees: { employees }}) => ({
    ...employees,
    activeEmployees: activeEmployeesSelector(employees),
    invitedEmployees: invitedEmployeesSelector(employees),
    deletedEmployees: deletedEmployeesSelector(employees)
  }),
  {
    openConfirmDeletePopup, closeConfirmDeletePopup,
    openConfirmAdminPopup, closeConfirmAdminPopup,
    openEmployeeCard, closeEmployeeCard
  }
)(StyledComponent)
