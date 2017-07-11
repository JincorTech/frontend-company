import * as React from 'react'
import { Component, ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import * as CSSModules from 'react-css-modules'
import { Scrollbars } from 'react-custom-scrollbars'

import EmailItem from './components/EmailItem'


export type TextAreaProps = {
  value?: string
  placeholder?: string
  emails: string[]
  onChange: (newEmails: string[]) => void
}

export type TextAreaState = {
  value: string,
  inputWidth: number
}

class EmailTextarea extends Component<TextAreaProps, TextAreaState> {
  private email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  private validEmails = /^(\s*[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\s(\s*[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/

  private EMAIL_ITEM_PEDDING_RIGTH: number = 8
  private input: HTMLDivElement
  private textarea: HTMLDivElement
  private emailItem: HTMLDivElement
  private textareaValue: HTMLInputElement

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      inputWidth: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  public componentDidMount(): void {
    this.setState({
      ...this.state,
      inputWidth: this.textarea.clientWidth
    })
  }
  // handlers
  private handleChange(e: ChangeEvent<any>): void {
    this.setValue(e.target.value)
  }

  private handleKeyDown(e: KeyboardEvent<any>): void {
    const { value } = this.state

    // Backspace
    if (e.keyCode === 8 && value === '') {
      this.props.onChange(this.removeLastEmail())
    }

    // Tab or Enter
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault()
      this.setValue(value + ' ')
    }
  }

  // calc methods
  private availableSpace(): number {
    const textareaWidth = this.textarea.clientWidth

    let child = this.textarea.firstElementChild
    let rowWidth = 0

    while (child.tagName !== 'INPUT') {
      const emailWidth = child.clientWidth + this.EMAIL_ITEM_PEDDING_RIGTH

      rowWidth = textareaWidth > rowWidth + emailWidth ? rowWidth + emailWidth : emailWidth
      child = child.nextElementSibling
    }

    return textareaWidth - rowWidth
  }

  private calcInputValueWidth(value: string): number {
    this.input.innerText = value

    return this.input.clientWidth
  }

  // action
  private setValue(value: string): void {
    const { onChange } = this.props
    const { inputWidth } = this.state
    const textareaWidth = this.textarea.clientWidth
    const availableWidth = this.availableSpace()

    if (this.isValidEmail(value)) {
      const newEmails = this.getValidEmails(value)

      this.setState({
        ...this.state,
        value: '',
        inputWidth: 10
      })

      onChange(this.pushNewEmails(newEmails))
    } else {
      this.setState({
        ...this.state,
        value,
        inputWidth: this.calcInputValueWidth(value) > availableWidth ? textareaWidth : availableWidth
      })
    }
  }

  // action
  private pushNewEmails(newEmails: string[]): string[] {
    return this.props.emails.concat(newEmails)
  }

  // action
  private removeLastEmail(): string[] {
    const { emails } = this.props

    this.setState({
      ...this.state,
      inputWidth: emails.length > 1 ? 10 : this.textarea.clientWidth
    })

    return emails.length > 1
      ? emails.slice(0, emails.length - 1)
      : []
  }

  // helpers
  private isValidEmail(str: string): boolean {
    return this.validEmails.test(str)
  }

  private getValidEmails(str: string): string[] {
    return str.match(this.email)
  }

  // render
  public render(): JSX.Element {
    const { placeholder, emails } = this.props
    const { value, inputWidth } = this.state

    return (
      <div styleName="textarea-wrap" onClick={() => this.textareaValue.focus()}>
        <Scrollbars autoHide autoHeight autoHeightMax={157}>
        <div styleName="textarea" ref={(textarea) => this.textarea = textarea}>
          {emails.map((email, i) => (
            <EmailItem
              key={i}
              email={email} onClick={(e) => e.stopPropagation()}/>
          ))}

          <input
            ref={(t) => this.textareaValue = t}
            style={{width: inputWidth}}
            styleName="input"
            value={value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={emails.length === 0 ? placeholder : ''}/>

          <div
            ref={(input) => this.input = input}
            styleName="input-hidden"/>
          <div
            ref={(email) => this.emailItem = email}
            styleName="email-item-hidden"/>
        </div>
        </Scrollbars>
      </div>
    )
  }
}

export default CSSModules(EmailTextarea, require('./styles.css'))
