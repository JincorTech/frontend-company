import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { RouterProps} from 'react-router';

export type Props = HTMLProps<HTMLSpanElement> & {
  pathname: string
};

const pages = {
  '/cmp/app/profile': 'Профиль компании',
  '/cmp/app/search': 'Поиск',
  '/cmp/app/employees': 'Моя компания',
  '/cmp/app/profile/edit': 'Профиль компании',
  '/cmp/app/messenger': 'Messenger',
  '/cmp/app/bookmarks': 'Избранное'
};

const PageName: SFC<Props> = ({ pathname, ...spanProps }) => (
  <span {...spanProps}>
    {pages[pathname]}
  </span>
);

export default PageName;
