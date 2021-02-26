import { Slice } from '@reduxjs/toolkit'

import { GameSlice } from './game/game.types'

export type RootStore = {
  game: GameSlice
}

export type SimpleReducer<Name extends keyof RootStore> = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Slice<RootStore[Name], Record<string, any>, Name>,
  'caseReducers'
> & {
  initialState: RootStore[Name]
}
