import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type TextProps = HTMLProps<HTMLDivElement> & {
  value: string
  collapsed?: boolean
  onCollapse: (collapsed: boolean) => void
}

const Text: SFC<TextProps> = (props) => {
  const { collapsed, value, onCollapse, ...divProps } = props
  const shouldCollapse = value.length > 200

  const cutText = (text: string): string => {
    return shouldCollapse ? `${text.substr(0, 200)}... ` : text
  }

  const handleCollapse = (): void => {
    onCollapse(!collapsed)
  }

  return (
    <div styleName="text" {...divProps}>
      {collapsed ? cutText(value) : value}
      {
        shouldCollapse &&
        <span
          styleName="text-collapse"
          onClick={handleCollapse}>
          {collapsed ? 'развернуть' : 'cвернуть'}
        </span>
      }
    </div>
  )
}

export default CSSModules(Text, require('./styles.css'))