import { configureStore, combineReducers } from '@reduxjs/toolkit'
import serachReducer from './reducers/search'
import similarReducer from './reducers/similar'

const reducers = combineReducers({ serachReducer, similarReducer })
export const store = configureStore({
  reducer: {
    reducers
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
