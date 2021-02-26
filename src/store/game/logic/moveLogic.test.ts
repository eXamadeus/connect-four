import { BoardState } from '../game.types'
import { createBoardState } from './createBoardState'
import { checkWinCondition, lowestEmptyRowIndex } from './moveLogic'

describe('move logic', () => {
  describe('columnHasEmptyNode', () => {
    const board: BoardState = createBoardState(4)
    board[1][3] = 'blue'

    board[2][1] = 'red'
    board[2][2] = 'blue'
    board[2][3] = 'red'

    board[3][0] = 'red'
    board[3][1] = 'blue'
    board[3][2] = 'red'
    board[3][3] = 'red'

    it('returns correct row index when column is available', () => {
      expect(lowestEmptyRowIndex(board, { x: 0, y: 0 })).toEqual(3)
      expect(lowestEmptyRowIndex(board, { x: 0, y: 1 })).toEqual(3)
      expect(lowestEmptyRowIndex(board, { x: 0, y: 2 })).toEqual(3)
      expect(lowestEmptyRowIndex(board, { x: 0, y: 3 })).toEqual(3)

      expect(lowestEmptyRowIndex(board, { x: 1, y: 0 })).toEqual(2)
      expect(lowestEmptyRowIndex(board, { x: 1, y: 1 })).toEqual(2)
      expect(lowestEmptyRowIndex(board, { x: 1, y: 2 })).toEqual(2)
      expect(lowestEmptyRowIndex(board, { x: 1, y: 3 })).toEqual(2)

      expect(lowestEmptyRowIndex(board, { x: 2, y: 0 })).toEqual(0)
      expect(lowestEmptyRowIndex(board, { x: 2, y: 1 })).toEqual(0)
      expect(lowestEmptyRowIndex(board, { x: 2, y: 2 })).toEqual(0)
      expect(lowestEmptyRowIndex(board, { x: 2, y: 3 })).toEqual(0)
    })

    it('returns false when column has no space', () => {
      expect(lowestEmptyRowIndex(board, { x: 3, y: 0 })).toBeFalsy()
      expect(lowestEmptyRowIndex(board, { x: 3, y: 1 })).toBeFalsy()
      expect(lowestEmptyRowIndex(board, { x: 3, y: 2 })).toBeFalsy()
      expect(lowestEmptyRowIndex(board, { x: 3, y: 3 })).toBeFalsy()
    })
  })

  describe('checkWinCondition - vertical', () => {
    const verticalBoard: BoardState = createBoardState(4)
    verticalBoard[3][0] = 'red'
    verticalBoard[3][1] = 'red'
    verticalBoard[3][2] = 'red'

    it.each([
      [{ x: 0, y: 3 }, false],
      [{ x: 1, y: 3 }, false],
      [{ x: 2, y: 3 }, false],
      [{ x: 3, y: 0 }, false],
      [{ x: 3, y: 1 }, false],
      [{ x: 3, y: 2 }, false],
      [{ x: 3, y: 3 }, true],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(verticalBoard, location, 'red')).toEqual(condition)
    })
  })

  describe('checkWinCondition - horizontal', () => {
    const horizontalBoard: BoardState = createBoardState(6)
    horizontalBoard[1][5] = 'red'
    horizontalBoard[2][5] = 'red'
    horizontalBoard[3][5] = 'red'

    it.each([
      [{ x: 0, y: 5 }, true],
      [{ x: 1, y: 5 }, false],
      [{ x: 2, y: 5 }, false],
      [{ x: 3, y: 5 }, false],
      [{ x: 4, y: 5 }, true],
      [{ x: 5, y: 5 }, false],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(horizontalBoard, location, 'red')).toEqual(condition)
    })

    const horizontalBoard2: BoardState = createBoardState(6)
    horizontalBoard2[0][5] = 'red'
    horizontalBoard2[1][5] = 'red'
    horizontalBoard2[2][5] = 'red'

    it.each([
      [{ x: 0, y: 5 }, false],
      [{ x: 1, y: 5 }, false],
      [{ x: 2, y: 5 }, false],
      [{ x: 3, y: 5 }, true],
      [{ x: 4, y: 5 }, false],
      [{ x: 5, y: 5 }, false],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(horizontalBoard2, location, 'red')).toEqual(condition)
    })
  })

  describe('checkWinCondition - diagonal - ne', () => {
    const diagNWBoard: BoardState = createBoardState(6)
    diagNWBoard[1][5] = 'red'
    diagNWBoard[2][4] = 'red'
    diagNWBoard[3][3] = 'red'

    it.each([
      [{ x: 1, y: 0 }, false],
      [{ x: 2, y: 1 }, false],
      [{ x: 3, y: 2 }, false],
      [{ x: 4, y: 2 }, true],
      [{ x: 5, y: 4 }, false],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(diagNWBoard, location, 'red')).toEqual(condition)
    })
  })

  describe('checkWinCondition - diagonal - nw', () => {
    const diagNWBoard: BoardState = createBoardState(6)
    diagNWBoard[4][5] = 'red'
    diagNWBoard[3][4] = 'red'
    diagNWBoard[2][3] = 'red'

    it.each([
      [{ x: 0, y: 1 }, false],
      [{ x: 1, y: 2 }, true],
      [{ x: 2, y: 2 }, false],
      [{ x: 3, y: 4 }, false],
      [{ x: 4, y: 5 }, false],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(diagNWBoard, location, 'red')).toEqual(condition)
    })
  })

  describe('checkWinCondition - diagonal - sw', () => {
    const diagNWBoard: BoardState = createBoardState(6)
    diagNWBoard[2][4] = 'red'
    diagNWBoard[3][3] = 'red'
    diagNWBoard[4][2] = 'red'

    it.each([
      [{ x: 1, y: 5 }, true],
      [{ x: 2, y: 4 }, false],
      [{ x: 3, y: 3 }, false],
      [{ x: 4, y: 2 }, false],
      [{ x: 5, y: 1 }, true],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(diagNWBoard, location, 'red')).toEqual(condition)
    })
  })

  describe('checkWinCondition - diagonal - se', () => {
    const diagNWBoard: BoardState = createBoardState(6)
    diagNWBoard[1][1] = 'red'
    diagNWBoard[2][2] = 'red'
    diagNWBoard[3][3] = 'red'

    it.each([
      [{ x: 0, y: 0 }, true],
      [{ x: 1, y: 1 }, false],
      [{ x: 2, y: 2 }, false],
      [{ x: 3, y: 3 }, false],
      [{ x: 4, y: 4 }, true],
      [{ x: 5, y: 5 }, false],
    ])('checks for horizontal win state @ %j to be %p', (location, condition) => {
      expect(checkWinCondition(diagNWBoard, location, 'red')).toEqual(condition)
    })
  })
})
