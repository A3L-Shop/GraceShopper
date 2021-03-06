import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, clearProduct} from '../store/singleProduct'
import {addToUserCart, updateLineItem} from '../store/cart'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      addToCartMessage: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  async componentWillUnmount() {
    await this.props.clearProductChoice()
  }

  async handleClick(product) {
    let newQuantity
    //if product is already in cart
    if (this.props.cart[product.id]) {
      newQuantity = this.props.cart[product.id].quantity + 1
    } else {
      newQuantity = 1
    }
    //if there is enough inventory
    if (newQuantity <= this.props.product.inventoryAmount) {
      //if product is already in cart
      if (newQuantity > 1) {
        await this.props.updateAmount(product.id, newQuantity, this.props.user)
      } else {
        await this.props.addToCart(product, newQuantity, this.props.user)
      }
      this.setState({
        addToCartMessage: 'You just added 1 item in your cart'
      })
    } else {
      this.setState({
        addToCartMessage: 'There is not enough product in inventory'
      })
    }
    setTimeout(() => {
      this.setState({addToCartMessage: ''})
    }, 1000)
  }

  render() {
    const product = this.props.product || {}
    const {
      name,
      description,
      price,
      imageUrl,
      inventoryAmount,
      category
    } = product
    if (!product.id) {
      return <h2>Loading...</h2>
    }
    return (
      <div className="single-product">
        <h1>Name: {name}</h1>
        <h5 id="description">Description: {description}</h5>
        <h5 id="price">Price: ${price}</h5>
        <h5 id="inventoryAmount">In stock: {inventoryAmount}</h5>
        <h5 id="category"> Category: {category}</h5>
        <img src={imageUrl} />
        <button type="button" onClick={() => this.handleClick(product)}>
          Add To Cart
        </button>
        {this.state.addToCartMessage.length ? (
          <div>{this.state.addToCartMessage}</div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: (product, quantity, user) =>
      dispatch(addToUserCart(product, quantity, user)),
    updateAmount: (productId, newQuantity, user) =>
      dispatch(updateLineItem(productId, newQuantity, user)),
    clearProductChoice: () => dispatch(clearProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
