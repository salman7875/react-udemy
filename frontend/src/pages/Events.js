import { Suspense } from 'react'
import { Await, defer, json, useLoaderData } from 'react-router-dom'
import EventsList from '../components/EventsList'

function EventsPage () {
  const { events } = useLoaderData()

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' }

    // eslint-disable-next-line no-throw-literal
    // throw new Response(
    //   JSON.stringify({ message: 'Could not fetch events.' }, { status: 500 })
    // )
    json({ message: 'Could not fetch events.' }, { status: 500 })
  } else {
    const data = await response.json()
    return data.events
  }
}

export const loader = () => {
  return defer({
    events: loadEvents()
  })
}
