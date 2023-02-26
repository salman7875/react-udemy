import { useRef, useState } from 'react'
import classes from './Checkout.module.css'

// HELPER FUNCTION
const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true
  })
  const nameRef = useRef()
  const streetRef = useRef()
  const postalRef = useRef()
  const cityRef = useRef()

  const confirmHandler = event => {
    event.preventDefault()

    const enteredName = nameRef.current.value
    const enteredstreet = streetRef.current.value
    const enteredpostal = postalRef.current.value
    const enteredCity = cityRef.current.value

    // VALIDATION
    const enterNameIsValid = !isEmpty(enteredName)
    const enteredstreetIsValid = !isEmpty(enteredstreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enterPostalIsValid = isFiveChars(enteredpostal)

    setFormInputIsValid({
      name: enterNameIsValid,
      street: enteredstreetIsValid,
      city: enteredCityIsValid,
      postal: enterPostalIsValid
    })

    let formIsValid =
      enterNameIsValid &&
      enterPostalIsValid &&
      enteredCityIsValid &&
      enteredstreetIsValid

    if (!formIsValid) {
      return
    }

    // SUMBIT CART DATA
    props.onConfirm({
      name: enteredName,
      street: enteredstreet,
      city: enteredCity,
      postal: enteredpostal
    })
  }

  const nameClasses = `${classes.control} ${
    formInputIsValid.name ? '' : classes.invalid
  }`
  const streetClasses = `${classes.control} ${
    formInputIsValid.street ? '' : classes.invalid
  }`
  const postalClasses = `${classes.control} ${
    formInputIsValid.postal ? '' : classes.invalid
  }`
  const cityClasses = `${classes.control} ${
    formInputIsValid.city ? '' : classes.invalid
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameRef} type='text' id='name' />
        {!formInputIsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetRef} type='text' id='street' />
        {!formInputIsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalRef} type='text' id='postal' />
        {!formInputIsValid.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityRef} type='text' id='city' />
        {!formInputIsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
