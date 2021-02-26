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
      {Object.keys(board).map((yOffset) => (
        <div
          css={css`
            margin: 0;
            height: ${nodeSize}px;
          `}
          key={`col:${yOffset}`}>
          {Object.keys(board[parseInt(yOffset)]).map((xOffset) => (
            <Node
              label={`Node ${xOffset}, ${yOffset}`}
              key={`${xOffset},${yOffset}`}
              size={nodeSize}
              chip={board[parseInt(xOffset)][parseInt(yOffset)]}
              player={player}
              onClick={() => {
                dispatch?.(gameActions.makeMove({ x: parseInt(xOffset), y: parseInt(yOffset) }))
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
