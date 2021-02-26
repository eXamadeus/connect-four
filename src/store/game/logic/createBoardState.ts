import { BoardState } from '../game.types'

export const createBoardState = (size: number): BoardState => {
  const boardState: BoardState = {}

  ;[...new Array(size)].forEach((_, colIdx) => {
    const row: BoardState[number] = {}

    ;[...new Array(size)].forEach((_, rowIdx) => {
      row[rowIdx] = 'empty'
    })

    boardState[colIdx] = row
  })

  return boardState
}
