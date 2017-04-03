import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Spinner from '../Spinner'


type ButtonProps = HTMLProps<HTMLButtonElement> & {
  spinner?: boolean
}

const Button: SFC<ButtonProps> = (props) => {
  const {spinner, disabled, children, ...btnProps} = props

  return (
    <button
      styleName={spinner ? 'loaded' : 'default'}
      disabled={spinner || disabled}
      {...btnProps}>
      {spinner ? <Spinner /> : children}
    </button>
  )
}

export default CSSModules(Button, require('./styles.css'))
