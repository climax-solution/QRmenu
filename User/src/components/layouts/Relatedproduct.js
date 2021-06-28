import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Quickview from './Quickview';
import products from "../../data/product.json";

class Relatedproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    // Modal
    modalShow(index) {
        this.setState({ modalshow: true, lastActiveBox: index });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    render() {
        return (
            <div className="section section-padding related-products pt-0">
                <div className="container">
                    <h3>You might also like</h3>
                    <div className="row">
                        {/* Product Start */}
                        {products.slice(0, 3).map((item, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className="product">
                                    <Link className="product-thumb" to={"/menu-item-v1/" + item.id}>
                                        <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                                    </Link>
                                    <div className="product-body">
                                        <div className="product-desc">
                                            <h4> <Link to={"/menu-item-v1/" + item.id}>{item.name}</Link> </h4>
                                            <p>{item.shortdesc}</p>
                                            <p className="product-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</p>
                                            <div className="favorite">
                                                <i className="far fa-heart" />
                                            </div>
                                        </div>
                                        <div className="product-controls">
                                            <Link to={"/menu-item-v1/" + item.id} className="order-item btn-custom btn-sm shadow-none">Order <i className="fas fa-shopping-cart" /> </Link>
                                            <Link to="#" className="btn-custom secondary btn-sm shadow-none" onClick={(e) => this.modalShow(item.id)}> Customize <i className="fas fa-plus" /> </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Product End */}
                    </div>
                </div>
                <Modal show={this.state.modalshow} id="customizeModal" onHide={this.modalClose} aria-labelledby="contained-modal-title-vcenter" size="lg" centered>
                    <Quickview productId={this.state.lastActiveBox} />
                </Modal>
            </div>
        );
    }
}

export default Relatedproduct;