import useInputs from '../hooks/use-inputs'

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.includes('@')

const BasicForm = props => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameIsInvalid,
    valueChangleHandler: firstNameChangleHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInputs(isNotEmpty)

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameIsInvalid,
    valueChangleHandler: lastNameChangleHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInputs(isNotEmpty)

  const {
    value: emailName,
    isValid: emailNameIsValid,
    hasError: emailNameIsInvalid,
    valueChangleHandler: emailNameChangleHandler,
    valueBlurHandler: emailNameBlurHandler,
    reset: resetEmailName
  } = useInputs(isEmail)

  let formIsValid = false
  if (firstNameIsValid && lastNameIsValid && emailNameIsValid) {
    formIsValid = true
  } else {
    formIsValid = false
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!formIsValid) return

    console.log(firstName)
    console.log(lastName)
    console.log(emailName)

    resetFirstName()
    resetLastName()
    resetEmailName()
  }

  const firstNameClasses = `${
    firstNameIsInvalid ? 'form-control invalid' : 'form-control'
  }`

  const lastNameClasses = `${
    lastNameIsInvalid ? 'form-control invalid' : 'form-control'
  }`

  const emailNameClasses = `${
    emailNameIsInvalid ? 'form-control invalid' : 'form-control'
  }`

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstName}
            onChange={firstNameChangleHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameIsInvalid && (
            <p className='error-text'>First Name must be Valid!</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={lastName}
            onChange={lastNameChangleHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameIsInvalid && (
            <p className='error-text'>Last Name must be valid!</p>
          )}
        </div>
      </div>
      <div className={emailNameClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={emailName}
          onChange={emailNameChangleHandler}
          onBlur={emailNameBlurHandler}
        />
        {emailNameIsInvalid && (
          <p className='error-text'>Email must be Valid!</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm
