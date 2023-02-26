import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const orderHandler = () => {
    setShowForm(true)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(meal => (
        <CartItem
          key={meal.id}
          name={meal.name}
          summary={meal.summary}
          price={meal.price}
          amount={meal.amount}
          onRemove={cartItemRemoveHandler.bind(null, meal.id)}
          onAdd={cartItemAddHandler.bind(null, meal)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const submitHandler = async userData => {
    setIsSubmitting(true)
    await fetch(
      `https://food-ordering-8a6d9-default-rtdb.firebaseio.com/orders.json`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userData, orderItems: cartCtx.items })
      }
    )
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={submitHandler} onCancel={props.onClose} />
      )}
      {!showForm && modalActions}
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Sending order data...</p>}
      {didSubmit && !isSubmitting && (
        <>
          <p>Successfully sent the order</p>
          <button className={classes.button} onClick={props.onClose}>
            Go Back
          </button>
        </>
      )}
    </Modal>
  )
}

export default Cart
