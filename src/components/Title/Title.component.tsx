import { css } from '@emotion/core'
import * as React from 'react'

import { Styling } from '../../styles/types'

export type TitleProps = {
  style?: Styling
}

export const Title: React.FC<TitleProps> = ({ children, style }) => (
  <h1
    css={[
      css`
        font-size: 3rem;
      `,
      style,
    ]}>
    {children}
  </h1>
)

Title.displayName = 'Title'
