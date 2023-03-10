import { redirect } from 'react-router-dom'

export const getTokenDuration = () => {
  const storedExpiration = localStorage.getItem('expiration')
  const expiration = new Date(storedExpiration)
  const now = new Date()
  const duration = expiration.getTime() - now.getTime()
  return duration
}

export const getAuthToken = () => {
  const token = localStorage.getItem('token')
  const tokenDuration = getTokenDuration()

  if (!token) {
    return null
  }

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }
  return token
}

export const loader = () => {
  return getAuthToken()
}

export const checkAuthLoader = () => {
  const token = getAuthToken()

  if (!token) {
    return redirect('/auth')
  }

  return null
}
