export type Player = 'red' | 'blue'
export type ChipValue = Player | 'empty'

export type BoardState = { [xOffset: number]: { [yOffset: number]: ChipValue } }
export type Location = { x: number; y: number }
export type Move = { x: number; y: number; win: boolean }

interface NotPlaying {
  state: 'not playing'
}

interface PlayingGame {
  state: 'playing'
  turn: Player
  board: BoardState
}

interface GameOver {
  state: 'game over'
  board: BoardState
  winner: Player
}

export type GameSlice = NotPlaying | PlayingGame | GameOver
