import { createReducer } from '../utils'
import { createBoard } from './board'
import { gameActions } from './game.actions'

export const gameReducer = createReducer<'game'>({
  name: 'game',
  initialState: { state: 'not playing' },
  reducers: (builder) =>
    builder
      .addCase(gameActions.start, (slice, action) => ({
        state: 'playing',
        turn: action.payload.firstPlayer,
        board: createBoard(8),
      }))
      .addCase(gameActions.makeMove.fulfilled, () => {
        // check game state for open position in row
        // move item to row
      }),
})
