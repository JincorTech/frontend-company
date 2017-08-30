import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import { getInitials, getBackgroundColor } from '../../../utils/colorFunction';

export type UserAvatarProps = HTMLProps<HTMLDivElement> & {
  src?: string,
  alt?: string,
  id: string,
  name: string
};

const UserAvatar: SFC<UserAvatarProps> = (props) => {
  const { src, alt, id, name, ...divProps } = props;
  const backgroundColor = getBackgroundColor(id);
  const initials = getInitials(name);

  return (
    <div styleName="user-avatar" {...divProps}>
      { src
        ? <img src={src} alt={alt}/>
        : <div styleName="user-avatar-empty" style={backgroundColor}>{initials}</div>}
    </div>
  );
};

export default CSSModules(UserAvatar, require('./styles.css'));
