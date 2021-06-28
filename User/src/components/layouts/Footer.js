import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        return (
            <footer className={this.props.footer.style}>
                {/* Top Footer */}
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-logo">
                            <img src={process.env.PUBLIC_URL + "/" + this.props.footer.logo} alt="logo" />
                        </div>
                        <div className="footer-buttons">
                            <Link to="#"> <img src={process.env.PUBLIC_URL + "/assets/img/android.png"} alt="download it on the play store" /></Link>
                            <Link to="#"> <img src={process.env.PUBLIC_URL + "/assets/img/ios.png"} alt="download it on the app store" /></Link>
                        </div>
                    </div>
                </div>
                {/* Middle Footer */}
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Information</h5>
                                <ul>
                                    <li> <Link to="/">Home</Link> </li>
                                    <li> <Link to="/blog-grid">Blog</Link> </li>
                                    <li> <Link to="/about">About Us</Link> </li>
                                    <li> <Link to="/menu-v1">Menu</Link> </li>
                                    <li> <Link to="/contact">Contact Us</Link> </li>
                                </ul>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Top Items</h5>
                                <ul>
                                    <li> <Link to="/menu-v1">Pepperoni</Link> </li>
                                    <li> <Link to="/menu-v1">Swiss Mushroom</Link> </li>
                                    <li> <Link to="/menu-v1">Barbeque Chicken</Link> </li>
                                    <li> <Link to="/menu-v1">Vegetarian</Link> </li>
                                    <li> <Link to="/menu-v1">Ham &amp; Cheese</Link> </li>
                                </ul>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Others</h5>
                                <ul>
                                    <li> <Link to="/checkout">Checkout</Link> </li>
                                    <li> <Link to="/cart">Cart</Link> </li>
                                    <li> <Link to="/menu-item-v1">Product</Link> </li>
                                    <li> <Link to="/locations">Locations</Link> </li>
                                    <li> <Link to="/legal">Legal</Link> </li>
                                </ul>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 footer-widget">
                                <h5 className="widget-title">Social Media</h5>
                                <ul className="social-media">
                                    <li> <Link to="#" className="facebook"> <i className="fab fa-facebook-f" /> </Link> </li>
                                    <li> <Link to="#" className="pinterest"> <i className="fab fa-pinterest-p" /> </Link> </li>
                                    <li> <Link to="#" className="google"> <i className="fab fa-google" /> </Link> </li>
                                    <li> <Link to="#" className="twitter"> <i className="fab fa-twitter" /> </Link> </li>
                                </ul>
                                <div className="footer-offer">
                                    <p>Signup and get exclusive offers and coupon codes</p>
                                    <Link to="/register" className="btn-custom btn-sm shadow-none">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <ul>
                            <li> <Link to="#">Privacy Policy</Link> </li>
                            <li> <Link to="#">Refund Policy</Link> </li>
                            <li> <Link to="#">Cookie Policy</Link> </li>
                            <li> <Link to="#">Terms &amp; Conditions</Link> </li>
                        </ul>
                        <div className="footer-copyright">
                            <p> Copyright © 2021 <Link to="#">AndroThemes</Link> All Rights Reserved. </p>
                            <Link to="#" className="back-to-top" onClick={() => this.scrollToTop()}>Back to top <i className="fas fa-chevron-up" /> </Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;