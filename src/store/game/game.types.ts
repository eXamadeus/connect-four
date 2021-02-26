export type Players = 'red' | 'black'
export type Node = Players | 'empty'

export type Board = Node[][]

interface NotPlaying {
  state: 'not playing'
}

interface PlayingGame {
  state: 'playing'
  turn: Players
  board: Board
}

interface GameOver {
  state: 'game over'
  board: Board
  winner: Players
}

export type GameSlice = NotPlaying | PlayingGame | GameOver
