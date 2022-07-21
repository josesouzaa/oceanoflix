import { FormEvent, useEffect, useState } from 'react'

import Head from 'next/head'
import { GetStaticProps } from 'next'

import { Header } from '../components/Header'

import { FilmCardWithInfos } from '../components/FilmCardWithInfos'

import { GenresType, GetGenres, GetMoviesByTitle } from '../utils/tmdb'

import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMoviesByTitle,
  filterMoviesByGenre,
  setMoviesFiltredEqualToMoviesByTitle,
  setErrorToNull,
  setErrorToMessage,
  resetStates
} from '../store/reducers/search'

interface GenresProps {
  genres: GenresType[]
}

export default function Search({ genres }: GenresProps) {
  const { moviesByTitle, moviesFiltred, error } = useSelector(
    (state: RootState) => state.reducers.serachReducer
  )
  const dispatch = useDispatch()
  const [titleForSearch, setTitleForSearch] = useState('')

  useEffect(() => {
    dispatch(resetStates())
  }, [dispatch])

  useEffect(() => {
    if (moviesFiltred.length <= 0 && moviesByTitle.length > 0) {
      dispatch(setErrorToMessage())
    } else {
      dispatch(setErrorToNull())
    }
  }, [moviesFiltred, dispatch])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(titleForSearch)
    const moviesRaw = await GetMoviesByTitle(titleForSearch)
    const movies = moviesRaw.filter((i) => !i.adult && i.poster_path)
    dispatch(setMoviesByTitle(movies))
  }

  function handleFilter(genre: number) {
    if (genre > 0) {
      dispatch(filterMoviesByGenre(genre))
    } else {
      dispatch(setMoviesFiltredEqualToMoviesByTitle())
    }
  }

  return (
    <>
      <Head>
        <title>Busca</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold text-brand-blue-900">Busca</h1>
          <form onSubmit={handleSubmit} className="flex">
            <input
              className="text-black p-2 rounded-l"
              type="text"
              value={titleForSearch}
              onChange={(e) => setTitleForSearch(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-r bg-brand-green-400 px-2 font-semibold hover:brightness-95 transition duration-300"
            >
              Buscar
            </button>
          </form>
        </div>

        {genres && (moviesFiltred.length > 0 || moviesByTitle.length > 0) && (
          <select
            className="text-black p-1 rounded text-xs mt-12"
            onChange={(e) => handleFilter(Number(e.target.value))}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}

        {error === null && moviesFiltred.length > 0 && (
          <ul className="mt-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moviesFiltred.map((movie) => (
              <FilmCardWithInfos key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

        {error === null && moviesFiltred.length <= 0 && (
          <ul className="mt-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moviesByTitle.map((movie) => (
              <FilmCardWithInfos key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

        {error && <p className="mt-8">{error}</p>}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const genresRaw = await GetGenres()

  const genres = [{ id: 0, name: 'Filtrar por gênero' }, ...genresRaw]

  return { props: { genres } }
}
