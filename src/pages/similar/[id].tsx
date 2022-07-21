import Head from 'next/head'
import { GetServerSideProps, GetStaticPaths } from 'next'

import { Header } from '../../components/Header'
import { FilmCardWithInfos } from '../../components/FilmCardWithInfos'

import { GetSimilarMovies, MovieType } from '../../utils/tmdb'

interface MovieProps {
  movies: MovieType[]
}

export default function Similar({ movies }: MovieProps) {
  return (
    <>
      <Head>
        <title>Similares | OceanoFlix</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        {movies.length > 0 && (
          <ul className="mt-4 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <FilmCardWithInfos key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
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

export const getStaticProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id

  const moviesRaw = await GetSimilarMovies(Number(id))
  const movies = moviesRaw.filter((i) => !i.adult && i.poster_path)

  return {
    props: {
      movies
    }
  }
}
