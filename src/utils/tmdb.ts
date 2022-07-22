export const apiURL = 'https://api.themoviedb.org/3/'
export const apiKey = process.env.NEXT_PUBLIC_API_KEY

export interface MovieType {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  genres?: {
    id: number
    name: string
  }[]
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  popularity: number
}

export interface GenresType {
  id: number
  name: string
}

export async function GetTrendingMovies(): Promise<MovieType[]> {
  const req = await fetch(
    `${apiURL}trending/movie/week?api_key=${apiKey}&language=pt-BR&include_adult=false`
  )
  const res = await req.json()
  return res.results
}

export async function GetMoviesByTitle(titleRaw: string): Promise<MovieType[]> {
  const title = titleRaw.toLowerCase().replace(' ', '%20')
  const req = await fetch(
    `${apiURL}search/movie?api_key=${apiKey}&query=${title}&language=pt-BR&include_adult=false`
  )
  const res = await req.json()
  return res.results
}

export async function GetMovieById(id: number): Promise<MovieType> {
  const req = await fetch(
    `${apiURL}movie/${id}?api_key=${apiKey}&language=pt-BR&include_adult=false`
  )
  const res = await req.json()
  return res
}

export async function GetGenres(): Promise<GenresType[]> {
  const req = await fetch(
    `${apiURL}genre/movie/list?api_key=${apiKey}&language=pt-BR`
  )
  const res = await req.json()
  return res.genres
}

export async function GetSimilarMovies(id: number): Promise<MovieType[]> {
  const req = await fetch(
    `${apiURL}movie/${id}/similar?api_key=${apiKey}&language=pt-BR&page=1`
  )
  const res = await req.json()
  return res.results
}
