import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
    render() {
        return (
            <div className="page-404-wrapper">
                <div className="page-404-text">
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page you're looking for does not exist</p>
                    <Link to="/" className="btn-custom">Go Back Home</Link>
                </div>
                <div className="banner-bottom-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/veg/2.png"} alt="veg" />
                    <img src={process.env.PUBLIC_URL + "/assets/img/prods/3.png"} alt="pizza" />
                    <img src={process.env.PUBLIC_URL + "/assets/img/veg/12.png"} alt="veg" />
                </div>
            </div>
        );
    }
}

export default Content;