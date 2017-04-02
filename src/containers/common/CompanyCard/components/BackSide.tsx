import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../../../components/common/Icon'
import Text from '../../../../components/profile/Text'
import InfoItem from '../../../../components/profile/InfoItem'
import SocialLink, { SocialLinkProps } from '../../../../components/profile/SocialLink'


export type Props = HTMLProps<HTMLDivElement> & CardBackProps

export type CardBackProps = {
  description: string
  collapsed: boolean
  socialLinks: SocialLinkProps[]
  onFlip: () => void
  onCollapse: (value: boolean) => void
}

const BackSide: SFC<Props> = (props) => {
  const {
    description,
    collapsed,
    socialLinks,
    onCollapse,
    onFlip,
    ...divProps
  } = props

  return (
    <div styleName="company-card-back" {...divProps}>
      <InfoItem title="Описание компании">
        <Text value={description}/>
      </InfoItem>

      <InfoItem title="Ссылки">
        {socialLinks.map((social, i) => <SocialLink {...social} key={i}/>)}
      </InfoItem>

      <Icon styleName="flip" name="flip" onClick={onFlip}/>
    </div>
  )
}

export default CSSModules(BackSide, require('../styles.css'))