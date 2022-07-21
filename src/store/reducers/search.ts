import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { MovieType } from '../../utils/tmdb'

interface SearchState {
  moviesByTitle: MovieType[]
  moviesFiltred: MovieType[]
  error: null | string
}

const initialState: SearchState = {
  moviesByTitle: [] as MovieType[],
  moviesFiltred: [] as MovieType[],
  error: null
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMoviesByTitle: (state, action: PayloadAction<MovieType[]>) => {
      state.moviesByTitle = action.payload
    },
    filterMoviesByGenre: (state, action: PayloadAction<number>) => {
      state.moviesFiltred = state.moviesByTitle.filter((movie) =>
        movie.genre_ids.includes(action.payload)
      )
      if (state.moviesFiltred.length <= 0 && state.moviesByTitle.length > 0) {
        state.error = 'Nenhum filme correspondente ao gênero'
      } else {
        state.error = null
      }
    },
    setMoviesFiltredEqualToMoviesByTitle: (state) => {
      state.moviesFiltred = state.moviesByTitle
      state.error = null
    },
    setErrorToNull: (state) => {
      state.error = null
    },
    setErrorToMessage: (state) => {
      state.error = 'Nenhum filme correspondente ao gênero'
    },
    resetStates: (state) => {
      state.moviesByTitle = []
      state.moviesFiltred = []
      state.error = null
    }
  }
})

export const {
  setMoviesByTitle,
  filterMoviesByGenre,
  setMoviesFiltredEqualToMoviesByTitle,
  setErrorToNull,
  setErrorToMessage,
  resetStates
} = searchSlice.actions

export default searchSlice.reducer
