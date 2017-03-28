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

export type CompanyListProps = {
  companies: Company[],
  onSelect: ActionCreator<string>
}


const CompanyList: SFC<CompanyListProps> = ({ companies, onSelect }) => {
  return (
    <div styleName="list-wrap">
      <h1 styleName="list-title">Выберите компанию</h1>

      <div styleName="list">
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