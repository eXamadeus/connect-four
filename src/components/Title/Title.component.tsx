import { css } from '@emotion/core'
import * as React from 'react'
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react'

import { Styling } from '../../styles/types'

export const Title = forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & { style?: Styling }
>(({ children, style }, ref) => (
  <h1
    ref={ref}
    css={[
      css`
        font-size: 3rem;
      `,
      style,
    ]}>
    {children}
  </h1>
))

Title.displayName = 'Title'
