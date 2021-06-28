import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
import products from "../../../data/product.json";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    // Modal
    modalShow(index) {
        this.setState({ modalshow: true, lastActiveBox: index });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    render() {
        const settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }
        return (
            <Fragment>
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h5 className="custom-primary">Trending</h5>
                        <h2 className="title">Our Customers' Top Picks</h2>
                        <p className="subtitle">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                        </p>
                    </div>
                    <Slider className="product-slider" {...settings} ref={c => (this.slider = c)}>
                        {/* Product Start */}
                        {products.map((item, i) => (
                            <div key={i} className="product">
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
                                        <Link to="#" className="btn-custom secondary btn-sm shadow-none"  onClick={(e) => this.modalShow(item.id)}> Customize <i className="fas fa-plus" /> </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Product End */}
                    </Slider>
                    <div className="ct-arrows centered-arrows">
                        <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                        <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                    </div>
                </div>
               
                <Modal show={this.state.modalshow} id="customizeModal" onHide={this.modalClose} aria-labelledby="contained-modal-title-vcenter" size="lg" centered>
                    <Quickview productId={this.state.lastActiveBox}/>
                </Modal>
            </Fragment>
        );
    }
}

export default Products;