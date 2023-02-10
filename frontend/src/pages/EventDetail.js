import { Suspense } from 'react'
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await
} from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'

const EventDetail = () => {
  const { event, events } = useRouteLoaderData('event-detail')
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetail

const loadEvent = async id => {
  const res = await fetch(`http://localhost:8080/events/${id}`)

  if (!res.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    )
  } else {
    const data = await res.json()
    return data.events
  }
}

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

export const loader = async ({ request, params }) => {
  const id = params.id
  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  })
}

export const action = async ({ request, params }) => {
  const id = params.id
  const res = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method
  })

  if (!res.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 })
  }

  return redirect('/events')
}
