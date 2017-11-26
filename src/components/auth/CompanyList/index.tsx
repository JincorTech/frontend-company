import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import CompanyItem from '../CompanyItem';

export type Company = {
  id: string
  legalName: string
  country: string
  formattedAddress: string
  type: string
  src: string
};

export type Props = {
  companies: Company[],
  onSelect: (companyId: string) => void,
  t: Function
};

const CompanyList: SFC<Props> = ({ t, companies, onSelect }) => {
  return (
    <div styleName="company-list-wrap">
      <h1 styleName="company-list-title">{t('chooseCompany')}</h1>

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
  );
};

const StyledComponent = CSSModules(CompanyList, require('./styles.css'));
const TranslatedComponent = translate('auth')(StyledComponent);

export default TranslatedComponent;
