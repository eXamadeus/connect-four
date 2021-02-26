import { simpleSelector } from '../utils'

export const selectBoard = simpleSelector(({ game }) => {
  if (game.state !== 'playing') return undefined

  return game.board
})

export const selectGameState = simpleSelector(({ game }) => game.state)

export const selectPlayerTurn = simpleSelector(({ game }) => {
  if (game.state !== 'playing') return undefined

  return game.turn
})
