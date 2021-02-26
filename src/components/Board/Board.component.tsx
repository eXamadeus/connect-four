import { css } from '@emotion/core'
import * as React from 'react'

import { selectBoard } from '../../store/game/game.selectors'
import { BoardState } from '../../store/game/game.types'
import { useSelector } from '../../store/utils'
import { Node } from './Node/Node.component'

interface BoardProps {
  board: BoardState
  nodeSize?: number
}

export const BoardUI: React.FC<BoardProps> = ({ board, nodeSize = 75 }) =>
  (Object.keys(board) as any).map((rowIndex: keyof typeof board) => (
    <div
      css={css`
        margin: 0;
        height: ${nodeSize}px;
      `}
      key={`row:${rowIndex}`}>
      {(Object.keys(board[rowIndex]) as any).map((colIndex: keyof typeof board) => (
        <Node key={`${rowIndex},${colIndex}`} size={nodeSize} chip={board[colIndex][rowIndex]} />
      ))}
    </div>
  ))

export const Board: React.FC<Omit<BoardProps, 'board'>> = ({ nodeSize }) => {
  const board = useSelector(selectBoard)

  if (!board) return null

  return <BoardUI board={board} nodeSize={nodeSize} />
}

Board.displayName = 'Board'
