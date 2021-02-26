import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Players } from './game.types'

export const gameActions = {
  start: createAction<{ firstPlayer: Players }>('game/start'),
  makeMove: createAsyncThunk('game/makeMove', async () => {
    // const boardState = selectBoardState(getState());
    // check the board state for the row selected...
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
  }),
  gameOver: createAction('game/over'),
}
