import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

import { Header } from '../../components/Header'
import { FilmCardWithInfos } from '../../components/FilmCardWithInfos'

import {
  GenresType,
  GetGenres,
  GetSimilarMovies,
  MovieType
} from '../../utils/tmdb'

import type { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMoviesSimilar,
  filterMoviesByGenre,
  setMoviesFiltredEqualToMoviesSimilar,
  resetStates
} from '../../store/reducers/similar'
import { useEffect } from 'react'

interface MovieProps {
  movies: MovieType[]
  genres: GenresType[]
}

export default function Similar({ movies, genres }: MovieProps) {
  const { moviesSimilar, moviesFiltred, error } = useSelector(
    (state: RootState) => state.reducers.similarReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetStates())
    dispatch(setMoviesSimilar(movies))
  }, [dispatch, movies])

  function handleFilter(genre: number) {
    if (genre > 0) {
      dispatch(filterMoviesByGenre(genre))
    } else {
      dispatch(setMoviesFiltredEqualToMoviesSimilar())
    }
  }
  return (
    <>
      <Head>
        <title>Similares | OceanoFlix</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        {genres && (moviesFiltred.length > 0 || moviesSimilar.length > 0) && (
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
            {moviesSimilar?.map((movie) => (
              <FilmCardWithInfos key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

        {error && <p className="mt-8">{error}</p>}
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id

  const moviesRaw = await GetSimilarMovies(Number(id))
  const movies = moviesRaw.filter((i) => !i.adult && i.poster_path)

  const genresRaw = await GetGenres()
  const genres = [{ id: 0, name: 'Filtrar por gênero' }, ...genresRaw]

  console.log(movies[0])

  return {
    props: {
      movies,
      genres
    }
  }
}
