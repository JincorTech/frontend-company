import { createSelector } from 'reselect'
import { State, Country, CompanyType } from '../../redux/modules/auth/createCompany'
import { Option } from '../../containers/auth/CreateCompanyForm'


/**
* Country selector
*/
const countriesSelector = (state: State): Country[] => state.countries

export const countryOptionSelector = createSelector<State, Option[], Country[]>(
  countriesSelector,
  (countries) => countries.map(({name, id: value}) => ({name, value}))
)

/**
* Company type selector
*/
const companyTypeSelector = (state: State): CompanyType[] => state.companyTypes

export const companyTypeOptionSelector = createSelector<State, Option[], CompanyType[]>(
  companyTypeSelector,
  (companyTypes) => companyTypes.map(({name, id: value}) => ({name, value}))
)
