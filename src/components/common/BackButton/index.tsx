import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { routes } from '../../../routes'
import { Link } from 'react-router'


const BackButton: SFC<{}> = () => (
  <Link styleName="back-button" to={routes.profile}/>
)

export default CSSModules(BackButton, require('./styles.css'))
