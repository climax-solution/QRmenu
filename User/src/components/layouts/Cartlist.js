import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-perfect-scrollbar';
import cartitem from '../../data/cartlist.json';

const priceTotal = cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Cartlist extends Component {
    render() {
        return (
            <Fragment>
                <div className="cart-sidebar-body">
                    <Scrollbar className="cart-sidebar-scroll" style={{ height: "100vh" }}>
                        {cartitem.map((item, i) => (
                            <div key={i} className="cart-sidebar-item">
                                <div className="media">
                                    <Link to="/menu-item-v1/1">
                                        <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                                    </Link>
                                    <div className="media-body">
                                        <h5> <Link to="/menu-item-v1/1" title={item.name}>{item.name}</Link> </h5>
                                        <span>{item.qty}x {new Intl.NumberFormat().format((item.price).toFixed(2))}$</span>
                                    </div>
                                </div>
                                <div className="cart-sidebar-item-meta">
                                    {item.flavours.map((item, i) => (
                                        <span key={i}>{item}</span>
                                    ))}
                                </div>
                                <div className="cart-sidebar-price">
                                    {new Intl.NumberFormat().format((item.price * item.qty).toFixed(2))}$
                            </div>
                                <div className="close-btn">
                                    <span />
                                    <span />
                                </div>
                            </div>
                        ))}
                    </Scrollbar>
                </div>
                <div className="cart-sidebar-footer">
                    <h4>Total: <span>{new Intl.NumberFormat().format((priceTotal).toFixed(2))}$</span> </h4>
                    <button type="button" className="btn-custom">Checkout</button>
                </div>
            </Fragment>
        );
    }
}

export default Cartlist;