import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import cartitem from '../../../data/cartlist.json';

const tax = 9.99;

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceTotal: cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0),
            cartitem: cartitem
        };
    }
    IncrementItem = (item) => {
        item.qty = item.qty + 1;
        this.setState({ cartitem: this.state.cartitem, priceTotal: cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0) });
    };
    DecreaseItem = (item) => {
        item.qty = item.qty - 1;
        this.setState({ cartitem: this.state.cartitem, priceTotal: cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0) });
    }; 
    render() {
        return (
            <section className="section">
                <div className="container">
                    {/* Cart Table Start */}
                    <table className="ct-responsive-table">
                        <thead>
                            <tr>
                                <th className="remove-item" />
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qunantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartitem.map((item, i) => (
                                <tr key={i}>
                                    <td className="remove">
                                        <button type="button" className="close-btn close-danger remove-from-cart">
                                            <span />
                                            <span />
                                        </button>
                                    </td>
                                    <td data-title="Product">
                                        <div className="cart-product-wrapper">
                                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                                            <div className="cart-product-body">
                                                <h6> <Link to="/menu-item-v1/1">{item.name}</Link> </h6>
                                                {item.flavours.map((item, i) => (
                                                    <p key={i}>{item}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="Price"> <strong>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</strong> </td>
                                    <td className="quantity" data-title="Quantity">
                                        <div className="qty">
                                            <span className="qty-subtract" onClick={() => this.DecreaseItem(item)}><i className="fa fa-minus" /></span>
                                            <input type="text" name="clicks" value={item.qty} readOnly/>
                                            <span className="qty-add" onClick={() => this.IncrementItem(item)}><i className="fa fa-plus" /></span>
                                        </div>
                                    </td>
                                    <td data-title="Total"> <strong>{new Intl.NumberFormat().format((item.price * item.qty).toFixed(2))}$</strong> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Cart Table End */}
                    {/* Coupon Code Start */}
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="form-group mb-0">
                                <div className="input-group mb-0">
                                    <input type="text" className="form-control" placeholder="Enter Coupon Code" aria-label="Coupon Code" />
                                    <div className="input-group-append">
                                        <button className="btn-custom shadow-none" type="button">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Coupon Code End */}
                    {/* Cart form Start */}
                    <div className="row ct-cart-form">
                        <div className="offset-lg-6 col-lg-6">
                            <h4>Cart Total</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{new Intl.NumberFormat().format((this.state.priceTotal).toFixed(2))}$</td>
                                    </tr>
                                    <tr>
                                        <th>Tax</th>
                                        <td> {tax}$ <span className="small">(11%)</span> </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td> <b>{new Intl.NumberFormat().format((this.state.priceTotal + tax).toFixed(2))}$</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="btn-custom primary btn-block">Proceeed to Checkout</button>
                        </div>
                    </div>
                    {/* Cart form End */}
                </div>
            </section>
        );
    }
}

export default Content;