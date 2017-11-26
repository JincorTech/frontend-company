import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

type StepProps = {
  type: string
};

const Step: SFC<StepProps> = ({ type }) => (
  <span styleName={type} />
);

export default CSSModules(Step, require('./styles.css'));
