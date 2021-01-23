import React, { useEffect, useState } from 'react'
import './Banner.scss'

import { tmdb, requests } from '../api/tmdb'

type movieProps = {
  title?: string
  name?: string
  original_name?: string
  backdrop_path?: string
  overview?: string
}

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({})

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdb.get(requests.fetchNetflixOriginals)

      const results = request.data.results
      const index = Math.floor(Math.random() * results.length)

      setMovie(results[index])
    }
    fetchData()
  }, [])

  const truncate = (str: string | undefined, n: number) => {
    if (str === undefined) return ''
    return str.length > n ? str.substr(0, n - 1) + '...' : str
  }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage:
          movie.backdrop_path && `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="Banner-contents">
        <h1 className="Banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  )
}
