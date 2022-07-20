import { FormEvent, useState } from 'react'

import Head from 'next/head'

import { Header } from '../components/Header'

import { FilmCardWithInfos } from '../components/FilmCardWithInfos'

import { GetMoviesByTitle, MovieType } from '../utils/tmdb'

export default function Search() {
  const [SearchedMovies, setSearchedMovies] = useState([] as MovieType[])
  const [titleForSearch, setTitleForSearch] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const moviesRaw = await GetMoviesByTitle(titleForSearch)
    const movies = moviesRaw.filter((i) => !i.adult && i.poster_path)
    setSearchedMovies(movies)
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
              Search
            </button>
          </form>
        </div>

        {SearchedMovies && (
          <ul className="mt-8 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SearchedMovies.map((movie) => (
              <FilmCardWithInfos key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
