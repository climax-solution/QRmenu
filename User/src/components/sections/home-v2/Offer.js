import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Offer extends Component {
    render() {
        return (
            <div className="section light-bg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-lg-30">
                            <img src={process.env.PUBLIC_URL + "/assets/img/misc/cta2.png"} alt="img" />
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">Great Offer</h5>
                                <h2 className="title">Buy 1 Get 1 Free</h2>
                                <p className="subtitle">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
                                <p className="subtitle">
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </p>
                                <Link to="/menu-item-v1" className="btn-custom">Order Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;