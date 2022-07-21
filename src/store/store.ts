import { configureStore } from '@reduxjs/toolkit'
import serachReducer from './reducers/search'

export const store = configureStore({
  reducer: {
    search: serachReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
