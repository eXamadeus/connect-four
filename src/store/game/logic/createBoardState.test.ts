import { createBoardState } from './createBoardState'

describe('createBoardState', () => {
  it('makes a 4x4 board when requested', () => {
    const board = createBoardState(4)

    expect(board).toMatchObject({
      0: {
        0: 'empty',
        1: 'empty',
        2: 'empty',
        3: 'empty',
      },
      1: {
        0: 'empty',
        1: 'empty',
        2: 'empty',
        3: 'empty',
      },
      2: {
        0: 'empty',
        1: 'empty',
        2: 'empty',
        3: 'empty',
      },
      3: {
        0: 'empty',
        1: 'empty',
        2: 'empty',
        3: 'empty',
      },
    })
  })
})
