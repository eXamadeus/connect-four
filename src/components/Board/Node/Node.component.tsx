import { css } from '@emotion/core'
import * as React from 'react'

import { ChipValue, Player } from '../../../store/game/game.types'

interface NodeProps {
  chip: ChipValue
  onClick: () => void
  player?: Player
  size?: number
}

/**
 * SVG styling concept taken from https://rossta.net/blog/connect-four-with-svg-pattern-masking.html
 */
export const Node: React.FC<NodeProps> = ({ size = 75, chip, player, onClick }) => {
  const style =
    chip === 'empty' && player
      ? css`
          &:hover {
            background: ${player === 'red' ? '#8b0000' : '#254689'};
          }
        `
      : css`
          background: ${chip === 'red' ? '#8b0000' : chip === 'blue' ? '#254689' : 'unset'};
        `

  return (
    <>
      <svg onClick={onClick} css={style} width={size} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='cell-pattern' patternUnits='userSpaceOnUse' width='100' height='100'>
            <circle cx='50' cy='50' r='45' fill='black' />
          </pattern>
          <mask id='cell-mask'>
            <rect width='100' height='100' fill='white' />
            <rect width='100' height='100' fill='url(#cell-pattern)' />
          </mask>
        </defs>
        {chip === 'red' ? (
          <circle cx='50' cy='50' r='45' fill='#8b0000' />
        ) : chip === 'blue' ? (
          <circle cx='50' cy='50' r='45' fill='#254689' />
        ) : undefined}
        <rect width='100' height='100' fill='cadetblue' mask='url(#cell-mask)' />
      </svg>
      <style jsx>{`
        .circle {
          background: blue;
        }
        .circle:hover {
          background: green;
        }
      `}</style>
    </>
  )
}

Node.displayName = 'Node'
