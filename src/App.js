import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const filteredData = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredData})
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = num => {
    const {cartList} = this.state
    const incrementedQuantityList = cartList.map(each => {
      if (each.id === num) {
        console.log(num)
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: incrementedQuantityList})
  }

  decrementCartItemQuantity = num => {
    const {cartList} = this.state

    const decrementedQuantityList = cartList.map(each => {
      if (each.id === num) {
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    const removed = decrementedQuantityList.filter(each => each.quantity !== 0)
    this.setState({cartList: removed})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const productItem = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    //     // console.log(findproduct)

    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            const updatedQuantity = each.quantity + product.quantity
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.setState({
        cartList: [...cartList, product],
      })
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
