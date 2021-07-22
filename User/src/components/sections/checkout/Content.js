import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartitem from '../../../data/cartlist.json';

const priceTotal = cartitem.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <form method="post">
                        <div className="row">
                            <div className="col-xl-7">
                                {/* Buyer Info */}
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="form-group col-xl-12">
                                        <label>Name</label>
                                        <input type="text" placeholder="Name" name="name" className="form-control" />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Email <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Email" name="email" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Phone <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Phone" name="phone" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Number of Guest <span className="text-danger">*</span></label>
                                        <input type="number" name="number-guest" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Table Reservation</label>
                                        <select className="form-control">
                                            <option value="">select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Reservation Date <span className="text-danger">*</span></label>
                                        <input type="date" name="reservation-date" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Reservation Type</label>
                                        <select className="form-control">
                                            <option value="">select</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-xl-12 mb-0">
                                        <label>Any Special Request?</label>
                                        <textarea name="name" rows={5} className="form-control"/>
                                    </div>
                                </div>
                                {/* /Buyer Info */}
                            </div>
                            <div className="col-xl-5 checkout-billing">
                                {/* Order Details Start */}
                                <table className="ct-responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Qunantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartitem.map((item, i) => (
                                            <tr key={i}>
                                                <td data-title="Product">
                                                    <div className="cart-product-wrapper">
                                                        <div className="cart-product-body">
                                                            <h6> <Link to="/menu-item-v1/1">{item.name}</Link> </h6>
                                                            {item.flavours.map((item, i) => (
                                                                <p key={i}>{item}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title="Quantity">x{item.qty}</td>
                                                <td data-title="Total"> <strong>{new Intl.NumberFormat().format((item.price * item.qty).toFixed(2))}$</strong> </td>
                                            </tr>
                                        ))}
                                        <tr className="total">
                                            <td>
                                                <h6 className="mb-0">Grand Total</h6>
                                            </td>
                                            <td />
                                            <td> <strong>{new Intl.NumberFormat().format((priceTotal).toFixed(2))}$</strong> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" className="form-control" name="master-number" placeholder="Card Number" />
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" name="master-name" placeholder="Full Name" />
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" className="form-control" name="master-expiry" placeholder="Expiry Date (MM/YY)" />
                                    </div>
                                    <div className="col-xl-6 form-group">
                                        <label>CVV*</label>
                                        <input type="number" className="form-control" name="master-cvv" placeholder="CVV" />
                                    </div>
                                </div>
                                <p className="small">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link className="btn-link" to="#">privacy policy.</Link> </p>
                                <button type="submit" className="btn-custom primary btn-block">Place Order</button>
                                {/* Order Details End */}
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Content;