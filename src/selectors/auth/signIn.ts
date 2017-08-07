import { createSelector } from 'reselect';
import { State, Company } from '../../redux/modules/auth/signIn';
import { Company as CompanyProps } from '../../components/auth/CompanyList';

/**
 * Country selector
 */
export const companiesSelector = (state: State): Company[] => state.asMutable().companies;

/**
 * Company trasformer
 */
export const companyTransformer = (companyProps: Company): CompanyProps => {
  const {
    id,
    legalName,
    companyType: { name: type },
    profile: { address, picture: src }
  } = companyProps;
  const { formattedAddress, country: { name: country }} = address;

  return { id, legalName, type, formattedAddress, country, src };
};

/**
 * Comapny selector
 */
export const companySelector = createSelector<State, CompanyProps[], Company[]>(
  companiesSelector,
  (countries) => countries.map(companyTransformer)
);
