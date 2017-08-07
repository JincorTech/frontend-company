import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import Button from '../../common/Button';
import Icon from '../../common/Icon';

import { Company } from '../../../redux/modules/profile/profileView';

import SocialLink from '../../profile/SocialLink';
import CompanyLogo from '../../profile/CompanyLogo';

import stringCut from '../../../helpers/common/stringCut';

export type Props = HTMLProps<HTMLDivElement> & {
  company: Company
};

const CompanyCard: SFC<Props> = ({ company, ...divProps }) => {
  const { legalName, profile, economicalActivityTypes, companyType } = company;
  const { picture, links, email, phone, address } = profile;
  const city = address.city ? address.city.name : '';
  const country = address.country ? address.country.name : '';
  const at = economicalActivityTypes.length ? economicalActivityTypes[0].name : '';

  return (
    <div styleName="card" {...divProps} title={legalName}>
      <button type="button" styleName="bookmark" onClick={e => e.stopPropagation()}>
        <Icon styleName="bookmark-icon" name="bookmark"/>
      </button>

      <div styleName="logo">
        <CompanyLogo src={picture}/>
      </div>

      <div styleName="name">{stringCut(legalName, 20)}</div>
      <div styleName="address">{city ? `${country}, ${city}` : country}</div>
      <div styleName="button"><Button styleName="btn" bStyle="outline" onClick={e => e.stopPropagation()}>Написать</Button></div>
      {at && <div styleName="activity" title={at}><Icon styleName="icon" name="activity"/>{stringCut(at, 35)}</div>}
      <div styleName="socials">
        {Boolean(links.length) && links.map((link, i) => <SocialLink styleName="social" displayName={false} size={28} {...link} key={link.value + i}/>)}
      </div>
    </div>
  );
};

export default CSSModules(CompanyCard, require('./styles.css'));
