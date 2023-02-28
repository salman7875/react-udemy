const redux = require('redux')

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'INC') {
    return { counter: state.counter + 1 }
  }
  if (action.type === 'DEC') {
    return { counter: state.counter - 1 }
  }
  if (action.type === 'INCREASE') {
    return { counter: state.counter + 5 }
  }
  return state
}

const store = redux.createStore(counterReducer)

// SUBSCRIBER FUNCTION
const counterSubscriber = () => {
  const latestState = store.getState() // It will give latest state snapshot
  console.log(latestState)
}

// MAKING REDUX AWARE OF THE SUBSCRIBER FUNCTION
store.subscribe(counterSubscriber)

// DISPATCHING ACTION
store.dispatch({ type: 'INC' })
store.dispatch({ type: 'INC' })

store.dispatch({ type: 'INC' })
store.dispatch({ type: 'INC' })
store.dispatch({ type: 'INCREASE' })
store.dispatch({ type: 'DEC' })
