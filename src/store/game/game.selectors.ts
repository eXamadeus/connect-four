import { simpleSelector } from '../utils'

export const selectBoard = simpleSelector(({ game }) => {
  if (game.state === 'not playing') return undefined

  return game.board
})

export const selectGameState = simpleSelector(({ game }) => game.state)

export const selectPlayerTurn = simpleSelector(({ game }) => {
  if (game.state === 'not playing') return undefined
  if (game.state === 'playing') return game.turn

  return game.winner
})
