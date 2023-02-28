import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
  counter: 0,
  showCounter: true
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment (state, action) {
      state.counter++
    },
    decrement (state, action) {
      state.counter--
    },
    increase (state, action) {
      state.counter = state.counter + action.payload
    },
    toggle (state, action) {
      state.showCounter = !state.showCounter
    }
  }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer
