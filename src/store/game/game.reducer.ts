import { createReducer } from '../utils'
import { gameActions } from './game.actions'
import { createBoardState } from './logic/createBoardState'

export const gameReducer = createReducer<'game'>({
  name: 'game',
  initialState: { state: 'not playing' },
  reducers: (builder) =>
    builder
      .addCase(gameActions.start, (slice, action) => ({
        state: 'playing',
        turn: action.payload.firstPlayer,
        board: createBoardState(8),
      }))
      .addCase(gameActions.makeMove.fulfilled, (slice, { payload }) => {
        if (slice.state !== 'playing') return slice

        const { board, turn } = slice
        const { x, y, win } = payload

        const newBoard = { ...board, [x]: { ...board[x], [y]: turn } }

        return win
          ? { state: 'game over', board: newBoard, winner: turn }
          : { state: 'playing', board: newBoard, turn: turn === 'red' ? 'blue' : 'red' }
      }),
})
