import Link from 'next/link'
import Image from 'next/image'

import { MovieType } from '../utils/tmdb'

interface FilmCardWithTitleProps {
  movie: MovieType
}

export function FilmCardWithTitle({ movie }: FilmCardWithTitleProps) {
  return (
    <li className="rounded overflow-hidden shadow-md text-zinc-50 group hover:scale-105 transition duration-300 aspect-video">
      <Link href={`/movie/${movie.id}`}>
        <a className="flex flex-col relative cursor-pointer">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={960}
            height={540}
          />

          <h2 className="absolute top-0 left-0 w-full h-full bg-black/60 font-bold text-lg flex justify-center items-center text-center p-4 -translate-x-full group-hover:translate-x-0 transition duration-300">
            {movie.title}
          </h2>
        </a>
      </Link>
    </li>
  )
}
