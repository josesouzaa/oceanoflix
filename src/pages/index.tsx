import type { GetStaticProps } from 'next'
import Head from 'next/head'

import { Header } from '../components/Header'
import { FilmCardWithTitle } from '../components/FilmCardWithTitle'

import { GetTrendingMovies, MovieType } from '../utils/tmdb'

interface HomeProps {
  TrendingMovies: MovieType[]
}

export default function Home({ TrendingMovies }: HomeProps) {
  return (
    <>
      <Head>
        <title>OceanoFlix</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        <h1 className="text-3xl font-bold text-center text-brand-blue-900">
          Filmes em alta
        </h1>

        {TrendingMovies && (
          <ul className="mt-8 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TrendingMovies.map((movie) => (
              <FilmCardWithTitle key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const moviesRaw = await GetTrendingMovies()
  const TrendingMovies = moviesRaw.filter(
    (i) => i.adult === false && i.backdrop_path
  )

  return { props: { TrendingMovies } }
}
