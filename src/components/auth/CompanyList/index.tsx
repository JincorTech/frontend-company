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
  t: any
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

export default translate('auth')(CSSModules(CompanyList, require('./styles.css')));
