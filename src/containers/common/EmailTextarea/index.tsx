import * as React from 'react';
import { Component, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import * as CSSModules from 'react-css-modules';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import {
  validateEmail,
  addEmails,
  handleEmailRemove,
  setInputWidth,
  keyPress,
  selectEmail,
  unselectEmail,
  StateMap as StateProps
} from '../../../redux/modules/common/emailTextarea';

import EmailItem from './components/EmailItem';

/**
 * Types
 */
export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = {
  placeholder?: string
};

export type DispatchProps = {
  validateEmail: (value: string) => void
  addEmails: (value: string[]) => void
  handleEmailRemove: (btnKey: string) => void
  setInputWidth: (value: number) => void
  keyPress: (key: string) => void
  selectEmail: (index: number) => void
  unselectEmail: () => void
};

/**
 * Component
 */
class EmailTextarea extends Component<Props, {}> {
  private input: HTMLDivElement;
  private textarea: HTMLDivElement;
  private emailItem: HTMLDivElement;
  private textareaValue: HTMLInputElement;
  private EMAIL_ITEM_RIGTH_PEDDING = 9;

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  public componentDidMount(): void {
    const { setInputWidth } = this.props;

    setInputWidth(this.textarea.clientWidth);
  }

  public componentDidUpdate(): void {
    const { value, setInputWidth, inputWidth, emails } = this.props;

    const hiddenInputWidth = this.calcInputValueWidth(value);
    const availableWidth = this.calcAvailableSpace();
    const textareaWidth = this.textarea.clientWidth;

    if (availableWidth !== inputWidth || hiddenInputWidth > inputWidth) {
      const width = hiddenInputWidth > availableWidth
        ? textareaWidth
        : availableWidth;

      setInputWidth(width);
    }
  }

  private handleChange(e: FormEvent<HTMLInputElement>): void {
    const { validateEmail } = this.props;

    validateEmail(e.currentTarget.value);
  }

  private handleBackspace(e: KeyboardEvent<HTMLInputElement>): void {
    const { handleEmailRemove } = this.props;

    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleEmailRemove(e.key);
    }
  }

  private handleEmailClick(e: MouseEvent<HTMLDivElement>, index: number): void {
    const { selectedEmail, selectEmail, unselectEmail } = this.props;
    e.stopPropagation();

    selectedEmail !== index
      ? selectEmail(index)
      : unselectEmail();

    this.textareaValue.focus();
  }

  private calcInputValueWidth(value: string): number {
    this.input.innerText = value;
    return this.input.clientWidth;
  }

  private calcAvailableSpace(): number {
    const textareaWidth = this.textarea.clientWidth;

    let child = this.textarea.firstElementChild;
    let rowWidth = 0;

    while (child.tagName !== 'INPUT') {
      let emailWidth = (child as HTMLElement).offsetWidth + this.EMAIL_ITEM_RIGTH_PEDDING;

      rowWidth = textareaWidth > rowWidth + emailWidth
        ? rowWidth + emailWidth
        : emailWidth;

      child = child.nextElementSibling;
    }

    return textareaWidth - rowWidth;
  }

  public render(): JSX.Element {
    const { value, emails, placeholder, inputWidth, selectedEmail, selectEmail, unselectEmail } = this.props;

    return (
      <div styleName="textarea-wrap" onClick={() => this.textareaValue.focus()}>
        <Scrollbars autoHide autoHeight autoHeightMax={157}>
          <div styleName="textarea" ref={(textarea) => this.textarea = textarea}>
            {emails.map((email, i) => (
              <EmailItem
                key={i}
                email={email}
                selected={i === selectedEmail}
                onClick={(e) => this.handleEmailClick(e, i)}/>
            ))}

            <input
              ref={(t) => this.textareaValue = t}
              style={{width: inputWidth}}
              styleName="input"
              value={value}
              onChange={this.handleChange}
              onKeyDown={this.handleBackspace}
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
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(EmailTextarea, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.common.emailTextarea,
  {
    validateEmail,
    addEmails,
    handleEmailRemove,
    setInputWidth,
    keyPress,
    selectEmail,
    unselectEmail
  }
)(StyledComponent);
