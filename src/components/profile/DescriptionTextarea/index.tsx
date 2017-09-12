import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import TextareaAutosize from 'react-textarea-autosize';

/**
 * Types
 */
export type Props = {
  invalid?: boolean
  value?: string
  onChange?: (value: any) => void
  onFocus?: (value: any) => void
  onBlur?: (value: any) => void
  placeholder?: string
  maxLength?: number
};

export type State = {
  countVisible: boolean
};

/**
 * Component
 */
class DescriptionTextarea extends Component<Props, State> {
  private MAX_LENGTH: number = 850;

  public state: State = {
    countVisible: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  public handleChange(e: any): void {
    const { onChange } = this.props;
    const value = e.target.value.substr(0, this.MAX_LENGTH);

    if (onChange) {
      onChange(value);
    }
  }

  private handleFocus(e: any): void {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(e.target.value);
    }

    this.setState({ countVisible: true });
  }

  private handleBlur(e: any): void {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(e.target.value);
    }

    this.setState({ countVisible: false });
  }

  public render(): JSX.Element {
    const { invalid, value } = this.props;
    const { countVisible } = this.state;

    return (
      <div styleName="wrapper">
        <div styleName={invalid ? 'invalid' : 'default'}>
          <TextareaAutosize
            styleName="textarea"
            rows={3}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={value}/>
        </div>

        {countVisible && <div styleName="counter">{value.length}/{this.MAX_LENGTH}</div>}
      </div>
    );
  }
}

export default CSSModules(DescriptionTextarea, require('./styles.css'));
