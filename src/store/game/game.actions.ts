import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { RootStore } from '../types'
import { selectBoard, selectPlayerTurn } from './game.selectors'
import { Location, Move, Player } from './game.types'
import { checkWinCondition, lowestEmptyRowIndex } from './logic/moveLogic'

export const gameActions = {
  start: createAction<{ firstPlayer: Player }>('game/start'),
  makeMove: createAsyncThunk<Move, Location, { state: RootStore }>('game/makeMove', async (location, { getState }) => {
    const board = selectBoard(getState())
    const playerTurn = selectPlayerTurn(getState())

    if (!board || !playerTurn) throw new Error('game not started')

    const emptyRowIndex = lowestEmptyRowIndex(board, location)
    if (emptyRowIndex == false) throw new Error(`column ${location.x} is full`)

    return {
      ...location,
      y: emptyRowIndex,
      win: checkWinCondition(board, { ...location, y: emptyRowIndex }, playerTurn),
    }
  }),
  gameOver: createAction('game/over'),
}
