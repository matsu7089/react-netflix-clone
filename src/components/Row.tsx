import React, { useEffect, useState } from 'react'
import './Row.scss'

import { tmdb, imageBaseUrl } from '../api/tmdb'

type Props = {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

type Movie = {
  id: string
  name: string
  title: string
  original_name: string
  poster_path: string
  backdrop_path: string
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdb.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
            src={`${imageBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}
