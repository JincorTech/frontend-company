import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'

import Dialogs from '../Dialogs'
import Messeges from '../Messeges'

export type State = {
  height: number
}

class Messenger extends Component<{}, State> {
  public state = {
    height: 0
  }

  constructor(props) {
    super(props)

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  public componentWillMount(): void {
    this.updateDimensions()
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions)
  }

  private updateDimensions(): void {
    this.setState({
      height: window.innerHeight - 65 // Header height
    })
  }

  public render(): JSX.Element {
    const { height } = this.state

    return (
      <div styleName="messenger">
        <Dialogs
          search
          height={height}
          styleName="dialogs-block"/>

        <Messeges
          search={false}
          height={height}
          name="Александр Пушкин"
          company="Альфа-Банк"
          styleName="messeges-block"/>
      </div>
    )
  }
}

export default CSSModules(Messenger, require('./styles.css'))