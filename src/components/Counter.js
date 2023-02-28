import classes from './Counter.module.css'
import { counterActions } from '../store/counterSlice'
import { useSelector, useDispatch } from 'react-redux'

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const showCounter = useSelector(state => state.counter.showCounter)

  const toggleCounterHandler = () => {
    // dispatch({ type: 'toggle' })
    dispatch(counterActions.toggle())
  }

  const incrementHandler = () => {
    // dispatch({ type: 'increment' })
    dispatch(counterActions.increment())
  }

  const decrementHandler = () => {
    // dispatch({ type: 'decrement' })
    dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    // dispatch({ type: 'increase', payload: 5 })
    dispatch(counterActions.increase(5)) // { type: SOME_UNIQUE_ID, payload: 5 }
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increment by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter
