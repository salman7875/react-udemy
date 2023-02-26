import { useReducer } from 'react'

const initialState = {
  value: '',
  isTouched: ''
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.val, isTouched: state.isTouched }
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true }
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false }
  }
  return initialState
}

const useInputs = validateFn => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState)

  const valueIsValid = validateFn(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangleHandler = e => {
    dispatch({ type: 'INPUT', val: e.target.value })
  }

  const valueBlurHandler = e => {
    dispatch({ type: 'BLUR' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangleHandler,
    valueBlurHandler,
    reset: reset
  }
}

export default useInputs
