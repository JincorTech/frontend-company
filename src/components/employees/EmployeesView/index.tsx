import * as React from 'react';
import { Component, MouseEvent } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import { Props } from '../../../containers/employees/Employees';
import { ActiveEmployee as ActiveEmployeeProps } from '../../../redux/modules/employees/employees';

import InviteEmployee from '../../../components/employees/InviteEmployee';
import Scrollbar from '../../../components/common/Scrollbar';
import Self from '../../../components/employees/Self';
import ActiveEmployee from '../../../components/employees/ActiveEmployee';
import InvitedEmployee from '../../../components/employees/InvitedEmployee';
import DeletedEmployee from '../../../components/employees/DeletedEmployee';
import ConfirmPopup from '../../../components/common/ConfirmPopup';
import EmployeeCard from '../../../components/employees/EmployeeCard';
import BackButton from '../../../components/common/BackButton';

class EmployeesView extends Component<Props, {}> {
  constructor(props) {
    super(props);

    this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
    this.onMakeAdmin = this.onMakeAdmin.bind(this);
    this.onUnmakeAdmin = this.onUnmakeAdmin.bind(this);
    this.onOpenProfile = this.onOpenProfile.bind(this);
  }

  private onDeleteEmployee(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmDeletePopup(id);
    e.stopPropagation();
  }

  private onMakeAdmin(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmAdminPopup(id);
    e.stopPropagation();
  }

  private onUnmakeAdmin(e: MouseEvent<HTMLButtonElement>, id: string): void {
    this.props.openConfirmRmAdminPopup(id);
    e.stopPropagation();
  }

  private onOpenProfile(employee: ActiveEmployeeProps): void {
    this.props.openEmployeeCard(employee);
  }

  public render(): JSX.Element {
    const {
      auth,
      self,
      active,
      invited,
      deleted,
      spinner,
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
      deleteEmployee,
      openProfileCard
    } = this.props;

    return (
      <div styleName="container">
        <div styleName="back">
          <BackButton/>
        </div>

        {auth.admin && <InviteEmployee spinner={spinner}/>}

        <Scrollbar height="calc(100vh - 227px)">
          <div styleName="list">
            <Self
              onOpenProfile={openProfileCard}
              employee={self}/>

            {active.map(employee => (
              <ActiveEmployee
                key={`active-employee-${employee.id}`}
                onDelete={this.onDeleteEmployee}
                onMakeAdmin={this.onMakeAdmin}
                onUnmakeAdmin={this.onUnmakeAdmin}
                onOpenProfile={this.onOpenProfile}
                auth={auth}
                employee={employee}/>))}
          </div>

          {invited.length > 0 &&
            <div styleName="list">
              {invited.map(employee => (
                <InvitedEmployee
                  key={`invited-employee-${employee.id}`}
                  employee={employee}/>))}
            </div>
          }

          {deleted.length > 0 &&
            <div styleName="list">
              {deleted.map(employee => (
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
    );
  }
}

export default CSSModules(EmployeesView, require('./styles.css'));
