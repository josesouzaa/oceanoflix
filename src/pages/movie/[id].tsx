import Head from 'next/head'
import { GetServerSideProps, GetStaticPaths } from 'next'

import { Header } from '../../components/Header'

import { GetMovieById, MovieType } from '../../utils/tmdb'

interface MovieProps {
  movie: MovieType
}

export default function Movie({ movie }: MovieProps) {
  return (
    <>
      <Head>
        <title>OceanoFlix | {movie.title}</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        <h1 className="text-3xl font-bold text-center text-brand-blue-900">
          {movie.title}
        </h1>
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

  const movie = await GetMovieById(Number(id))

  return {
    props: {
      movie
    }
  }
}
