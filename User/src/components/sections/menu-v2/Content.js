import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
import products from "../../../data/product.json";
import productcategory from "../../../data/productcategory.json";
import { Rating } from "../../../helper/helper";

class Content extends Component {
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
            <div className="section section-padding menu-v2">
                <div className="container">
                    {/* Category Start */}
                    {productcategory.map((category, i) => (
                        <Fragment key={i}>
                            <div className="menu-category dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + category.lgimg + ")" }}>
                                <h3>{category.title}</h3>
                                <p>{category.shortdesc}</p>
                            </div>
                            <div className="row">
                                {products.filter(product => { return product.category.includes(category.id) }).map((item, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className="product">
                                            <div className="favorite">
                                                <i className="far fa-heart" />
                                            </div>
                                            <Link className="product-thumb" to={"/menu-item-v1/" + item.id}>
                                                <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.name} />
                                            </Link>
                                            <div className="product-body">
                                                <div className="product-desc">
                                                    <h4> <Link to={"/menu-item-v1/" + item.id}>{item.name}</Link></h4>
                                                    <div className="ct-rating-wrapper">
                                                        <div className="ct-rating">
                                                            {Rating(item.rating)}
                                                        </div>
                                                    </div>
                                                    <p>{item.shortdesc}</p>
                                                    <Link to="#" className="btn-custom light btn-sm shadow-none" onClick={(e) => this.modalShow(item.id)}> Customize <i className="fas fa-plus" /> </Link>
                                                </div>
                                                <div className="product-controls">
                                                    <p className="product-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</p>
                                                    <Link to={"/menu-item-v1/" + item.id} className="order-item btn-custom btn-sm shadow-none">Order <i className="fas fa-shopping-cart" /> </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Fragment>
                    ))}
                    {/* Category End */}
                </div>
                <Modal show={this.state.modalshow} id="customizeModal" onHide={this.modalClose} aria-labelledby="contained-modal-title-vcenter" size="lg" centered>
                    <Quickview productId={this.state.lastActiveBox} />
                </Modal>
            </div>
        );
    }
}

export default Content;