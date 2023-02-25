import React, { useEffect, useState, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'
import './App.css'

function App () {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      const res = await fetch(
        'https://react-http-4ae20-default-rtdb.firebaseio.com/movies.json'
      )
      if (!res.ok) {
        throw new Error('Something Went Wrong!')
      }

      const data = await res.json()
      console.log(data)

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      // const transformedData = data.results.map(movieData => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.release_date,
      //     openingText: movieData.opening_crawl
      //   }
      // })
      setMovies(loadedMovies)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = async movie => {
    const res = await fetch(
      'https://react-http-4ae20-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
    const data = await res.json()
    console.log(data)
  }

  let content = <p>No Movies Found</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
