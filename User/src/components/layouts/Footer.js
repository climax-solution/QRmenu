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
                {/* Middle Footer */}
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <img src={process.env.PUBLIC_URL + "/" + this.props.footer.logo} alt="logo" style={{width: '200px'}}/>
                                <ul>
                                    <li><a href="javascript:void(0)">Test Restaurant AS</a></li>
                                    <li><a href="javascript:void(0)"><i className="fa fa-envelope text-white"></i>post@testinfo.no</a></li>
                                </ul>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Avaible Days</h5>
                                <ul>
                                    <li><a href="javascript:void(0)">Sunday <i className="fa fa-clock"></i> 10:00 AM ~ 08:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Monday <i className="fa fa-clock"></i> 09:00 AM ~ 06:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Tuesday <i className="fa fa-clock"></i> 09:00 AM ~ 08:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Wednesday <i className="fa fa-clock"></i> 11:00 AM ~ 05:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Thursday <i className="fa fa-clock"></i> 08:00 AM ~ 08:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Friday <i className="fa fa-clock"></i> 10:00 AM ~ 07:00 PM</a></li>
                                    <li><a href="javascript:void(0)">Saturday <i className="fa fa-clock"></i> 06:00 AM ~ 05:00 PM</a></li>
                                </ul>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
                                <h5 className="widget-title">Quick Links</h5>
                                <ul>
                                    <li> <Link to="/">Home</Link> </li>
                                    <li> <Link to="/reservation">Reservation</Link> </li>
                                    <li> <Link to="/about">About us</Link> </li>
                                    {/* <li> <Link to="/track-order">Track Order</Link> </li> */}
                                    <li> <Link to="/contact">Contact us</Link> </li>
                                    <li> <a href="http://localhost:4000">Login</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-copyright text-center" style={{justifyContent:'center'}}>
                            <p>&copy; 2021 Test Restaurant AS </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;