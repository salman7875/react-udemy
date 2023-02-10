import { useRouteError } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import PageContent from '../components/PageContent'

const Error = () => {
  const error = useRouteError()

  let title = 'An Error Occured'
  let message = 'Something Went Wrong!'

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = 'Not Found'
    message = 'Could not find resource or page.'
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default Error
