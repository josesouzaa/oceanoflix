import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { MovieType } from '../../utils/tmdb'

interface SearchState {
  moviesSimilar: MovieType[]
  moviesFiltred: MovieType[]
  error: null | string
}

const initialState: SearchState = {
  moviesSimilar: [] as MovieType[],
  moviesFiltred: [] as MovieType[],
  error: null
}

const similarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMoviesSimilar: (state, action: PayloadAction<MovieType[]>) => {
      state.moviesSimilar = action.payload
    },
    filterMoviesByGenre: (state, action: PayloadAction<number>) => {
      state.moviesFiltred = state.moviesSimilar.filter((movie) =>
        movie.genre_ids.includes(action.payload)
      )
    },
    setMoviesFiltredEqualToMoviesSimilar: (state) => {
      state.moviesFiltred = state.moviesSimilar
    },
    setErrorToNull: (state) => {
      state.error = null
    },
    setErrorToMessage: (state) => {
      state.error = 'Nenhum filme correspondente ao gênero'
    },
    resetStates: (state) => {
      state.moviesSimilar = []
      state.moviesFiltred = []
      state.error = null
    }
  }
})

export const {
  setMoviesSimilar,
  filterMoviesByGenre,
  setMoviesFiltredEqualToMoviesSimilar,
  setErrorToNull,
  setErrorToMessage,
  resetStates
} = similarSlice.actions

export default similarSlice.reducer
