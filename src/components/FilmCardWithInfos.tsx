import Image from 'next/image'
import Link from 'next/link'

import { MovieType } from '../utils/tmdb'

interface FilmCardWithInfosProps {
  movie: MovieType
}

export function FilmCardWithInfos({ movie }: FilmCardWithInfosProps) {
  return (
    <li className="flex flex-col relative bg-black rounded overflow-hidden shadow-md group hover:scale-105 transition duration-300 text-zinc-50">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        width={750}
        height={1125}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex flex-col gap-4 p-4 -translate-x-full group-hover:translate-x-0 transition duration-300 hide-scroll">
        <Link href={`/movie/${movie.id}`}>
          <a className="text-3xl font-bold hover:underline transition">
            {movie.title}
          </a>
        </Link>

        <small className="text-gray-400">{movie.release_date}</small>

        <span
          className={`${
            movie.vote_average >= 5 ? 'text-green-600' : 'text-red-600'
          } font-extrabold bg-gray-50 p-2 rounded-full self-start`}
        >
          {movie.vote_average.toFixed(1)}
        </span>

        <p className="bg-brand-blue-400 p-2 rounded text-sm text-justify">
          {movie.overview}
        </p>
      </div>
    </li>
  )
}
