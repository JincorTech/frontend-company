import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { getBackgroundColor } from '../../../utils/colorFunction'

import DialogItem from '../DialogItem'
const { empty } = require('./styles.css')

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  src?: string
  id: string
  name: string
  preview: string
}

/**
 * Component
 */
const InquiryDialog: SFC<Props> = (props) => {
  const { src, id, ...inquiryProps } = props
  const avatar = src
    ? <img src={src}/>
    : <div className={empty} style={getBackgroundColor(id)}/>

  return <DialogItem avatar={avatar} {...props}/>
}

export default InquiryDialog