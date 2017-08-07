import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type InfoItemProps = HTMLProps<HTMLDivElement> & {
  title: string
};

const InfoItem: SFC<InfoItemProps> = (props) => {
  const { title, children, ...divProps } = props;

  return (
    <div styleName="company-section" {...divProps}>
      <h4 styleName="company-section-title">{title}</h4>
      {children}
    </div>
  );
};

export default CSSModules(InfoItem, require('./styles.css'));
