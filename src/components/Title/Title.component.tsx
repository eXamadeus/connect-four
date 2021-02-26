import { css } from '@emotion/core'
import * as React from 'react'

import { Styling } from '../../styles/types'

export type TitleProps = {
  styles?: Styling
}

export const Title: React.FC<TitleProps> = ({ children, styles }) => (
  <h1
    css={[
      css`
        font-size: 3rem;
      `,
      styles,
    ]}>
    {children}
  </h1>
)

Title.displayName = 'Title'
