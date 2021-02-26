import { BoardState, ChipValue, Location } from '../game.types'

export const lowestEmptyRowIndex = (board: BoardState, location: Location): false | number => {
  const column = board[location.x]

  return Object.keys(column)
    .reverse()
    .reduce<false | number>((prev, rowIndex) => {
      const row = parseInt(rowIndex)
      if (prev !== false) return prev

      return column[row] === 'empty' ? row : false
    }, false)
}

const checkVerticalWin = (board: BoardState, location: Location, chip: ChipValue) => {
  let numInCol = 0
  const column = board[location.x]

  Object.keys(column).forEach((row) => {
    const rowIndex = parseInt(row)

    if (column[rowIndex] === chip || rowIndex === location.y) {
      numInCol += 1
    } else if (numInCol < 4) {
      numInCol = 0
    }
  })

  return numInCol >= 4
}

const checkHorizontalWin = (board: BoardState, location: Location, chip: ChipValue) => {
  let numInRow = 0

  const yOffset = location.y

  Object.keys(board).forEach((column) => {
    const columnIndex = parseInt(column)

    if (board[columnIndex][yOffset] === chip || columnIndex === location.x) {
      numInRow += 1
    } else if (numInRow < 4) {
      numInRow = 0
    }
  })

  return numInRow >= 4
}

type Direction = 'nw' | 'ne' | 'se' | 'sw'

const directionDeltas: Readonly<{ [ordinate in Direction]: readonly [-1 | 1, -1 | 1] }> = {
  ne: [-1, 1],
  nw: [1, 1],
  se: [1, -1],
  sw: [-1, -1],
} as const

const checkInDirection = (board: BoardState, location: Location, chip: ChipValue, direction: Direction) => {
  const max = Object.keys(board).length

  const [x, y] = directionDeltas[direction]

  for (const distance of [1, 2, 3]) {
    const xDelta = x * distance
    const yDelta = y * distance

    const [newX, newY] = [location.x + xDelta, location.y + yDelta]
    const outOfBounds = newX < 0 || newY < 0 || newX >= max || newY >= max

    if (outOfBounds || board[newX][newY] !== chip) return false
  }

  return true
}

const checkDiagonalWin = (board: BoardState, location: Location, chip: ChipValue) => {
  return (
    checkInDirection(board, location, chip, 'ne') ||
    checkInDirection(board, location, chip, 'nw') ||
    checkInDirection(board, location, chip, 'se') ||
    checkInDirection(board, location, chip, 'sw')
  )
}

export const checkWinCondition = (board: BoardState, location: Location, chip: ChipValue): boolean => {
  return (
    checkVerticalWin(board, location, chip) ||
    checkHorizontalWin(board, location, chip) ||
    checkDiagonalWin(board, location, chip)
  )
}
