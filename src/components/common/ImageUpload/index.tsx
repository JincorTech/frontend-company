import * as React from 'react'
import { Component, HTMLProps, MouseEvent, FormEvent } from 'react'
import * as CSSModules from 'react-css-modules'

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
  width: number
  height: number
  onImgSelect?: (value: string) => void
}

/**
 * Component
 */
class ImageUpload extends Component<Props, {}> {
  private input: HTMLInputElement

  public static defaultProps = {
    onImgSelect: (value: string): void => {}
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.cropImage = this.cropImage.bind(this)
  }

  /**
   * Open input
   */
  private handleClick(e: MouseEvent<HTMLDivElement>): void {
    this.input.click()
  }

  /**
   * On select image
   */
  private handleChange(e: FormEvent<HTMLInputElement>): void {
    const file = e.currentTarget.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      this.cropImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  /**
   * Crop image
   */
  private cropImage(src: string): void {
    const { width: WIDTH, height: HEIGHT, onImgSelect } = this.props
    const img = new Image()

    img.src = src

    img.onload = () => {
      let dx = 0
      let dy = 0
      let height = HEIGHT
      let width = WIDTH

      if (img.width > img.height) {
        width = HEIGHT / img.height * img.width
        dx = - (width - WIDTH) / 2
      } else {
        height = WIDTH / img.width * img.height
        dy = - (height - HEIGHT) / 2
      }

      const canvas = document.createElement('canvas')
      canvas.width = WIDTH
      canvas.height = HEIGHT

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, dx, dy, width, height)

      const src = canvas.toDataURL('image/png')

      onImgSelect(src)
    }
  }

  /**
   * Render component
   */
  public render(): JSX.Element {
    const { src, alt, ...divProps } = this.props

    return (
      <div styleName="image-upload" {...divProps}>
        <div styleName="logo">
          <img
            src={src}
            alt={alt}/>
        </div>

        <div styleName="overlay" onClick={this.handleClick}>
          <div styleName="camera"/>
        </div>

        <input
          styleName="input-hidden"
          type="file"
          accept="image/png, image/jpeg"
          onChange={this.handleChange}
          ref={(input) => this.input = input}/>
      </div>
    )
  }
}

/**
 * Decorators
 */
export default CSSModules(ImageUpload, require('./styles.css'))