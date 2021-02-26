import { css } from '@emotion/core'
import * as React from 'react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import { gameActions } from '../../store/game/game.actions'
import { selectBoard, selectPlayerTurn } from '../../store/game/game.selectors'
import { BoardState, Player } from '../../store/game/game.types'
import { useSelector } from '../../store/utils'
import { Node } from './Node/Node.component'

interface BoardProps {
  board: BoardState
  player?: Player
  nodeSize?: number
  dispatch?: Dispatch<any>
}

export const BoardUI: FC<BoardProps> = ({ board, nodeSize = 75, player, dispatch }) => {
  return (
    <>
      {Object.keys(board).map((colIdx) => (
        <div
          css={css`
            margin: 0;
            height: ${nodeSize}px;
          `}
          key={`row:${colIdx}`}>
          {Object.keys(board[parseInt(colIdx)]).map((rowIdx) => (
            <Node
              key={`${rowIdx},${colIdx}`}
              size={nodeSize}
              chip={board[parseInt(rowIdx)][parseInt(colIdx)]}
              player={player}
              onClick={() => {
                dispatch?.(gameActions.makeMove({ x: parseInt(rowIdx), y: parseInt(colIdx) }))
              }}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export const Board: FC<Omit<BoardProps, 'board' | 'player'>> = ({ nodeSize }) => {
  const board = useSelector(selectBoard)
  const playerTurn = useSelector(selectPlayerTurn)
  const dispatch = useDispatch()

  if (!board) return null

  return <BoardUI board={board} nodeSize={nodeSize} player={playerTurn} dispatch={dispatch} />
}

Board.displayName = 'Board'
