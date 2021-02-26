import { createBoard } from './board'

describe('board', () => {
  describe('createBoard', () => {
    it('makes a 4x4 board when requested', () => {
      const board = createBoard(4)

      expect(board).toHaveLength(4)

      board.forEach((row) => {
        expect(row).toEqual(['empty', 'empty', 'empty', 'empty'])
      })
    })
  })
})
