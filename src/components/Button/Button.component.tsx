import { css } from '@emotion/core'
import React from 'react'

import { Styling } from '../../styles/types'

const baseStyle = css`
  background: #f8f8f8;
  border: 0;
  border-radius: 10px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-weight: bold;
  font-size: 2rem;
  padding: 0.5rem 2rem;
  user-select: none;
`

const interactiveStyles = css`
  position: relative;
  outline: none;
  cursor: pointer;
  transition: top 50ms, left 50ms, box-shadow 50ms, filter 50ms;

  top: 0;

  &:hover {
    background: #dedede;
  }

  &:active {
    top: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
  }
`

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { style?: Styling }
>(({ style, children, ...buttonProps }, ref) => (
  <button ref={ref} css={[baseStyle, interactiveStyles, style]} {...buttonProps}>
    {children}
  </button>
))

Button.displayName = 'Button'
