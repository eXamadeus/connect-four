import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { gameReducer } from './game/game.reducer'
import { RootStore } from './types'

export const initialRootState: RootStore = {
  [gameReducer.name]: gameReducer.initialState,
}

export const initializeStore = (preloadedState: RootStore = initialRootState) =>
  configureStore({
    reducer: combineReducers<RootStore>({
      [gameReducer.name]: gameReducer.reducer,
    }),
    ...(preloadedState ? { preloadedState } : {}),
  })
