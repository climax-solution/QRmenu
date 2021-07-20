import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import cartitem from '../../data/cartlist.json';
import { connect } from 'react-redux';
import { removeCart } from '../../store/actions/cart.actions';

const priceTotal = cartitem.reduce((totalPrice, item) => totalPrice + Number(item.price) * item.qty, 0);

class Cartlist extends Component {    
    render() {
        const { cart_list } = this.props;
        return (
            <Fragment>
                <div className="cart-sidebar-body">
                    <Scrollbar className="cart-sidebar-scroll" style={{ height: "100vh" }} children={'&'}>
                        {cart_list && cart_list[window.location.host] && cart_list[window.location.host].map((item, i) => (
                            <div key={i} className="cart-sidebar-item">
                                <div className="media">
                                    <Link>
                                        <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.name} />
                                    </Link>
                                    <div className="media-body">
                                        <h5> <Link title={item.name}>{item.name}</Link> </h5>
                                        <span>{item.qty}x {new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</span>
                                    </div>
                                </div>
                                <div className="cart-sidebar-price">
                                    {new Intl.NumberFormat().format((Number(item.price) * item.qty).toFixed(2))}$
                            </div>
                                <div className="close-btn" onClick={()=> this.props.removeCart(i)}>
                                    <span />
                                    <span />
                                </div>
                            </div>
                        ))}
                    </Scrollbar>
                </div>
                <div className="cart-sidebar-footer">
                    <h4>Total: <span>{new Intl.NumberFormat().format((priceTotal).toFixed(2))}$</span> </h4>
                    <Link to="/checkout" className="btn-custom">Checkout</Link>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cart_list: JSON.parse(state.content.cart_list)
})
const mapStateToDispatch = dispatch => ({
    removeCart: (key) => dispatch(removeCart(key))
})
export default connect(mapStateToProps,mapStateToDispatch)(Cartlist);