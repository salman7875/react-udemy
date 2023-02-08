import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'Pending',
        title: 'Sending...',
        message: 'Sending Cart Data!'
      })
    )

    const sendRequest = async () => {
      const res = await fetch(
        'https://react-http-4ae20-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          })
        }
      )

      if (!res.ok) {
        throw new Error('Sending Cart Data Failed!')
      }
    }

    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Send cart data successfully!'
        })
      )
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Send cart data failed!'
        })
      )
    }
  }
}

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const res = await fetch(
        'https://react-http-4ae20-default-rtdb.firebaseio.com/cart.json'
      )

      if (!res.ok) {
        throw new Error('Could not fetch cart data!')
      }

      const data = await res.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      )
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!'
        })
      )
    }
  }
}
