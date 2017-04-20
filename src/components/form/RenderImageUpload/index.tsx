import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'

import FileUpload, { Props as UploadProps } from '../../common/ImageUpload'

/**
 * Types
 */
export type Props = UploadProps & WrappedFieldProps<any>

/**
 * Component
 */
const RenderImageUpload: SFC<Props> = (props) => {
  const { width, height, camPosition, overlay, src, alt, onImgSelect, input, meta } = props
  const { value, onChange, onBlur } = input
  const { dirty } = meta

  const handleChange = (value: any) => {
    onChange(value)
  }

  return <FileUpload
    src={dirty ? value : src}
    alt={alt}
    width={width}
    height={height}
    camPosition={camPosition}
    overlay={overlay}
    onImgSelect={handleChange}
  />
}

export default RenderImageUpload