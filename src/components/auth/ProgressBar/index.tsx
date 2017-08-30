import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import * as classNames from 'classnames';

import Step from '../Step';

type ProgressBarProps = {
  currentStep: 1 | 2 | 3
};

const ProgressBar: SFC<ProgressBarProps> = ({ currentStep }) => {
  const getType = (step: 1 | 2 | 3): string => (
    classNames({
      active: step === currentStep,
      completed: step < currentStep,
      uncompleted: step > currentStep
    })
  );

  return (
    <div styleName="progress-bar">
      <Step type={getType(1)}/>
      <span styleName="progress-seporator"/>
      <Step type={getType(2)}/>
      <span styleName="progress-seporator"/>
      <Step type={getType(3)}/>
    </div>
  );
};

export default CSSModules(ProgressBar, require('./styles.css'));
