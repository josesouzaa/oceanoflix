import Head from 'next/head'
import { GetServerSideProps, GetStaticPaths } from 'next'

import { Header } from '../../components/Header'

import { GetMovieById, MovieType } from '../../utils/tmdb'
import Image from 'next/image'
import Link from 'next/link'

interface MovieProps {
  movie: MovieType
}

export default function Movie({ movie }: MovieProps) {
  return (
    <>
      <Head>
        <title>{movie.title} | OceanoFlix</title>
      </Head>

      <Header />

      <main className="custom-container mt-8">
        <div className="grid grid-cols-1 gap-4 p-4 bg-brand-blue-400/90 text-zinc-50 md:grid-cols-2 rounded overflow-hidden">
          <Image
            className="rounded"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            width={750}
            height={1125}
          />

          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">{movie.title}</h2>

            <div className="flex flex-col items-start gap-4">
              <span
                className={`${
                  movie.vote_average >= 5 ? 'text-green-600' : 'text-red-600'
                } font-extrabold bg-gray-50 p-2 rounded-full self-start`}
              >
                {movie.vote_average.toFixed(1)}
              </span>

              <small className="bg-brand-green-400/60 p-2 rounded-r">
                {movie.release_date}
              </small>

              <div className="bg-brand-green-400/60 flex items-center rounded-r">
                {movie.genres?.map((g) => (
                  <small
                    key={g.name}
                    className="pl-2 pt-2 pb-2 last-of-type:pr-2"
                  >
                    {g.name}
                  </small>
                ))}
              </div>
            </div>

            <p className="bg-brand-green-400/60 p-2 rounded-r text-justify">
              {movie.overview}
            </p>

            <Link href={`/similar/${movie.id}`}>
              <a className="text-xs hover:underline transition">
                Títulos semelhantes ⟶
              </a>
            </Link>
          </div>
        </div>
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
