import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = HTMLProps<HTMLDivElement> & {
  value: string
}

export type State = {
  expand: boolean
}

const TEXT_MAX_LENGTH = 250

class Text extends Component<Props, State> {
  public state: State = {
    expand: false
  }

  constructor(props) {
    super(props)

    this.handleExpand = this.handleExpand.bind(this)
    this.renderCollapsed = this.renderCollapsed.bind(this)
    this.renderExpand = this.renderExpand.bind(this)
  }

  private handleExpand(): void {
    const { expand } = this.state

    this.setState({ expand: !expand })
  }

  private renderExpand(): JSX.Element {
    const { value, ...props } = this.props

    return (
      <div styleName="text" {...props}>
        {value}
        {value.length > TEXT_MAX_LENGTH && <span
          styleName="expand"
          children="Свернуть"
          onClick={this.handleExpand}/>
        }
      </div>
    )
  }

  private renderCollapsed(): JSX.Element {
    const { value, ...props } = this.props
    const shouldCut = value.length > TEXT_MAX_LENGTH

    return (
      <div styleName="text" {...props}>
        {shouldCut ? value.substr(0, TEXT_MAX_LENGTH) + '... ' : value}
        {shouldCut && <span
          styleName="expand"
          children="Развернуть"
          onClick={this.handleExpand}/>
        }
      </div>
    )
  }

  public render(): JSX.Element {
    const { expand } = this.state

    return expand
      ? this.renderExpand()
      : this.renderCollapsed()
  }
}

export default CSSModules(Text, require('./styles.css'))