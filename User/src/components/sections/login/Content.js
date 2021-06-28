import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
    render() {
        return (
            <div className="section">
                <div className="imgs-wrapper">
                    <img src={process.env.PUBLIC_URL + "/assets/img/veg/11.png"} alt="veg" className="d-none d-lg-block" />
                    <img src={process.env.PUBLIC_URL + "/assets/img/prods/3.png"} alt="veg" className="d-none d-lg-block" />
                </div>
                <div className="container">
                    <div className="auth-wrapper">
                        <div className="auth-description bg-cover bg-center dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/auth.jpg)" }}>
                            <div className="auth-description-inner">
                                <i className="flaticon-chili" />
                                <h2>Welcome Back!</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div className="auth-form">
                            <h2>Log in</h2>
                            <form method="post">
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-light" placeholder="Username" name="username" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-light" placeholder="Password" name="password" />
                                </div>
                                <Link to="#">Forgot Password?</Link>
                                <button type="submit" className="btn-custom primary">Login</button>
                                <div className="auth-seperator">
                                    <span>OR</span>
                                </div>
                                <div className="social-login">
                                    <button type="button" className="ct-social-login facebook"><i className="fab fa-facebook-f" /> Continue with Facebook </button>
                                    <button type="button" className="ct-social-login google"><i className="fab fa-google" /> Continue with Google</button>
                                </div>
                                <p>Don't have an account? <Link to="/register">Create One</Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;