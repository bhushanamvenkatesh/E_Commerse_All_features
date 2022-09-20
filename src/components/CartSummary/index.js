// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let add = 0
      cartList.forEach(each => {
        add += each.price * each.quantity
      })

      console.log(add)

      const count = cartList.length
      return (
        <div className="cart-summary-container">
          <h1>{`Order Total:Rs ${add} /-`}</h1>
          <p>{`${count} Items in Cart`}</p>
          <button className="check-out-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
