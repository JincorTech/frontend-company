import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { ActionCreator } from '../../../utils/actions'

import CompanyItem from './components/CompanyItem'


export type Company = {
  id: string
  legalName: string
  country: string
  formattedAddress: string
  type: string
}

export type Props = {
  companies: Company[],
  onSelect: (companyId: string) => void
}


const CompanyList: SFC<Props> = ({ companies, onSelect }) => {
  return (
    <div styleName="company-list-wrap">
      <h1 styleName="company-list-title">Выберите компанию</h1>

      <div styleName="company-list">
        {
          companies.map(({legalName, type, country, id}, i) => (
            <CompanyItem
              key={i}
              name={legalName}
              country={country}
              type={type}
              onClick={() => onSelect(id)}/>
          ))
        }
      </div>
    </div>
  )
}

export default CSSModules(CompanyList, require('./styles.css'))