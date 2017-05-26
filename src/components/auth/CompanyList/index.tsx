import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { ActionCreator } from '../../../utils/actions'

import CompanyItem from '../CompanyItem'


export type Company = {
  id: string
  legalName: string
  country: string
  formattedAddress: string
  type: string
  src: string
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
          companies.map((company) => (
            <CompanyItem
              key={company.id}
              company={company}
              onClick={() => onSelect(company.id)}/>
          ))
        }
      </div>
    </div>
  )
}

export default CSSModules(CompanyList, require('./styles.css'))
