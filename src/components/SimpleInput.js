import useInput from '../hooks/use-input'

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: nameInputReset
  } = useInput(value => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailInputReset
  } = useInput(value => value.includes('@'))

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  } else {
    formIsValid = false
  }

  const formSubmission = e => {
    e.preventDefault()

    if (!enteredNameIsValid || !enteredEmailIsValid) return

    console.log(enteredName)
    console.log(enteredEmail)

    nameInputReset()
    emailInputReset()
  }

  const nameClasses = `${
    nameInputHasError ? 'form-control invalid' : 'form-control'
  }`

  const emailClasses = `${
    emailInputHasError ? 'form-control invalid' : 'form-control'
  }`

  return (
    <form onSubmit={formSubmission}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onBlur={nameInputBlurHandler}
          value={enteredName}
          onChange={nameInputChangeHandler}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty!</p>
        )}
      </div>

      <div className={emailClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          onChange={emailInputChangeHandler}
        />
        {emailInputHasError && (
          <p className='error-text'>Email must be Valid</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput
