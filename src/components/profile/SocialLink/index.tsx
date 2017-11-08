import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { convertToAbsolute } from '../../../helpers/common/url';

export type Props = HTMLProps<HTMLLIElement> & LinkProps;

export type LinkProps = {
  name: string
  value: string
  iconUrl?: string
  displayName?: boolean
  size?: number
};

const SocialLink: SFC<Props> = (props) => {
  const { name, iconUrl, value: url, displayName, size, ...liProps } = props;
  const style = { width: size, height: size };

  return (
    <li styleName="social-link" {...liProps}>
      <a styleName="link-icon" target="_blank" href={convertToAbsolute(url)} style={style}>
        {iconUrl
          ? <img src={iconUrl}/>
          : <img src={require('./svg/default.svg')}/>}
      </a>
      {displayName && <span styleName="link-name">{name}</span>}
    </li>
  );
};

SocialLink.defaultProps = {
  displayName: true,
  size: 36
};

export default CSSModules(SocialLink, require('./styles.css'));
