/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  AnyAction,
  createSlice as toolkitCreateSlice,
  CreateSliceOptions,
  PayloadAction,
} from '@reduxjs/toolkit'
import { NoInfer } from '@reduxjs/toolkit/src/tsHelpers'
import { createSelectorHook } from 'react-redux'

import { RootStore, SimpleReducer } from './types'

export type SimpleSelector<R> = (store: RootStore) => R
export const simpleSelector = <R>(selector: SimpleSelector<R>): SimpleSelector<R> => selector
export const useSelector = createSelectorHook<RootStore>()

interface SomeAction {
  match(action: AnyAction): boolean
  (...args: any): any
}

declare type Replace<T, Target extends keyof T, Replacement> = Omit<T, Target> & { [key in Target]: Replacement }

export function createActionMatcher<T extends SomeAction>(matchers: T[]) {
  return (action: AnyAction): action is ReturnType<typeof matchers[number]> =>
    matchers.some((matcher) => matcher.match(action))
}

export const createReducer = <Name extends keyof RootStore>(
  options: Replace<
    CreateSliceOptions<RootStore[Name], Record<string, any>, Name>,
    'reducers',
    (builder: ActionReducerMapBuilder<NoInfer<RootStore[Name]>>) => void
  >
): SimpleReducer<Name> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore (this can fail, if there are too many slices, but we know the type is correct...just skip the library
  const slice = toolkitCreateSlice({ ...options, reducers: {}, extraReducers: options.reducers })

  return { ...slice, initialState: options.initialState }
}

export const reduceIfLatestAction = <
  S extends RootStore[keyof RootStore],
  R extends S | void,
  P extends PayloadAction<any, any, any>
>(
  reducer: (slice: S, action: P) => R
) => (slice: S, action: P): S | R => {
  const { state, requestId } = slice as Extract<RootStore[keyof RootStore], { state: 'loading'; requestId: string }>

  if (state === 'loading' && requestId !== undefined && requestId !== action.meta.requestId) {
    return slice
  }

  return reducer(slice, action)
}
