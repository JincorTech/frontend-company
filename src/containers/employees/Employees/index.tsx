import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import InviteEmployeeForm from './components/InviteEmployeeForm'

import Scrollbar from '../../../components/common/Scrollbar'

import ActiveEmployee from '../../../components/employees/ActiveEmployee'
import InvitedEmployee from '../../../components/employees/InvitedEmployee'
import DeletedEmployee from '../../../components/employees/DeletedEmployee'

import ConfirmPopup from '../../../components/common/ConfirmPopup'

import EmployeeCard from '../../../components/employees/EmployeeCard'
import ProfileCard from '../../../components/employees/ProfileCard'


// mock data
const activeUsers = [
  {
    id: '1932810923',
    type: 'active',
    admin: false,
    avatar: 'https://qph.ec.quoracdn.net/main-thumb-44455-50-ttxrsyoonynxuzdvgazckmlibwadpjzb.jpeg',
    email: 'tj@apex.sh',
    fullName: 'TJ Holowaychuk',
    position: 'Founder of Apex'
  },
  {
    id: '128390054',
    type: 'active',
    admin: true,
    avatar: 'https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/032/small/9VsY9i09.jpeg?1444932586',
    email: 'dan.abramov@me.com',
    fullName: 'Dan Abramov',
    position: 'Co-authored Redux'
  },
  {
    id: '12039402940294',
    type: 'active',
    admin: false,
    avatar: 'https://pp.vk.me/c626724/v626724146/49305/0wJ4Sz7tkRY.jpg',
    email: 'andrey@sitnik.ru',
    fullName: 'Andrey Sitnik',
    position: 'PostCSS author'
  }
]

const invitedUsers = [
  {
    id: '94849893849843',
    type: 'invited',
    email: 'johnlennon@beatles.co.uk',
    invitedAt: '28.03.17'
  },
  {
    id: '129390904949493',
    type: 'invited',
    email: 'paulmccartney@beatles.co.uk',
    invitedAt: '28.03.17'
  },
  {
    id: '123390404090293',
    type: 'invited',
    email: 'georgeharrison@beatles.co.uk',
    invitedAt: '27.03.17'
  },
  {
    id: '02030309494904',
    type: 'invited',
    email: 'ringostarr@beatles.co.uk',
    invitedAt: '26.03.17'
  }
]

const deletedUsers = [
  {
    id: '192993904957',
    type: 'deleted',
    avatar: 'http://pn.ispirt.in/wp-content/uploads/userphoto/157.jpg',
    email: 'man@example.com',
    fullName: 'John Doe',
    position: 'ex Office Manager',
    deletedAt: '26.03.17'
  },
  {
    id: '192934342337',
    type: 'deleted',
    avatar: 'http://carlook.net/data/users_photos/0/922/cl-user-922_th.jpeg?2055',
    email: 'man2@example.com',
    fullName: 'Jane Doe',
    position: 'ex jQuery Developer',
    deletedAt: '28.03.17'
  }
]
// /mock data

const Employees: SFC<{}> = () => (
  <div styleName="container">
    <InviteEmployeeForm textareaValid={true} spinner={false} inviteEmployee={() => { console.log('invite employees submit') }}/>

    <Scrollbar height="calc(100vh - 227px)">
      {activeUsers.length > 0 &&
        <div styleName="list">
          {activeUsers.map((item, i) =>
            (<ActiveEmployee key={`active-employee-${i}`} {...item}/>))}
        </div>
      }

      {invitedUsers.length > 0 &&
        <div styleName="list">
          {invitedUsers.map((item, i) =>
            (<InvitedEmployee key={`invited-employee-${i}`} {...item}/>))}
        </div>
      }

      {deletedUsers.length > 0 &&
        <div styleName="list">
          {deletedUsers.map((item, i) =>
            (<DeletedEmployee key={`deleted-employee-${i}`} {...item}/>))}
        </div>
      }
    </Scrollbar>

    <ConfirmPopup
      modalId="remove-employess"
      open={false}
      title="Вы уверены, что хотите удалить этого сотрудника?"/>

    <ConfirmPopup
      modalId="make-admin"
      open={false}
      title="Вы уверены, что хотите назначить этого сотрудника администратором?"/>

    <EmployeeCard
      open={false}
      id="11f43465-d042-4db0-8aa9-13bac482bb59"
      companyName="Google"
      companyLogo="https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png"
      avatar="http://i.imgur.com/kJUdCE6.png"
      fullName="Walter White"
      position="Senior Angular Developer"/>

    <ProfileCard
      open={false}
      id="uuid4"
      companyName="CHVRCHES"
      companyLogo="https://pbs.twimg.com/profile_images/2227292956/twitter_logo_normal.png"
      avatar="http://imgur.com/QKHJ3Zs.png"
      fullName="Lauren"
      position="Singer"/>
  </div>
)

export default CSSModules(Employees, require('./styles.css'))
