import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  AllProducts,
  SingleProduct,
  ConfirmCheckout,
  NotFound,
  Error500,
  GuestCheckout,
  UsersView,
  InventoryView
} from './components'
import {me} from './store'
import {fetchUserCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return this.props.error.status === '500' ? (
      <Error500 />
    ) : (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/products" component={AllProducts} />
        <Route path="/confirm" component={ConfirmCheckout} />
        <Route path="/checkout" component={GuestCheckout} />
        <Route exact path="/" component={AllProducts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && (
              <Switch>
                <Route path="/users" component={UsersView} />
                <Route path="/inventory" component={InventoryView} />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays NotFound page if none of the routes match */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    error: state.error,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchUserCart: user => dispatch(fetchUserCart(user))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
