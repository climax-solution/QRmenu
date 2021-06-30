import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
import products from "../../../data/product.json";
import productcategory from "../../../data/productcategory.json";
import { Rating } from "../../../helper/helper";
import Masonry from 'react-masonry-component';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            filteredProducts: products,
            activeItem: -1
        };
    }
    render() {
        return (
            <Fragment>
                {/* Menu Wrapper Start */}
                <div className="section section-padding">
                    <div className="container">
                    <form style={{overflow:'hidden'}}>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Phone Number" className="form-control" name="phone-number" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Order ID" className="form-control" name="order-id" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                            <button type="button" className="btn-custom primary" name="button" style={{float:'right'}}>Check</button>
                            </div>
                        </div>
                        
                    </form>
                    </div>
                </div>
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}

export default Content;