import Section from '../UI/Section'
import TaskForm from './TaskForm'
import useHttp from '../../hooks/use-http'

const NewTask = props => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp()

  const createdTask = (taskText, taskData) => {
    const generatedId = taskData.name // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText }

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async taskText => {
    sendTaskRequest(
      {
        url: 'https://react-http-4ae20-default-rtdb.firebaseio.com/tasks.json'
      },
      {
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-type': 'application/json'
        }
      },
      createdTask.bind(null, taskText)
    )
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask
