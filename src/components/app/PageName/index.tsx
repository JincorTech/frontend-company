import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { translate } from 'react-i18next';

export type Props = HTMLProps<HTMLSpanElement> & {
  pathname: string,
  t: Function,
  i18nLoadedAt?: any,
  i18n?: any
};

const pages = {
  '/cmp/app/profile': 'companyProfile',
  '/cmp/app/search': 'search',
  '/cmp/app/employees': 'myCompany',
  '/cmp/app/profile/edit': 'companyProfile',
  '/cmp/app/messenger': 'messanger',
  '/cmp/app/bookmarks': 'favorites'
};

const PageName: SFC<Props> = ({ t, pathname, i18nLoadedAt, i18n, ...spanProps }) => (
  <span {...spanProps}>
    {t(pages[pathname])}
  </span>
);

export default translate('app')(PageName);
