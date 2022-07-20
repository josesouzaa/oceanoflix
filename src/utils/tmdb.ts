export const apiURL = 'https://api.themoviedb.org/3/'
export const apiKey = '667d72d31a54d86846d2caeb0816e58f'

export interface MovieType {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
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

export async function GetTrendingMovies(): Promise<MovieType[]> {
  const req = await fetch(`${apiURL}trending/movie/week?api_key=${apiKey}`)
  const res = await req.json()
  return res.results
}

export async function GetMoviesByTitle(title: string): Promise<MovieType[]> {
  const req = await fetch(
    `${apiURL}search/movie?api_key=${apiKey}&query=${title}`
  )
  const res = await req.json()
  return res.results
}

export async function GetMovieById(id: number): Promise<MovieType> {
  const req = await fetch(`${apiURL}movie/${id}?api_key=${apiKey}`)
  const res = await req.json()
  return res
}