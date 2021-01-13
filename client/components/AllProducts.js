import React, {Component} from 'react'
import Product from './Product'
import {fetchProducts} from '../store/allProducts'
import {connect} from 'react-redux'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <h1> All Products</h1>
        {products.length
          ? products.map(product => (
              <Product product={product} key={product.id} />
            ))
          : 'No data'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)