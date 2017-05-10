import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { RouterProps} from 'react-router'

export type Props = HTMLProps<HTMLSpanElement> & {
  pathname: string
}

const pages = {
  '/app/profile': 'Профиль компании',
  '/app/search': 'Поиск',
  '/app/employees': 'Моя компания',
  '/app/profile/edit': 'Профиль компании',
  '/app/messenger': 'Messenger',
  '/app/bookmarks': 'Избранное'
}

const PageName: SFC<Props> = ({ pathname, ...spanProps }) => (
  <span {...spanProps}>
    {pages[pathname]}
  </span>
)

export default PageName