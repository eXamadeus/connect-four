import { css } from '@emotion/core'
import React from 'react'

export const FullPageCenteredFlexContainer: React.FC = ({ children }) => (
  <div
    css={css`
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      height: 100vh;
    `}>
    {children}
  </div>
)
