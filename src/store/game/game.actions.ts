import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { RootStore } from '../types'
import { selectBoard } from './game.selectors'
import { ChipLocation, Player } from './game.types'
import { columnHasEmptyNode } from './logic/moveLogic'

export const gameActions = {
  start: createAction<{ firstPlayer: Player }>('game/start'),
  makeMove: createAsyncThunk<ChipLocation, ChipLocation, { state: RootStore }>(
    'game/makeMove',
    async (move, { getState }) => {
      const board = selectBoard(getState())

      if (!board) throw new Error('Game not started')

      const availableSpot = columnHasEmptyNode(board, move)

      // check the board state for the row selected...
      if (!availableSpot) throw new Error('cannot move to taken position')
      //    see if there is an open position
      //      if open position, continue reduction  (reducer will update the game state)
      //      if no open position, throw an error
      //
      // * * * * * * *
      // * * * * * * *
      // * * * * * * *
      // * * * * * * *
      // * * * * * * *
      //
      //    check for win state: -> gameOver

      return {} as ChipLocation
    }
  ),
  gameOver: createAction('game/over'),
}
