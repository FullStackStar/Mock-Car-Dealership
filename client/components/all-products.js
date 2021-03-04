import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (cart) {
      this.setState({
        cart: cart
      })
    }
    console.log('cart', cart)
  }

  render() {
    return (
      <React.Fragment>
        <h2>All Products</h2>
        <div id="all-product-list">
          {this.props.allProducts.map(product => {
            return (
              <div className="product-preview" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.picture} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allProducts: state.product.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
